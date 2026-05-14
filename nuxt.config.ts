// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint'
    ],
    devtools: { enabled: true },
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
