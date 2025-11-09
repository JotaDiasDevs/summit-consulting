import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import type { CadastroFormData } from '../../types/auth'
import { useAuth } from '../../contexts/auth/AuthContext'
import { apiService } from '../../services/api/apiService'

const Cadastro: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [erro, setErro] = React.useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CadastroFormData>()

  const onSubmit = async (data: CadastroFormData) => {
    try {
      setErro('')
      const { nomeUsuarioExiste, emailExiste } = await apiService.verificarDuplicidade(
        data.nomeUsuario,
        data.email
      )

      if (nomeUsuarioExiste) {
        setErro('Nome de usuário já existe')
        return
      }

      if (emailExiste) {
        setErro('Email já cadastrado')
        return
      }

      const novoUsuario = await apiService.criarUsuario({
        nome: data.nome,
        nomeUsuario: data.nomeUsuario,
        email: data.email,
      })

      login(novoUsuario)
      navigate('/dashboard')
    } catch (error) {
      setErro('Erro ao criar conta')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">📝 Cadastro</h1>
        <p className="text-gray-600 text-center mb-6">Crie sua conta</p>

        {erro && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome Completo</label>
            <input
              {...register('nome', { required: 'Campo obrigatório' })}
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.nome && (
              <span className="text-red-600 text-sm">{errors.nome.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Nome de Usuário</label>
            <input
              {...register('nomeUsuario', { required: 'Campo obrigatório' })}
              type="text"
              placeholder="seu.usuario"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.nomeUsuario && (
              <span className="text-red-600 text-sm">{errors.nomeUsuario.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              {...register('email', { required: 'Campo obrigatório' })}
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">{errors.email.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Cadastro

