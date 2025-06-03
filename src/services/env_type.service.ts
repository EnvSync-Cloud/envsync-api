import { v4 as uuidv4 } from 'uuid';

import { DB } from "@/libs/db";

export class EnvTypeService {
    public static createEnvType = async (
        {
            name,
            org_id
        }: {
            name: string;
            org_id: string;
        }
    ) => {
        const db = await DB.getInstance();
        
        const { id } = await db
            .insertInto('env_type')
            .values({
                id: uuidv4(),
                name,
                org_id,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning('id')
            .executeTakeFirstOrThrow();

        return {id, name};
    }

    public static createDefaultEnvTypes = async (
        org_id: string
    ) => {
        const db = await DB.getInstance();

        const rawEnvTypes = [
            { name: 'Production', org_id },
            { name: 'Staging', org_id },
            { name: 'Development', org_id },
        ];

        const env_typeInserts = rawEnvTypes.map(env_type => ({
            id: uuidv4(),
            ...env_type,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        const env_types = await db
            .insertInto('env_type')
            .values(env_typeInserts)
            .returningAll()
            .execute();

        return env_types;
    }
}