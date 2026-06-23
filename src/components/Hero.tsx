import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/video-aquarela.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(45,74,62,0.6) 0%, rgba(45,74,62,0.3) 50%, rgba(45,74,62,0.7) 100%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
        >
          Você está convidado para o casamento de
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.6 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(4.5rem, 12vw, 8.5rem)',
            fontWeight: 500,
            color: '#ffffff',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
            marginTop: '1rem',
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span>Luisa</span>
          <span style={{ fontStyle: 'italic', fontWeight: 400, fontSize: '0.7em', lineHeight: 1.2 }}>&</span>
          <span>Gabriel</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '1.8rem auto' }}
        >
          <div style={{ width: 100, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          <div style={{ width: 6, height: 6, background: '#ffffff', transform: 'rotate(45deg)' }} />
          <div style={{ width: 100, height: 1, background: 'rgba(255,255,255,0.6)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.3rem, 3vw, 2rem)',
            color: '#ffffff',
            letterSpacing: '0.3em',
            fontWeight: 500,
            textShadow: '0 1px 12px rgba(0,0,0,0.4)',
          }}
        >
          21 · 04 · 2027
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            marginTop: '0.7rem',
            fontWeight: 700,
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}
        >
          Maison Reserva · Salto de Pirapora, SP
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.3 }}
        className="absolute bottom-10 left-1/2 z-10"
        style={{ transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
            <path d="M8 0v22M1 15l7 7 7-7" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
