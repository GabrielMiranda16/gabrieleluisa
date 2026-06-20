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
    <section
      className="py-24 px-6"
      style={{ background: '#2D4A3E' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C4A882' }}>
            Como tudo começou
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#F7F4EE', letterSpacing: '0.05em', textAlign: 'center' }}>
            Nossa História
          </h2>
          <div style={{ width: 60, height: 1, background: '#C4A882' }} />
        </motion.div>

        {/* Linha do tempo */}
        <div className="relative">
          {/* Linha vertical */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'rgba(196,168,130,0.3)', transform: 'translateX(-50%)' }}
          />

          <div className="flex flex-col gap-16">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Conteúdo */}
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A882' }}>
                    {event.year}
                  </span>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 300, color: '#F7F4EE', marginTop: 4, marginBottom: 8 }}>
                    {event.title}
                  </h3>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', lineHeight: 1.8, color: 'rgba(247,244,238,0.65)', fontWeight: 300 }}>
                    {event.description}
                  </p>
                </div>

                {/* Ponto central */}
                <div className="relative flex-shrink-0 z-10">
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: '#C4A882',
                      boxShadow: '0 0 0 4px rgba(196,168,130,0.2)',
                    }}
                  />
                </div>

                {/* Espaço do outro lado */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
