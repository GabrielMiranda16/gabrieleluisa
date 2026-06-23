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
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onClick={scrollToRSVP}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: 28,
        left: 28,
        zIndex: 100,
        background: '#2D4A3E',
        border: '1px solid rgba(201,168,108,0.4)',
        borderRadius: 40,
        padding: '11px 20px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="12" rx="1.5" stroke="#C9A86C" strokeWidth="1.4"/>
        <path d="M1 7h14" stroke="#C9A86C" strokeWidth="1.4"/>
        <path d="M5 1v4M11 1v4" stroke="#C9A86C" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <span style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.6rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#C9A86C',
      }}>
        Confirmar
      </span>
    </motion.button>
  )
}
