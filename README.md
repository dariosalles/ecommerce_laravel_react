# 🛍️ E-Com Shop

Um e-commerce de qualidade profissional construído com **Laravel 11** + **React 18**, containerizado com **Docker** para facilitar desenvolvimento e deployment.

🚀 **Status**: Em desenvolvimento - **85% completo**

---

## 📋 Visão Rápida

| Aspecto | Detalhes |
|--------|----------|
| **Backend** | Laravel 11 API REST |
| **Frontend** | React 18 com Context API |
| **Database** | MySQL 8.0 |
| **Containerização** | Docker Compose |
| **Linguagens** | PT-BR, EN, ES |
| **Design** | Mobile-first, Responsivo |

---

## 🚀 Quick Start

```bash
# Clone o repositório
git clone <repo-url>
cd ecommerce

# Suba os containers
docker-compose up -d

# Setup do backend
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate:fresh --seed

# Setup do frontend
cd frontend
npm install
npm start
```

📍 **Acesso:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Database: http://localhost:8081

---

## ✅ O Que Já Está Pronto

### Backend (Laravel)
- ✅ API REST completa
- ✅ Autenticação com JWT (Sanctum)
- ✅ **Admin Authentication System** (v0.9) - Tabela separada de admins com sistema de roles
- ✅ Modelos: Produtos, Categorias, Marcas, Cores, Destaques, Admins
- ✅ Sistema de Pedidos (Orders & OrderItems)
- ✅ Seeds com dados de exemplo
- ✅ Gerenciamento de imagens
- ✅ Configurações da loja
- ✅ Dados de contato e métodos de pagamento

### Frontend (React)
- ✅ Página inicial com hero carousel
- ✅ Grid de produtos com filtros
- ✅ Página de detalhe do produto
- ✅ Carrinho de compras funcional
- ✅ Sistema de autenticação (usuários)
- ✅ **Admin Panel Dashboard** (v0.9) - CRUD completo de produtos, categorias, pedidos e usuários
- ✅ **Admin Login** - Autenticação separada com JWT
- ✅ Minha conta e meus favoritos
- ✅ Histórico de pedidos
- ✅ 5 páginas de suporte (FAQ, Envio, Devoluções, Termos, Privacidade)
- ✅ Suporte multilíngue (PT-BR/EN/ES)
- ✅ Design totalmente responsivo

---

## 🚀 O Que Ainda Falta

### Core Features
- ⏳ Checkout com pagamento (Stripe/MercadoPago)
- ⏳ Página de detalhe do pedido
- ⏳ Cancelamento de pedidos
- ⏳ Sistema de avaliações
- ⏳ Cupons e vouchers
- ⏳ Carrinho persistente no backend

### Admin
- ⏳ Relatórios e estatísticas avançadas
- ⏳ Upload em massa de produtos
- ⏳ Auditoria de ações de admin
- ⏳ 2FA para admins
- ⏳ Gerenciamento de admins no painel

### Extras
- ⏳ Busca full-text avançada
- ⏳ Emails transacionais
- ⏳ App mobile (React Native)
- ⏳ Sistema de recomendações
- ⏳ Cache (Redis)

---

## 📁 Estrutura do Projeto

```
ecommerce/
├── backend/                    # Laravel API (⏳ 82% pronto)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/        # REST Controllers (Auth, Products, Orders, etc)
│   │   │   │   └── AdminAuthController
│   │   │   └── Middleware/
│   │   │       └── AuthenticateAdmin.php
│   │   └── Models/             # Eloquent models (User, Product, Order, Admin, etc)
│   ├── database/
│   │   ├── migrations/
│   │   ├── factories/
│   │   └── seeders/
│   ├── routes/api.php
│   └── public/images/          # Imagens de produtos
│
├── frontend/                   # React App (⏳ 85% pronto)
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # 🆕 Admin Dashboard & Components
│   │   │   │   ├── AdminPage.js
│   │   │   │   ├── AdminLogin.js
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── AdminOrders.js
│   │   │   │   ├── AdminProducts.js
│   │   │   │   ├── AdminCategories.js
│   │   │   │   ├── AdminUsers.js
│   │   │   │   └── AdminLayout.css
│   │   │   └── ...             # User-facing components
│   │   ├── contexts/
│   │   ├── services/api.js     # 🆕 API client with auth interceptor
│   │   └── locales/
│   └── package.json
│
└── docker-compose.yml
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11
- **PHP**: 8.2
- **Database**: MySQL 8.0
- **Auth**: Laravel Sanctum (JWT)
- **Server**: Nginx

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **HTTP**: Axios
- **Estado**: Context API
- **Styling**: CSS3

### DevOps
- **Containerização**: Docker, Docker Compose
- **Volume Sharing**: Local development

---

## 📸 Paleta de Cores

- **Primary**: `#667eea` (Azul)
- **Secondary**: `#764ba2` (Roxo)
- **Success**: `#4caf50` (Verde)
- **Error**: `#f44336` (Vermelho)
- **Dark**: `#2c3e50` (Cinza escuro)

---

## 📚 Documentação Detalhada

- 📖 [Backend README](./backend/README.md)
- 📖 [Frontend README](./frontend/README.md)

---

## 🌍 Idiomas Suportados

- 🇧🇷 Português Brasileiro (PT-BR) - Padrão
- 🇺🇸 English (EN)
- 🇪🇸 Español (ES)

---

## 🔄 Fluxo de Desenvolvimento

### 1️⃣ Criar Feature no Backend

```bash
# Criar migration
docker-compose exec app php artisan make:migration create_orders_table

# Criar model
docker-compose exec app php artisan make:model Order

# Rodar migrações
docker-compose exec app php artisan migrate
```

### 2️⃣ Criar Componente no Frontend

```bash
# Frontend já está com hot reload
# Editar arquivo em src/components/
# Salvar arquivo → Atualizar automático no navegador
```

### 3️⃣ Testar a Integração

```bash
# Backend: http://localhost:8080/api/
# Frontend: http://localhost:3000
```

---

## 🔐 Configuração de Segurança

- ✅ JWT tokens com Sanctum
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Hash de senhas com Bcrypt
- ✅ Proteção contra XSS (React)
- ✅ SQL Injection prevention (Eloquent ORM)

---

## 📊 Status de Implementação

```
Backend:  ███████████░░░░░░░░  75%
Frontend: █████████░░░░░░░░░░  65%
Integrações: ███░░░░░░░░░░░░░  15%
Overall:  ████████░░░░░░░░░░░  65%
```

---

## 🐛 Troubleshooting

### Containers não iniciam
```bash
docker-compose logs app
docker-compose logs mysql
```

### Port already in use
```bash
# Mudar port no docker-compose.yml
# ou
docker-compose down
```

### Erro de conectividade
- Garantir que backend está em http://localhost:8080
- Verificar se MySQL está rodando
- Checar variáveis de ambiente

---

## 📖 Exemplos de Uso

### Login
```javascript
// Frontend
const { login } = useAuth();
await login(email, password);
```

### Adicionar ao Carrinho
```javascript
// Frontend
const { addToCart } = useCart();
addToCart(productId, quantity);
```

### Buscar Produtos
```javascript
// Frontend
const products = await api.get('/products');
```

---

## 📝 Convenções

### Nomes
- **Backend**: `PascalCase` para models e controllers
- **Frontend**: `PascalCase` para componentes, `camelCase` para functions
- **Rotas API**: lowercase com hífen (ex: `/api/featured-highlights`)

### Dados
- Conteúdo hardcoded em **PT-BR**
- Traduções via Context API
- Imagens em `/backend/public/images/`

---

## 📄 Licença

MIT License - Veja [LICENSE](./LICENSE) para detalhes

---

## 👥 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 🎯 Próximas Prioridades

1. ✅ Backend API 70% → 85%
2. ✅ Frontend 65% → 80%
3. ⏳ Integração de pagamentos
4. ⏳ Dashboard administrativo
5. ⏳ Sistema de pedidos

---

## 📞 Contato & Suporte

**DSX Web - Desenvolvimento de Software**

- 📧 Email: [dariosalles0@gmail.com](mailto:dariosalles0@gmail.com)
- 💬 WhatsApp: [(12) 988262312](https://wa.me/5512988262312)
- 🌐 Site: [www.dsxweb.com.br](https://www.dsxweb.com.br)
- 🐛 Issues: Abra uma issue no repositório

---

## 📅 Changelog

### v0.7.0 (Atual - 09/04/2026)
- ✨ Sistema completo de Pedidos (Orders & OrderItems)
- ✨ API de pedidos com validação e transações BD
- ✨ Rastreamento de pedidos com números únicos
- ✨ Controle de estoque automático
- ✨ Endpoints: GET/POST/CANCEL/STATUS pedidos
- 🚀 Backend agora em 75% (era 70%)

### v0.6.0 (09/04/2026)
- ✨ Adicionar 5 páginas de suporte (FAQ, Envio, Devoluções, Termos, Privacidade)
- ✨ Atualizar README com documentação completa
- 🐛 Corrigir URLs de imagens dos destaques do hero
- 📱 Melhorias responsivas

### v0.5.0
- ✨ Hero carousel com imagens locais
- ✨ Grid de produtos funcional
- 🛒 Carrinho de compras

### v0.4.0
- 🔐 Autenticação com JWT
- 👤 Sistema de usuários

### v0.3.0
- 🌍 Suporte multilíngue

---

**Última atualização**: 9 de Abril de 2026

Feito com ❤️ por Dario Salles
