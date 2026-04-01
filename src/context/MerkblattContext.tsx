"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

export const SECTION_IDS = [
  "welcome",
  "allgemein",
  "datensicherheit-1",
  "datensicherheit-2",
  "sorgfalt-netzwerk",
  "datenschutz-1",
  "datenschutz-2",
  "urheberrecht",
  "verstoesse",
  "abschluss",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

interface MerkblattContextType {
  currentIndex: number;
  currentSectionId: SectionId;
  totalSections: number;
  progress: number;
  completedSections: Set<SectionId>;
  canProceed: boolean;
  isFullyCompleted: boolean;
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  markComplete: (sectionId: string, part: "flipcards" | "merksatz" | "welcome") => void;
}

const MerkblattContext = createContext<MerkblattContextType | null>(null);

export function MerkblattProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completions, setCompletions] = useState<Record<string, Set<string>>>({});

  const currentSectionId = SECTION_IDS[currentIndex];
  const totalSections = SECTION_IDS.length;
  const completableIds = SECTION_IDS.filter((id) => id !== "welcome" && id !== "abschluss");

  const isSectionComplete = useCallback(
    (sectionId: string) => {
      if (sectionId === "welcome") return completions[sectionId]?.has("welcome") ?? false;
      if (sectionId === "sorgfalt-netzwerk") return completions[sectionId]?.has("merksatz") ?? false;
      const parts = completions[sectionId];
      if (!parts) return false;
      return parts.has("flipcards") && parts.has("merksatz");
    },
    [completions]
  );

  const completedSections = useMemo(() => {
    const set = new Set<SectionId>();
    for (const id of SECTION_IDS) {
      if (isSectionComplete(id)) set.add(id);
    }
    return set;
  }, [isSectionComplete]);

  const completedCount = completableIds.filter((id) => completedSections.has(id)).length;
  const progress = Math.round((completedCount / completableIds.length) * 100);
  const isFullyCompleted = completedCount === completableIds.length;

  const canProceed = useMemo(() => {
    const sid = SECTION_IDS[currentIndex];
    if (sid === "abschluss") return true;
    return isSectionComplete(sid);
  }, [currentIndex, isSectionComplete]);

  const markComplete = useCallback((sectionId: string, part: "flipcards" | "merksatz" | "welcome") => {
    setCompletions((prev) => {
      const parts = new Set(prev[sectionId] || []);
      parts.add(part);
      return { ...prev, [sectionId]: parts };
    });
  }, []);

  const goNext = useCallback(() => setCurrentIndex((i) => Math.min(i + 1, totalSections - 1)), [totalSections]);
  const goPrev = useCallback(() => setCurrentIndex((i) => Math.max(i - 1, 0)), []);
  const goTo = useCallback((index: number) => { if (index >= 0 && index < totalSections) setCurrentIndex(index); }, [totalSections]);

  return (
    <MerkblattContext.Provider value={{ currentIndex, currentSectionId, totalSections, progress, completedSections, canProceed, isFullyCompleted, goNext, goPrev, goTo, markComplete }}>
      {children}
    </MerkblattContext.Provider>
  );
}

export function useMerkblatt() {
  const ctx = useContext(MerkblattContext);
  if (!ctx) throw new Error("useMerkblatt must be used within MerkblattProvider");
  return ctx;
}
