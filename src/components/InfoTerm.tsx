"use client";

import { useState } from "react";
import { GLOSSARY } from "@/lib/glossary";

interface InfoTermProps {
  children: string;
}

export default function InfoTerm({ children }: InfoTermProps) {
  const [open, setOpen] = useState(false);

  const term = children;
  const explanation =
    GLOSSARY[term] ||
    GLOSSARY[term.replace(/n$/, "")] ||
    GLOSSARY[term.replace(/en$/, "")] ||
    GLOSSARY[term.replace(/s$/, "")] ||
    Object.entries(GLOSSARY).find(([key]) =>
      term.toLowerCase().startsWith(key.toLowerCase())
    )?.[1] ||
    "";

  if (!explanation) {
    return <span className="font-medium">{children}</span>;
  }

  const displayTerm =
    Object.keys(GLOSSARY).find((k) => GLOSSARY[k] === explanation) || term;

  return (
    <span
      className="relative inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="text-bbw-green-700 underline decoration-dotted decoration-bbw-green-400 underline-offset-2 font-medium cursor-help">
        {children}
      </span>
      {open && (
        <span className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-bbw-green-300 rounded-lg shadow-lg p-3 text-sm text-gray-700 leading-relaxed animate-fade-in pointer-events-none">
          <span className="font-semibold text-bbw-green-700 block mb-1">
            {displayTerm}
          </span>
          {explanation}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-bbw-green-300" />
        </span>
      )}
    </span>
  );
}
