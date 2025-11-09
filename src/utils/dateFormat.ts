// Funções utilitárias para formatação de datas
export function formatarData(data: string): string {
  if (!data) return 'Data inválida'
  
  try {
    // Tenta diferentes formatos de data
    let date: Date
    
    // Se já está no formato ISO (YYYY-MM-DD)
    if (data.includes('T')) {
      date = new Date(data)
    } else if (data.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Formato YYYY-MM-DD
      date = new Date(data + 'T00:00:00')
    } else {
      // Tenta parsear diretamente
      date = new Date(data)
    }
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      return 'Data inválida'
    }
    
    const dia = date.getDate().toString().padStart(2, '0')
    const ano = date.getFullYear()
    
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    const diaSemana = diasSemana[date.getDay()]
    
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                   'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    const nomeMes = meses[date.getMonth()]
    
    return `${diaSemana}, ${dia} de ${nomeMes} de ${ano}`
  } catch (error) {
    console.error('Erro ao formatar data:', error, data)
    return 'Data inválida'
  }
}

export function formatarDataCurta(data: string): string {
  const date = new Date(data + 'T00:00:00')
  const dia = date.getDate().toString().padStart(2, '0')
  const mes = (date.getMonth() + 1).toString().padStart(2, '0')
  const ano = date.getFullYear()
  return `${dia}/${mes}/${ano}`
}

