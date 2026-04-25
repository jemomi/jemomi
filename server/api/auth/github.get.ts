export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true,
    },
    async onSuccess(event, { user }) {
        const allowed = process.env.NUXT_ALLOWED_GITHUB_ID
        if (!allowed || String(user.id) !== String(allowed)) {
            await notifyDiscord(`🔒 Failed login attempt from: ${user.name}`)

            throw createError({ statusCode: 403, message: 'Not allowed' })
        }

        await setUserSession(event, {
            user: {
                githubId: user.id,
                name: user.name,
            }
        })

        await notifyDiscord(`New login from: ${user.name}`)

        return sendRedirect(event, '/')
    },
    onError(event, error) {
        console.error('GitHub OAuth error:', error)
        return sendRedirect(event, '/')
    },
})