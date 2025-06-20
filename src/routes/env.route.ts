import { Hono, type Context, type Next } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { EnvController } from "@/controllers/env.controller";
import {
	createEnvRequestSchema,
	updateEnvRequestSchema,
	deleteEnvRequestSchema,
	getEnvRequestSchema,
	batchEnvsRequestSchema,
	envResponseSchema,
	envsResponseSchema,
	batchEnvsDeleteRequestSchema,
	batchEnvsResponseSchema,
} from "@/validators/env.validator";
import { errorResponseSchema } from "@/validators/common";
import { cliMiddleware } from "@/middlewares/cli.middleware";

const app = new Hono();

app.use(authMiddleware());
app.use(cliMiddleware());

app.post(
	"/",
	describeRoute({
		operationId: "getEnvs",
		summary: "Get Environment Variables",
		description: "Retrieve all environment variables for an application and environment type",
		tags: ["Environment Variables"],
		responses: {
			200: {
				description: "Environment variables retrieved successfully",
				content: {
					"application/json": {
						schema: resolver(envsResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", getEnvRequestSchema),
	EnvController.getEnvs,
);

app.post(
	"/:key",
	describeRoute({
		operationId: "getEnv",
		summary: "Get Single Environment Variable",
		description: "Retrieve a specific environment variable",
		tags: ["Environment Variables"],
		responses: {
			200: {
				description: "Environment variable retrieved successfully",
				content: {
					"application/json": {
						schema: resolver(envResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", getEnvRequestSchema),
	EnvController.getEnv,
);

app.put(
	"/single",
	describeRoute({
		operationId: "createEnv",
		summary: "Create Environment Variable",
		description: "Create a new environment variable",
		tags: ["Environment Variables"],
		responses: {
			201: {
				description: "Environment variable created successfully",
				content: {
					"application/json": {
						schema: resolver(envResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", createEnvRequestSchema),
	EnvController.createEnv,
);

app.put(
	"/batch",
	describeRoute({
		operationId: "batchCreateEnvs",
		summary: "Batch Create Environment Variables",
		description: "Create multiple environment variables in a single request",
		tags: ["Environment Variables"],
		responses: {
			201: {
				description: "Environment variables created successfully",
				content: {
					"application/json": {
						schema: resolver(batchEnvsResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", batchEnvsRequestSchema),
	EnvController.batchCreateEnvs,
);

app.delete(
	"/",
	describeRoute({
		operationId: "deleteEnv",
		summary: "Delete Environment Variable",
		description: "Delete an existing environment variable",
		tags: ["Environment Variables"],
		responses: {
			200: {
				description: "Environment variable deleted successfully",
				content: {
					"application/json": {
						schema: resolver(deleteEnvRequestSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", deleteEnvRequestSchema),
	EnvController.deleteEnv,
);

app.patch(
	"/i/:key",
	describeRoute({
		operationId: "updateEnv",
		summary: "Update Environment Variable",
		description: "Update an existing environment variable",
		tags: ["Environment Variables"],
		responses: {
			200: {
				description: "Environment variable updated successfully",
				content: {
					"application/json": {
						schema: resolver(envResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", updateEnvRequestSchema),
	EnvController.updateEnv,
);

app.patch(
	"/batch",
	describeRoute({
		operationId: "batchUpdateEnvs",
		summary: "Batch Update Environment Variables",
		description: "Update multiple environment variables in a single request",
		tags: ["Environment Variables"],
		responses: {
			200: {
				description: "Environment variables updated successfully",
				content: {
					"application/json": {
						schema: resolver(batchEnvsResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", batchEnvsRequestSchema),
	EnvController.batchUpdateEnvs,
);

app.delete(
	"/batch",
	describeRoute({
		operationId: "deleteBatchEnv",
		summary: "Batch Delete Environment Variables",
		description: "Delete multiple environment variables in a single request",
		tags: ["Environment Variables"],
		responses: {
			200: {
				description: "Environment variables deleted successfully",
				content: {
					"application/json": {
						schema: resolver(batchEnvsResponseSchema),
					},
				},
			},
			500: {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: resolver(errorResponseSchema),
					},
				},
			},
		},
	}),
	zValidator("json", batchEnvsDeleteRequestSchema),
	EnvController.batchDeleteEnvs,
);

export default app;
