"use client";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import MerksatzCheck from "@/components/MerksatzCheck";
import InfoTerm from "@/components/InfoTerm";

export default function SorgfaltNetzwerkSection() {
  const { markComplete } = useMerkblatt();
  const sectionId = "sorgfalt-netzwerk";
  return (
    <SectionCard chapterLabel="Kapitel 4" title="Sorgfalt, Netzwerk & Kommunikation">
      <p className="text-gray-700 leading-relaxed">
        Der sorgfältige Umgang mit Geräten, die Nutzung des Schulnetzwerks und die respektvolle
        Kommunikation sind grundlegende Pflichten aller Nutzenden.
      </p>
      <MerksatzCheck
        statements={[
          "Behandeln Sie Schulgeräte und -daten sorgfältig. Sperren Sie den Bildschirm beim Verlassen des Arbeitsplatzes (Win+L) und lassen Sie keine vertraulichen Unterlagen offen liegen (Clean-Desk / Clear-Screen).",
          "Schutzsoftware darf nicht umgangen oder deaktiviert werden. Sicherheitsupdates müssen zeitnah installiert werden. Nur vertrauenswürdige Geräte dürfen mit dem Schulnetz verbunden werden.",
          "Das Schulnetz darf nicht unnötig beeinträchtigt werden. Sicherheitsmassnahmen (z.B. Firewall, Proxy) dürfen nicht umgangen werden. Der Zugang zu Webseiten ausserhalb des Grundauftrags ist eingeschränkt oder verboten (z.B. sexistische, gewaltverherrlichende und rassistische Internetseiten).",
          "Alle Beteiligten sind verpflichtet, in digitalen Interaktionen stets respektvoll, sachlich und konstruktiv zu agieren, diskriminierende oder beleidigende Inhalte zu vermeiden, den Datenschutz zu wahren und Spam sowie werbende Inhalte zu unterlassen.",
        ]}
        sectionId={sectionId}
        onAllChecked={() => markComplete(sectionId, "merksatz")}
      />
    </SectionCard>
  );
}
