import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

function TypewriterText({ text, className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const safeText = useMemo(() => text || '', [text])
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const shouldType = !shouldReduceMotion && !isMobileViewport
  const [typedText, setTypedText] = useState(() => (shouldType ? '' : safeText))

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

  useEffect(() => {
    if (!shouldType) {
      return
    }

    let frame = null
    let timeout = null
    let index = 0

    const typeNext = () => {
      setTypedText(safeText.slice(0, index + 1))
      index += 1

      if (index < safeText.length) {
        timeout = setTimeout(() => {
          frame = requestAnimationFrame(typeNext)
        }, 36)
      }
    }

    frame = requestAnimationFrame(typeNext)

    return () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [safeText, shouldType])

  return (
    <span className={className}>
      {shouldType ? typedText : safeText}
      {shouldType ? <span className="type-cursor" aria-hidden="true">|</span> : null}
    </span>
  )
}

export default TypewriterText
