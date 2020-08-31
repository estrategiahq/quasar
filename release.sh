#!/bin/sh

REPO_URL="https://github.com/estrategiaconcursos/quasar/releases/download/v$VERSION"

# Replace no template
distro=`uname -s`
alias sedy='sed -i'
if [ "$distro" == "Darwin" ]; then
    alias sedy='sed -i ""'
fi
sedy "s,REPO_URL,$REPO_URL,g" "starter-kit/template/package.json"

# Replace em todos os package.json exceto ui/package.json
# for i in `/bin/ls -1d */ | sed -e 's/\///'`; do
folders=("app" "cli" "starter-kit" "extras" "babel-preset-app" "fastclick")
for i in ${folders[@]}; do
    echo "$i"
    sedy "s,REPO_URL,$REPO_URL,g" "$i/package.json"
    tar czf "$i.tar.gz" $i
done


sedy "s,REPO_URL,$REPO_URL,g" "cli/bin/quasar-create"

# Compila e compacta o quasar (pasta ui)
if [ "$1" == "build" ] && [ ! -d "ui/dist" ]; then
    sedy "s,REPO_URL,$REPO_URL,g" "ui/package.json"
    cd "ui"
    yarn install
    yarn build
    cd ..
    tar czf "ui.tar.gz" ui
fi
