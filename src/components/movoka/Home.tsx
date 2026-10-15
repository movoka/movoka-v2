import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroDark from "@/assets/hero-stone.jpg";
import heroLight from "@/assets/hero-stone-light.jpg";
import { de, CONTACT_EMAIL, MAILTO } from "@/content/de";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

const mailto = MAILTO;

export function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      // Hero intro
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-logo", { opacity: 0, scale: 0.92, rotateX: 25, filter: "blur(12px)", duration: 1.8 })
        .from(".hero-line", { yPercent: 110, duration: 1.4, stagger: 0.12 }, "-=1.2")
        .from(".hero-fade", { opacity: 0, y: 20, duration: 1.2, stagger: 0.1 }, "-=1");

      // Hero parallax out
      gsap.to(".hero-bg", { yPercent: 18, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-content", { yPercent: -25, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      // Generic reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray<HTMLElement>(".reveal-lines").forEach((el) => {
        gsap.from(el.querySelectorAll(".line > span"), { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });

      // Services stagger with perspective
      gsap.from(".faq-item", { opacity: 0, y: 30, duration: 1.1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".faq-list", start: "top 85%" } });
      gsap.from(".service", { opacity: 0, y: 80, rotateX: -18, transformOrigin: "50% 0%", duration: 1.4, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ".services-grid", start: "top 80%" } });

      // Work cards: 3D tilt into place + inner parallax
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.fromTo(card, { rotateX: 14, y: 100, opacity: 0.2 }, { rotateX: 0, y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 100%", end: "top 45%", scrub: 1 } });
        const img = card.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // About statement word highlight
      gsap.fromTo(".about-word", { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true } });

      // Contact scale-in
      gsap.fromTo(".contact-panel", { scale: 0.88, borderRadius: "3rem" }, { scale: 1, borderRadius: "1.5rem", ease: "none", scrollTrigger: { trigger: ".contact-panel", start: "top 95%", end: "top 35%", scrub: true } });
    }, root);

    // Pointer-driven hero depth (desktop only)
    const hero = root.current?.querySelector<HTMLElement>(".hero");
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(".hero-logo", { rotateY: x * 10, rotateX: -y * 8, duration: 1.2, ease: "power3.out" });
      gsap.to(".hero-light", { x: x * 160, y: y * 120, duration: 1.6, ease: "power3.out" });
    };
    hero?.addEventListener("pointermove", onMove);
    return () => {
      hero?.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  const statementWords = de.about.statement.split(" ");

  return (
    <div ref={root} id="top" className="grain">
      <Nav />

      {/* HERO */}
      <section className="hero relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <img src={heroDark} alt="" width={1920} height={1088} className="hidden h-full w-full object-cover dark:block" />
          <img src={heroLight} alt="" width={1920} height={1088} className="block h-full w-full object-cover dark:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/25 to-background" />
          <div className="hero-sweep pointer-events-none absolute inset-0" />
        </div>
        <div className="hero-light glow-orb animate-drift pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2" />

        <div className="hero-content relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-28 pb-24 text-center [perspective:1200px]">
          <p className="hero-fade eyebrow mb-10">{de.hero.eyebrow}</p>
          <div className="hero-logo [transform-style:preserve-3d] drop-shadow-[0_0_35px_rgba(180,255,40,0.18)]">
            <Logo className="h-[24vw] max-h-48 w-[84vw] max-w-[720px]" />
          </div>
          <h1 className="mt-14 font-display text-[clamp(2.4rem,7vw,6.2rem)] font-semibold leading-[0.95] tracking-tight">
            <span className="block overflow-hidden pb-2"><span className="hero-line block">{de.hero.titleA}</span></span>
            <span className="block overflow-hidden pb-2"><span className="hero-line block font-serif font-normal italic text-metal">{de.hero.titleB}</span></span>
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-base text-muted-foreground md:text-lg">{de.hero.text}</p>
          <div className="hero-fade mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a href={mailto} className="btn-lime group">
              {de.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href="#arbeiten" className="btn-ghost-line">{de.hero.secondary}</a>
          </div>
        </div>

        <div className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="eyebrow">{de.hero.scroll}</span>
          <span className="relative h-12 w-px overflow-hidden bg-border">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[marquee_2s_ease-in-out_infinite] bg-lime" />
          </span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y py-6">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl text-muted-foreground md:text-4xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            de.services.items.map((s) => (
              <span key={`${k}-${s.n}`} className="flex items-center gap-12">
                {s.title}<span className="h-2 w-2 rounded-full bg-lime" />
              </span>
            )),
          )}
        </div>
      </div>

      {/* LEISTUNGEN */}
      <section id="leistungen" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow={de.services.eyebrow} a={de.services.title} b={de.services.titleAccent} />
          <p className="reveal max-w-sm text-muted-foreground">{de.services.intro}</p>
        </div>
        <div className="services-grid mt-20 grid gap-px overflow-hidden rounded-2xl border bg-border [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
          {de.services.items.map((s) => (
            <article key={s.n} className="service group relative overflow-hidden bg-card/80 p-8 transition-colors duration-700 hover:bg-card md:p-10">
              <div className="glow-orb pointer-events-none absolute -right-24 -top-24 h-64 w-64 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span className="font-sans text-xs tracking-[0.3em] text-lime-ink">{s.n}</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-lime-ink" />
              </div>
              <h3 className="mt-14 font-display text-2xl font-semibold transition-transform duration-700 group-hover:translate-x-2 md:text-3xl">{s.title}</h3>
              <p className="mt-4 max-w-sm text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ARBEITEN */}
      <section id="arbeiten" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow={de.work.eyebrow} a={de.work.title} b={de.work.titleAccent} />
            <p className="reveal max-w-xs text-sm text-muted-foreground">{de.work.note}</p>
          </div>
          <div className="mt-20 grid gap-10 [perspective:1600px] md:grid-cols-2 md:gap-12">
            {de.work.items.map((w, i) => (
              <figure key={w.title} className={`work-card group ${i % 2 === 1 ? "md:mt-32" : ""}`}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border shadow-[var(--shadow-soft)]">
                  <img src={w.src} alt={`${w.title} — ${w.tag}, ${w.label}`} loading="lazy" width={1536} height={1024} className="absolute inset-0 h-[116%] w-full -top-[8%] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
                  <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em]">{w.label}</span>
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between">
                  <span className="font-display text-xl font-semibold md:text-2xl">{w.title}</span>
                  <span className="text-sm text-muted-foreground">{w.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ÜBER */}
      <section id="studio" className="relative overflow-hidden py-28 md:py-44">
        <div className="glow-orb pointer-events-none absolute -left-40 top-1/3 h-[50vmin] w-[50vmin]" />
        <div className="relative mx-auto max-w-6xl px-5 md:px-10">
          <p className="reveal eyebrow">{de.about.eyebrow}</p>
          <p className="about-statement mt-10 font-display text-[clamp(1.9rem,5vw,4.4rem)] font-medium leading-[1.08] tracking-tight">
            {statementWords.map((w, i) => (
              <span key={i} className="about-word inline-block pr-[0.25em]">{w}</span>
            ))}
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <p className="reveal max-w-xl text-lg text-muted-foreground">{de.about.text}</p>
            <ul className="reveal flex flex-wrap gap-3">
              {de.about.values.map((v) => (
                <li key={v} className="rounded-full border px-5 py-2 text-sm">{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-5xl px-5 pb-28 md:px-10 md:pb-40">
        <SectionHead eyebrow={de.faq.eyebrow} a={de.faq.title} b={de.faq.titleAccent} />
        <Faq />
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="px-3 pb-10 md:px-6">
        <div className="contact-panel grain relative overflow-hidden rounded-3xl border bg-card px-6 py-24 text-center text-foreground shadow-[var(--shadow-soft)] dark:border-transparent dark:bg-obsidian dark:text-obsidian-foreground md:py-36">
          <img src={heroDark} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 hidden h-full w-full object-cover opacity-60 dark:block" />
          <img src={heroLight} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-80 dark:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-card/60 to-card/85 dark:from-obsidian/20 dark:via-obsidian/40 dark:to-obsidian/70" />
          <div className="glow-orb animate-drift pointer-events-none absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 opacity-60 dark:h-[70vmin] dark:w-[70vmin] dark:opacity-100" />
          <div className="relative">
            <p className="eyebrow">{de.contact.eyebrow}</p>
            <h2 className="reveal-lines mx-auto mt-8 max-w-4xl font-display text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-tight">
              <span className="line block overflow-hidden pb-2"><span className="block">{de.contact.title}</span></span>
              <span className="line block overflow-hidden pb-2"><span className="block font-serif font-normal italic text-metal">{de.contact.titleAccent}</span></span>
            </h2>
            <p className="reveal mx-auto mt-8 max-w-md text-muted-foreground dark:text-obsidian-foreground/75">{de.contact.text}</p>
            <a href={mailto} className="reveal btn-lime group mt-12">
              {de.contact.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <div className="reveal mt-10">
              <a href={mailto} className="group inline-flex flex-col items-center gap-3">
                <Logo variant="black" className="h-12 w-44 dark:hidden" />
                <Logo variant="white" className="hidden h-12 w-44 dark:inline-flex" />
                <span className="eyebrow">E-Mail</span>
                <span className="relative font-display text-xl font-medium tracking-tight md:text-2xl">
                  {CONTACT_EMAIL}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lime-ink transition-transform duration-700 group-hover:scale-x-100" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-7xl px-5 py-12 md:px-10">
        <div className="flex flex-col items-start gap-6 border-t pt-10 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-5"><Logo className="h-12 w-40" /><a href={mailto} className="font-display text-base font-medium transition-colors hover:text-lime-ink">{CONTACT_EMAIL}</a></div>
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-muted-foreground">
            <span className="text-xs">© {new Date().getFullYear()} MOVOKA</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, a, b }: { eyebrow: string; a: string; b: string }) {
  return (
    <div>
      <p className="reveal eyebrow">{eyebrow}</p>
      <h2 className="reveal-lines mt-6 font-display text-[clamp(2.2rem,5.5vw,4.8rem)] font-semibold leading-[0.98] tracking-tight">
        <span className="line block overflow-hidden pb-2"><span className="block">{a}</span></span>
        <span className="line block overflow-hidden pb-2"><span className="block font-serif font-normal italic text-metal">{b}</span></span>
      </h2>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list mt-16 border-t">
      {de.faq.items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="faq-item border-b">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-7 text-left"
            >
              <span className="font-display text-lg font-medium transition-colors duration-500 group-hover:text-lime-ink md:text-2xl">{f.q}</span>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? "rotate-45 border-lime-ink text-lime-ink" : ""}`}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
