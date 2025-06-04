import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { EnvController } from "@/controllers/env.controller";

const app = new Hono();

app.use(authMiddleware());

app.post("/", EnvController.getEnvs);
app.post("/:key", EnvController.getEnv);
app.put("/single", EnvController.createEnv);
app.put("/batch", EnvController.batchCreateEnvs);
app.delete("/", EnvController.deleteEnv);
app.patch("/:key", EnvController.updateEnv);

export default app;
