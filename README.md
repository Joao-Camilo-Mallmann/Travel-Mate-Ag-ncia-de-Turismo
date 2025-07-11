# 🌎 Travel Mate - Agência de Turismo

<div align="center">

![Travel Mate Banner](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=200&fit=crop&crop=center)

### 🚀 **Aplicação Full-Stack para Agência de Turismo**

Uma plataforma moderna e responsiva para descobrir destinos incríveis e pacotes turísticos personalizados

[![🌐 Ver Site Ao Vivo](https://img.shields.io/badge/🌐_Ver_Site_Ao_Vivo-4285f4?style=for-the-badge)](https://back-production-a75e.up.railway.app/)
[![🔗 GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JoaoCamiloMallmann/back)
[![⚡ Deploy](https://img.shields.io/badge/Deploy-Railway-0066ff?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)

</div>

---

## 🛠️ **Tecnologias Utilizadas**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 🌟 **Funcionalidades Principais**

### � **Frontend (Interface do Usuário)**
- ✨ **Design Moderno e Responsivo** - Interface intuitiva para desktop e mobile
- 🏖️ **Galeria de Destinos** - Explore lugares incríveis como Fernando de Noronha, Gramado, Bonito
- 📦 **Pacotes Turísticos** - Ofertas personalizadas com preços e detalhes completos
- ⭐ **Sistema de Avaliações** - Classificações e reviews dos destinos
- 🎨 **UI/UX Otimizada** - Construída com Tailwind CSS para máxima performance

### 🔧 **Backend (API REST)**
- 🚀 **API RESTful Completa** - Endpoints estruturados e documentados
- �️ **Banco de Dados SQLite** - Persistência de dados eficiente
- � **CORS Configurado** - Integração frontend/backend sem problemas
- 💚 **Health Check** - Monitoramento de status da aplicação
- � **Tratamento de Erros** - Responses consistentes e informativos

---

## 🌐 **Demonstração Ao Vivo**

<div align="center">

### 🎬 **[🔗 ACESSE O SITE AQUI](https://back-production-a75e.up.railway.app/)**

*Clique no link acima para ver o projeto funcionando!*

</div>

### 🧪 **Endpoints da API para Teste:**

| Endpoint | Descrição | Link Direto |
|----------|-----------|-------------|
| � **Frontend** | Interface principal | [🔗 Acessar](https://back-production-a75e.up.railway.app/) |
| 💚 **Health Check** | Status da API | [🔗 Testar](https://back-production-a75e.up.railway.app/health) |
| 🏖️ **Destinos** | Lista todos os destinos | [🔗 Ver JSON](https://back-production-a75e.up.railway.app/api/v1/destinos) |
| 📦 **Pacotes** | Lista todos os pacotes | [🔗 Ver JSON](https://back-production-a75e.up.railway.app/api/v1/pacotes) |

### � **Preview da Interface:**

- 🎯 **Hero Section** atrativo com call-to-action
- 🖼️ **Cards interativos** para cada destino
- 📊 **Filtros dinâmicos** por categoria e avaliação
- 💰 **Seção de preços** clara e transparente
- 📞 **Formulário de contato** integrado

---

## � **Como Executar Localmente**

### �📋 **Pré-requisitos**
- Node.js (versão 14 ou superior)
- npm ou yarn
- Git

### 🛠️ **Instalação e Execução**

```bash
# 1. Clone o repositório
git clone https://github.com/JoaoCamiloMallmann/back.git
cd back

# 2. Instale as dependências
npm install

# 3. Execute o servidor
npm start

# 4. Acesse a aplicação
# 🌐 Frontend: http://localhost:3000
# 🔗 API: http://localhost:3000/api/v1/destinos
```

### 🧪 **Teste os Endpoints Localmente**

```bash
# Health Check
curl http://localhost:3000/health

# Listar destinos
curl http://localhost:3000/api/v1/destinos

# Listar pacotes
curl http://localhost:3000/api/v1/pacotes

# Buscar destino específico (ID = 1)
curl http://localhost:3000/api/v1/destinos/1
```

---

## 📊 **Estrutura da API**

### 🎯 **Endpoints Disponíveis**

| Método | Endpoint | Descrição | Resposta |
|--------|----------|-----------|----------|
| `GET` | `/health` | Status da aplicação | `{ status: "OK" }` |
| `GET` | `/api/v1/destinos` | Lista todos os destinos | Array de destinos |
| `GET` | `/api/v1/destinos/:id` | Busca destino por ID | Objeto destino |
| `GET` | `/api/v1/pacotes` | Lista todos os pacotes | Array de pacotes |
| `GET` | `/api/v1/pacotes/:id` | Busca pacote por ID | Objeto pacote |

### 📝 **Exemplo de Resposta - Destinos**

```json
{
  "success": true,
  "message": "Destinations retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Fernando de Noronha",
      "image": "https://images.unsplash.com/photo-1469474968028...",
      "description": "Arquipélago vulcânico com 21 ilhas...",
      "rating": 4.9,
      "location": "Pernambuco, Brasil",
      "tags": ["Praias", "Mergulho", "Ecoturismo"]
    }
  ],
  "count": 8
}
```

---

## 🏗️ **Arquitetura do Projeto**

### 📁 **Estrutura de Arquivos**

```
📦 Travel Mate API
├── 📄 server.js              # Servidor Express principal
├── 📄 database.js            # Configuração SQLite + dados
├── 📄 endpoint.js            # Endpoints alternativos
├── 📄 package.json           # Dependências e scripts
├── 📄 travel.db              # Banco de dados SQLite
├── 📁 public/                # Frontend estático
│   ├── 📄 index.html         # Página principal
│   ├── 📄 script.js          # JavaScript do frontend
│   └── 📄 style.css          # Estilos personalizados
├── � Procfile               # Deploy Heroku
├── 📄 vercel.json            # Deploy Vercel
├── 📄 railway.yaml           # Deploy Railway
└── 📄 README.md              # Este arquivo
```

### 🔧 **Stack Tecnológico**

- **Backend:** Node.js + Express.js
- **Banco de Dados:** SQLite (ideal para demos)
- **Frontend:** HTML5 + CSS3 + JavaScript + Tailwind CSS
- **Deploy:** Railway (recomendado), Vercel, Heroku
- **Controle de Versão:** Git + GitHub

---

## 🚀 **Deploy e Hospedagem**

### 🌐 **Opções de Hospedagem Gratuita**

| Plataforma | Facilidade | Recursos | Deploy |
|------------|------------|----------|--------|
| ⭐ **Railway** | ⭐⭐⭐⭐⭐ | Banco incluso, SSL | [![Deploy](https://railway.app/button.svg)](https://railway.app) |
| 🎨 **Render** | ⭐⭐⭐⭐ | 100% grátis, SSL | [Deploy](https://render.com) |
| ⚡ **Vercel** | ⭐⭐⭐⭐⭐ | Super rápido | [Deploy](https://vercel.com) |

### 📋 **Deploy Rápido**

1. **Fork** este repositório
2. Conecte com a plataforma escolhida
3. **Deploy automático** via GitHub
4. ✅ **Site no ar em minutos!**

---

## 🎨 **Sobre Este Projeto**

### 💡 **Conceito**
Este projeto foi desenvolvido como uma **demonstração full-stack** de uma agência de turismo moderna, combinando:

- 🎯 **UX/UI atrativo** para engajar usuários
- 🔧 **API robusta** para integração com outros sistemas
- 📱 **Design responsivo** para todos os dispositivos
- ⚡ **Performance otimizada** para web

### 🎯 **Casos de Uso**
- **Portfólio profissional** de desenvolvimento
- **Base para projetos** de turismo reais
- **Demonstração de habilidades** full-stack
- **Template para agências** de viagem

---

## 👨‍💻 **Desenvolvedor**

<div align="center">

**João Camilo Mallmann**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JoaoCamiloMallmann)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=firefox&logoColor=white)](#)

*Desenvolvedor Full-Stack apaixonado por criar experiências web incríveis*

</div>

---

## 🤝 **Contribuição e Feedback**

### 🛠️ **Como Contribuir**

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### 🎯 **Próximas Funcionalidades**

- [ ] 🔐 Sistema de autenticação de usuários
- [ ] 💳 Integração com gateway de pagamento
- [ ] 📧 Sistema de notificações por email
- [ ] 🗺️ Integração com mapas interativos
- [ ] 🌟 Sistema de reviews e comentários
- [ ] 📱 Aplicativo mobile (React Native)

### 🐛 **Encontrou um Bug?**

Abra uma [**issue**](https://github.com/JoaoCamiloMallmann/back/issues) descrevendo:
- � **Problema encontrado**
- 🔄 **Passos para reproduzir**
- 💻 **Ambiente (browser, OS)**
- 📸 **Screenshots (se aplicável)**

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

### 🌟 **Se este projeto foi útil, considere dar uma ⭐!**

**[🔗 Visite o Site](https://back-production-a75e.up.railway.app/)** | **[📱 Ver Código](https://github.com/JoaoCamiloMallmann/back)** | **[🚀 Deploy](https://railway.app)**

---

*Desenvolvido com ❤️ por [João Camilo Mallmann](https://github.com/JoaoCamiloMallmann)*

*"Transformando ideias em experiências digitais incríveis"*

</div>
