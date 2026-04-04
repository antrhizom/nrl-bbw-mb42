"use client";

import { useState, useEffect, useRef } from "react";

const STORAGE_PREFIX = "nrl-mb42-merksatz-";

function loadChecked(sectionId: string): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + sectionId);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch { return new Set(); }
}

function saveChecked(sectionId: string, checked: Set<number>) {
  try { localStorage.setItem(STORAGE_PREFIX + sectionId, JSON.stringify(Array.from(checked))); } catch {}
}

interface MerksatzCheckProps {
  statements: string[];
  sectionId: string;
  onAllChecked: () => void;
}

export default function MerksatzCheck({ statements, sectionId, onAllChecked }: MerksatzCheckProps) {
  const [checked, setChecked] = useState<Set<number>>(() => loadChecked(sectionId));
  const calledRef = useRef(false);

  // Fire completion if already all checked on mount
  useEffect(() => {
    if (checked.size === statements.length && !calledRef.current) {
      calledRef.current = true;
      onAllChecked();
    }
  }, []);

  useEffect(() => {
    if (checked.size === statements.length && !calledRef.current) {
      calledRef.current = true;
      onAllChecked();
    }
  }, [checked, statements.length, onAllChecked]);

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      saveChecked(sectionId, next);
      return next;
    });
  };

  return (
    <div className="space-y-2 mt-4">
      <p className="text-xs text-gray-500 italic">
        Bestätigen Sie die Merksätze ({checked.size}/{statements.length})
      </p>
      {statements.map((text, i) => {
        const isChecked = checked.has(i);
        return (
          <label
            key={`${sectionId}-${i}`}
            className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
              isChecked
                ? "border-bbw-green-500 bg-bbw-green-50"
                : "border-gray-200 bg-white hover:border-bbw-green-300"
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggle(i)}
              className="mt-0.5 w-5 h-5 rounded border-gray-300 text-bbw-green-500 focus:ring-bbw-green-500 accent-bbw-green-500 shrink-0"
            />
            <span className="text-sm text-gray-800 leading-relaxed">{text}</span>
          </label>
        );
      })}
    </div>
  );
}
