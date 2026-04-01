"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import RoleAccordion from "@/components/RoleAccordion";

export default function Datenschutz2Section() {
  const { markComplete } = useMerkblatt();
  const sectionId = "datenschutz-2";
  const flipCards = [
    { title: "KI & Lerntechnologien", description: "Keine persönlichen/vertraulichen Daten in KI-Tools. Freiwilligkeit bei Registration, ausser bei regulären BBW-Angeboten." },
    { title: "Aufnahmen", description: "Aufnahmen jeglicher Art (Bild, Ton, Video) nur mit ausdrücklichem Einverständnis der betroffenen Personen." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 6" title="Datenschutz – KI & Aufnahmen">
      <p className="text-gray-700 leading-relaxed">
        KI-Tools und Aufnahmen erfordern besonderen Umgang mit Daten.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Sie müssen sich nicht bei KI-Tools oder digitalen Lerntechnologien registrieren, wenn diese nicht zum Angebot der Schule gehören.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
      <RoleAccordion roles="Lehrpersonen & Mitarbeitende">
        Geben Sie keine Schuldaten in KI-Tools ein. Die Anmeldung bei KI-Tools darf nicht erzwungen werden.
      </RoleAccordion>
    </SectionCard>
  );
}
