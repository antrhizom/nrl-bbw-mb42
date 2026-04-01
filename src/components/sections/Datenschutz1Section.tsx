"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function Datenschutz1Section() {
  const { markComplete } = useMerkblatt();
  const sectionId = "datenschutz-1";
  const flipCards = [
    { title: "Im Unterricht", description: "Lernprofile (Fortschritt, Resultate) sind erlaubt. Persönlichkeitsprofile (Charakter, Verhalten, Vorlieben) nicht. Statistiken nicht vor der Klasse zeigen." },
    { title: "Einwilligung & besondere Daten", description: "Ab 14 Jahren eigenständige Einwilligung (z.B. für Fotos). Besondere Personendaten mindestens vertraulich einstufen." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 5" title="Datenschutz – Grundlagen & Unterricht">
      <p className="text-gray-700 leading-relaxed">
        <InfoTerm>Datenschutz</InfoTerm> schützt Personen vor missbräuchlicher
        Datenverwendung. Im Schulalltag betrifft das den Umgang mit
        Lernendendaten, den Einsatz von Lerntechnologien und die Frage,
        welche Informationen wie und wo weitergegeben werden dürfen.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Keine Veröffentlichung von Aufnahmen (Bild, Ton, Video) ohne ausdrückliche Einwilligung der betroffenen Personen.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
      <RoleAccordion roles="Lehrpersonen & Mitarbeitende">
        Lernende sind regelmässig zu datenschutzrechtlichen Themen zu sensibilisieren.
        Beachten Sie die drei Schutzstufen: Sachdaten (öffentlich/intern), Personendaten (vertraulich)
        und besondere Personendaten (streng vertraulich). Dokumente mit Personendaten oder besonderen
        Personendaten sollten in der Regel nur auf der Verwaltungsebene oder im LIS abgelegt werden.
        Die detaillierten Tabellen finden Sie in der vollständigen NRL.
      </RoleAccordion>
    </SectionCard>
  );
}
