import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { OrgController } from "@/controllers/org.controller";

const app = new Hono();

app.use(authMiddleware());

app.get("/", OrgController.getOrg);
app.patch("/", OrgController.updateOrg);
app.get("/check-slug", OrgController.checkIfSlugExists);

export default app;
