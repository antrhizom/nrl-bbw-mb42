"use client";

import { useState, useRef } from "react";
import { speak, stopSpeaking } from "@/lib/speak";

interface RoleAccordionProps {
  roles: string;
  children: React.ReactNode;
}

const ROLE_COLORS: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  "Lehrpersonen": { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800", icon: "text-amber-500" },
  "Mitarbeitende": { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-800", icon: "text-emerald-500" },
  "Lernende": { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-800", icon: "text-blue-500" },
};

function getStyle(roles: string) {
  if (roles.includes("Lehrpersonen") && roles.includes("Mitarbeitende")) {
    return { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800", icon: "text-amber-500" };
  }
  for (const [role, style] of Object.entries(ROLE_COLORS)) {
    if (roles.includes(role)) return style;
  }
  return { bg: "bg-gray-50", border: "border-gray-300", text: "text-gray-800", icon: "text-gray-500" };
}

export default function RoleAccordion({ roles, children }: RoleAccordionProps) {
  const [open, setOpen] = useState(false);
  const style = getStyle(roles);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${style.border} border rounded-lg overflow-hidden mt-3`}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => speak(`Hinweis für ${roles}`)}
        onMouseLeave={stopSpeaking}
        className={`w-full flex items-center justify-between px-4 py-3 ${style.bg} hover:opacity-90 transition-opacity text-left`}
      >
        <span className={`text-sm font-semibold ${style.text}`}>{roles}</span>
        <span className={`${style.icon} text-lg`}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div
          ref={contentRef}
          onMouseEnter={() => { const t = contentRef.current?.textContent; if (t) speak(t); }}
          onMouseLeave={stopSpeaking}
          className={`px-4 py-3 ${style.bg} border-t ${style.border} text-sm ${style.text} leading-relaxed animate-fade-in cursor-default`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
