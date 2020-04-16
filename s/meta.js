const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')

const pkg = require('./package.json')

module.exports = {
  helpers: {
    template_version() {
      return pkg.version
    }
  },

  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Nome do repositório',
    },
    productName: {
      type: 'string',
      required: true,
      message: 'Nome do projeto',
      default: 'Back Office'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Descrição do projeto',
      default: 'Apenas mais uma Admin/Back Office em VueJS',
    },
    author: {
      type: 'string',
      message: 'Autor',
      default: 'Estratégia'
    },
    css: {
      type: 'list',
      message: 'Pré-processador CSS',
      default: 'stylus',
      choices: [
        {
          name: 'Stylus',
          value: 'stylus'
        },
        {
          name: 'Nenhum. Vou usar CSS puro',
          value: 'none',
          short: 'None'
        }
      ]
    },
    importStrategy: {
      type: 'list',
      message: 'Modo de importação dos componentes Quasar',
      default: 'false',
      choices: [
        {
          name: '* Vou adicionar manualmente o que deve ser importado no quasar.conf.js\n    - compilação mais rápida; bundle menor; mais chato.',
          value: 'false',
          short: 'Manual'
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
    lintConfig: {
      when: 'preset.lint',
      type: 'list',
      message: 'Usar o preset standar para o ESLint',
      default: 'standard',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        }
      ]
    },
    cordovaId: {
      type: 'string',
      required: false,
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
          short: 'NPM',
        },
        {
          name: 'Não, depois eu executo `npm install` manualmente',
          value: false,
          short: 'no',
        }
      ]
    }
  },
  filters: {
    '.eslintrc.js': 'preset.lint',
    '.eslintignore': 'preset.lint',
    '.stylintrc': 'preset.lint',
    'src/store/**/*': 'preset.vuex',
    'src/i18n/**/*': 'preset.i18n',
    'src/boot/i18n.js': 'preset.i18n',
    'src/boot/axios.js': 'preset.axios',
    'src/css/app.css': `css === 'none'`,
    'src/css/app.styl': `css === 'stylus'`,
    'src/css/quasar.variables.styl': `css === 'stylus'`,
    'src/css/app.scss': `css === 'scss'`,
    'src/css/quasar.variables.scss': `css === 'scss'`,
    'src/css/app.sass': `css === 'sass'`,
    'src/css/quasar.variables.sass': `css === 'sass'`
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    }
    else {
      printMessage(data, chalk)
    }
  }
}
