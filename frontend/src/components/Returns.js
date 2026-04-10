import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Returns.css';

function Returns() {
  const { t } = useLanguage();

  const returnSteps = [
    {
      step: 1,
      title: 'Abra uma Solicitação',
      description: 'Entre em sua conta e acesse "Meus Pedidos". Clique no produto que deseja devolver e selecione o motivo.'
    },
    {
      step: 2,
      title: 'Receba a Etiqueta',
      description: 'Gere a etiqueta de devolução em formato PDF. Imprima e cole na caixa do produto.'
    },
    {
      step: 3,
      title: 'Envie o Produto',
      description: 'Configure a coleta nos Correios ou leve até a agência. O envio é rastreado automaticamente.'
    },
    {
      step: 4,
      title: 'Receba o Reembolso',
      description: 'Após recebermos e avaliarmos o produto, o valor será devolvido ao seu método de pagamento em até 7 dias.'
    }
  ];

  const returnReasons = [
    { icon: '❌', name: 'Produto com Defeito', description: 'O produto apresenta defeitos de fabricação' },
    { icon: '📦', name: 'Produto Danificado', description: 'Chegou danificado durante o transporte' },
    { icon: '🔄', name: 'Produto Diferente', description: 'Não corresponde à descrição ou foto' },
    { icon: '📏', name: 'Tamanho/Cores', description: 'Tamanho ou cor não são o esperado' },
    { icon: '💔', name: 'Mudança de Ideia', description: 'Mudou de ideia sobre a compra' }
  ];

  return (
    <div className="returns-page">
      <div className="container">
        <div className="returns-header">
          <h1>Política de Devoluções</h1>
          <p>Devolvemos seu dinheiro se não estiver satisfeito</p>
        </div>

        <div className="returns-content">
          {/* Prazo de Devolução */}
          <section className="return-period">
            <div className="period-card">
              <h2>📅 Prazo de Devolução</h2>
              <p className="period-highlight">Você tem até 30 dias após receber o produto para solicitar uma devolução</p>
              <p>Este prazo começa a contar a partir data do recebimento do produto, conforme confirmação na nota de entrega.</p>
            </div>
          </section>

          {/* Passo a Passo */}
          <section className="return-process">
            <h2>Como Devolver um Produto</h2>
            <div className="steps-container">
              {returnSteps.map((item) => (
                <div key={item.step} className="step-item">
                  <div className="step-number">{item.step}</div>
                  <div className="step-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Motivos de Devolução */}
          <section className="return-reasons">
            <h2>Motivos Para Devolver</h2>
            <div className="reasons-grid">
              {returnReasons.map((reason, index) => (
                <div key={index} className="reason-card">
                  <div className="reason-icon">{reason.icon}</div>
                  <h3>{reason.name}</h3>
                  <p>{reason.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Condições de Devolução */}
          <section className="return-conditions">
            <h2>Condições Para Devolver</h2>
            <div className="conditions-list">
              <div className="condition-item">
                <h3>✓ Produto Íntegro</h3>
                <p>O produto deve estar em perfeito estado, sem uso ou com uso mínimo. Deve incluir todos os acessórios e documentação original.</p>
              </div>
              <div className="condition-item">
                <h3>✓ Embalagem Original</h3>
                <p>A embalagem original deve estar preservada. Se estiver danificada, pode impedir a devolução.</p>
              </div>
              <div className="condition-item">
                <h3>✓ Nota Fiscal</h3>
                <p>Mantenha a nota fiscal e o comprovante de entrega. Eles serão solicitados no processo de devolução.</p>
              </div>
              <div className="condition-item">
                <h3>✓ Sem Sinais de Uso</h3>
                <p>Produtos com sinais evidentes de uso podem não ser aceitos para devolução, dependendo do motivo.</p>
              </div>
              <div className="condition-item">
                <h3>💳 Frete da Devolução</h3>
                <p>O frete de devolução é gratuito quando o motivo é defeito de fabricação ou produto diferente. Caso contrário, pode ter custo.</p>
              </div>
              <div className="condition-item">
                <h3>⏱️ Processamento</h3>
                <p>Após recebermos o produto, levamos até 5 dias úteis para avaliar. Se aprovado, o reembolso é processado em até 7 dias.</p>
              </div>
            </div>
          </section>

          {/* Produtos Não Devolvíveis */}
          <section className="non-returnable">
            <h2>⚠️ Produtos Que Não Podem Ser Devolvidos</h2>
            <div className="non-returnable-list">
              <p>Os seguintes produtos não podem ser devolvidos:</p>
              <ul>
                <li>Artigos de higiene pessoal (por razões de higiene)</li>
                <li>Produtos com sinais claros de falsidade</li>
                <li>Itens que já foram abertos/usados (exceto defeito)</li>
                <li>Produtos digitais ou códigos de ativação já utilizados</li>
                <li>Produtos inflamáveis ou perigosos</li>
              </ul>
            </div>
          </section>

          {/* Reembolso */}
          <section className="refund-info">
            <h2>💰 Reembolso</h2>
            <div className="refund-details">
              <div className="refund-item">
                <h3>Quando Você Recebe?</h3>
                <p>O reembolso é processado de 5 a 7 dias úteis após a aprovação da devolução. O valor retorna à sua conta bancária ou método de pagamento original.</p>
              </div>
              <div className="refund-item">
                <h3>Cartão de Crédito</h3>
                <p>O reembolso aparecerá como crédito em sua fatura ou crédito aberto, dependendo do seu banco.</p>
              </div>
              <div className="refund-item">
                <h3>PIX</h3>
                <p>O reembolso é devolvido para a chave PIX utilizada na compra em até 2 dias úteis.</p>
              </div>
              <div className="refund-item">
                <h3>Boleto</h3>
                <p>Será emitido um novo boleto ou transferência bancária conforme solicitação.</p>
              </div>
            </div>
          </section>

          {/* Dúvidas */}
          <section className="return-help">
            <h2>Ainda tem dúvidas sobre devoluções?</h2>
            <p>Entre em contato com nosso suporte</p>
            <div className="help-links">
              <a href="mailto:comprador@ecomshop.com.br" className="help-btn">
                📧 Email: comprador@ecomshop.com.br
              </a>
              <a href="https://wa.me/5511999999999" className="help-btn" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp disponível 24h
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Returns;
