import { useEffect, useRef } from 'react'

function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let rafId = 0

    const update = () => {
      rafId = 0
      const bar = barRef.current
      if (!bar) return
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      bar.style.width = `${pct}%`
    }

    const handleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    // Prime initial width (page might load scrolled)
    update()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] z-[10000]"
      style={{
        width: '0%',
        background: 'var(--neon-green)',
        boxShadow: '0 0 8px rgba(0,255,136,0.4)',
      }}
      aria-hidden="true"
    />
  )
}

export default ScrollProgress
