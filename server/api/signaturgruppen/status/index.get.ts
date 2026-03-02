import { neon } from '@neondatabase/serverless';
import type {Status} from '#shared/types/signaturGruppen';

export default defineCachedEventHandler(async (): Promise<Status[]> => {
    const dbUrl = process.env.DATABASE_URL;

    const sql = neon(dbUrl!);
    return await sql`
        select * from public.signatur_events
    ` as Status[];
}, {
    maxAge: 1000 * 60 * 60, // 1 hour cache
    swr: true
})