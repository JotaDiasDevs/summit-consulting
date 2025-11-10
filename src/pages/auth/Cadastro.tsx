import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/AuthContext'
import { apiService } from '../../services/api/apiService'
import { APIError } from '../../services/api/apiHelpers'
import { API_CONFIG } from '../../config/api'

interface AcessoFormData {
  nomeUsuario: string
  email: string
  senha: string
}

const Acessar: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [erro, setErro] = React.useState('')
  const [carregando, setCarregando] = React.useState(false)
  const [formData, setFormData] = React.useState<AcessoFormData>({
    nomeUsuario: '',
    email: '',
    senha: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setErro('')
      setCarregando(true)
      
      // Prepara os dados para acesso
      const dadosAcesso = {
        nomeUsuario: formData.nomeUsuario,
        email: formData.email,
        senha: formData.senha,
      }

      // Tenta cadastrar usando o endpoint de pacientes
      let novoUsuario
      
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pacientes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosAcesso),
        })

        if (!response.ok) {
          throw new Error('Erro ao acessar')
        }

        novoUsuario = await response.json()
      } catch (error) {
        // Fallback: tenta usar endpoint genérico se específico não existir
        novoUsuario = await apiService.criarUsuario(dadosAcesso as any)
      }
      
      // Garante que o ID seja string (pode vir como number da API)
      if (novoUsuario?.id) {
        novoUsuario.id = String(novoUsuario.id)
      }
      
      // Garante que o nome seja preenchido (pode não vir da API)
      if (!novoUsuario?.nome && novoUsuario?.nomeUsuario) {
        novoUsuario.nome = novoUsuario.nomeUsuario
      }
      if (!novoUsuario?.nome && formData.nomeUsuario) {
        novoUsuario.nome = formData.nomeUsuario
      }
      
      // Garante que nomeUsuario esteja presente
      if (!novoUsuario?.nomeUsuario && formData.nomeUsuario) {
        novoUsuario.nomeUsuario = formData.nomeUsuario
      }
      
      console.log('✅ Acesso realizado:', novoUsuario)
      console.log('📋 Dados completos do usuário:', {
        id: novoUsuario?.id,
        nome: novoUsuario?.nome,
        nomeUsuario: novoUsuario?.nomeUsuario,
        email: novoUsuario?.email
      })
      
      login(novoUsuario)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof APIError) {
        setErro(error.message || 'Erro ao acessar')
      } else {
        const msg = error instanceof Error ? error.message : String(error)
        setErro(msg || 'Erro ao acessar. Verifique sua conexão.')
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold mb-2">Acessar</h1>
          <p className="text-gray-600">Acesse o sistema com os dados de administrador</p>
        </div>

        {erro && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome de Usuário</label>
            <input
              name="nomeUsuario"
              type="text"
              value={formData.nomeUsuario}
              onChange={handleChange}
              placeholder="Seu nome de usuário"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Senha</label>
            <input
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Sua senha"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {carregando ? 'Acessando...' : 'Acessar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Acessar

