// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  modules: [
    '@nuxt/eslint'
  ],
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
