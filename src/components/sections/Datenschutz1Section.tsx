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
    { title: "Im Unterricht", description: "Lernprofile erlaubt, Persönlichkeitsprofile nicht. Statistiken nicht vor der Klasse zeigen." },
    { title: "Einwilligung & besondere Daten", description: "Ab 14 Jahren eigenständige Einwilligung (z.B. für Fotos). Besondere Personendaten mindestens vertraulich einstufen." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 4" title="Datenschutz – Grundlagen & Unterricht">
      <p className="text-gray-700 leading-relaxed">
        <InfoTerm>Datenschutz</InfoTerm> schützt Personen vor missbräuchlicher Datenverwendung.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Lerntechnologien müssen datenschutzkonform sein.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
      <RoleAccordion roles="Lehrpersonen">
        Lernende sind regelmässig zu datenschutzrechtlichen Themen zu sensibilisieren. Lerntechnologien müssen datenschutzkonform sein.
      </RoleAccordion>
    </SectionCard>
  );
}
