let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-CH";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}
