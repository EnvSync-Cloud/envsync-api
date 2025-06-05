import { type Context } from "hono";

import { EnvService } from "@/services/env.service";
import { AuditLogService } from "@/services/audit_log.service";
import { EnvTypeService } from "@/services/env_type.service";

export class EnvController {
	public static readonly createEnv = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			
			const { key, value, app_id, env_type_id } = await c.req.json();
			
			if (!key || !org_id || !app_id || !env_type_id) {
				return c.json({ error: "key, org_id, app_id, and env_type_id are required." }, 400);
			}
			
			const permissions = c.get("permissions");

			// env_type_id
			const env_type = await EnvTypeService.getEnvType(env_type_id);

			// env_type's name is "Production", user must have admin permissions
			if (env_type.name === "Production" && (!permissions.is_admin || !permissions.is_master)) {
				return c.json({ error: "You do not have permission to create envs in Production." }, 403);
			}

			// Check if the environment variable already exists
			const existingEnv = await EnvService.getEnv({
				app_id,
				env_type_id,
				key,
				org_id,
			});

			if (existingEnv) {
				return c.json({ error: "Environment variable already exists." }, 400);
			}

			// permissions.can_edit is true, user can create envs
			if (!permissions.can_edit) {
				return c.json({ error: "You do not have permission to create envs." }, 403);
			}

			const env = await EnvService.createEnv({
				key,
				org_id,
				value: value || "",
				app_id,
				env_type_id,
			});

			// Log the creation of the environment variable
			await AuditLogService.notifyAuditSystem({
				action: "env_created",
				org_id,
				user_id: c.get("user_id"),
				details: {
					env_id: env.id,
					key,
					value,
					app_id,
					env_type_id,
				},
			});

			return c.json(env, 201);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly updateEnv = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { key } = c.req.param();
			const { value, app_id, env_type_id } = await c.req.json();

			if (!key || !org_id || !app_id || !env_type_id) {
				return c.json({ error: "key, org_id, app_id, and env_type_id are required." }, 400);
			}

			const permissions = c.get("permissions");
			
			// env_type_id
			const env_type = await EnvTypeService.getEnvType(env_type_id);

			// env_type's name is "Production", user must have admin permissions
			if (env_type.name === "Production" && (!permissions.is_admin || !permissions.is_master)) {
				return c.json({ error: "You do not have permission to create envs in Production." }, 403);
			}

			// permissions.can_edit is true, user can update envs
			if (!permissions.can_edit) {
				return c.json({ error: "You do not have permission to update envs." }, 403);
			}

			await EnvService.updateEnv({
				key,
				org_id,
				value: value || "",
				app_id,
				env_type_id,
			});

			// Log the update of the environment variable
			await AuditLogService.notifyAuditSystem({
				action: "env_updated",
				org_id,
				user_id: c.get("user_id"),
				details: {
					key,
					value,
					app_id,
					env_type_id,
				},
			});

			return c.json({ message: "Env updated successfully" });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly deleteEnv = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { app_id, env_type_id, key } = await c.req.json();

			if (!org_id || !app_id || !env_type_id || !key) {
				return c.json({ error: "org_id, app_id, env_type_id, and key are required." }, 400);
			}

			const permissions = c.get("permissions");
			
			// env_type_id
			const env_type = await EnvTypeService.getEnvType(env_type_id);

			// env_type's name is "Production", user must have admin permissions
			if (env_type.name === "Production" && (!permissions.is_admin || !permissions.is_master)) {
				return c.json({ error: "You do not have permission to create envs in Production." }, 403);
			}

			// permissions.can_edit is true, user can delete envs
			if (!permissions.can_edit) {
				return c.json({ error: "You do not have permission to delete envs." }, 403);
			}

			await EnvService.deleteEnv({
				app_id,
				env_type_id,
				key,
				org_id,
			});

			// Log the deletion of the environment variable
			await AuditLogService.notifyAuditSystem({
				action: "env_deleted",
				org_id,
				user_id: c.get("user_id"),
				details: {
					app_id,
					env_type_id,
					key,
				},
			});

			return c.json({ message: "Env deleted successfully" });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getEnv = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { key } = c.req.param();
			const { app_id, env_type_id } = await c.req.json();

			if (!org_id || !app_id || !env_type_id || !key) {
				return c.json({ error: "org_id, app_id, env_type_id, and key are required." }, 400);
			}

			const permissions = c.get("permissions");
			
			// env_type_id
			const env_type = await EnvTypeService.getEnvType(env_type_id);

			// env_type's name is "Production", user must have admin permissions
			if (env_type.name === "Production" && (!permissions.is_admin || !permissions.is_master)) {
				return c.json({ error: "You do not have permission to create envs in Production." }, 403);
			}

			// permissions.can_view is true, user can view envs
			if (!permissions.can_view) {
				return c.json({ error: "You do not have permission to view envs." }, 403);
			}

			const env = await EnvService.getEnv({
				app_id,
				env_type_id,
				key,
				org_id,
			});

			// Log the retrieval of the environment variable
			await AuditLogService.notifyAuditSystem({
				action: "env_viewed",
				org_id,
				user_id: c.get("user_id"),
				details: {
					app_id,
					env_type_id,
					key,
				},
			});

			return c.json(env);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getEnvs = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { app_id, env_type_id } = await c.req.json();

			if (!org_id || !app_id || !env_type_id) {
				return c.json({ error: "org_id, app_id, and env_type_id are required." }, 400);
			}

			const permissions = c.get("permissions");
			
			// env_type_id
			const env_type = await EnvTypeService.getEnvType(env_type_id);

			// env_type's name is "Production", user must have admin permissions
			if (env_type.name === "Production" && (!permissions.is_admin || !permissions.is_master)) {
				return c.json({ error: "You do not have permission to create envs in Production." }, 403);
			}

			// permissions.can_view is true, user can view envs
			if (!permissions.can_view) {
				return c.json({ error: "You do not have permission to view envs." }, 403);
			}

			const envs = await EnvService.getAllEnv({
				app_id,
				env_type_id,
				org_id,
			});

			// Log the retrieval of the environment variables
			await AuditLogService.notifyAuditSystem({
				action: "envs_viewed",
				org_id,
				user_id: c.get("user_id"),
				details: {
					app_id,
					env_type_id,
				},
			});

			return c.json(envs);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly batchCreateEnvs = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { app_id, env_type_id, envs } = await c.req.json();

			if (!envs || !Array.isArray(envs)) {
				return c.json({ error: "envs must be an array." }, 400);
			}

			const permissions = c.get("permissions");
			
			// env_type_id
			const env_type = await EnvTypeService.getEnvType(env_type_id);

			// env_type's name is "Production", user must have admin permissions
			if (env_type.name === "Production" && (!permissions.is_admin || !permissions.is_master)) {
				return c.json({ error: "You do not have permission to create envs in Production." }, 403);
			}

			await EnvService.batchCreateEnvs(org_id, app_id, env_type_id, envs);

			// Log the batch creation of environment variables
			await AuditLogService.notifyAuditSystem({
				action: "envs_batch_created",
				org_id,
				user_id: c.get("user_id"),
				details: {
					app_id,
					env_type_id,
					env_count: envs.length,
				},
			});

			return c.json({ message: "Envs created successfully" }, 201);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};
}
