import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false,
  )
  const CursorDot = motion.div
  const CursorRing = motion.div

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.2 })
  const ringY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.2 })

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const media = window.matchMedia('(pointer: fine)')
    const onPointerMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onChange = (event) => {
      setEnabled(event.matches)
    }

    window.addEventListener('pointermove', onPointerMove)
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange)
    } else {
      media.addListener(onChange)
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onChange)
      } else {
        media.removeListener(onChange)
      }
    }
  }, [shouldReduceMotion, x, y])

  if (!enabled || shouldReduceMotion) {
    return null
  }

  return (
    <>
      <CursorDot
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{ x, y }}
      />
      <CursorRing
        aria-hidden="true"
        className="custom-cursor-ring"
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}

export default CustomCursor
