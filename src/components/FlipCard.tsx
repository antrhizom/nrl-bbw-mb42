"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_PREFIX = "nrl-mb42-flip-";

function loadFlipped(sectionId: string): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + sectionId);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch { return new Set(); }
}

function saveFlipped(sectionId: string, flipped: Set<number>) {
  try { localStorage.setItem(STORAGE_PREFIX + sectionId, JSON.stringify(Array.from(flipped))); } catch {}
}

// Global tracker (synced with localStorage)
const flippedTracker: Record<string, Set<number>> = {};

interface FlipCardProps {
  title: string;
  description: string;
  index: number;
  total: number;
  sectionId: string;
  onAllFlipped: () => void;
}

export default function FlipCard({
  title,
  description,
  index,
  total,
  sectionId,
  onAllFlipped,
}: FlipCardProps) {
  // Initialize from localStorage
  if (!flippedTracker[sectionId]) {
    flippedTracker[sectionId] = loadFlipped(sectionId);
  }

  const [isFlipped, setIsFlipped] = useState(() => flippedTracker[sectionId].has(index));
  const calledRef = useRef(false);

  // Fire completion if already all flipped on mount
  useEffect(() => {
    if (flippedTracker[sectionId]?.size === total && !calledRef.current) {
      calledRef.current = true;
      onAllFlipped();
    }
  }, [sectionId, total, onAllFlipped]);

  const handleClick = useCallback(() => {
    const newState = !isFlipped;
    setIsFlipped(newState);
    if (newState) {
      flippedTracker[sectionId].add(index);
    } else {
      flippedTracker[sectionId].delete(index);
    }
    saveFlipped(sectionId, flippedTracker[sectionId]);
  }, [isFlipped, sectionId, index]);

  useEffect(() => {
    if (
      isFlipped &&
      flippedTracker[sectionId]?.size === total &&
      !calledRef.current
    ) {
      calledRef.current = true;
      onAllFlipped();
    }
  }, [isFlipped, sectionId, total, onAllFlipped]);

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        isFlipped
          ? "border-bbw-green-500 bg-bbw-green-50"
          : "border-gray-200 bg-white hover:border-bbw-green-300 hover:shadow-sm"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm transition-colors ${
              isFlipped ? "bg-bbw-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {isFlipped ? "✓" : "?"}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{title}</p>
            {isFlipped && (
              <p className="mt-2 text-gray-700 text-sm leading-relaxed animate-fade-in">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
