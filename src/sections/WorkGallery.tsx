import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading, { Kiwi, RevealText } from '@/components/SectionHeading';
import { useLanguage } from '@/lib/i18n';

type Work = {
  n: string;
  title: string;
  category: string;
  description: string;
  image: string;
  accent: string;
};

const WORKS: Work[] = [
  {
    n: '01',
    title: 'AURA RESIDENCE',
    category: '',
    description: '',
    image: '/images/work/8C914318-FDC5-4276-B385-4D7151EE57EE.PNG',
    accent: '#C7A778',
  },
  {
    n: '02',
    title: 'ESSENZ',
    category: '',
    description: '',
    image: '/images/work/9606225E-B3E7-4362-98F0-79CDCFFB80A5.PNG',
    accent: '#D28A3C',
  },
  {
    n: '03',
    title: 'STUDIO 03',
    category: '',
    description: '',
    image: '/images/work/BDDD367E-7401-468C-ADF9-08D0259F3DAF.PNG',
    accent: '#B84A42',
  },
  {
    n: '04',
    title: 'FAHRKULTUR',
    category: '',
    description: '',
    image: '/images/work/D30D6E26-FF03-4752-8030-6736F6976D08.PNG',
    accent: '#55D8F5',
  },
];

export default function WorkGallery() {
  const { copy } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const scrollBy = (direction: number) => {
    trackRef.current?.scrollBy({
      left: direction * (trackRef.current.clientWidth * 0.78),
      behavior: 'smooth',
    });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  };

  return (
    <section id="arbeiten" className="relative overflow-hidden bg-movoka-black py-28 md:py-40">
      <div
        className="ambient-blob"
        style={{ width: 520, height: 520, top: '24%', right: '-12%', background: '#C6FF00', opacity: 0.08 }}
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading kicker={copy.work.kicker}>
            <RevealText text={copy.work.title[0]} /> <Kiwi><RevealText text={copy.work.title[1]} /></Kiwi>
          </SectionHeading>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-movoka-white/20 text-movoka-white transition-colors hover:border-movoka-kiwi hover:text-movoka-kiwi"
              aria-label="Vorherige Arbeit"
            >
              <span className="text-lg">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-movoka-white/20 text-movoka-white transition-colors hover:border-movoka-kiwi hover:text-movoka-kiwi"
              aria-label="Nächste Arbeit"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-movoka-white/50 md:text-base">
          {copy.work.sub}
        </p>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 md:mt-16 md:gap-8"
          style={{ scrollbarWidth: 'none' }}
        >
          {WORKS.map((work, index) => <WorkCard key={work.n} work={{ ...work, ...copy.work.items[index] }} />)}
        </div>

        <div className="mt-4 flex items-center gap-5">
          <div className="h-px flex-1 bg-movoka-white/10">
            <div
              className="h-full bg-movoka-kiwi transition-[width] duration-200"
              style={{ width: `${Math.max(10, progress * 100)}%`, boxShadow: '0 0 12px rgba(198,255,0,0.6)' }}
            />
          </div>
          <span className="font-display text-xs tracking-[0.2em] text-movoka-white/35">04 / 04</span>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work }: { work: Work }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  };

  const resetCard = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)';
    setHovered(false);
  };

  return (
    <article className="group w-[88vw] shrink-0 snap-start sm:w-[620px] md:w-[720px]">
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={resetCard}
        className="relative overflow-hidden rounded-2xl border border-movoka-white/10 bg-movoka-carbon p-3 transition-transform duration-300 ease-out md:p-4"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-movoka-titanium">
          <img
            src={work.image}
            alt={`${work.title} — ${work.category}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-movoka-black/85 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle at 70% 20%, ${work.accent}35, transparent 38%)` }}
          />
          <div className="absolute left-5 top-5 flex items-center gap-3 md:left-7 md:top-7">
            <span className="font-display text-xs tracking-[0.25em] text-movoka-white/80">MOVOKA</span>
            <span className="h-px w-8 bg-movoka-white/40" />
            <span className="font-display text-xs tracking-[0.2em] text-movoka-white/60">{work.n}</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-5 px-2 pb-2 pt-6 md:px-3 md:pb-3 md:pt-7">
          <div>
            <p className="mb-2 font-display text-[10px] uppercase tracking-[0.22em]" style={{ color: work.accent }}>
              {work.category}
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tightest text-movoka-white md:text-4xl">
              {work.title}
            </h3>
            <p className="mt-2 max-w-md font-sans text-sm leading-6 text-movoka-white/45 md:text-base">
              {work.description}
            </p>
          </div>
          <div
            className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
            style={{ borderColor: hovered ? work.accent : 'rgba(245,245,240,0.16)', color: hovered ? work.accent : '#F5F5F0' }}
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </article>
  );
}
