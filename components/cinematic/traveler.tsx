"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { smooth, timeline } from "@/lib/timeline";
// The portrait stays face-on; the volumetric suit takes over before departure.
export function Traveler({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (ref.current) {
        const small = innerWidth < 900;
        const height = innerHeight * (small ? 0.61 : 0.86);
        ref.current.style.width = `${(height * 2) / 3}px`;
        ref.current.style.height = `${height}px`;
        ref.current.style.transform = `translate3d(${innerWidth * (small ? 0.29 : 0.25) - height / 3}px,${innerHeight * (small ? 0.37 : 0.54) - height / 2}px,0)`;
        ref.current.style.opacity = String(
          1 - smooth(0.045, 0.075, timeline.progress),
        );
        ref.current.dataset.progress = timeline.progress.toFixed(5);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);
  return (
    <div ref={ref} className="traveler" aria-hidden="true">
      <div className="traveler-plate">
        <Image
          src="/images/astronaut.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 65vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
