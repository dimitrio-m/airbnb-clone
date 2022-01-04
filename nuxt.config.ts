import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'airbnb-clone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Router Config
  router: {
    prefetchLinks: false
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    loaders: {
      limit: 0
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  } as any // TS workaround to avoid error with nuxt-bridge's build type definition
})
