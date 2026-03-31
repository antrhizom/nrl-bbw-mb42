"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import InfoTerm from "@/components/InfoTerm";
import RoleHint from "@/components/RoleHint";

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
        Nutzen Sie nur schulische <InfoTerm>Collaboration Tools</InfoTerm> und
        beachten Sie die Schutzstufen: <InfoTerm>Sachdaten</InfoTerm>,{" "}
        <InfoTerm>Personendaten</InfoTerm> und{" "}
        <InfoTerm>Besondere Personendaten</InfoTerm>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markSectionComplete(sectionId)} />
        ))}
      </div>
      <RoleHint role="lehrpersonen">
        Die detaillierten Tabellen zu den Schutzstufen finden Sie in der vollständigen NRL.
        In der Regel sollten Dokumente, die vertraulich sind oder Personendaten bzw. besondere
        Personendaten enthalten, nur auf der Verwaltungsebene oder im LIS abgelegt werden.
      </RoleHint>
      <RoleHint role="mitarbeitende">
        Die detaillierten Tabellen zu den Schutzstufen finden Sie in der vollständigen NRL.
        In der Regel sollten Dokumente, die vertraulich sind oder Personendaten bzw. besondere
        Personendaten enthalten, nur auf der Verwaltungsebene oder im LIS abgelegt werden.
      </RoleHint>
    </SectionCard>
  );
}
