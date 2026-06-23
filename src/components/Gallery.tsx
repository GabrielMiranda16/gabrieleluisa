import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const placeholders = Array.from({ length: 6 }, (_, i) => i)

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)

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
        const scale = 1 - ratio * 0.18
        const opacity = 1 - ratio * 0.55
        card.style.transform = `scale(${scale})`
        card.style.opacity = `${opacity}`
      })
    }

    container.addEventListener('scroll', updateScale, { passive: true })
    updateScale()
    return () => container.removeEventListener('scroll', updateScale)
  }, [])

  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Cabeçalho */}
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

      {/* Carrossel */}
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: 20,
          paddingLeft: 'calc(50vw - 140px)',
          paddingRight: 'calc(50vw - 140px)',
          paddingBottom: 16,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          alignItems: 'center',
        }}
      >
        {placeholders.map((i) => (
          <div
            key={i}
            className="gallery-card"
            style={{
              flexShrink: 0,
              width: 280,
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
    </section>
  )
}
