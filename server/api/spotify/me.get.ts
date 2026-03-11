import {getSpotifyAccessToken} from '#server/utils/spotify';

export default defineCachedEventHandler(async (): Promise<unknown> => {
    /*Links:
    * https://developer.spotify.com/documentation/web-api/tutorials/getting-started
    * https://developer.spotify.com/documentation/web-api/concepts/api-calls
    * maybe api below works after credential's login?
    * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
    * That way a visitor, with a spotify login can see my profile info
    * But will be left for another time...
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