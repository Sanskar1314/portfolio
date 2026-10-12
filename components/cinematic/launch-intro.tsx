"use client";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

export function LaunchIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(3);
  const overlay = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const active = stage >= 0;
  const finish = useCallback(() => {
    onComplete();
    setStage(-1);
  }, [onComplete]);
  useEffect(() => {
    if (!active) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      const timer = setTimeout(finish, 0);
      return () => clearTimeout(timer);
    }
    const timers = [
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(0), 3000),
      setTimeout(finish, 5100),
    ];
    const stop = () => { if (reduced.matches) finish(); };
    reduced.addEventListener("change", stop);
    return () => { timers.forEach(clearTimeout); reduced.removeEventListener("change", stop); };
  }, [active, finish]);
  useEffect(() => {
    if (!active || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = overlay.current;
    if (!root) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const siblings = Array.from(root.parentElement?.children ?? []).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== root);
    const oldInert = siblings.map(el => el.inert);
    siblings.forEach(el => { el.inert = true; });
    const oldOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    skip.current?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", escape);
    return () => {
      siblings.forEach((el, i) => { el.inert = oldInert[i]; });
      document.documentElement.style.overflow = oldOverflow;
      window.removeEventListener("keydown", escape);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [active, finish]);
  if (!active) return null;
  return (
    <div ref={overlay} className={`launch-intro ${stage === 0 ? "is-lifting" : ""}`} role="dialog" aria-modal="true" aria-label="Launch countdown">
      <div className="intro-ascent-stars" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => <i key={index} style={{
          "--star-x": `${(index * 37 + 7) % 100}%`,
          "--star-y": `${(index * 23 + 11) % 100}%`,
          "--star-delay": `${(index % 6) * 55}ms`,
          "--star-length": `${28 + (index % 5) * 15}px`,
        } as CSSProperties} />)}
      </div>
      <div className="intro-ignition-glow" aria-hidden="true" />
      <div className="intro-brand">SG <span> / PERSONAL EXPLORATION</span></div>
      <button ref={skip} className="intro-skip" onClick={finish}>Skip intro ↗</button>
      <div className="intro-count">
        <p>PREPARE FOR DEPARTURE</p>
        <strong key={stage} aria-live="polite" aria-atomic="true">{stage || "LIFT OFF"}</strong>
        <span>EVERY JOURNEY STARTS WITH CURIOSITY</span>
      </div>
      <div className="intro-flight" aria-hidden="true">
        <svg viewBox="0 0 100 260" className="intro-rocket">
          <defs><linearGradient id="intro-hull"><stop stopColor="#6e7779"/><stop offset=".45" stopColor="#f5f1df"/><stop offset="1" stopColor="#8a959b"/></linearGradient><linearGradient id="intro-fire" x2="0" y2="1"><stop stopColor="#fff6d8"/><stop offset=".3" stopColor="#e3b570"/><stop offset="1" stopColor="#b67c40" stopOpacity="0"/></linearGradient></defs>
          <path className="intro-exhaust" d="M38 160 Q28 208 50 260 Q73 207 62 160Z" fill="url(#intro-fire)"/>
          <path d="M30 109L12 149L12 176L36 155M70 109L88 149L88 176L64 155" fill="#665b49" stroke="#c6b38d"/>
          <path d="M50 10Q24 43 28 125L34 162H66L72 125Q76 43 50 10Z" fill="url(#intro-hull)" stroke="#e6dfcc"/>
          <path d="M50 10Q37 28 32 47H68Q63 28 50 10" fill="#b8a078"/>
          <circle cx="50" cy="78" r="13" fill="#17232a" stroke="#9b875f" strokeWidth="4"/>
          <path d="M43 75Q49 68 57 75" fill="none" stroke="#c0d7df" strokeWidth="2"/>
          <path d="M31 132H69M33 142H67" stroke="#52606a" strokeWidth="3"/>
          <path d="M38 163H62" stroke="#313638" strokeWidth="7"/>
        </svg>
      </div>
      <div className="intro-horizon opening-earth" aria-hidden="true" />
      <p className="intro-footer">SANSKAR GUPTA <span>EARTH → THE UNKNOWN</span></p>
    </div>
  );
}
