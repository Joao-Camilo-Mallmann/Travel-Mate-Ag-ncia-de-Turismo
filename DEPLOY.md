# 🚀 Guia de Deploy - Travel API

Este guia mostra como hospedar sua aplicação de turismo gratuitamente em diferentes plataformas.

## 📌 Opções de Hospedagem

### 1. 🚂 Railway (Recomendado - Mais Fácil)

**Por que Railway?**
- Deploy automático via GitHub
- SSL grátis
- Banco de dados incluso
- Interface simples

**Passos:**
1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha seu repositório
6. Railway detectará automaticamente o Node.js
7. Deploy será feito automaticamente

**URL Final:** `https://seu-projeto.railway.app`

---

### 2. 🎨 Render (100% Gratuito)

**Vantagens:**
- Tier gratuito generoso
- SSL automático
- Deploy via GitHub

**Passos:**
1. Acesse [render.com](https://render.com)
2. Crie conta com GitHub
3. Clique "New +" → "Web Service"
4. Conecte seu repositório
5. Configure:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Clique "Create Web Service"

**URL Final:** `https://seu-projeto.onrender.com`

---

### 3. ▲ Vercel (Ideal para Full-Stack)

**Características:**
- Excelente para aplicações Next.js/React
- CDN global
- Deploy instantâneo

**Passos:**
1. Acesse [vercel.com](https://vercel.com)
2. Login com GitHub
3. Import seu repositório
4. Vercel detectará automaticamente
5. Deploy instantâneo

**URL Final:** `https://seu-projeto.vercel.app`

---

### 4. 🟣 Heroku (Tradicional)

**Características:**
- Platform as a Service clássico
- Boa documentação
- Add-ons disponíveis

**Passos:**
1. Instale [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Faça login: `heroku login`
3. Crie app: `heroku create seu-app-name`
4. Deploy: `git push heroku main`

**URL Final:** `https://seu-app-name.herokuapp.com`

---

## 🔧 Preparação para Deploy

### 1. Repositório GitHub
```bash
# Initialize git se ainda não tiver
git init
git add .
git commit -m "Initial commit"

# Crie repositório no GitHub e conecte
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

### 2. Variáveis de Ambiente (se necessário)
- `PORT`: Será definido automaticamente pela plataforma
- `NODE_ENV`: production (automático)

---

## ✅ Checklist de Deploy

- [ ] Código no GitHub
- [ ] `package.json` com engines especificado
- [ ] Procfile criado (para Heroku)
- [ ] vercel.json criado (para Vercel)
- [ ] railway.yaml criado (para Railway)
- [ ] .gitignore configurado
- [ ] README.md atualizado

---

## 🧪 Testando o Deploy

Após o deploy, teste os endpoints:

```bash
# Health check
curl https://sua-url.com/health

# API endpoints
curl https://sua-url.com/api/v1/destinos
curl https://sua-url.com/api/v1/pacotes
```

---

## 🎯 Recomendação Final

Para iniciantes, recomendo **Railway** pela simplicidade. Para projetos mais avançados, **Render** oferece mais controle.

**Próximos passos após deploy:**
1. Configure domínio personalizado (opcional)
2. Monitore logs da aplicação
3. Configure backups do banco (para produção)
4. Implemente analytics (Google Analytics)

---

## 🆘 Troubleshooting

**Erro de Build:**
- Verifique se todas as dependências estão no `package.json`
- Confirme que a versão do Node.js é compatível

**Erro 404:**
- Verifique as rotas no código
- Confirme que o servidor está rodando na porta correta

**Banco de dados:**
- SQLite funciona bem para demonstrações
- Para produção, considere PostgreSQL ou MongoDB
