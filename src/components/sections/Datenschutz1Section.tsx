"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import InfoTerm from "@/components/InfoTerm";

export default function Datenschutz1Section() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "datenschutz-1";
  const flipCards = [
    { title: "Datenschutzprinzipien", description: "Datensparsamkeit, Zweckbindung, Transparenz, Verhältnismässigkeit. Lernende regelmässig sensibilisieren." },
    { title: "Im Unterricht", description: "Lernprofile erlaubt, Persönlichkeitsprofile nicht. Statistiken nicht vor der Klasse zeigen. Ab 14 Jahren eigenständige Einwilligung." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 4" title="Datenschutz – Grundlagen & Unterricht">
      <p className="text-gray-700 leading-relaxed">
        <InfoTerm>Datenschutz</InfoTerm> schützt Personen vor missbräuchlicher Datenverwendung.
        Zentrale Prinzipien: <InfoTerm>Datensparsamkeit</InfoTerm>, <InfoTerm>Zweckbindung</InfoTerm>, <InfoTerm>Transparenz</InfoTerm>, <InfoTerm>Verhältnismässigkeit</InfoTerm>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markSectionComplete(sectionId)} />
        ))}
      </div>
    </SectionCard>
  );
}
