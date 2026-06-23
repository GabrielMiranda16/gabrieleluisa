import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
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
    </div>
  )
}

const dot = (
  <div style={{ alignSelf: 'center', marginBottom: 28, color: '#C9A86C', fontSize: '2rem', fontFamily: 'Cormorant Garamond' }}>·</div>
)

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{ background: '#F5F0EA', padding: '6rem 1.5rem 10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56 }}>

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: 'flex', gap: 'clamp(4px, 2vw, 32px)', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center' }}
      >
        <Unit value={time.days} label="Dias" />
        {dot}
        <Unit value={time.hours} label="Horas" />
        {dot}
        <Unit value={time.minutes} label="Minutos" />
        {dot}
        <Unit value={time.seconds} label="Segundos" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', color: '#6B7563', fontStyle: 'italic', textAlign: 'center', fontWeight: 400 }}
      >
        até o dia mais feliz das nossas vidas
      </motion.p>
    </section>
  )
}
