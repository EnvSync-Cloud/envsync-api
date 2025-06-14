import { type Context } from "hono";

import { AuditLogService } from "@/services/audit_log.service";

export class AuditLogController {
	public static readonly getAuditLogs = async (c: Context) => {
		try {
			const org_id = c.get("org_id");
			const user_id = c.get("user_id");

			const permissions = c.get("permissions");
			
			// Audit logs can only be accessed by admins or masters in the organization
			if (!permissions.is_admin || !permissions.is_master) {
				return c.json({ error: "You do not have permission to access audit logs." }, 403);
			}

			const { page, per_page } = c.req.query();

			const auditLogs = await AuditLogService.getAuditLogs(org_id, {
				page: Number(page) || 1,
				per_page: Number(per_page) || 25,
			});

			// Log the retrieval of audit logs
			await AuditLogService.notifyAuditSystem({
				action: "get_audit_logs",
				user_id,
				org_id,
				message: `Retrieved audit logs.`,
				details: {
					page: Number(page) || 1,
					per_page: Number(per_page) || 25,
				},
			});

			return c.json(auditLogs);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				return c.json({ error: err.message }, 500);
			}
		}
	};
}
