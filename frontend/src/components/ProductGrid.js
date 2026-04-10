import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import { getImageUrl } from '../utils/imageHelper';
import './ProductGrid.css';

function ProductGrid({ products }) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addNotification } = useNotification();

  const handleQuickAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
    addNotification(`✓ ${product.name} adicionado ao carrinho!`);
  };

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2>{t('products.hotDeals')}</h2>
          <div className="pagination">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-card-link">
              <div className="product-card">
                <div className="product-image">
                  {product.image_url ? (
                    <img src={getImageUrl(product.image_url)} alt={product.name} />
                  ) : (
                    <div className="placeholder">Product Image</div>
                  )}
                  <span className="stock-badge">
                    {product.stock > 0 ? t('products.inStock') : t('products.outOfStock')}
                  </span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <div className="product-footer">
                    <span className="price">R$ {parseFloat(product.price).toFixed(2)}</span>
                    <button 
                      className="add-btn" 
                      onClick={(e) => handleQuickAddToCart(e, product)}
                    >
                      {t('products.addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
