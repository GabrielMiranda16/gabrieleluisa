import { useState } from 'react'
import EnvelopeOpening from './components/EnvelopeOpening'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import OurStory from './components/OurStory'
import TheDay from './components/TheDay'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

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
          <TheDay />
          <Gallery />
          <Footer />
          <MusicPlayer />
        </main>
      )}
    </>
  )
}
