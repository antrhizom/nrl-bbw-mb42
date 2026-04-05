let bestVoice: SpeechSynthesisVoice | null = null;

function findBestVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const priorities = [
    (v: SpeechSynthesisVoice) => v.lang.startsWith("de") && /neural|natural|enhanced|online/i.test(v.name) && v.lang.includes("CH"),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("de") && /neural|natural|enhanced|online/i.test(v.name),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("de") && /google|microsoft|katja|petra|conrad/i.test(v.name),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("de"),
  ];
  for (const prio of priorities) {
    const match = voices.find(prio);
    if (match) return match;
  }
  return null;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => { bestVoice = findBestVoice(); };
  }
  setTimeout(() => { if (!bestVoice) bestVoice = findBestVoice(); }, 200);
}

/** Bereitet Text für natürliches Vorlesen auf */
function prepareForSpeech(raw: string): string {
  let t = raw;

  // Abkürzungen ausschreiben
  const abbrevs: Record<string, string> = {
    "IKT": "I-K-T",
    "NRL": "N-R-L",
    "BYOD": "Bring Your Own Device",
    "MFA": "Mehr-Faktor-Authentifizierung",
    "TIKT": "T-I-K-T",
    "PIKT": "P-I-K-T",
    "BBW": "B-B-W",
    "GT7": "G-T sieben",
    "LIS": "L-I-S",
    "EDU": "E-D-U",
    "PDF": "P-D-F",
    "PIN": "Pin",
    "USB": "U-S-B",
    "SMS": "S-M-S",
    "z.B.": "zum Beispiel",
    "z. B.": "zum Beispiel",
    "u.a.": "unter anderem",
    "u. a.": "unter anderem",
    "bzw.": "beziehungsweise",
    "etc.": "et zetera",
    "d.h.": "das heisst",
    "d. h.": "das heisst",
    "ca.": "zirka",
    "inkl.": "inklusive",
    "Kap.": "Kapitel",
    "Pt.": "Punkte",
    "Pt": "Punkte",
  };

  // Abkürzungen ersetzen (ganze Wörter)
  for (const [abbr, full] of Object.entries(abbrevs)) {
    // Escape regex special chars
    const escaped = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(new RegExp(`\\b${escaped}\\b`, "g"), full);
  }

  // Zusammengesetzte Abkürzungen mit Bindestrich: "EDU-Tenant" → "E-D-U Tenant"
  t = t.replace(/EDU-Tenant/g, "E-D-U Tenant");
  t = t.replace(/TIKT-Team/g, "T-I-K-T Team");
  t = t.replace(/PIKT-Team/g, "P-I-K-T Team");
  t = t.replace(/IKT-System/g, "I-K-T System");
  t = t.replace(/IKT-Support/g, "I-K-T Support");

  // Englische Begriffe: Pause davor/danach für Sprachwechsel-Hinweis
  const englishTerms = [
    "Bring Your Own Device",
    "Clean-Desk",
    "Clear-Screen",
    "Mining",
    "Malware",
    "Collaboration Tools",
    "Smart Glasses",
    "Wearables",
    "OpenOlat",
    "SharePoint",
    "OneDrive",
    "Nextcloud",
    "Teams",
    "ChatGPT",
  ];
  for (const term of englishTerms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(new RegExp(escaped, "g"), `, ${term}, `);
  }

  // Klammern als Pause: "(text)" → ", text, "
  t = t.replace(/\(([^)]+)\)/g, ", $1, ");

  // Titel/Überschriften: Punkt nach Titeln für Pause
  // Win+L erklären
  t = t.replace(/Win\+L/g, "Windows plus L");

  // Schrägstriche als "oder"
  t = t.replace(/\//g, " oder ");

  // Aufzählungszeichen entfernen
  t = t.replace(/[•·–—]/g, ", ");

  // Mehrfache Leerzeichen und Kommas bereinigen
  t = t.replace(/,\s*,/g, ",");
  t = t.replace(/\s+/g, " ");
  t = t.trim();

  return t;
}

export function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const prepared = prepareForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(prepared);
  if (bestVoice) utterance.voice = bestVoice;
  utterance.lang = "de-CH";
  utterance.rate = 0.92;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
