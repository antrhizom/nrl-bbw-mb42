"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import InfoTerm from "@/components/InfoTerm";

export default function VerstoesseSection() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "verstoesse";
  const flipCards = [
    { title: "Massnahmen", description: "Klärendes Gespräch, dann abgestufte Konsequenzen. Die Schule haftet nicht für Schäden durch Nutzende." },
    { title: "Rechtliche Basis", description: "NRL basiert auf Kantonsauftrag, gestützt auf IDG, Personalgesetz, Disziplinarreglement u.a." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 7" title="Verstösse & Rechtliches">
      <p className="text-gray-700 leading-relaxed">
        Bei Verstössen greifen abgestufte Massnahmen. Zuständig sind die <InfoTerm>TIKT</InfoTerm> und die <InfoTerm>PIKT</InfoTerm>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markSectionComplete(sectionId)} />
        ))}
      </div>
    </SectionCard>
  );
}
