import { Suspense, useEffect, useRef } from 'react';
import HeroScene from '@/three/HeroScene';
import MagneticButton from '@/components/MagneticButton';
import { scrollToId } from '@/hooks/useLenis';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
  const scrollRef = useRef(0);
  const { copy } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight;
      scrollRef.current = Math.min(1, window.scrollY / h);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="start" className="relative h-[100svh] w-full overflow-hidden">
      {/* Ambient kiwi blobs */}
      <div className="ambient-blob" style={{ width: 600, height: 600, background: '#C6FF00', top: '-10%', left: '60%' }} />
      <div className="ambient-blob" style={{ width: 450, height: 450, background: '#B9FF28', bottom: '-15%', left: '5%', opacity: 0.15 }} />

      {/* 3D scene */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <HeroScene scrollRef={scrollRef} className="h-full w-full" />
        </Suspense>
      </div>

      {/* Light beams */}
      <div className="pointer-events-none absolute inset-0 z-[5] opacity-40">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-movoka-kiwi/20 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Brand */}
        <div className="reveal-line mb-4">
          <span className="reveal-inner is-visible font-display text-sm uppercase tracking-[0.5em] text-movoka-white/40">
            {copy.hero.eyebrow}
          </span>
        </div>

        {/* MOVOKA giant */}
        <h1 className="font-display text-[19vw] font-bold leading-[0.85] tracking-tightest text-movoka-white md:text-[15vw] lg:text-[13rem]"
          style={{ textShadow: '0 0 80px rgba(198,255,0,0.15)' }}
        >
          MOVOKA
        </h1>

        {/* Headline */}
        <div className="mt-6 max-w-4xl">
          <p className="font-display text-2xl font-medium leading-[1.15] tracking-tight text-movoka-white md:text-4xl lg:text-5xl">
            WE DON'T JUST BUILD WEBSITES.
            <br />
            WE CREATE <span className="text-movoka-kiwi text-glow">DIGITAL EXPERIENCES.</span>
          </p>
        </div>

        {/* Subhead */}
        <p className="mt-6 max-w-xl font-sans text-sm text-movoka-white/55 md:text-base">
          {copy.hero.sub}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton variant="kiwi" arrow onClick={() => scrollToId('kontakt')}>
            {copy.hero.primary}
          </MagneticButton>
          <MagneticButton variant="outline" arrow onClick={() => scrollToId('projekte')}>
            {copy.hero.secondary}
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-movoka-white/40">{copy.hero.scroll}</span>
        <div className="relative h-10 w-px overflow-hidden bg-movoka-white/15">
          <div className="absolute inset-x-0 top-0 h-4 animate-[scrolldown_2s_ease-in-out_infinite] bg-movoka-kiwi" />
        </div>
      </div>

      <style>{`
        @keyframes scrolldown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  );
}
