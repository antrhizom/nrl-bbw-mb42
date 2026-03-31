"use client";

import { useState, useEffect, useRef } from "react";

interface MerksatzCheckProps {
  statements: string[];
  sectionId: string;
  onAllChecked: () => void;
}

export default function MerksatzCheck({ statements, sectionId, onAllChecked }: MerksatzCheckProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const calledRef = useRef(false);

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
