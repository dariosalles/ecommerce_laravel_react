import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminCategories from './AdminCategories';
import './AdminLayout.css';

function AdminPage() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Verificar se é admin
  const isAdmin = user?.role === 'admin' || user?.is_admin === 1;

  if (!user || !isAdmin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>❌ Acesso Negado</h2>
        <p>Você não tem permissão para acessar o painel administrativo.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'orders':
        return <AdminOrders />;
      case 'products':
        return <AdminProducts />;
      case 'users':
        return <AdminUsers />;
      case 'categories':
        return <AdminCategories />;
      default:
        return <AdminDashboard />;
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          🛡️ Admin Panel
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          
          <div className="admin-nav-section">
            <div className="admin-nav-section-title">Gerenciamento</div>
          </div>

          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Pedidos
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🛍️ Produtos
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            🏷️ Categorias
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuários
          </button>

          <div className="admin-nav-section">
            <div className="admin-nav-section-title">Conta</div>
          </div>

          <button
            className="admin-nav-item"
            onClick={handleLogout}
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            🚪 Sair
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>
            {activeTab === 'dashboard' && '📊 Dashboard'}
            {activeTab === 'orders' && '📦 Gerenciar Pedidos'}
            {activeTab === 'products' && '🛍️ Gerenciar Produtos'}
            {activeTab === 'users' && '👥 Gerenciar Usuários'}
            {activeTab === 'categories' && '🏷️ Gerenciar Categorias'}
          </h1>
          <div className="admin-user-info">
            <span>👤 {user.name}</span>
            <span style={{ color: '#999' }}>•</span>
            <span style={{ color: '#667eea' }}>Admin</span>
          </div>
        </div>

        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
