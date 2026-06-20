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
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          background: '#2D4A3E',
          color: '#F5F0EA',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 300,
          width: 'clamp(70px, 16vw, 100px)',
          height: 'clamp(70px, 16vw, 100px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '0.05em',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#6B7563',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="py-20 px-6 flex flex-col items-center gap-12"
      style={{ background: '#F7F4EE' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="section-subtitle">Faltam</span>
        <h2 className="section-title">Contagem Regressiva</h2>
        <div className="diamond-divider"><span /></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex gap-4 sm:gap-8 flex-wrap justify-center"
      >
        <Unit value={time.days} label="Dias" />
        <div style={{ alignSelf: 'center', marginBottom: 24, color: '#C4A882', fontSize: '1.5rem', fontFamily: 'Cormorant Garamond' }}>·</div>
        <Unit value={time.hours} label="Horas" />
        <div style={{ alignSelf: 'center', marginBottom: 24, color: '#C4A882', fontSize: '1.5rem', fontFamily: 'Cormorant Garamond' }}>·</div>
        <Unit value={time.minutes} label="Minutos" />
        <div style={{ alignSelf: 'center', marginBottom: 24, color: '#C4A882', fontSize: '1.5rem', fontFamily: 'Cormorant Garamond' }}>·</div>
        <Unit value={time.seconds} label="Segundos" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: '#6B7563',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        até o dia mais feliz das nossas vidas
      </motion.p>
    </section>
  )
}
