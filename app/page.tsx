import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Portfolio />
      <Stats />
      <About />
      <Contact />
    </main>
  )
}
