import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const hotels = [
  {
    category: 'Luxo',
    name: 'Fasano Boa Vista Surf Lodge',
    address: 'Rod. Castello Branco, km 102,5 — Porto Feliz',
    distance: '~38 km · ~45 min do local',
    stars: 5,
    phone: '(15) 3261-9900',
    photo: 'https://boavistasurflodge.com.br/wp-content/uploads/2024/10/24653-jhsf-village-1249.jpg',
    map: 'https://maps.google.com/?q=Fasano+Boa+Vista+Surf+Lodge+Porto+Feliz',
    site: 'https://boavistasurflodge.com.br',
  },
  {
    category: 'Premium',
    name: 'Novotel Sorocaba',
    address: 'Av. Prof. Izoraida Marques Peres, 770 — Parque Campolim',
    distance: '~28 km · ~25 min do local',
    stars: 4,
    phone: '(15) 3500-1850',
    photo: 'https://www.ahstatic.com/photos/9456_ho_00_p_1024x768.jpg',
    map: 'https://maps.google.com/?q=Novotel+Sorocaba',
    site: 'https://all.accor.com/hotel/9456/index.pt.shtml',
  },
  {
    category: 'Conforto',
    name: 'Ibis Styles Sorocaba Santa Rosalia',
    address: 'Av. Dom Aguirre, 3065 — Santa Rosália',
    distance: '~30 km · ~27 min do local',
    stars: 3,
    phone: '(15) 3131-1300',
    photo: 'https://www.ahstatic.com/photos/b0v0_ho_00_p_1024x768.jpg',
    map: 'https://maps.google.com/?q=Ibis+Styles+Sorocaba+Santa+Rosalia',
    site: 'https://all.accor.com/hotel/B0V0/index.pt.shtml',
  },
  {
    category: 'Econômico',
    name: 'Ibis Sorocaba',
    address: 'R. Maria Aparecida Pessotti Milego, 290 — Parque Campolim',
    distance: '~28 km · ~25 min do local',
    stars: 3,
    phone: '(15) 3231-5888',
    photo: 'https://www.ahstatic.com/photos/2907_ho_00_p_1024x768.jpg',
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1050)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
                padding: isMobile ? '2rem 1.5rem 2.5rem' : 'clamp(1.8rem, 5vw, 2.8rem) clamp(2rem, 6vw, 3.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '1.2rem' : 'clamp(1.5rem, 4vw, 3rem)',
                flexWrap: 'wrap' as const,
              }}
            >
              {/* Foto */}
              <div style={{ flexShrink: 0, width: 'clamp(100px, 20vw, 160px)', height: 'clamp(70px, 14vw, 110px)', overflow: 'hidden', border: '1px solid rgba(201,168,108,0.2)' }}>
                <img
                  src={hotel.photo}
                  alt={hotel.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
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
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-end', gap: 12, width: isMobile ? '100%' : 'auto', paddingTop: isMobile ? 8 : 0, borderTop: isMobile ? '1px solid rgba(201,168,108,0.15)' : 'none' }}>
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
