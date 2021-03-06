{{#preset.lint}}/* eslint-env node */{{/preset.lint}}
{{#preset.typescript}}/* eslint-disable @typescript-eslint/no-var-requires */{{/preset.typescript}}
/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

{{#preset.typescript}}
const { configure } = require('quasar/wrappers');
{{/preset.typescript}}

module.exports = {{#preset.typescript}}configure({{/preset.typescript}}function (/* ctx */) {
  function getFromEnvOrDefault (key, value) {
    if (process.env[key]) {
      return JSON.stringify(process.env[key])
    }
    return JSON.stringify(value)
  }
  const API_URL = getFromEnvOrDefault('API_URL', 'http://localhost:4001')

  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'bus',
      'components',
      'services'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.{{#if_eq css "none"}}css{{/if_eq}}{{#if_eq css "stylus"}}styl{{/if_eq}}{{#if_eq css "scss"}}scss{{/if_eq}}{{#if_eq css "sass"}}sass{{/if_eq}}'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'fontawesome-v5',
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'pt-br', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: {{importStrategy}},
      {{#if_eq importStrategy 'false'}}

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],{{else}}
      components: [],
      directives: [],{{/if_eq}}

      plugins: [
        'Notify',
        'Loading',
        'Dialog'
      ]
      
      /*
      config: {
        brand: {
          primary: '#434343',
          secondary: '#C4C4C4',
          accent: '#9C27B0',

          dark: '#1d1d1d',

          positive: '#81Bf97',
          negative: '#DF6756',
          info: '#4FA9D2',
          warning: '#F0DD5D'
        }
      }
      */
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: {{#if preset.ie}}true{{else}}false{{/if}},

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: {{#if preset.typescript}}{{#if preset.lint}}{
      tsCheckerConfig: { eslint: true }
    }{{else}}true{{/if}}{{else}}false{{/if}},

    htmlVariables: {
      buildDate: new Date().toISOString(),
      version: process.env.VERSION || '0.0.1'
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      publicPath: process.env.PUBLIC_PATH || '/',
      env: {
        API_URL
      },

      // rtl: false, // https://quasar.dev/options/rtl-support
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        {{#preset.lint}}
        {{#preset.typescript}}
        if (process.env.NODE_ENV === 'production') {
          // linting is slow in TS projects, we execute it only for production builds
        {{/preset.typescript}}
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
        {{#preset.typescript}}
        }
        {{/preset.typescript}}
        {{/preset.lint}}
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: false // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      // workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: '{{ productName }}',
        {{#preset.typescript}}// eslint-disable-next-line @typescript-eslint/camelcase{{/preset.typescript}}
        short_name: '{{ productName }}',
        description: '{{ description }}',
        display: 'standalone',
        orientation: 'portrait',
        {{#preset.typescript}}// eslint-disable-next-line @typescript-eslint/camelcase{{/preset.typescript}}
        background_color: '#ffffff',
        {{#preset.typescript}}// eslint-disable-next-line @typescript-eslint/camelcase{{/preset.typescript}}
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: '{{ cordovaId }}'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: '{{ name }}'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}{{#preset.typescript}});{{/preset.typescript}}
