# Quasar Framework - Estratégia Concursos Edition

## Instalação

```sh
npm i -g https://github.com/estrategiaconcursos/quasar/releases/download/v1.9.15/cli.tar.gz
quasar create my-project
```

## Atualização da base do Quasar

Como de costume em projetos Javacript, de tempos em tempos, diversas libs são consideradas inseguras e por isso é necessário atualizar o Quasar para uma versão mais recente.  
Os passos para atualizar são:

1. Fazer clone da última tag estável do repositório do quasar;
2. Sobrescrever as pastas: app, cli, docs, fastclick, ui e babel-preset-app;
3. Alterar no package.json de cada pasta acima, onde tiver alguma dependência `@quasar/`, trocar a URL do github por `REPO_URL`;
4. Dar um checkout em `cli/assets/logo.art` e alterar a variável preffix em `cli/lib/logger.js`;
5. Remove a chave `funding` em `fastclick/package.json` e `cli/package.json`;
6. Adicionar `direct:REPO_URL/starter-kit.tar.gz` em `cli/bin/quasar-create`;
7. Fazer clone do quasar-starter-kit e sobrescrever o existente;
8. Alterar o `starter-kit/meta.js` para definir o stylus como padrão, removendo o sass e outras opções;
9. Criar o esqueleto em `starter-kit/templates`;
10. Executar o script para substituir `REPO_URL` pela URL da release no GitHub.
11. Criar uma tag com semver de acordo com a mesma versão do Quasar e uma release dela no GitHub;
12. Executar o `./release.sh` e fazer o upload de todos os tar.gz criados para a release no GitHub;
13. Executar `./release.sh build` para criar o `ui.tar.gz`;
14. Copiar o `ui.tar.gz` para a release no GitHub.

## Documentação

```sh
cd docs
npm run build
```
