# Estrutura de Imagens - Ecommerce

## 📁 Organização

```
/public/images/
├── /products/        # Imagens dos produtos (variados tamanhos)
├── /highlights/      # Imagens do hero/destaque (1920x600px recomendado)
├── /categories/      # Imagens das categorias (300x300px recomendado)
└── /brands/          # Logos das marcas (200x200px recomendado)
```

## 🖼️ Recomendações por Tipo

### Produtos
- **Tamanho**: 500x500px ou 600x600px
- **Formato**: JPG ou WebP
- **Tamanho do arquivo**: 50-150KB
- **Proporção**: Quadrada (1:1)
- **Exemplo**: `product-001.jpg`, `product-nike-air.jpg`

### Destaques/Hero
- **Tamanho**: 1920x600px
- **Formato**: JPG ou WebP
- **Tamanho do arquivo**: 150-300KB
- **Proporção**: 16:9
- **Exemplo**: `destaque-moda-homens.jpg`

### Categorias
- **Tamanho**: 300x300px
- **Formato**: JPG ou WebP
- **Tamanho do arquivo**: 30-80KB
- **Proporção**: Quadrada (1:1)
- **Exemplo**: `categoria-homens.jpg`

### Marcas
- **Tamanho**: 200x200px
- **Formato**: PNG (com transparência) ou JPG
- **Tamanho do arquivo**: 20-50KB
- **Proporção**: Quadrada (1:1)
- **Exemplo**: `nike-logo.png`

## 🔗 URLs de Acesso

Após salvar as imagens aqui, acesse-as via:

```
http://localhost:8000/images/products/product-001.jpg
http://localhost:3000/images/products/product-001.jpg (via proxy)
```

## 📥 Como Adicionar Imagens

1. **Salve os arquivos** nesta pasta ou em subpastas
2. **Atualize o banco de dados** com a URL relativa:
   - No seeder: `'image_url' => '/images/products/product-001.jpg'`
   - No banco via admin: `/images/products/product-001.jpg`
3. **Teste a URL** no navegador

## 🎯 Recursos Gratuitos para Imagens

- **Unsplash.com** - Fotos de alta qualidade
- **Pexels.com** - Imagens gratuitas diversas
- **Pixabay.com** - Banco de imagens livre
- **Lorem Picsum** - Placeholder dinâmico (testing)

## ⚙️ Configuração do Laravel

O Laravel está configurado para servir arquivos públicos via:
- `nginx` mapeia `/public` como raiz
- URLs públicas não requerem autenticação
- Caminho físico: `backend/public/images/`

## 💡 Dicas

- Use nomes descritivos: `nike-air-max-001.jpg` é melhor que `img1.jpg`
- Comprima imagens antes de fazer upload (use TinyPNG, ImageOptim, etc)
- Use WebP quando possível (melhor compressão)
- Mantenha proporções recomendadas para melhor visual
