#!/bin/bash

# 🚀 Script de Deploy Rápido - Travel API
# Execute este script para preparar o projeto para deploy

echo "🚀 Preparando Travel API para Deploy..."

# 1. Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório do projeto (onde está o package.json)"
    exit 1
fi

# 2. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 3. Testar o servidor localmente
echo "🧪 Testando servidor localmente..."
timeout 5 npm start &
sleep 3

# 4. Testar endpoints
echo "🔍 Testando endpoints..."
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ Health check: OK"
else
    echo "❌ Health check: FALHOU"
fi

if curl -s http://localhost:3000/api/v1/destinos > /dev/null; then
    echo "✅ API destinos: OK"
else
    echo "❌ API destinos: FALHOU"
fi

# 5. Verificar arquivos necessários
echo "📋 Verificando arquivos necessários..."

files=("package.json" "server.js" "Procfile" "vercel.json" "railway.yaml" ".gitignore" "README.md")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file: Encontrado"
    else
        echo "❌ $file: Não encontrado"
    fi
done

# 6. Instruções finais
echo ""
echo "🎉 Projeto preparado para deploy!"
echo ""
echo "📌 Próximos passos:"
echo "1. Commit e push para GitHub:"
echo "   git add ."
echo "   git commit -m 'Preparado para deploy'"
echo "   git push origin main"
echo ""
echo "2. Escolha uma plataforma de deploy:"
echo "   🚂 Railway: https://railway.app (Mais fácil)"
echo "   🎨 Render: https://render.com (Gratuito)"
echo "   ▲ Vercel: https://vercel.com (Rápido)"
echo "   🟣 Heroku: https://heroku.com (Clássico)"
echo ""
echo "3. Consulte o arquivo DEPLOY.md para instruções detalhadas"
echo ""
echo "🌐 URLs de teste após deploy:"
echo "   Health: https://sua-url.com/health"
echo "   Destinos: https://sua-url.com/api/v1/destinos"
echo "   Frontend: https://sua-url.com"
