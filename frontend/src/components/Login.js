import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/my-account');
    } else {
      setError(result.message || 'Erro ao fazer login');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{t('login.title') || 'Login'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email') || 'Email'}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login.password') || 'Senha'}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Carregando...' : (t('login.button') || 'Entrar')}
          </button>
        </form>

        <div className="login-footer">
          <p>{t('login.noAccount') || 'Não tem conta?'} <Link to="/register">{t('login.register') || 'Criar conta'}</Link></p>
          <p><Link to="/">{t('login.forgotPassword') || 'Esqueceu a senha?'}</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
