import { Kysely } from 'kysely';

import { type Database } from '@/types/db';

import { PostgresDB } from './adapters/postgresql';

/**
 * Platform DB class to get the database instance
 */
export class AppDB {
	private static kysely: Promise<Kysely<Database>> | undefined;

	static getInstance(): Promise<Kysely<Database>> {
		this.kysely ??= this._getInstance();

		return this.kysely;
	}

	static async _getInstance(): Promise<Kysely<Database>> {
		const kysely: Kysely<Database> = await PostgresDB.getInstance();

		return kysely;
	}

	static get poolSize(): number {
		return PostgresDB.poolSize;
	}

	static get availableConnections(): number {
		return PostgresDB.availableConnections;
	}
}