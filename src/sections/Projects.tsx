import { useRef } from 'react';
import SectionHeading, { Kiwi, RevealText } from '@/components/SectionHeading';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

type Project = {
  n: string;
  name: string;
  tag: string;
  desc: string;
  accent: string;
  bg: string;
  mockup: 'desktop' | 'mobile';
};

const PROJECTS: Project[] = [
  {
    n: '01',
    name: 'AURA',
    tag: '',
    desc: '',
    accent: '#C6FF00',
    bg: 'linear-gradient(135deg, #0B0D0A 0%, #1B1E19 100%)',
    mockup: 'desktop',
  },
  {
    n: '02',
    name: 'VELOCITY',
    tag: '',
    desc: '',
    accent: '#B9FF28',
    bg: 'linear-gradient(135deg, #050505 0%, #0B0D0A 100%)',
    mockup: 'desktop',
  },
  {
    n: '03',
    name: 'NOIR',
    tag: '',
    desc: '',
    accent: '#C6FF00',
    bg: 'linear-gradient(135deg, #1B1E19 0%, #050505 100%)',
    mockup: 'mobile',
  },
];

export default function Projects() {
  const { copy } = useLanguage();
  return (
    <section id="projekte" className="relative w-full bg-movoka-carbon py-28 md:py-40">
      <div className="ambient-blob" style={{ width: 500, height: 500, background: '#C6FF00', top: '40%', left: '-10%', opacity: 0.1 }} />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading kicker={copy.projects.kicker}>
          <RevealText text={copy.projects.title[0]} /> <Kiwi><RevealText text={copy.projects.title[1]} /></Kiwi>
          <br />
          <RevealText text={copy.projects.title[2]} />
        </SectionHeading>

        <div className="mt-6 max-w-lg font-sans text-sm text-movoka-white/45 md:text-base">
          <span className="reveal-line"><span className="reveal-inner">
            {copy.projects.sub}
          </span></span>
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.n} project={{ ...p, tag: copy.work.items[i].category, desc: copy.work.items[i].description }} flip={i % 2 === 1} label={copy.projects.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, flip, label }: { project: Project; flip: boolean; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || window.innerWidth < 768) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const onLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)';
    }
  };

  return (
    <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 ${flip ? 'md:[direction:rtl]' : ''}`}>
      {/* Visual */}
      <div className="md:col-span-7 [direction:ltr]">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative overflow-hidden rounded-2xl border border-movoka-white/10 p-6 transition-transform duration-300 ease-out md:p-10"
          style={{ background: project.bg, transformStyle: 'preserve-3d' }}
        >
          {/* glow */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
            style={{ background: `radial-gradient(400px circle at 50% 0%, ${project.accent}22, transparent 60%)` }} />

          {project.mockup === 'desktop' ? (
            <DesktopMockup project={project} />
          ) : (
            <MobileMockup project={project} />
          )}
        </div>
      </div>

      {/* Text */}
      <div className="md:col-span-5 [direction:ltr]">
        <div className="font-display text-6xl font-bold text-movoka-white/10 md:text-8xl">{project.n}</div>
        <h3 className="-mt-6 font-display text-4xl font-bold tracking-tightest text-movoka-white md:text-6xl">
          {project.name}
        </h3>
        <p className="mt-3 font-display text-sm uppercase tracking-[0.2em] text-movoka-kiwi">
          {project.tag}
        </p>
        <p className="mt-5 max-w-md font-sans text-sm text-movoka-white/60 md:text-base">
          {project.desc}
        </p>
        <div className="mt-7 inline-flex items-center gap-2 font-display text-sm text-movoka-white/50">
          <span>{label}</span>
          <ExternalLink size={14} />
        </div>
      </div>
    </div>
  );
}

function DesktopMockup({ project }: { project: Project }) {
  return (
    <div className="relative" style={{ transform: 'translateZ(40px)' }}>
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 rounded-t-lg bg-movoka-black/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-movoka-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-movoka-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-movoka-white/20" />
        <span className="ml-3 h-3 flex-1 rounded bg-movoka-white/5" />
      </div>
      {/* screen content */}
      <div className="relative aspect-[16/10] rounded-b-lg bg-movoka-black p-6 md:p-8"
        style={{ boxShadow: `0 30px 80px -20px ${project.accent}30` }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-bold" style={{ color: project.accent }}>
              {project.name}
            </div>
            <div className="hidden gap-4 md:flex">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-2 w-10 rounded bg-movoka-white/15" />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-1 flex-col justify-center">
            <div className="h-3 w-2/3 rounded bg-movoka-white/25" />
            <div className="mt-3 h-3 w-1/2 rounded" style={{ background: `${project.accent}80` }} />
            <div className="mt-6 h-2 w-1/3 rounded bg-movoka-white/10" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video rounded-md bg-movoka-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup({ project }: { project: Project }) {
  return (
    <div className="flex justify-center" style={{ transform: 'translateZ(40px)' }}>
      <div className="relative h-[420px] w-[210px] rounded-[2rem] border-[6px] border-movoka-titanium bg-movoka-black p-3"
        style={{ boxShadow: `0 30px 80px -20px ${project.accent}40` }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-movoka-titanium" />
        <div className="flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-movoka-black">
          <div className="flex items-center justify-between px-3 pt-6">
            <div className="font-display text-xs font-bold" style={{ color: project.accent }}>
              {project.name}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="h-0.5 w-3 bg-movoka-white/40" />
              <span className="h-0.5 w-3 bg-movoka-white/40" />
            </div>
          </div>
          <div className="mt-6 px-3">
            <div className="h-2.5 w-5/6 rounded bg-movoka-white/25" />
            <div className="mt-2 h-2.5 w-3/5 rounded" style={{ background: `${project.accent}80` }} />
          </div>
          <div className="mt-5 flex-1 px-3">
            <div className="aspect-square rounded-xl bg-movoka-white/5" />
          </div>
          <div className="px-3 pb-5">
            <div className="h-7 w-full rounded-full" style={{ background: project.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}
