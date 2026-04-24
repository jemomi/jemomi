import { neon } from '@neondatabase/serverless';
import {getDatabaseUrl} from '#server/utils/database';
import type { Status } from '#shared/types/signaturGruppen';
import { buildSignaturDiscordMessage } from '#server/utils/signaturgruppen/discordFormatter';
import { getSignaturRuntimeMarker } from '#server/utils/signaturgruppen/runtime';

export default defineEventHandler(async (event) => {
    const databaseUrl = getDatabaseUrl()

    const raw = await readRawBody(event);
    if (!raw) {
        throw createError({statusCode: 400, statusMessage: "Missing body"});
    }

    let payload: Status['payload'];
    try {
        payload = JSON.parse(raw);
    } catch {
        throw createError({ statusCode: 400, statusMessage: "Invalid JSON" });
    }

    const eventType = payload.meta?.event_type ?? null;
    const headers = getHeaders(event);

    const sql = neon(databaseUrl);
    const [inserted] = await sql<Pick<Status, 'id'>[]>`
        insert into signatur_events (event_type, payload, headers)
        values (${eventType}, ${payload}, ${headers})
        returning id
    `;

    await notifyJemomiDiscordServer(buildSignaturDiscordMessage(payload, {
        runtimeMarker: getSignaturRuntimeMarker(),
        recordId: inserted?.id ?? null,
    }))

    return {
        statusCode: 200,
        ok: true,
        id: inserted?.id ?? null,
    }
})
