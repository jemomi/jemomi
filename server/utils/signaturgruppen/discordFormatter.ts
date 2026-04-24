import type {
    SignaturComponentUpdatePayload,
    SignaturIncidentPayload,
    SignaturPayload,
} from '#shared/types/signaturGruppen';
import type { BuildDiscordMessageOptions, DiscordWebhookMessage } from '#server/types/signaturgruppenDiscord';
import {
    compactFields,
    fullWidthField,
    getAffectedComponentNames,
    getComponentStateMeta,
    getIncidentStateMeta,
    getLatestIncidentUpdate,
    humanizeToken,
    inlineField,
    isIncidentPayload,
    truncate,
} from '#server/utils/signaturgruppen/formatterHelpers';
import { getSignaturDetailsUrl } from '#server/utils/signaturgruppen/runtime';

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
    return isTest ? `${runtimeMarker} | TEST` : runtimeMarker;
}
