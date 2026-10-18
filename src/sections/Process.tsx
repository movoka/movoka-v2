import { useEffect, useRef, useState } from 'react';
import SectionHeading, { Kiwi, RevealText } from '@/components/SectionHeading';
import { useLanguage } from '@/lib/i18n';

export default function Process() {
  const { copy } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section top hits bottom of viewport, 1 when section bottom hits top
      const p = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-movoka-carbon py-28 md:py-40">
      <div className="ambient-blob" style={{ width: 400, height: 400, background: '#C6FF00', bottom: '10%', right: '10%', opacity: 0.08 }} />

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading kicker={copy.process.kicker} align="center">
          <RevealText text={copy.process.title[0]} /> <Kiwi><RevealText text={copy.process.title[1]} /></Kiwi>
          <br />
          <RevealText text={copy.process.title[2]} />
        </SectionHeading>

        <div className="relative mt-20 md:mt-28">
          {/* glowing line track */}
          <div className="absolute left-[27px] top-0 h-full w-px bg-movoka-white/10 md:left-1/2 md:-translate-x-1/2">
            <div
              className="absolute inset-x-0 top-0 w-full bg-movoka-kiwi transition-[height] duration-150 ease-out"
              style={{ height: `${progress * 100}%`, boxShadow: '0 0 20px rgba(198,255,0,0.6)' }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {copy.process.steps.map((s, i) => (
              <Step key={s.title} step={{ n: `0${i + 1}`, ...s }} side={i % 2 === 0 ? 'left' : 'right'} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ step, side, index }: { step: { n: string; title: string; desc: string }; side: 'left' | 'right'; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-6 md:gap-0 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      {/* node */}
      <div className="absolute left-[20px] z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2">
        <div
          className={`h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 ${
            visible ? 'border-movoka-kiwi bg-movoka-kiwi' : 'border-movoka-white/30 bg-movoka-black'
          }`}
          style={visible ? { boxShadow: '0 0 20px rgba(198,255,0,0.7)' } : undefined}
        />
      </div>

      {/* content */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${side === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
        <div
          className="transition-all duration-700"
          style={{ transform: visible ? 'translateY(0)' : 'translateY(30px)', opacity: visible ? 1 : 0 }}
        >
          <div className="font-display text-5xl font-bold text-movoka-white/10 md:text-7xl">{step.n}</div>
          <h3 className="-mt-4 font-display text-2xl font-bold tracking-tight text-movoka-white md:text-3xl">
            {step.title}
          </h3>
          <p className="mt-2 font-sans text-sm text-movoka-white/55 md:text-base">{step.desc}</p>
        </div>
      </div>

      {/* spacer for the other half on desktop */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
