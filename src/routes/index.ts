import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";

const app = new Hono();


app.use(authMiddleware());

export default app;