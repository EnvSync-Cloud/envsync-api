import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { OnboardingController } from "@/controllers/onboarding.controller";

const app = new Hono();

app.post("/invite/org", OnboardingController.createOrgInvite)

app.use(authMiddleware());

app.post("/invite/user", OnboardingController.createUserInvite)

app.get("/invite/org/:invite_code", OnboardingController.getOrgInviteByCode)
app.put("/invite/org/:invite_code/accept", OnboardingController.acceptOrgInvite)

app.get("/invite/user/:invite_code", OnboardingController.getUserInviteByCode)
app.put("/invite/user/:invite_code/accept", OnboardingController.acceptUserInvite)

export default app;