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
      return []
    }
    return JSON.parse(consultasJson)
  } catch (error) {
    console.error('Erro ao buscar consultas locais:', error)
    return []
  }
}

/**
 * Busca consultas de um usuário específico
 */
export function buscarConsultasPorUsuario(usuarioId: string): Consulta[] {
  const todasConsultas = buscarConsultasLocais()
  return todasConsultas.filter(
    consulta => String(consulta.usuarioId) === String(usuarioId)
  )
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

