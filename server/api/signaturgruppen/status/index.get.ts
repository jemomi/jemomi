import { neon } from '@neondatabase/serverless';
import type {Status} from '#shared/types/signaturGruppen';
import {getDatabaseUrl} from '#server/utils/database';

export default defineCachedEventHandler(async (): Promise<Status[]> => {
    const databaseUrl = getDatabaseUrl()

    const sql = neon(databaseUrl);
    return await sql`
        select *
        from public.signatur_events
        order by id desc
    ` as Status[];
}, {
    maxAge: 60 * 60, // 1 hour cache
    swr: true,
    getKey: async () => {
        const sql = neon(getDatabaseUrl());
        const result = await sql`
            select coalesce(max(id), 0)::int as latest_id
            from public.signatur_events
        ` as { latest_id: number }[];

        return `signatur-events:${result[0]?.latest_id ?? 0}`;
    },
})