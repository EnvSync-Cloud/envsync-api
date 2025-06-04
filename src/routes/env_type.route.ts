import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { EnvTypeController } from "@/controllers/env_type.controller";

const app = new Hono();

app.use(authMiddleware());

app.get("/", EnvTypeController.getEnvTypes);
app.get("/:id", EnvTypeController.getEnvType);
app.post("/", EnvTypeController.createEnvType);
app.delete("/:id", EnvTypeController.deleteEnvType);
app.patch("/:id", EnvTypeController.updateEnvType);

export default app;
