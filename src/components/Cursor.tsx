import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setHidden(true);
      return;
    }

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [data-cursor="hover"], input, textarea'));
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-movoka-kiwi"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-movoka-kiwi/60 transition-[width,height,margin,opacity] duration-300"
        style={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          marginLeft: hovering ? -28 : -15,
          marginTop: hovering ? -28 : -15,
          opacity: hovering ? 1 : 0.6,
          backgroundColor: hovering ? 'rgba(198,255,0,0.08)' : 'transparent',
        }}
      />
    </>
  );
}
