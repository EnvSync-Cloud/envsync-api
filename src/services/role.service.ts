import { v4 as uuidv4 } from "uuid";

import { DB } from "@/libs/db";

export class RoleService {
	public static createRole = async ({ name, org_id }: { name: string; org_id: string }) => {
		const db = await DB.getInstance();

		const { id } = await db
			.insertInto("org_role")
			.values({
				id: uuidv4(),
				name,
				org_id,
				created_at: new Date(),
				updated_at: new Date(),
			})
			.returning("id")
			.executeTakeFirstOrThrow();

		return { id, name };
	};

	public static createDefaultRoles = async (org_id: string) => {
		const db = await DB.getInstance();

		const rawRoles = [
			{ name: "Admin", org_id },
			{ name: "Developer", org_id },
			{ name: "Viewer", org_id },
		];

		const roleInserts = rawRoles.map(role => ({
			id: uuidv4(),
			...role,
			created_at: new Date(),
			updated_at: new Date(),
		}));

		const roles = await db
			.insertInto("org_role")
			.values(roleInserts)
			.returning("name")
			.returning("id")
			.execute();

		return roles;
	};

	public static getRole = async (id: string) => {
		const db = await DB.getInstance();

		const role = await db
			.selectFrom("org_role")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirstOrThrow();

		return role;
	};

	public static getRoles = async (org_id: string) => {
		const db = await DB.getInstance();

		const role = await db
			.selectFrom("users")
			.selectAll()
			.where("org_id", "=", org_id)
			.executeTakeFirstOrThrow();

		return role;
	};
}
