// Serviço local para gerenciar consultas no localStorage
// Usado quando não queremos depender da API para criar consultas

import type { Consulta, ConsultaFormData } from '../../types/common'

const STORAGE_KEY = 'consultas_locais'

/**
 * Gera um ID único para a consulta
 */
function gerarIdUnico(): string {
  return `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Busca todas as consultas do localStorage
 */
export function buscarConsultasLocais(): Consulta[] {
  try {
    const consultasJson = localStorage.getItem(STORAGE_KEY)
    if (!consultasJson) {
      console.log('📦 Nenhuma consulta encontrada no localStorage')
      return []
    }
    const consultas = JSON.parse(consultasJson)
    console.log('📦 Total de consultas no localStorage:', consultas.length)
    if (consultas.length > 0) {
      console.log('📦 IDs únicos de usuários nas consultas:', [...new Set(consultas.map((c: Consulta) => c.usuarioId))])
    }
    return consultas
  } catch (error) {
    console.error('Erro ao buscar consultas locais:', error)
    return []
  }
}

/**
 * Busca consultas de um usuário específico
 * Compara IDs de forma flexível (string ou número)
 */
export function buscarConsultasPorUsuario(usuarioId: string | number): Consulta[] {
  const todasConsultas = buscarConsultasLocais()
  const idNormalizado = String(usuarioId)
  
  console.log('🔍 Buscando consultas locais para ID:', usuarioId, 'Tipo:', typeof usuarioId)
  console.log('📋 Total de consultas no localStorage:', todasConsultas.length)
  
  const consultasEncontradas = todasConsultas.filter(consulta => {
    const consultaIdNormalizado = String(consulta.usuarioId)
    const match = consultaIdNormalizado === idNormalizado
    if (!match) {
      console.log('❌ ID não corresponde:', {
        consultaId: consulta.usuarioId,
        consultaIdNormalizado,
        usuarioId,
        idNormalizado
      })
    }
    return match
  })
  
  console.log('✅ Consultas encontradas para o usuário:', consultasEncontradas.length)
  return consultasEncontradas
}

/**
 * Cria uma nova consulta local
 */
export function criarConsultaLocal(
  usuarioId: string,
  dadosConsulta: ConsultaFormData
): Consulta {
  const consulta: Consulta = {
    id: gerarIdUnico(),
    usuarioId: String(usuarioId),
    data: dadosConsulta.data,
    horario: dadosConsulta.horario,
    especialista: dadosConsulta.especialista,
    especialidade: dadosConsulta.especialidade,
    local: dadosConsulta.local || 'IMREA - Unidade Vila Mariana',
    observacoes: dadosConsulta.observacoes || '',
    status: 'agendada',
  }

  const todasConsultas = buscarConsultasLocais()
  todasConsultas.push(consulta)
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todasConsultas))
    console.log('✅ Consulta local criada:', consulta)
    return consulta
  } catch (error) {
    console.error('Erro ao salvar consulta local:', error)
    throw new Error('Erro ao salvar consulta local')
  }
}

/**
 * Cria múltiplas consultas locais
 */
export function criarConsultasLocais(
  usuarioId: string,
  consultas: ConsultaFormData[]
): Consulta[] {
  return consultas.map(consulta => criarConsultaLocal(usuarioId, consulta))
}

/**
 * Remove todas as consultas locais (útil para limpeza)
 */
export function limparConsultasLocais(): void {
  localStorage.removeItem(STORAGE_KEY)
}

