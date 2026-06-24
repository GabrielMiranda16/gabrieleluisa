import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const events = [
  { year: '4 de Maio de 2023', title: 'O Encontro', description: 'Um momento que mudou tudo. O Senhor nos colocou no mesmo caminho e nossa história começou.' },
  { year: '9 de Setembro de 2023', title: 'O Namoro', description: 'Com direcionamento espiritual e amor, demos o passo mais importante: ficamos juntos. E o mundo ganhou mais cor.' },
  { year: '20 de Dezembro de 2025', title: 'O Pedido', description: 'Com o coração acelerado e os olhos cheios de amor, a grande pergunta foi feita. E a resposta foi SIM!!!!' },
  { year: '21 de Abril de 2027', title: 'O Grande Dia', description: 'Em 21 de abril, celebraremos nosso amor rodeados das pessoas que mais amamos.' },
]

export default function OurStory() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 72, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C', fontWeight: 500 }}>
            Como tudo começou
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.04em' }}>
            Nossa História
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Linha vertical — só no desktop */}
          {!isMobile && (
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(201,168,108,0.25)', transform: 'translateX(-50%)' }} />
          )}
          {/* Linha vertical — mobile (lado esquerdo) */}
          {isMobile && (
            <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'rgba(201,168,108,0.25)' }} />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 48 : 64 }}>
            {events.map((event, i) => {
              const isLeft = i % 2 === 0

              if (isMobile) {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{ display: 'flex', gap: 24, alignItems: 'flex-start', paddingLeft: 14 }}
                  >
                    <div style={{ flexShrink: 0, marginTop: 6, zIndex: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#C9A86C', boxShadow: '0 0 0 4px rgba(201,168,108,0.2)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(201,168,108,0.8)', fontWeight: 400 }}>
                        {event.year}
                      </span>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 500, color: '#F5F0EA', marginTop: 4, marginBottom: 8 }}>
                        {event.title}
                      </h3>
                      <p style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', lineHeight: 1.9, color: 'rgba(245,240,234,0.7)', fontWeight: 400 }}>
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 32, flexDirection: isLeft ? 'row' : 'row-reverse' }}
                >
                  <div style={{ flex: 1, textAlign: isLeft ? 'right' : 'left' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(201,168,108,0.8)', fontWeight: 400 }}>
                      {event.year}
                    </span>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500, color: '#F5F0EA', marginTop: 6, marginBottom: 10 }}>
                      {event.title}
                    </h3>
                    <p style={{ fontFamily: 'Montserrat', fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(245,240,234,0.7)', fontWeight: 400 }}>
                      {event.description}
                    </p>
                  </div>

                  <div style={{ flexShrink: 0, zIndex: 10 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#C9A86C', boxShadow: '0 0 0 5px rgba(201,168,108,0.2)' }} />
                  </div>

                  <div style={{ flex: 1 }} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
