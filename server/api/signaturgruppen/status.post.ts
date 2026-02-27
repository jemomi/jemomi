export default defineEventHandler(async (event) => {
    console.log(`Received event: ${JSON.stringify(event)}`);

    return {
        statusCode: 200,
    }
})