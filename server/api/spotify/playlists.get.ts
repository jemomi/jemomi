import {getSpotifyAccessToken} from '#server/utils/spotify';
import type {SpotifyPlaylist} from '#shared/types/spotify';

export default defineCachedEventHandler(async () => {

    const playlistIds = [
        '223cs3uY3L6HPTqfy97VOB',
        '3rZqJv2o8aoOJrAH4miELY',
        '01fb2dzFKtENzlWIY53Ds8',
        '5saCwwYIIgnPOptzThV0o0',
        '3a4eLHyZJLEvE7GqDSoBfR',
    ]

    const result = []

    const token = await getSpotifyAccessToken()

    for await (const item of playlistIds) {
        const res = await $fetch<SpotifyPlaylist>('https://api.spotify.com/v1/playlists/' + item, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        result.push(res)
    }

    return result
}, {
    maxAge: 1000 * 60 * 60 * 24, // 24h cache
    swr: true
})