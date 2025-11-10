import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth/AuthContext'
import { apiService, consultaService } from '../../services/api/apiService'
import { buscarConsultasPorUsuarioOuEmail } from '../../services/local/consultaLocalService'
import type { Consulta } from '../../types/common'
import { formatarData } from '../../utils/dateFormat'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const Dashboard: React.FC = () => {
  const { usuario } = useAuth()
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregarConsultas = async () => {
      console.log('🔄 useEffect do Dashboard executado')
      console.log('👤 Usuário atual:', usuario)
      
      if (!usuario) {
        console.warn('⚠️ Usuário não está disponível')
        setCarregando(false)
        return
      }
      
      if (!usuario.id) {
        console.warn('⚠️ Usuário sem ID')
        setCarregando(false)
        return
      }
      
      try {
        setCarregando(true)
        setErro('')
        
        // Garante que o ID seja string (pode vir como number da API)
        const usuarioId = usuario.id ? String(usuario.id) : ''
        console.log('🔍 ===== INÍCIO DA BUSCA DE CONSULTAS =====')
        console.log('🔍 Buscando consultas para usuário ID:', usuarioId)
        console.log('🔍 Tipo do ID original:', typeof usuario.id)
        console.log('🔍 ID convertido para string:', usuarioId)
        console.log('👤 Dados completos do usuário:', usuario)
        console.log('👤 Nome do usuário:', usuario.nome)
        console.log('👤 Email do usuário:', usuario.email)
        
        if (!usuarioId) {
          console.warn('⚠️ Usuário sem ID válido')
          setCarregando(false)
          return
        }
        
        // Busca consultas do usuário (da API e do localStorage)
        let consultasData: Consulta[] = []
        
        // Primeiro, busca consultas locais (localStorage) por ID ou email
        try {
          console.log('🔎 Iniciando busca de consultas locais no localStorage...')
          const consultasLocais = buscarConsultasPorUsuarioOuEmail(
            usuarioId,
            usuario.email // Usa o email como fallback
          )
          console.log('📋 Consultas locais encontradas:', consultasLocais.length)
          if (consultasLocais.length > 0) {
            console.log('📋 Primeira consulta local encontrada:', consultasLocais[0])
            console.log('📋 ID da primeira consulta:', consultasLocais[0].usuarioId)
          } else {
            console.warn('⚠️ Nenhuma consulta local encontrada para o ID:', usuarioId, 'ou email:', usuario.email)
          }
          consultasData.push(...consultasLocais)
        } catch (error) {
          console.error('❌ Erro ao buscar consultas locais:', error)
        }
        
        // Depois, tenta buscar da API (se disponível)
        try {
          const consultasApi = await consultaService.buscarPorUsuario(usuarioId)
          console.log('📋 Consultas recebidas da API:', consultasApi.length)
          // Adiciona consultas da API que não estão duplicadas
          consultasApi.forEach(consultaApi => {
            if (!consultasData.find(c => c.id === consultaApi.id)) {
              consultasData.push(consultaApi)
            }
          })
        } catch (error) {
          console.warn('⚠️ Erro ao buscar consultas da API, usando apenas locais:', error)
          // Fallback: tenta com o método antigo
          try {
            const consultasApiAlt = await apiService.buscarConsultasPorUsuario(usuarioId)
            consultasApiAlt.forEach(consultaApi => {
              if (!consultasData.find(c => c.id === consultaApi.id)) {
                consultasData.push(consultaApi)
              }
            })
          } catch (error2) {
            console.warn('⚠️ Erro ao buscar consultas (método alternativo):', error2)
          }
        }
        
        console.log('📊 Total de consultas (locais + API):', consultasData.length)
        
        if (Array.isArray(consultasData) && consultasData.length > 0) {
          const consultasOrdenadas = consultasData
            .filter(consulta => {
              const isValid = consulta && consulta.data && consulta.especialidade
              if (!isValid) {
                console.warn('⚠️ Consulta inválida filtrada:', consulta)
              }
              return isValid
            })
            .sort((a, b) => {
              try {
                const dataA = new Date(`${a.data}T${a.horario || '00:00'}`).getTime()
                const dataB = new Date(`${b.data}T${b.horario || '00:00'}`).getTime()
                return dataA - dataB
              } catch {
                return 0
              }
            })
          console.log('✅ Consultas válidas após filtro:', consultasOrdenadas.length)
          setConsultas(consultasOrdenadas)
        } else {
          console.log('ℹ️ Nenhuma consulta encontrada ou array vazio')
          setConsultas([])
        }
      } catch (error) {
        console.error('❌ Erro ao carregar consultas:', error)
        setErro('Erro ao carregar suas consultas. Tente novamente mais tarde.')
        setConsultas([])
      } finally {
        setCarregando(false)
      }
    }

    
    // Aguarda um pouco para garantir que o usuário foi carregado
    const timeoutId = setTimeout(() => {
      console.log('⏰ Timeout executado, carregando consultas...')
      carregarConsultas()
    }, 200)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [usuario?.id, usuario])

  const getEspecialidadeIcon = (especialidade: string): string => {
    const especialidades: Record<string, string> = {
      'Fisioterapia': '🏃',
      'Ortopedia': '🦴',
      'Neurologia': '🧠',
      'Terapia Ocupacional': '👋',
      'Fonoaudiologia': '🗣️',
      'Psicologia': '💭',
    }
    return especialidades[especialidade] || '🏥'
  }

  if (carregando) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">📊 Dashboard</h1>
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Bem-vindo! 👋</h2>
          <p className="text-xl text-gray-700">
            Olá, <span className="font-bold text-green-700">{usuario?.nome}</span>! 
            Aqui estão suas consultas agendadas no IMREA.
          </p>
        </div>
      </div>

      
      {erro && (
        <div className="mb-6 p-6 bg-red-50 border-l-4 border-red-600 rounded-lg">
          <p className="text-xl text-red-700 font-semibold">⚠️ {erro}</p>
        </div>
      )}

      
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          📅 Suas Consultas Agendadas
        </h2>

        {consultas.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-12 text-center border-2 border-blue-200">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-2xl font-semibold text-gray-700 mb-2">
              Nenhuma consulta agendada
            </p>
            <p className="text-xl text-gray-600">
              Quando você agendar uma consulta, ela aparecerá aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {consultas.map((consulta) => (
              <div
                key={consulta.id}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow p-8"
              >
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">
                      {getEspecialidadeIcon(consulta.especialidade)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {consulta.especialidade || 'Especialidade não informada'}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {consulta.especialista || 'Especialista não informado'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
                    Agendada
                  </div>
                </div>

                
                <div className="space-y-4">
                  
                  <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                    <span className="text-3xl">📅</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        DATA
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {consulta.data ? formatarData(consulta.data) : 'Data não informada'}
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg">
                    <span className="text-3xl">🕐</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        HORÁRIO
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {consulta.horario || 'Horário não informado'}
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-lg">
                    <span className="text-3xl">📍</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        LOCAL
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        Sua consulta será on-line! O link para acesso será enviado 10 minutos antes do início da sua visita.
                      </p>
                    </div>
                  </div>

                  
                  {consulta.observacoes && (
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <p className="text-sm font-semibold text-gray-600 mb-2">
                        📝 OBSERVAÇÕES
                      </p>
                      <p className="text-lg text-gray-800">
                        {consulta.observacoes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">👤 Seus Dados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">NOME COMPLETO</p>
            <p className="text-xl font-bold text-gray-800">{usuario?.nome}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">USUÁRIO</p>
            <p className="text-xl font-bold text-gray-800">{usuario?.nomeUsuario}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">E-MAIL</p>
            <p className="text-xl font-bold text-gray-800 break-all">{usuario?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
