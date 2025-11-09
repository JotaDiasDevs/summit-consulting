import type { Usuario } from '../../types/auth'
import type { Consulta, ConsultaFormData } from '../../types/common'
import { API_CONFIG } from '../../config/api'
import { fetchWithTimeout, handleResponse, APIError, HttpStatus } from './apiHelpers'

const API_BASE_URL = API_CONFIG.BASE_URL
const TIMEOUT = API_CONFIG.TIMEOUT

// ==================== SERVIÇOS DE USUÁRIO ====================

export const usuarioService = {
  /**
   * GET - Busca todos os usuários
   */
  async buscarTodos(): Promise<Usuario[]> {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/usuarios`,
        { method: 'GET' },
        TIMEOUT
      )
      return handleResponse<Usuario[]>(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * GET - Busca um usuário por ID
   */
  async buscarPorId(id: string): Promise<Usuario> {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/usuarios/${id}`,
        { method: 'GET' },
        TIMEOUT
      )
      return handleResponse<Usuario>(response)
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === HttpStatus.NOT_FOUND) {
          throw new APIError('Usuário não encontrado', HttpStatus.NOT_FOUND)
        }
        throw error
      }
      throw new APIError('Erro ao buscar usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * GET - Busca usuário por credenciais (nome de usuário e email)
   */
  async buscarPorCredenciais(
    nomeUsuario: string,
    email: string
  ): Promise<Usuario | null> {
    try {
      // Tenta buscar por endpoint específico se disponível, senão busca todos e filtra
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/usuarios?nomeUsuario=${encodeURIComponent(nomeUsuario)}&email=${encodeURIComponent(email)}`,
        { method: 'GET' },
        TIMEOUT
      )
      
      if (response.ok) {
        const usuarios = await handleResponse<Usuario[]>(response)
        return usuarios.length > 0 ? usuarios[0] : null
      }
      
      // Fallback: busca todos e filtra localmente
      const usuarios = await this.buscarTodos()
      return (
        usuarios.find(
          (usuario) =>
            usuario.nomeUsuario === nomeUsuario && usuario.email === email
        ) || null
      )
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao buscar usuário por credenciais', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * POST - Cria um novo usuário
   */
  async criar(dadosUsuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    try {
      // Validação básica dos dados
      if (!dadosUsuario.nome || !dadosUsuario.nomeUsuario || !dadosUsuario.email) {
        throw new APIError('Dados incompletos para criar usuário', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/usuarios`,
        {
          method: 'POST',
          body: JSON.stringify(dadosUsuario),
        },
        TIMEOUT
      )
      return handleResponse<Usuario>(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * PUT - Atualiza um usuário existente
   */
  async atualizar(id: string, dadosUsuario: Partial<Omit<Usuario, 'id'>>): Promise<Usuario> {
    try {
      if (!id) {
        throw new APIError('ID do usuário é obrigatório', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/usuarios/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(dadosUsuario),
        },
        TIMEOUT
      )
      return handleResponse<Usuario>(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao atualizar usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * DELETE - Remove um usuário
   */
  async deletar(id: string): Promise<void> {
    try {
      if (!id) {
        throw new APIError('ID do usuário é obrigatório', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/usuarios/${id}`,
        { method: 'DELETE' },
        TIMEOUT
      )
      
      // DELETE pode retornar 204 (No Content) ou 200 com dados
      if (response.status === 204) {
        return
      }
      
      await handleResponse(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao deletar usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * Verifica duplicidade de nome de usuário e email
   */
  async verificarDuplicidade(
    nomeUsuario: string,
    email: string
  ): Promise<{ nomeUsuarioExiste: boolean; emailExiste: boolean }> {
    try {
      const usuarios = await this.buscarTodos()
      const nomeUsuarioExiste = usuarios.some(
        (usuario) => usuario.nomeUsuario === nomeUsuario
      )
      const emailExiste = usuarios.some((usuario) => usuario.email === email)
      return { nomeUsuarioExiste, emailExiste }
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao verificar duplicidade', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },
}

// ==================== SERVIÇOS DE CONSULTA ====================

export const consultaService = {
  /**
   * GET - Busca todas as consultas
   */
  async buscarTodas(): Promise<Consulta[]> {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/consultas`,
        { method: 'GET' },
        TIMEOUT
      )
      return handleResponse<Consulta[]>(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao buscar consultas', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * GET - Busca uma consulta por ID
   */
  async buscarPorId(id: string): Promise<Consulta> {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/consultas/${id}`,
        { method: 'GET' },
        TIMEOUT
      )
      return handleResponse<Consulta>(response)
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === HttpStatus.NOT_FOUND) {
          throw new APIError('Consulta não encontrada', HttpStatus.NOT_FOUND)
        }
        throw error
      }
      throw new APIError('Erro ao buscar consulta', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * GET - Busca consultas por usuário
   */
  async buscarPorUsuario(usuarioId: string, status?: string): Promise<Consulta[]> {
    try {
      if (!usuarioId) {
        throw new APIError('ID do usuário é obrigatório', HttpStatus.BAD_REQUEST)
      }

      // Garante que o ID seja string para a URL
      const idString = String(usuarioId)
      let url = `${API_BASE_URL}/consultas?usuarioId=${encodeURIComponent(idString)}`
      if (status) {
        url += `&status=${encodeURIComponent(status)}`
      }

      console.log('🌐 URL da requisição de consultas:', url)

      const response = await fetchWithTimeout(
        url,
        { method: 'GET' },
        TIMEOUT
      )
      
      const data = await handleResponse<Consulta[]>(response)
      console.log('📥 Resposta da API de consultas:', data)
      return data
    } catch (error) {
      console.error('❌ Erro ao buscar consultas:', error)
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao buscar consultas do usuário', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * POST - Cria uma nova consulta
   */
  async criar(usuarioId: string, dadosConsulta: ConsultaFormData): Promise<Consulta> {
    try {
      if (!usuarioId) {
        throw new APIError('ID do usuário é obrigatório', HttpStatus.BAD_REQUEST)
      }

      // Validação básica dos dados
      if (!dadosConsulta.data || !dadosConsulta.horario || !dadosConsulta.especialista || !dadosConsulta.especialidade) {
        throw new APIError('Dados incompletos para criar consulta', HttpStatus.BAD_REQUEST)
      }

      // Converte o ID para número (a API Java espera Long)
      const idNumero = Number(usuarioId)
      
      if (isNaN(idNumero) || idNumero <= 0) {
        throw new APIError(`ID do usuário inválido: ${usuarioId}`, HttpStatus.BAD_REQUEST)
      }

      console.log('🔑 ID do usuário:', usuarioId, '→ Convertido para número:', idNumero)

      // A API Java com JPA geralmente espera o objeto relacionado completo
      // Vamos tentar buscar o paciente primeiro
      let pacienteData = null
      try {
        // Tenta diferentes endpoints possíveis
        const endpoints = [
          `${API_BASE_URL}/pacientes/${idNumero}`,
          `${API_BASE_URL}/usuarios/${idNumero}`,
        ]
        
        for (const endpoint of endpoints) {
          try {
            const pacienteResponse = await fetchWithTimeout(
              endpoint,
              { method: 'GET' },
              TIMEOUT
            )
            if (pacienteResponse.ok) {
              pacienteData = await handleResponse(pacienteResponse)
              console.log('👤 Paciente encontrado em:', endpoint, pacienteData)
              break
            }
          } catch (err) {
            // Continua tentando o próximo endpoint
            continue
          }
        }
        
        if (!pacienteData) {
          console.warn('⚠️ Paciente não encontrado em nenhum endpoint')
        }
      } catch (error) {
        console.warn('⚠️ Erro ao buscar paciente:', error)
      }

      // Prepara o objeto da consulta
      // APIs Java com JPA/Hibernate geralmente esperam o objeto relacionado completo
      const consultaCompleta: any = {
        data: dadosConsulta.data,
        horario: dadosConsulta.horario,
        especialista: dadosConsulta.especialista,
        especialidade: dadosConsulta.especialidade,
        local: dadosConsulta.local || 'IMREA - Unidade Vila Mariana',
        observacoes: dadosConsulta.observacoes || '',
        status: 'agendada',
      }

      // Se conseguiu buscar o paciente, usa o objeto completo
      // APIs Java com JPA geralmente exigem o objeto relacionado completo
      if (pacienteData && pacienteData.id) {
        const pacienteIdFinal = Number(pacienteData.id) || idNumero
        
        // API Java espera objeto paciente completo com todos os campos
        // Usa os dados do paciente retornado pela API
        consultaCompleta.paciente = {
          id: pacienteIdFinal,
          nome: pacienteData.nome || pacienteData.nomeUsuario || '',
          email: pacienteData.email || '',
          // Inclui outros campos que possam existir
          ...(pacienteData.senha && { senha: pacienteData.senha }),
          ...(pacienteData.tipo && { tipo: pacienteData.tipo }),
        }
        // Também envia pacienteId como número (algumas APIs aceitam ambos)
        consultaCompleta.pacienteId = pacienteIdFinal
        console.log('👤 Usando objeto paciente completo com ID:', pacienteIdFinal)
      } else {
        // Se não conseguiu buscar, tenta criar um objeto mínimo
        // Isso pode não funcionar se a API exigir validação do paciente
        consultaCompleta.paciente = {
          id: idNumero,
        }
        consultaCompleta.pacienteId = idNumero
        console.warn('⚠️ Paciente não encontrado, usando objeto mínimo com ID:', idNumero)
      }

      console.log('📤 Payload completo que será enviado:')
      console.log(JSON.stringify(consultaCompleta, null, 2))
      console.log('🔍 Tipo do pacienteId:', typeof consultaCompleta.pacienteId)
      console.log('🔍 Valor do pacienteId:', consultaCompleta.pacienteId)

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/consultas`,
        {
          method: 'POST',
          body: JSON.stringify(consultaCompleta),
        },
        TIMEOUT
      )
      
      // Log detalhado da resposta antes de processar
      console.log('📥 Status da resposta:', response.status, response.statusText)
      console.log('📥 Headers da resposta:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        // Tenta ler o corpo da resposta de erro para debug
        const errorText = await response.clone().text()
        console.error('❌ Corpo da resposta de erro:', errorText)
        try {
          const errorJson = JSON.parse(errorText)
          console.error('❌ Erro parseado:', errorJson)
        } catch {
          // Não é JSON, já logamos como texto
        }
      }
      
      const resultado = await handleResponse<Consulta>(response)
      console.log('✅ Consulta criada com sucesso:', resultado)
      return resultado
    } catch (error) {
      console.error('❌ Erro ao criar consulta:', error)
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao criar consulta', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * PUT - Atualiza uma consulta existente
   */
  async atualizar(id: string, dadosConsulta: Partial<ConsultaFormData>): Promise<Consulta> {
    try {
      if (!id) {
        throw new APIError('ID da consulta é obrigatório', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/consultas/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(dadosConsulta),
        },
        TIMEOUT
      )
      return handleResponse<Consulta>(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao atualizar consulta', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * DELETE - Remove uma consulta
   */
  async deletar(id: string): Promise<void> {
    try {
      if (!id) {
        throw new APIError('ID da consulta é obrigatório', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/consultas/${id}`,
        { method: 'DELETE' },
        TIMEOUT
      )
      
      // DELETE pode retornar 204 (No Content) ou 200 com dados
      if (response.status === 204) {
        return
      }
      
      await handleResponse(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao deletar consulta', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },
}

// ==================== SERVIÇOS DE AUTENTICAÇÃO ====================

export const authService = {
  /**
   * POST - Login de paciente
   */
  async loginPaciente(email: string, senha: string): Promise<Usuario> {
    try {
      if (!email || !senha) {
        throw new APIError('Email e senha são obrigatórios', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/pacientes/login`,
        {
          method: 'POST',
          body: JSON.stringify({ email, senha }),
        },
        TIMEOUT
      )

      // Verifica se a resposta é 200 (sucesso) ou 401 (não autorizado)
      if (response.status === 401) {
        throw new APIError('Credenciais inválidas', HttpStatus.UNAUTHORIZED)
      }

      if (!response.ok) {
        throw new APIError('Erro ao fazer login', response.status)
      }

      const data = await handleResponse<Usuario>(response)
      return data
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao fazer login de paciente', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * POST - Login de médico
   */
  async loginMedico(email: string, senha: string): Promise<Usuario> {
    try {
      if (!email || !senha) {
        throw new APIError('Email e senha são obrigatórios', HttpStatus.BAD_REQUEST)
      }

      const response = await fetchWithTimeout(
        `${API_BASE_URL}/medicos/login`,
        {
          method: 'POST',
          body: JSON.stringify({ email, senha }),
        },
        TIMEOUT
      )

      // Verifica se a resposta é 200 (sucesso) ou 401 (não autorizado)
      if (response.status === 401) {
        throw new APIError('Credenciais inválidas', HttpStatus.UNAUTHORIZED)
      }

      if (!response.ok) {
        throw new APIError('Erro ao fazer login', response.status)
      }

      const data = await handleResponse<Usuario>(response)
      return data
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Erro ao fazer login de médico', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  },

  /**
   * POST - Login genérico (paciente ou médico)
   */
  async login(email: string, senha: string, tipo: 'paciente' | 'medico'): Promise<Usuario> {
    if (tipo === 'paciente') {
      return this.loginPaciente(email, senha)
    } else {
      return this.loginMedico(email, senha)
    }
  },
}

// ==================== SERVIÇO PRINCIPAL (Mantém compatibilidade) ====================

export const apiService = {
  // Métodos de autenticação
  async loginPaciente(email: string, senha: string): Promise<Usuario> {
    return authService.loginPaciente(email, senha)
  },

  async loginMedico(email: string, senha: string): Promise<Usuario> {
    return authService.loginMedico(email, senha)
  },

  async login(email: string, senha: string, tipo: 'paciente' | 'medico'): Promise<Usuario> {
    return authService.login(email, senha, tipo)
  },

  // Métodos de usuário (mantém compatibilidade com código existente)
  async buscarUsuarios(): Promise<Usuario[]> {
    return usuarioService.buscarTodos()
  },

  async buscarUsuarioPorCredenciais(
    nomeUsuario: string,
    email: string
  ): Promise<Usuario | null> {
    return usuarioService.buscarPorCredenciais(nomeUsuario, email)
  },

  async verificarDuplicidade(
    nomeUsuario: string,
    email: string
  ): Promise<{ nomeUsuarioExiste: boolean; emailExiste: boolean }> {
    return usuarioService.verificarDuplicidade(nomeUsuario, email)
  },

  async criarUsuario(
    dadosUsuario: Omit<Usuario, 'id'>
  ): Promise<Usuario> {
    return usuarioService.criar(dadosUsuario)
  },

  // Métodos de consulta (mantém compatibilidade com código existente)
  async buscarConsultasPorUsuario(usuarioId: string): Promise<Consulta[]> {
    return consultaService.buscarPorUsuario(usuarioId, 'agendada')
  },

  async buscarTodasConsultas(): Promise<Consulta[]> {
    return consultaService.buscarTodas()
  },
}

