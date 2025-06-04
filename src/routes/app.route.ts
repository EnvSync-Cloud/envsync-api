import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { AppController } from "@/controllers/app.controller";
import { cliMiddleware } from "@/middlewares/cli.middleware";

const app = new Hono();

app.use(authMiddleware());
app.use(cliMiddleware());

app.get("/", AppController.getApps);
app.get("/:id", AppController.getApp);
app.post("/", AppController.createApp);
app.delete("/:id", AppController.deleteApp);
app.patch("/:id", AppController.updateApp);

export default app;
