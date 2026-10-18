import { type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  kicker?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ kicker, children, className = '', align = 'left' }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {kicker && (
        <div className="reveal-line mb-5">
          <span className="reveal-inner font-display text-xs uppercase tracking-[0.35em] text-movoka-kiwi">
            {kicker}
          </span>
        </div>
      )}
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-movoka-white md:text-6xl lg:text-7xl">
        {children}
      </h2>
    </div>
  );
}

/** Helper to wrap words that should glow kiwi. */
export function Kiwi({ children }: { children: ReactNode }) {
  return <span className="text-movoka-kiwi text-glow">{children}</span>;
}

/** Splits a string into per-word reveal spans. */
export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="reveal-line mr-[0.25em]">
          <span className={`reveal-inner ${className}`}>{w}</span>
        </span>
      ))}
    </>
  );
}
