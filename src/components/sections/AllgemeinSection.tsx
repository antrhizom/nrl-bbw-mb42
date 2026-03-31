"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";

export default function AllgemeinSection() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "allgemein";
  return (
    <SectionCard chapterLabel="Kapitel 1" title="Allgemein & IT-Nutzung">
      <p className="text-gray-700 leading-relaxed">
        Die NRL regelt den Umgang mit den <InfoTerm>IKT-Systemen</InfoTerm> der BBW.{" "}
        <InfoTerm>BYOD</InfoTerm>-Geräte müssen Mindestanforderungen erfüllen.
      </p>
      <MerksatzCheck
        statements={[
          "Die NRL gilt für alle: Lernende, Lehrpersonen, Mitarbeitende, Gäste. Private Nutzung ist erlaubt, schulische Zwecke haben Vorrang.",
          "BYOD-Geräte brauchen Passwort-/PIN-Schutz und aktuelle Updates. Support für private Geräte ist eingeschränkt.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
    </SectionCard>
  );
}
