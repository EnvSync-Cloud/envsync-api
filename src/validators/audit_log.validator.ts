import z from "zod";
import "zod-openapi/extend";

export const getAuditLogsQuerySchema = z.object({
	page: z.number().min(1).default(1).openapi({ example: 1 }),
	per_page: z.number().min(1).max(100).default(20).openapi({ example: 20 }),
});

export const getAuditLogsResponseSchema = z
	.array(
		z.object({
			id: z.string().openapi({ example: "audit_123" }),
			action: z.string().openapi({ example: "user_invite_created" }),
			org_id: z.string().openapi({ example: "org_123" }),
			user_id: z.string().openapi({ example: "user_123" }),
			details: z.string().openapi({
				example: JSON.stringify({
					invite_id: "invite_123",
					email: "user@example.com",
					role_id: "role_123",
				}),
			}),
			created_at: z.string().openapi({ example: "2023-01-01T00:00:00Z" }),
			updated_at: z.string().openapi({ example: "2023-01-01T00:00:00Z" }),
		}),
	)
	.openapi({ ref: "GetAuditLogsResponse" });
