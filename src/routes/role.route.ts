import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";

import { RoleController } from "@/controllers/role.controller";
import {
    createRoleRequestSchema,
    roleResponseSchema,
    rolesResponseSchema,
    updateRoleRequestSchema,
    roleStatsResponseSchema,
} from "@/validators/role.validator";
import { errorResponseSchema } from "@/validators/common";

const app = new Hono();

app.get(
    "/",
    describeRoute({
        operationId: "getAllRoles",
        summary: "Get All Roles",
        description: "Retrieve all roles in the organization",
        tags: ["Roles"],
        responses: {
            200: {
                description: "Roles retrieved successfully",
                content: {
                    "application/json": {
                        schema: resolver(rolesResponseSchema),
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
    RoleController.getAllRoles
);

app.post(
    "/",
    describeRoute({
        operationId: "createRole",
        summary: "Create Role",
        description: "Create a new role in the organization",
        tags: ["Roles"],
        responses: {
            201: {
                description: "Role created successfully",
                content: {
                    "application/json": {
                        schema: resolver(roleResponseSchema),
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
    zValidator("json", createRoleRequestSchema),
    RoleController.createRole
);

app.get(
    "/stats",
    describeRoute({
        operationId: "getRoleStats",
        summary: "Get Role Statistics",
        description: "Retrieve statistics about roles in the organization",
        tags: ["Roles"],
        responses: {
            200: {
                description: "Role statistics retrieved successfully",
                content: {
                    "application/json": {
                        schema: resolver(roleStatsResponseSchema),
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
    RoleController.getRoleStats
);

app.get(
    "/:id",
    describeRoute({
        operationId: "getRole",
        summary: "Get Role",
        description: "Retrieve a specific role by ID",
        tags: ["Roles"],
        responses: {
            200: {
                description: "Role retrieved successfully",
                content: {
                    "application/json": {
                        schema: resolver(roleResponseSchema),
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
    RoleController.getRole
);

app.patch(
    "/:id",
    describeRoute({
        operationId: "updateRole",
        summary: "Update Role",
        description: "Update an existing role",
        tags: ["Roles"],
        responses: {
            200: {
                description: "Role updated successfully",
                content: {
                    "application/json": {
                        schema: resolver(roleResponseSchema),
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
    zValidator("json", updateRoleRequestSchema),
    RoleController.updateRole
);

app.delete(
    "/:id",
    describeRoute({
        operationId: "deleteRole",
        summary: "Delete Role",
        description: "Delete an existing role (non-master roles only)",
        tags: ["Roles"],
        responses: {
            200: {
                description: "Role deleted successfully",
                content: {
                    "application/json": {
                        schema: resolver(roleResponseSchema),
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
    RoleController.deleteRole
);

export default app;
