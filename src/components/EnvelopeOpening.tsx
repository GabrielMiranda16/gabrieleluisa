import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnvelopeOpeningProps {
  onOpen: () => void
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    const show = () => { v.currentTime = 0.001 }
    v.addEventListener('loadedmetadata', show)
    return () => v.removeEventListener('loadedmetadata', show)
  }, [])

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('playing')
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleEnded = () => {
    setPhase('done')
    setTimeout(onOpen, 500)
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: '#2D4A3E' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={handleClick}
        >
          {/* Vídeo do envelope */}
          <video
            ref={videoRef}
            src="/videoenvelope.mp4"
            preload="auto"
            playsInline
            onEnded={handleEnded}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Prompt "toque para abrir" — some quando o vídeo começa */}
          <AnimatePresence>
            {phase === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: '28%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.85rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    fontWeight: 500,
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                  }}
                >
                  Toque para abrir
                </motion.p>
                <motion.svg
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  width="18" height="22" viewBox="0 0 16 20" fill="none"
                >
                  <path d="M8 0v16M2 10l6 6 6-6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
