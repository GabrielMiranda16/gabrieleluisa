import { motion } from 'framer-motion'

const placeholders = Array.from({ length: 6 }, (_, i) => i)

export default function Gallery() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: '#2D4A3E' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C4A882' }}>
            Nossos momentos
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#F7F4EE', letterSpacing: '0.05em' }}>
            Galeria
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {placeholders.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative overflow-hidden"
              style={{
                aspectRatio: i === 0 || i === 5 ? '4/5' : '1/1',
                background: 'rgba(247,244,238,0.08)',
                border: '1px solid rgba(196,168,130,0.2)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="18" rx="2" stroke="rgba(196,168,130,0.4)" strokeWidth="1" />
                  <circle cx="18" cy="10" r="2" stroke="rgba(196,168,130,0.4)" strokeWidth="1" />
                  <path d="M2 18L8 13L13 17L18 12L26 19" stroke="rgba(196,168,130,0.4)" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,244,238,0.25)' }}>
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
          className="text-center mt-10"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(247,244,238,0.5)' }}
        >
          As fotos do nosso ensaio serão adicionadas em breve...
        </motion.p>
      </div>
    </section>
  )
}
