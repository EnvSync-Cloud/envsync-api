import { v4 as uuidv4 } from "uuid";

import { DB } from "@/libs/db";

export class EnvService {
	public static createEnv = async ({
		key,
		value,
		env_type_id,
		app_id,
		org_id,
	}: {
		key: string;
		value: string;
		env_type_id: string;
		app_id: string;
		org_id: string;
	}) => {
		const db = await DB.getInstance();

		const { id } = await db
			.insertInto("env_store")
			.values({
				id: uuidv4(),
				value,
				key,
				env_type_id,
				org_id,
				app_id,
				created_at: new Date(),
				updated_at: new Date(),
			})
			.returning("id")
			.executeTakeFirstOrThrow();

		return { id };
	};

	public static getEnv = async ({
		key,
		env_type_id,
		app_id,
		org_id,
	}: {
		key: string;
		env_type_id: string;
		app_id: string;
		org_id: string;
	}) => {
		const db = await DB.getInstance();

		const env = await db
			.selectFrom("env_store")
			.selectAll()
			.where("key", "=", key)
			.where("env_type_id", "=", env_type_id)
			.where("app_id", "=", app_id)
			.where("org_id", "=", org_id)
			.executeTakeFirst();

		return env;
	};

	public static updateEnv = async ({
		key,
		value,
		app_id,
		org_id,
		env_type_id,
	}: {
		key: string;
		value: string;
		app_id: string;
		org_id: string;
		env_type_id: string;
	}) => {
		const db = await DB.getInstance();

		await db
			.updateTable("env_store")
			.set({
				value,
				updated_at: new Date(),
			})
			.where("key", "=", key)
			.where("app_id", "=", app_id)
			.where("org_id", "=", org_id)
			.where("env_type_id", "=", env_type_id)
			.executeTakeFirstOrThrow();
	};

	public static deleteEnv = async ({
		key,
		app_id,
		env_type_id,
		org_id,
	}: {
		key: string;
		app_id: string;
		env_type_id: string;
		org_id: string;
	}) => {
		const db = await DB.getInstance();

		await db
			.deleteFrom("env_store")
			.where("key", "=", key)
			.where("app_id", "=", app_id)
			.where("org_id", "=", org_id)
			.where("env_type_id", "=", env_type_id)
			.executeTakeFirstOrThrow();
	};

	public static getAllEnv = async ({
		app_id,
		org_id,
		env_type_id,
	}: {
		app_id: string;
		org_id: string;
		env_type_id: string;
	}) => {
		const db = await DB.getInstance();

		const envs = await db
			.selectFrom("env_store")
			.selectAll()
			.where("app_id", "=", app_id)
			.where("org_id", "=", org_id)
			.where("env_type_id", "=", env_type_id)
			.execute();

		return envs;
	};

	public static batchCreateEnvs = async (
		org_id: string,
		app_id: string,
		env_type_id: string,
		envs: {
			key: string;
			value: string;
		}[],
	) => {
		const db = await DB.getInstance();

		const envInserts = envs.map(env => ({
			id: uuidv4(),
			key: env.key,
			value: env.value,
			app_id,
			org_id,
			env_type_id,
			created_at: new Date(),
			updated_at: new Date(),
		}));

		await db.insertInto("env_store").values(envInserts).execute();
	};

	public static batchUpdateEnvs = async (
		org_id: string,
		app_id: string,
		env_type_id: string,
		envs: {
			key: string;
			value: string;
		}[],
	) => {
		const db = await DB.getInstance();

		for (const env of envs) {
			await db
				.updateTable("env_store")
				.set({
					value: env.value,
					updated_at: new Date(),
				})
				.where("key", "=", env.key)
				.where("app_id", "=", app_id)
				.where("org_id", "=", org_id)
				.where("env_type_id", "=", env_type_id)
				.executeTakeFirstOrThrow();
		}
	}

	public static batchDeleteEnvs = async (
		org_id: string,
		app_id: string,
		env_type_id: string,
		keys: string[],
	) => {
		const db = await DB.getInstance();

		await db
			.deleteFrom("env_store")
			.where("app_id", "=", app_id)
			.where("org_id", "=", org_id)
			.where("env_type_id", "=", env_type_id)
			.where("key", "in", keys)
			.executeTakeFirstOrThrow();
	}

	public static getAppEnvSummary = async ({
		app_id,
		org_id,
	}: {
		app_id: string;
		org_id: string;
	}) => {
		const db = await DB.getInstance();

		const summary = await db
			.selectFrom("env_store")
			.select([
				"env_type_id",
				db.fn.count("id").as("count"),
			])
			.where("app_id", "=", app_id)
			.where("org_id", "=", org_id)
			.execute();

		return summary;
	}
}
