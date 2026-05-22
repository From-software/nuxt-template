export default defineEventHandler(async (event) => {
    await authorize(event, listUsers)

    return await db.query.users.findMany({
        columns: {
            password: false
        },
        orderBy(users, { asc }) {
            return asc(users.id)
        }
    })
})
