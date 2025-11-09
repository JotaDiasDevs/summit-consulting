import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Usuario, AuthContextType } from '../../types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario')
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo))
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error)
        localStorage.removeItem('usuario')
      }
    }
  }, [])

  const login = (usuarioData: Usuario) => {
    setUsuario(usuarioData)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  const value: AuthContextType = {
    usuario,
    isAuthenticated: usuario !== null,
    login,
    logout,
    setUsuario,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

