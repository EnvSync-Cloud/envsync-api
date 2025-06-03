import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";

const app = new Hono();

app.use(authMiddleware());

app.get("/:id",)
app.patch("/:id",)

export default app;