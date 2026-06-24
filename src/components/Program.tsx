import { motion } from 'framer-motion'

const steps = [
  {
    time: '16h00',
    label: 'Início',
    title: 'Cerimônia',
    description: 'Troca de alianças e votos de amor eterno',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    time: 'A confirmar',
    label: 'Em seguida',
    title: 'Coquetel',
    description: 'Drinks, canapés e os primeiros momentos como marido e mulher',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8M12 11v11M5 2l7 9 7-9H5z" />
      </svg>
    ),
  },
  {
    time: 'A confirmar',
    label: 'Depois',
    title: 'Jantar',
    description: 'Banquete de casamento com menu especialmente preparado para essa noite',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round">
        <path d="M3 2v7c0 2.2 1.8 4 4 4h2v9M15 2v20M19 2v5c0 1.1-.9 2-2 2h-2" />
      </svg>
    ),
  },
  {
    time: 'A confirmar',
    label: 'Para fechar',
    title: 'Festa',
    description: 'Música, dança e muita alegria — comemoremos juntos até o amanhecer',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
]

export default function Program() {
  return (
    <section style={{ background: '#F5F0EA', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 56, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A7A65', fontWeight: 500 }}>
            O que nos espera
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.04em' }}>
            Programa do Dia
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: '#fff',
                border: '1px solid #D4E6DC',
                padding: 'clamp(2rem, 5vw, 3rem) clamp(2rem, 6vw, 4rem)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 4vw, 3rem)',
              }}
            >
              {/* Ícone */}
              <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: '50%', background: '#F5F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D4E6DC' }}>
                {step.icon}
              </div>

              {/* Conteúdo */}
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#6B7563', fontWeight: 500 }}>
                  {step.label}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 500, color: '#2D4A3E', margin: '6px 0 10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.85rem', color: '#6B7563', lineHeight: 1.8, fontWeight: 400, margin: 0 }}>
                  {step.description}
                </p>
              </div>

              {/* Horário */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontStyle: 'italic', color: '#C9A86C', fontWeight: 400, margin: 0, whiteSpace: 'nowrap' }}>
                  {step.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
