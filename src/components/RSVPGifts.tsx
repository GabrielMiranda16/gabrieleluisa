import { motion } from 'framer-motion'

export default function RSVPGifts() {
  return (
    <>
      {/* Seção Lista de Presentes */}
      <section style={{ background: '#F5F0EA', padding: '6rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}
        >
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff', border: '1px solid #D4E6DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path d="M16 10V28M8 10h16M6 10h20v4H6z" stroke="#2D4A3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14v14h12V14" stroke="#2D4A3E" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 10c0 0-1-5 3-5s3 3 3 5M16 10c0 0 1-5-3-5s-3 3-3 5" stroke="#C9A86C" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>

          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A7A65', fontWeight: 500 }}>
            Nos abençoe com um presente
          </span>

          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.04em' }}>
            Lista de Presentes
          </h2>

          <div className="diamond-divider"><span /></div>

          <p style={{ fontFamily: 'Montserrat', fontSize: '0.88rem', color: '#6B7563', lineHeight: 1.9, fontWeight: 400 }}>
            Se desejar nos presentear, preparamos uma lista com carinho<br />
            para tornar nosso novo lar ainda mais especial.
          </p>

          <a
            href="/presentes"
            style={{
              marginTop: 8,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#2D4A3E',
              background: 'none',
              border: '1px solid #2D4A3E',
              padding: '14px 40px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Ver lista de presentes
          </a>
        </motion.div>
      </section>

      {/* Seção Confirmar Presença */}
      <section id="confirmar-presenca" style={{ background: '#2D4A3E', padding: '6rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}
        >
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(245,240,234,0.1)', border: '1px solid rgba(201,168,108,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="7" width="26" height="22" rx="2" stroke="#C9A86C" strokeWidth="1.5"/>
              <path d="M3 13h26" stroke="#C9A86C" strokeWidth="1.5"/>
              <path d="M10 3v8M22 3v8" stroke="#C9A86C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 20l4 4 8-7" stroke="#C9A86C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C', fontWeight: 500 }}>
            Sua presença é tudo para nós
          </span>

          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.04em' }}>
            Confirmar Presença
          </h2>

          <div className="diamond-divider" style={{ '--line-color': 'rgba(201,168,108,0.4)' } as React.CSSProperties}><span /></div>

          <p style={{ fontFamily: 'Montserrat', fontSize: '0.88rem', color: 'rgba(245,240,234,0.75)', lineHeight: 1.9, fontWeight: 400 }}>
            Sua presença é o melhor presente que nos poderiam dar.<br />
            Confirme até 20 de março de 2027.
          </p>

          <button
            disabled
            style={{
              marginTop: 8,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,234,0.35)',
              background: 'none',
              border: '1px solid rgba(245,240,234,0.2)',
              padding: '14px 40px',
              cursor: 'not-allowed',
            }}
          >
            Em breve
          </button>
        </motion.div>
      </section>
    </>
  )
}
