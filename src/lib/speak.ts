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

export function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
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
