export interface SpotifyArtist {
    external_urls: {
        spotify: string;
    }
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    type: string;
    uri: string;
}

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}