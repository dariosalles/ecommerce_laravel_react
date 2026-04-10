import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Terms.css';

function Terms() {
  const { t } = useLanguage();

  return (
    <div className="terms-page">
      <div className="container">
        <div className="terms-header">
          <h1>Termos e Condições</h1>
          <p>Última atualização: 9 de abril de 2026</p>
        </div>

        <div className="terms-content">
          <section>
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o site da E-Com Shop, você concorda em estar vinculado por estes Termos e Condições. Se você não concordar com qualquer parte destes termos, por favor, não utilize o site.
            </p>
          </section>

          <section>
            <h2>2. Uso de Licença</h2>
            <p>
              É concedida ao você uma licença limitada, não exclusiva e não transferível para acessar e usar o site para fins legítimos. Você concorda em não:
            </p>
            <ul>
              <li>Usar o site para qualquer fim ilegal ou prejudicial</li>
              <li>Reproduzir, duplicar, copiar ou vender qualquer conteúdo do site</li>
              <li>Tentar obter acesso não autorizado ao site ou seus sistemas</li>
              <li>Usar qualquer ferramenta que interfira com o funcionamento do site</li>
              <li>Enviar conteúdo ofensivo, assediador ou vulgar</li>
            </ul>
          </section>

          <section>
            <h2>3. Isenção de Responsabilidade</h2>
            <p>
              O material neste site é fornecido "como está". A E-Com Shop não oferece garantias, explícitas ou implícitas, quanto ao conteúdo. A E-Com Shop se isenta de todas as garantias, incluindo mas não limitado a garantias de comercialização, adequação a um propósito específico e não violação.
            </p>
            <p>
              A E-Com Shop não é responsável por qualquer dano direto, indireto, incidental, especial ou consequente resultante do uso ou incapacidade de usar o site ou seu conteúdo.
            </p>
          </section>

          <section>
            <h2>4. Limitação de Responsabilidade</h2>
            <p>
              Em nenhuma circunstância a E-Com Shop, seus fornecedores ou licenciadores serão responsáveis por danos de qualquer tipo, incluindo danos diretos, indiretos, especiais, incidentais ou consequentes, que resultem do seu uso ou incapacidade de usar o site, mesmo que a E-Com Shop tenha sido notificada da possibilidade de tais danos.
            </p>
          </section>

          <section>
            <h2>5. Compras e Preços</h2>
            <p>
              Todos os preços estão sujeitos a mudanças sem aviso prévio. A E-Com Shop se reserva o direito de limitar ou recusar qualquer pedido. Os preços são mostrados em Reais Brasileiros (BRL) e podem variar de acordo com promoções vigentes.
            </p>
            <p>
              A confirmação de compra é enviada por email e representa a aceitação de seu pedido. Qualquer erro de preço será corrigido antes do envio.
            </p>
          </section>

          <section>
            <h2>6. Pagamento</h2>
            <p>
              Você concorda em fornecer informações de pagamento precisas e autorizadas. A E-Com Shop utiliza processadores de pagamento terceirizados seguros para processar transações. Você é responsável por qualquer fraude ou uso não autorizado de sua conta.
            </p>
            <p>
              Métodos de pagamento aceitos: Cartão de Crédito, Cartão de Débito, PIX e Boleto Bancário.
            </p>
          </section>

          <section>
            <h2>7. Devoluções e Reembolsos</h2>
            <p>
              Para informações completas sobre nossa política de devoluções, consulte a página de Política de Devoluções. Em resumo:
            </p>
            <ul>
              <li>30 dias para solicitar devolução após recebimento</li>
              <li>Produtos devem estar em estado original com embalagem intacta</li>
              <li>Reembolsos processados em até 7 dias após aprovação</li>
            </ul>
          </section>

          <section>
            <h2>8. Contas de Usuário</h2>
            <p>
              Se você criar uma conta em nosso site, você é responsável por manter a confidencialidade de seus dados de login e senha. Você concorda em aceitar responsabilidade por todas as atividades que ocorram sob sua conta. Você deve notificar imediatamente a E-Com Shop sobre qualquer uso não autorizado.
            </p>
          </section>

          <section>
            <h2>9. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do site, incluindo textos, gráficos, logos, imagens e software, é propriedade da E-Com Shop ou de seus fornecedores de conteúdo e é protegido por leis internacionais de direitos autorais.
            </p>
            <p>
              Você não pode reproduzir, distribuir ou transmitir qualquer conteúdo sem permissão prévia por escrito.
            </p>
          </section>

          <section>
            <h2>10. Links de Terceiros</h2>
            <p>
              O site pode conter links para sites de terceiros. A E-Com Shop não é responsável pelo conteúdo, precisão ou práticas de tais sites. Seu uso de sites de terceiros está sujeito aos termos e políticas daquele site.
            </p>
          </section>

          <section>
            <h2>11. Modificação dos Termos</h2>
            <p>
              A E-Com Shop se reserva o direito de modificar estes Termos e Condições a qualquer momento. Modificações serão efetivas imediatamente após sua publicação. O uso contínuo do site após mudanças indica sua aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2>12. Política de Cancelamento</h2>
            <p>
              De acordo com as leis de proteção ao consumidor brasileiro, você tem direito de desistência da compra realizada à distância dentro de 7 dias úteis, sem necessidade de justificativa e sem penalidades.
            </p>
            <p>
              Para exercer esse direito, entre em contato com suporte informando o número do pedido. O prazo para devolução do produto é de 30 dias.
            </p>
          </section>

          <section>
            <h2>13. Governança e Lei Aplicável</h2>
            <p>
              Estes Termos e Condições são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa será resolvida nos tribunais competentes da República Federativa do Brasil.
            </p>
          </section>

          <section>
            <h2>14. Contato</h2>
            <p>
              Se você tiver perguntas sobre estes Termos e Condições, por favor, entre em contato conosco:
            </p>
            <div className="contact-info-terms">
              <p>📧 Email: suporte@ecomshop.com.br</p>
              <p>📞 Telefone: (11) 9999-9999</p>
              <p>💬 WhatsApp: disponível 24h</p>
              <p>📍 Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
