"use client";

interface RoleHintProps {
  role: "lernende" | "lehrpersonen" | "mitarbeitende";
  children: React.ReactNode;
}

const STYLES = {
  lernende: {
    className: "bg-blue-50 border border-blue-200 text-blue-800",
    label: "Lernende:",
  },
  lehrpersonen: {
    className: "bg-amber-50 border border-amber-200 text-amber-800",
    label: "Lehrpersonen:",
  },
  mitarbeitende: {
    className: "bg-emerald-50 border border-emerald-200 text-emerald-800",
    label: "Mitarbeitende:",
  },
};

export default function RoleHint({ role, children }: RoleHintProps) {
  const style = STYLES[role];
  return (
    <div className={`flex items-start gap-2 text-sm rounded-lg p-3 mt-2 ${style.className}`}>
      <span className="font-semibold shrink-0">{style.label}</span>
      <span>{children}</span>
    </div>
  );
}
