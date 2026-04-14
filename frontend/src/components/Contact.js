import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import api from '../services/api';
import './Contact.css';

function Contact() {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const [storeSettings, setStoreSettings] = useState(null);
  const [contacting, setContacting] = useState(false);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setContacting(true);
      const settingsRes = await api.get('/store/settings');
      
      setStoreSettings(settingsRes.data);

    } catch (error) {
      console.error('Erro ao carregar dados de contato:', error);
      showNotification('Erro ao carregar informações de contato', 'error');
    } finally {
      setContacting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification(t('contact.requiredFields'), 'error');
      return;
    }

    setLoading(true);
    try {
      // Simular envio do formulário (sem backend de email configurado ainda)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNotification(t('contact.messageSent'), 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      showNotification(t('contact.sendError'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.subtitle')}</p>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Informações de Contato */}
          <div className="contact-info-section">
            <h2>{t('contact.contactInfo')}</h2>
            
            <div className="contact-cards">
              {storeSettings?.store_email && (
                <div className="contact-card">
                  <div className="contact-card-icon">✉️</div>
                  <div className="contact-card-content">
                    <h3>{t('contact.email')}</h3>
                    <p>{storeSettings.store_email}</p>
                  </div>
                </div>
              )}
              {storeSettings?.store_phone && (
                <div className="contact-card">
                  <div className="contact-card-icon">📞</div>
                  <div className="contact-card-content">
                    <h3>{t('contact.phone')}</h3>
                    <p>{storeSettings.store_phone}</p>
                  </div>
                </div>
              )}
              {storeSettings?.store_address && (
                <div className="contact-card">
                  <div className="contact-card-icon">📍</div>
                  <div className="contact-card-content">
                    <h3>{t('contact.address')}</h3>
                    <p>{storeSettings.store_address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Redes Sociais */}
            {storeSettings && (
              <div className="social-media">
                <h3>{t('contact.followUs')}</h3>
                <div className="social-links">
                  {storeSettings.whatsapp && (
                    <a href={`https://wa.me/${storeSettings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                      💬 WhatsApp
                    </a>
                  )}
                  {storeSettings.instagram && (
                    <a href={storeSettings.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                      📱 Instagram
                    </a>
                  )}
                  {storeSettings.facebook && (
                    <a href={storeSettings.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                      👍 Facebook
                    </a>
                  )}
                  {storeSettings.twitter && (
                    <a href={storeSettings.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                      𝕏 Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Formulário de Contato */}
          <div className="contact-form-section">
            <h2>{t('contact.sendMessage')}</h2>
            <p>{t('contact.formDescription')}</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('contact.subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subjectPlaceholder')}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? `${t('contact.sending')}...` : t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
