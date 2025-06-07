import { v4 as uuidv4 } from "uuid";

import { DB } from "@/libs/db";

export class AppService {
	public static createApp = async ({
		name,
		org_id,
		description,
		metadata,
	}: {
		name: string;
		org_id: string;
		description: string;
		metadata: Record<string, any>;
	}) => {
		const db = await DB.getInstance();

		const app = await db
			.insertInto("app")
			.values({
				id: uuidv4(),
				name,
				org_id,
				description,
				metadata,
				created_at: new Date(),
				updated_at: new Date(),
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return app;
	};

	public static getApp = async ({ id }: { id: string }) => {
		const db = await DB.getInstance();

		const app = await db
			.selectFrom("app")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirstOrThrow();

		return app;
	};

	public static updateApp = async (
		id: string,
		data: {
			name?: string;
			description?: string;
			metadata?: Record<string, any>;
		},
	) => {
		const db = await DB.getInstance();

		await db
			.updateTable("app")
			.set({
				...data,
				updated_at: new Date(),
			})
			.where("id", "=", id)
			.executeTakeFirstOrThrow();
	};

	public static deleteApp = async ({ id }: { id: string }) => {
		const db = await DB.getInstance();

		await db.deleteFrom("app").where("id", "=", id).executeTakeFirstOrThrow();
	};

	public static getAllApps = async (org_id: string) => {
		const db = await DB.getInstance();

		const apps = await db.selectFrom("app").selectAll().where("org_id", "=", org_id).execute();

		return apps;
	};
}
