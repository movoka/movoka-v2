import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CONTACT_EMAIL, MAILTO, de } from "@/content/de";
import { Logo } from "./Logo";

/** Shared shell for legal pages (Impressum, Datenschutz). */
export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grain min-h-screen">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-6 md:px-10">
        <Link to="/" aria-label="Zur Startseite">
          <Logo className="h-8 w-[120px]" />
        </Link>
        <Link to="/" className="btn-ghost-line !px-5 !py-2.5 text-sm">
          <ArrowLeft className="h-4 w-4" /> Startseite
        </Link>
      </header>
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-12 md:px-10 md:pt-20">
        <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-none tracking-tight">{title}</h1>
        <div className="legal mt-12 space-y-8 text-muted-foreground [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-lime-ink [&_a]:underline-offset-4">
          {children}
        </div>
      </main>
      <footer className="mx-auto max-w-4xl px-5 pb-12 md:px-10">
        <div className="flex flex-col gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:justify-between">
          <a href={MAILTO} className="text-foreground hover:text-lime-ink">{CONTACT_EMAIL}</a>
          <div className="flex gap-8">
            {de.footer.legal.map((l) => <Link key={l.to} to={l.to} className="hover:text-foreground">{l.label}</Link>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

/** Clearly marked placeholder the owner must fill in before publishing. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="rounded bg-accent/30 px-1.5 py-0.5 font-medium text-foreground">[{children}]</span>;
}
