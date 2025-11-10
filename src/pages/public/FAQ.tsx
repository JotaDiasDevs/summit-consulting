import React, { useState } from 'react'

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Como faço para acessar a plataforma Summit Consulting?',
      a: 'Para acessar a plataforma, clique em "Acessar" no menu superior ou na página inicial. Você precisará informar seus dados de administrador. Após o acesso, você será direcionado ao Dashboard com as estatísticas do sistema.',
      icon: '🔐'
    },
    {
      q: 'O que posso ver no Dashboard?',
      a: 'No Dashboard você encontrará estatísticas completas do sistema, incluindo: total de pacientes cadastrados, total de médicos, total de consultas marcadas, consultas agendadas, realizadas e canceladas. Além disso, você pode visualizar seus dados pessoais na seção "Seus Dados".',
      icon: '📊'
    },
    {
      q: 'A plataforma é fácil de usar?',
      a: 'Sim! A Summit Consulting foi desenvolvida com foco em usabilidade e acessibilidade. Utilizamos interface intuitiva, textos claros, ícones visuais e um layout responsivo que se adapta a qualquer dispositivo. Todos os elementos são grandes e fáceis de usar.',
      icon: '📱'
    },
    {
      q: 'Como recupero meu acesso se esquecer minha senha?',
      a: 'Entre em contato conosco através da página de Contato. Nossa equipe de suporte irá ajudá-lo a recuperar o acesso à sua conta de forma segura e rápida.',
      icon: '🔑'
    },
    {
      q: 'A plataforma é segura? Meus dados estão protegidos?',
      a: 'Sim! A segurança dos dados é uma prioridade para a Summit Consulting. Todas as informações são protegidas com os mais altos padrões de segurança. Apenas usuários autorizados têm acesso aos dados do sistema.',
      icon: '🔒'
    },
    {
      q: 'Posso acessar a plataforma de qualquer dispositivo?',
      a: 'Sim! A plataforma Summit Consulting é totalmente responsiva e funciona perfeitamente em computadores, tablets e smartphones. O layout se adapta automaticamente ao tamanho da tela, proporcionando uma experiência otimizada em qualquer dispositivo.',
      icon: '💻'
    },
    {
      q: 'Como recebo suporte se tiver dúvidas?',
      a: 'Oferecemos suporte dedicado para ajudá-lo! Você pode entrar em contato através da página de Contato em nosso site. Nossa equipe está disponível para auxiliar com qualquer dúvida ou dificuldade que você possa ter ao usar a plataforma.',
      icon: '🆘'
    },
    {
      q: 'A plataforma funciona sem conexão com a internet?',
      a: 'Não, é necessário ter conexão com a internet para acessar a plataforma Summit Consulting. Todos os dados são armazenados de forma segura na nuvem, garantindo acesso de qualquer lugar com internet.',
      icon: '🌐'
    },
    {
      q: 'O que é a Summit Consulting?',
      a: 'A Summit Consulting é uma plataforma inovadora de gerenciamento e consultoria. Desenvolvemos soluções que combinam excelência técnica com experiência do usuário excepcional, fornecendo ferramentas poderosas para gerenciar processos e dados de forma eficiente.',
      icon: '🏢'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">❓ Perguntas Frequentes</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{faq.icon}</span>
                  <span className="text-lg font-semibold text-left">{faq.q}</span>
                </div>
                <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2 text-gray-600 border-t">
                  {faq.a}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQ

