"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";

export default function AllgemeinSection() {
  const { markComplete } = useMerkblatt();
  const sectionId = "allgemein";
  const flipCards = [
    { title: "NRL & Geltungsbereich", description: "Regelt den Umgang mit IKT-Systemen. Gilt für alle: Lernende, Lehrpersonen, Mitarbeitende, Gäste." },
    { title: "BYOD & private Nutzung", description: "Private Nutzung erlaubt, schulische Zwecke haben Vorrang. BYOD-Geräte brauchen Passwort-/PIN-Schutz und aktuelle Updates." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 1" title="Allgemein & IT-Nutzung">
      <p className="text-gray-700 leading-relaxed">
        Die NRL regelt den Umgang mit den <InfoTerm>IKT-Systemen</InfoTerm> der BBW.{" "}
        <InfoTerm>BYOD</InfoTerm>-Geräte müssen Mindestanforderungen erfüllen.
        Das <InfoTerm>TIKT-Team</InfoTerm> der Schule unterstützt bei technischen Fragen.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Die Schule unterstützt und berät zu den entsprechenden Supportzeiten. Für private Geräte (BYOD) ist der Support eingeschränkt – die gestellten Probleme können unter Umständen nicht vollständig gelöst werden.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
    </SectionCard>
  );
}
