"use client";
import { useEffect, useRef } from "react";

export function OrbitPointer({ paused }: { paused: boolean }) {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const el = ring.current;
    if (!el || paused) return;
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch") return;
      el.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      el.dataset.visible = "true";
      el.dataset.interactive = String(event.target instanceof Element && !!event.target.closest("a,button,summary"));
    };
    const hide = () => { el.dataset.visible = "false"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
    };
  }, [paused]);
  return <div ref={ring} className="orbit-pointer" aria-hidden="true"><i /><span /></div>;
}
