import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/movoka/Home";
import { LanguageProvider } from "@/content/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOVOKA — Digitale Erlebnisse, die bewegen." },
      { name: "description", content: "MOVOKA ist ein Digital Design Studio aus Deutschland für Webdesign, Webentwicklung, Relaunch, Domain-Einrichtung und geschäftliche E-Mail." },
      { property: "og:title", content: "MOVOKA — Digitale Erlebnisse, die bewegen." },
      { property: "og:description", content: "Außergewöhnliche Websites, die Design, Technologie und Emotion verbinden." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LanguageProvider><Home /></LanguageProvider>,
});
