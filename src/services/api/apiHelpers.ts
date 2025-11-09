// Tipos de erro da API
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
    // Garante que a stack trace seja preservada (compatível com navegadores)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, APIError)
    }
  }
}

// Tipos de erro HTTP comuns
export enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  TIMEOUT = 408,
}

// Mensagens de erro amigáveis baseadas no status
export function getErrorMessage(status: number, defaultMessage?: string): string {
  const errorMessages: Record<number, string> = {
    [HttpStatus.BAD_REQUEST]: 'Dados inválidos. Verifique as informações enviadas.',
    [HttpStatus.UNAUTHORIZED]: 'Não autorizado. Faça login novamente.',
    [HttpStatus.FORBIDDEN]: 'Acesso negado. Você não tem permissão para esta ação.',
    [HttpStatus.NOT_FOUND]: 'Recurso não encontrado.',
    [HttpStatus.CONFLICT]: 'Conflito. O recurso já existe ou está em uso.',
    [HttpStatus.UNPROCESSABLE_ENTITY]: 'Dados não processáveis. Verifique os campos obrigatórios.',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Erro interno do servidor. Tente novamente mais tarde.',
    [HttpStatus.SERVICE_UNAVAILABLE]: 'Serviço temporariamente indisponível. Tente novamente mais tarde.',
    [HttpStatus.TIMEOUT]: 'Tempo limite excedido. Verifique sua conexão.',
  }

  return defaultMessage || errorMessages[status] || 'Erro desconhecido na requisição.'
}

// Função auxiliar para verificar resposta e tratar erros
export async function handleResponse<T = any>(response: Response): Promise<T> {
  // Verifica se a resposta está ok
  if (!response.ok) {
    let errorData: any = {}
    const contentType = response.headers.get('content-type')
    
    // Tenta parsear o JSON de erro, se disponível
    if (contentType && contentType.includes('application/json')) {
      try {
        errorData = await response.json()
      } catch {
        // Se falhar ao parsear JSON, usa o texto da resposta
        try {
          const text = await response.text()
          errorData = { message: text || undefined }
        } catch {
          // Se tudo falhar, usa mensagem padrão
        }
      }
    } else {
      // Se não for JSON, tenta ler como texto
      try {
        const text = await response.text()
        errorData = { message: text || undefined }
      } catch {
        // Ignora se não conseguir ler
      }
    }

    // Usa mensagem do servidor ou mensagem padrão baseada no status
    const errorMessage = errorData.message || 
                        errorData.error || 
                        getErrorMessage(response.status)
    
    throw new APIError(errorMessage, response.status, errorData)
  }

  // Verifica se há conteúdo para parsear
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    try {
      const data = await response.json()
      return data as T
    } catch (error) {
      // Se falhar ao parsear JSON, lança erro
      throw new APIError(
        'Resposta inválida do servidor',
        response.status,
        { parseError: error }
      )
    }
  }

  // Se não for JSON, retorna texto ou vazio
  if (response.status === 204 || response.status === 201) {
    return {} as T
  }

  try {
    const text = await response.text()
    return (text ? JSON.parse(text) : {}) as T
  } catch {
    return {} as T
  }
}

// Função para fazer requisições HTTP com timeout e tratamento de erros
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  
  try {
    // Configura headers padrão se não fornecidos
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers as HeadersInit),
    }

    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
      signal: controller.signal,
    })
    
    clearTimeout(id)
    return response
  } catch (error: unknown) {
    clearTimeout(id)
    
    // Trata diferentes tipos de erro
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError('Tempo limite excedido. Verifique sua conexão.', HttpStatus.TIMEOUT)
      }
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new APIError(
          'Erro de conexão. Verifique sua internet e tente novamente.',
          HttpStatus.SERVICE_UNAVAILABLE
        )
      }
      // Se for um APIError, re-lança
      if (error instanceof APIError) {
        throw error
      }
    }
    
    // Erro genérico
    throw new APIError(
      'Erro inesperado na requisição. Tente novamente.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { originalError: error }
    )
  }
}