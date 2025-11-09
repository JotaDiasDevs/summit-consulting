const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const dbPath = path.join(process.cwd(), 'db.json')
  let db = { usuarios: [], consultas: [] }
  try {
    const raw = fs.readFileSync(dbPath, 'utf8')
    db = JSON.parse(raw)
  } catch (e) {
    // ignore, use defaults
  }

  if (req.method === 'GET') {
    res.status(200).json(db.usuarios || [])
    return
  }

  if (req.method === 'POST') {
    // Ler corpo da requisição (Vercel fornece req.body quando Content-Type JSON,
    // mas lidamos com ambos os casos para robustez)
    const getBody = () => {
      if (req.body) return Promise.resolve(req.body)
      return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            resolve(JSON.parse(body || '{}'))
          } catch (err) {
            reject(err)
          }
        })
        req.on('error', reject)
      })
    }

    try {
      const data = await getBody()
      const id = String(Date.now())
      const novoUsuario = { id, ...data }
      // Nota: não persistimos em disco (filesystem do ambiente serverless é efêmero/
      // provavelmente somente leitura em produção). Retornamos o usuário criado para
      // que o front-end possa seguir o fluxo (login imediato após cadastro).
      res.status(201).json(novoUsuario)
    } catch (err) {
      res.status(400).json({ message: 'Corpo inválido' })
    }
    return
  }

  res.setHeader('Allow', 'GET,POST')
  res.status(405).end()
}
