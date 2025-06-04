import { Hono } from "hono";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { UserController } from "@/controllers/user.controller";

const app = new Hono();

app.use(authMiddleware());

app.get("/", UserController.getUsers)
app.get("/:id", UserController.getUserById)
app.delete("/:id", UserController.deleteUser)
app.patch("/:id", UserController.updateUser)
app.patch("/role/:id", UserController.updateRole)
app.patch("/password/:id", UserController.updatePassword)

export default app;