// Tipos de erro da API
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// Função auxiliar para verificar resposta
export async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new APIError(
      error.message || 'Erro na requisição',
      response.status,
      error
    )
  }
  return response.json()
}

// Função para fazer requisições com timeout
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 10000
) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(id)
    return response
  } catch (error: unknown) {
    clearTimeout(id)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new APIError('Tempo limite excedido', 408)
    }
    throw error
  }
}