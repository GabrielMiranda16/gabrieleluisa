import { motion } from 'framer-motion'

const placeholders = Array.from({ length: 6 }, (_, i) => i)

export default function Gallery() {
  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 64, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C' }}>
            Nossos momentos
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#F5F0EA', letterSpacing: '0.05em' }}>
            Galeria
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {placeholders.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                aspectRatio: i === 0 || i === 5 ? '4/5' : '1/1',
                background: 'rgba(245,240,234,0.06)',
                border: '1px solid rgba(201,168,108,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="18" rx="2" stroke="rgba(201,168,108,0.35)" strokeWidth="1" />
                  <circle cx="18" cy="10" r="2" stroke="rgba(201,168,108,0.35)" strokeWidth="1" />
                  <path d="M2 18L8 13L13 17L18 12L26 19" stroke="rgba(201,168,108,0.35)" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.2)' }}>
                  Em breve
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 40, fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(245,240,234,0.45)' }}
        >
          As fotos do nosso ensaio serão adicionadas em breve...
        </motion.p>
      </div>
    </section>
  )
}
