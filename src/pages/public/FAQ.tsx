import React, { useState } from 'react'

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Como faço para ver minhas consultas no IMREA?',
      a: 'Após fazer login na plataforma, acesse seu Dashboard. Lá você encontrará suas consultas agendadas com todas as informações: data, horário, especialista e local. Para agendar novas consultas, entre em contato com o IMREA diretamente.',
      icon: '📅'
    },
    {
      q: 'Tenho dificuldade para usar o celular. A plataforma é fácil de usar?',
      a: 'Sim! Nossa plataforma foi desenvolvida especialmente para ser acessível e fácil de usar. Utilizamos textos grandes, cores contrastantes, ícones claros e um layout simples. Todos os elementos são grandes e fáceis de tocar, facilitando o uso por pessoas com dificuldades tecnológicas.',
      icon: '📱'
    },
    {
      q: 'Esqueci minha senha. Como faço?',
      a: 'Entre em contato conosco através da página de Contato ou ligue para o suporte do IMREA. Nossa equipe irá ajudá-lo a recuperar o acesso à sua conta de forma segura.',
      icon: '🔑'
    },
    {
      q: 'A plataforma é segura? Meus dados estão protegidos?',
      a: 'Sim! Levamos a segurança dos seus dados muito a sério. Todas as informações são protegidas e apenas você e a equipe autorizada do IMREA têm acesso aos seus dados médicos e de consultas.',
      icon: '🔒'
    },
    {
      q: 'Posso usar a plataforma no computador também?',
      a: 'Sim! A plataforma funciona tanto no celular quanto no computador ou tablet. Você pode acessar de qualquer dispositivo com internet. O layout se adapta automaticamente ao tamanho da tela.',
      icon: '💻'
    },
    {
      q: 'Como recebo ajuda se tiver dúvidas sobre o uso da plataforma?',
      a: 'Oferecemos suporte dedicado para ajudá-lo! Você pode entrar em contato através da página de Contato, ou ligar diretamente para o IMREA. Nossa equipe está disponível para auxiliar com qualquer dificuldade que você possa ter.',
      icon: '🆘'
    },
    {
      q: 'O que faço se minha consulta aparecer com dados incorretos?',
      a: 'Entre em contato imediatamente com o IMREA para corrigir as informações. É importante que os dados estejam corretos para que você não perca sua consulta. Ligue para a unidade onde sua consulta está agendada.',
      icon: '✏️'
    },
    {
      q: 'A plataforma funciona sem internet?',
      a: 'Não, é necessário ter conexão com a internet para acessar a plataforma. Porém, uma vez que você visualize suas consultas, você pode anotá-las em um lugar seguro para consulta posterior.',
      icon: '🌐'
    },
    {
      q: 'Posso cancelar ou remarcar uma consulta pela plataforma?',
      a: 'Atualmente, para cancelar ou remarcar consultas, é necessário entrar em contato diretamente com o IMREA pelo telefone. A plataforma mostra suas consultas, mas as alterações devem ser feitas através do atendimento da instituição.',
      icon: '🔄'
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

