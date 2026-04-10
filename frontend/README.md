# 🛍️ E-Com Shop - Frontend

Interface React moderna e responsiva para a plataforma de e-commerce E-Com Shop.

## 📋 Visão Geral

Frontend construído com **React 18**, **Context API** e **React Router v6** para uma experiência de usuário fluida e intuitiva.

**Stack**:
- React 18
- React Router v6
- Axios (HTTP client)
- Context API (estado global)
- CSS3 (responsive design)

---

## ✅ Páginas & Features Implementadas

### 🏠 Página Principal
- ✅ Hero carousel com destaques
- ✅ Grid de produtos com paginação
- ✅ Imagens de produtos
- ✅ Filtros básicos

### 🛍️ Página de Produtos
- ✅ Grid responsivo de produtos
- ✅ Busca por categoria
- ✅ Filtros por marca e cor
- ✅ Paginação
- ✅ Ordenação (preço, popularidade)

### 🔍 Página de Detalhe
- ✅ Visualização completa do produto
- ✅ Imagem em alta resolução
- ✅ Descrição detalhada
- ✅ Preço e estoque
- ✅ Adicionar ao carrinho
- ✅ Adicionar à wishlist

### 🛒 Carrinho de Compras
- ✅ Visualizar itens
- ✅ Atualizar quantidades
- ✅ Remover produtos
- ✅ Cálculo automático de totais
- ✅ Integração com checkout
- ✅ Context API para persistência

### 👤 Autenticação
- ✅ Registro de usuário
- ✅ Login com JWT
- ✅ Logout
- ✅ Proteção de rotas
- ✅ Persistência de token

### 👤 Minha Conta
- ✅ Perfil do usuário
- ✅ Editar informações
- ✅ **Histórico de Pedidos com Status**
  - Cards de pedido com borda colorida por status
  - Status: ⏳ Pendente, 🔄 Processando, 🚚 Enviado, ✅ Entregue, ❌ Cancelado
  - Preview de itens (primeiros 2 + indicador de mais)
  - Código de rastreamento quando disponível
  - Botão "Ver Detalhes" para futura página de detalhe
  - Integrado com endpoint `/api/orders`
- ✅ Dados de entrega

### ❤️ Meus Favoritos
- ✅ Wishlist
- ✅ Adicionar/remover favoritos
- ✅ Context API com persistência

### 📧 Página de Contato
- ✅ Formulário de contato
- ✅ Validação de campos
- ✅ Integração com backend

### 📄 Páginas de Suporte
- ✅ **FAQ** - Perguntas frequentes com accordion
- ✅ **Informações de Envio** - Opções de frete e prazos
- ✅ **Política de Devoluções** - Processo de devolução
- ✅ **Termos e Condições** - Termos legais
- ✅ **Política de Privacidade** - LGPD compliant

### 🎨 Componentes Gerais
- ✅ Header com navegação
- ✅ Footer com links
- ✅ Navegação responsive
- ✅ Sistema de notificações
- ✅ Toast messages

### 🌍 Multilíngue
- ✅ Português Brasileiro (PT-BR)
- ✅ English (EN)
- ✅ Español (ES)
- ✅ Seletor de idioma
- ✅ Context para gerenciar idioma

### 📱 Design Responsivo
- ✅ Mobile-first approach
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Hamburger menu mobile
- ✅ Imagens responsivas

### 🛡️ Painel Admin (v0.8)
- ✅ **AdminPage**: Layout com sidebar navegável
- ✅ **Dashboard**: Estatísticas da loja
  - Total de pedidos, receita, usuários, produtos
  - Listagem de pedidos recentes com status
  - KPIs e informações do sistema
- ✅ **Gerenciamento de Pedidos**
  - Lista completa de todos os pedidos
  - Visualizar detalhes: cliente, itens, totais, endereço
  - Alterar status (Pendente → Processando → Enviado → Entregue)
  - Tracking code display
- ✅ **Gerenciamento de Produtos**
  - CRUD completo (criar, ler, editar, deletar)
  - Modal para novo produto
  - Preview de características (preço, estoque, categoria)
- ✅ **Gerenciamento de Usuários**
  - Listagem de todos os usuários
  - Visualizar informações (nome, email, telefone, role)
  - Deletar usuários
- ✅ **Gerenciamento de Categorias**
  - CRUD completo
  - Marcar como destaque
  - Modal para nova categoria
- ✅ **Estilo Responsivo**: Totalmente responsivo para mobile/tablet/desktop

### 🔓 Admin Authentication (v0.9)
- ✅ **AdminLogin**: Página de login dedicada para admins
- ✅ Autenticação separada de usuários clientes
- ✅ Token-based authentication com localStorage
- ✅ Verificação de permissão ao acessar /admin
- ✅ Logout com limpeza de token
- ✅ Interface profissional com gradiente

---

## 🚀 Features Faltando

### 🛒 E-commerce
- ⏳ Página detalhe de pedido (modal/nova rota)
- ⏳ Botão cancelar pedido com confirmação
- ⏳ Checkout multi-step completo
- ⏳ Integração com pagamento (Stripe/MercadoPago)
- ⏳ Tela de confirmação de pedido
- ⏳ Rastreamento em tempo real

### 🔍 Busca & Filtros
- ⏳ Busca full-text
- ⏳ Filtros avançados
- ⏳ Autocomplete
- ⏳ Busca por faixa de preço
- ⏳ Salvamento de filtros

### 👥 Conta do Usuário
- ⏳ Página de endereços cadastrados
- ⏳ Edição de perfil completa
- ⏳ Gestão de métodos de pagamento
- ⏳ Preferências de notificação

### 📊 Admin Dashboard
- ⏳ Painel administrativo
- ⏳ Gráficos de vendas
- ⏳ Gerenciamento de inventário
- ⏳ Gerenciamento de categorias/produtos
- ⏳ Relatórios

### 📱 Mobile App
- ⏳ React Native app
- ⏳ Push notifications
- ⏳ Integração com Apple Pay
- ⏳ Integração com Google Pay

### 🔐 Segurança
- ⏳ 2FA (verificação de dois fatores)
- ⏳ Recuperação de senha
- ⏳ Verificação de email

### 🎁 Funcionalidades Extras
- ⏳ Programa de fidelização
- ⏳ Cupons e vouchers
- ⏳ Recomendações personalizadas
- ⏳ Histórico de visualizados

---

## 🏗️ Estrutura de Pastas

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── ProductGrid.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Login.js
│   │   ├── MyAccount.js
│   │   ├── Contact.js
│   │   ├── FAQ.js
│   │   ├── Shipping.js
│   │   ├── Returns.js
│   │   ├── Terms.js
│   │   ├── Privacy.js
│   │   ├── Toast.js
│   │   └── [*.css]          # Estilos por componente
│   │
│   ├── contexts/            # Context API
│   │   ├── AuthContext.js   # Autenticação
│   │   ├── CartContext.js   # Carrinho
│   │   ├── WishlistContext.js # Favoritos
│   │   ├── LanguageContext.js # Idioma
│   │   └── NotificationContext.js # Notificações
│   │
│   ├── services/            # API client
│   │   └── api.js           # Configuração do Axios
│   │
│   ├── locales/             # Traduções
│   │   ├── pt-br.json
│   │   ├── en.json
│   │   └── es.json
│   │
│   ├── utils/               # Utilitários
│   │   └── imageHelper.js   # Helper de imagens
│   │
│   ├── App.js              # App principal
│   ├── App.css             # Estilos globais
│   └── index.js            # Entry point
│
└── package.json
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Setup

```bash
# 1. Entrar no diretório
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm start

# 4. Build para produção
npm run build
```

### Variáveis de Ambiente

Criar arquivo `.env` na raiz do frontend:

```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_IMAGE_URL=http://localhost:8080
```

### URLs
- **Desenvolvimento**: http://localhost:3000
- **Backend API**: http://localhost:8080/api

---

## 🎨 Paleta de Cores

```css
Primary:     #667eea   (Azul)
Secondary:   #764ba2   (Roxo)
Success:     #4caf50   (Verde)
Warning:     #ff9800   (Laranja)
Error:       #f44336   (Vermelho)
Dark:        #2c3e50   (Cinza escuro)
Light:       #ecf0f1   (Cinza claro)
```

---

## 📦 Dependências Principais

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

---

## 🛠️ Comandos Úteis

```bash
# Iniciar desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test

# Eject (⚠️ irreversível)
npm run eject
```

---

## 📝 Integração com Backend

### Endpoints Utilizados

**Produtos**
```
GET /api/products              # Listar produtos
GET /api/products/:id          # Detalhe
GET /api/categories            # Categorias
GET /api/brands                # Marcas
GET /api/featured-highlights   # Destaques
```

**Autenticação**
```
POST /api/register             # Registrar
POST /api/login                # Fazer login
POST /api/logout               # Sair
```

**Loja**
```
GET /api/store/settings        # Configurações
GET /api/store/contacts        # Contatos
GET /api/payment-methods       # Pagamentos
GET /api/shipping-methods      # Frete
```

---

## 🌍 Suporte a Idiomas

Para adicionar novos idiomas:

1. Criar arquivo em `src/locales/[idioma].json`
2. Adicionar chave em `LanguageContext.js`
3. Usar hook `useLanguage()` nos componentes

```javascript
const { t, language, setLanguage } = useLanguage();

// Usar
<h1>{t('home.title')}</h1>
```

---

## 🎯 Performance

- ✅ Code splitting por rota
- ✅ Lazy loading de imagens
- ✅ Otimização de re-renders (useMemo, useCallback)
- ✅ Compressão de imagens
- ✅ Cache de requisições

---

## 🔐 Segurança

- ✅ HTTPS only (em produção)
- ✅ Proteção CSRF
- ✅ XSS prevention
- ✅ Token stored seguramente
- ✅ Validação de entrada

---

## 📱 Responsividade

```css
Mobile:     < 768px   (Hamburger menu, stacked layout)
Tablet:     768-1024px
Desktop:    > 1024px
```

---

## 🐛 Troubleshooting

### "Cannot find module axios"
```bash
npm install axios
```

### Port 3000 já está em uso
```bash
PORT=3001 npm start
```

### CORS error
- Verificar se backend está rodando
- Verificar variável `.env` com URL correta

---

## 📄 Licença

MIT

---

**Última atualização**: 9 de Abril de 2026
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
