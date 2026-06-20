import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      style={{ padding: '6rem 1.5rem 8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, background: '#F5F0EA', borderTop: '1px solid #D4E6DC' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Monograma */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '1px solid #2D4A3E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#2D4A3E', fontWeight: 300 }}>
            G&L
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            color: '#2D4A3E',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}
        >
          Gabriel & Luisa
        </h2>

        <div className="diamond-divider"><span /></div>

        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#6B7563',
          }}
        >
          21 · 04 · 2027
        </p>

        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#6B7563',
            textAlign: 'center',
          }}
        >
          Maison Reserva · Salto de Pirapora, SP
        </p>

        {/* Links futuros */}
        <div className="flex gap-8 mt-4">
          <button
            disabled
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C4A882',
              background: 'none',
              border: '1px solid #C4A882',
              padding: '10px 24px',
              cursor: 'not-allowed',
              opacity: 0.6,
            }}
            title="Em breve"
          >
            Confirmar Presença
          </button>
          <button
            disabled
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#2D4A3E',
              background: 'none',
              border: '1px solid #2D4A3E',
              padding: '10px 24px',
              cursor: 'not-allowed',
              opacity: 0.6,
            }}
            title="Em breve"
          >
            Lista de Presentes
          </button>
        </div>

        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: 'rgba(107,117,99,0.5)',
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          Feito com amor · Gabriel & Luisa © 2027
        </p>
      </motion.div>
    </footer>
  )
}
