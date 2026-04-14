import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../services/api';
import './Footer.css';

function Footer() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [storeSettings, setStoreSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      // Buscar categorias
      const categoriesRes = await api.get('/categories');
      setCategories(categoriesRes.data.slice(0, 5));
      
      // Buscar informações da loja
      const storeRes = await api.get('/store/settings');
      setStoreSettings(storeRes.data);
      
      // Buscar métodos de pagamento
      const paymentRes = await api.get('/payment-methods');
      setPaymentMethods(paymentRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados do footer:', error);
      // Valores padrão em caso de erro
      setStoreSettings({
        store_name: 'E-Com Shop',
        store_email: 'contato@ecom.com',
        store_phone: '(11) 99999-9999',
        store_address: 'São Paulo, SP - Brasil',
        instagram: 'https://instagram.com/ecomshop',
        facebook: 'https://facebook.com/ecomshop',
        twitter: 'https://twitter.com/ecomshop',
        whatsapp: '5511999999999',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Aqui você pode enviar o email do newsletter para a API
      setSubscribeMessage(t('footer.subscriptionSuccess') || 'Obrigado por se inscrever!');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Sobre a Loja */}
            <div className="footer-section">
              <h3>{storeSettings?.store_name || t('footer.aboutStore') || 'Sobre a Loja'}</h3>
              <p className="store-description">
                {storeSettings?.store_description || t('footer.storeDescription') || 'Descubra um mundo de moda, eletrônicos e muito mais. Qualidade premium com preços imbatíveis.'}
              </p>
              <div className="social-links">
                <a href={storeSettings?.facebook || '#'} className="social-link" title="Facebook" target="_blank" rel="noopener noreferrer">f</a>
                <a href={storeSettings?.instagram || '#'} className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
                <a href={storeSettings?.twitter || '#'} className="social-link" title="Twitter" target="_blank" rel="noopener noreferrer">𝕏</a>
                <a href={`https://wa.me/${storeSettings?.whatsapp}` || '#'} className="social-link" title="WhatsApp" target="_blank" rel="noopener noreferrer">💬</a>
              </div>
            </div>

            {/* Categorias */}
            <div className="footer-section">
              <h4>{t('footer.categories') || 'Categorias'}</h4>
              <ul className="footer-links">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link to={`/categories/${category.id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><Link to="/categories">{t('footer.categories') || 'Ver Todas'}</Link></li>
                )}
              </ul>
            </div>

            {/* Atendimento */}
            <div className="footer-section">
              <h4>{t('footer.support') || 'Atendimento'}</h4>
              <ul className="footer-links">
                <li><Link to="/faq">{t('footer.faq') || 'Perguntas Frequentes'}</Link></li>
                <li><Link to="/shipping">{t('footer.shipping') || 'Frete e Entrega'}</Link></li>
                <li><Link to="/returns">{t('footer.returns') || 'Devoluções'}</Link></li>
                <li><Link to="/terms">{t('footer.terms') || 'Termos de Uso'}</Link></li>
                <li><Link to="/privacy">{t('footer.privacy') || 'Política de Privacidade'}</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="footer-section">
              <h4>{t('footer.contact') || 'Contato'}</h4>
              <div className="contact-info">
                {storeSettings?.store_email && (
                  <div className="contact-item">
                    <span className="icon">📧</span>
                    <a href={`mailto:${storeSettings.store_email}`}>{storeSettings.store_email}</a>
                  </div>
                )}
                {storeSettings?.store_phone && (
                  <div className="contact-item">
                    <span className="icon">📞</span>
                    <a href={`tel:${storeSettings.store_phone.replace(/\D/g, '')}`}>{storeSettings.store_phone}</a>
                  </div>
                )}
                {storeSettings?.whatsapp && (
                  <div className="contact-item">
                    <span className="icon">💬</span>
                    <a href={`https://wa.me/${storeSettings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">{storeSettings.whatsapp}</a>
                  </div>
                )}
                {storeSettings?.store_address && (
                  <div className="contact-item">
                    <span className="icon">📍</span>
                    <p>{storeSettings.store_address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-section newsletter-section">
              <h4>{t('footer.newsletter') || 'Newsletter'}</h4>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder={t('footer.newsletterPlaceholder') || 'Digite seu e-mail'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">{t('footer.subscribe') || 'Inscrever'}</button>
              </form>
              {subscribeMessage && (
                <p className="subscribe-message">{subscribeMessage}</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="payment-methods">
              <span className="payment-title">{t('footer.paymentMethods') || 'Formas de Pagamento'}</span>
              <div className="payment-icons">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((method) => {
                    const icons = {
                      credit_card: '💳',
                      debit_card: '🏦',
                      pix: '📱',
                      boleto: '📦',
                    };
                    const icon = icons[method.slug] || '💳';
                    return (
                      <span key={method.id} className="payment-icon" title={method.description}>
                        {icon} {method.name}
                      </span>
                    );
                  })
                ) : (
                  <>
                    <span className="payment-icon">💳 Cartão</span>
                    <span className="payment-icon">🏦 Débito</span>
                    <span className="payment-icon">📱 PIX</span>
                    <span className="payment-icon">📦 Boleto</span>
                  </>
                )}
              </div>
            </div>

            <div className="footer-copyright">
              <p>
                {t('footer.copyright') || '© 2026 Ecommerce. Todos os direitos reservados.'}
              </p>
            </div>

            <div className="security-badges">
              <span className="badge">🔒 {t('footer.security') || 'Seguro'}</span>
              <span className="badge">✓ Verificado</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
