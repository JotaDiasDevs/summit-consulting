// Tipos relacionados a consultas médicas
export interface Consulta {
  id: string
  usuarioId: string
  data: string // formato ISO: YYYY-MM-DD
  horario: string // formato HH:MM
  especialista: string
  especialidade: string
  local: string
  observacoes?: string
  status: 'agendada' | 'realizada' | 'cancelada'
}

export interface ConsultaFormData {
  data: string
  horario: string
  especialista: string
  especialidade: string
  local: string
  observacoes?: string
}

