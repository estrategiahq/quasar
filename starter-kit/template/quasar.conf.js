module.exports = function (ctx) {
  function getFromEnvOrDefault (key, value) {
    if (process.env[key]) {
      return JSON.stringify(process.env[key])
    }
    return JSON.stringify(value)
  }

  return {
    boot: [
      'bus',
      'components',
      'services'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      iconSet: 'fontawesome-v5', // Quasar icon set
      lang: 'pt-br', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: false,

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QForm',
        'QInput',
        'QToggle',
        'QSelect',
        'QDialog',
        'QSpinner',
        'QTable',
        'QTr',
        'QTd',
        'QBadge',
        'QAvatar',
        'QChip'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      plugins: [
        'Notify',
        'Loading',
        'LocalStorage'
      ]
    },

    supportIE: false,

    htmlVariables: {
      buildDate: new Date().toISOString(),
      version: process.env.VERSION || '0.0.1'
    },

    build: {
      publicPath: process.env.PUBLIC_PATH || '/',
      env: {
        API_URL: getFromEnvOrDefault('API_URL', 'https://api.github.com/graphql'),
        AUTH_COOKIE: getFromEnvOrDefault('AUTH_COOKIE', false)
      },
      scopeHoisting: true,
      vueRouterMode: 'hash',
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    devServer: {
      // https: true,
      port: 8080,
      open: false // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar App',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
    },

    electron: {
      extendWebpack (cfg) {
      },
      packager: {
      },
      builder: {
      }
    }
  }
}
