import { auth0, auth0Management } from "@/helpers/auth0";
import { UserService } from "@/services/user.service";
import { config } from "@/utils/env";
import type { Context } from "hono";

export class UserController {
	public static readonly getUsers = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const users = await UserService.getAllUser(org_id);
			return c.json(users);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getUserById = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { id } = c.req.param();

			if (!id) {
				return c.json({ error: "ID is required." }, 400);
			}

			const user = await UserService.getUser(id);

			// Check if user exists and belongs to the organization
			if (!user) {
				return c.json({ error: "User not found." }, 404);
			}
			if (user.org_id !== org_id) {
				return c.json({ error: "You do not have permission to access this user." }, 403);
			}

			return c.json(user);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly updateUser = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			const { id } = c.req.param();
			const { full_name, profile_picture_url, email } = await c.req.json();

			if (!id) {
				return c.json({ error: "ID is required." }, 400);
			}

			// Check if user exists and belongs to the organization
			const user = await UserService.getUser(id);
			if (!user) {
				return c.json({ error: "User not found." }, 404);
			}
			if (user.org_id !== org_id) {
				return c.json({ error: "You do not have permission to update this user." }, 403);
			}

			const updateData = {
				full_name: full_name ?? user.full_name,
				profile_picture_url: profile_picture_url ?? user.profile_picture_url,
				email: email ?? user.email,
			};

			await auth0Management.users.update(
				{
					id: user.auth0_id ?? "",
				},
				{
					picture: updateData.profile_picture_url,
					given_name: updateData.full_name.split(" ")[0],
					family_name: updateData.full_name.split(" ")[1] || "",
					email: updateData.email,
					verify_email: updateData.email !== user.email,
				},
			);

			// Update user
			await UserService.updateUser(id, updateData);

			return c.json({ message: "User updated successfully." });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static deleteUser = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const role = c.get("role_name");

			const { id } = c.req.param();

			if (!id) {
				return c.json({ error: "ID is required." }, 400);
			}

			// Check if user exists and belongs to the organization
			const user = await UserService.getUser(id);
			if (!user) {
				return c.json({ error: "User not found." }, 404);
			}
			if (user.org_id !== org_id) {
				return c.json({ error: "You do not have permission to delete this user." }, 403);
			}
			// Only Admin can delete users
			if (role !== "Admin") {
				return c.json({ error: "You do not have permission to delete this user." }, 403);
			}

			await UserService.deleteUser(id);
			await auth0Management.users.delete({
				id: user.auth0_id ?? "",
			});

			return c.json({ message: "User deleted successfully." });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	// UpdateRole
	public static readonly updateRole = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const role = c.get("role_name");

			const { id } = c.req.param();
			const { role_id } = await c.req.json();

			if (!id || !role_id) {
				return c.json({ error: "ID and role ID are required." }, 400);
			}

			// Check if user exists and belongs to the organization
			const user = await UserService.getUser(id);
			if (!user) {
				return c.json({ error: "User not found." }, 404);
			}
			if (user.org_id !== org_id) {
				return c.json({ error: "You do not have permission to update this user." }, 403);
			}

			// Only Admin can update roles
			if (role !== "Admin") {
				return c.json({ error: "You do not have permission to update roles." }, 403);
			}

			await UserService.updateUser(id, {
				role_id,
			});

			return c.json({ message: "User role updated successfully." });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	// UpdatePassword
	public static readonly updatePassword = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const role = c.get("role_name");

			const { id } = c.req.param();
			const { password } = await c.req.json();

			if (!id || !password) {
				return c.json({ error: "ID and password are required." }, 400);
			}

			// Check if user exists and belongs to the organization
			const user = await UserService.getUser(id);
			if (!user) {
				return c.json({ error: "User not found." }, 404);
			}
			if (user.org_id !== org_id) {
				return c.json({ error: "You do not have permission to update this user." }, 403);
			}

			// Only Admin can update passwords
			if (role !== "Admin") {
				return c.json({ error: "You do not have permission to update passwords." }, 403);
			}

			await auth0.database.changePassword({
				connection: "Username-Password-Authentication",
				email: user.email,
				client_id: config.AUTH0_CLIENT_ID,
			});

			return c.json({ message: "Password updation request sent!" });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};
}
