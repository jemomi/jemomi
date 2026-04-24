import type {
    SignaturAffectedComponent,
    SignaturComponent,
    SignaturComponentUpdatePayload,
    SignaturIncident,
    SignaturIncidentPayload,
    SignaturIncidentUpdate,
    SignaturPayload,
} from '#shared/types/signaturGruppen';
import type { DiscordEmbedField } from '#server/types/signaturgruppenDiscord';

const DISCORD_COLORS = {
    critical: 0xDC2626,
    warning: 0xF59E0B,
    info: 0x2563EB,
    success: 0x16A34A,
} as const;

export const compactFields = (fields: Array<DiscordEmbedField | null>): DiscordEmbedField[] => {
    return fields.filter((field): field is DiscordEmbedField => field !== null);
}

export const inlineField = (name: string, value: string): DiscordEmbedField | null => {
    if (!value) {
        return null;
    }

    return {
        name,
        value: truncate(value, 128),
        inline: true,
    };
}

export const fullWidthField = (name: string, value: string): DiscordEmbedField | null => {
    if (!value) {
        return null;
    }

    return {
        name,
        value: truncate(value, 1024),
    };
}

export const getLatestIncidentUpdate = (incident: SignaturIncident): SignaturIncidentUpdate | undefined => {
    return [...(incident.incident_updates ?? [])]
        .sort((left, right) => {
            const leftTime = Date.parse(left.created_at ?? left.updated_at ?? '');
            const rightTime = Date.parse(right.created_at ?? right.updated_at ?? '');

            return rightTime - leftTime;
        })[0];
}

export const getAffectedComponentNames = (
    affectedComponents?: SignaturAffectedComponent[] | null,
    components?: SignaturComponent[],
): string[] => {
    const names = affectedComponents?.map(component => component.name) ?? components?.map(component => component.name) ?? [];

    return [...new Set(names)].slice(0, 6);
}

export const getIncidentStateMeta = (status?: string, impact?: string) => {
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

export const getComponentStateMeta = (status?: string) => {
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

export const humanizeToken = (value: string) => {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, character => character.toUpperCase());
}

export const truncate = (value: string, maxLength: number) => {
    return value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;
}

export const isIncidentPayload = (payload: SignaturPayload): payload is SignaturIncidentPayload => {
    return 'incident' in payload;
}

export const isComponentPayload = (payload: SignaturPayload): payload is SignaturComponentUpdatePayload => {
    return 'component_update' in payload;
}
