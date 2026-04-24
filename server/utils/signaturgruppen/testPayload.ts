import type { SignaturIncidentPayload } from '#shared/types/signaturGruppen';

export const createSignaturTestPayload = (): SignaturIncidentPayload => ({
    meta: {
        event_type: 'verification_test',
        generated_at: '2026-04-24T12:34:56.000Z',
    },
    page: {
        id: 'test-page',
        status_indicator: 'none',
        status_description: 'All Systems Operational',
    },
    incident: {
        id: 'test-incident-20260424',
        name: 'Verification notification from jemomi',
        impact: 'maintenance',
        status: 'in_progress',
        shortlink: 'https://jemomi.vercel.app/api/signaturgruppen-status',
        components: [
            {
                id: 'test-component-20260424',
                name: 'Verification Component',
                status: 'under_maintenance',
            },
        ],
        incident_updates: [
            {
                id: 'test-update-20260424',
                status: 'in_progress',
                body: 'This is a self-test notification generated from jemomi. If you can read this embed, Discord formatting is working.',
                affected_components: [
                    {
                        code: 'test-component-20260424',
                        name: 'Verification Component',
                        old_status: 'operational',
                        new_status: 'under_maintenance',
                    },
                ],
                deliver_notifications: true,
                created_at: '2026-04-24T12:34:56.000Z',
            },
        ],
        scheduled_for: '2026-04-24T12:34:56.000Z',
        updated_at: '2026-04-24T12:34:56.000Z',
    },
});
