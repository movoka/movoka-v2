import { useState } from 'react';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Projects from '@/sections/Projects';
import WorkGallery from '@/sections/WorkGallery';
import WhyMovoka from '@/sections/WhyMovoka';
import Process from '@/sections/Process';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { useLenis } from '@/hooks/useLenis';
import { LanguageProvider } from '@/lib/i18n';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis(loaded);

  return (
    <LanguageProvider>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div className="film-grain" />
      <Cursor />
      <Navigation />

      <main className="relative">
        <Hero />
        <Services />
        <Projects />
        <WorkGallery />
        <WhyMovoka />
        <Process />
        <Contact />
      </main>

      <Footer />
    </LanguageProvider>
  );
}
