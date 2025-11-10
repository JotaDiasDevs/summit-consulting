import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/auth/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Integrantes from './pages/public/Integrantes'
import FAQ from './pages/public/FAQ'
import Contact from './pages/public/Contact'
import Acessar from './pages/auth/Cadastro'
import Dashboard from './pages/private/Dashboard'
import UsuarioDetalhes from './pages/private/UsuarioDetalhes'
import ConsultaDetalhes from './pages/private/ConsultaDetalhes'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/cadastro" element={<Acessar />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Rotas dinâmicas com parâmetros */}
            <Route
              path="/usuarios/:id"
              element={
                <ProtectedRoute>
                  <UsuarioDetalhes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consultas/:id"
              element={
                <ProtectedRoute>
                  <ConsultaDetalhes />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App