import z from "zod";
import "zod-openapi/extend";

const envBaseSchema = z.object({
	key: z.string().openapi({ example: "DATABASE_URL" }),
	value: z.string().openapi({ example: "postgresql://localhost:5432/db" }),
	app_id: z.string().openapi({ example: "app_123" }),
	env_type_id: z.string().openapi({ example: "env_type_123" }),
});

export const createEnvRequestSchema = envBaseSchema.openapi({ ref: "CreateEnvRequest" });

export const updateEnvRequestSchema = envBaseSchema
	.omit({ key: true })
	.openapi({ ref: "UpdateEnvRequest" });

export const deleteEnvRequestSchema = z
	.object({
		app_id: z.string().openapi({ example: "app_123" }),
		env_type_id: z.string().openapi({ example: "env_type_123" }),
		key: z.string().openapi({ example: "DATABASE_URL" }),
	})
	.openapi({ ref: "DeleteEnvRequest" });

export const getEnvRequestSchema = z
	.object({
		app_id: z.string().openapi({ example: "app_123" }),
		env_type_id: z.string().openapi({ example: "env_type_123" }),
	})
	.openapi({ ref: "GetEnvRequest" });

export const batchEnvsRequestSchema = z
	.object({
		app_id: z.string().openapi({ example: "app_123" }),
		env_type_id: z.string().openapi({ example: "env_type_123" }),
		envs: z.array(
			z.object({
				key: z.string().openapi({ example: "API_KEY" }),
				value: z.string().openapi({ example: "secret_key_123" }),
			}),
		),
	})
	.openapi({ ref: "BatchCreateEnvsRequest" });

export const batchEnvsDeleteRequestSchema = z
	.object({
		app_id: z.string().openapi({ example: "app_123" }),
		env_type_id: z.string().openapi({ example: "env_type_123" }),
		keys: z.array(z.string().openapi({ example: "API_KEY" })),
	})
	.openapi({ ref: "BatchDeleteEnvsRequest" });

export const batchEnvsResponseSchema = z
	.object({
		message: z.string().openapi({ example: "Environment variables updated successfully" }),
	})
	.openapi({ ref: "BatchEnvsResponse" });

export const envResponseSchema = z
	.object({
		id: z.string().openapi({ example: "env_123" }),
		key: z.string().openapi({ example: "DATABASE_URL" }),
		value: z.string().openapi({ example: "postgresql://localhost:5432/db" }),
		app_id: z.string().openapi({ example: "app_123" }),
		env_type_id: z.string().openapi({ example: "env_type_123" }),
		org_id: z.string().openapi({ example: "org_123" }),
		created_at: z.string().openapi({ example: "2023-01-01T00:00:00Z" }),
		updated_at: z.string().openapi({ example: "2023-01-01T00:00:00Z" }),
	})
	.openapi({ ref: "EnvResponse" });

export const envsResponseSchema = z.array(envResponseSchema).openapi({ ref: "EnvsResponse" });
