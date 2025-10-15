#!/bin/bash

echo "Configurando autenticação do GitHub para deploy"

# Verifica se o token foi fornecido como argumento
if [ $# -eq 0 ]; then
  echo "Por favor, forneça seu GitHub Personal Access Token como argumento:"
  echo "./setup-github-auth.sh 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"
  exit 1
fi

GITHUB_TOKEN=$1

# Configura o credential helper para armazenar o token
git config --global credential.helper store

# Cria ou atualiza o arquivo .git-credentials
echo "https://$GITHUB_TOKEN:x-oauth-basic@github.com" > ~/.git-credentials

echo "Autenticação configurada com sucesso!"
echo "Agora você pode executar 'npm run deploy' sem precisar inserir credenciais."