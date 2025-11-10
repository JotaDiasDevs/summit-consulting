import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { consultaService } from '../../services/api/apiService'
import type { Consulta, StatusConsulta } from '../../types/common'
import { APIError } from '../../services/api/apiHelpers'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const ConsultaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [consulta, setConsulta] = useState<Consulta | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregarConsulta = async () => {
      if (!id) {
        setErro('ID da consulta não fornecido')
        setCarregando(false)
        return
      }

      try {
        setCarregando(true)
        setErro('')
        const dadosConsulta = await consultaService.buscarPorId(id)
        setConsulta(dadosConsulta)
      } catch (error) {
        console.error('Erro ao carregar consulta:', error)
        if (error instanceof APIError) {
          setErro(error.message || 'Erro ao carregar consulta')
        } else {
          setErro('Erro ao carregar dados da consulta')
        }
      } finally {
        setCarregando(false)
      }
    }

    carregarConsulta()
  }, [id])

  if (carregando) {
    return <LoadingSpinner />
  }

  if (erro || !consulta) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Erro ao carregar consulta</h2>
          <p className="text-red-700 mb-4">{erro || 'Consulta não encontrada'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: StatusConsulta) => {
    switch (status) {
      case 'agendada':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'realizada':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  const formatarData = (data: string) => {
    try {
      const date = new Date(data + 'T00:00:00')
      const dia = date.getDate().toString().padStart(2, '0')
      const mes = (date.getMonth() + 1).toString().padStart(2, '0')
      const ano = date.getFullYear()
      return `${dia}/${mes}/${ano}`
    } catch {
      return data
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="text-green-600 hover:text-green-700 font-semibold mb-4 inline-block"
        >
          ← Voltar ao Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📅 Detalhes da Consulta</h1>
          <span className={`px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(consulta.status)}`}>
            {consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">ID</h3>
            <p className="text-xl font-bold text-gray-800">{consulta.id}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">DATA</h3>
            <p className="text-xl font-bold text-gray-800">{formatarData(consulta.data)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">HORÁRIO</h3>
            <p className="text-xl font-bold text-gray-800">{consulta.horario}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">ESPECIALIDADE</h3>
            <p className="text-xl font-bold text-gray-800">{consulta.especialidade}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">ESPECIALISTA</h3>
            <p className="text-xl font-bold text-gray-800">{consulta.especialista}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">LOCAL</h3>
            <p className="text-xl font-bold text-gray-800">{consulta.local}</p>
          </div>

          {consulta.observacoes && (
            <div className="bg-gray-50 rounded-lg p-6 md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">OBSERVAÇÕES</h3>
              <p className="text-lg text-gray-800">{consulta.observacoes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConsultaDetalhes

