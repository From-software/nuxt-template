import { defineConfig } from 'drizzle-kit'
import { getConnectionString } from './db/connection'

export default defineConfig({
    dialect: 'postgresql',
    casing: 'snake_case',
    schema: 'db/schema/index.ts',
    out: 'db/migrations/',
    dbCredentials: {
        url: getConnectionString()
    }
})
