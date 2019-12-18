import colors from 'vuetify/es5/util/colors'
import ApiArticle from './apis/ApiArticle.js'
import ApiCategory from './apis/ApiCategory.js'
/*
 ** Config file env
 */

let envFilename = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local'
const env = require('dotenv').config({ path: envFilename })

export default {
  mode: 'spa',
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + 'Rubykachu',
    title: 'Code thần thánh',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Đến thần thánh còn phải còn phải code. Không xem thì hơi phí'
      },
      {
        hid: 'keyword',
        name: 'keyword',
        content: 'công nghệ, làm lại từ đầu, hướng dẫn, tutorial'
      },
      {
        hid: 'copyright',
        name: 'copyright',
        content: 'Copyright © 2019 by Rubykachu'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00BEC1', throttle: 0, height: '3px' },
  /*
   ** Loading start app
   */
  loadingIndicator: {
    name: '@/pages/loading.html'
    // name: 'folding-cube',
    // color: 'white',
    // background: '#00bec1'
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuelidate', '~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /**
   * Router settings
   */
  router: {
    middleware: ['authenticated']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL || `http://localhost:4000`,
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.pink.accent2,
          accent: colors.grey.darken3,
          secondary: '#00BEC1',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.cyan
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    devtools: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    async routes() {
      let routes = []

      const resArticles = await ApiArticle.fsGet({ returnData: true })
      let articles = resArticles.map(article => {
        return '/article/' + article.slug
      })

      const resCategories = await ApiCategory.fsGet()
      let categories = resCategories.map(cate => {
        return '/categories/' + cate.slug
      })

      return routes.concat(articles).concat(categories)
    }
  }
}
