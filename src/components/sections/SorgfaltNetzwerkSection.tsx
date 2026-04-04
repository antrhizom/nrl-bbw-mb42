"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import SpeakableText from "@/components/SpeakableText";
import FlipCard from "@/components/FlipCard";
import MerksatzCheck from "@/components/MerksatzCheck";

export default function SorgfaltNetzwerkSection() {
  const { markComplete } = useMerkblatt();
  const sectionId = "sorgfalt-netzwerk";
  const flipCards = [
    { title: "Malware-Schutz", description: "Schutzsoftware darf nicht umgangen oder deaktiviert werden. Sicherheitsupdates zeitnah installieren. Nur vertrauenswürdige Geräte im Schulnetz." },
    { title: "Netzwerk & Internet", description: "Schulnetz nicht unnötig beeinträchtigen. Sicherheitsmassnahmen (z.B. Firewall, Proxy) nicht umgehen. Der Zugang zu Webseiten, die nicht mit dem Schul- oder Arbeitsbetrieb zusammenhängen, ist eingeschränkt oder verboten (z.B. sexistische, gewaltverherrlichende, rassistische Inhalte)." },
  ];
  return (
    <SectionCard chapterLabel="Kapitel 4" title="Sorgfalt, Netzwerk & Kommunikation">
      <SpeakableText className="text-gray-700 leading-relaxed">
        Neben dem sorgfältigen Umgang mit Geräten und Daten gelten klare Regeln
        für die Netzwerknutzung und die digitale Kommunikation.
      </SpeakableText>
      <div className="grid gap-4 sm:grid-cols-2">
        {flipCards.map((card, index) => (
          <FlipCard key={index} title={card.title} description={card.description} index={index} total={flipCards.length} sectionId={sectionId} onAllFlipped={() => markComplete(sectionId, "flipcards")} />
        ))}
      </div>
      <MerksatzCheck
        statements={[
          "Alle Beteiligten sind verpflichtet, in digitalen Interaktionen stets respektvoll, sachlich und konstruktiv zu agieren, diskriminierende oder beleidigende Inhalte zu vermeiden, den Datenschutz zu wahren und Spam sowie werbende Inhalte zu unterlassen.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
    </SectionCard>
  );
}
