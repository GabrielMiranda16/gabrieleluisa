import { motion } from 'framer-motion'

const hotels = [
  {
    category: 'Premium',
    name: 'Novotel Sorocaba',
    address: 'Av. Prof. Izoraida Marques Peres, 770 — Parque Campolim',
    distance: '~50 km do local',
    stars: 4,
    phone: '(15) 3500-1850',
    map: 'https://maps.google.com/?q=Novotel+Sorocaba',
    site: 'https://all.accor.com/hotel/9456/index.pt.shtml',
  },
  {
    category: 'Conforto',
    name: 'Ibis Styles Sorocaba Santa Rosalia',
    address: 'Av. Dom Aguirre, 3065 — Santa Rosália',
    distance: '~50 km do local',
    stars: 3,
    phone: '(15) 3131-1300',
    map: 'https://maps.google.com/?q=Ibis+Styles+Sorocaba+Santa+Rosalia',
    site: 'https://all.accor.com/hotel/B0V0/index.pt.shtml',
  },
  {
    category: 'Econômico',
    name: 'Ibis Sorocaba',
    address: 'R. Maria Aparecida Pessotti Milego, 290 — Parque Campolim',
    distance: '~50 km do local',
    stars: 3,
    phone: '(15) 3231-5888',
    map: 'https://maps.google.com/?q=Ibis+Sorocaba',
    site: 'https://all.accor.com/hotel/2907/index.pt.shtml',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#C9A86C">
          <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.7L6 7.4 3.5 8.6 4 5.9 2 4l2.7-.4L6 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function Lodging() {
  return (
    <section style={{ background: '#2D4A3E', padding: '6rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 16, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C', fontWeight: 500 }}>
            Para sua estadia
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.04em' }}>
            Hospedagem
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(245,240,234,0.6)', textAlign: 'center', marginBottom: 48 }}
        >
          Sugestões próximas a Sorocaba — SP
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {hotels.map((hotel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'rgba(245,240,234,0.04)',
                border: '1px solid rgba(201,168,108,0.2)',
                padding: 'clamp(1.8rem, 5vw, 2.8rem) clamp(2rem, 6vw, 3.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 4vw, 3rem)',
                flexWrap: 'wrap' as const,
              }}
            >
              {/* Ícone */}
              <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,108,0.1)', border: '1px solid rgba(201,168,108,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' as const }}>
                  <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A86C', fontWeight: 600 }}>
                    {hotel.category}
                  </span>
                  <Stars count={hotel.stars} />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 500, color: '#F5F0EA', margin: '0 0 8px' }}>
                  {hotel.name}
                </h3>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: 'rgba(245,240,234,0.55)', lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
                  {hotel.address}
                </p>
                <a
                  href={`tel:${hotel.phone.replace(/\D/g, '')}`}
                  style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: 'rgba(201,168,108,0.7)', fontWeight: 400, textDecoration: 'none', marginTop: 2 }}
                >
                  {hotel.phone}
                </a>
              </div>

              {/* Distância + botões */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(201,168,108,0.7)' }}>
                  {hotel.distance}
                </span>
                <a
                  href={hotel.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#F5F0EA',
                    textDecoration: 'none',
                    padding: '10px 24px',
                    border: '1px solid rgba(245,240,234,0.3)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  Site do Hotel
                </a>
                <a
                  href={hotel.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,234,0.45)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  Ver no Mapa →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: 'rgba(245,240,234,0.35)', textAlign: 'center', marginTop: 36, letterSpacing: '0.1em', lineHeight: 1.8 }}
        >
          Recomendamos reservar com antecedência — 21 de abril de 2027 é feriado.
        </motion.p>

      </div>
    </section>
  )
}
