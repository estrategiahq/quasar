const { complete } = require('./utils')

module.exports = {
  prompts: {
    name: {
      type: 'string',
      message: 'Nome do repositório',
      validate: val => val && val.length > 0
    },

    productName: {
      type: 'string',
      message: 'Nome do projeto',
      default: 'Back Office'
      validate: val => val && val.length > 0
    },

    description: {
      type: 'string',
      message: 'Descrição do projeto',
      default: 'Apenas mais uma Admin/Back Office em VueJS',
    },

    author: {
      type: 'string',
      message: 'Autor',
      default: 'Estratégia HQ'
    },

    css: {
      type: 'list',
      message: 'Pick your favorite CSS preprocessor: (can be changed later)',
      default: 'none',
      choices: [
        {
          name: 'None (the others will still be available)',
          value: 'none',
          short: 'None'
        },
        {
          name: 'Stylus',
          value: 'stylus'
        }
      ]
    },

    importStrategy: {
      type: 'list',
      message: 'Modo de importação dos componentes Quasar',
      choices: [
        {
          name: '* Vou adicionar manualmente o que deve ser importado no quasar.conf.js\n    - compilação mais rápida; bundle menor; mais chato.',
          value: 'false',
          short: 'Manual',
          checked: true
        }
      ]
    },

    preset: {
      type: 'checkbox',
      message: 'Usar ESLint',
      choices: [
        {
          name: 'ESLint',
          value: 'lint',
          checked: true
        }
      ]
    },

    typescriptConfig: {
      when: 'preset.typescript',
      type: 'list',
      message: 'Pick a component style:',
      choices: [
        {
          name:
            'Composition API (recommended) (https://github.com/vuejs/composition-api)',
          value: 'composition',
          short: 'Composition',
        },
        {
          name:
            'Class-based (recommended) (https://github.com/vuejs/vue-class-component & https://github.com/kaorun343/vue-property-decorator)',
          value: 'class',
          short: 'Class',
        },
        {
          name: 'Object API',
          value: 'object',
          short: 'object',
        }
      ]
    },

    lintConfig: {
      when: 'preset.lint',
      type: 'list',
      message: 'Usar o preset standard para o ESLint',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard'
        }
      ]
    },

    cordovaId: {
      type: 'string',
      message: 'Cordova id (deixe em branco se esse projeto não vai ser um app mobile)',
      default: 'io.estrategia.app'
    },

    autoInstall: {
      type: 'list',
      message: 'Executar `npm install` após a criação do projeto?',
      default: 'npm',
      choices: [
        {
          name: 'Sim',
          value: 'npm',
          short: 'NPM'
        },
        {
          name: 'Não, depois eu executo `npm install` manualmente',
          value: false,
          short: 'no'
        }
      ]
    }
  },

  filters: {
    // ESlint files
    '.eslintignore': 'preset.lint',
    '.eslintrc.js': 'preset.lint',
    
    // Default files when not using TypeScript
    'jsconfig.json': '!preset.typescript',
    'src/router/*.js': '!preset.typescript',
    
    // Presets files when not using TypeScript
    'src/boot/axios.js': 'preset.axios && !preset.typescript',
    'src/boot/i18n.js': 'preset.i18n && !preset.typescript',
    'src/i18n/**/*.js': 'preset.i18n && !preset.typescript',
    'src/store/**/*.js': 'preset.vuex && !preset.typescript',
    
    // TypeScript files
    '.prettierrc': `preset.lint && preset.typescript && lintConfig === 'prettier'`,
    'tsconfig.json': 'preset.typescript',
    'src/env.d.ts': 'preset.typescript',
    'src/shims-vue.d.ts': 'preset.typescript',
    'src/components/CompositionComponent.vue': `preset.typescript && typescriptConfig === 'composition'`,
    'src/components/ClassComponent.vue': `preset.typescript && typescriptConfig === 'class'`,
    'src/components/ObjectComponent.vue': `preset.typescript && typescriptConfig === 'object'`,
    'src/components/models.ts': `preset.typescript`,
    
    // Default files using TypeScript
    'src/router/*.ts': 'preset.typescript',
    
    // Presets files using TypeScript
    'src/boot/axios.ts': 'preset.axios && preset.typescript',
    'src/boot/composition-api.ts': `preset.typescript && typescriptConfig === 'composition'`,
    'src/boot/i18n.ts': 'preset.i18n && preset.typescript',
    'src/i18n/**/*.ts': 'preset.i18n && preset.typescript',
    'src/store/**/*.ts': 'preset.vuex && preset.typescript',
    
    // CSS preprocessors
    '.stylintrc': `preset.lint && css === 'stylus'`,
    'src/css/*.styl': `css === 'stylus'`,
    'src/css/*.scss': `css === 'scss'`,
    'src/css/*.sass': `css === 'sass'`,
    'src/css/app.css': `css === 'none'`,
  },

  complete
};
