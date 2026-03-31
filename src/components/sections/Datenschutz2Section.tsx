"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import RoleAccordion from "@/components/RoleAccordion";

export default function Datenschutz2Section() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "datenschutz-2";
  return (
    <SectionCard chapterLabel="Kapitel 5" title="Datenschutz – KI & Aufnahmen">
      <p className="text-gray-700 leading-relaxed">
        KI-Tools und Aufnahmen erfordern besonderen Umgang mit Daten.
      </p>
      <MerksatzCheck
        statements={[
          "Keine persönlichen oder vertraulichen Daten in KI-Tools eingeben. Bei Lerntechnologien besteht Freiwilligkeit, ausser bei regulären BBW-Angeboten.",
          "Aufnahmen jeglicher Art (Bild, Ton, Video) nur mit ausdrücklichem Einverständnis der betroffenen Personen.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
      <RoleAccordion roles="Lehrpersonen & Mitarbeitende">
        Geben Sie keine Schuldaten in KI-Tools ein. Die Anmeldung bei KI-Tools darf nicht erzwungen werden.
      </RoleAccordion>
    </SectionCard>
  );
}
