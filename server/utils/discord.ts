import type { DiscordWebhookMessage } from '#server/types/signaturgruppenDiscord';

export async function notifyPrivateDiscord(message: string | DiscordWebhookMessage) {
    const webhookUrl = getPrivateDiscordWebhook();
    await notifyDiscordWebhook(webhookUrl, message);
}

export async function notifyAllDiscord(message: string | DiscordWebhookMessage) {
    const webhookUrls = [
        getPrivateDiscordWebhook(),
        ...getSubscriberDiscordWebhooks(),
    ];

    await Promise.all(webhookUrls.map((url) => notifyDiscordWebhook(url, message)));
}

async function notifyDiscordWebhook(notificationBotUrl: string, message: string | DiscordWebhookMessage) {
    const target = new URL(notificationBotUrl);
    target.searchParams.set('wait', 'false');

    const body = typeof message === 'string'
        ? { content: message }
        : message;

    const response = await fetch(target, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw createError({ statusCode: 500, statusMessage: errorText });
    }
}

function getPrivateDiscordWebhook() {
    const { discordPrivateWebhook } = useRuntimeConfig();
    if (!discordPrivateWebhook) {
        throw createError({ statusCode: 500, statusMessage: 'Missing discordPrivateWebhook' });
    }

    return discordPrivateWebhook;
}

function getSubscriberDiscordWebhooks() {
    const { discordSubscriberWebhooks } = useRuntimeConfig();
    if (!discordSubscriberWebhooks) {
        throw createError({ statusCode: 500, statusMessage: 'Missing discordSubscriberWebhooks' });
    }

    let webhooks: unknown;
    try {
        webhooks = JSON.parse(discordSubscriberWebhooks) as unknown;
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Invalid discordSubscriberWebhooks JSON',
        });
    }

    if (!Array.isArray(webhooks) || webhooks.some((webhook) => typeof webhook !== 'string')) {
        throw createError({
            statusCode: 500,
            statusMessage: 'discordSubscriberWebhooks must be a JSON array of strings',
        });
    }

    return webhooks;
}
