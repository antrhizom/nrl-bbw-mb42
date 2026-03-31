"use client";

import { useState } from "react";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";

export default function WelcomeSection() {
  const { markSectionComplete } = useMerkblatt();
  const [checked, setChecked] = useState(false);

  const handleCheck = (value: boolean) => {
    setChecked(value);
    if (value) markSectionComplete("welcome");
  };

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
      <a
        href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-bbw-green-500 text-white font-medium rounded-lg hover:bg-bbw-green-600 transition-colors"
      >
        Vollständige NRL (PDF)
      </a>

      <label className="flex items-start gap-3 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleCheck(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-bbw-green-500 focus:ring-bbw-green-500 accent-bbw-green-500"
        />
        <span className="text-sm text-gray-700 leading-relaxed">
          Ich nehme zur Kenntnis, dass es sich hier um eine Schnellinfo handelt.
          Für die detaillierten Inhalte ist das{" "}
          <a
            href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bbw-green-700 underline font-medium"
          >
            verlinkte PDF-Dokument
          </a>{" "}
          massgebend.
        </span>
      </label>
    </SectionCard>
  );
}
