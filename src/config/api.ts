// Configurações da API
// A URL da API pode ser configurada através da variável de ambiente VITE_API_URL
// Exemplo: VITE_API_URL=https://sua-api-java.com/api
// Se não definida, usa endpoints relativos em `/api` (para desenvolvimento local)
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL?.trim() || '/api',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000, // 10 segundos padrão
}

// Validação da configuração
if (import.meta.env.DEV) {
  console.log('🔧 Configuração da API:', {
    BASE_URL: API_CONFIG.BASE_URL,
    TIMEOUT: `${API_CONFIG.TIMEOUT}ms`,
    ENV: import.meta.env.MODE,
  })
}

