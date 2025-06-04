import { type Context } from "hono";

import { AppService } from "@/services/app.service";

export class AppController {
	public static readonly createApp = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const { name, description, metadata } = await c.req.json();

			if (!name || !org_id) {
				return c.json({ error: "Name and Organization ID are required." }, 400);
			}

			const app = await AppService.createApp({
				name,
				org_id,
				description,
				metadata,
			});

			return c.json(app, 201);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getApp = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			const id = c.req.param("id");

			const app = await AppService.getApp({ id });

			if (app.org_id !== org_id) {
				return c.json({ error: "App does not belong to your organization" }, 403);
			}

			return c.json(app);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly getApps = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			const apps = await AppService.getAllApps(org_id);

			return c.json(apps);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly updateApp = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			const id = c.req.param("id");

			const { name, description, metadata } = await c.req.json();

			const app = await AppService.getApp({ id });

			if (app.org_id !== org_id) {
				return c.json({ error: "App does not belong to your organization" }, 403);
			}

			await AppService.updateApp(id, {
				name,
				description,
				metadata,
			});

			return c.json({ message: "App updated successfully" });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};

	public static readonly deleteApp = async (c: Context) => {
		try {
			const org_id = c.get("org_id");

			const id = c.req.param("id");

			const app = await AppService.getApp({ id });

			if (app.org_id !== org_id) {
				return c.json({ error: "App does not belong to your organization" }, 403);
			}

			await AppService.deleteApp({ id });

			return c.json({ message: "App deleted successfully" });
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};
}
