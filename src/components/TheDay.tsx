import { motion } from 'framer-motion'

export default function TheDay() {
  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 56, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C', fontWeight: 500 }}>
            Onde e quando
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.04em' }}>
            O Grande Dia
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            background: 'rgba(245,240,234,0.04)',
            border: '1px solid rgba(201,168,108,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Infos do local */}
          <div style={{ padding: 'clamp(2.5rem, 6vw, 4rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>

            {/* Ícone pin */}
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path d="M6 12C6 7.6 10.5 4 16 4C21.5 4 26 7.6 26 12C26 18 16 28 16 28C16 28 6 18 6 12Z" stroke="#F5F0EA" strokeWidth="1.2" />
              <circle cx="16" cy="12" r="3" stroke="#C9A86C" strokeWidth="1.2" />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.5)', fontWeight: 500 }}>
                Cerimônia & Recepção
              </span>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.03em' }}>
                Maison Reserva
              </h3>
            </div>

            <div style={{ width: 48, height: 1, background: '#C9A86C' }} />

            {/* Data e hora */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#F5F0EA', fontStyle: 'italic', fontWeight: 400 }}>
                21 de Abril de 2027
              </p>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'rgba(245,240,234,0.5)', fontWeight: 400 }}>
                16H00
              </p>
            </div>

            {/* Endereço */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.85rem', color: 'rgba(245,240,234,0.55)', lineHeight: 1.8, fontWeight: 400 }}>
                Estrada Dr. Celso Charuri, km 3.67 B
              </p>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.85rem', color: 'rgba(245,240,234,0.55)', lineHeight: 1.8, fontWeight: 400 }}>
                Salto de Pirapora — SP
              </p>
            </div>

          </div>

          {/* Mapa */}
          <div style={{ borderTop: '1px solid rgba(201,168,108,0.2)', padding: '2.5rem' }}>
            <div style={{ width: '100%', height: 'clamp(280px, 45vw, 480px)', border: '1px solid rgba(201,168,108,0.2)', overflow: 'hidden' }}>
              <iframe
                title="Maison Reserva"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0!2d-47.62!3d-23.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM4JzI0LjAiUyA0N8KwMzcnMTIuMCJX!5e0!3m2!1spt!2sbr!4v1700000000000!5m2!1spt!2sbr&q=Estrada+Dr.+Celso+Charuri,+km+3.67+B,+Salto+de+Pirapora+SP"
                width="100%" height="100%" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Botão */}
          <div style={{ padding: '2.5rem', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(201,168,108,0.2)' }}>
            <a
              href="https://maps.google.com/?q=Estrada+Dr.+Celso+Charuri,+km+3.67+B,+Salto+de+Pirapora+SP"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#F5F0EA',
                textDecoration: 'none',
                padding: '14px 48px',
                border: '1px solid rgba(245,240,234,0.3)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5F0EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Como Chegar
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
