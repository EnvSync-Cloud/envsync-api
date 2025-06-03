import { Hono } from "hono";

const app = new Hono();

app.get("/cli")
app.get("/cli/callback")
app.get("/web")
app.get("/web/callback")

export default app;