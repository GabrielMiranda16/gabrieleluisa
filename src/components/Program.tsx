import { motion } from 'framer-motion'

const steps = [
  {
    time: 'A confirmar',
    title: 'Cerimônia',
    description: 'Troca de alianças e votos',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L14 10M11 6L14 3L17 6" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 25V15C6 12.8 7.8 11 10 11H18C20.2 11 22 12.8 22 15V25" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
        <path d="M3 25H25" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: 'A confirmar',
    title: 'Coquetel',
    description: 'Drinks e canapés',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 4L22 4L15 13V22H13V13L6 4Z" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22H18" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: 'A confirmar',
    title: 'Jantar',
    description: 'Banquete de casamento',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M10 4V12C10 14.2 11.8 16 14 16C16.2 16 18 14.2 18 12V4" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 16V24" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
        <path d="M10 24H18" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
        <path d="M7 4V8" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
        <path d="M21 4V8" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: 'A confirmar',
    title: 'Festa',
    description: 'Música e dança até o amanhecer',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4" stroke="#C9A86C" strokeWidth="1" />
        <path d="M14 4V7M14 21V24M4 14H7M21 14H24M6.34 6.34L8.46 8.46M19.54 19.54L21.66 21.66M6.34 21.66L8.46 19.54M19.54 8.46L21.66 6.34" stroke="#C9A86C" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Program() {
  return (
    <section className="py-24 px-6" style={{ background: '#F5F0EA' }}>
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <span className="section-subtitle">O que nos espera</span>
          <h2 className="section-title">Programa do Dia</h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 text-center p-6"
              style={{
                border: '1px solid #D4E6DC',
                background: '#fff',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: '#F5F0EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #D4E6DC',
                }}
              >
                {step.icon}
              </div>

              <div>
                <p style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#8B9A6B',
                  marginBottom: 6,
                }}>
                  {step.time}
                </p>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.3rem',
                  fontWeight: 300,
                  color: '#2D4A3E',
                  marginBottom: 4,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.7rem',
                  color: '#6B7563',
                  lineHeight: 1.6,
                }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
