"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Global tracker for flipped cards per section
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
  const [isFlipped, setIsFlipped] = useState(false);
  const calledRef = useRef(false);

  const handleClick = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
      if (!flippedTracker[sectionId]) flippedTracker[sectionId] = new Set();
      flippedTracker[sectionId].add(index);
    } else {
      setIsFlipped(false);
    }
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
