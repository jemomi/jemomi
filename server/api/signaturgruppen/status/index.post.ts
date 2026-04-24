import { neon } from '@neondatabase/serverless';
import {getDatabaseUrl} from '#server/utils/database';

const getRuntimeMarker = () => {
    const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown-env';
    const commit = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown-commit').slice(0, 7);
    const host = process.env.VERCEL_URL ?? process.env.URL ?? process.env.HOSTNAME ?? 'unknown-host';

    return `source=jemomi-signaturgruppen env=${env} commit=${commit} host=${host}`;
}

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

    notifyJemomiDiscordServer(`[${getRuntimeMarker()}] WARNING New SignaturGruppen Status: ${raw}`)

    return {
        statusCode: 200,
        ok: true,
    }
})
