
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{src:'https://use.fontawesome.com/releases/v5.3.1/js/all.js'}],
  },

  router: {
    linkActiveClass: 'active-link'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/style',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
     '~/plugins/vue-swal',
     { src: "~/plugins/vue-quill-editor.js", ssr: false },
     { src: '~/plugins/v-calendar.js', ssr: false },
    
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-swal'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
