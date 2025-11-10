import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { usuarioService } from '../../services/api/apiService'
import type { Usuario } from '../../types/auth'
import { APIError } from '../../services/api/apiHelpers'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const UsuarioDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregarUsuario = async () => {
      if (!id) {
        setErro('ID do usuário não fornecido')
        setCarregando(false)
        return
      }

      try {
        setCarregando(true)
        setErro('')
        const dadosUsuario = await usuarioService.buscarPorId(id)
        setUsuario(dadosUsuario)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        if (error instanceof APIError) {
          setErro(error.message || 'Erro ao carregar usuário')
        } else {
          setErro('Erro ao carregar dados do usuário')
        }
      } finally {
        setCarregando(false)
      }
    }

    carregarUsuario()
  }, [id])

  if (carregando) {
    return <LoadingSpinner />
  }

  if (erro || !usuario) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Erro ao carregar usuário</h2>
          <p className="text-red-700 mb-4">{erro || 'Usuário não encontrado'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="text-green-600 hover:text-green-700 font-semibold mb-4 inline-block"
        >
          ← Voltar ao Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">👤 Detalhes do Usuário</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">ID</h3>
            <p className="text-xl font-bold text-gray-800">{usuario.id}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">NOME COMPLETO</h3>
            <p className="text-xl font-bold text-gray-800">{usuario.nome || 'Não informado'}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">NOME DE USUÁRIO</h3>
            <p className="text-xl font-bold text-gray-800">{usuario.nomeUsuario || 'Não informado'}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">E-MAIL</h3>
            <p className="text-xl font-bold text-gray-800 break-all">{usuario.email}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">TIPO</h3>
            <p className="text-xl font-bold text-gray-800">
              {usuario.tipo ? usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1) : 'Não informado'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsuarioDetalhes

