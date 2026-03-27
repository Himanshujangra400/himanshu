const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const nodemailer = require('nodemailer')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || ''

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
}

const isSmtpConfigured =
  Boolean(smtpConfig.host) &&
  Boolean(smtpConfig.port) &&
  Boolean(smtpConfig.user) &&
  Boolean(smtpConfig.pass)

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    })
  : null

const contactToEmail = process.env.CONTACT_TO_EMAIL || smtpConfig.user || ''
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || smtpConfig.user || ''

const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const fallbackDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']
const originAllowlist = new Set(allowedOrigins.length ? allowedOrigins : fallbackDevOrigins)

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (curl/postman) and same-origin server calls.
    if (!origin || originAllowlist.has(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Origin not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
}

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages. Please try again in a few minutes.' },
})

app.set('trust proxy', 1)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)
app.use(globalLimiter)
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json({ limit: '16kb' }))

const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const sanitizeText = (value = '') => value.replace(/\s+/g, ' ').trim()
const countLinks = (value = '') => (value.match(/(https?:\/\/|www\.)/gi) || []).length
const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

async function verifyTurnstileToken(token, remoteIp) {
  if (!turnstileSecret) {
    return true
  }

  if (!token) {
    return false
  }

  const params = new URLSearchParams()
  params.append('secret', turnstileSecret)
  params.append('response', token)
  if (remoteIp) {
    params.append('remoteip', remoteIp)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  if (!response.ok) {
    return false
  }

  const result = await response.json()
  return Boolean(result.success)
}

async function notifyContactByEmail({ name, email, message }) {
  if (!transporter || !contactToEmail || !contactFromEmail) {
    return
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)

  await transporter.sendMail({
    to: contactToEmail,
    from: contactFromEmail,
    replyTo: email,
    subject: `New Portfolio Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage.replaceAll('\n', '<br />')}</p>
    `,
  })
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Portfolio backend running' })
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message, website, captchaToken } = req.body || {}

  // Honeypot check: bots tend to fill hidden fields.
  if (website) {
    return res.status(400).json({ success: false, message: 'Spam detected.' })
  }

  const safeName = sanitizeText(name)
  const safeEmail = sanitizeText(email)
  const safeMessage = sanitizeText(message)

  if (!safeName || !safeEmail || !safeMessage) {
    return res.status(400).json({ success: false, message: 'All fields are required.' })
  }

  if (!isEmailValid(safeEmail)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' })
  }

  if (safeName.length < 2 || safeName.length > 80) {
    return res.status(400).json({ success: false, message: 'Name must be between 2 and 80 characters.' })
  }

  if (safeMessage.length < 10 || safeMessage.length > 1500) {
    return res
      .status(400)
      .json({ success: false, message: 'Message must be between 10 and 1500 characters.' })
  }

  if (countLinks(safeMessage) > 2) {
    return res.status(400).json({ success: false, message: 'Message contains too many links.' })
  }

  try {
    const isCaptchaValid = await verifyTurnstileToken(
      sanitizeText(captchaToken),
      req.ip || req.headers['x-forwarded-for'],
    )

    if (!isCaptchaValid) {
      return res.status(400).json({ success: false, message: 'Captcha verification failed.' })
    }
  } catch (error) {
    console.error('Captcha verification error:', error)
    return res.status(503).json({ success: false, message: 'Captcha service unavailable. Please retry.' })
  }

  try {
    await notifyContactByEmail({ name: safeName, email: safeEmail, message: safeMessage })
  } catch (error) {
    console.error('Email notification error:', error)
    return res.status(502).json({ success: false, message: 'Could not deliver message right now.' })
  }

  console.log('New contact request:', { name: safeName, email: safeEmail })

  return res.status(200).json({
    success: true,
    message: 'Thank you! Your message has been received.',
  })
})

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`)
})
