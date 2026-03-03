export const getDatabaseUrl = (): string => {
    const { databaseUrl } = useRuntimeConfig()
    if (!databaseUrl) {
        throw createError({statusCode: 500, statusMessage: "Missing DATABASE_URL"});
    }
    return databaseUrl;
}