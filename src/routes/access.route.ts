import { Hono } from "hono";

import { AccessController } from "@/controllers/access.controller";

const app = new Hono();

app.get("/cli", AccessController.createCliLogin);
app.get("/cli/callback", AccessController.callbackCliLogin);
app.get("/web", AccessController.createWebLogin);
app.get("/web/callback", AccessController.callbackWebLogin);
app.get("/api", AccessController.createApiLogin);
app.get("/api/callback", AccessController.callbackApiLogin);

export default app;
