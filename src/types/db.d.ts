import type { ColumnType } from "kysely";

interface BaseTable {
    id: ColumnType<string>;
    created_at: ColumnType<Date>;
    updated_at: ColumnType<Date>;
}

interface InviteOrg extends BaseTable {
    email: ColumnType<string>;
    invite_token: ColumnType<string>;
    is_accepted: ColumnType<boolean>;
}

interface InviteUser extends BaseTable {
    email: ColumnType<string>;
    role_id: ColumnType<string>;
    invite_token: ColumnType<string>;
    is_accepted: ColumnType<boolean>;
    org_id: ColumnType<string>;
}

interface OrgRole extends BaseTable {
    org_id: ColumnType<string>;
    name: ColumnType<string>;
}

interface EnvStore extends BaseTable {
    org_id: ColumnType<string>;
    env_type_id: ColumnType<string>;
    key: ColumnType<string>;
    value: ColumnType<string>;
}

interface AuditLog extends BaseTable {
    org_id: ColumnType<string>;
    user_id: ColumnType<string>;
    action: ColumnType<string>;
    details: ColumnType<string>;
}

interface App extends BaseTable {
    name: ColumnType<string>;
    org_id: ColumnType<string>;
    description: ColumnType<string>;
    metadata: ColumnType<Record<string, any>>;
}

interface EnvType extends BaseTable {
    org_id: ColumnType<string>;
    name: ColumnType<string>;
}

interface Users extends BaseTable {
    email: ColumnType<string>;
    org_id: ColumnType<string>;
    role_id: ColumnType<string>;
    auth0_id?: ColumnType<string | null>;
    full_name?: ColumnType<string | null>;
    profile_picture_url?: ColumnType<string | null>;
    last_login?: ColumnType<Date | null>;
    is_active: ColumnType<boolean>;
}

interface Orgs extends BaseTable {
    name: ColumnType<string>;
    logo_url?: ColumnType<string | null>;
    slug: ColumnType<string>;
    size?: ColumnType<string | null>;
    website?: ColumnType<string | null>;
    metadata: ColumnType<Record<string, any>>;
}

export interface Database {
    invite_org: InviteOrg;
    invite_user: InviteUser;
    org_role: OrgRole;
    env_store: EnvStore;
    audit_log: AuditLog;
    app: App;
    env_type: EnvType;
    users: Users;
    orgs: Orgs;
}