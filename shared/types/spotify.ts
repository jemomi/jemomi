export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    type: string;
    uri: string;
}

export type SpotifyPlaylist = {
    collaborative: boolean;
    description: string;
    external_urls: SpotifyExternalUrls;
    followers: SpotifyFollowers;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: SpotifyUser;
    primary_color: string | null;
    public: boolean | null;
    snapshot_id: string;
    type: 'playlist';
    uri: string;
}

type SpotifyExternalUrls = {
    spotify: string;
}

type SpotifyFollowers = {
    href: string | null;
    total: number;
}

type SpotifyUser = {
    display_name: string | null;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    type: 'user';
    uri: string;
}

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}