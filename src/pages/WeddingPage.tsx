import { useState, useEffect } from 'react'
import EnvelopeOpening from '../components/EnvelopeOpening'
import Hero from '../components/Hero'
import Countdown from '../components/Countdown'
import OurStory from '../components/OurStory'
import Program from '../components/Program'
import TheDay from '../components/TheDay'
import Lodging from '../components/Lodging'
import Gallery from '../components/Gallery'
import RSVPGifts from '../components/RSVPGifts'
import Footer from '../components/Footer'
import MusicPlayer from '../components/MusicPlayer'
import FloatingRSVP from '../components/FloatingRSVP'

export default function WeddingPage() {
  const [opened, setOpened] = useState(() => sessionStorage.getItem('envelopeOpened') === 'true')

  const handleOpen = () => {
    sessionStorage.setItem('envelopeOpened', 'true')
    setOpened(true)
  }

  useEffect(() => {
    if (!opened) return
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [opened])

  return (
    <>
      {!opened && <EnvelopeOpening onOpen={handleOpen} />}
      {opened && (
        <main>
          <Hero />
          <Countdown />
          <OurStory />
          <Program />
          <Lodging />
          <TheDay />
          <Gallery />
          <RSVPGifts />
          <Footer />
          <MusicPlayer />
          <FloatingRSVP />
        </main>
      )}
    </>
  )
}
