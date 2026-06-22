import { motion } from 'framer-motion'

const steps = [
  { time: 'A confirmar', title: 'Cerimônia', description: 'Troca de alianças e votos', icon: <svg width="32" height="32" viewBox="0 0 28 28" fill="none"><path d="M14 3L14 10M11 6L14 3L17 6" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /><path d="M6 25V15C6 12.8 7.8 11 10 11H18C20.2 11 22 12.8 22 15V25" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /><path d="M3 25H25" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /></svg> },
  { time: 'A confirmar', title: 'Coquetel', description: 'Drinks e canapés', icon: <svg width="32" height="32" viewBox="0 0 28 28" fill="none"><path d="M6 4L22 4L15 13V22H13V13L6 4Z" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 22H18" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /></svg> },
  { time: 'A confirmar', title: 'Jantar', description: 'Banquete de casamento', icon: <svg width="32" height="32" viewBox="0 0 28 28" fill="none"><path d="M10 4V12C10 14.2 11.8 16 14 16C16.2 16 18 14.2 18 12V4" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /><path d="M14 16V24" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /><path d="M10 24H18" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /></svg> },
  { time: 'A confirmar', title: 'Festa', description: 'Música e dança até o amanhecer', icon: <svg width="32" height="32" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="4" stroke="#C9A86C" strokeWidth="1.2" /><path d="M14 4V7M14 21V24M4 14H7M21 14H24" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" /></svg> },
]

export default function Program() {
  return (
    <section style={{ background: '#F5F0EA', padding: '6rem 1.5rem 10rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 64, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#4A7A65', fontWeight: 500 }}>
            O que nos espera
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#2D4A3E', letterSpacing: '0.04em' }}>
            Programa do Dia
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: '3rem 2rem', border: '1px solid #D4E6DC', background: '#fff' }}
            >
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F5F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D4E6DC' }}>
                {step.icon}
              </div>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B9A6B', fontWeight: 500 }}>
                {step.time}
              </p>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 500, color: '#2D4A3E' }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', color: '#6B7563', lineHeight: 1.7, fontWeight: 400 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
