import { motion } from 'framer-motion'

const events = [
  {
    year: '2020',
    title: 'O Primeiro Encontro',
    description: 'Um momento que mudou tudo. O destino nos colocou no mesmo caminho e nossas histórias se encontraram.',
  },
  {
    year: '2021',
    title: 'O Primeiro Namoro',
    description: 'Com coragem e amor, demos o passo mais importante: ficamos juntos. E o mundo ganhou mais cor.',
  },
  {
    year: '2023',
    title: 'O Pedido',
    description: 'Com o coração acelerado e os olhos cheios de amor, a grande pergunta foi feita. E a resposta foi sim.',
  },
  {
    year: '2027',
    title: 'O Grande Dia',
    description: 'Em 21 de abril, celebraremos nosso amor rodeados das pessoas que mais amamos.',
  },
]

export default function OurStory() {
  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 64, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C' }}>
            Como tudo começou
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#F5F0EA', letterSpacing: '0.05em' }}>
            Nossa História
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        {/* Linha do tempo — coluna central */}
        <div style={{ position: 'relative' }}>
          {/* Linha vertical */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'rgba(201,168,108,0.25)',
            transform: 'translateX(-50%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {events.map((event, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 32, flexDirection: isLeft ? 'row' : 'row-reverse' }}
                >
                  {/* Conteúdo */}
                  <div style={{ flex: 1, textAlign: isLeft ? 'right' : 'left' }}>
                    <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A86C' }}>
                      {event.year}
                    </span>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', fontWeight: 300, color: '#F5F0EA', marginTop: 4, marginBottom: 8 }}>
                      {event.title}
                    </h3>
                    <p style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', lineHeight: 1.8, color: 'rgba(245,240,234,0.6)', fontWeight: 300 }}>
                      {event.description}
                    </p>
                  </div>

                  {/* Ponto central */}
                  <div style={{ flexShrink: 0, zIndex: 10 }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#C9A86C',
                      boxShadow: '0 0 0 4px rgba(201,168,108,0.2)',
                    }} />
                  </div>

                  {/* Lado vazio */}
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
