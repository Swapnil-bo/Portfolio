import { useState, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/reducedMotion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789░▒▓█▀▄@#$%'

export function useTextScramble(text, isInView) {
  const [displayed, setDisplayed] = useState(text)
  const hasPlayed = useRef(false)

  useEffect(() => {
    if (!isInView || hasPlayed.current) return
    hasPlayed.current = true

    if (prefersReducedMotion()) {
      setDisplayed(text)
      return
    }

    const duration = 600
    const length = text.length
    const startTime = performance.now()

    const scramble = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Characters resolve left to right
      const resolvedCount = Math.floor(progress * length)

      let result = ''
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount) {
          result += text[i]
        } else if (text[i] === ' ') {
          result += ' '
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      setDisplayed(result)

      if (progress < 1) {
        requestAnimationFrame(scramble)
      } else {
        setDisplayed(text)
      }
    }

    requestAnimationFrame(scramble)
  }, [isInView, text])

  return displayed
}
