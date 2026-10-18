import { useEffect, useRef } from 'react';

/**
 * Reveals an element's children with `.reveal-line > .reveal-inner` markup
 * when it enters the viewport. Uses GSAP for staggered mask-up animation.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = Array.from(el.querySelectorAll<HTMLElement>('.reveal-inner'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inners.forEach((inner, i) => {
              setTimeout(() => inner.classList.add('is-visible'), i * 90);
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
