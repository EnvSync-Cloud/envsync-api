import { type Context } from "hono";

import { ApiKeyService } from "@/services/api_key.service";
import { encapsulate } from "@/utils/encapsulate";

export class ApiKeyController {
	public static readonly createApiKey = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const user_id = c.get("user_id");

			const { name, description } = await c.req.json();

			if (!name || !org_id) {
				return c.json({ error: "Name and Organization ID are required." }, 400);
			}
            
            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to create API keys." }, 403);
            }

			const apiKey = await ApiKeyService.createKey({
				org_id,
				description,
				user_id,
			});

			return c.json(apiKey, 201);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getApiKey = async (c: Context) => {
		try {
			const id = c.req.param("id");

			if (!id) {
				return c.json({ error: "API Key ID is required." }, 400);
			}

            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to access API keys." }, 403);
            }

			const apiKey = await ApiKeyService.getKey(id);

			apiKey.key = encapsulate(apiKey.key);

			return c.json(apiKey, 200);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getAllApiKeys = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			if (!org_id) {
				return c.json({ error: "Organization ID is required." }, 400);
			}

            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to access API keys." }, 403);
            }

			const apiKeys = await ApiKeyService.getAllKeys(org_id);

			apiKeys.forEach(key => {
				key.key = encapsulate(key.key);
			});

			return c.json(apiKeys, 200);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly updateApiKey = async (c: Context) => {
		try {
			const id = c.req.param("id");
			const { last_used_at, description, is_active } = await c.req.json();

			if (!id) {
				return c.json({ error: "API Key ID is required." }, 400);
			}

            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to update API keys." }, 403);
            }

			await ApiKeyService.updateKey(id, {
				description,
				is_active,
				last_used_at,
			});

			return c.json({ message: "API Key updated successfully." }, 200);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly deleteApiKey = async (c: Context) => {
		try {
			const id = c.req.param("id");

			if (!id) {
				return c.json({ error: "API Key ID is required." }, 400);
			}

            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to delete API keys." }, 403);
            }

			await ApiKeyService.deleteKey(id);

			return c.json({ message: "API Key deleted successfully." }, 200);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getKeysByUserId = async (c: Context) => {
		try {
			const userId = c.req.param("user_id");

			if (!userId) {
				return c.json({ error: "User ID is required." }, 401);
			}

            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to access API keys." }, 403);
            }

			const keys = await ApiKeyService.getKeyByUserId(userId);

			if (!keys || keys.length === 0) {
				return c.json({ error: "No API keys found for this user." }, 404);
			}

			keys.forEach(key => {
				key.key = encapsulate(key.key);
			});

			return c.json(keys, 200);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly regenerateApiKey = async (c: Context) => {
		try {
			const id = c.req.param("id");

			if (!id) {
				return c.json({ error: "API Key ID is required." }, 400);
			}

            const permissions = c.get("permissions");

            // Check if the user must have permissions.have_api_access
            if (!permissions.have_api_access || !permissions.is_admin || !permissions.is_master) {
                return c.json({ error: "You do not have permission to regenerate API keys." }, 403);
            }

			const newKey = await ApiKeyService.regenerateKey(id);

			return c.json(newKey, 200);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};
}
