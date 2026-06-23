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

function lockScroll() {
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  const top = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
  window.scrollTo(0, parseInt(top || '0') * -1)
}

const UNITS = ['Dias', 'Horas', 'Minutos', 'Segundos']

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const [visibleUnits, setVisibleUnits] = useState([false, false, false, false])
  const [centerReveal, setCenterReveal] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const revealedCount = useRef(0)
  const isRevealing = useRef(false)
  const locked = useRef(false)
  const scrollAccum = useRef(0)
  const SCROLL_PER_UNIT = 80

  const revealNext = () => {
    if (isRevealing.current) return
    if (revealedCount.current >= 4) return

    const index = revealedCount.current
    isRevealing.current = true
    revealedCount.current += 1

    setCenterReveal(index)

    setTimeout(() => {
      setVisibleUnits(prev => {
        const next = [...prev]
        next[index] = true
        return next
      })
    }, 450)

    setTimeout(() => {
      setCenterReveal(null)
      isRevealing.current = false

      if (revealedCount.current >= 4) {
        setTimeout(() => {
          unlockScroll()
          setDone(true)
        }, 300)
      }
    }, 900)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      if (locked.current || hasPlayed.current) return
      const rect = section.getBoundingClientRect()
      if (rect.top <= 10 && rect.top >= -80) {
        locked.current = true
        lockScroll()
        scrollAccum.current = 0
        window.removeEventListener('scroll', onScroll)
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (!locked.current || hasPlayed.current) return
      e.preventDefault()
      scrollAccum.current += Math.abs(e.deltaY)
      const shouldReveal = Math.floor(scrollAccum.current / SCROLL_PER_UNIT)
      if (shouldReveal > revealedCount.current - (isRevealing.current ? 1 : 0)) {
        revealNext()
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (!locked.current || hasPlayed.current) return
      e.preventDefault()
      const delta = touchStartY - e.touches[0].clientY
      if (delta > 20) {
        touchStartY = e.touches[0].clientY
        scrollAccum.current += Math.abs(delta)
        const shouldReveal = Math.floor(scrollAccum.current / SCROLL_PER_UNIT)
        if (shouldReveal > revealedCount.current - (isRevealing.current ? 1 : 0)) {
          revealNext()
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const values = [time.days, time.hours, time.minutes, time.seconds]

  const dot = (
    <div style={{ alignSelf: 'center', marginBottom: 28, color: '#C9A86C', fontSize: '2rem', fontFamily: 'Cormorant Garamond' }}>·</div>
  )

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

      {/* Unidades na grade */}
      <div style={{ display: 'flex', gap: 'clamp(4px, 2vw, 32px)', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
        {values.map((val, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 2vw, 32px)' }}>
            <AnimatePresence>
              {visibleUnits[i] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
                >
                  <div style={{
                    background: '#2D4A3E', color: '#F5F0EA',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.8rem, 6vw, 4.5rem)',
                    fontWeight: 500,
                    width: 'clamp(60px, 18vw, 120px)',
                    height: 'clamp(60px, 18vw, 120px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    letterSpacing: '0.05em', lineHeight: 1, paddingBottom: '14px',
                  }}>
                    {String(val).padStart(2, '0')}
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B7563', fontWeight: 500 }}>
                    {UNITS[i]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            {i < 3 && visibleUnits[i] && dot}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {(done || visibleUnits[3]) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', color: '#6B7563', fontStyle: 'italic', textAlign: 'center', fontWeight: 400 }}
          >
            até o dia mais feliz das nossas vidas
          </motion.p>
        )}
      </AnimatePresence>

      {/* Reveal central — número aparece grande no meio da tela */}
      <AnimatePresence>
        {centerReveal !== null && (
          <motion.div
            key={centerReveal}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4, y: 40 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              background: 'rgba(245,240,234,0.15)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}>
              <div style={{
                background: '#2D4A3E',
                color: '#F5F0EA',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(5rem, 20vw, 12rem)',
                fontWeight: 500,
                width: 'clamp(180px, 40vw, 320px)',
                height: 'clamp(180px, 40vw, 320px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.05em',
                lineHeight: 1,
                paddingBottom: '20px',
              }}>
                {String(values[centerReveal]).padStart(2, '0')}
              </div>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#2D4A3E',
                fontWeight: 700,
              }}>
                {UNITS[centerReveal]}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
