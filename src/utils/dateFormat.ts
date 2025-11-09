// Funções utilitárias para formatação de datas
export function formatarData(data: string): string {
  const date = new Date(data + 'T00:00:00')
  const dia = date.getDate().toString().padStart(2, '0')
  const ano = date.getFullYear()
  
  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const diaSemana = diasSemana[date.getDay()]
  
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
  const nomeMes = meses[date.getMonth()]
  
  return `${diaSemana}, ${dia} de ${nomeMes} de ${ano}`
}

export function formatarDataCurta(data: string): string {
  const date = new Date(data + 'T00:00:00')
  const dia = date.getDate().toString().padStart(2, '0')
  const mes = (date.getMonth() + 1).toString().padStart(2, '0')
  const ano = date.getFullYear()
  return `${dia}/${mes}/${ano}`
}

