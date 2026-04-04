"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import SpeakableText from "@/components/SpeakableText";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function UrheberrechtSection() {
  const { markComplete } = useMerkblatt();
  const sectionId = "urheberrecht";
  const flipCards = [
    { title: "Nutzung in der eigenen Klasse", description: "Gemäss GT7 erweiterte Rechte innerhalb der eigenen Klasse. Ausserhalb stark eingeschränkt." },
    { title: "Neukreationen & KI", description: "KI-generierte Inhalte vor Veröffentlichung auf Urheberrechtsverletzungen prüfen. Volle Verantwortung." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 7" title="Urheberrecht">
      <SpeakableText className="text-gray-700 leading-relaxed">
        Das <InfoTerm>Urheberrecht</InfoTerm> schützt geistige Schöpfungen. Lernende werden durch moderne Medienanwendungen selbst zu Autorinnen und Autoren.
      </SpeakableText>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Mediale Schulprojekte und -arbeiten sind urheberrechtlich geschützte Produkte.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
      <RoleAccordion roles="Lehrpersonen">
        Auch Werke der Lernenden sind urheberrechtlich geschützt. Klassenübergreifende Ordner mit geschützten Inhalten sind nicht erlaubt.
      </RoleAccordion>
      <RoleAccordion roles="Lernende">
        Sie verletzen das Urheberrecht, wenn Sie Schularbeiten ausserhalb der eigenen Klasse zeigen oder teilen, die ohne Erlaubnis urheberrechtlich geschützte Inhalte enthalten (z.B. fremde Texte, Bilder, Musik).
      </RoleAccordion>
    </SectionCard>
  );
}
