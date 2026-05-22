import { z } from 'zod'
import { users } from '#db/schema'
import { eq } from 'drizzle-orm'

const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(1)
})

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse)

    let user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
    })

    if (!user || !await verifyPassword(user.password, password)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: 'Invalid credentials'
        })
    }

    if (passwordNeedsReHash(user.password)) {
        [user] = await db.update(users).set({
            password: await hashPassword(password)
        }).where(
            eq(users.email, email)
        ).returning()

        if (!user) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error'
            })
        }
    }

    await setUserSession(event, {
        createdAt: new Date(),
        user: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    })

    return 'OK'
})
