import { useLanguage } from '@/lib/i18n';
import { scrollToId } from '@/hooks/useLenis';

export default function Footer() {
  const { copy } = useLanguage();
  const links = [
    { id: 'leistungen', label: copy.footer.links[0] },
    { id: 'projekte', label: copy.footer.links[1] },
    { id: 'ueber-uns', label: copy.footer.links[2] },
    { id: 'kontakt', label: copy.footer.links[3] },
  ];

  return (
    <footer className="relative w-full border-t border-movoka-white/10 bg-movoka-black px-4 py-16 md:px-8">
      <div className="ambient-blob" style={{ width: 400, height: 400, background: '#C6FF00', bottom: '-20%', left: '40%', opacity: 0.08 }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end">
          <div>
            <div className="font-display text-3xl font-bold tracking-tightest text-movoka-white">MOVOKA<span className="text-movoka-kiwi">.</span></div>
            <p className="mt-3 max-w-xs font-sans text-sm text-movoka-white/45">{copy.footer.description}</p>
          </div>
          <div>
            <div className="font-display text-xs uppercase tracking-[0.2em] text-movoka-white/40">{copy.footer.navigation}</div>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              {links.map((link) => <li key={link.id}><button onClick={() => scrollToId(link.id)} className="text-movoka-white/60 transition-colors hover:text-movoka-kiwi">{link.label}</button></li>)}
            </ul>
          </div>
          <div className="md:text-right">
            <a href="mailto:info@movoka.de" className="font-display text-lg text-movoka-white transition-colors hover:text-movoka-kiwi">info@movoka.de</a>
          </div>
        </div>
        <div className="mt-12 border-t border-movoka-white/10 pt-6">
          <p className="font-sans text-xs text-movoka-white/40">© 2026 MOVOKA. {copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
