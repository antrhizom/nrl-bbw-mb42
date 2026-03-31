"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";

export default function Datensicherheit1Section() {
  const { markSectionComplete } = useMerkblatt();
  const sectionId = "datensicherheit-1";
  return (
    <SectionCard chapterLabel="Kapitel 2" title="Datensicherheit – Grundlagen">
      <p className="text-gray-700 leading-relaxed">
        <InfoTerm>Datensicherheit</InfoTerm> schützt Daten vor Verlust und unbefugtem Zugriff.
        Die BBW verfügt über eine eigene <InfoTerm>Firewall</InfoTerm>.
      </p>
      <MerksatzCheck
        statements={[
          "Schulinterne Daten in der Regel auf BBW-Speichern ablegen (OneDrive, Teams, SharePoint, Schulserver, Nextcloud, OpenOlat). Ausnahmen je nach Berufsgruppe/Abteilung.",
          "Passwörter geheim halten, Konten nie teilen. MFA ist bei Microsoft-Diensten bereits Pflicht.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markSectionComplete(sectionId)}
      />
    </SectionCard>
  );
}
