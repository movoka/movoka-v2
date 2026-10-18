import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'EN' | 'DE' | 'AR';

type Copy = {
  nav: { links: string[]; cta: string };
  hero: { eyebrow: string; sub: string; primary: string; secondary: string; scroll: string };
  services: { kicker: string; title: string[]; sub: string; items: { title: string; desc: string }[] };
  projects: { kicker: string; title: string[]; sub: string; label: string };
  work: { kicker: string; title: string[]; sub: string; items: { category: string; description: string }[] };
  why: { kicker: string; title: string[]; features: string[] };
  process: { kicker: string; title: string[]; steps: { title: string; desc: string }[] };
  contact: { title: string[]; talk: string; sub: string; location: string; fields: { name: string; email: string; company: string; description: string }; placeholders: { name: string; email: string; company: string; description: string }; submit: string; sent: string; thanks: string; error: string; errors: { name: string; email: string; description: string } };
  footer: { description: string; navigation: string; legal: string; links: string[]; imprint: string; privacy: string; rights: string; designed: string };
};

const COPY: Record<Language, Copy> = {
  EN: {
    nav: { links: ['Start', 'Services', 'Work', 'About', 'Contact'], cta: 'Start a project' },
    hero: { eyebrow: 'Digital Agency · Germany', sub: 'We design digital experiences that engage, convince, and stay remembered.', primary: 'START A PROJECT', secondary: 'DISCOVER OUR WORK', scroll: 'Scroll' },
    services: { kicker: 'What we do', title: ['DIGITAL.', 'BOLD.', 'DIFFERENT.'], sub: 'Your vision. Our design.', items: [{ title: 'WEBSITE DESIGN', desc: 'Distinctive websites shaped around your brand.' }, { title: 'WEB DEVELOPMENT', desc: 'Fast, modern, and responsive digital solutions.' }, { title: 'BRAND IDENTITY', desc: 'Visual identities built for memorable brands.' }, { title: 'WEBSITE REDESIGN', desc: 'We turn outdated websites into modern experiences.' }] },
    projects: { kicker: 'Selected Work', title: ['SELECTED', 'WORK.', 'UNLIMITED CREATIVITY.'], sub: 'Concept designs — visualized as design demonstrations, not real client projects.', label: 'Concept design' },
    work: { kicker: 'Selected Work', title: ['IDEAS THAT', 'LAST.'], sub: 'Digital experiences for brands with a clear point of view. Four visual directions, one ambition: to leave an impression.', items: [{ category: 'Real estate · Architecture', description: 'A quiet digital stage for extraordinary places.' }, { category: 'Beauty · Luxury', description: 'A sensual brand experience with depth and character.' }, { category: 'Gastronomy · Concept', description: 'Cuisine, atmosphere, and movement in one presence.' }, { category: 'Automotive · Premium', description: 'Performance as a digital experience — precise and direct.' }] },
    why: { kicker: 'Why MOVOKA', title: ['YOUR', 'BRAND', 'DESERVES BETTER.'], features: ['Distinctive design', 'Mobile first', 'Modern technology', 'Fast loading', 'Personal support', 'Multilingual websites'] },
    process: { kicker: 'Process', title: ['FROM', 'IDEA', 'TO IMPACT.'], steps: [{ title: 'DISCOVER', desc: 'We understand your vision.' }, { title: 'DESIGN', desc: 'We develop a unique concept.' }, { title: 'DEVELOP', desc: 'We build your website with precision.' }, { title: 'LAUNCH', desc: 'Your digital presence goes live.' }] },
    contact: { title: ["LET'S MAKE", 'SOMETHING', 'EXTRAORDINARY.'], talk: "LET'S TALK", sub: 'Ready to create something extraordinary? Write to us — we reply within 24 hours.', location: 'Germany · Remote worldwide', fields: { name: 'Name', email: 'Email', company: 'Company (optional)', description: 'Project description' }, placeholders: { name: 'Your full name', email: 'you@email.com', company: 'Company name', description: 'Tell us about your project…' }, submit: 'Send message', sent: 'Message sent', thanks: 'Thank you! Your message arrived — we will be in touch soon.', error: 'Something went wrong. Please try again or write directly to info@movoka.de.', errors: { name: 'Please enter your name.', email: 'Please enter a valid email address.', description: 'Please describe your project (min. 10 characters).' } },
    footer: { description: 'Digital experiences beyond ordinary.', navigation: 'Navigation', legal: 'Legal', links: ['Services', 'Work', 'About', 'Contact'], imprint: 'Imprint', privacy: 'Privacy policy', rights: 'All rights reserved.', designed: 'Designed & built in Germany' },
  },
  DE: {
    nav: { links: ['Start', 'Leistungen', 'Projekte', 'Über uns', 'Kontakt'], cta: 'Projekt anfragen' },
    hero: { eyebrow: 'Digitalagentur · Deutschland', sub: 'Wir gestalten digitale Erlebnisse, die begeistern, überzeugen und im Gedächtnis bleiben.', primary: 'PROJEKT STARTEN', secondary: 'UNSERE ARBEIT ENTDECKEN', scroll: 'Scroll' },
    services: { kicker: 'Was wir machen', title: ['DIGITAL.', 'MUTIG.', 'ANDERS.'], sub: 'Deine Vision. Unser Design.', items: [{ title: 'WEBSITE DESIGN', desc: 'Individuelle Websites mit außergewöhnlichem Design.' }, { title: 'WEB DEVELOPMENT', desc: 'Moderne, schnelle und responsive Weblösungen.' }, { title: 'BRAND IDENTITY', desc: 'Einzigartige visuelle Identitäten für starke Marken.' }, { title: 'WEBSITE REDESIGN', desc: 'Wir verwandeln veraltete Websites in moderne digitale Erlebnisse.' }] },
    projects: { kicker: 'Ausgewählte Arbeiten', title: ['SELECTED', 'WORK.', 'UNBEGRENZTE KREATIVITÄT.'], sub: 'Konzept-Designs — visualisiert als Design-Demonstration, keine realen Kundenprojekte.', label: 'Konzept-Design' },
    work: { kicker: 'Ausgewählte Arbeiten', title: ['IDEEN, DIE', 'BLEIBEN.'], sub: 'Digitale Auftritte für Marken mit einer klaren Haltung. Vier visuelle Richtungen, ein Anspruch: Eindruck hinterlassen.', items: [{ category: 'Immobilien · Architektur', description: 'Eine ruhige digitale Bühne für außergewöhnliche Orte.' }, { category: 'Beauty · Luxury', description: 'Eine sinnliche Markenerfahrung mit Tiefe und Charakter.' }, { category: 'Gastronomie · Konzept', description: 'Kulinarik, Atmosphäre und Bewegung in einem Auftritt.' }, { category: 'Automotive · Premium', description: 'Performance als digitales Erlebnis — präzise und direkt.' }] },
    why: { kicker: 'Warum MOVOKA', title: ['YOUR', 'BRAND', 'DESERVES BETTER.'], features: ['Individuelles Design', 'Mobile First', 'Moderne Technologien', 'Schnelle Ladezeiten', 'Persönliche Betreuung', 'Mehrsprachige Websites'] },
    process: { kicker: 'Prozess', title: ['FROM', 'IDEA', 'TO IMPACT.'], steps: [{ title: 'DISCOVER', desc: 'Wir verstehen deine Vision.' }, { title: 'DESIGN', desc: 'Wir entwickeln ein einzigartiges Konzept.' }, { title: 'DEVELOP', desc: 'Wir setzen deine Website technisch um.' }, { title: 'LAUNCH', desc: 'Dein digitaler Auftritt geht online.' }] },
    contact: { title: ["LET'S MAKE", 'SOMETHING', 'EXTRAORDINARY.'], talk: "LET'S TALK", sub: 'Bereit, etwas Außergewöhnliches zu schaffen? Schreib uns — wir melden uns innerhalb von 24 Stunden.', location: 'Deutschland · Remote weltweit', fields: { name: 'Name', email: 'E-Mail', company: 'Unternehmen (optional)', description: 'Projektbeschreibung' }, placeholders: { name: 'Dein vollständiger Name', email: 'deine@email.de', company: 'Firmenname', description: 'Erzähl uns von deinem Projekt…' }, submit: 'Nachricht senden', sent: 'Nachricht gesendet', thanks: 'Danke! Deine Nachricht ist angekommen — wir melden uns bald.', error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib direkt an info@movoka.de.', errors: { name: 'Bitte gib deinen Namen ein.', email: 'Bitte gib eine gültige E-Mail-Adresse ein.', description: 'Bitte beschreibe dein Projekt (min. 10 Zeichen).' } },
    footer: { description: 'Digital experiences beyond ordinary.', navigation: 'Navigation', legal: 'Rechtliches', links: ['Leistungen', 'Projekte', 'Über uns', 'Kontakt'], imprint: 'Impressum', privacy: 'Datenschutz', rights: 'Alle Rechte vorbehalten.', designed: 'Designed & built in Deutschland' },
  },
  AR: {
    nav: { links: ['الرئيسية', 'خدماتنا', 'أعمالنا', 'من نحن', 'تواصل معنا'], cta: 'ابدأ مشروعك' },
    hero: { eyebrow: 'وكالة رقمية · ألمانيا', sub: 'نصمم تجارب رقمية تثير الاهتمام، تقنع الجمهور، وتبقى في الذاكرة.', primary: 'ابدأ مشروعًا', secondary: 'اكتشف أعمالنا', scroll: 'مرر' },
    services: { kicker: 'ماذا نقدم', title: ['رقمي.', 'جريء.', 'مختلف.'], sub: 'رؤيتك. تصميمنا.', items: [{ title: 'تصميم المواقع', desc: 'مواقع مميزة مصممة حول هوية علامتك.' }, { title: 'تطوير المواقع', desc: 'حلول رقمية سريعة وعصرية ومتجاوبة.' }, { title: 'الهوية البصرية', desc: 'هويات بصرية تُبنى للعلامات التي لا تُنسى.' }, { title: 'إعادة تصميم المواقع', desc: 'نحوّل المواقع القديمة إلى تجارب رقمية حديثة.' }] },
    projects: { kicker: 'أعمال مختارة', title: ['أعمال', 'مختارة.', 'إبداع بلا حدود.'], sub: 'تصاميم مفاهيمية — عروض بصرية وليست مشاريع عملاء حقيقية.', label: 'تصميم مفاهيمي' },
    work: { kicker: 'أعمال مختارة', title: ['أفكار', 'تبقى.'], sub: 'تجارب رقمية لعلامات تملك رؤية واضحة. أربع توجهات بصرية وطموح واحد: ترك أثر.', items: [{ category: 'عقارات · عمارة', description: 'مساحة رقمية هادئة لأماكن استثنائية.' }, { category: 'جمال · فخامة', description: 'تجربة علامة حسية بعمق وشخصية.' }, { category: 'مطاعم · مفهوم', description: 'مذاق وأجواء وحركة ضمن حضور واحد.' }, { category: 'سيارات · فخامة', description: 'الأداء كتجربة رقمية دقيقة ومباشرة.' }] },
    why: { kicker: 'لماذا MOVOKA', title: ['علامتك', 'تستحق', 'الأفضل.'], features: ['تصميم مميز', 'أولوية الهاتف', 'تقنيات عصرية', 'سرعة تحميل', 'متابعة شخصية', 'مواقع متعددة اللغات'] },
    process: { kicker: 'منهجية العمل', title: ['من', 'الفكرة', 'إلى الأثر.'], steps: [{ title: 'اكتشاف', desc: 'نفهم رؤيتك ونحولها إلى اتجاه واضح.' }, { title: 'تصميم', desc: 'نطور مفهومًا بصريًا فريدًا.' }, { title: 'تطوير', desc: 'نبني موقعك بدقة واهتمام.' }, { title: 'إطلاق', desc: 'تظهر علامتك الرقمية إلى العالم.' }] },
    contact: { title: ['لنصنع', 'شيئًا', 'استثنائيًا.'], talk: 'لنتحدث', sub: 'مستعد لصنع شيء استثنائي؟ اكتب لنا — سنرد خلال 24 ساعة.', location: 'ألمانيا · عن بُعد حول العالم', fields: { name: 'الاسم', email: 'البريد الإلكتروني', company: 'الشركة (اختياري)', description: 'وصف المشروع' }, placeholders: { name: 'اسمك الكامل', email: 'you@email.com', company: 'اسم الشركة', description: 'أخبرنا عن مشروعك…' }, submit: 'إرسال الرسالة', sent: 'تم إرسال الرسالة', thanks: 'شكرًا! وصلت رسالتك — سنتواصل معك قريبًا.', error: 'حدث خطأ. حاول مرة أخرى أو راسلنا مباشرة على info@movoka.de.', errors: { name: 'يرجى إدخال اسمك.', email: 'يرجى إدخال بريد إلكتروني صحيح.', description: 'يرجى وصف مشروعك (10 أحرف على الأقل).' } },
    footer: { description: 'تجارب رقمية تتجاوز المألوف.', navigation: 'التنقل', legal: 'قانوني', links: ['خدماتنا', 'أعمالنا', 'من نحن', 'تواصل معنا'], imprint: 'بيانات الشركة', privacy: 'الخصوصية', rights: 'جميع الحقوق محفوظة.', designed: 'صُمم وبُني في ألمانيا' },
  },
};

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; copy: Copy };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');
  const copy = useMemo(() => COPY[language], [language]);
  useEffect(() => {
    document.documentElement.lang = language === 'AR' ? 'ar' : language === 'DE' ? 'de' : 'en';
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, copy }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
