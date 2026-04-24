import { neon } from '@neondatabase/serverless';
import type { Status } from '#shared/types/signaturGruppen';
import { getDatabaseUrl } from '#server/utils/database';
import { buildSignaturDiscordMessage } from '#server/utils/signaturgruppen/discordFormatter';
import { getSignaturRuntimeMarker } from '#server/utils/signaturgruppen/runtime';
import { createSignaturTestPayload } from '#server/utils/signaturgruppen/testPayload';

interface TestRequestBody {
    eventId?: number;
}

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const requestBody = await readBody<TestRequestBody>(event).catch(() => ({}));
    const requestedId = Number(requestBody?.eventId);

    let payload: Status['payload'];
    let source: 'fixture' | 'database';
    let recordId: number | null = null;

    if (Number.isFinite(requestedId)) {
        const sql = neon(getDatabaseUrl());
        const [record] = await sql<Status[]>`
            select *
            from public.signatur_events
            where id = ${requestedId}
            limit 1
        `;

        if (!record) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Status event not found',
            });
        }

        payload = record.payload;
        source = 'database';
        recordId = record.id;
    } else {
        payload = createSignaturTestPayload();
        source = 'fixture';
    }

    const message = buildSignaturDiscordMessage(payload, {
        runtimeMarker: getSignaturRuntimeMarker(),
        recordId,
        isTest: true,
    });

    await notifyJemomiDiscordServer(message)

    return {
        ok: true,
        source,
        recordId,
        previewTitle: message.embeds?.[0]?.title ?? null,
    };
})
