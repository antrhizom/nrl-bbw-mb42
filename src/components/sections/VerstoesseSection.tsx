"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function VerstoesseSection() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "verstoesse";
  return (
    <SectionCard chapterLabel="Kapitel 7" title="Verstösse & Rechtliches">
      <p className="text-gray-700 leading-relaxed">
        Bei Verstössen greifen abgestufte Massnahmen. Zuständig sind <InfoTerm>TIKT</InfoTerm> und <InfoTerm>PIKT</InfoTerm>.
      </p>
      <MerksatzCheck
        statements={[
          "Zuerst klärendes Gespräch, dann abgestufte Konsequenzen. Die Schule haftet nicht für Schäden durch Nutzende.",
          "Die NRL basiert auf dem Kantonsauftrag, gestützt auf IDG, Personalgesetz, Disziplinarreglement u.a.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
      <RoleAccordion roles="Lernende">
        Bei Verstössen können Ihre Eltern/Erziehungsberechtigten und Ihr Lehrbetrieb informiert werden.
      </RoleAccordion>
    </SectionCard>
  );
}
