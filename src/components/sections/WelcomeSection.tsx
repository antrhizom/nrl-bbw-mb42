"use client";
import { useState } from "react";
import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import SpeakableText from "@/components/SpeakableText";
import { speak, stopSpeaking } from "@/lib/speak";

const STORAGE_KEY = "nrl-mb42-welcome-checked";

function loadWelcome(): boolean {
  try { return localStorage.getItem(STORAGE_KEY) === "true"; } catch { return false; }
}

export default function WelcomeSection() {
  const { markComplete } = useMerkblatt();
  const [checked, setChecked] = useState(() => {
    const saved = loadWelcome();
    if (saved) setTimeout(() => markComplete("welcome", "welcome"), 0);
    return saved;
  });
  const handleCheck = (value: boolean) => {
    setChecked(value);
    try { localStorage.setItem(STORAGE_KEY, String(value)); } catch {}
    if (value) markComplete("welcome", "welcome");
  };
  return (
    <SectionCard chapterLabel="Willkommen" title="Merkblatt zur Nutzungsrichtlinie IKT">
      <SpeakableText className="text-lg text-gray-600 font-medium">BBW Berufsbildungsschule Winterthur</SpeakableText>
      <SpeakableText className="text-gray-700 leading-relaxed">
        Dieses Merkblatt fasst die wichtigsten Punkte der Nutzungsrichtlinie IKT (NRL) zusammen.
      </SpeakableText>
      <div
        className="bg-bbw-green-50 border border-bbw-green-200 rounded-xl p-5 cursor-default"
        onMouseEnter={() => speak("Hinweis: Die NRL muss zur Kenntnis genommen werden. Auch wenn Sie mit dem Inhalt nicht einverstanden sind, gilt die Richtlinie. Sie gilt für alle Nutzenden der BBW IKT-Systeme.")}
        onMouseLeave={stopSpeaking}
      >
        <p className="text-gray-800 leading-relaxed">
          <span className="font-semibold text-bbw-green-700">Hinweis:</span>{" "}
          Die NRL muss zur Kenntnis genommen werden. Auch wenn Sie mit dem Inhalt nicht einverstanden sind, gilt die Richtlinie. Sie gilt für alle Nutzenden der BBW-IKT-Systeme.
        </p>
      </div>
      <a href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-bbw-green-500 text-white font-medium rounded-lg hover:bg-bbw-green-600 transition-colors">
        Vollständige NRL (PDF)
      </a>
      <label
        className="flex items-start gap-3 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
        onMouseEnter={() => speak("Ich nehme zur Kenntnis, dass es sich hier um eine Schnellinfo handelt. Für die detaillierten Inhalte ist das verlinkte PDF-Dokument massgebend.")}
        onMouseLeave={stopSpeaking}
      >
        <input type="checkbox" checked={checked} onChange={(e) => handleCheck(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-bbw-green-500 focus:ring-bbw-green-500 accent-bbw-green-500" />
        <span className="text-sm text-gray-700 leading-relaxed">
          Ich nehme zur Kenntnis, dass es sich hier um eine Schnellinfo handelt. Für die detaillierten Inhalte ist das{" "}
          <a href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf" target="_blank" rel="noopener noreferrer" className="text-bbw-green-700 underline font-medium">verlinkte PDF-Dokument</a> massgebend.
        </span>
      </label>
    </SectionCard>
  );
}
