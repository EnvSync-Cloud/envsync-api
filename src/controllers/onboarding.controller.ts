import { type Context } from 'hono';

export class OnboardingController {
    public static readonly createOrgInvite = async (c: Context) => {
        try {
            const { email } = await c.req.json();

            if (!email) {
                return c.json({ error: 'Email is required.' }, 400);
            }

            return c.json({ message: 'Organization invite created successfully.' }, 201);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly acceptOrgInvite = async (c: Context) => {
        try {
            const {
                invite_code,
            } = c.req.param();

            const {
                name,
                slug,
                size,
                website,
            } = await c.req.json();

            if (!invite_code || !name || !slug || !size || !website) {
                return c.json({ error: 'All fields are required.' }, 400);
            }

            return c.json({ message: 'User invite accepted successfully.' }, 200);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly getOrgInviteByCode = async (c: Context) => {
        try {
            const { invite_code } = c.req.param();

            if (!invite_code) {
                return c.json({ error: 'Invite code is required.' }, 400);
            }

            return c.json({ message: 'Organization invite retrieved successfully.' }, 200);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly createUserInvite = async (c: Context) => {
        try {
            const { email, role_id } = await c.req.json();

            if (!email || !role_id) {
                return c.json({ error: 'Email and role ID are required.' }, 400);
            }

            return c.json({ message: 'User invite created successfully.' }, 201);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly acceptUserInvite = async (c: Context) => {
        try {
            const {
                invite_code,
            } = c.req.param();

            const {
                full_name,
            } = await c.req.json();

            if (!invite_code || !full_name) {
                return c.json({ error: 'All fields are required.' }, 400);
            }

            return c.json({ message: 'User invite accepted successfully.' }, 200);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }

    public static readonly getUserInviteByCode = async (c: Context) => {
        try {
            const {
                invite_code,
            } = c.req.param();

            if (!invite_code) {
                return c.json({ error: 'Invite code is required.' }, 400);
            }

            return c.json({ message: 'User invite retrieved successfully.' }, 200);
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }
}