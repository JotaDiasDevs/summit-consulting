import type { Usuario } from '../../types/auth'
import type { Consulta } from '../../types/common'
import { API_CONFIG } from '../../config/api'
import { fetchWithTimeout, handleResponse, APIError } from './apiHelpers'

const API_BASE_URL = API_CONFIG.BASE_URL

export const apiService = {
  async buscarUsuarios(): Promise<Usuario[]> {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/usuarios`)
      return handleResponse(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao buscar usuários', 500)
    }
  },

  async buscarUsuarioPorCredenciais(
    nomeUsuario: string,
    email: string
  ): Promise<Usuario | null> {
    const usuarios = await this.buscarUsuarios()
    return (
      usuarios.find(
        (usuario) =>
          usuario.nomeUsuario === nomeUsuario && usuario.email === email
      ) || null
    )
  },

  async verificarDuplicidade(
    nomeUsuario: string,
    email: string
  ): Promise<{ nomeUsuarioExiste: boolean; emailExiste: boolean }> {
    const usuarios = await this.buscarUsuarios()
    const nomeUsuarioExiste = usuarios.some(
      (usuario) => usuario.nomeUsuario === nomeUsuario
    )
    const emailExiste = usuarios.some((usuario) => usuario.email === email)
    return { nomeUsuarioExiste, emailExiste }
  },

  async criarUsuario(
    dadosUsuario: Omit<Usuario, 'id'>
  ): Promise<Usuario> {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosUsuario),
    })
    if (!response.ok) {
      throw new Error('Erro ao criar usuário')
    }
    return response.json()
  },

  
  async buscarConsultasPorUsuario(usuarioId: string): Promise<Consulta[]> {
    const response = await fetch(`${API_BASE_URL}/consultas?usuarioId=${usuarioId}&status=agendada`)
    if (!response.ok) {
      throw new Error('Erro ao buscar consultas')
    }
    return response.json()
  },

  async buscarTodasConsultas(): Promise<Consulta[]> {
    const response = await fetch(`${API_BASE_URL}/consultas`)
    if (!response.ok) {
      throw new Error('Erro ao buscar consultas')
    }
    return response.json()
  },
}

