import { useState } from 'react'
import EnvelopeOpening from './components/EnvelopeOpening'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import OurStory from './components/OurStory'
import Program from './components/Program'
import TheDay from './components/TheDay'
import Gallery from './components/Gallery'
import RSVPGifts from './components/RSVPGifts'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import FloatingRSVP from './components/FloatingRSVP'

export default function App() {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <EnvelopeOpening onOpen={() => setOpened(true)} />

      {opened && (
        <main>
          <Hero />
          <Countdown />
          <OurStory />
          <Program />
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
