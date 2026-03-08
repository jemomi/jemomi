import {getSpotifyAccessToken} from '#server/utils/spotify';

export default defineCachedEventHandler(async (): Promise<unknown> => {

    // 1WNoKxsp715jez1Td4vthc <- might be EC artist id


    /*Links:
    * https://developer.spotify.com/documentation/web-api/tutorials/getting-started
    * https://developer.spotify.com/documentation/web-api/concepts/api-calls?utm_source=chatgpt.com
    * maybe api below works after credential's login?
    * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
    * but might be bad?
    *
    * How else can i get my public playlists in an automatic way?
    * */

    const token = await getSpotifyAccessToken()
    const res = await $fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${ token }`
        }
    })
    console.log(0, res)

    return res
}, {
    maxAge: 1000 * 60 * 60, // 1 hour cache
    swr: true
})