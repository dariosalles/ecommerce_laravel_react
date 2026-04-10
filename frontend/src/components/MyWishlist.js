import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import './MyWishlist.css';

function MyWishlist() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const calculateTotal = () => {
    return wishlist.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  if (loading) {
    return <div className="wishlist-container"><p>Carregando...</p></div>;
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>❤️ {t('wishlist.title') || 'Minha Lista de Desejos'}</h1>
        <p>{wishlist.length} {wishlist.length === 1 ? 'produto' : 'produtos'}</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">🎁</div>
          <h2>{t('wishlist.empty') || 'Sua lista de desejos está vazia'}</h2>
          <p>{t('wishlist.emptyDescription') || 'Adicione produtos à sua lista de desejos para salvá-los para depois'}</p>
          <Link to="/" className="continue-shopping-btn">
            {t('wishlist.continueShopping') || 'Continuar Comprando'}
          </Link>
        </div>
      ) : (
        <div className="wishlist-content">
          <div className="wishlist-items">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="item-image">
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-price">
                    <span className="price">
                      R$ {parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="item-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      🛒 {t('wishlist.addToCart') || 'Adicionar ao Carrinho'}
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      ✕ {t('wishlist.remove') || 'Remover'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="wishlist-summary">
            <div className="summary-card">
              <h3>{t('wishlist.summary') || 'Resumo'}</h3>
              <div className="summary-item">
                <span>{t('wishlist.items') || 'Quantidade de Itens'}:</span>
                <span>{wishlist.length}</span>
              </div>
              <div className="summary-item total">
                <span>{t('wishlist.estimatedTotal') || 'Total Estimado'}:</span>
                <span>R$ {calculateTotal()}</span>
              </div>
              <button className="checkout-btn">
                {t('wishlist.checkout') || 'Finalizar Compra'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyWishlist;
