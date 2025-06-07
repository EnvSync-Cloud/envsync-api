import { Hono } from "hono";

import accessRoute from "./access.route";
import appRoute from "./app.route";
import apiKeyRoute from "./api_key.route";
import auditLogRoute from "./audit_log.route";
import authRoute from "./auth.route";
import envTypeRoute from "./env_type.route";
import envRoute from "./env.route";
import onboardingRoute from "./onboarding.route";
import orgRoute from "./org.route";
import userRoute from "./user.route";
import roleRoute from "./role.route";

const app = new Hono();

app.route("/access", accessRoute);
app.route("/app", appRoute);
app.route("/api_key", apiKeyRoute);
app.route("/audit_log", auditLogRoute);
app.route("/auth", authRoute);
app.route("/env_type", envTypeRoute);
app.route("/env", envRoute);
app.route("/role", roleRoute);
app.route("/onboarding", onboardingRoute);
app.route("/org", orgRoute);
app.route("/user", userRoute);

export default app;
