import { Hono } from "hono";

import accessRoute from "./access.route";
import appRoute from "./app.route";
import audit_logRoute from "./audit_log.route";
import authRoute from "./auth.route";
import env_typeRoute from "./env_type.route";
import envRoute from "./env.route";
import onboardingRoute from "./onboarding.route";
import orgRoute from "./org.route";
import userRoute from "./user.route";

const app = new Hono();

app.route("/access", accessRoute);
app.route("/app", appRoute);
app.route("/audit_log", audit_logRoute);
app.route("/auth", authRoute);
app.route("/env_type", env_typeRoute);
app.route("/env", envRoute);
app.route("/onboarding", onboardingRoute);
app.route("/org", orgRoute);
app.route("/user", userRoute);

export default app;
