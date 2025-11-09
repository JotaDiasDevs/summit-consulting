import React from 'react'
import joaoVictorImg from '../../assets/integrantes/joao-victor.jpg'
import rodrigoTiezziImg from '../../assets/integrantes/rodrigo-tiezzi.jpg'
import christianFreitasImg from '../../assets/integrantes/christian-freitas.jpg'

const Integrantes: React.FC = () => {
  const integrantes = [
    {
      nome: 'João Victor Semente Dias',
      rm: 562065,
      turma: '1TDSPY',
      emoji: '👨‍💻',
      cor: 'from-green-500 to-emerald-600',
      github: 'https://github.com/JotaDiasDevs',
      foto: joaoVictorImg
    },
    {
      nome: 'Rodrigo Tiezzi',
      rm: 562975,
      turma: '1TDSPY',
      emoji: '⚡',
      cor: 'from-blue-500 to-cyan-600',
      github: 'https://github.com/rodrigotiezzi?tab=repositories',
      foto: rodrigoTiezziImg
    },
    {
      nome: 'Christian de Souza Freitas',
      rm: 566098,
      turma: '1TDSPY',
      emoji: '🎨',
      cor: 'from-purple-500 to-pink-600',
      github: 'https://github.com/ChrisDeSousaFreitas',
      foto: christianFreitasImg
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">👥 Nossa Equipe</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {integrantes.map((integrante) => (
          <div key={integrante.rm} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="w-full h-64 overflow-hidden">
              <img
                src={integrante.foto}
                alt={integrante.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{integrante.nome}</h3>
              <div className="space-y-1 text-gray-600 mb-4">
                <p>RM: {integrante.rm}</p>
                <p>Turma: {integrante.turma}</p>
              </div>
              {integrante.github && (
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Integrantes

