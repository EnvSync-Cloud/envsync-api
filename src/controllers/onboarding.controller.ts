import { type Context } from 'hono';

import { OrgService } from '@/services/org.service';
import { RoleService } from '@/services/role.service';
import { EnvTypeService } from '@/services/env_type.service';
import { slugifyName } from '@/utils/random';
import { UserService } from '@/services/user.service';
import { InviteService } from '@/services/invite.service';

export class OnboardingController {
    public static readonly createOrgInvite = async (c: Context) => {
        try {
            const { email } = await c.req.json();

            if (!email) {
                return c.json({ error: 'Email is required.' }, 400);
            }

            const invite_data = await InviteService.createOrgInvite(
                email
            );

            return c.json({ message: 'Organization invite created successfully.', invite_data }, 201);
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
                org_data: {
                    name,
                    size,
                    website
                },
                user_data: {
                    full_name,
                    password
                }
            } = await c.req.json();

            if (!invite_code || !name) {
                return c.json({ error: 'All fields are required.' }, 400);
            }
            
            const invite_data = await InviteService.getOrgInviteByCode(invite_code)

            // Create Org
            const org_id = await OrgService.createOrg({
                name,
                slug: slugifyName(name),
                size,
                website,
            });

            // Create Roles
            const roles = await RoleService.createDefaultRoles(org_id);
            const admin_role_id = roles.find(role => role.name === 'Admin')?.id || '';

            // Create Env Types
            await EnvTypeService.createDefaultEnvTypes(org_id);

            // Create User
            await UserService.createUser({
                email: invite_data.email,
                full_name,
                password,
                org_id,
                role_id: admin_role_id,
            });

            // Accept Invite
            await InviteService.updateOrgInvite(invite_data.id, {
                is_accepted: true,
            });

            return c.json({ message: 'Organization created successfully.' }, 200);
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