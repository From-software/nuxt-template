import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
    modules: ['@nuxt/eslint', 'nuxt-security'],
    devtools: { enabled: true },
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
    }
})