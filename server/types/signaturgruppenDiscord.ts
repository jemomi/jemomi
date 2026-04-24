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

export interface BuildDiscordMessageOptions {
    runtimeMarker: string;
    recordId?: number | null;
    isTest?: boolean;
}
