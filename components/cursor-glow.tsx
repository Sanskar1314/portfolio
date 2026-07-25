"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf: number;

    function onMove(e: MouseEvent) {
      if (!visible) setVisible(true);
      if (glowRef.current) {
        // Use requestAnimationFrame for smooth performance
        raf = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          }
        });
      }
    }

    function onLeave() {
      setVisible(false);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
