import type { Context, MiddlewareHandler, Next } from "hono";
import { decode, verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { auth0 } from "@/helpers/auth0";

import { config } from "@/utils/env";
import { UserService } from "@/services/user.service";
import { RoleService } from "@/services/role.service";

export const authMiddleware = (): MiddlewareHandler => {
	return async (ctx: Context, next: Next) => {
		let token =
			ctx.req.header("Authorization") ??
			ctx.req.query("access_token") ??
			getCookie(ctx, "access_token");

		if (!token) return ctx.json({ error: "No token provided" }, 401);

		token = token.replace("Bearer ", "");

		try {
			await auth0.oauth.idTokenValidator.validate(token);
			const decoded = decode(token);

			const user = await UserService.getUserByAuth0Id(decoded.payload.sub as string);
			const role = await RoleService.getRole(user.role_id);

			ctx.set("user_id", user.id);
			ctx.set("auth0_user_id", decoded.payload.sub);
			ctx.set("org_id", user.org_id);
			ctx.set("role_id", role.id);
			ctx.set("role_name", role.name);
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
