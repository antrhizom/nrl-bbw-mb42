"use client";

import { useRef } from "react";
import { speak, stopSpeaking } from "@/lib/speak";

interface SpeakableTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "div" | "span";
}

export default function SpeakableText({ children, className = "", as: Tag = "p" }: SpeakableTextProps) {
  const ref = useRef<HTMLElement>(null);

  const handleEnter = () => {
    const text = ref.current?.textContent || "";
    if (text.trim()) speak(text);
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={`cursor-default ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={stopSpeaking}
    >
      {children}
    </Tag>
  );
}
