import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { usuarioService, consultaService } from '../../services/api/apiService'
import { API_CONFIG } from '../../config/api'
import LoadingSpinner from '../../components/common/LoadingSpinner'

interface Estatisticas {
  totalPacientes: number
  totalMedicos: number
  totalConsultas: number
  consultasAgendadas: number
  consultasRealizadas: number
  consultasCanceladas: number
}

const Dashboard: React.FC = () => {
  const { usuario } = useAuth()
  const [usuarioFinal, setUsuarioFinal] = React.useState(usuario)
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    totalPacientes: 0,
    totalMedicos: 0,
    totalConsultas: 0,
    consultasAgendadas: 0,
    consultasRealizadas: 0,
    consultasCanceladas: 0,
  })
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Carrega usuário do localStorage se não estiver no contexto
  React.useEffect(() => {
    const carregarUsuario = () => {
      if (usuario) {
        setUsuarioFinal(usuario)
        console.log('👤 Usuário do contexto:', usuario)
        return
      }
      
      // Tenta carregar do localStorage
      try {
        const usuarioSalvo = localStorage.getItem('usuario')
        if (usuarioSalvo) {
          const usuarioParsed = JSON.parse(usuarioSalvo)
          if (usuarioParsed.id) {
            usuarioParsed.id = String(usuarioParsed.id)
          }
          // Garante que nome e nomeUsuario estejam presentes
          if (!usuarioParsed.nome && usuarioParsed.nomeUsuario) {
            usuarioParsed.nome = usuarioParsed.nomeUsuario
          }
          if (!usuarioParsed.nomeUsuario && usuarioParsed.nome) {
            usuarioParsed.nomeUsuario = usuarioParsed.nome
          }
          setUsuarioFinal(usuarioParsed)
          console.log('👤 Usuário carregado do localStorage:', usuarioParsed)
          console.log('📋 Campos do usuário:', {
            id: usuarioParsed.id,
            nome: usuarioParsed.nome,
            nomeUsuario: usuarioParsed.nomeUsuario,
            email: usuarioParsed.email
          })
        } else {
          console.warn('⚠️ Nenhum usuário encontrado no localStorage')
        }
      } catch (error) {
        console.error('❌ Erro ao carregar usuário do localStorage:', error)
      }
    }
    
    // Tenta carregar imediatamente
    carregarUsuario()
    
    // Tenta novamente após um pequeno delay (caso o localStorage ainda não tenha sido atualizado)
    const timeout = setTimeout(carregarUsuario, 100)
    
    return () => clearTimeout(timeout)
  }, [usuario])

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        setCarregando(true)
        setErro('')
        
        console.log('📊 Carregando estatísticas...')
        
        // Busca todas as estatísticas em paralelo
        const [pacientesResult, medicosResult, consultasResult] = await Promise.allSettled([
          // Tenta buscar pacientes do endpoint específico, se não funcionar, busca de usuários
          fetch(`${API_CONFIG.BASE_URL}/pacientes`, { method: 'GET' })
            .then(res => res.ok ? res.json() : Promise.reject())
            .catch(() => usuarioService.buscarTodos().then(usuarios => 
              usuarios.filter(u => u.tipo === 'paciente' || !u.tipo)
            )),
          // Tenta buscar médicos do endpoint específico, se não funcionar, busca de usuários
          fetch(`${API_CONFIG.BASE_URL}/medicos`, { method: 'GET' })
            .then(res => res.ok ? res.json() : Promise.reject())
            .catch(() => usuarioService.buscarTodos().then(usuarios => 
              usuarios.filter(u => u.tipo === 'medico')
            )),
          // Busca consultas
          consultaService.buscarTodas(),
        ])
        
        const totalPacientes = pacientesResult.status === 'fulfilled' 
          ? (Array.isArray(pacientesResult.value) ? pacientesResult.value.length : 0)
          : 0
        const totalMedicos = medicosResult.status === 'fulfilled' 
          ? (Array.isArray(medicosResult.value) ? medicosResult.value.length : 0)
          : 0
        const todasConsultas = consultasResult.status === 'fulfilled' ? consultasResult.value : []
        
        const consultasAgendadas = todasConsultas.filter(c => c.status === 'agendada').length
        const consultasRealizadas = todasConsultas.filter(c => c.status === 'realizada').length
        const consultasCanceladas = todasConsultas.filter(c => c.status === 'cancelada').length
        
        setEstatisticas({
          totalPacientes,
          totalMedicos,
          totalConsultas: todasConsultas.length,
          consultasAgendadas,
          consultasRealizadas,
          consultasCanceladas,
        })
        
        console.log('✅ Estatísticas carregadas:', {
          totalPacientes,
          totalMedicos,
          totalConsultas: todasConsultas.length,
          consultasAgendadas,
          consultasRealizadas,
          consultasCanceladas,
        })
      } catch (error) {
        console.error('❌ Erro ao carregar estatísticas:', error)
        setErro('Erro ao carregar estatísticas. Tente novamente mais tarde.')
      } finally {
        setCarregando(false)
      }
    }

    carregarEstatisticas()
  }, [])

  if (carregando) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">📊 Dashboard</h1>
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Bem-vindo! 👋</h2>
          <p className="text-xl text-gray-700">
            Olá, <span className="font-bold text-green-700">{usuarioFinal?.nome || 'Usuário'}</span>! 
            Aqui estão as estatísticas do sistema IMREA.
          </p>
        </div>
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <div className="mb-6 p-6 bg-red-50 border-l-4 border-red-600 rounded-lg">
          <p className="text-xl text-red-700 font-semibold">⚠️ {erro}</p>
        </div>
      )}

      {/* Estatísticas Principais */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          📈 Estatísticas Gerais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Total de Pacientes */}
          <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">👥</div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-600 mb-1">PACIENTES</p>
                <p className="text-4xl font-bold text-blue-700">{estatisticas.totalPacientes}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">Total de pacientes cadastrados</p>
          </div>

          {/* Card: Total de Médicos */}
          <div className="bg-purple-50 rounded-xl p-8 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">👨‍⚕️</div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-600 mb-1">MÉDICOS</p>
                <p className="text-4xl font-bold text-purple-700">{estatisticas.totalMedicos}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">Total de médicos cadastrados</p>
          </div>

          {/* Card: Total de Consultas */}
          <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">📅</div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-600 mb-1">CONSULTAS</p>
                <p className="text-4xl font-bold text-green-700">{estatisticas.totalConsultas}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">Total de consultas no sistema</p>
          </div>
        </div>
      </div>

      {/* Estatísticas de Consultas por Status */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          📊 Status das Consultas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Consultas Agendadas */}
          <div className="bg-yellow-50 rounded-xl p-8 border-2 border-yellow-200 shadow-lg">
            <div className="text-center">
              <div className="text-5xl mb-4">⏰</div>
              <p className="text-4xl font-bold text-yellow-700 mb-2">{estatisticas.consultasAgendadas}</p>
              <p className="text-xl font-semibold text-gray-800 mb-1">Agendadas</p>
              <p className="text-sm text-gray-600">Consultas marcadas</p>
            </div>
          </div>

          {/* Card: Consultas Realizadas */}
          <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200 shadow-lg">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-4xl font-bold text-green-700 mb-2">{estatisticas.consultasRealizadas}</p>
              <p className="text-xl font-semibold text-gray-800 mb-1">Realizadas</p>
              <p className="text-sm text-gray-600">Consultas concluídas</p>
            </div>
          </div>

          {/* Card: Consultas Canceladas */}
          <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200 shadow-lg">
            <div className="text-center">
              <div className="text-5xl mb-4">❌</div>
              <p className="text-4xl font-bold text-red-700 mb-2">{estatisticas.consultasCanceladas}</p>
              <p className="text-xl font-semibold text-gray-800 mb-1">Canceladas</p>
              <p className="text-sm text-gray-600">Consultas canceladas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Usuário */}
      <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">👤 Seus Dados</h3>
        {usuarioFinal ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">NOME DE USUÁRIO</p>
              <p className="text-xl font-bold text-gray-800">{usuarioFinal.nomeUsuario || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">E-MAIL</p>
              <p className="text-xl font-bold text-gray-800 break-all">{usuarioFinal.email || 'Não informado'}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">Carregando dados do usuário...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
