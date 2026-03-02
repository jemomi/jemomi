import { neon } from '@neondatabase/serverless';
import type {Status} from '#shared/types/signaturGruppen';

export default defineEventHandler(async (): Promise<Status[]> => {
    const dbUrl = process.env.DATABASE_URL;

    const sql = neon(dbUrl!);
    const result = await sql`
        select * from public.signatur_events
    ` as Status[];

    return result
})