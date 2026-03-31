"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function UrheberrechtSection() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "urheberrecht";
  return (
    <SectionCard chapterLabel="Kapitel 6" title="Urheberrecht">
      <p className="text-gray-700 leading-relaxed">
        Das <InfoTerm>Urheberrecht</InfoTerm> schützt geistige Schöpfungen. Lernende werden durch moderne Medienanwendungen selbst zu Autorinnen und Autoren.
      </p>
      <MerksatzCheck
        statements={[
          "In der eigenen Klasse hat die Schule gemäss GT7 erweiterte Nutzungsrechte. Ausserhalb ist die Nutzung stark eingeschränkt.",
          "KI-generierte Inhalte vor Veröffentlichung auf Urheberrechtsverletzungen prüfen. Sie tragen die volle Verantwortung.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
      <RoleAccordion roles="Lehrpersonen">
        Auch Werke der Lernenden sind urheberrechtlich geschützt. Klassenübergreifende Ordner mit geschützten Inhalten sind nicht erlaubt.
      </RoleAccordion>
      <RoleAccordion roles="Lernende">
        Auch bei Schularbeiten können Sie Urheberrecht verletzen – z.B. wenn Sie fremde Texte, Bilder oder KI-generierte Inhalte ohne Prüfung verwenden.
      </RoleAccordion>
    </SectionCard>
  );
}
