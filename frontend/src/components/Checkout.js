import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    paymentMethod: 'credit-card',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Nome é obrigatório';
      if (!formData.lastName.trim()) newErrors.lastName = 'Sobrenome é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    } else if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
      if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
      if (!formData.state.trim()) newErrors.state = 'Estado é obrigatório';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório';
    } else if (currentStep === 3) {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Número do cartão é obrigatório';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Data de validade é obrigatória';
      if (!formData.cardCVV.trim()) newErrors.cardCVV = 'CVV é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);

    try {
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        items: cartItems,
        total: getTotalPrice(),
        paymentMethod: formData.paymentMethod,
      };

      const response = await api.post('/orders', orderData);
      navigate('/order-confirmation', { state: { orderId: response.data.id } });
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      setErrors({ submit: 'Erro ao processar pedido. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos antes de fazer checkout</p>
          <button onClick={() => navigate('/')} className="continue-btn">
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-main">
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <span>{t('checkout.personal') || 'Dados Pessoais'}</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <span>{t('checkout.shipping') || 'Endereço'}</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span>{t('checkout.payment') || 'Pagamento'}</span>
            </div>
          </div>

          <form className="checkout-form">
            {step === 1 && (
              <div className="step-content">
                <h2>{t('checkout.personalInfo') || 'Informações Pessoais'}</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Nome *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Sobrenome *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h2>{t('checkout.shippingAddress') || 'Endereço de Entrega'}</h2>
                <div className="form-group">
                  <label htmlFor="address">Endereço *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Cidade *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">Estado *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-text">{errors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">CEP *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <h2>{t('checkout.paymentInfo') || 'Informações de Pagamento'}</h2>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                    />
                    Cartão de Crédito
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit"
                      checked={formData.paymentMethod === 'debit'}
                      onChange={handleChange}
                    />
                    Cartão de Débito
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleChange}
                    />
                    PIX
                  </label>
                </div>

                {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit') && (
                  <>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Número do Cartão *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Data de Validade *</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/AA"
                          className={errors.cardExpiry ? 'error' : ''}
                        />
                        {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardCVV">CVV *</label>
                        <input
                          type="text"
                          id="cardCVV"
                          name="cardCVV"
                          value={formData.cardCVV}
                          onChange={handleChange}
                          placeholder="123"
                          className={errors.cardCVV ? 'error' : ''}
                        />
                        {errors.cardCVV && <span className="error-text">{errors.cardCVV}</span>}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {errors.submit && <div className="error-message">{errors.submit}</div>}

            <div className="form-actions">
              {step > 1 && (
                <button type="button" className="btn-secondary" onClick={handlePreviousStep}>
                  ← Voltar
                </button>
              )}
              {step < 3 ? (
                <button type="button" className="btn-primary" onClick={handleNextStep}>
                  Próximo →
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSubmitOrder}
                  disabled={loading}
                >
                  {loading ? 'Processando...' : 'Finalizar Pedido'}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="checkout-summary">
          <div className="summary-card">
            <h3>Resumo do Pedido</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>R$ {getTotalPrice()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
