import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '#db/schema'
import { getConnectionString } from '#db/connection'

export const db = drizzle({
    casing: 'snake_case',
    schema,
    connection: getConnectionString()
})
