import { neon } from '@neondatabase/serverless';

export default defineEventHandler(async (event) => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        throw createError({statusCode: 500, statusMessage: "Missing DATABASE_URL"});
    }

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

    const sql = neon(dbUrl);
    await sql`
    insert into signatur_events (event_type, payload, headers)
    values (${eventType}, ${payload}, ${headers})
  `;

    return {
        statusCode: 200,
        ok: true,
    }
})