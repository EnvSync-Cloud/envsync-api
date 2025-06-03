import { type Context } from 'hono';

import { UserService } from '@/services/user.service';
import { OrgService } from '@/services/org.service';

export class AuthController {
    public static readonly whoami = async (c: Context) => {
        try {
            const user = await UserService.getUser(c.get("user_id"));
            const org = await OrgService.getOrg(user.org_id);

            return c.json({ user, org });
        }
        catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    }
}