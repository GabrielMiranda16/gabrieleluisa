import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function FloatingRSVP() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToRSVP = () => {
    document.getElementById('confirmar-presenca')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      onClick={scrollToRSVP}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'fixed',
        left: 0,
        top: '65%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        background: '#2D4A3E',
        border: 'none',
        borderRadius: '0 6px 6px 0',
        padding: '18px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <span style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.6rem',
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#C9A86C',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
      }}>
        Confirmar Presença
      </span>
    </motion.button>
  )
}
