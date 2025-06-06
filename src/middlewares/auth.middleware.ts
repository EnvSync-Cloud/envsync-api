import type { Context, MiddlewareHandler, Next } from "hono";
import { getCookie } from "hono/cookie";

import { UserService } from "@/services/user.service";
import { RoleService } from "@/services/role.service";
import { validateAccess } from "@/helpers/access";

export const authMiddleware = (): MiddlewareHandler => {
	return async (ctx: Context, next: Next) => {
		let token =
			ctx.req.header("Authorization") ??
			ctx.req.query("access_token") ??
			getCookie(ctx, "access_token");

		let apiKey = ctx.req.header("X-API-Key") ??
			ctx.req.query("api_key");

		// If neither token nor API key is provided, return an error
		// This is to ensure that at least one form of authentication is provided
		// If both are provided, the token will be prioritized
		if (!token && !apiKey) {
			return ctx.json({ error: "No token provided" }, 401);
		};

		try {
			const access_info = await validateAccess({
				token: token ? token.replace("Bearer ", "") : apiKey ?? "",
				type: token ? "JWT" : "API_KEY"
			})
			
			const user = await UserService.getUser(access_info.user_id);
			const role = await RoleService.getRole(user.role_id);

			ctx.set("user_id", user.id);
			ctx.set("auth0_user_id", access_info.user_id);
			ctx.set("org_id", user.org_id);
			ctx.set("role_id", role.id);

			ctx.set("permissions", {
				can_edit: role.can_edit,
				can_view: role.can_view,
				have_api_access: role.have_api_access,
				have_billing_options: role.have_billing_options,
				have_webhook_access: role.have_webhook_access,
				is_admin: role.is_admin,
				is_master: role.is_master,
			});
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return ctx.json({ error: err.message }, 401);
			}
		} finally {
			await next();
		}
	};
};
