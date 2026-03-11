import {getSpotifyAccessToken} from '#server/utils/spotify';
import type {SpotifyArtist} from '#shared/types/spotify';

export default defineCachedEventHandler(async () => {

    const artistIds = [
        '1WNoKxsp715jez1Td4vthc',
        '2n2RSaZqBuUUukhbLlpnE6',
        '0L5fC7Ogm2YwgqVCRcF1bT',
        '0uTkKGuqdf7CtKlZLt9N0Y',
        '26eBHxdouBH2KB7P6Oi9HN',
        '3Uobr6LgQpBbk6k4QGAb3V',
        '1dfeR4HaWDbWqFHLkxsg1d',
        '6XyY86QOPPrYVGvF9ch6wz',
        '6om12Ev5ppgoMy3OYSoech',
        '7oPftvlwr6VrsViSDV7fJY',
        '4UXqAaa6dQYAk18Lv7PEgX',
        '7FBcuc1gsnv6Y1nwFtNRCb',
        '6Wr3hh341P84m3EI8qdn9O',
        '6eUKZXaKkcviH0Ku9w2n3V',
        '4gzpq5DPGxSnKTe4SA8HAU',
        '3bO19AOone0ubCsfDXDtYt',
        '7dGJo4pcD2V6oG8kP0tJRR',
        '7vk5e3vY1uw9plTHJAMwjN',
        '0CbeG1224FS58EUx4tPevZ',
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
}, {
    maxAge: 1000 * 60 * 60 * 24, // 24h cache
})