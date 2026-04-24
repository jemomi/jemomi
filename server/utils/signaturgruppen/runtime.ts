export const getSignaturRuntimeMarker = () => {
    const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown-env';
    const commit = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown-commit').slice(0, 7);
    const host = process.env.VERCEL_URL ?? process.env.URL ?? process.env.HOSTNAME ?? 'unknown-host';

    return `source=jemomi-signaturgruppen env=${env} commit=${commit} host=${host}`;
}

export const getSignaturDetailsUrl = (recordId?: number | null) => {
    if (!recordId) {
        return undefined;
    }

    return `${getPublicAppUrl()}/api/signaturgruppen-status/${recordId}`;
}

const getPublicAppUrl = () => {
    const explicitUrl = process.env.URL;
    if (explicitUrl) {
        return explicitUrl.replace(/\/$/, '');
    }

    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
    if (vercelUrl) {
        const normalized = vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;

        return normalized.replace(/\/$/, '');
    }

    return 'http://localhost:3000';
}
