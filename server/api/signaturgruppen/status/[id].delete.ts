import { neon } from '@neondatabase/serverless';
import type { Status } from '#shared/types/signaturGruppen';
import { getDatabaseUrl } from '#server/utils/database';

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const requestedId = getRouterParam(event, 'id');
    const idNum = Number(requestedId);

    if (!requestedId || !Number.isFinite(idNum)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid status event id',
        })
    }

    const sql = neon(getDatabaseUrl());
    const [record] = await sql`
        select *
        from public.signatur_events
        where id = ${idNum}
        limit 1
    ` as Status[];

    if (!record) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Status event not found',
        })
    }

    if (!('incident' in record.payload) || !isTestIncident(record)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Only test incidents can be deleted',
        })
    }

    const pageId = record.payload.page.id;
    const incidentId = record.payload.incident.id;

    const deletedRows = await sql`
        delete from public.signatur_events
        where payload ? 'incident'
          and payload->'page'->>'id' = ${pageId}
          and payload->'incident'->>'id' = ${incidentId}
          and (
            event_type = 'verification_test'
            or payload->'meta'->>'event_type' = 'verification_test'
            or payload->'page'->>'id' = 'test-page'
            or payload->'incident'->>'id' like 'test-%'
            or payload->'incident'->>'status' = 'testing'
            or payload->'incident'->>'impact' = 'testing'
          )
        returning id
    ` as { id: number }[];

    return {
        ok: true,
        deletedCount: deletedRows.length,
        deletedIds: deletedRows.map((row) => row.id),
    }
})

const isTestIncident = (statusLine: Status) => {
    if (!('incident' in statusLine.payload)) {
        return false
    }

    const incident = statusLine.payload.incident;

    return statusLine.event_type === 'verification_test'
        || statusLine.payload.meta.event_type === 'verification_test'
        || statusLine.payload.page.id === 'test-page'
        || incident.id.startsWith('test-')
        || incident.status === 'testing'
        || incident.impact === 'testing'
}
