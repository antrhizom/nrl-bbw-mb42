"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

export const SECTION_IDS = [
  "welcome",
  "allgemein",
  "datensicherheit-1",
  "datensicherheit-2",
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
  markSectionComplete: (sectionId: string) => void;
}

const MerkblattContext = createContext<MerkblattContextType | null>(null);

export function MerkblattProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set());

  const currentSectionId = SECTION_IDS[currentIndex];
  const totalSections = SECTION_IDS.length;
  const completableIds = SECTION_IDS.filter((id) => id !== "welcome" && id !== "abschluss");
  const completedCount = completableIds.filter((id) => completedSections.has(id)).length;
  const progress = Math.round((completedCount / completableIds.length) * 100);
  const isFullyCompleted = completedCount === completableIds.length;

  const canProceed = useMemo(() => {
    const sid = SECTION_IDS[currentIndex];
    if (sid === "welcome" || sid === "abschluss") return true;
    return completedSections.has(sid);
  }, [currentIndex, completedSections]);

  const markSectionComplete = useCallback((sectionId: string) => {
    setCompletedSections((prev) => {
      const next = new Set(prev);
      next.add(sectionId as SectionId);
      return next;
    });
  }, []);

  const goNext = useCallback(() => setCurrentIndex((i) => Math.min(i + 1, totalSections - 1)), [totalSections]);
  const goPrev = useCallback(() => setCurrentIndex((i) => Math.max(i - 1, 0)), []);
  const goTo = useCallback((index: number) => { if (index >= 0 && index < totalSections) setCurrentIndex(index); }, [totalSections]);

  return (
    <MerkblattContext.Provider value={{ currentIndex, currentSectionId, totalSections, progress, completedSections, canProceed, isFullyCompleted, goNext, goPrev, goTo, markSectionComplete }}>
      {children}
    </MerkblattContext.Provider>
  );
}

export function useMerkblatt() {
  const ctx = useContext(MerkblattContext);
  if (!ctx) throw new Error("useMerkblatt must be used within MerkblattProvider");
  return ctx;
}
