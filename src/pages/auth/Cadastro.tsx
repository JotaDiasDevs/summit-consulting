import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import type { CadastroFormData } from '../../types/auth'
import { useAuth } from '../../contexts/auth/AuthContext'
import { apiService } from '../../services/api/apiService'
import { APIError, HttpStatus } from '../../services/api/apiHelpers'
import { API_CONFIG } from '../../config/api'
import { gerarConsultasAleatorias } from '../../utils/gerarConsultasAleatorias'
import { criarConsultasLocais } from '../../services/local/consultaLocalService'

const Cadastro: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [erro, setErro] = React.useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CadastroFormData>()

  const onSubmit = async (data: CadastroFormData) => {
    try {
      setErro('')
      
      // Prepara os dados para cadastro (sempre como paciente)
      const dadosCadastro = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      }

      // Tenta cadastrar usando o endpoint de pacientes
      let novoUsuario
      
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pacientes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosCadastro),
        })

        if (!response.ok) {
          if (response.status === 409) {
            setErro('Email já cadastrado')
            return
          }
          throw new Error('Erro ao criar conta')
        }

        novoUsuario = await response.json()
      } catch (error) {
        // Fallback: tenta usar endpoint genérico se específico não existir
        novoUsuario = await apiService.criarUsuario(dadosCadastro as any)
      }
      
      // Garante que o ID seja string (pode vir como number da API)
      if (novoUsuario?.id) {
        novoUsuario.id = String(novoUsuario.id)
      }
      
      console.log('✅ Usuário criado:', novoUsuario)
      console.log('🔑 ID do usuário (string):', novoUsuario?.id, 'Tipo:', typeof novoUsuario?.id)
      
      // Cria duas consultas aleatórias localmente (sem usar a API)
      if (novoUsuario?.id) {
        try {
          const consultasAleatorias = gerarConsultasAleatorias(2)
          const usuarioIdParaConsulta = novoUsuario.id
          
          console.log('📅 Criando consultas aleatórias localmente para usuário ID:', usuarioIdParaConsulta)
          console.log('📋 Dados das consultas a serem criadas:', consultasAleatorias)
          
          // Cria as consultas localmente no localStorage
          const consultasCriadas = criarConsultasLocais(usuarioIdParaConsulta, consultasAleatorias)
          console.log('✅ Total de consultas criadas localmente:', consultasCriadas.length)
          console.log('📋 Consultas criadas:', consultasCriadas)
        } catch (error) {
          console.error('❌ Erro ao criar consultas locais:', error)
          // Não interrompe o fluxo se falhar ao criar consultas
        }
      } else {
        console.warn('⚠️ Usuário sem ID, não é possível criar consultas')
      }
      
      login(novoUsuario)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === HttpStatus.CONFLICT) {
          setErro('Email já cadastrado')
        } else {
          setErro(error.message || 'Erro ao criar conta')
        }
      } else {
        const msg = error instanceof Error ? error.message : String(error)
        setErro(msg || 'Erro ao criar conta. Verifique sua conexão.')
      }
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
              {...register('senha', { 
                required: 'Campo obrigatório',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter no mínimo 6 caracteres'
                }
              })}
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

