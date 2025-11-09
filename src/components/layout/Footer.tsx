import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4">
              🏢 Summit Consulting
            </h3>
            <p className="text-gray-600">
              Plataforma de acesso para você!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/" className="hover:text-green-600">
                  Início
                </a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-green-600">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/contato" className="hover:text-green-600">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <p className="text-gray-600">
              📧 contato@summitconsulting.com<br />
              📱 (11) 98459-3366
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>
            © 2025 Summit Consulting. Desenvolvido por Summit Consulting - Turma 1TDSPY - FIAP
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

