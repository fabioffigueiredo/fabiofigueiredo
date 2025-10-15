#!/bin/bash

echo "Iniciando deploy manual para GitHub Pages"

# Verifica se a pasta dist existe
if [ ! -d "dist" ]; then
  echo "Pasta 'dist' não encontrada. Execute 'npm run build' primeiro."
  exit 1
fi

# Cria uma pasta temporária
TEMP_DIR=$(mktemp -d)
echo "Criando diretório temporário: $TEMP_DIR"

# Copia os arquivos da pasta dist para a pasta temporária
cp -R dist/* "$TEMP_DIR"

# Inicializa um novo repositório Git na pasta temporária
cd "$TEMP_DIR"
git init
git checkout -b gh-pages

# Adiciona todos os arquivos e faz commit
git add .
git commit -m "Deploy para GitHub Pages"

# Configura o repositório remoto e faz push
REPO_URL=$(cd - > /dev/null && git config --get remote.origin.url)
echo "Enviando para $REPO_URL"
git remote add origin "$REPO_URL"
git push -f origin gh-pages

# Limpa a pasta temporária
cd -
rm -rf "$TEMP_DIR"

echo "Deploy concluído com sucesso!"