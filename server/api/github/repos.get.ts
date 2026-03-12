import type {GitHubUserRepos} from '#shared/types/github';

export default defineCachedEventHandler(async () => {
    console.log(0, 'connection!')

    return $fetch<GitHubUserRepos>('https://api.github.com/users/jemomi/repos', {
        query: {
            sort: 'updated',
            per_page: 10
        },
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2026-03-10'
        }
    });
}, {
    maxAge: 1000 * 60 * 60 * 24, // 24h cache
})