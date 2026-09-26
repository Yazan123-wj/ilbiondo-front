"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "ilbiondo-atelier-music";
const AUDIO_SRC = "/audio/atelier-jazz.mp3";
const TARGET_VOLUME = 0.22;

type MusicContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

function fadeVolume(audio: HTMLAudioElement, to: number, ms = 640) {
  const from = audio.volume;
  const started = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - started) / ms);
    audio.volume = from + (to - from) * progress;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export function AtelierMusicProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const [enabled, setEnabled] = useState(false);

  const clearUnlock = () => {
    if (!unlockRef.current) return;
    window.removeEventListener("pointerdown", unlockRef.current);
    unlockRef.current = null;
  };

  const play = useCallback((audio: HTMLAudioElement) => {
    audio.volume = 0;
    const attempt = audio.play();
    if (attempt) {
      void attempt
        .then(() => {
          fadeVolume(audio, TARGET_VOLUME);
        })
        .catch(() => {
          clearUnlock();
          const unlock = () => {
            audio.volume = 0;
            void audio.play().then(() => fadeVolume(audio, TARGET_VOLUME));
            clearUnlock();
          };
          unlockRef.current = unlock;
          window.addEventListener("pointerdown", unlock, { once: true });
        });
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;

    if (window.localStorage.getItem(STORAGE_KEY) === "on") {
      setEnabled(true);
      play(audio);
    }

    const onVisibility = () => {
      if (document.hidden) {
        audio.pause();
        return;
      }
      if (window.localStorage.getItem(STORAGE_KEY) === "on") {
        play(audio);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearUnlock();
      document.removeEventListener("visibilitychange", onVisibility);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [play]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (enabled) {
      fadeVolume(audio, 0, 280);
      window.setTimeout(() => audio.pause(), 300);
      window.localStorage.setItem(STORAGE_KEY, "off");
      setEnabled(false);
      clearUnlock();
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, "on");
    setEnabled(true);
    play(audio);
  }, [enabled, play]);

  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);

  return (
    <MusicContext.Provider value={value}>
      {children}
      <MusicToggle />
    </MusicContext.Provider>
  );
}

export function useAtelierMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useAtelierMusic must be used within AtelierMusicProvider");
  }
  return context;
}

function SpeakerIcon({ off }: { off?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4.5 9.5h3.2L12 6.2v11.6L7.7 14.5H4.5V9.5Z" />
      {off ? (
        <path d="m16 9 4 6m0-6-4 6" />
      ) : (
        <>
          <path d="M15.4 9.2a3.6 3.6 0 0 1 0 5.6" />
          <path d="M17.6 7a6.2 6.2 0 0 1 0 10" />
        </>
      )}
    </svg>
  );
}

function MusicToggle() {
  const { enabled, toggle } = useAtelierMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn off atelier music" : "Turn on atelier music"}
      title={enabled ? "Sound on" : "Sound off"}
      className={cn(
        "fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300 md:right-8 md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:h-14 md:w-14",
        enabled
          ? "border-accent bg-accent text-background"
          : "border-foreground/15 bg-background/85 text-foreground hover:border-foreground/30",
      )}
    >
      <SpeakerIcon off={!enabled} />
    </button>
  );
}
