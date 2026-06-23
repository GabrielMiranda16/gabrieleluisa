import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEDDING_DATE = new Date('2027-04-21T12:00:00')

function getTimeLeft() {
  const now = new Date()
  const diff = WEDDING_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label, visible }: { value: number; label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <div style={{
            background: '#2D4A3E',
            color: '#F5F0EA',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 6vw, 4.5rem)',
            fontWeight: 500,
            width: 'clamp(60px, 18vw, 120px)',
            height: 'clamp(60px, 18vw, 120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.05em',
            lineHeight: 1,
            paddingBottom: '14px',
          }}>
            {String(value).padStart(2, '0')}
          </div>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase' as const,
            color: '#6B7563',
            fontWeight: 500,
          }}>
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const dot = (
  <div style={{ alignSelf: 'center', marginBottom: 28, color: '#C9A86C', fontSize: '2rem', fontFamily: 'Cormorant Garamond' }}>·</div>
)

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const [visibleCount, setVisibleCount] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const hasPlayed = useRef(false)
  const isLocked = useRef(false)
  const scrollAccum = useRef(0)
  const STEP = 80

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onWheel = (e: WheelEvent) => {
      if (hasPlayed.current) return
      if (!isLocked.current) return

      e.preventDefault()
      scrollAccum.current += Math.abs(e.deltaY)

      const step = Math.floor(scrollAccum.current / STEP)
      const next = Math.min(step + 1, 4)
      setVisibleCount(prev => {
        if (next > prev) return next
        return prev
      })

      if (scrollAccum.current >= STEP * 4) {
        hasPlayed.current = true
        isLocked.current = false
        setVisibleCount(4)
      }
    }

    const onScroll = () => {
      if (hasPlayed.current) return
      const rect = section.getBoundingClientRect()
      if (rect.top <= 80 && rect.bottom > window.innerHeight / 2) {
        if (!isLocked.current && !hasPlayed.current) {
          isLocked.current = true
          scrollAccum.current = 0
        }
      } else {
        if (!hasPlayed.current) isLocked.current = false
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  // Touch support
  useEffect(() => {
    if (hasPlayed.current) return
    let touchStartY = 0
    let touchAccum = 0

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isLocked.current || hasPlayed.current) return
      e.preventDefault()
      const delta = touchStartY - e.touches[0].clientY
      touchAccum += delta
      touchStartY = e.touches[0].clientY

      const step = Math.floor(Math.abs(touchAccum) / STEP)
      const next = Math.min(step + 1, 4)
      setVisibleCount(prev => next > prev ? next : prev)

      if (Math.abs(touchAccum) >= STEP * 4) {
        hasPlayed.current = true
        isLocked.current = false
        setVisibleCount(4)
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const units = [
    { value: time.days, label: 'Dias' },
    { value: time.hours, label: 'Horas' },
    { value: time.minutes, label: 'Minutos' },
    { value: time.seconds, label: 'Segundos' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F5F0EA', padding: '6rem 1.5rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 56 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}
      >
        <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A7A65', fontWeight: 500 }}>
          Faltam
        </span>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.04em' }}>
          Contagem Regressiva
        </h2>
        <div className="diamond-divider"><span /></div>
      </motion.div>

      <div style={{ display: 'flex', gap: 'clamp(4px, 2vw, 32px)', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
        {units.map((u, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 2vw, 32px)' }}>
            <Unit value={u.value} label={u.label} visible={hasPlayed.current || visibleCount > i} />
            {i < 3 && (hasPlayed.current || visibleCount > i) && dot}
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: hasPlayed.current || visibleCount >= 4 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', color: '#6B7563', fontStyle: 'italic', textAlign: 'center', fontWeight: 400 }}
      >
        até o dia mais feliz das nossas vidas
      </motion.p>
    </section>
  )
}
