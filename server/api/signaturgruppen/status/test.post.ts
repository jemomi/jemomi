import { neon } from '@neondatabase/serverless';
import type { Status } from '#shared/types/signaturGruppen';
import { getDatabaseUrl } from '#server/utils/database';
import { createSignaturTestPayload } from '#server/utils/signaturgruppen/testPayload';

interface TestRequestBody {
    eventId?: number;
}

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const requestBody = await readBody<TestRequestBody>(event).catch(() => ({} as TestRequestBody));
    const requestedId = Number(requestBody?.eventId);

    let payload: Status['payload'];
    let source: 'fixture' | 'database';
    let sourceRecordId: number | null = null;

    if (Number.isFinite(requestedId)) {
        const sql = neon(getDatabaseUrl());
        const [record] = await sql`
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
        sourceRecordId = record.id;
    } else {
        payload = createSignaturTestPayload();
        source = 'fixture';
    }

    const response = await $fetch<{ id: number | null; ok: boolean }>('/api/signaturgruppen/status', {
        method: 'POST',
        body: payload,
    });

    const createdRecordId = response.id ?? null;

    return {
        ok: response.ok,
        source,
        sourceRecordId,
        createdRecordId,
        eventUrl: createdRecordId ? `/api/signaturgruppen-status/${createdRecordId}` : null,
    };
})
