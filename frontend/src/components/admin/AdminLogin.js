import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', formData);
      
      // Armazenar token de admin
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_data', JSON.stringify(response.data.admin));

      // Redirecionar para admin dashboard
      navigate('/admin');
    } catch (err) {
      console.error('Erro no login:', err);
      setError(
        err.response?.data?.message || 
        'Credenciais inválidas ou erro no servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>🛡️ Admin Login</h1>
          <p>Painel administrativo da loja</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? '🔄 Conectando...' : '🔓 Fazer Login'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Credenciais padrão para teste:</p>
          <ul>
            <li>📧 admin@ecommerce.local</li>
            <li>🔑 password123</li>
          </ul>
        </div>

        <div className="admin-login-back">
          <button onClick={() => navigate('/')}>
            ← Voltar para loja
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
