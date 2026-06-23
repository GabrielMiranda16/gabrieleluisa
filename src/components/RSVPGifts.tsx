import { motion } from 'framer-motion'

const cards = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="7" width="26" height="22" rx="2" stroke="#2D4A3E" strokeWidth="1.5"/>
        <path d="M3 13h26" stroke="#2D4A3E" strokeWidth="1.5"/>
        <path d="M10 3v8M22 3v8" stroke="#2D4A3E" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 20l4 4 8-7" stroke="#C9A86C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Confirme sua presença',
    title: 'Confirmar Presença',
    description: 'Sua presença é o melhor presente que nos poderiam dar. Confirme até 20 de março de 2027.',
    button: 'Em breve',
    disabled: true,
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <path d="M16 10V28M8 10h16M6 10h20v4H6zM10 10c0-3 2-5 4-5s2 2 2 2M22 10c0-3-2-5-4-5s-2 2-2 2" stroke="#2D4A3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14v14h16V14" stroke="#2D4A3E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Nos abençoe com um presente',
    title: 'Lista de Presentes',
    description: 'Se desejar nos presentear, preparamos uma lista com carinho para tornar nosso novo lar ainda mais especial.',
    button: 'Em breve',
    disabled: true,
  },
]

export default function RSVPGifts() {
  return (
    <section style={{ background: '#F5F0EA', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 64, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A7A65', fontWeight: 500 }}>
            Participe
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.04em' }}>
            Faça Parte do Nosso Dia
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                background: '#fff',
                border: '1px solid #D4E6DC',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 20,
              }}
            >
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F5F0EA', border: '1px solid #D4E6DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.icon}
              </div>

              <span style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B9A6B', fontWeight: 500 }}>
                {card.label}
              </span>

              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.02em' }}>
                {card.title}
              </h3>

              <p style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', color: '#6B7563', lineHeight: 1.8, fontWeight: 400 }}>
                {card.description}
              </p>

              <button
                disabled={card.disabled}
                style={{
                  marginTop: 8,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: card.disabled ? 'rgba(45,74,62,0.4)' : '#2D4A3E',
                  background: 'none',
                  border: `1px solid ${card.disabled ? 'rgba(45,74,62,0.25)' : '#2D4A3E'}`,
                  padding: '14px 36px',
                  cursor: card.disabled ? 'not-allowed' : 'pointer',
                }}
              >
                {card.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
