import type { Context, MiddlewareHandler, Next } from "hono";
import { decode, verify } from "hono/jwt";

import { config } from "@/utils/env";

export const authMiddleware = (): MiddlewareHandler => {
    return async (ctx: Context, next: Next) => {
        let token =
            ctx.req.header("Authorization") ?? ctx.req.query("access_token");

        if (!token) return ctx.json({ error: "No token provided" }, 401);

        token = token.replace("Bearer ", "");
        
        await next();
    };
};