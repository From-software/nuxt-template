import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        'nuxt-security',
        'nuxt-auth-utils',
        'nuxt-authorization'
    ],
    devtools: { enabled: true },
    runtimeConfig: {
        session: {
            password: '', // NUXT_SESSION_PASSWORD
            maxAge: 60 * 60 * 24 * 7 // 7 days
        }
    },
    alias: {
        '#db': fileURLToPath(new URL('./db', import.meta.url))
    },
    compatibilityDate: '2025-07-15',
    typescript: {
        strict: true
    },
    eslint: {
        config: {
            stylistic: {
                quotes: 'single',
                indent: 4,
                commaDangle: 'never',
                semi: false
            }
        }
    },
    security: {
        strict: true,
        corsHandler: false
    }
})
