"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";

export default function Datensicherheit1Section() {
  const { markComplete } = useMerkblatt();
  const sectionId = "datensicherheit-1";
  const flipCards = [
    { title: "In der Regel BBW-Speicher", description: "Schulinterne Daten in der Regel auf BBW-Speichern ablegen. Ausnahmen je nach Berufsgruppe/Abteilung." },
    { title: "Zugangsdaten & MFA", description: "Passwörter geheim halten, Konten nie teilen. MFA ist bei Microsoft-Diensten bereits Pflicht." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 2" title="Datensicherheit – Grundlagen">
      <p className="text-gray-700 leading-relaxed">
        <InfoTerm>Datensicherheit</InfoTerm> schützt Daten vor Verlust und unbefugtem Zugriff.
        Die BBW verfügt über eine eigene <InfoTerm>Firewall</InfoTerm>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "MFA (Mehr-Faktor-Authentifizierung) bedeutet: Neben dem Passwort ist ein zweiter Faktor nötig (z.B. SMS-Code oder Authenticator-App).",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
    </SectionCard>
  );
}
