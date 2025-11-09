import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import type { LoginFormData } from '../../types/auth'
import { useAuth } from '../../contexts/auth/AuthContext'
import { apiService } from '../../services/api/apiService'
import { APIError, HttpStatus } from '../../services/api/apiHelpers'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [erro, setErro] = React.useState('')
  const [tipoUsuario, setTipoUsuario] = React.useState<'paciente' | 'medico'>('paciente')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErro('')
      
      // Chama o endpoint correto baseado no tipo de usuário
      const usuario = await apiService.login(data.email, data.senha, tipoUsuario)
      
      // Adiciona o tipo ao usuário
      const usuarioCompleto = { ...usuario, tipo: tipoUsuario }
      
      login(usuarioCompleto)
      navigate('/dashboard')
    } catch (error) {
      // Tratamento específico para erro 401 (credenciais inválidas)
      if (error instanceof APIError) {
        if (error.status === HttpStatus.UNAUTHORIZED) {
          setErro('Email ou senha incorretos')
        } else {
          setErro(error.message || 'Erro ao fazer login')
        }
      } else {
        const msg = error instanceof Error ? error.message : String(error)
        setErro(msg || 'Erro ao fazer login. Verifique sua conexão.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">🔐 Login</h1>
        <p className="text-gray-600 text-center mb-6">Faça login em sua conta</p>

        {erro && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Tipo de Usuário</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="paciente"
                  checked={tipoUsuario === 'paciente'}
                  onChange={(e) => setTipoUsuario(e.target.value as 'paciente' | 'medico')}
                  className="mr-2"
                />
                <span>Paciente</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="medico"
                  checked={tipoUsuario === 'medico'}
                  onChange={(e) => setTipoUsuario(e.target.value as 'paciente' | 'medico')}
                  className="mr-2"
                />
                <span>Médico</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              {...register('email', { 
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Senha</label>
            <input
              {...register('senha', { required: 'Campo obrigatório' })}
              type="password"
              placeholder="Sua senha"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.senha && (
              <span className="text-red-600 text-sm">{errors.senha.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="text-green-600 font-semibold hover:underline">
            Cadastre-se
          </Link>
        </p>


      </div>
    </div>
  )
}

export default Login

