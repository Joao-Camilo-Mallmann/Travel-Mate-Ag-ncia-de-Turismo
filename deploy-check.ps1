# 🚀 Script de Deploy Rápido - Travel API
# Execute este script para preparar o projeto para deploy

Write-Host "🚀 Preparando Travel API para Deploy..." -ForegroundColor Green

# 1. Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script no diretório do projeto (onde está o package.json)" -ForegroundColor Red
    exit 1
}

# 2. Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

# 3. Verificar arquivos necessários
Write-Host "📋 Verificando arquivos necessários..." -ForegroundColor Yellow

$files = @("package.json", "server.js", "Procfile", "vercel.json", "railway.yaml", ".gitignore", "README.md", "DEPLOY.md")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file`: Encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ $file`: Não encontrado" -ForegroundColor Red
    }
}

# 4. Verificar Git
Write-Host "🔍 Verificando Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Repositório Git: Inicializado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Repositório Git: Não inicializado" -ForegroundColor Yellow
    Write-Host "   Execute: git init" -ForegroundColor Gray
}

# 5. Instruções finais
Write-Host ""
Write-Host "🎉 Projeto preparado para deploy!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Inicializar Git (se ainda não fez):" -ForegroundColor White
Write-Host "   git init" -ForegroundColor Gray
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Criar repositório no GitHub e conectar:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/seu-usuario/seu-repo.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Escolha uma plataforma de deploy:" -ForegroundColor White
Write-Host "   🚂 Railway: https://railway.app (Mais fácil)" -ForegroundColor Blue
Write-Host "   🎨 Render: https://render.com (Gratuito)" -ForegroundColor Magenta
Write-Host "   ▲ Vercel: https://vercel.com (Rápido)" -ForegroundColor Black
Write-Host "   🟣 Heroku: https://heroku.com (Clássico)" -ForegroundColor DarkMagenta
Write-Host ""
Write-Host "4. Consulte o arquivo DEPLOY.md para instruções detalhadas" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs de teste após deploy:" -ForegroundColor Cyan
Write-Host "   Health: https://sua-url.com/health" -ForegroundColor Gray
Write-Host "   Destinos: https://sua-url.com/api/v1/destinos" -ForegroundColor Gray
Write-Host "   Frontend: https://sua-url.com" -ForegroundColor Gray

Write-Host ""
Write-Host "💡 Dica: Para testar localmente, execute 'npm start' e acesse http://localhost:3000" -ForegroundColor Yellow
