import { useEffect, useRef } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const pressing = useRef(false)
  const rafId = useRef(null)

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const onMouseDown = () => {
      pressing.current = true
    }

    const onMouseUp = () => {
      pressing.current = false
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      hovering.current = !!target
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      if (target) hovering.current = false
    }

    const animate = () => {
      // Lerp dot (fast follow)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.5
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.5

      // Lerp ring (slower follow, lags behind)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15

      const dot = dotRef.current
      const ring = ringRef.current

      if (dot && ring) {
        const dotScale = pressing.current ? 0.5 : hovering.current ? 0.5 : 1
        const ringScale = pressing.current ? 0.8 : hovering.current ? 1.5 : 1

        dot.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px) scale(${dotScale})`
        ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px) scale(${ringScale})`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--neon-green)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid var(--neon-green)',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default CustomCursor
