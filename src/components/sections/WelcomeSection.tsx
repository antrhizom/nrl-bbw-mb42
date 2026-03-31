"use client";
import SectionCard from "@/components/SectionCard";

export default function WelcomeSection() {
  return (
    <SectionCard chapterLabel="Willkommen" title="Merkblatt zur Nutzungsrichtlinie IKT">
      <p className="text-lg text-gray-600 font-medium">BBW Berufsbildungsschule Winterthur</p>
      <p className="text-gray-700 leading-relaxed">
        Dieses Merkblatt fasst die wichtigsten Punkte der Nutzungsrichtlinie IKT (NRL) zusammen.
        Klicken Sie auf die Karten, um die Erklärungen zu lesen.
      </p>
      <div className="bg-bbw-green-50 border border-bbw-green-200 rounded-xl p-5">
        <p className="text-gray-800 leading-relaxed">
          <span className="font-semibold text-bbw-green-700">Hinweis:</span>{" "}
          Diese Nutzungsrichtlinie muss lediglich zur Kenntnis genommen werden.
          Sie gilt für alle Nutzenden der BBW-IKT-Systeme.
        </p>
      </div>
      <a href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-bbw-green-500 text-white font-medium rounded-lg hover:bg-bbw-green-600 transition-colors">
        Vollständige NRL (PDF)
      </a>
    </SectionCard>
  );
}
