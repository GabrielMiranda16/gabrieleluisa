import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const placeholders = Array.from({ length: 6 }, (_, i) => i)
const CARD_WIDTH = 280
const CARD_GAP = 20
const AUTOPLAY_INTERVAL = 3000
const RESUME_DELAY = 4000

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)
  const hasDragged = useRef(false)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentIndex = useRef(0)

  const scrollToIndex = (index: number) => {
    const container = containerRef.current
    if (!container) return
    const paddingLeft = (container.offsetWidth / 2) - (CARD_WIDTH / 2)
    const target = index * (CARD_WIDTH + CARD_GAP) - paddingLeft + (container.offsetWidth / 2) - (CARD_WIDTH / 2)
    container.scrollTo({ left: index * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' })
    currentIndex.current = index
  }

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      const next = (currentIndex.current + 1) % placeholders.length
      scrollToIndex(next)
    }, AUTOPLAY_INTERVAL)
  }

  const pauseAutoplay = () => {
    if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null }
    if (resumeRef.current) clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(startAutoplay, RESUME_DELAY)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      const containerCenter = container.scrollLeft + container.offsetWidth / 2
      const cards = container.querySelectorAll<HTMLElement>('.gallery-card')
      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(containerCenter - cardCenter)
        const maxDistance = container.offsetWidth * 0.6
        const ratio = Math.min(distance / maxDistance, 1)
        card.style.transform = `scale(${1 - ratio * 0.18})`
        card.style.opacity = `${1 - ratio * 0.55}`
      })

      // Track current index from scroll position
      currentIndex.current = Math.round(container.scrollLeft / (CARD_WIDTH + CARD_GAP))
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      hasDragged.current = false
      dragStartX.current = e.pageX
      scrollStartX.current = container.scrollLeft
      container.style.cursor = 'grabbing'
      container.style.scrollSnapType = 'none'
      pauseAutoplay()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const dx = e.pageX - dragStartX.current
      if (Math.abs(dx) > 4) hasDragged.current = true
      container.scrollLeft = scrollStartX.current - dx
    }

    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      container.style.cursor = 'grab'
      container.style.scrollSnapType = 'x mandatory'
    }

    const onTouchStart = () => pauseAutoplay()

    container.addEventListener('scroll', updateScale, { passive: true })
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    updateScale()

    startAutoplay()

    return () => {
      container.removeEventListener('scroll', updateScale)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      if (resumeRef.current) clearTimeout(resumeRef.current)
    }
  }, [])

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
      if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null }
    } else {
      document.body.style.overflow = ''
      startAutoplay()
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 56, textAlign: 'center', padding: '0 1.5rem' }}
      >
        <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C', fontWeight: 500 }}>
          Nossos momentos
        </span>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.04em' }}>
          Galeria
        </h2>
        <div className="diamond-divider"><span /></div>
      </motion.div>

      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: CARD_GAP,
          paddingLeft: 'calc(50vw - 140px)',
          paddingRight: 'calc(50vw - 140px)',
          paddingBottom: 16,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          alignItems: 'center',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {placeholders.map((i) => (
          <div
            key={i}
            className="gallery-card"
            onClick={() => { if (!hasDragged.current) setLightbox(i) }}
            style={{
              flexShrink: 0,
              width: CARD_WIDTH,
              height: 380,
              scrollSnapAlign: 'center',
              background: 'rgba(245,240,234,0.06)',
              border: '1px solid rgba(201,168,108,0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              willChange: 'transform, opacity',
              cursor: 'grab',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="5" width="24" height="18" rx="2" stroke="rgba(201,168,108,0.35)" strokeWidth="1" />
              <circle cx="18" cy="10" r="2" stroke="rgba(201,168,108,0.35)" strokeWidth="1" />
              <path d="M2 18L8 13L13 17L18 12L26 19" stroke="rgba(201,168,108,0.35)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.25)' }}>
              Em breve
            </span>
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ textAlign: 'center', marginTop: 32, fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(245,240,234,0.4)', padding: '0 1.5rem' }}
      >
        As fotos do nosso ensaio serão adicionadas em breve...
      </motion.p>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(28,52,40,0.96)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(90vw, 560px)',
                aspectRatio: '3/4',
                background: 'rgba(245,240,234,0.06)',
                border: '1px solid rgba(201,168,108,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="5" width="24" height="18" rx="2" stroke="rgba(201,168,108,0.4)" strokeWidth="1" />
                <circle cx="18" cy="10" r="2" stroke="rgba(201,168,108,0.4)" strokeWidth="1" />
                <path d="M2 18L8 13L13 17L18 12L26 19" stroke="rgba(201,168,108,0.4)" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.3)' }}>
                Em breve
              </span>
            </motion.div>

            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(245,240,234,0.6)',
                fontSize: '1.5rem',
                lineHeight: 1,
                padding: 8,
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
