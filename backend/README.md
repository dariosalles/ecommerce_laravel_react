# 🛍️ E-Com Shop - Backend

Um e-commerce completo construído com **Laravel 11** e **React**, containerizado com Docker para facilitar desenvolvimento e deployment.

## 📋 Visão Geral do Projeto

O **E-Com Shop** é uma plataforma de e-commerce robusta e escalável com arquitetura moderna:

- **Backend**: Laravel 11 API REST (Nginx + PHP 8.2 + MySQL)
- **Frontend**: React 18 com Context API e routing
- **Database**: MySQL 8.0 com seeds de exemplo
- **Containerização**: Docker Compose para dev/prod

**Status do Projeto**: Em desenvolvimento ✅ **82% completo** (v0.9)

---

## ✅ Features Implementadas

### 🔐 Autenticação & Autorização
- ✅ Registro de usuários com validação
- ✅ Login com JWT (Laravel Sanctum)
- ✅ Logout seguro
- ✅ Recuperação de senha
- ✅ Roles de usuário (admin, customer)

### 📦 Gerenciamento de Produtos
- ✅ CRUD completo de produtos
- ✅ Atribuições de produto: categorias, marcas, cores
- ✅ Sistema de imagens de produtos
- ✅ Busca e filtros por categoria/marca/cor
- ✅ Produtos em destaque (featured)
- ✅ Avaliações e comentários de clientes

### 🏷️ Categorias e Marcas
- ✅ CRUD de categorias com status
- ✅ Categorias em destaque
- ✅ CRUD de marcas
- ✅ Associação produto-categoria-marca

### 🎨 Cores
- ✅ Gerenciamento de cores disponíveis
- ✅ Cores por produto

### 🎯 Destaques (Hero Carousel)
- ✅ Featured highlights com imagens
- ✅ API para listar destaques
- ✅ Imagens armazenadas localmente
- ✅ Download automático de imagens

### � Pedidos (Orders)
- ✅ CRUD completo de pedidos
- ✅ Sistema de itens de pedido (OrderItems)
- ✅ Números únicos e rastreáveis
- ✅ Controle de estoque automático
- ✅ Validação de estoque na criação
- ✅ Cancelamento com devolução de estoque
- ✅ Status: pending, processing, shipped, delivered, cancelled
- ✅ Rastreamento com código de entrega
- ✅ Relacionamentos: usuário, produtos, métodos de pagamento, frete
- ✅ Transações BD com rollback em erro
- ✅ Métodos utilitários: generateOrderNumber(), updateTotal(), markAsShipped(), etc

### �🛒 Carrinho de Compras (Frontend)
- ✅ Adicionar/remover produtos
- ✅ Atualizar quantidades
- ✅ Cálculo de totais
- ✅ Persistência com Context API
- ✅ Integração com backend

### 📄 Páginas de Suporte (Frontend)
- ✅ FAQ (Perguntas Frequentes)
- ✅ Informações de Envio
- ✅ Política de Devoluções
- ✅ Termos e Condições
- ✅ Política de Privacidade

### 🏪 Configurações da Loja
- ✅ CRUD de configurações gerais
- ✅ Dados de contato (email, telefone, endereço)
- ✅ Métodos de pagamento
- ✅ Métodos de envio
- ✅ Configurações de frete

### 🎨 UI/UX Frontend
- ✅ Design responsivo (Mobile-first)
- ✅ Sistema de cores consistente
- ✅ Navegação intuitiva
- ✅ Hero carousel com destaques
- ✅ Grid de produtos com paginação
- ✅ Página de detalhe de produto
- ✅ Página de contato
- ✅ Footer completo com links

### 🌍 Multilíngue
- ✅ Suporte para PT-BR, EN, ES
- ✅ Sistema de traduções componentizado
- ✅ Context API para gerenciamento de idioma

### 📸 Gerenciamento de Imagens
- ✅ Storage local de imagens de produtos
- ✅ Storage local de imagens de destaques
- ✅ Helper para conversão de URLs (backend → frontend)
- ✅ Estrutura de diretórios organizada

### 👥 Sistema de Admin Separado (v0.9)
- ✅ Tabela `admins` dedicada (separada de `users`)
- ✅ Roles: super_admin, admin, moderator
- ✅ Método de autenticação separado: `/api/admin/login`
- ✅ Controle de acesso por role
- ✅ AdminAuthController para login/logout/perfil
- ✅ AdminManagementController para gerenciar outros admins
- ✅ Last login tracking para auditoria
- ✅ Ativação/desativação de contas de admin
- ✅ Seeder com credenciais padrão

---

## 🚀 Features Faltando

### 🛍️ Funcionalidades Core
- ⏳ **Checkout completo**: Integração com gateway de pagamento (Stripe/MercadoPago)
- ⏳ **Carrinho Persistente**: Salvar carrinho no backend (usuário logado)
- ⏳ **Favoritos**: Wishlist com persistência

### 💳 Pagamentos
- ⏳ Integração com **Stripe**
- ⏳ Integração com **MercadoPago**
- ⏳ Sistema de vouchers/cupons de desconto
- ⏳ Cálculo automático de taxa de frete

###  Estoque & Pedidos
- ⏳ Controle de estoque por produto
- ⏳ Notificação de produtos esgotados
- ⏳ Sistema de backorder
- ⏳ Rastreamento de pedidos em tempo real

### 🔍 Busca Avançada
- ⏳ Busca full-text com Elasticsearch
- ⏳ Filtros avançados (preço, avaliação, etc)
- ⏳ Autocomplete no campo de busca
- ⏳ Busca por atributos do produto

### 📧 Emails & Notificações
- ⏳ Email de confirmação de pedido
- ⏳ Email de rastreamento
- ⏳ Email de recuperação de senha
- ⏳ Newsletter/Marketing emails
- ⏳ Notificações em tempo real (WebSocket)

### ⭐ Avaliações & Reviews
- ⏳ Sistema completo de avaliações
- ⏳ Média de estrelas por produto
- ⏳ Moderação de comentários
- ⏳ Respostas do vendedor a reviews

### 📱 Mobile
- ⏳ App mobile nativa (React Native)
- ⏳ Push notifications
- ⏳ Integração com Apple Pay/Google Pay

### 🔒 Segurança
- ⏳ 2FA (Autenticação de Dois Fatores)
- ⏳ Rate limiting por IP
- ⏳ Validação CSRF
- ⏳ Proteção contra XSS/SQL Injection
- ⏳ Audit logs de ações administrativas

### 📈 Performance & SEO
- ⏳ Otimização de imagens (resizing automático)
- ⏳ Cache (Redis)
- ⏳ Paginação otimizada
- ⏳ Meta tags dinâmicas
- ⏳ Sitemap XML
- ⏳ Schema JSON-LD

### 🎁 Marketing
- ⏳ Sistema de cupons/vouchers
- ⏳ Programas de fidelização
- ⏳ Referral program
- ⏳ Flash sales e promoções

### 🛣️ SEO & Rotas
- ⏳ URL amigáveis para produtos (slug)
- ⏳ Breadcrumbs de navegação
- ⏳ Meta descriptions dinâmicas

---

## 🏗️ Arquitetura

```
ecommerce/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/   # Controllers da API
│   │   ├── Models/             # Modelos (Product, Category, etc)
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/         # Schema do banco
│   │   ├── factories/          # Factory para testes
│   │   └── seeders/            # Dados de exemplo
│   ├── routes/
│   │   ├── api.php             # Rotas da API
│   │   └── web.php             # Rotas web
│   └── public/images/          # Imagens dos produtos
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── contexts/           # Auth, Cart, Language, etc
│   │   ├── services/           # API client (axios)
│   │   ├── locales/            # Traduções
│   │   └── utils/              # Helpers
│   └── public/
│
└── docker-compose.yml          # Orquestração dos containers
```

---

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Git

### Setup Inicial

```bash
# 1. Clonar o repositório
git clone <repo-url>
cd ecommerce

# 2. Subir os containers
docker-compose up -d

# 3. Instalar dependências do backend
docker-compose exec app composer install

# 4. Gerar chave de aplicação
docker-compose exec app php artisan key:generate

# 5. Rodar migrações e seeds
docker-compose exec app php artisan migrate:fresh --seed

# 6. Instalar dependências do frontend
cd frontend
npm install

# 7. Iniciar o servidor React
npm start
```

### URLs de Acesso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Adminer (DB)**: http://localhost:8081

---

## 📚 Banco de Dados

### Modelos Implementados
- `User` - Usuários do sistema
- `Product` - Produtos
- `Category` - Categorias
- `Brand` - Marcas
- `Color` - Cores
- `FeaturedHighlight` - Destaques do hero
- `Order` - Pedidos
- `OrderItem` - Itens dos pedidos
- `PaymentMethod` - Métodos de pagamento
- `ShippingMethod` - Métodos de frete
- `StoreContact` - Dados de contato da loja
- `StoreSetting` - Configurações gerais

### Relacionamentos
- Produto → Categoria (N:1)
- Produto → Marca (N:1)
- Produto → Cor (N:M)
- Usuário → Pedidos (1:N)
- Pedido → Itens de Pedido (1:N)
- Pedido → Método de Pagamento (N:1)
- Pedido → Método de Frete (N:1)
- Produto → Itens de Pedido (1:N)

---

## 🛠️ API Endpoints

### Autenticação
```
POST   /api/register           # Criar conta
POST   /api/login              # Fazer login
POST   /api/logout             # Sair (requer token)
POST   /api/forgot-password    # Recuperar senha
```

### Produtos
```
GET    /api/products           # Listar produtos
GET    /api/products/:id       # Detalhe do produto
GET    /api/categories         # Listar categorias
GET    /api/brands             # Listar marcas
GET    /api/colors             # Listar cores
GET    /api/featured-highlights # Destaques do hero
```

### Configurações
```
GET    /api/store/settings     # Configurações da loja
GET    /api/store/contacts     # Dados de contato
GET    /api/payment-methods    # Métodos de pagamento
GET    /api/shipping-methods   # Métodos de frete
```

### Pedidos (Requer Autenticação)
```
GET    /api/orders             # Listar pedidos do usuário
GET    /api/orders/:id         # Detalhe de um pedido
POST   /api/orders             # Criar novo pedido
POST   /api/orders/:id/cancel  # Cancelar pedido
PUT    /api/orders/:id/status  # Atualizar status (admin)
```

---

## 🎨 Linguagens Suportadas
- 🇧🇷 Português Brasileiro (PT-BR)
- 🇺🇸 English (EN)
- 🇪🇸 Español (ES)

---

## � Credenciais de Teste

### Admin
```
📧 Email: admin@ecommerce.local
🔑 Senha: password123
👥 Role: super_admin
🔗 POST /api/admin/login
```

### Moderador
```
📧 Email: moderator@ecommerce.local
🔑 Senha: password123
👥 Role: moderator
🔗 POST /api/admin/login
```

### Cliente Normal (Seed)
```
📧 Email: user@example.com
🔑 Senha: password123
🔗 POST /api/login
```

**Nota**: As credenciais são geradas pelo `AdminSeeder` e `UserFactory` durante `php artisan migrate:fresh --seed`

---

## �🔄 Workflow de Desenvolvimento

### 1. Criar um novo feature
```bash
# Criar migration
docker-compose exec app php artisan make:migration create_orders_table

# Criar model
docker-compose exec app php artisan make:model Order

# Criar controller
docker-compose exec app php artisan make:controller ProductController
```

### 2. Atualizar banco de dados
```bash
docker-compose exec app php artisan migrate
docker-compose exec app php artisan migrate:rollback  # Desfazer
```

### 3. Executar seeds
```bash
docker-compose exec app php artisan db:seed --class=ProductSeeder
docker-compose exec app php artisan migrate:fresh --seed  # Reset completo
```

---

## 📝 Convencões do Projeto

### Backend
- Controllers em `PascalCase` (ex: `ProductController`)
- Métodos em `camelCase` (ex: `getProducts()`)
- Models em `PascalCase` (ex: `Product`)
- Rotas em lowercase com hífen (ex: `/api/featured-highlights`)

### Frontend
- Componentes em `PascalCase` (ex: `ProductGrid.js`)
- Arquivos de página em `PascalCase` (ex: `ContactPage.js`)
- Context em `PascalCase` (ex: `CartContext.js`)
- Variáveis e funções em `camelCase`
- CSS modules quando necessário

### Dados
- Conteúdo hardcoded em **Português Brasileiro (PT-BR)**
- Traduções disponíveis via Context
- Imagens armazenadas em `/backend/public/images/`

---

## 🐛 Troubleshooting

### Container não inicia
```bash
docker-compose logs app
docker-compose logs mysql
```

### Erro de permissão no banco
```bash
docker-compose exec app chown -R www-data:www-data /var/www/storage
```

### Limpar cache
```bash
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
```

---

## 📦 Dependências Principais

### Backend
- Laravel 11
- PHP 8.2
- MySQL 8.0
- Laravel Sanctum (JWT)

### Frontend
- React 18
- React Router v6
- Axios
- Context API

---

## � Contato & Suporte

**DSX Web - Desenvolvimento de Software**

- 📧 Email: [dariosalles0@gmail.com](mailto:dariosalles0@gmail.com)
- 💬 WhatsApp: [(12) 988262312](https://wa.me/5512988262312)
- 🌐 Site: [www.dsxweb.com.br](https://www.dsxweb.com.br)

---

## �📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👥 Contribuições

Contribuições são bem-vindas! Por favor, faça um fork do projeto e envie um pull request com suas melhorias.

---

**Última atualização**: 9 de Abril de 2026
