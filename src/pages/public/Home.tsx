import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4">🏢 Summit Consulting</h1>
          <p className="text-xl mb-8">Plataforma inovadora de gerenciamento e consultoria</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-green-600 font-bold rounded hover:bg-gray-100"
            >
              Começar Agora
            </Link>
            <Link
              to="/sobre"
              className="px-8 py-3 bg-transparent border-2 border-white rounded hover:bg-white hover:text-green-600"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">📊 Nossos Números</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">300+</div>
              <div className="text-gray-600 font-bold text-lg">Pacientes Atendidos</div>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 font-bold text-lg">Consultas Agendadas</div>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 font-bold text-lg">Suporte Disponível</div>
            </div>
            <div className="bg-white rounded-lg shadow p-8 text-center border-2 border-gray-200 flex items-center justify-center md:col-span-3">
              <div className="flex flex-col items-center w-full max-w-4xl">
                <span className="block w-20 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-4" />
                <div className="text-gray-600 text-3xl md:text-4xl font-bold">Reeconquistando o tempo para você!</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

