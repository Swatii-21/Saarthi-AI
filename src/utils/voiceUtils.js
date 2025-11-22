// src/utils/voiceUtils.js

// Convert language code for TTS
export const getLanguageCode = (language) => {
  const languageMap = {
    en: "en-US",
    hi: "hi-IN",
    mr: "mr-IN",
    te: "te-IN",
    ta: "ta-IN",
    kn: "kn-IN",
    gu: "gu-IN",
    bn: "bn-IN",
    pa: "pa-IN",
    ml: "ml-IN",
  };
  return languageMap[language] || "en-US";
};

// --------------------------------------
// Whisper Backend STT Recorder + Sender
// --------------------------------------
export const recordAndTranscribe = async (onResult, onError, duration = 5000) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus", // FIXED
    });

    const audioChunks = [];

    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
    mediaRecorder.start();

    setTimeout(() => mediaRecorder.stop(), duration);

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm;codecs=opus" });

      const formData = new FormData();
      formData.append("audio", audioBlob, "voice.webm");

      try {
        const response = await fetch("http://localhost:8000/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log("📩 Server Response:", data);

        if (data.text && data.text.trim() !== "")
          onResult(data.text);
        else
          onError("No transcription received");
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        onError(err.message);
      }
    };
  } catch (err) {
    console.error("🎤 Mic Error:", err);
    onError(err.message);
  }
};

// --------------------------------------
// Text to Speech
// --------------------------------------
export const speakText = (text, language, onEnd) => {
  if (!("speechSynthesis" in window)) return null;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getLanguageCode(language);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
  return utterance;
};

// --------------------------------------
// Stop TTS
// --------------------------------------
export const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

// --------------------------------------
// Check voice availability
// --------------------------------------
export const isVoiceSupported = () => {
  return (
    "speechSynthesis" in window &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
};
