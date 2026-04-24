import type { DiscordWebhookMessage } from '#server/types/signaturgruppenDiscord';

export async function notifyJemomiDiscordServer(message: string | DiscordWebhookMessage) {
    const notificationBotUrl = getNotificationBotUrl()

    const target = new URL(notificationBotUrl);
    target.searchParams.set("wait", 'false');

    const body = typeof message === 'string'
        ? { content: message }
        : message;

    const response = await fetch(target, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        throw createError({statusCode: 500, statusMessage: errorText});
    }
}

const getNotificationBotUrl = () => {
    const { discordNotificationBotUrl } = useRuntimeConfig()
    if (!discordNotificationBotUrl) {
        throw createError({statusCode: 500, statusMessage: "Missing discordNotificationBotUrl"});
    }
    return discordNotificationBotUrl;
}
