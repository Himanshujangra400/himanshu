import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AnimatedSection from '../components/animations/AnimatedSection'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { profile } from '../data/portfolioData'

function ContactPage() {
  const shouldReduceMotion = useReducedMotion()
  const MotionDiv = motion.div
  const MotionAside = motion.aside
  const MotionForm = motion.form
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '', captchaToken: '' })
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('idle')
  const [loading, setLoading] = useState(false)
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
  const whatsappUrl = `https://wa.me/${profile.whatsappNumber}`
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)

  const inputClass =
    'rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none ring-teal-500 transition focus:ring-2'

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardFadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) {
      return
    }

    const renderWidget = () => {
      if (!window.turnstile || widgetIdRef.current !== null || !turnstileRef.current) {
        return
      }

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback(token) {
          setForm((prev) => ({ ...prev, captchaToken: token }))
        },
        'expired-callback'() {
          setForm((prev) => ({ ...prev, captchaToken: '' }))
        },
        'error-callback'() {
          setForm((prev) => ({ ...prev, captchaToken: '' }))
        },
      })
    }

    if (window.turnstile) {
      renderWidget()
      return
    }

    const existingScript = document.querySelector('script[data-turnstile="true"]')
    if (existingScript) {
      existingScript.addEventListener('load', renderWidget)
      return () => {
        existingScript.removeEventListener('load', renderWidget)
      }
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.dataset.turnstile = 'true'
    script.addEventListener('load', renderWidget)
    document.head.appendChild(script)

    return () => {
      script.removeEventListener('load', renderWidget)
    }
  }, [turnstileSiteKey])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (turnstileSiteKey && !form.captchaToken) {
      setStatus('Please complete captcha verification first.')
      setStatusType('error')
      return
    }

    setLoading(true)
    setStatus('')
    setStatusType('idle')

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('Message sent successfully. I will contact you soon.')
      setStatusType('success')
      setForm({ name: '', email: '', message: '', website: '', captchaToken: '' })
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } catch {
      setStatus('Message could not be sent. Start backend and try again.')
      setStatusType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedSection className="panel panel-contrast rounded-3xl p-6 sm:p-10">
      <p className="section-kicker">Strong Call To Action</p>
      <h2 className="section-title">Have a Product Idea That Needs Real Execution?</h2>
      <p className="mt-3 max-w-3xl text-slate-700">
        If you need someone who can own frontend, backend, and shipping discipline, I am ready to collaborate.
      </p>

      <MotionDiv
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]"
        variants={staggerContainer}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'show'}
        viewport={{ once: true, amount: 0.25 }}
      >
        <MotionAside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Direct Reach</p>
          <a href={`mailto:${profile.email}`} className="animated-link block font-semibold text-slate-800 hover:text-teal-700">
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="animated-link block font-semibold text-slate-800 hover:text-teal-700">
            {profile.phone}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-sm font-semibold text-green-800 hover:border-green-500 hover:bg-green-100">
            <WhatsAppIcon />
            <span>Message on WhatsApp</span>
          </a>
          <p className="pt-2 text-sm text-slate-600">Preferred response window: within 24 hours.</p>
        </MotionAside>

        <MotionForm onSubmit={handleSubmit} className="grid gap-4" variants={cardFadeUp}>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <textarea
            name="message"
            placeholder="Share your project goal, deadline, and key challenge"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className={inputClass}
          />
          {turnstileSiteKey ? <div ref={turnstileRef} className="turnstile-wrap" /> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-fit rounded-xl btn-accent px-6 py-3 font-semibold text-white disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Send Project Brief'}
          </button>
        </MotionForm>
      </MotionDiv>

      {status ? (
        <p className={`mt-4 font-medium ${statusType === 'success' ? 'text-teal-800' : 'text-rose-700'}`}>
          {status}
        </p>
      ) : null}
    </AnimatedSection>
  )
}

export default ContactPage
