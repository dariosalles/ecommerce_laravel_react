import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'As senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.passwordConfirm
    );

    if (result.success) {
      setMessage('Registro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/my-account');
      }, 1500);
    } else {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setMessage(result.message || 'Erro ao registrar');
      }
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>{t('register.title') || 'Criar Conta'}</h2>

        {message && (
          <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('register.name') || 'Nome Completo'}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="João Silva"
              disabled={loading}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('register.email') || 'Email'}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              disabled={loading}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('register.password') || 'Senha'}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
            <small>Mínimo 8 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">
              {t('register.confirmPassword') || 'Confirmar Senha'}
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              className={errors.passwordConfirm ? 'error' : ''}
            />
            {errors.passwordConfirm && (
              <span className="error-text">{errors.passwordConfirm}</span>
            )}
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Criando conta...' : (t('register.button') || 'Criar Conta')}
          </button>
        </form>

        <div className="register-footer">
          <p>
            {t('register.haveAccount') || 'Já tem conta?'}{' '}
            <Link to="/login">{t('register.login') || 'Fazer Login'}</Link>
          </p>
          <p>
            <Link to="/">{t('register.backHome') || 'Voltar para Home'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
