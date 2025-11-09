export interface Usuario {
  id: string
  nome: string
  nomeUsuario: string
  email: string
}

export interface LoginFormData {
  nomeUsuario: string
  email: string
}

export interface CadastroFormData {
  nome: string
  nomeUsuario: string
  email: string
}

export interface AuthContextType {
  usuario: Usuario | null
  isAuthenticated: boolean
  login: (userData: Usuario) => void
  logout: () => void
  setUsuario: (user: Usuario | null) => void
}

