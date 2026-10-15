import k1 from "@/assets/konzept-01.jpg";
import k2 from "@/assets/konzept-02.jpg";
import k3 from "@/assets/konzept-03.jpg";
import k4 from "@/assets/konzept-04.jpg";

/** Official contact address — used for every contact action. */
export const CONTACT_EMAIL = "info@movoka.de";
export const MAILTO = `mailto:${CONTACT_EMAIL}`;

export const de = {
  nav: [
    { id: "leistungen", label: "Leistungen" },
    { id: "arbeiten", label: "Arbeiten" },
    { id: "studio", label: "Studio" },
    { id: "kontakt", label: "Kontakt" },
  ],
  hero: {
    eyebrow: "Digital Design Studio · Deutschland",
    titleA: "Digitale Erlebnisse,",
    titleB: "die bewegen.",
    text: "Wir gestalten außergewöhnliche Websites, die Design, Technologie und Emotion verbinden.",
    cta: "Projekt anfragen",
    secondary: "Arbeiten ansehen",
    scroll: "Scrollen",
  },
  services: {
    eyebrow: "Leistungen",
    title: "Website und E-Mail.",
    titleAccent: "Alles aus einer Hand.",
    intro: "Von der Gestaltung über die Umsetzung bis zur eigenen Domain und geschäftlichen E-Mail-Adresse — wir begleiten Ihren digitalen Auftritt vollständig.",
    items: [
      { n: "01", title: "Webdesign", text: "Professionelle Gestaltung, die Ihre Marke klar, eigenständig und hochwertig im Web präsentiert." },
      { n: "02", title: "Webentwicklung", text: "Saubere, schnelle Umsetzung mit modernen Technologien — zuverlässig und gut wartbar." },
      { n: "03", title: "Responsive Design", text: "Jedes Layout wird für Smartphone, Tablet und Desktop sorgfältig abgestimmt." },
      { n: "04", title: "Website-Relaunch", text: "Wir modernisieren bestehende Websites in Design, Technik und Struktur." },
      { n: "05", title: "Domain-Einrichtung", text: "Wir richten Ihre Domain ein und verbinden sie zuverlässig mit Ihrer Website." },
      { n: "06", title: "Geschäftliche E-Mail", text: "Professionelle E-Mail-Adressen mit Ihrer eigenen Domain — eingerichtet und startklar." },
    ],
  },
  work: {
    eyebrow: "Unsere Arbeiten",
    title: "Designkonzepte,",
    titleAccent: "die Haltung zeigen.",
    note: "Designstudien — keine Kundenaufträge.",
    items: [
      { src: k1, title: "Studio 01", tag: "Architektur & Immobilien", label: "Designkonzept" },
      { src: k2, title: "Studio 02", tag: "Parfum & Luxus", label: "Designkonzept" },
      { src: k3, title: "Studio 03", tag: "Gastronomie", label: "Designkonzept" },
      { src: k4, title: "Studio 04", tag: "Automobile", label: "Designkonzept" },
    ],
  },
  about: {
    eyebrow: "Über MOVOKA",
    statement: "Wir glauben, dass eine Website nicht nur informieren, sondern berühren sollte.",
    text: "MOVOKA ist ein Digital Design Studio aus Deutschland. Wir verbinden präzises Design mit moderner Technik und schaffen Websites, die ruhig wirken, klar führen und lange in Erinnerung bleiben.",
    values: ["Reduktion", "Präzision", "Bewegung"],
  },
  contact: {
    eyebrow: "Projekt anfragen",
    title: "Lassen Sie uns",
    titleAccent: "etwas Besonderes bauen.",
    text: "Erzählen Sie uns von Ihrem Vorhaben. Wir melden uns persönlich bei Ihnen.",
    cta: "Projekt anfragen",
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Kurz",
    titleAccent: "beantwortet.",
    items: [
      { q: "Wie lange dauert die Erstellung einer Website?", a: "Das hängt vom Umfang, den Inhalten und dem gewünschten Funktionsumfang ab. Nach einem ersten Gespräch erhalten Sie von uns eine realistische Einschätzung für Ihr Projekt." },
      { q: "Ist meine Website auch für Smartphones optimiert?", a: "Ja. Jede Website wird für Smartphone, Tablet und Desktop gestaltet und auf allen Bildschirmgrößen sorgfältig geprüft." },
      { q: "Übernimmt MOVOKA auch Domain und geschäftliche E-Mail?", a: "Ja. Wir unterstützen Sie bei der Einrichtung Ihrer Domain, verbinden sie mit Ihrer Website und richten geschäftliche E-Mail-Adressen mit Ihrer Domain ein." },
      { q: "Kann meine Website später erweitert werden?", a: "Ja. Wir bauen Websites so auf, dass neue Seiten, Inhalte oder Funktionen später ergänzt werden können." },
    ],
  },
  footer: {
    legal: [
      { to: "/impressum", label: "Impressum" },
      { to: "/datenschutz", label: "Datenschutzerklärung" },
    ],
  },
};

export type Content = typeof de;
