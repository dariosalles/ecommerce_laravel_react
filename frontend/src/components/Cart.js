import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

function Cart() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="breadcrumb-container">
          <div className="container">
            <button onClick={() => navigate('/')} className="breadcrumb-link">HOME</button>
            <span className="separator">/</span>
            <span className="breadcrumb-current">CARRINHO</span>
          </div>
        </div>

        <div className="cart-container">
          <div className="container">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Seu carrinho está vazio</h2>
              <p>Adicione produtos para começar suas compras</p>
              <Link to="/categories" className="continue-shopping-btn">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="breadcrumb-container">
        <div className="container">
          <button onClick={() => navigate('/')} className="breadcrumb-link">HOME</button>
          <span className="separator">/</span>
          <span className="breadcrumb-current">CARRINHO</span>
        </div>
      </div>

      <div className="cart-container">
        <div className="container">
          <h1>Meu Carrinho</h1>
          
          <div className="cart-content">
            <div className="cart-items-section">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="cart-item-row">
                      <td className="product-name-cell">
                        <div className="product-info-cart">
                          <div className="product-image-cart">
                            <div className="image-placeholder-cart">🖼️</div>
                          </div>
                          <div className="product-details-cart">
                            <Link to={`/products/${item.id}`} className="product-name-link">
                              {item.name}
                            </Link>
                            {item.category && (
                              <p className="product-category-cart">{item.category.name}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="price-cell">
                        R$ {parseFloat(item.price).toFixed(2)}
                      </td>
                      <td className="quantity-cell">
                        <div className="quantity-control">
                          <button 
                            className="qty-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="qty-input"
                            min="1"
                          />
                          <button 
                            className="qty-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="subtotal-cell">
                        R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                      <td className="action-cell">
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item.id)}
                          title="Remover do carrinho"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-actions">
                <Link to="/categories" className="continue-shopping-btn-secondary">
                  ← Continuar comprando
                </Link>
                <button 
                  className="clear-cart-btn"
                  onClick={() => {
                    if (window.confirm('Deseja limpar todo o carrinho?')) {
                      clearCart();
                    }
                  }}
                >
                  Limpar carrinho
                </button>
              </div>
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary">
                <h2>Resumo do Pedido</h2>
                
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Frete:</span>
                  <span>Calculado no checkout</span>
                </div>
                
                <div className="summary-row">
                  <span>Desconto:</span>
                  <span>R$ 0,00</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>

                <button className="checkout-btn">
                  Prosseguir para Checkout
                </button>

                <button className="continue-shopping-mobile">
                  Continuar Comprando
                </button>

                <div className="payment-methods">
                  <h4>Formas de Pagamento</h4>
                  <div className="methods">
                    <span title="Cartão de Crédito">💳</span>
                    <span title="Boleto">📋</span>
                    <span title="PIX">📱</span>
                    <span title="Transferência">💰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
