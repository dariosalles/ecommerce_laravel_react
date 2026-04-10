import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Toast from '../Toast';
import './AdminSettings.css';

function AdminSettings() {
  const [formData, setFormData] = useState({
    store_name: '',
    store_email: '',
    store_phone: '',
    store_address: '',
    store_description: '',
    logo_url: '',
    favicon_url: '',
    instagram: '',
    facebook: '',
    twitter: '',
    whatsapp: '',
    currency: 'BRL',
    shipping_base_cost: '',
    free_shipping_enabled: false,
    free_shipping_min_value: '',
    terms_and_conditions: '',
    privacy_policy: '',
    shipping_policy: '',
    return_policy: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/store/settings');
      if (response.data) {
        setFormData(response.data);
        setSettingsId(response.data.id);
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
      setError('Erro ao carregar configurações da loja');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('admin_token');
      
      const payload = {
        ...formData,
        shipping_base_cost: parseFloat(formData.shipping_base_cost) || 0,
        free_shipping_min_value: parseFloat(formData.free_shipping_min_value) || null,
      };

      if (settingsId) {
        // Atualizar
        await api.put(
          `/admin/settings/${settingsId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Criar nova
        const response = await api.post(
          '/admin/settings',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSettingsId(response.data.data?.id);
      }

      setSuccess('✅ Configurações salvas com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Erro ao salvar configurações:', err);
      const errorMsg = err.response?.data?.message || 'Erro ao salvar configurações';
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="admin-settings-container">
      {error && <Toast type="error" message={error} />}
      {success && <Toast type="success" message={success} />}

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Seção Informações Básicas */}
        <div className="form-section">
          <h2>📝 Informações Básicas</h2>
          
          <div className="form-group">
            <label htmlFor="store_name">Nome da Loja *</label>
            <input
              type="text"
              id="store_name"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              required
              placeholder="Ex: E-Com Shop"
            />
          </div>

          <div className="form-group">
            <label htmlFor="store_email">Email de Contato *</label>
            <input
              type="email"
              id="store_email"
              name="store_email"
              value={formData.store_email}
              onChange={handleChange}
              required
              placeholder="contato@ecom.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="store_phone">Telefone</label>
            <input
              type="tel"
              id="store_phone"
              name="store_phone"
              value={formData.store_phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="store_address">Endereço</label>
            <input
              type="text"
              id="store_address"
              name="store_address"
              value={formData.store_address}
              onChange={handleChange}
              placeholder="São Paulo, SP - Brasil"
            />
          </div>

          <div className="form-group">
            <label htmlFor="store_description">Descrição da Loja</label>
            <textarea
              id="store_description"
              name="store_description"
              value={formData.store_description}
              onChange={handleChange}
              placeholder="Descreva sua loja..."
              rows="4"
            />
          </div>
        </div>

        {/* Seção Logos e Favicon */}
        <div className="form-section">
          <h2>🎨 Logo e Favicon</h2>
          
          <div className="form-group">
            <label htmlFor="logo_url">URL do Logo</label>
            <input
              type="url"
              id="logo_url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              placeholder="https://..."
            />
            {formData.logo_url && (
              <div className="image-preview">
                <img src={formData.logo_url} alt="Logo" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="favicon_url">URL do Favicon</label>
            <input
              type="url"
              id="favicon_url"
              name="favicon_url"
              value={formData.favicon_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Seção Redes Sociais */}
        <div className="form-section">
          <h2>📱 Redes Sociais</h2>
          
          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="5511999999999"
            />
          </div>
        </div>

        {/* Seção Frete e Moeda */}
        <div className="form-section">
          <h2>💰 Frete e Moeda</h2>
          
          <div className="form-group">
            <label htmlFor="currency">Moeda</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="BRL">BRL - Real Brasileiro</option>
              <option value="USD">USD - Dólar Americano</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="shipping_base_cost">Custo Base do Frete</label>
            <input
              type="number"
              id="shipping_base_cost"
              name="shipping_base_cost"
              value={formData.shipping_base_cost}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="10.00"
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="free_shipping_enabled"
              name="free_shipping_enabled"
              checked={formData.free_shipping_enabled}
              onChange={handleChange}
            />
            <label htmlFor="free_shipping_enabled">Habilitar Frete Grátis</label>
          </div>

          {formData.free_shipping_enabled && (
            <div className="form-group">
              <label htmlFor="free_shipping_min_value">Valor Mínimo para Frete Grátis</label>
              <input
                type="number"
                id="free_shipping_min_value"
                name="free_shipping_min_value"
                value={formData.free_shipping_min_value}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="100.00"
              />
            </div>
          )}
        </div>

        {/* Seção Políticas */}
        <div className="form-section">
          <h2>📋 Políticas</h2>
          
          <div className="form-group">
            <label htmlFor="terms_and_conditions">Termos e Condições</label>
            <textarea
              id="terms_and_conditions"
              name="terms_and_conditions"
              value={formData.terms_and_conditions}
              onChange={handleChange}
              placeholder="Digite os termos e condições..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="privacy_policy">Política de Privacidade</label>
            <textarea
              id="privacy_policy"
              name="privacy_policy"
              value={formData.privacy_policy}
              onChange={handleChange}
              placeholder="Digite a política de privacidade..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_policy">Política de Envio</label>
            <textarea
              id="shipping_policy"
              name="shipping_policy"
              value={formData.shipping_policy}
              onChange={handleChange}
              placeholder="Digite a política de envio..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="return_policy">Política de Devoluções</label>
            <textarea
              id="return_policy"
              name="return_policy"
              value={formData.return_policy}
              onChange={handleChange}
              placeholder="Digite a política de devoluções..."
              rows="5"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Salvando...' : '💾 Salvar Configurações'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={loadSettings}
            disabled={saving}
          >
            🔄 Descartar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;
