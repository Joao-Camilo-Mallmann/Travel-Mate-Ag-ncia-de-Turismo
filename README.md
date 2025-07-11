# Travel API - Agência de Turismo

Uma aplicação web completa para agência de turismo com API backend em Node.js/Express e frontend responsivo.

## 🚀 Características

- API RESTful para destinos e pacotes turísticos
- Frontend responsivo com Tailwind CSS
- Banco de dados SQLite
- CORS habilitado para integração frontend/backend
- Interface moderna e intuitiva

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd back
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📊 Endpoints da API

### Destinos
- `GET /api/v1/destinos` - Lista todos os destinos
- `GET /api/v1/destinos/:id` - Busca destino por ID

### Pacotes
- `GET /api/v1/pacotes` - Lista todos os pacotes
- `GET /api/v1/pacotes/:id` - Busca pacote por ID

### Health Check
- `GET /health` - Verifica status da API

## 🌐 Hospedagem

Este projeto pode ser hospedado nas seguintes plataformas:

### 1. Railway (Recomendado - Fácil)
1. Crie conta em [railway.app](https://railway.app)
2. Conecte seu repositório GitHub
3. Deploy automático

### 2. Render (Gratuito)
1. Crie conta em [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente

### 3. Vercel (Para Frontend + API)
1. Crie conta em [vercel.com](https://vercel.com)
2. Deploy direto do GitHub

### 4. Heroku
1. Crie conta em [heroku.com](https://heroku.com)
2. Use o Heroku CLI para deploy

## 📁 Estrutura do Projeto

```
back/
├── database.js          # Configuração do banco SQLite
├── server.js           # Servidor Express principal
├── endpoint.js         # Endpoints legados (migrados para server.js)
├── package.json        # Dependências e scripts
├── travel.db          # Banco de dados SQLite
└── public/            # Frontend estático
    ├── index.html     # Página principal
    ├── script.js      # JavaScript do frontend
    └── style.css      # Estilos CSS
```

## 🔧 Configuração para Produção

Para produção, certifique-se de:

1. Configurar variáveis de ambiente
2. Usar HTTPS
3. Configurar logs adequados
4. Implementar rate limiting se necessário

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.
