"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function Datensicherheit2Section() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "datensicherheit-2";
  return (
    <SectionCard chapterLabel="Kapitel 3" title="Datensicherheit – Kommunikation & Schutz">
      <p className="text-gray-700 leading-relaxed">
        Beachten Sie die Schutzstufen: <InfoTerm>Sachdaten</InfoTerm>, <InfoTerm>Personendaten</InfoTerm>, <InfoTerm>Besondere Personendaten</InfoTerm>. Nutzen Sie nur schulische <InfoTerm>Collaboration Tools</InfoTerm>.
      </p>
      <MerksatzCheck
        statements={[
          "Nur schulische Tools (z.B. Teams). E-Mails nicht an private Postfächer weiterleiten. Vertrauliche Nachrichten verschlüsseln.",
          "Clean-Desk/Clear-Screen beachten. Sicherheitsmassnahmen nicht umgehen. Respektvoll und sachlich kommunizieren.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
      <RoleAccordion roles="Lehrpersonen & Mitarbeitende">
        Die detaillierten Tabellen zu den Schutzstufen finden Sie in der vollständigen NRL.
        In der Regel sollten Dokumente, die vertraulich sind oder Personendaten bzw. besondere
        Personendaten enthalten, nur auf der Verwaltungsebene oder im LIS abgelegt werden.
      </RoleAccordion>
    </SectionCard>
  );
}
