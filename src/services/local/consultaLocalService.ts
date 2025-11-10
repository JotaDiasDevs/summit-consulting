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
 * Busca consultas de um usuário específico por ID
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
    return match
  })
  
  console.log('✅ Consultas encontradas por ID:', consultasEncontradas.length)
  return consultasEncontradas
}

/**
 * Busca consultas por email do usuário
 */
export function buscarConsultasPorEmail(usuarioEmail: string): Consulta[] {
  const todasConsultas = buscarConsultasLocais()
  
  console.log('🔍 Buscando consultas locais para email:', usuarioEmail)
  
  const consultasEncontradas = todasConsultas.filter(consulta => {
    return consulta.usuarioEmail && consulta.usuarioEmail.toLowerCase() === usuarioEmail.toLowerCase()
  })
  
  console.log('✅ Consultas encontradas por email:', consultasEncontradas.length)
  return consultasEncontradas
}

/**
 * Busca consultas por ID ou email e atualiza o ID se necessário
 */
export function buscarConsultasPorUsuarioOuEmail(
  usuarioId: string | number,
  usuarioEmail?: string
): Consulta[] {
  const idNormalizado = String(usuarioId)
  
  // Primeiro tenta buscar por ID
  let consultas = buscarConsultasPorUsuario(usuarioId)
  
  // Se não encontrou por ID e tem email, tenta buscar por email
  if (consultas.length === 0 && usuarioEmail) {
    console.log('⚠️ Nenhuma consulta encontrada por ID, tentando buscar por email...')
    const consultasPorEmail = buscarConsultasPorEmail(usuarioEmail)
    
    if (consultasPorEmail.length > 0) {
      console.log('✅ Consultas encontradas por email, atualizando ID...')
      // Atualiza o ID das consultas encontradas por email
      consultas = atualizarIdConsultas(consultasPorEmail, idNormalizado)
    }
  }
  
  return consultas
}

/**
 * Atualiza o ID do usuário nas consultas
 */
function atualizarIdConsultas(consultas: Consulta[], novoId: string): Consulta[] {
  const todasConsultas = buscarConsultasLocais()
  
  // Atualiza o ID nas consultas
  consultas.forEach(consulta => {
    consulta.usuarioId = novoId
    // Atualiza também na lista completa
    const index = todasConsultas.findIndex(c => c.id === consulta.id)
    if (index !== -1) {
      todasConsultas[index].usuarioId = novoId
    }
  })
  
  // Salva de volta no localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todasConsultas))
    console.log('✅ IDs das consultas atualizados para:', novoId)
  } catch (error) {
    console.error('Erro ao atualizar IDs das consultas:', error)
  }
  
  return consultas
}

/**
 * Cria uma nova consulta local
 */
export function criarConsultaLocal(
  usuarioId: string,
  dadosConsulta: ConsultaFormData,
  usuarioEmail?: string
): Consulta {
  const consulta: Consulta = {
    id: gerarIdUnico(),
    usuarioId: String(usuarioId),
    usuarioEmail: usuarioEmail, // Salva o email para busca alternativa
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
  consultas: ConsultaFormData[],
  usuarioEmail?: string
): Consulta[] {
  return consultas.map(consulta => criarConsultaLocal(usuarioId, consulta, usuarioEmail))
}

/**
 * Remove todas as consultas locais (útil para limpeza)
 */
export function limparConsultasLocais(): void {
  localStorage.removeItem(STORAGE_KEY)
}

