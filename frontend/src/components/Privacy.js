import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Privacy.css';

function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-header">
          <h1>Política de Privacidade</h1>
          <p>Sua privacidade é importante para nós. Última atualização: 9 de abril de 2026</p>
        </div>

        <div className="privacy-content">
          <section>
            <h2>1. Introdução</h2>
            <p>
              A E-Com Shop ("nós", "nosso" ou "nos") opera o site ecomshop.com.br. Esta página informa você de nossas políticas sobre a coleta, uso e divulgação de dados pessoais quando você usa nosso website e as opções que você tem associadas com esses dados.
            </p>
          </section>

          <section>
            <h2>2. Informações que Coletamos</h2>
            <p>Coletamos vários tipos de informações para vários fins com o objetivo de fornecer a você um serviço melhor e mais personalizado:</p>
            <h3>2.1 Informações Pessoais</h3>
            <ul>
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Endereço de entrega e cobrança</li>
              <li>Data de nascimento</li>
              <li>Gênero</li>
              <li>Informações de pagamento (processadas de forma segura)</li>
            </ul>
            <h3>2.2 Informações de Navegação</h3>
            <ul>
              <li>Endereço IP</li>
              <li>Tipo de navegador e versão</li>
              <li>Páginas visitadas</li>
              <li>Tempo gasto em cada página</li>
              <li>Links clicados</li>
              <li>Dados de rastreamento via cookies</li>
            </ul>
          </section>

          <section>
            <h2>3. Como Usamos Suas Informações</h2>
            <p>Usamos as informações coletadas para:</p>
            <ul>
              <li>Processar suas compras e enviar pedidos</li>
              <li>Custódia e aprimoramento do website e serviços</li>
              <li>Enviar emails informativos, campanhas de marketing e ofertas promocionais</li>
              <li>Responder a seus pedidos, perguntas e reclamações</li>
              <li>Melhorar a experiência do usuário no site</li>
              <li>Gerar estatísticas e análises de uso</li>
              <li>Fraude detecção e prevenção</li>
              <li>Conformidade com leis e regulamentações</li>
            </ul>
          </section>

          <section>
            <h2>4. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas, administrativas e físicas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <p>
              Usamos criptografia SSL (Secure Socket Layer) para proteger informações sensíveis durante a transmissão. No entanto, nenhuma transmissão pela internet é 100% segura.
            </p>
          </section>

          <section>
            <h2>5. Cookies</h2>
            <p>
              Usamos cookies para melhorar sua experiência de navegação. Um cookie é um pequeno arquivo armazenado no seu computador que contém informações sobre sua atividade no site.
            </p>
            <p>
              Você pode controlar as configurações de cookies no seu navegador. Se desabilitar cookies, algumas funcionalidades do site podem não funcionar corretamente.
            </p>
          </section>

          <section>
            <h2>6. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Compartilhamos informações apenas quando necessário para:
            </p>
            <ul>
              <li>Processar pagamentos (com processadores de pagamento certificados)</li>
              <li>Entregar pedidos (com transportadoras confiáveis)</li>
              <li>Cumprir com obrigações legais</li>
              <li>Proteger direitos, privacidade e segurança</li>
            </ul>
          </section>

          <section>
            <h2>7. Retenção de Dados</h2>
            <p>
              Retemos seus dados pessoais apenas pelo tempo necessário para fornecer nossos serviços e cumprir com obrigações legais. Você pode solicitar a exclusão de seus dados a qualquer momento.
            </p>
            <p>
              Alguns dados podem ser retidos por períodos mais longos para conformidade, resolução de disputas e cumprimento de obrigações legais.
            </p>
          </section>

          <section>
            <h2>8. Direitos de Privacidade</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados imprecisos</li>
              <li>Solicitar exclusão de seus dados</li>
              <li>Opor-se ao processamento de seus dados</li>
              <li>Portabilidade de dados</li>
              <li>Revogar seu consentimento</li>
            </ul>
          </section>

          <section>
            <h2>9. Marketing e Comunicações</h2>
            <p>
              Você pode receber emails de marketing, promoções e newsletters de nosso site. Se não desejar mais receber essas comunicações, você pode desinscrever-se clicando no link "Desinscrever" no email ou atualizando suas preferências em sua conta.
            </p>
          </section>

          <section>
            <h2>10. Links para Websites de Terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Esta política de privacidade não se aplica a esses sites. Recomendamos que você leia as políticas de privacidade desses sites antes de fornecer seus dados pessoais.
            </p>
          </section>

          <section>
            <h2>11. Mudanças Nesta Política</h2>
            <p>
              Nos reservamos o direito de atualizar esta Política de Privacidade a qualquer momento. Qualquer mudança será efetiva quando a política atualizada for publicada. Encorajamos você a revisar esta política periodicamente.
            </p>
          </section>

          <section>
            <h2>12. Consentimento</h2>
            <p>
              Ao usar nosso website e fornecer informações pessoais, você consentir com a coleta, uso e divulgação de suas informações de acordo com esta política de privacidade.
            </p>
          </section>

          <section>
            <h2>13. Contato</h2>
            <p>
              Se você tiver dúvidas, comentários ou preocupações sobre esta Política de Privacidade ou nossas práticas de privacidade, por favor, entre em contato conosco:
            </p>
            <div className="contact-info-privacy">
              <p>📧 Email: privacidade@ecomshop.com.br</p>
              <p>📧 DPO (Encarregado de Proteção de Dados): dpo@ecomshop.com.br</p>
              <p>📞 Telefone: (11) 9999-9999</p>
              <p>📍 Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
            </div>
          </section>

          <section className="lgpd-notice">
            <h2>⚖️ Lei Geral de Proteção de Dados (LGPD)</h2>
            <p>
              Operamos em conformidade total com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Você pode exercer seus direitos sob a LGPD a qualquer momento entrando em contato com nosso Encarregado de Proteção de Dados (DPO).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
