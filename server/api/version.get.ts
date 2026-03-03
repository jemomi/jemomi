import { neon } from '@neondatabase/serverless';
import type { DBVersion } from '#shared/types/dbVersion';
import {getDatabaseUrl} from '#server/utils/database';

export default defineEventHandler(async (): Promise<DBVersion> => {
    const databaseUrl = getDatabaseUrl()
    const sql = neon(databaseUrl);
    const [response] = await sql`SELECT version()`;
    return { version: response?.version };
});