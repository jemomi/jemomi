// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},

    modules: [
        '@nuxt/eslint',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        'nuxt-auth-utils',
    ],

    css: ['~/assets/css/main.css'],

    runtimeConfig: {
        oauth: {
            github: {
                clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
                clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
            }
        },
        databaseUrl: process.env.DATABASE_URL,
        discordNotificationBotUrl: process.env.DISCORD_NOTIFICATION_BOT_URL,
    }
})