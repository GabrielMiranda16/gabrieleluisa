import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnvelopeOpeningProps {
  onOpen: () => void
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle')

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => {
      setPhase('done')
      setTimeout(onOpen, 600)
    }, 1800)
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#2D4A3E' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Partículas de fundo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1 + 'px',
                  height: Math.random() * 4 + 1 + 'px',
                  background: '#C4A882',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: 0.3,
                }}
                animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>

          {/* Envelope */}
          <div className="relative flex flex-col items-center" style={{ perspective: '1000px' }}>

            {/* Texto acima */}
            <motion.p
              className="mb-8 text-center"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#C4A882',
              }}
              animate={phase === 'opening' ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {phase === 'idle' ? 'Toque para abrir seu convite' : ''}
            </motion.p>

            {/* Corpo do envelope */}
            <motion.div
              onClick={handleClick}
              className="relative cursor-pointer"
              style={{ width: 320, height: 220 }}
              whileHover={phase === 'idle' ? { scale: 1.03 } : {}}
              whileTap={phase === 'idle' ? { scale: 0.98 } : {}}
            >
              {/* Sombra */}
              <motion.div
                className="absolute inset-0 rounded-sm"
                style={{ background: 'rgba(0,0,0,0.3)', filter: 'blur(16px)', transform: 'translateY(8px)' }}
                animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
              />

              {/* Envelope body */}
              <div
                className="absolute inset-0 rounded-sm overflow-hidden"
                style={{ background: '#F7F4EE' }}
              >
                {/* Losango inferior (fundo) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="none">
                  <polygon points="0,220 160,130 320,220" fill="#E8E4DB" />
                  <polygon points="0,0 160,90 0,220" fill="#EDE9E1" />
                  <polygon points="320,0 160,90 320,220" fill="#E8E4DB" />
                </svg>

                {/* Lacre central */}
                <div
                  className="absolute flex items-center justify-center rounded-full z-10"
                  style={{
                    width: 52,
                    height: 52,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#2D4A3E',
                    boxShadow: '0 2px 12px rgba(45,74,62,0.4)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1rem',
                      color: '#C4A882',
                      letterSpacing: '0.05em',
                      fontWeight: 300,
                    }}
                  >
                    G&L
                  </span>
                </div>
              </div>

              {/* Tampa (flap) */}
              <motion.div
                className="absolute left-0 right-0 top-0 origin-top"
                style={{ height: 110, zIndex: 20 }}
                animate={phase === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <svg width="320" height="110" viewBox="0 0 320 110" preserveAspectRatio="none">
                  <polygon points="0,0 320,0 160,110" fill="#EDE9E1" />
                  <polygon points="0,0 320,0 160,110" fill="none" stroke="#D4C9B8" strokeWidth="0.5" />
                </svg>
              </motion.div>

              {/* Carta emergindo */}
              <AnimatePresence>
                {phase === 'opening' && (
                  <motion.div
                    className="absolute left-4 right-4 rounded-sm z-30"
                    style={{
                      background: '#F7F4EE',
                      border: '1px solid #D4C9B8',
                      bottom: 10,
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 180, opacity: 1, y: -160 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.65rem', letterSpacing: '0.3em', color: '#6B7563', textTransform: 'uppercase' }}>
                        Você está convidado
                      </p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#2D4A3E', fontWeight: 300, letterSpacing: '0.05em' }}>
                        Gabriel & Luisa
                      </p>
                      <div style={{ width: 40, height: 1, background: '#C4A882' }} />
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: '#6B7563', textTransform: 'uppercase' }}>
                        21 · 04 · 2027
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Texto abaixo */}
            <motion.p
              className="mt-8 text-center"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1rem',
                color: '#C4A882',
                fontStyle: 'italic',
                letterSpacing: '0.05em',
              }}
              animate={phase === 'opening' ? { opacity: 0 } : { opacity: [0.6, 1, 0.6] }}
              transition={phase === 'idle' ? { duration: 3, repeat: Infinity } : { duration: 0.3 }}
            >
              Gabriel & Luisa
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
