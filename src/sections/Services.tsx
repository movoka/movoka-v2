import { useRef } from 'react';
import SectionHeading, { Kiwi, RevealText } from '@/components/SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Services() {
  const { copy } = useLanguage();
  return (
    <section id="leistungen" className="relative w-full bg-movoka-black py-28 md:py-40">
      <div className="ambient-blob" style={{ width: 400, height: 400, background: '#C6FF00', top: '20%', right: '-5%', opacity: 0.12 }} />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading kicker={copy.services.kicker}>
          <RevealText text={copy.services.title[0]} /> <Kiwi><RevealText text={copy.services.title[1]} /></Kiwi>{' '}<RevealText text={copy.services.title[2]} />
          <div className="mt-6 max-w-xl font-sans text-base text-movoka-white/55 md:text-lg"><span className="reveal-line"><span className="reveal-inner">{copy.services.sub}</span></span></div>
        </SectionHeading>
        <div className="mt-16 divide-y divide-movoka-white/10 border-y border-movoka-white/10 md:mt-24">
          {copy.services.items.map((service, index) => <ServiceRow key={service.title} n={`0${index + 1}`} {...service} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ n, title, desc }: { n: string; title: string; desc: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const onMove = (event: React.MouseEvent) => {
    const row = rowRef.current; const arrow = arrowRef.current;
    if (!row || !arrow) return;
    const rect = row.getBoundingClientRect();
    arrow.style.left = `${event.clientX - rect.left}px`; arrow.style.top = `${event.clientY - rect.top}px`; arrow.style.opacity = '1';
  };
  return <div ref={rowRef} onMouseMove={onMove} onMouseLeave={() => { if (arrowRef.current) arrowRef.current.style.opacity = '0'; }} className="group relative grid grid-cols-12 items-center gap-4 px-2 py-8 transition-colors duration-500 hover:bg-movoka-carbon/60 md:py-12">
    <div className="col-span-2 font-display text-sm text-movoka-white/30 transition-colors group-hover:text-movoka-kiwi md:col-span-1">{n}</div>
    <div className="col-span-10 overflow-hidden md:col-span-6"><h3 className="font-display text-2xl font-semibold tracking-tight text-movoka-white transition-transform duration-500 group-hover:translate-x-3 md:text-5xl md:font-medium">{title}</h3></div>
    <div className="col-span-12 overflow-hidden md:col-span-4"><p className="max-w-md font-sans text-sm text-movoka-white/50 transition-colors group-hover:text-movoka-white/80 md:text-base">{desc}</p></div>
    <div ref={arrowRef} className="pointer-events-none absolute z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-movoka-kiwi text-movoka-black opacity-0 transition-opacity duration-300" style={{ left: '50%', top: '50%' }}><ArrowUpRight size={22} strokeWidth={2.2} /></div>
  </div>;
}
