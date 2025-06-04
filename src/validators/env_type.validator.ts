import z from "zod";
import "zod-openapi/extend";

export const createEnvTypeRequestSchema = z
    .object({
        name: z.string().openapi({ example: "Production" }),
    })
    .openapi({ ref: "CreateEnvTypeRequest" });

export const updateEnvTypeRequestSchema = z
    .object({
        id: z.string().openapi({ example: "env_type_123" }),
        name: z.string().openapi({ example: "Staging" }),
    })
    .openapi({ ref: "UpdateEnvTypeRequest" });

export const envTypeResponseSchema = z
    .object({
        id: z.string().openapi({ example: "env_type_123" }),
        name: z.string().openapi({ example: "Production" }),
        org_id: z.string().openapi({ example: "org_123" }),
        created_at: z.string().openapi({ example: "2023-01-01T00:00:00Z" }),
        updated_at: z.string().openapi({ example: "2023-01-01T00:00:00Z" }),
    })
    .openapi({ ref: "EnvTypeResponse" });

export const envTypesResponseSchema = z
    .array(envTypeResponseSchema)
    .openapi({ ref: "EnvTypesResponse" });

export const deleteEnvTypeRequestSchema = z
    .object({
        id: z.string().openapi({ example: "env_type_123" }),
    })
    .openapi({ ref: "DeleteEnvTypeRequest" });
