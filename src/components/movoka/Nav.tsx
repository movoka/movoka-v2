import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLanguage, type Language } from "@/content/i18n";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Nav() {
  const {t:de,language,setLanguage}=useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    let previousY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 90 || y < previousY - 7) setVisible(true);
      else if (y > previousY + 7 && y > 130) setVisible(false);
      previousY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("movoka-theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,opacity,background-color,padding] duration-700 ease-out",
          !visible && !open && "-translate-y-full opacity-0 pointer-events-none",
          scrolled ? "glass border-b py-3" : "py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" aria-label="MOVOKA Startseite">
            <Logo className="h-8 w-[120px] md:h-9 md:w-[134px]" />
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {de.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <select value={language} onChange={(event)=>setLanguage(event.target.value as Language)} aria-label="Language / اللغة / Sprache" className="h-10 rounded-full border border-border bg-background px-2 text-xs font-semibold text-foreground outline-none focus:border-lime-ink">
              <option value="de">DE</option><option value="en">EN</option><option value="ar">AR</option>
            </select>
            <button onClick={toggle} aria-label="Farbmodus wechseln" className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:border-lime-ink">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setOpen(true)} aria-label="Menü öffnen" className="grid h-10 w-10 place-items-center rounded-full border md:hidden">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "grain fixed inset-0 z-[60] flex flex-col bg-background px-6 py-6 transition-all duration-700 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Logo className="h-8 w-[120px]" />
          <button onClick={() => setOpen(false)} aria-label="Menü schließen" className="grid h-10 w-10 place-items-center rounded-full border">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-auto mb-16 flex flex-col gap-2">
          {de.nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
              className={cn(
                "flex items-baseline gap-4 font-display text-5xl font-semibold transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <span className="font-sans text-xs text-lime-ink">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="glow-orb pointer-events-none absolute -bottom-40 -right-40 h-96 w-96" />
      </div>
    </>
  );
}
