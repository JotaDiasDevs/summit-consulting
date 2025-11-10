import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/AuthContext'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
          <span className="text-3xl">🏢</span>
          <span>Summit Consulting</span>
        </Link>

        
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600">
             Início
          </Link>
          <Link to="/sobre" className="text-gray-700 hover:text-green-600">
             Sobre
          </Link>
          <Link to="/integrantes" className="text-gray-700 hover:text-green-600">
             Equipe
          </Link>
          <Link to="/faq" className="text-gray-700 hover:text-green-600">
             FAQ
          </Link>
          <Link to="/contato" className="text-gray-700 hover:text-green-600">
             Contato
          </Link>

          {usuario ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">👤 {usuario.nome}</span>
              <Link
                to="/dashboard"
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/cadastro"
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Acessar
            </Link>
          )}
        </nav>

        
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      
      {menuOpen && (
        <nav className="md:hidden bg-gray-50 border-t px-4 py-4 space-y-2">
          <Link
            to="/"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            to="/sobre"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </Link>
          <Link
            to="/integrantes"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Equipe
          </Link>
          <Link
            to="/faq"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/contato"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </Link>
          {usuario ? (
            <>
              <div className="block text-gray-700 py-2">👤 {usuario.nome}</div>
              <Link
                to="/dashboard"
                className="block px-3 py-2 bg-green-600 text-white rounded text-center"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-3 py-2 bg-red-600 text-white rounded text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/cadastro"
              className="block px-3 py-2 bg-green-600 text-white rounded text-center"
              onClick={() => setMenuOpen(false)}
            >
              Acessar
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header

