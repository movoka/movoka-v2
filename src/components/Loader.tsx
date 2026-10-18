import { useEffect, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      // ease toward 100, never slower than a minimum step
      const step = Math.max((100 - p) * 0.04, 0.6);
      p = Math.min(100, p + step);
      setProgress(Math.floor(p));
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExit(true), 350);
        setTimeout(onDone, 1150);
      }
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-movoka-black transition-transform duration-700 ${
        exit ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
    >
      <div className="ambient-blob" style={{ width: 500, height: 500, background: '#C6FF00', top: '30%', left: '40%' }} />
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden">
          <h1
            className="font-display text-5xl font-bold tracking-tightest text-movoka-white md:text-7xl"
            style={{ transform: 'translateY(0)' }}
          >
            MOVOKA
          </h1>
        </div>
        <div className="mt-6 h-px w-56 overflow-hidden bg-movoka-white/10 md:w-72">
          <div
            className="h-full bg-movoka-kiwi transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(198,255,0,0.7)' }}
          />
        </div>
        <div className="mt-3 font-display text-xs tracking-[0.3em] text-movoka-white/40">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
