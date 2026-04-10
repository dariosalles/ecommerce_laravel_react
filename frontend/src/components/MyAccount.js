import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './MyAccount.css';

function MyAccount() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    if (activeTab === 'orders' && orders.length === 0) {
      loadOrders();
    }
  }, [activeTab, orders.length]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    setOrdersError('');
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data || response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setOrdersError(error.response?.data?.message || 'Erro ao carregar pedidos');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');
    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage('Perfil atualizado com sucesso!');
      setEditMode(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.message || 'Erro ao atualizar perfil');
    }
    setLoading(false);
  };

  if (!user) {
    return null;
  }

  const getStatusLabel = (status) => {
    const statusMap = {
      pending: '⏳ Pendente',
      processing: '🔄 Processando',
      shipped: '🚚 Enviado',
      delivered: '✅ Entregue',
      cancelled: '❌ Cancelado',
    };
    return statusMap[status] || status;
  };

  const viewOrderDetails = (orderId) => {
    // TODO: Criar página de detalhes do pedido
    alert(`Detalhes do pedido #${orderId} - Em desenvolvimento`);
  };

  return (
    <div className="my-account-container">
      <div className="account-sidebar">
        <div className="account-user-welcome">
          <h3>👤 Olá, {user.name}</h3>
          <p>{user.email}</p>
        </div>
        <nav className="account-menu">
          <button
            className={`menu-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            {t('account.profile') || 'Meu Perfil'}
          </button>
          <button
            className={`menu-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            {t('account.orders') || 'Meus Pedidos'}
          </button>
          <button
            className={`menu-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            {t('account.password') || 'Alterar Senha'}
          </button>
          <button
            className={`menu-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            {t('account.settings') || 'Configurações'}
          </button>
          <button className="menu-btn logout-btn" onClick={handleLogout}>
            {t('account.logout') || 'Sair'}
          </button>
        </nav>
      </div>

      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="content-section">
            <div className="section-header">
              <h2>{t('account.profile') || 'Meu Perfil'}</h2>
              <button
                className="edit-btn"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            {message && <div className="message success">{message}</div>}

            {editMode ? (
              <form className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Endereço</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip_code">CEP</label>
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      value={formData.zip_code || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <span className="label">Nome:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Telefone:</span>
                  <span className="value">{user.phone || 'Não informado'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Endereço:</span>
                  <span className="value">{user.address || 'Não informado'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Cidade:</span>
                  <span className="value">{user.city || 'Não informado'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Membro desde:</span>
                  <span className="value">{new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="content-section">
            <h2>{t('account.orders') || 'Meus Pedidos'}</h2>
            
            {loadingOrders && <p className="loading">Carregando pedidos...</p>}
            
            {ordersError && <div className="message error">{ordersError}</div>}
            
            {!loadingOrders && orders.length === 0 && (
              <div className="empty-state">
                <p>📦 Você ainda não tem pedidos.</p>
                <button className="btn-primary" onClick={() => window.location.href = '/'}>
                  Começar a Comprar
                </button>
              </div>
            )}
            
            {!loadingOrders && orders.length > 0 && (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className={`order-card status-${order.status}`}>
                    <div className="order-header">
                      <div className="order-number">
                        <strong>Pedido #{order.order_number}</strong>
                        <span className={`order-status status-${order.status}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="order-date">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    
                    <div className="order-body">
                      <div className="order-items-preview">
                        <div className="order-items-title">
                          {order.items?.length || 0} item(ns)
                        </div>
                        <div className="order-items-list">
                          {order.items?.slice(0, 2).map((item) => (
                            <div key={item.id} className="order-item-preview">
                              <span className="order-item-name">{item.product?.name}</span>
                              <span className="order-item-qty">x{item.quantity}</span>
                            </div>
                          ))}
                          {order.items?.length > 2 && (
                            <div className="order-more-items">
                              +{order.items.length - 2} item(ns) mais
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {order.tracking_code && (
                        <div className="order-tracking">
                          <span className="order-tracking-label">📍 Rastreio:</span>
                          <span className="order-tracking-code">{order.tracking_code}</span>
                        </div>
                      )}
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <div className="order-total-label">Total</div>
                          <div className="order-total-amount">R$ {parseFloat(order.total).toFixed(2)}</div>
                        </div>
                        <div className="order-actions">
                          <button className="btn-details" onClick={() => viewOrderDetails(order.id)}>
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'password' && (
          <div className="content-section">
            <h2>{t('account.password') || 'Alterar Senha'}</h2>
            <p className="empty-state">Funcionalidade em desenvolvimento.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="content-section">
            <h2>{t('account.settings') || 'Configurações'}</h2>
            <div className="settings-group">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Receber notificações por email
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Receber newsletter
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                Receber promoções
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
