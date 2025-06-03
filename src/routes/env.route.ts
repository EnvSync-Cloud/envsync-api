import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";

const app = new Hono();

app.use(authMiddleware());

app.get("/:env_type_id",)
app.get("/:env_type_id/:id",)
app.post("/:env_type_id/single",)
app.post("/:env_type_id/batch",)
app.delete("/:env_type_id/:id",)
app.patch("/:env_type_id/:id",)

export default app;