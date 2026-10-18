import { forwardRef, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'kiwi' | 'outline';
  className?: string;
  arrow?: boolean;
};

const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, onClick, variant = 'kiwi', className = '', arrow = false },
  _ref
) {
  const magRef = useMagnetic<HTMLButtonElement>(0.3);

  const base =
    'magnetic-btn group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-300';
  const styles =
    variant === 'kiwi'
      ? 'bg-movoka-kiwi text-movoka-black hover:shadow-[0_0_40px_rgba(198,255,0,0.45)]'
      : 'border border-movoka-white/25 text-movoka-white hover:border-movoka-kiwi hover:text-movoka-kiwi';

  return (
    <button
      ref={magRef}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      )}
      {variant === 'outline' && (
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: '0 0 30px rgba(198,255,0,0.2) inset' }} />
      )}
    </button>
  );
});

export default MagneticButton;
