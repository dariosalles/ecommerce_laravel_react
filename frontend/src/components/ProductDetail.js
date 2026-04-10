import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import { getImageUrl } from '../utils/imageHelper';
import api from '../services/api';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setIsFavorited(isInWishlist(response.data.id));
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addNotification(`✓ ${quantity}x ${product.name} adicionado ao carrinho!`);
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    if (isFavorited) {
      removeFromWishlist(product.id);
      setIsFavorited(false);
      addNotification(`❤️ ${product.name} removido da lista de desejos!`);
    } else {
      addToWishlist(product);
      setIsFavorited(true);
      addNotification(`❤️ ${product.name} adicionado à lista de desejos!`);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <p>Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error-container">
          <p>Produto não encontrado</p>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb-container">
        <div className="container">
          <button onClick={() => navigate('/')} className="breadcrumb-link">HOME</button>
          <span className="separator">/</span>
          {product.category && (
            <>
              <button onClick={() => navigate(`/categories/${product.category.id}`)} className="breadcrumb-link">
                {product.category.name.toUpperCase()}
              </button>
              <span className="separator">/</span>
            </>
          )}
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      <div className="product-detail-container">
        <div className="container">
          <div className="product-detail-content">
            {/* Imagem do Produto */}
            <div className="product-detail-image">
              {product.image_url ? (
                <img src={getImageUrl(product.image_url)} alt={product.name} className="product-image" />
              ) : (
                <div className="image-placeholder">
                  <p>Imagem do Produto</p>
                </div>
              )}
              {product.stock > 0 && (
                <span className="sale-badge">NOVO</span>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="product-detail-info">
              <h1 className="product-name">{product.name}</h1>

              {product.category && (
                <p className="product-category">
                  Categoria: <strong>{product.category.name}</strong>
                </p>
              )}

              {product.brand && (
                <p className="product-brand">
                  Marca: <strong>{product.brand.name}</strong>
                </p>
              )}

              {product.color && (
                <p className="product-color">
                  Cor: <strong>{product.color.name}</strong>
                </p>
              )}

              <div className="product-price">
                <span className="price">R$ {parseFloat(product.price).toFixed(2)}</span>
                <span className="stock-status">
                  {product.stock > 0 ? (
                    <span className="in-stock">{t('products.inStock')}</span>
                  ) : (
                    <span className="out-stock">{t('products.outOfStock')}</span>
                  )}
                </span>
              </div>

              <div className="product-description">
                <h3>Descrição</h3>
                <p>{product.description}</p>
              </div>

              {product.stock > 0 && (
                <div className="product-purchase">
                  <div className="quantity-selector">
                    <label htmlFor="quantity">Quantidade:</label>
                    <select 
                      id="quantity" 
                      value={quantity} 
                      onChange={handleQuantityChange}
                      className="quantity-input"
                    >
                      {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                  >
                    {t('products.addToCart')}
                  </button>

                  <button 
                    className={`wishlist-btn ${isFavorited ? 'favorited' : ''}`}
                    onClick={handleToggleWishlist}
                    title={isFavorited ? 'Remover da Lista de Desejos' : 'Adicionar à Lista de Desejos'}
                  >
                    {isFavorited ? '❤️' : '🤍'}
                  </button>
                </div>
              )}

              <div className="product-details-list">
                <h3>Detalhes do Produto</h3>
                <ul>
                  <li><strong>Código:</strong> {product.id}</li>
                  <li><strong>Disponibilidade:</strong> {product.stock} unidades em estoque</li>
                  <li><strong>Categoria:</strong> {product.category?.name || 'N/A'}</li>
                  <li><strong>Marca:</strong> {product.brand?.name || 'N/A'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
