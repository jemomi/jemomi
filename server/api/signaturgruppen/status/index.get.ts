import { neon } from '@neondatabase/serverless';
import type {Status} from '#shared/types/signaturGruppen';
import {getDatabaseUrl} from '#server/utils/database';

export default defineCachedEventHandler(async (): Promise<Status[]> => {
    const databaseUrl = getDatabaseUrl()

    const sql = neon(databaseUrl);
    return await sql`
        select * from public.signatur_events
    ` as Status[];
}, {
    maxAge: 1000 * 60 * 60, // 1 hour cache
    swr: true
})