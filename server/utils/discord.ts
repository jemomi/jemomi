import type { DiscordWebhookMessage } from '#server/types/signaturgruppenDiscord';

export async function notifyDiscord(message: string | DiscordWebhookMessage) {
    const discordWebhooks = getDiscordWebhooks()
    const arrDiscordWebhooks: string[] = JSON.parse(discordWebhooks)

    await Promise.all(arrDiscordWebhooks.map(url => notifyDiscordServer(url, message)))
}

async function notifyDiscordServer(notificationBotUrl: string, message: string | DiscordWebhookMessage) {
    const target = new URL(notificationBotUrl);
    target.searchParams.set("wait", 'false');

    const body = typeof message === 'string'
        ? { content: message }
        : message;

    const response = await fetch(target, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        throw createError({ statusCode: 500, statusMessage: errorText })
    }
}

const getDiscordWebhooks = () => {
    const { discordNotificationWebhooks } = useRuntimeConfig()
    if (!discordNotificationWebhooks) {
        throw createError({statusCode: 500, statusMessage: "Missing discordNotificationWebhooks"});
    }
    return discordNotificationWebhooks;
}
