import {getSpotifyAccessToken} from '#server/utils/spotify';
import type {SpotifyArtist} from '#shared/types/spotify';

export default defineEventHandler(async (event) => {
    // get list from DB

    const artistIds = [
        '1WNoKxsp715jez1Td4vthc',
        '2n2RSaZqBuUUukhbLlpnE6',
    ]

    const result = []

    const token = await getSpotifyAccessToken()

    for await (const item of artistIds) {
        const res = await $fetch<SpotifyArtist>('https://api.spotify.com/v1/artists/' + item, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        result.push(res)
    }

    return result
})