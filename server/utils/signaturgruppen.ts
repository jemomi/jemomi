import type {
    SignaturAffectedComponent,
    SignaturComponent,
    SignaturComponentUpdatePayload,
    SignaturIncident,
    SignaturIncidentPayload,
    SignaturIncidentUpdate,
    SignaturPayload,
} from '#shared/types/signaturGruppen';

export interface DiscordEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface DiscordEmbed {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    fields?: DiscordEmbedField[];
    footer?: {
        text: string;
    };
    timestamp?: string;
}

export interface DiscordWebhookMessage {
    content?: string;
    embeds?: DiscordEmbed[];
}

interface BuildDiscordMessageOptions {
    runtimeMarker: string;
    recordId?: number | null;
    isTest?: boolean;
}

const DISCORD_COLORS = {
    critical: 0xDC2626,
    warning: 0xF59E0B,
    info: 0x2563EB,
    success: 0x16A34A,
} as const;

export const getSignaturRuntimeMarker = () => {
    const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown-env';
    const commit = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown-commit').slice(0, 7);
    const host = process.env.VERCEL_URL ?? process.env.URL ?? process.env.HOSTNAME ?? 'unknown-host';

    return `source=jemomi-signaturgruppen env=${env} commit=${commit} host=${host}`;
}

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

export const buildSignaturDiscordMessage = (
    payload: SignaturPayload,
    options: BuildDiscordMessageOptions,
): DiscordWebhookMessage => {
    return isIncidentPayload(payload)
        ? buildIncidentDiscordMessage(payload, options)
        : buildComponentDiscordMessage(payload, options);
}

const buildIncidentDiscordMessage = (
    payload: SignaturIncidentPayload,
    options: BuildDiscordMessageOptions,
): DiscordWebhookMessage => {
    const incident = payload.incident;
    const latestUpdate = getLatestIncidentUpdate(incident);
    const affected = getAffectedComponentNames(latestUpdate?.affected_components, incident.components);
    const state = getIncidentStateMeta(incident.status, incident.impact);
    const timestamp = latestUpdate?.created_at ?? incident.updated_at ?? payload.meta.generated_at;
    const summary = latestUpdate?.body ?? `${incident.name} changed to ${humanizeToken(incident.status ?? 'unknown')}.`;
    const titlePrefix = options.isTest ? '[TEST] ' : '';
    const pageStatus = payload.page.status_description ?? humanizeToken(payload.page.status_indicator ?? 'unknown');
    const detailsUrl = getSignaturDetailsUrl(options.recordId) ?? incident.shortlink;

    return {
        embeds: [
            {
                title: truncate(`${titlePrefix}${state.label}: ${incident.name}`, 256),
                description: truncate(summary, 350),
                url: detailsUrl,
                color: state.color,
                fields: compactFields([
                    inlineField('Status', humanizeToken(incident.status ?? 'unknown')),
                    inlineField('Impact', humanizeToken(incident.impact ?? 'unknown')),
                    inlineField('Page', pageStatus),
                    fullWidthField('Affected Services', affected.length ? affected.join('\n') : 'Not specified'),
                    inlineField('Delivery', latestUpdate?.deliver_notifications === false ? 'suppressed' : 'sent'),
                    inlineField('Incident ID', incident.id),
                    inlineField('Record ID', options.recordId ? String(options.recordId) : 'not stored'),
                ]),
                footer: {
                    text: buildFooter(options.runtimeMarker, options.isTest),
                },
                timestamp,
            },
        ],
    };
}

const buildComponentDiscordMessage = (
    payload: SignaturComponentUpdatePayload,
    options: BuildDiscordMessageOptions,
): DiscordWebhookMessage => {
    const nextStatus = payload.component_update.new_status ?? payload.component.status ?? 'unknown';
    const state = getComponentStateMeta(nextStatus);
    const titlePrefix = options.isTest ? '[TEST] ' : '';
    const detailsUrl = getSignaturDetailsUrl(options.recordId);

    return {
        embeds: [
            {
                title: truncate(`${titlePrefix}${state.label}: ${payload.component.name}`, 256),
                description: `${humanizeToken(payload.component_update.old_status ?? 'unknown')} -> ${humanizeToken(payload.component_update.new_status ?? payload.component.status ?? 'unknown')}`,
                url: detailsUrl,
                color: state.color,
                fields: compactFields([
                    inlineField('Component', payload.component.name),
                    inlineField('Status', humanizeToken(payload.component.status ?? 'unknown')),
                    inlineField('Page', payload.page.status_description ?? humanizeToken(payload.page.status_indicator ?? 'unknown')),
                    inlineField('Component Update ID', payload.component_update.id),
                    inlineField('Record ID', options.recordId ? String(options.recordId) : 'not stored'),
                ]),
                footer: {
                    text: buildFooter(options.runtimeMarker, options.isTest),
                },
                timestamp: payload.component_update.created_at ?? payload.meta.generated_at,
            },
        ],
    };
}

const buildFooter = (runtimeMarker: string, isTest?: boolean) => {
    return isTest ? `${runtimeMarker} • TEST` : runtimeMarker;
}

const getSignaturDetailsUrl = (recordId?: number | null) => {
    if (!recordId) {
        return null;
    }

    return `${getPublicAppUrl()}/api/signaturgruppen-status/${recordId}`;
}

const getPublicAppUrl = () => {
    const explicitUrl = process.env.URL;
    if (explicitUrl) {
        return explicitUrl.replace(/\/$/, '');
    }

    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
    if (vercelUrl) {
        const normalized = vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;

        return normalized.replace(/\/$/, '');
    }

    return 'http://localhost:3000';
}

const compactFields = (fields: Array<DiscordEmbedField | null>): DiscordEmbedField[] => {
    return fields.filter((field): field is DiscordEmbedField => field !== null);
}

const inlineField = (name: string, value: string): DiscordEmbedField | null => {
    if (!value) {
        return null;
    }

    return {
        name,
        value: truncate(value, 128),
        inline: true,
    };
}

const fullWidthField = (name: string, value: string): DiscordEmbedField | null => {
    if (!value) {
        return null;
    }

    return {
        name,
        value: truncate(value, 1024),
    };
}

const getLatestIncidentUpdate = (incident: SignaturIncident): SignaturIncidentUpdate | undefined => {
    return [...(incident.incident_updates ?? [])]
        .sort((left, right) => {
            const leftTime = Date.parse(left.created_at ?? left.updated_at ?? '');
            const rightTime = Date.parse(right.created_at ?? right.updated_at ?? '');

            return rightTime - leftTime;
        })[0];
}

const getAffectedComponentNames = (
    affectedComponents?: SignaturAffectedComponent[] | null,
    components?: SignaturComponent[],
): string[] => {
    const names = affectedComponents?.map(component => component.name) ?? components?.map(component => component.name) ?? [];

    return [...new Set(names)].slice(0, 6);
}

const getIncidentStateMeta = (status?: string, impact?: string) => {
    if (status === 'resolved' || status === 'completed') {
        return { label: 'Resolved', color: DISCORD_COLORS.success };
    }

    if (status === 'monitoring') {
        return { label: 'Monitoring', color: DISCORD_COLORS.info };
    }

    if (status === 'scheduled' || impact === 'maintenance' || status === 'in_progress') {
        return { label: 'Maintenance', color: DISCORD_COLORS.warning };
    }

    if (impact === 'critical' || status === 'investigating') {
        return { label: 'Critical Incident', color: DISCORD_COLORS.critical };
    }

    return { label: 'Incident Update', color: DISCORD_COLORS.info };
}

const getComponentStateMeta = (status?: string) => {
    if (status === 'operational') {
        return { label: 'Component Restored', color: DISCORD_COLORS.success };
    }

    if (status === 'under_maintenance') {
        return { label: 'Component Maintenance', color: DISCORD_COLORS.warning };
    }

    if (status === 'major_outage') {
        return { label: 'Component Outage', color: DISCORD_COLORS.critical };
    }

    return { label: 'Component Update', color: DISCORD_COLORS.info };
}

const humanizeToken = (value: string) => {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, character => character.toUpperCase());
}

const truncate = (value: string, maxLength: number) => {
    return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

const isIncidentPayload = (payload: SignaturPayload): payload is SignaturIncidentPayload => {
    return 'incident' in payload;
}
