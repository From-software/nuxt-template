import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '#db/schema'

export const db = drizzle({
    casing: 'snake_case',
    schema,
    connection: {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    }
})
