import { v4 as uuidv4 } from "uuid";

import { auth0Management } from "@/helpers/auth0";
import { DB } from "@/libs/db";

export class UserService {
	public static createUser = async (data: {
		email: string;
		full_name: string;
		password: string;
		org_id: string;
		role_id: string;
	}) => {
		const db = await DB.getInstance();

		const auth0_user = await auth0Management.users.create({
			connection: "Username-Password-Authentication",
			email: data.email,
			password: data.password,
			user_metadata: {
				full_name: data.full_name,
				org_id: data.org_id,
				role_id: data.role_id,
			},
			name: data.full_name,
			given_name: data.full_name.split(" ")[0],
			family_name: data.full_name.split(" ").slice(1).join(" ") || "",
			verify_email: false,
			email_verified: true,
		});

		const { id } = await db
			.insertInto("users")
			.values({
				id: uuidv4(),
				is_active: true,
				email: data.email,
				org_id: data.org_id,
				role_id: data.role_id,
				auth0_id: auth0_user.data.user_id,
				full_name: data.full_name,
				profile_picture_url: auth0_user.data.picture,
				created_at: new Date(),
				updated_at: new Date(),
			})
			.returning("id")
			.executeTakeFirstOrThrow();

		return {
			id,
		};
	};

	public static getUser = async (id: string) => {
		const db = await DB.getInstance();

		const user = await db
			.selectFrom("users")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirstOrThrow();

		return user;
	};

	public static getAllUser = async (org_id: string) => {
		const db = await DB.getInstance();

		const user = await db.selectFrom("users").selectAll().where("org_id", "=", org_id).execute();

		return user;
	};

	public static updateUser = async (
		id: string,
		data: {
			full_name?: string;
			profile_picture_url?: string;
			role_id?: string;
			email?: string;
		},
	) => {
		const db = await DB.getInstance();

		await db
			.updateTable("users")
			.set({
				...data,
				updated_at: new Date(),
			})
			.where("id", "=", id)
			.execute();
	};

	public static deleteUser = async (id: string) => {
		const db = await DB.getInstance();

		await db.deleteFrom("users").where("id", "=", id).executeTakeFirstOrThrow();
	};

	public static getUserByAuth0Id = async (auth0_id: string) => {
		const db = await DB.getInstance();

		const user = await db
			.selectFrom("users")
			.selectAll()
			.where("auth0_id", "=", auth0_id)
			.executeTakeFirstOrThrow();

		return user;
	};
}
