import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, Placeholder } from "@/components/movoka/LegalLayout";
import { CONTACT_EMAIL, MAILTO } from "@/content/de";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — MOVOKA" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung von MOVOKA." },
      { property: "og:title", content: "Impressum — MOVOKA" },
      { property: "og:description", content: "Anbieterkennzeichnung von MOVOKA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <p>Die markierten Angaben in eckigen Klammern sind Platzhalter und müssen vor der Veröffentlichung vervollständigt werden.</p>
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <Placeholder>Name / Firmenname und Rechtsform</Placeholder><br />
          <Placeholder>Straße und Hausnummer</Placeholder><br />
          <Placeholder>PLZ und Ort</Placeholder>
        </p>
      </section>
      <section>
        <h2>Vertreten durch</h2>
        <p><Placeholder>Vertretungsberechtigte Person(en)</Placeholder></p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>E-Mail: <a href={MAILTO}>{CONTACT_EMAIL}</a></p>
      </section>
      <section>
        <h2>Registereintrag</h2>
        <p><Placeholder>Registergericht und Registernummer — falls vorhanden</Placeholder></p>
      </section>
      <section>
        <h2>Umsatzsteuer-ID</h2>
        <p><Placeholder>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG — falls vorhanden</Placeholder></p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p><Placeholder>Name und Anschrift — falls erforderlich</Placeholder></p>
      </section>
    </LegalLayout>
  );
}
