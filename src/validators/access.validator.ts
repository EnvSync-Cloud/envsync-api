import z from "zod";
import "zod-openapi/extend";

export const loginUrlResponseSchema = z
    .object({
        message: z.string().openapi({ example: "Login created successfully." }),
        loginUrl: z.string().url().openapi({ example: "https://auth0.com/authorize?client_id=xxx&response_type=code" }),
    })
    .openapi({ ref: "LoginUrlResponse" });

export const callbackResponseSchema = z
    .object({
        message: z.string().openapi({ example: "Login callback successful." }),
        tokenData: z.object({
            access_token: z.string().openapi({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }),
            id_token: z.string().openapi({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }),
            scope: z.string().openapi({ example: "openid profile email" }),
            expires_in: z.number().openapi({ example: 86400 }),
            token_type: z.string().openapi({ example: "Bearer" }),
        }).optional(),
    })
    .openapi({ ref: "CallbackResponse" });
