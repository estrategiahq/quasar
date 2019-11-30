# {{ productName }} ({{ name }})

{{ description }}

## Setup

### Rodando local
```bash
npm install
EMAIL="admin@estrategia.io" PASSWORD="password" API_URL="http://localhost:4003" npm run serve # Obtem token e injeta no service
```

### Comandos
```bash
npm run lint
npm test
npm test:coverage
```

### Build

```sh
# Variáveis de ambiente
export API_URL=https://my-api.com/graphql
export PUBLIC_PATH=/myapp  # O HTML vai tentar carregar o javascript e CSS como /myapp/index.js 
export VERSION=master      # Versao ou branch escondida na metatag HTML
quasar build
```

## Arquitetura

### Funcionalidades

- Todos os componentes criados na pasta `components` são injetados automaticamente e não precisam ser importados com `import from`
- Os componentes não devem acessar diretamente `fetch`, `axios` ou `apollo`. Essas libs são injetadas no construtor de cada service dentro da pasta `services`
- Todos os arquivos na pasta `services` são injetados e acessíveis nos componentes Vue através de `this.$s`. Ex.: `this.$s.auth.authenticate(params)`
- Existe um EventBus acessível por todos os componentes usando `this.$publish('evt-name', 'evt-data')` e `this.$subscribe('evt-name', callback)`

### Estrutura de pastas

```
.
├── src/
│   ├── assets/              # dynamic assets (processed by webpack)
│   ├── statics/             # pure static assets (directly copied)
│   ├── components/          # .vue components used in pages & layouts
│   ├── css/                 # CSS/Stylus... files for your app
|   |   ├── app.styl
│   ├── layouts/             # layout .vue files
│   ├── pages/               # page .vue files used in routes
│   ├── boot/                # boot files (app initialization code)
│   ├── router/              # Vue Router
|   |   ├── index.js         # Vue Router definition
|   │   └── routes.js        # App Routes definitions
│   ├── store/               # Vuex Store
|   |   ├── index.js         # Vuex Store definition
|   │   ├── <folder>         # Vuex Store Module...
|   │   └── <folder>         # Vuex Store Module...
│   ├── App.vue              # root Vue component of your App
│   └── index.template.html  # Template for index.html
├── src-cordova/             # Cordova generated folder used to create Mobile Apps
├── dist/                    # where production builds go
│   ├── spa/                 # example when building SPA
├── jest/                    # global beforeEach used by tests
├── jest.config.js           # test's configuration
├── quasar.conf.js           # Quasar App Config file
├── babel.config.js          # Babeljs config
├── .editorconfig            # editor config
├── .eslintignore            # ESlint ignore paths
├── .eslintrc.js             # ESlint config
├── .postcssrc.js            # PostCSS config
├── .stylintrc               # Stylus lint config
├── .gitignore               # GIT ignore paths
├── package.json             # npm scripts and dependencies
└── README.md                # readme for your website/App
```

### Como trabalhar

1. Crie services para conter a lógica da aplicação e comunicação usando HTTP Rest ou GraphQL
2. Crie um page e faça com que os métodos utilizados pelos componentes chamem os services
3. Mova os componentes que vão ser reutilizados em outras pages para dentro da pasta `components`
4. Crie uma rota no `router/routes.js` apontando para a determinada page
5. Escreva testes para cada arquivo dentro da pasta `__tests__` ou se preferir, no estilo Go, um arquivo no mesmo nível com o sufixo `.spec.js`

