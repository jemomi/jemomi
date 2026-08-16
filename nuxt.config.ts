// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    app: {
        head: {
            script: [
                {
                    innerHTML: "(function(){try{var key='theme';var stored=localStorage.getItem(key);var theme=stored==='dark'||stored==='light'?stored:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var root=document.documentElement;root.classList.toggle('dark',theme==='dark');root.dataset.theme=theme;root.style.colorScheme=theme;}catch(e){}})()",
                },
            ],
        },
    },

    modules: [
        '@nuxt/eslint',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        'nuxt-auth-utils',
        '@vercel/analytics/nuxt',
    ],

    css: ['~/assets/css/main.css'],

    tailwindcss: {
        configPath: 'tailwind.config.js',
    },

    runtimeConfig: {
        oauth: {
            github: {
                clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
                clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
            }
        },
        databaseUrl: process.env.DATABASE_URL,
        discordPrivateWebhook: process.env.DISCORD_PRIVATE_WEBHOOK,
        discordSubscriberWebhooks: process.env.DISCORD_SUBSCRIBER_WEBHOOKS,
    }
})
