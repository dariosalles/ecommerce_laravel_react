import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Shipping.css';

function Shipping() {
  const { t } = useLanguage();

  const shippingMethods = [
    {
      name: 'Sedex',
      days: '5 a 10 dias',
      description: 'Entrega rápida para todo Brasil',
      icon: '⚡'
    },
    {
      name: 'PAC',
      days: '10 a 15 dias',
      description: 'Entrega econômica',
      icon: '📦'
    },
    {
      name: 'Retirada em Loja',
      days: '1 a 2 dias',
      description: 'Retire na nossa loja',
      icon: '🏪'
    }
  ];

  return (
    <div className="shipping-page">
      <div className="container">
        <div className="shipping-header">
          <h1>Informações de Envio</h1>
          <p>Conheça nossas opções de frete para toda o Brasil</p>
        </div>

        <div className="shipping-content">
          {/* Métodos de Envio */}
          <section className="shipping-methods">
            <h2>Nossas Opções de Frete</h2>
            <div className="methods-grid">
              {shippingMethods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.name}</h3>
                  <p className="method-days">{method.days}</p>
                  <p className="method-desc">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Prazos e Custos */}
          <section className="shipping-info">
            <h2>Prazos e Custos</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>📍 Cálculo de Frete</h3>
                <p>
                  O frete é calculado automaticamente no carrinho com base no seu CEP e no peso total do pedido. Você pode visualizar todas as opções de entrega disponíveis antes de confirmar a compra.
                </p>
              </div>
              <div className="info-card">
                <h3>🚚 Rastreamento</h3>
                <p>
                  Todos os pedidos são enviados com rastreamento. Você receberá um código de rastreamento por email e pode acompanhá-lo em tempo real pelo site dos Correios ou pela transportadora.
                </p>
              </div>
              <div className="info-card">
                <h3>🎁 Frete Grátis</h3>
                <p>
                  Aproveite frete grátis em compras acima de R$ 150. Consulte as políticas de promoção para outras oferta de frete grátis.
                </p>
              </div>
              <div className="info-card">
                <h3>🌍 Cobertura</h3>
                <p>
                  Entregamos para todo o Brasil, incluindo zonas rurais. Algumas regiões podem ter prazos estendidos. Consulte a disponibilidade no seu CEP.
                </p>
              </div>
            </div>
          </section>

          {/* Regras de Envio */}
          <section className="shipping-rules">
            <h2>Regras de Envio</h2>
            <div className="rules-list">
              <div className="rule-item">
                <h3>✓ Endereço de Entrega</h3>
                <p>O endereço deve estar completo e correto. Não entregamos em números, aplicamos multa por falta de informação no endereço.</p>
              </div>
              <div className="rule-item">
                <h3>✓ Tentativas de Entrega</h3>
                <p>São realizadas até 3 tentativas de entrega. Se não encontrar o destinatário, o produto retorna e você pode combinar a retirada.</p>
              </div>
              <div className="rule-item">
                <h3>✓ Embalagem</h3>
                <p>Todos os produtos são embalados com cuidado para garantir que cheguem em perfeito estado. Utilizamos materiais de proteção adequados.</p>
              </div>
              <div className="rule-item">
                <h3>✓ Horário de Entrega</h3>
                <p>As entregas são realizadas de segunda a sexta-feira, entre 8h e 18h. Entrega aos sábados em alguns casos pode estar disponível.</p>
              </div>
              <div className="rule-item">
                <h3>✓ Aviso de Entrega</h3>
                <p>Você receberá um SMS ou email quando o produto sair para entrega e quando chegar em sua cidade.</p>
              </div>
              <div className="rule-item">
                <h3>✓ Danos na Entrega</h3>
                <p>Se receber um produto danificado, contate nosso suporte imediatamente. Faremos uma análise e providenciaremos uma substituição.</p>
              </div>
            </div>
          </section>

          {/* Retirada em Loja */}
          <section className="in-store-pickup">
            <h2>Retirada em Loja</h2>
            <div className="pickup-info">
              <p>
                Se preferir, você pode retirar seu pedido na nossa loja. A retirada está disponível em 1 a 2 dias úteis após a confirmação do pagamento.
              </p>
              <div className="pickup-details">
                <div className="detail-item">
                  <h4>📍 Endereço</h4>
                  <p>Av. Paulista, 1000 - São Paulo, SP</p>
                </div>
                <div className="detail-item">
                  <h4>⏰ Horário de Funcionamento</h4>
                  <p>
                    Seg-Sex: 10h às 19h<br />
                    Sab: 10h às 14h<br />
                    Dom: Fechado
                  </p>
                </div>
                <div className="detail-item">
                  <h4>📞 Contato</h4>
                  <p>
                    (11) 9999-9999<br />
                    suporte@ecomshop.com.br
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
