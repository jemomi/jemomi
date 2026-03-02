import { neon } from '@neondatabase/serverless';
import type {Status} from '#shared/types/signaturGruppen';

export default defineCachedEventHandler<Promise<Status>>(async (event) => {
    const requestedId = getRouterParam(event, 'id');
    if (!requestedId) {
        throw createError({
            status: 400,
            message: 'Missing id',
        })
    }
    const idNum = Number(requestedId);
    if (!Number.isFinite(idNum)) {
        // id must be number
        throw createError({
            status: 400,
            message: 'invalid id',
        })
    }

    const dbUrl = process.env.DATABASE_URL;

    const sql = neon(dbUrl!);

    const result = await sql`
        select *
        from public.signatur_events
        where id = ${idNum} limit 1
    `;

    const row = result[0] as Status | undefined;
    if (!row) {
        throw createError({
            status: 404,
            message: "Not found"
        })
    }

    return row
}, {
    maxAge: 1000 * 60 * 60 * 24, // 1 day cache
    swr: true
})