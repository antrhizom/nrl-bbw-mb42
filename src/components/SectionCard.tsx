"use client";

import { ReactNode, useState } from "react";
import { speak, stopSpeaking } from "@/lib/speak";

interface SectionCardProps {
  chapterLabel: string;
  title: string;
  reduced?: boolean;
  children: ReactNode;
}

export default function SectionCard({
  chapterLabel,
  title,
  reduced,
  children,
}: SectionCardProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        {reduced && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
            Kurzfassung
          </span>
        )}
        <span className="text-xs text-bbw-green-600 font-medium uppercase tracking-wider">
          {chapterLabel}
        </span>
        <span className="relative ml-auto">
          <button
            onClick={() => setShowHint(!showHint)}
            onMouseEnter={() => speak("Fahren Sie mit der Maus über Texte, Karten und Begriffe, um sich diese vorlesen zu lassen.")}
            onMouseLeave={stopSpeaking}
            className="text-gray-400 hover:text-bbw-green-600 transition-colors"
            title="Vorlese-Funktion"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </button>
          {showHint && (
            <span className="absolute z-20 right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs text-gray-600 leading-relaxed animate-fade-in">
              Fahren Sie mit der Maus über Texte, Karten und Begriffe, um sich diese vorlesen zu lassen.
            </span>
          )}
        </span>
      </div>
      <h2
        className="text-2xl font-bold text-gray-900 mb-6 cursor-default"
        onMouseEnter={() => speak(`${chapterLabel}. ${title}`)}
        onMouseLeave={stopSpeaking}
      >
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
