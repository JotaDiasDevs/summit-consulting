// Union Types explícitos
export type TipoUsuario = 'paciente' | 'medico'
export type StatusUsuario = 'ativo' | 'inativo' | 'pendente'

export interface Usuario {
  id: string
  nome: string
  nomeUsuario?: string
  email: string
  tipo?: TipoUsuario
  // Outros campos que a API pode retornar
  [key: string]: any
}

// Intersection Types explícitos
export type UsuarioComPermissao = Usuario & {
  permissoes: string[]
  nivelAcesso: 'admin' | 'usuario' | 'visitante'
}

export type UsuarioComStatus = Usuario & {
  status: StatusUsuario
  dataCadastro: string
  ultimoAcesso?: string
}

export interface AuthContextType {
  usuario: Usuario | null
  isAuthenticated: boolean
  login: (userData: Usuario) => void
  logout: () => void
  setUsuario: (user: Usuario | null) => void
}

