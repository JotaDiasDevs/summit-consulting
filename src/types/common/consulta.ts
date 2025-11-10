// Union Types explícitos
export type StatusConsulta = 'agendada' | 'realizada' | 'cancelada'
export type TipoEspecialidade = 'Fisioterapia' | 'Ortopedia' | 'Neurologia' | 'Terapia Ocupacional' | 'Fonoaudiologia' | 'Psicologia'

// Tipos relacionados a consultas médicas
export interface Consulta {
  id: string
  usuarioId: string
  usuarioEmail?: string // Email do usuário para busca alternativa
  data: string // formato ISO: YYYY-MM-DD
  horario: string // formato HH:MM
  especialista: string
  especialidade: string
  local: string
  observacoes?: string
  status: StatusConsulta
}

export interface ConsultaFormData {
  data: string
  horario: string
  especialista: string
  especialidade: string
  local: string
  observacoes?: string
}

