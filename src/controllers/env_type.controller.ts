import { type Context } from 'hono';

import { EnvTypeService } from '@/services/env_type.service';

export class EnvTypeController {
    public static readonly getEnvTypes = async (c: Context) => {
        try {
            const org_id = c.get("org_id");
            const env_types = await EnvTypeService.getEnvTypes(org_id);
            return c.json(env_types);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly createEnvType = async (c: Context) => {
        try {
            const org_id = c.get("org_id");
            const { name } = await c.req.json();

            if (!name) {
                return c.json({ error: 'Name is required.' }, 400);
            }

            const env_type = await EnvTypeService.createEnvType({org_id, name});
            return c.json(env_type, 201);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly updateEnvType = async (c: Context) => {
        try {
            const org_id = c.get("org_id");
            const { id, name } = await c.req.json();

            if (!id || !name) {
                return c.json({ error: 'ID and Name are required.' }, 400);
            }

            // check existance and ownership
            const envType = await EnvTypeService.getEnvType(id);
            
            if (!envType) {
                return c.json({ error: 'Env type not found.' }, 404);
            }
            if (envType.org_id !== org_id) {
                return c.json({ error: 'You do not have permission to update this env type.' }, 403);
            }

            await EnvTypeService.updateEnvType(id, { name });
            return c.json({ message: 'Env type updated successfully.' });
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly deleteEnvType = async (c: Context) => {
        try {
            const org_id = c.get("org_id");
            const { id } = await c.req.json();

            if (!id) {
                return c.json({ error: 'ID is required.' }, 400);
            }

            // check existance and ownership
            const envType = await EnvTypeService.getEnvType(id);
            if (!envType) {
                return c.json({ error: 'Env type not found.' }, 404);
            }
            if (envType.org_id !== org_id) {
                return c.json({ error: 'You do not have permission to delete this env type.' }, 403);
            }

            await EnvTypeService.deleteEnvType(id);
            return c.json({ message: 'Env type deleted successfully.' });
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly getEnvType = async (c: Context) => {
        try {
            const org_id = c.get("org_id");
            const { id } = await c.req.json();

            if (!id) {
                return c.json({ error: 'ID is required.' }, 400);
            }

            // check existance and ownership
            const envType = await EnvTypeService.getEnvType(id);
            if (!envType) {
                return c.json({ error: 'Env type not found.' }, 404);
            }
            if (envType.org_id !== org_id) {
                return c.json({ error: 'You do not have permission to get this env type.' }, 403);
            }

            return c.json(envType);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }
}