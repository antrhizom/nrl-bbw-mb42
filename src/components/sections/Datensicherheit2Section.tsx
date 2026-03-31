"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import InfoTerm from "@/components/InfoTerm";

export default function Datensicherheit2Section() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "datensicherheit-2";
  const flipCards = [
    { title: "Kommunikationsregeln", description: "Nur schulische Tools (z.B. Teams). E-Mails nicht an private Postfächer weiterleiten. Vertrauliche Nachrichten verschlüsseln." },
    { title: "Informationssicherheit", description: "Drei Schutzstufen: Sachdaten (öffentlich), Personendaten (vertraulich), besondere Personendaten (streng vertraulich). Clean-Desk/Clear-Screen beachten." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 3" title="Datensicherheit – Kommunikation & Schutz">
      <p className="text-gray-700 leading-relaxed">
        Nutzen Sie nur schulische <InfoTerm>Collaboration Tools</InfoTerm> und beachten Sie die Schutzstufen für <InfoTerm>Personendaten</InfoTerm>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markSectionComplete(sectionId)} />
        ))}
      </div>
    </SectionCard>
  );
}
