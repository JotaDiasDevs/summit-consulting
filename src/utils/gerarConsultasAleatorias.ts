import type { ConsultaFormData } from '../types/common'

// Dados para gerar consultas aleatórias
const especialidades = [
  'Fisioterapia',
  'Ortopedia',
  'Neurologia',
  'Terapia Ocupacional',
  'Fonoaudiologia',
  'Psicologia',
]

const especialistas = [
  'Dr. Carlos Mendes',
  'Dra. Ana Paula Souza',
  'Dr. Roberto Alves',
  'Dra. Fernanda Lima',
  'Dr. Paulo Santos',
  'Dra. Juliana Costa',
  'Dr. Marcelo Oliveira',
  'Dra. Patricia Silva',
]

const locais = [
  'IMREA - Unidade Vila Mariana',
  'IMREA - Unidade Butantã',
  'IMREA - Unidade Centro',
  'IMREA - Unidade Zona Norte',
]

const observacoes = [
  'Trazer exames de ressonância',
  'Consulta de retorno',
  'Primeira consulta',
  'Avaliação inicial',
  'Consulta de acompanhamento',
  'Retorno após tratamento',
]

const horarios = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

/**
 * Gera uma data futura aleatória (entre 7 e 60 dias a partir de hoje)
 */
function gerarDataAleatoria(): string {
  const hoje = new Date()
  const diasAleatorios = Math.floor(Math.random() * 53) + 7 // Entre 7 e 60 dias
  const dataFutura = new Date(hoje)
  dataFutura.setDate(hoje.getDate() + diasAleatorios)
  
  const ano = dataFutura.getFullYear()
  const mes = String(dataFutura.getMonth() + 1).padStart(2, '0')
  const dia = String(dataFutura.getDate()).padStart(2, '0')
  
  return `${ano}-${mes}-${dia}`
}

/**
 * Seleciona um item aleatório de um array
 */
function itemAleatorio<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Gera uma consulta aleatória
 */
export function gerarConsultaAleatoria(): ConsultaFormData {
  const especialidade = itemAleatorio(especialidades)
  const especialista = itemAleatorio(especialistas)
  const local = itemAleatorio(locais)
  const horario = itemAleatorio(horarios)
  const data = gerarDataAleatoria()
  const observacao = itemAleatorio(observacoes)

  return {
    data,
    horario,
    especialista,
    especialidade,
    local,
    observacoes: observacao,
  }
}

/**
 * Gera múltiplas consultas aleatórias
 */
export function gerarConsultasAleatorias(quantidade: number = 2): ConsultaFormData[] {
  const consultas: ConsultaFormData[] = []
  
  for (let i = 0; i < quantidade; i++) {
    consultas.push(gerarConsultaAleatoria())
  }
  
  return consultas
}

