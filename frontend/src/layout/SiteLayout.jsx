import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/portfolioData'
import WhatsAppIcon from '../components/WhatsAppIcon'

function SiteLayout() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const MotionHeader = motion.header
  const MotionDiv = motion.div
  const MotionSpan = motion.span
  const MotionButton = motion.button
  const MotionNav = motion.nav
  const whatsappUrl = `https://wa.me/${profile.whatsappNumber}`
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const shouldAnimate = !shouldReduceMotion && !isMobileViewport

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
    { to: '/resume', label: 'Resume' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = (event) => {
      setIsMobileViewport(event.matches)
      if (!event.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange)
    } else {
      media.addListener(onChange)
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onChange)
      } else {
        media.removeListener(onChange)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="app-bg-orb app-bg-orb-one" />
        <div className="app-bg-orb app-bg-orb-two" />
      </div>

      <MotionHeader
        className={`site-header panel sticky top-4 z-30 mb-8 rounded-2xl px-4 py-3 ${isScrolled ? 'site-header-scrolled' : ''}`}
        animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
        initial={shouldAnimate ? { y: -18, opacity: 0 } : undefined}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-500">{profile.title}</p>
            <p className="font-heading text-lg text-slate-900">{profile.name}</p>
          </div>

          <nav className="hidden flex-wrap gap-2 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-pill group relative overflow-hidden ${isActive ? 'nav-pill-active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    {isActive ? (
                      <MotionSpan
                        layoutId="active-nav-pill"
                        className="nav-pill-highlight"
                        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.38 }}
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <MotionButton
            type="button"
            className="mobile-menu-button nav-pill inline-flex items-center justify-center md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            whileTap={shouldAnimate ? { scale: 0.96 } : undefined}
          >
            <span className="sr-only">Toggle menu</span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-top-open' : ''}`} />
            <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-middle-open' : ''}`} />
            <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-bottom-open' : ''}`} />
          </MotionButton>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <MotionNav
              key="mobile-nav"
              className="mt-3 grid gap-2 border-t border-slate-200 pt-3 md:hidden"
              initial={shouldAnimate ? { opacity: 0, y: -8 } : undefined}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              exit={shouldAnimate ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item) => (
                <NavLink
                  key={`mobile-${item.to}`}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `mobile-nav-link nav-pill ${isActive ? 'nav-pill-active mobile-nav-link-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </MotionNav>
          ) : null}
        </AnimatePresence>
      </MotionHeader>

      <main className="space-y-8">
        <AnimatePresence mode="wait" initial={false}>
          <MotionDiv
            key={location.pathname}
            initial={shouldAnimate ? { opacity: 0, y: 12 } : undefined}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            exit={shouldAnimate ? { opacity: 0, y: -8 } : undefined}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </MotionDiv>
        </AnimatePresence>
      </main>

      <footer className="panel mt-8 rounded-2xl px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-800">{profile.name} • Full Stack Developer</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="animated-link footer-contact-link rounded-full bg-white px-3 py-1 font-semibold hover:text-teal-700">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="animated-link footer-contact-link rounded-full bg-white px-3 py-1 font-semibold hover:text-teal-700">
              {profile.phone}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800 hover:bg-emerald-100">
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
