import { v4 as uuidv4 } from "uuid";

import { DB } from "@/libs/db";

export class AuditLogService {
	public static notifyAuditSystem = async ({
		action,
		org_id,
		user_id,
        details
	}: {
        details: Record<string, any>;
		action: string;
		org_id: string;
		user_id: string;
	}) => {
		const db = await DB.getInstance();

		await db
			.insertInto("audit_log")
			.values({
				id: uuidv4(),
				action,
				org_id,
				user_id,
                details: JSON.stringify(details),
				created_at: new Date(),
                updated_at: new Date(),
			})
			.execute();
	};

    public static getAuditLogs = async (org_id: string) => {
        const db = await DB.getInstance();

        const auditLogs = await db
            .selectFrom("audit_log")
            .selectAll()
            .where("org_id", "=", org_id)
            .orderBy("created_at", "desc")
            .execute();

        return auditLogs;
    };
}