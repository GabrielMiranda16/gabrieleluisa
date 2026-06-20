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
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/video-aquarela.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay verde escuro */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(45,74,62,0.45) 0%, rgba(45,74,62,0.25) 50%, rgba(45,74,62,0.55) 100%)' }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C4A882',
          }}
        >
          Você está convidado para
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 300,
            color: '#F7F4EE',
            letterSpacing: '0.05em',
            lineHeight: 1.05,
            marginTop: '1rem',
          }}
        >
          Gabriel
          <span style={{ color: '#C4A882', fontStyle: 'italic' }}> & </span>
          Luisa
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ width: 60, height: 1, background: '#C4A882', margin: '1.5rem auto' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#F7F4EE',
            letterSpacing: '0.25em',
            fontWeight: 300,
          }}
        >
          21 · 04 · 2027
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(247,244,238,0.7)',
            marginTop: '0.5rem',
          }}
        >
          Maison Reserva · Salto de Pirapora
        </motion.p>

        {/* Seta de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,244,238,0.6)', fontFamily: 'Montserrat' }}>
              Scroll
            </span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 0v20M1 13l7 7 7-7" stroke="#C4A882" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
