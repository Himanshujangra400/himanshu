const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Portfolio backend running' })
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' })
  }

  // Placeholder for DB/email integration.
  console.log('New contact request:', { name, email, message })

  return res.status(200).json({
    success: true,
    message: 'Thank you! Your message has been received.',
  })
})

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`)
})
