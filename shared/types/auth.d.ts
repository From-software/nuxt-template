import type { User as DbUser } from '#db/schema'

declare module '#auth-utils' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends Omit<DbUser, 'password'> {}

    interface UserSession {
        id: string
        createdAt: Date
    }
}

export {}
