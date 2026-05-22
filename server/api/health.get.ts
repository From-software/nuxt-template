export default defineEventHandler(async () => {
    return {
        status: 'OK',
        timestamp: Date.now()
    }
})
