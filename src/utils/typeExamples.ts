// Arquivo de exemplos demonstrando o uso de Union Types e Intersection Types
// Este arquivo serve como documentação e exemplo de uso dos tipos avançados

import type { 
  StatusConsulta, 
  TipoEspecialidade,
  Consulta,
  ConsultaComUsuario,
  ConsultaDetalhada
} from '../types/common'
import type { 
  TipoUsuario, 
  StatusUsuario,
  Usuario,
  UsuarioComPermissao,
  UsuarioComStatus
} from '../types/auth'

/**
 * Exemplo de função usando Union Types
 * @param status - Status da consulta (Union Type: 'agendada' | 'realizada' | 'cancelada')
 */
export function getStatusColor(status: StatusConsulta): string {
  switch (status) {
    case 'agendada':
      return 'blue'
    case 'realizada':
      return 'green'
    case 'cancelada':
      return 'red'
    default:
      return 'gray'
  }
}

/**
 * Exemplo de função usando Union Types
 * @param tipo - Tipo de usuário (Union Type: 'paciente' | 'medico')
 */
export function getTipoUsuarioLabel(tipo: TipoUsuario): string {
  return tipo === 'paciente' ? 'Paciente' : 'Médico'
}

/**
 * Exemplo de função usando Union Types
 * @param status - Status do usuário (Union Type: 'ativo' | 'inativo' | 'pendente')
 */
export function isUsuarioAtivo(status: StatusUsuario): boolean {
  return status === 'ativo'
}

/**
 * Exemplo de função usando Intersection Types
 * Cria um usuário com permissões a partir de um usuário base
 */
export function criarUsuarioComPermissao(
  usuario: Usuario,
  permissoes: string[],
  nivelAcesso: 'admin' | 'usuario' | 'visitante'
): UsuarioComPermissao {
  return {
    ...usuario,
    permissoes,
    nivelAcesso
  }
}

/**
 * Exemplo de função usando Intersection Types
 * Cria um usuário com status a partir de um usuário base
 */
export function criarUsuarioComStatus(
  usuario: Usuario,
  status: StatusUsuario,
  dataCadastro: string,
  ultimoAcesso?: string
): UsuarioComStatus {
  return {
    ...usuario,
    status,
    dataCadastro,
    ultimoAcesso
  }
}

/**
 * Exemplo de função usando Intersection Types
 * Cria uma consulta com dados do usuário
 */
export function criarConsultaComUsuario(
  consulta: Consulta,
  usuario: Usuario
): ConsultaComUsuario {
  return {
    ...consulta,
    usuario,
    usuarioNome: usuario.nome
  }
}

/**
 * Exemplo de função usando Intersection Types
 * Cria uma consulta detalhada com histórico e anexos
 */
export function criarConsultaDetalhada(
  consulta: Consulta,
  usuario: Usuario,
  historico?: string[],
  anexos?: string[]
): ConsultaDetalhada {
  return {
    ...consulta,
    usuario,
    historico: historico || [],
    anexos: anexos || []
  }
}

/**
 * Exemplo de função usando Union Types com múltiplos tipos
 */
export function validarEspecialidade(especialidade: TipoEspecialidade): boolean {
  const especialidadesValidas: TipoEspecialidade[] = [
    'Fisioterapia',
    'Ortopedia',
    'Neurologia',
    'Terapia Ocupacional',
    'Fonoaudiologia',
    'Psicologia'
  ]
  return especialidadesValidas.includes(especialidade)
}

