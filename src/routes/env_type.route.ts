import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";

const app = new Hono();

app.use(authMiddleware());

app.get("/",)
app.get("/:id",)
app.post("/",)
app.delete("/:id",)
app.patch("/:id",)

export default app;