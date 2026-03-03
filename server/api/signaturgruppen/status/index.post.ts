import { neon } from '@neondatabase/serverless';
import {getDatabaseUrl} from '#server/utils/database';

export default defineEventHandler(async (event) => {
    const databaseUrl = getDatabaseUrl()

    const raw = await readRawBody(event);
    if (!raw) {
        throw createError({statusCode: 400, statusMessage: "Missing body"});
    }

    let payload: any; //eslint-disable-line
    try {
        payload = JSON.parse(raw);
    } catch {
        throw createError({ statusCode: 400, statusMessage: "Invalid JSON" });
    }

    const eventType = payload?.meta?.event_type ?? payload?.event_type ?? null;
    const headers = getHeaders(event);

    const sql = neon(databaseUrl);
    await sql`
        insert into signatur_events (event_type, payload, headers)
        values (${eventType}, ${payload}, ${headers})
    `;

    return {
        statusCode: 200,
        ok: true,
    }
})