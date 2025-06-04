import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { OnboardingController } from "@/controllers/onboarding.controller";

const app = new Hono();

app.post("/org", OnboardingController.createOrgInvite);

app.get("/org/:invite_code", OnboardingController.getOrgInviteByCode);
app.put("/org/:invite_code/accept", OnboardingController.acceptOrgInvite);

app.get("/user/:invite_code", OnboardingController.getUserInviteByCode);
app.put("/user/:invite_code/accept", OnboardingController.acceptUserInvite);

app.use(authMiddleware());

app.post("/user", OnboardingController.createUserInvite);

app.patch("/user/:invite_code", OnboardingController.updateUserInvite);
app.delete("/user/:invite_id", OnboardingController.deleteUserInvite);

export default app;
