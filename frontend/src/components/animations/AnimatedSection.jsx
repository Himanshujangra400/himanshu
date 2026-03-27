import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function AnimatedSection({ className = '', children, delay = 0, amount = 0.22 }) {
  const shouldReduceMotion = useReducedMotion()
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const MotionSection = motion.section
  const shouldAnimate = !shouldReduceMotion && !isMobileViewport

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = (event) => {
      setIsMobileViewport(event.matches)
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

  if (!shouldAnimate) {
    return <section className={className}>{children}</section>
  }

  return (
    <MotionSection
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionSection>
  )
}

export default AnimatedSection
