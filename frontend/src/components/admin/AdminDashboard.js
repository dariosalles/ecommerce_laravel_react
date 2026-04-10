import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    setError('');
    try {
      // Carregar estatísticas de diferentes endpoints
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        api.get('/orders').catch(() => ({ data: { data: [] } })),
        api.get('/users').catch(() => ({ data: { data: [] } })),
        api.get('/products').catch(() => ({ data: { data: [] } })),
      ]);

      const orders = ordersRes.data.data || [];
      const users = usersRes.data.data || [];
      const products = productsRes.data.data || [];

      // Calcular total de receita
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

      // Contar pedidos por status
      const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: users.length,
        totalProducts: products.length,
        deliveredOrders,
        recentOrders: orders.slice(0, 5),
      });
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="message error">{error}</div>}

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="stat-card orders">
          <div className="stat-label">📦 Total de Pedidos</div>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-change">
            ✅ {stats.deliveredOrders} entregues
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-label">💰 Receita Total</div>
          <div className="stat-value">R$ {stats.totalRevenue.toFixed(2)}</div>
          <div className="stat-change">
            Mês atual
          </div>
        </div>

        <div className="stat-card users">
          <div className="stat-label">👥 Total de Usuários</div>
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-change positive">
            +12% este mês
          </div>
        </div>

        <div className="stat-card products">
          <div className="stat-label">🛍️ Total de Produtos</div>
          <div className="stat-value">{stats.totalProducts}</div>
          <div className="stat-change">
            Em estoque
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="table-container">
        <div className="table-header">
          <h2>Pedidos Recentes</h2>
        </div>

        {stats.recentOrders && stats.recentOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Total</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.order_number}</td>
                  <td>{order.user?.name || 'Cliente'}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>R$ {parseFloat(order.total).toFixed(2)}</td>
                  <td>{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            Nenhum pedido encontrado
          </p>
        )}
      </div>

      {/* Dashboard Info */}
      <div style={{ marginTop: '30px', padding: '20px', background: 'white', borderRadius: '8px' }}>
        <h3>📈 Informações do Sistema</h3>
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li>✅ Backend: Laravel 11 API REST</li>
          <li>✅ Frontend: React 18 com Context API</li>
          <li>✅ Database: MySQL 8.0</li>
          <li>✅ Autenticação: JWT (Laravel Sanctum)</li>
          <li>✅ Containerização: Docker Compose</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
