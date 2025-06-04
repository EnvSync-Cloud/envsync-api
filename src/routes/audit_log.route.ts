import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { AuditLogController } from "@/controllers/audit_log.controller";

const app = new Hono();

app.use(authMiddleware());

app.get("/", AuditLogController.getAuditLogs);

export default app;
