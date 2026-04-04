"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from "react";

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

const STORAGE_KEY = "nrl-mb42-progress";

function loadProgress(): { index: number; completions: Record<string, Set<string>> } {
  if (typeof window === "undefined") return { index: 0, completions: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { index: 0, completions: {} };
    const data = JSON.parse(raw);
    const completions: Record<string, Set<string>> = {};
    for (const [key, parts] of Object.entries(data.completions || {})) {
      completions[key] = new Set(parts as string[]);
    }
    return { index: data.index || 0, completions };
  } catch {
    return { index: 0, completions: {} };
  }
}

function saveProgress(index: number, completions: Record<string, Set<string>>) {
  try {
    const serializable: Record<string, string[]> = {};
    for (const [key, parts] of Object.entries(completions)) {
      serializable[key] = Array.from(parts);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, completions: serializable }));
  } catch {
    // ignore storage errors
  }
}

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
  const [currentIndex, setCurrentIndex] = useState(() => loadProgress().index);
  const [completions, setCompletions] = useState<Record<string, Set<string>>>(() => loadProgress().completions);

  // Save to localStorage on changes
  useEffect(() => {
    saveProgress(currentIndex, completions);
  }, [currentIndex, completions]);

  const currentSectionId = SECTION_IDS[currentIndex];
  const totalSections = SECTION_IDS.length;
  const completableIds = SECTION_IDS.filter((id) => id !== "welcome" && id !== "abschluss");

  const isSectionComplete = useCallback(
    (sectionId: string) => {
      if (sectionId === "welcome") return completions[sectionId]?.has("welcome") ?? false;
      if (sectionId === "datenschutz-1") return completions[sectionId]?.has("flipcards") ?? false;
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
