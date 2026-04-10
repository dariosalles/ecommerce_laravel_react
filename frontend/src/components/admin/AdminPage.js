import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../services/api';
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminCategories from './AdminCategories';
import './AdminLayout.css';

function AdminPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      // Verificar se token é válido
      const response = await api.get('/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmin(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar dados do admin:', err);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      await api.post(
        '/admin/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Erro no logout:', err);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      navigate('/admin/login');
    }
  };

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

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Carregando painel administrativo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>❌ Erro</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/admin/login')}>
          Voltar para login
        </button>
      </div>
    );
  }

  if (!admin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>❌ Acesso Negado</h2>
        <p>Você não tem permissão para acessar o painel administrativo.</p>
        <button onClick={() => navigate('/')}>Voltar para loja</button>
      </div>
    );
  }

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

          <button className="menu-btn logout-btn" onClick={handleLogout}>
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
            <span>👤 {admin.name}</span>
            <span style={{ color: '#999' }}>•</span>
            <span style={{ color: '#667eea' }}>{admin.role}</span>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default AdminPage;
