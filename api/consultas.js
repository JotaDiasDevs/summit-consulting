const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
  const dbPath = path.join(process.cwd(), 'db.json')
  let db = { consultas: [] }
  try {
    const raw = fs.readFileSync(dbPath, 'utf8')
    db = JSON.parse(raw)
  } catch (e) {
    // ignore
  }

  if (req.method === 'GET') {
    const { usuarioId, status } = req.query || {}
    let results = db.consultas || []
    if (usuarioId) results = results.filter((c) => String(c.usuarioId) === String(usuarioId))
    if (status) results = results.filter((c) => c.status === status)
    res.status(200).json(results)
    return
  }

  res.setHeader('Allow', 'GET')
  res.status(405).end()
}
