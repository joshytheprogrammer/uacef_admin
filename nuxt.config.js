export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'UACEF - Admin Portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Explore the power of efficient administration with UACEF Admin. Streamline operations, manage tasks, and enhance productivity effortlessly. Our intuitive platform simplifies administrative tasks, empowering you to focus on what truly matters. Join UACEF Admin today and experience the future of seamless management.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: true, }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyDyRqhJDdfZcbHnS6EBH8yNXgakttO-HsI",
      authDomain: "uacef-ng.firebaseapp.com",
      projectId: "uacef-ng",
      storageBucket: "uacef-ng.appspot.com",
      messagingSenderId: "894787399848",
      appId: "1:894787399848:web:5ab430196d8db422da129d"
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false
        },
        emulatorPort: undefined,
      },
      firestore: true,
      functions: false,
      storage: false,
      database: false,
      messaging: false,
      performance: false,
      analytics: false,
      remoteConfig: false
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Admin Portal',
      short_name: 'UACEF',
      description: 'Manage the UACEF website',
      lang: 'en',
      background_color: '#581C87',
      theme_color: '#581C87'
    },
    icon: {
      fileName: 'icon.png',
      sizes: [64, 120, 144, 12, 192, 384, 512]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  styleResources: {
    scss: [
      '@/assets/scss/app.scss',
    ],
    hoistUseStatements:  true,
  },

  // Add global page transition
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    css: false,
  }
}
