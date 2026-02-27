import { neon } from '@neondatabase/serverless';
import type { DBVersion } from '#shared/types/dbVersion';

export default defineEventHandler(async (): Promise<DBVersion> => {
    const sql = neon(process.env.DATABASE_URL!);
    const [response] = await sql`SELECT version()`;
    return { version: response?.version };
});