import type {Endpoints} from '@octokit/types';

export type GitHubUserRepos = Endpoints['GET /users/{username}/repos']['response']['data']

export type GitHubUserRepo = GitHubUserRepos[number]
