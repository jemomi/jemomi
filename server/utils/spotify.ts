type CachedToken = {
    accessToken: string
    expiresAt: number
}

export async function getSpotifyAccessToken() {
    const storage = useStorage('cache')
    const cached = await storage.getItem<CachedToken>('spotify:app-token')
    const now = Date.now()

    if (cached && cached.expiresAt > now + 60_000) {
        return cached.accessToken
    }

    const { oauth } = useRuntimeConfig()

    /*const basic = Buffer
        .from(`${config.spotifyClientId}:${config.spotifyClientSecret}`)
        .toString('base64')

    const body = new URLSearchParams({ grant_type: 'client_credentials' })*/

    const token = await $fetch<{
        access_token: string
        expires_in: number
    }>('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            grant_type: 'client_credentials',
            client_id: oauth.spotify.clientId,
            client_secret: oauth.spotify.clientSecret,
        }
    })

    await storage.setItem('spotify:app-token', {
        accessToken: token.access_token,
        expiresAt: now + token.expires_in * 1000
    })

    return token.access_token
}