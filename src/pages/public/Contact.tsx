import React from 'react'
import { useForm } from 'react-hook-form'
import type { ContactFormData } from '../../types/common'

const Contact: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ContactFormData>()
  const [sucesso, setSucesso] = React.useState(false)

  const onSubmit = (data: ContactFormData) => {
    console.log('Formulário enviado:', data)
    setSucesso(true)
    reset()
    setTimeout(() => setSucesso(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">✉️ Entre em Contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div className="bg-white rounded-lg shadow p-8">
          {sucesso && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              ✅ Mensagem enviada com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nome</label>
              <input
                {...register('nome', { required: true })}
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                {...register('email', { required: true })}
                type="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Telefone</label>
              <input
                {...register('telefone')}
                type="tel"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mensagem</label>
              <textarea
                {...register('mensagem', { required: true })}
                rows={5}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        
        <div>
          <div className="bg-green-50 rounded-lg p-8 mb-6">
            <h3 className="text-xl font-bold mb-2">📧 Email</h3>
            <p className="text-gray-600">contato@summitconsulting.com</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 mb-6">
            <h3 className="text-xl font-bold mb-2">📱 Telefone</h3>
            <p className="text-gray-600">(11) 98459-3366</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-2">📍 Endereço</h3>
            <p className="text-gray-600">São Paulo, SP - Brasil</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

