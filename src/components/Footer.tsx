import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{ padding: '6rem 1.5rem 10rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, background: '#F5F0EA', borderTop: '1px solid #D4E6DC' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}
      >
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid #2D4A3E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#2D4A3E', fontWeight: 500 }}>G&L</span>
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.04em' }}>
          Gabriel & Luisa
        </h2>

        <div className="diamond-divider"><span /></div>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B7563', fontWeight: 500 }}>
          21 · 04 · 2027
        </p>

        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontStyle: 'italic', color: '#6B7563', fontWeight: 400 }}>
          Maison Reserva · Salto de Pirapora, SP
        </p>

        <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button disabled style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A86C', background: 'none', border: '1px solid #C9A86C', padding: '12px 28px', cursor: 'not-allowed', opacity: 0.6, fontWeight: 500 }} title="Em breve">
            Confirmar Presença
          </button>
          <button disabled style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2D4A3E', background: 'none', border: '1px solid #2D4A3E', padding: '12px 28px', cursor: 'not-allowed', opacity: 0.6, fontWeight: 500 }} title="Em breve">
            Lista de Presentes
          </button>
        </div>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(107,117,99,0.5)', marginTop: 8, fontWeight: 400 }}>
          Feito com amor · Gabriel & Luisa © 2027
        </p>
      </motion.div>
    </footer>
  )
}
