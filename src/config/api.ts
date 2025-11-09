// Configurações da API
export const API_CONFIG = {
  // Em produção usamos a variável VITE_API_URL quando definida; caso contrário
  // chamamos endpoints relativos em `/api` (onde colocaremos funções serverless).
  BASE_URL: import.meta.env.VITE_API_URL ?? '/api',
  TIMEOUT: 10000, // 10 segundos
}

