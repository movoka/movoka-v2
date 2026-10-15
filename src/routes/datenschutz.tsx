import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, Placeholder } from "@/components/movoka/LegalLayout";
import { CONTACT_EMAIL, MAILTO } from "@/content/de";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — MOVOKA" },
      { name: "description", content: "Informationen zur Verarbeitung personenbezogener Daten auf der Website von MOVOKA." },
      { property: "og:title", content: "Datenschutzerklärung — MOVOKA" },
      { property: "og:description", content: "Wie MOVOKA beim Besuch dieser Website mit Daten umgeht." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p>Diese Erklärung beschreibt die auf dieser Website tatsächlich eingesetzten Technologien. Bitte lassen Sie sie vor der Veröffentlichung rechtlich prüfen; markierte Angaben sind Platzhalter.</p>
      <section>
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          <Placeholder>Name / Firmenname</Placeholder><br />
          <Placeholder>Anschrift</Placeholder><br />
          E-Mail: <a href={MAILTO}>{CONTACT_EMAIL}</a>
        </p>
      </section>
      <section>
        <h2>2. Hosting und Server-Logdaten</h2>
        <p>Beim Aufruf der Website werden durch den Hosting-Anbieter technisch notwendige Daten verarbeitet (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp), um die Website auszuliefern und ihre Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
        <p>Hosting-Anbieter: <Placeholder>Name und Anschrift des Hosting-Anbieters</Placeholder></p>
      </section>
      <section>
        <h2>3. Schriftarten (Google Fonts)</h2>
        <p>Diese Website lädt Schriftarten von Servern der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dabei wird Ihre IP-Adresse an Google übermittelt; eine Übermittlung in die USA ist nicht auszuschließen. Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Datenschutzerklärung von Google</a>.</p>
      </section>
      <section>
        <h2>4. Lokale Speicherung der Farbeinstellung</h2>
        <p>Wenn Sie zwischen hellem und dunklem Design wechseln, wird diese Einstellung ausschließlich in Ihrem Browser (Local Storage) gespeichert. Sie wird nicht an uns übertragen und dient nur der Darstellung. Es werden keine Analyse- oder Marketing-Cookies eingesetzt.</p>
      </section>
      <section>
        <h2>5. Kontakt per E-Mail</h2>
        <p>Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
      </section>
      <section>
        <h2>6. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.</p>
      </section>
      <p className="text-sm">Stand: <Placeholder>Datum</Placeholder></p>
    </LegalLayout>
  );
}
