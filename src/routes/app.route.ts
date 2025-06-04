import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { AppController } from "@/controllers/app.controller";

const app = new Hono();

app.use(authMiddleware());

app.get("/", AppController.getApps)
app.get("/:id", AppController.getApp)
app.post("/", AppController.createApp)
app.delete("/:id", AppController.deleteApp)
app.patch("/:id", AppController.updateApp)

export default app;