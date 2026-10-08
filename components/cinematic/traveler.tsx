"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { smooth, timeline } from "@/lib/timeline";

type Pose = { p: number; x: number; y: number; height: number; angle: number };
const desktop: Pose[] = [
  { p: 0, x: 0.25, y: 0.54, height: 0.86, angle: -5 },
  { p: 0.055, x: 0.25, y: 0.54, height: 0.86, angle: -5 },
  { p: 0.115, x: 0.27, y: 0.44, height: 0.39, angle: -24 },
  { p: 0.17, x: 0.22, y: 0.5, height: 0.31, angle: -12 },
  { p: 0.25, x: 0.23, y: 0.55, height: 0.35, angle: -8 },
  { p: 0.32, x: 0.14, y: 0.78, height: 0.14, angle: 8 },
  { p: 0.4, x: 0.77, y: 0.79, height: 0.13, angle: -8 },
  { p: 0.48, x: 0.22, y: 0.79, height: 0.12, angle: 8 },
  { p: 0.56, x: 0.78, y: 0.8, height: 0.12, angle: -8 },
  { p: 0.65, x: 0.16, y: 0.78, height: 0.15, angle: -5 },
  { p: 0.8, x: 0.14, y: 0.78, height: 0.13, angle: 5 },
  { p: 0.88, x: 0.34, y: 0.76, height: 0.12, angle: 0 },
  { p: 0.96, x: 0.6, y: 0.81, height: 0.14, angle: 0 },
  { p: 1, x: 0.6, y: 0.81, height: 0.14, angle: 0 },
];
const compact: Pose[] = [
  { p: 0, x: 0.29, y: 0.37, height: 0.61, angle: -5 },
  { p: 0.045, x: 0.29, y: 0.37, height: 0.61, angle: -5 },
  { p: 0.115, x: 0.36, y: 0.3, height: 0.27, angle: -24 },
  { p: 0.17, x: 0.78, y: 0.79, height: 0.13, angle: -8 },
  { p: 0.25, x: 0.83, y: 0.8, height: 0.13, angle: -8 },
  { p: 0.285, x: 0.92, y: 0.85, height: 0.07, angle: 8 },
  { p: 0.35, x: 0.92, y: 0.85, height: 0.07, angle: 8 },
  { p: 0.4, x: 0.85, y: 0.83, height: 0.1, angle: -8 },
  { p: 0.48, x: 0.16, y: 0.82, height: 0.1, angle: 8 },
  { p: 0.56, x: 0.86, y: 0.83, height: 0.1, angle: -8 },
  { p: 0.65, x: 0.18, y: 0.79, height: 0.12, angle: -5 },
  { p: 0.8, x: 0.13, y: 0.83, height: 0.1, angle: 5 },
  { p: 0.88, x: 0.25, y: 0.8, height: 0.1, angle: 0 },
  { p: 0.96, x: 0.74, y: 0.85, height: 0.12, angle: 0 },
  { p: 1, x: 0.74, y: 0.85, height: 0.12, angle: 0 },
];
export function sampleTraveler(p: number, small: boolean): Pose {
  const stops = small ? compact : desktop;
  for (let i = 1; i < stops.length; i++)
    if (p <= stops[i].p) {
      const a = stops[i - 1],
        b = stops[i],
        t = smooth(a.p, b.p, p);
      return {
        p,
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        height: a.height + (b.height - a.height) * t,
        angle: a.angle + (b.angle - a.angle) * t,
      };
    }
  return stops[stops.length - 1];
}
// Persistent 2.5D character plates preserve the actual hero suit across every scene.
// The universe remains real-time 3D; no photographic/model swap occurs on departure.
export function Traveler({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0,
      last = performance.now(),
      idle = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused) idle += dt;
      const p = timeline.progress;
      const pose = sampleTraveler(p, innerWidth < 900);
      const h = innerHeight * pose.height;
      const rear = smooth(0.105, 0.14, p);
      if (ref.current) {
        ref.current.style.width = `${(h * 2) / 3}px`;
        ref.current.style.height = `${h}px`;
        ref.current.style.transform = `translate3d(${innerWidth * pose.x - h / 3}px,${innerHeight * pose.y - h / 2 + Math.sin(idle * 0.6) * 3}px,0) rotate(${pose.angle + Math.sin(idle * 0.4)}deg) rotateY(${rear * 180}deg)`;
        ref.current.dataset.progress = p.toFixed(5);
      }
      if (back.current) back.current.style.opacity = "1";
      if (front.current) front.current.style.opacity = "1";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);
  return (
    <div ref={ref} className="traveler" aria-hidden="true">
      <div ref={front} className="traveler-plate">
        <Image
          src="/images/astronaut.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 65vw, 50vw"
          priority
        />
      </div>
      <div ref={back} className="traveler-plate traveler-rear">
        <Image
          src="/images/astronaut-rear.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 25vw, 25vw"
        />
      </div>
    </div>
  );
}
