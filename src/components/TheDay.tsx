import { motion } from 'framer-motion'

export default function TheDay() {
  return (
    <section style={{ background: '#F5F0EA', padding: '6rem 1.5rem 10rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 64, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A7A65' }}>
            Onde e quando
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#2D4A3E', letterSpacing: '0.05em' }}>
            O Grande Dia
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 64 }}>

          {/* Cerimônia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '3rem 2.5rem', border: '1px solid #D4E6DC', background: '#fff', textAlign: 'center' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 3L16 12M12 7L16 3L20 7M8 29V16C8 13.8 9.8 12 12 12H20C22.2 12 24 13.8 24 16V29" stroke="#2D4A3E" strokeWidth="1" strokeLinecap="round" />
              <path d="M4 29H28" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6B7563' }}>
              Cerimônia
            </span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 300, color: '#2D4A3E' }}>
              Maison Reserva
            </h3>
            <div style={{ width: 40, height: 1, background: '#C9A86C' }} />
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: '#6B7563', lineHeight: 1.9 }}>
              Estrada Dr. Celso Charuri, km 3.67 B<br />
              Salto de Pirapora - SP
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#4A7A65', fontStyle: 'italic' }}>
              21 de Abril de 2027
            </p>
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#6B7563' }}>
              Horário a confirmar
            </p>
          </motion.div>

          {/* Recepção */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '3rem 2.5rem', border: '1px solid #D4E6DC', background: '#fff', textAlign: 'center' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 12C6 7.6 10.5 4 16 4C21.5 4 26 7.6 26 12C26 18 16 28 16 28C16 28 6 18 6 12Z" stroke="#2D4A3E" strokeWidth="1" />
              <circle cx="16" cy="12" r="3" stroke="#C9A86C" strokeWidth="1" />
            </svg>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6B7563' }}>
              Recepção
            </span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 300, color: '#2D4A3E' }}>
              Maison Reserva
            </h3>
            <div style={{ width: 40, height: 1, background: '#C9A86C' }} />
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: '#6B7563', lineHeight: 1.9 }}>
              Mesmo local da cerimônia<br />
              1h30 de São Paulo
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#4A7A65', fontStyle: 'italic' }}>
              21 de Abril de 2027
            </p>
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#6B7563' }}>
              Horário a confirmar
            </p>
          </motion.div>
        </div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}
        >
          <div style={{ width: '100%', height: 360, border: '1px solid #D4E6DC', overflow: 'hidden' }}>
            <iframe
              title="Maison Reserva"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0!2d-47.62!3d-23.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM4JzI0LjAiUyA0N8KwMzcnMTIuMCJX!5e0!3m2!1spt!2sbr!4v1700000000000!5m2!1spt!2sbr&q=Estrada+Dr.+Celso+Charuri,+km+3.67+B,+Salto+de+Pirapora+SP"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://maps.google.com/?q=Estrada+Dr.+Celso+Charuri,+km+3.67+B,+Salto+de+Pirapora+SP"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#2D4A3E',
              textDecoration: 'none',
              padding: '12px 36px',
              border: '1px solid #2D4A3E',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLAnchorElement).style.background = '#2D4A3E'
              ;(e.target as HTMLAnchorElement).style.color = '#F5F0EA'
            }}
            onMouseLeave={e => {
              (e.target as HTMLAnchorElement).style.background = 'transparent'
              ;(e.target as HTMLAnchorElement).style.color = '#2D4A3E'
            }}
          >
            Como Chegar
          </a>
        </motion.div>
      </div>
    </section>
  )
}
