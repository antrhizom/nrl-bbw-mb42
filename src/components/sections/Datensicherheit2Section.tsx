"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";
import RoleAccordion from "@/components/RoleAccordion";

export default function Datensicherheit2Section() {
  const { markComplete } = useMerkblatt();
  const sectionId = "datensicherheit-2";
  const flipCards = [
    { title: "Kommunikationsregeln", description: "Nur schulische Tools (z.B. Teams). E-Mails nicht an private Postfächer weiterleiten. Vertrauliche Nachrichten verschlüsseln." },
    { title: "Informationssicherheit", description: "Drei Schutzstufen: Sachdaten (öffentlich), Personendaten (vertraulich), besondere Personendaten (streng vertraulich)." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 3" title="Datensicherheit – Kommunikation & Schutz">
      <p className="text-gray-700 leading-relaxed">
        Beachten Sie die Schutzstufen: <InfoTerm>Sachdaten</InfoTerm>, <InfoTerm>Personendaten</InfoTerm>, <InfoTerm>Besondere Personendaten</InfoTerm>. Nutzen Sie nur schulische <InfoTerm>Collaboration Tools</InfoTerm>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Vertrauliche Daten in Teams verlinken, nicht direkt posten. Clean-Desk/Clear-Screen beachten: Bildschirm beim Verlassen des Arbeitsplatzes sperren (Win+L), keine vertraulichen Unterlagen offen liegen lassen.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
      <RoleAccordion roles="Lehrpersonen & Mitarbeitende">
        Die detaillierten Tabellen zu den Schutzstufen finden Sie in der vollständigen NRL.
        In der Regel sollten Dokumente, die vertraulich sind oder Personendaten bzw. besondere
        Personendaten enthalten, nur auf der Verwaltungsebene oder im LIS abgelegt werden.
      </RoleAccordion>
    </SectionCard>
  );
}
