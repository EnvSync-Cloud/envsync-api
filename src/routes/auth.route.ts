import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { AuthController } from "@/controllers/auth.controller";

const app = new Hono();

app.use(authMiddleware());

app.get("/me", AuthController.whoami)

export default app;