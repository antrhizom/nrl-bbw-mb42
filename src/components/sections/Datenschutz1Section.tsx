"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function Datenschutz1Section() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "datenschutz-1";
  return (
    <SectionCard chapterLabel="Kapitel 4" title="Datenschutz – Grundlagen & Unterricht">
      <p className="text-gray-700 leading-relaxed">
        <InfoTerm>Datenschutz</InfoTerm> schützt Personen vor missbräuchlicher Datenverwendung.
      </p>
      <MerksatzCheck
        statements={[
          "Lernprofile sind erlaubt, Persönlichkeitsprofile nicht. Statistiken nicht vor der Klasse zeigen.",
          "Ab 14 Jahren können Lernende eigenständig ihre Einwilligung geben (z.B. für Fotos). Besondere Personendaten sind mindestens vertraulich einzustufen.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
      <RoleAccordion roles="Lehrpersonen">
        Lernende sind regelmässig zu datenschutzrechtlichen Themen zu sensibilisieren. Lerntechnologien müssen datenschutzkonform sein.
      </RoleAccordion>
    </SectionCard>
  );
}
