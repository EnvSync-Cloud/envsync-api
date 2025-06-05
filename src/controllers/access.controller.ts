import { type Context } from "hono";
import * as openid from "openid-client";

import { config } from "@/utils/env";
import { auth0 } from "@/helpers/auth0";

export class AccessController {
	public static readonly createCliLogin = async (c: Context) => {
		try {
			const { AUTH0_CLIENT_ID, AUTH0_DOMAIN } = config;

			const auth0Config: openid.Configuration = await openid.discovery(
				new URL(`https://${AUTH0_DOMAIN}`),
				AUTH0_CLIENT_ID,
			);

			let deviceAuthInit = await openid.initiateDeviceAuthorization(auth0Config, {
				scope: "openid email profile",
			});

			return c.json(
				{
					message: "CLI login created successfully.",
					verification_uri_complete: deviceAuthInit.verification_uri_complete,
					user_code: deviceAuthInit.user_code,
					device_code: deviceAuthInit.device_code,
					expires_in: deviceAuthInit.expires_in,
					interval: deviceAuthInit.interval,
					client_id: AUTH0_CLIENT_ID,
					domain: AUTH0_DOMAIN,
				},
				201,
			);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly createWebLogin = async (c: Context) => {
		try {
			const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_WEB_REDIRECT_URI } = config;

			const loginUrl = `https://${AUTH0_DOMAIN}/authorize?client_id=${AUTH0_CLIENT_ID}&response_type=code&scope=openid%20email%20profile&redirect_uri=${encodeURIComponent(AUTH0_WEB_REDIRECT_URI)}`;

			return c.json({ message: "Web login created successfully.", loginUrl }, 201);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly callbackWebLogin = async (c: Context) => {
		try {
			const {
				AUTH0_CLIENT_ID,
				AUTH0_CLIENT_SECRET,
				AUTH0_WEB_REDIRECT_URI,
				AUTH0_WEB_CALLBACK_URL,
			} = config;

			const { code } = c.req.query();

			if (!code) {
				return c.json({ error: "Code is required." }, 400);
			}

			const tokenResponse = await auth0.oauth.authorizationCodeGrant({
				client_id: AUTH0_CLIENT_ID,
				client_secret: AUTH0_CLIENT_SECRET,
				code,
				redirect_uri: AUTH0_WEB_REDIRECT_URI,
			});

			const tokenData = tokenResponse.data;

			return c.redirect(AUTH0_WEB_CALLBACK_URL + `?access_token=${tokenData.id_token}`, 302);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly createApiLogin = async (c: Context) => {
		try {
			const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_API_REDIRECT_URI } = config;

			const loginUrl = `https://${AUTH0_DOMAIN}/authorize?client_id=${AUTH0_CLIENT_ID}&response_type=code&scope=openid%20email%20profile&redirect_uri=${encodeURIComponent(AUTH0_API_REDIRECT_URI)}`;

			return c.json({ message: "API login created successfully.", loginUrl }, 201);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly callbackApiLogin = async (c: Context) => {
		try {
			const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_API_REDIRECT_URI } = config;

			const { code } = c.req.query();

			if (!code) {
				return c.json({ error: "Code is required." }, 400);
			}

			const tokenResponse = await auth0.oauth.authorizationCodeGrant({
				client_id: AUTH0_CLIENT_ID,
				client_secret: AUTH0_CLIENT_SECRET,
				code,
				redirect_uri: AUTH0_API_REDIRECT_URI,
			});

			const tokenData = tokenResponse.data;

			return c.json(
				{
					message: "API login callback successful.",
					tokenData,
				},
				200,
			);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};
}
