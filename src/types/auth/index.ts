export interface Usuario {
  id: string
  nome: string
  nomeUsuario?: string
  email: string
  tipo?: 'paciente' | 'medico'
  // Outros campos que a API pode retornar
  [key: string]: any
}

export interface LoginFormData {
  email: string
  senha: string
  tipo: 'paciente' | 'medico'
}

export interface CadastroFormData {
  nome: string
  email: string
  senha: string
  tipo: 'paciente' | 'medico'
  // Campos adicionais que podem ser necessários
  [key: string]: any
}

export interface LoginResponse {
  usuario: Usuario
  token?: string
  // Outros campos que a API pode retornar
  [key: string]: any
}

export interface AuthContextType {
  usuario: Usuario | null
  isAuthenticated: boolean
  login: (userData: Usuario) => void
  logout: () => void
  setUsuario: (user: Usuario | null) => void
}

