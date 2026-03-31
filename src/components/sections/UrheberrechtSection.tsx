"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import InfoTerm from "@/components/InfoTerm";
import RoleHint from "@/components/RoleHint";

export default function UrheberrechtSection() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "urheberrecht";
  const flipCards = [
    { title: "Nutzung in der eigenen Klasse", description: "Gemäss GT7 erweiterte Rechte innerhalb der eigenen Klasse. Ausserhalb stark eingeschränkt. Auch Werke der Lernenden sind geschützt." },
    { title: "Neukreationen & KI", description: "Bei Schularbeiten können Sie Urheberrecht verletzen. KI-Inhalte vor Veröffentlichung prüfen – volle Verantwortung." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 6" title="Urheberrecht">
      <p className="text-gray-700 leading-relaxed">
        Das <InfoTerm>Urheberrecht</InfoTerm> schützt geistige Schöpfungen. Durch moderne Medienanwendungen werden auch Lernende zu Autorinnen und Autoren.
      </p>
      <RoleHint role="lehrpersonen">
        Auch Werke der Lernenden sind urheberrechtlich geschützt. Die erweiterten Nutzungsrechte gemäss GT7 gelten nur innerhalb der eigenen Klasse.
      </RoleHint>
      <RoleHint role="lernende">
        Auch bei Schularbeiten können Sie das Urheberrecht verletzen – z.B. wenn Sie fremde Texte, Bilder oder KI-generierte Inhalte ohne Prüfung verwenden.
      </RoleHint>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markSectionComplete(sectionId)} />
        ))}
      </div>
    </SectionCard>
  );
}
