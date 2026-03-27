import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

function TiltCard({ className = '', children, maxTilt = 7 }) {
  const shouldReduceMotion = useReducedMotion()
  const [isFinePointer, setIsFinePointer] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : true,
  )
  const MotionArticle = motion.article
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, { stiffness: 220, damping: 22, mass: 0.5 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.5 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')

    const onChange = (event) => {
      setIsFinePointer(event.matches)
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

  const handleMouseMove = (event) => {
    if (shouldReduceMotion || !isFinePointer) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const percentX = (event.clientX - bounds.left) / bounds.width
    const percentY = (event.clientY - bounds.top) / bounds.height

    rotateY.set((percentX - 0.5) * maxTilt * 2)
    rotateX.set((0.5 - percentY) * maxTilt * 2)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  if (shouldReduceMotion || !isFinePointer) {
    return <article className={className}>{children}</article>
  }

  return (
    <MotionArticle
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionArticle>
  )
}

export default TiltCard
