import { useEffect, useState } from 'react';
import { ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { scrollToId } from '@/hooks/useLenis';
import { useLanguage, type Language } from '@/lib/i18n';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'AR', label: 'العربية' },
];

export default function Navigation() {
  const { language, setLanguage, copy } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [active, setActive] = useState('start');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = window.scrollY + window.innerHeight / 3;
      let current = 'start';
      for (const id of ['start', 'leistungen', 'projekte', 'ueber-uns', 'kontakt']) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
  };

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-[200] transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <nav className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? 'glass' : 'bg-transparent'}`}>
            <button onClick={() => go('start')} className="font-display text-xl font-bold tracking-tightest text-movoka-white">
              MOVOKA<span className="text-movoka-kiwi">.</span>
            </button>

            <ul className="hidden items-center gap-1 md:flex">
              {copy.nav.links.map((label, index) => {
                const id = ['start', 'leistungen', 'projekte', 'ueber-uns', 'kontakt'][index];
                return <li key={id}><button onClick={() => go(id)} className={`relative rounded-full px-4 py-2 font-display text-sm transition-colors ${active === id ? 'text-movoka-kiwi' : 'text-movoka-white/70 hover:text-movoka-white'}`}>{label}{active === id && <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-movoka-kiwi/30 blur-[2px]" />}</button></li>;
              })}
            </ul>

            <div className="hidden items-center gap-3 md:flex">
              <LanguageMenu language={language} open={languageOpen} onToggle={() => setLanguageOpen((current) => !current)} onChoose={chooseLanguage} />
              <button onClick={() => go('kontakt')} className="magnetic-btn rounded-full bg-movoka-kiwi px-5 py-2.5 font-display text-sm font-medium text-movoka-black transition-shadow hover:shadow-[0_0_30px_rgba(198,255,0,0.4)]">{copy.nav.cta} <span className="ml-1">↗</span></button>
            </div>

            <button onClick={() => setOpen((current) => !current)} className="text-movoka-white md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</button>
          </nav>
        </div>
      </header>

      <div className={`fixed inset-0 z-[199] flex flex-col bg-movoka-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="flex flex-1 flex-col justify-center gap-2 px-8">
          {copy.nav.links.map((label, index) => <button key={label} onClick={() => go(['start', 'leistungen', 'projekte', 'ueber-uns', 'kontakt'][index])} className="text-left font-display text-4xl font-bold text-movoka-white transition-all duration-500" style={{ transform: open ? 'translateY(0)' : 'translateY(30px)', opacity: open ? 1 : 0, transitionDelay: `${index * 60 + 100}ms` }}><span className="mr-3 text-base text-movoka-kiwi/50">0{index + 1}</span>{label}</button>)}
        </div>
        <div className="space-y-5 px-8 pb-12">
          <div className="flex items-center gap-2">{LANGUAGES.map((item) => <button key={item.code} type="button" onClick={() => chooseLanguage(item.code)} className={`rounded-full border px-4 py-2 font-display text-xs transition-colors ${language === item.code ? 'border-movoka-kiwi bg-movoka-kiwi text-movoka-black' : 'border-movoka-white/20 text-movoka-white/60'}`}>{item.code}</button>)}</div>
          <button onClick={() => go('kontakt')} className="w-full rounded-full bg-movoka-kiwi py-4 text-center font-display font-medium text-movoka-black">{copy.nav.cta} ↗</button>
        </div>
      </div>
    </>
  );
}

function LanguageMenu({ language, open, onToggle, onChoose }: { language: Language; open: boolean; onToggle: () => void; onChoose: (language: Language) => void }) {
  return <div className="relative"><button type="button" onClick={onToggle} aria-label="Choose language" aria-expanded={open} className="flex items-center gap-2 rounded-full px-3 py-2 font-display text-xs tracking-[0.16em] text-movoka-white/70 transition-colors hover:text-movoka-white"><Globe2 size={15} strokeWidth={1.5} />{language}<ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} /></button><div className={`absolute right-0 top-[calc(100%+12px)] w-36 origin-top-right rounded-2xl border border-movoka-white/10 bg-movoka-carbon p-2 shadow-2xl transition-all ${open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}>{LANGUAGES.map((item) => <button key={item.code} type="button" onClick={() => onChoose(item.code)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-display text-xs transition-colors ${language === item.code ? 'bg-movoka-kiwi text-movoka-black' : 'text-movoka-white/65 hover:bg-movoka-white/5 hover:text-movoka-white'}`}><span>{item.label}</span><span>{item.code}</span></button>)}</div></div>;
}
