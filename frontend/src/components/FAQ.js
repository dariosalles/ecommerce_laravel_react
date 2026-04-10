import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './FAQ.css';

function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Qual é o prazo de entrega?',
      answer: 'Os prazos de entrega variam de 5 a 15 dias úteis, dependendo da sua localização e do método de frete selecionado. Você recebe um código de rastreamento assim que seu pedido é despachado.'
    },
    {
      question: 'Como rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido utilizando o código de rastreamento enviado por email assim que o produto sai de nosso armazém. Basta clicar no link ou inserir o código na página de rastreamento.'
    },
    {
      question: 'Qual é o prazo para devolução?',
      answer: 'Você tem até 30 dias após o recebimento do produto para solicitar uma devolução. O produto deve estar em perfeito estado, com embalagem original e com todos os acessórios.'
    },
    {
      question: 'Como faço para devolver um produto?',
      answer: 'Acesse sua conta, vá para "Meus Pedidos" e clique no produto que deseja devolver. Siga as instruções e gere a etiqueta de devolução. Envie o produto pelos Correios usando a etiqueta fornecida.'
    },
    {
      question: 'Vocês aceitam qual meio de pagamento?',
      answer: 'Aceitamos Cartão de Crédito, Cartão de Débito, PIX e Boleto Bancário. Todos os pagamentos são processados com segurança através de criptografia SSL.'
    },
    {
      question: 'Meu pedido está atrasado. O que fazer?',
      answer: 'Se seu pedido está atrasado, entre em contato com nosso suporte informando o número do pedido. Você pode nos chamar no WhatsApp, enviar email ou falar com nosso atendimento por telefone.'
    },
    {
      question: 'Posso cancelar ou modificar meu pedido?',
      answer: 'Pedidos podem ser cancelados antes do despacho da mercadoria. Para cancelar ou modificar, entre em contato com nosso suporte o mais rápido possível, pois o despacho pode ocorrer em até 24 horas após a compra.'
    },
    {
      question: 'Vocês oferecem garantia nos produtos?',
      answer: 'Sim, oferecemos garantia de fábrica em todos os produtos. A garantia varia de acordo com o tipo de produto. Consulte a descrição do produto para mais detalhes sobre a cobertura.'
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <div className="faq-header">
          <h1>Perguntas Frequentes</h1>
          <p>Encontre respostas para as dúvidas mais comuns</p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                </button>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <aside className="faq-sidebar">
            <div className="sidebar-card">
              <h3>Ainda tem dúvidas?</h3>
              <p>Nosso time de suporte está pronto para ajudar você!</p>
              <div className="sidebar-links">
                <a href="mailto:suporte@ecomshop.com.br" className="btn-support btn-email">
                  📧 Envie um Email
                </a>
                <a href="https://wa.me/5511999999999" className="btn-support btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  💬 Fale no WhatsApp
                </a>
                <a href="tel:+551199999999" className="btn-support btn-phone">
                  📞 Ligue para Nós
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
