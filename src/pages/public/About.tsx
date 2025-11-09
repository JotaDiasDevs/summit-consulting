import React from 'react'

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">ℹ️ Sobre Summit Consulting</h1>

      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
        <p className="text-gray-600 leading-7 text-xl">
        Na Summit Consulting, nossa missão é transformar a forma como as organizações gerenciam seus processos e dados.
        Acreditamos que a tecnologia deve ser acessível, intuitiva e poderosa para empresas de todos os tamanhos.
        Desenvolvemos soluções inovadoras que combinam excelência técnica com experiência do usuário excepcional.
        Nosso objetivo é fornecer aos nossos clientes uma experiência única, com soluções personalizadas e de alta qualidade.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-8">🎯 Nossos Diferenciais</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h3 className="text-xl font-bold mb-2">🎯 Interface Intuitiva</h3>
          <p className="text-gray-600">Design pensado para facilitar a navegação</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold mb-2">♿ Acessibilidade</h3>
          <p className="text-gray-600">100% acessível para todos os usuários</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h3 className="text-xl font-bold mb-2">📱 Responsivo</h3>
          <p className="text-gray-600">Funciona perfeitamente em qualquer dispositivo</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold mb-2">🔒 Seguro</h3>
          <p className="text-gray-600">Proteção de dados com os mais altos padrões</p>
        </div>
      </div>
    </div>
  )
}

export default About

