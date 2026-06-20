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

      {/* Overlay bokeh-style */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(45,74,62,0.35) 0%, rgba(45,74,62,0.15) 40%, rgba(45,74,62,0.5) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#C9A86C',
          }}
        >
          Você está convidado para o casamento de
        </motion.p>

        {/* Nomes em Alex Brush */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.6 }}
          style={{
            fontFamily: 'Alex Brush, cursive',
            fontSize: 'clamp(4rem, 14vw, 9rem)',
            fontWeight: 400,
            color: '#F5F0EA',
            lineHeight: 1,
            marginTop: '0.5rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
          }}
        >
          Gabriel & Luisa
        </motion.h1>

        {/* Divisor diamante */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="diamond-divider my-5"
        >
          <span />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: '#F5F0EA',
            letterSpacing: '0.3em',
            fontWeight: 300,
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
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,234,0.65)',
            marginTop: '0.6rem',
          }}
        >
          Maison Reserva · Salto de Pirapora, SP
        </motion.p>

        {/* Seta scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <path d="M7 0v18M1 12l6 6 6-6" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
