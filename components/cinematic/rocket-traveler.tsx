"use client";
import { useEffect, useRef } from "react";
import { clamp, smooth, timeline } from "@/lib/timeline";

export function RocketTraveler() {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (track.current) {
        const p = timeline.progress;
        const flight = clamp((p - 0.055) / 0.945);
        track.current.style.setProperty("--flight", String(flight));
        track.current.style.opacity = String(smooth(0.035, 0.085, p));
        track.current.dataset.progress = p.toFixed(5);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="rocket-track" ref={track} aria-hidden="true">
      <div className="rocket-route" />
      <div className="rocket-route-traveled" />
      <svg className="journey-rocket" viewBox="0 0 140 62" fill="none">
        <defs>
          <linearGradient
            id="rocketHull"
            x1="75"
            y1="12"
            x2="75"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f7f0db" />
            <stop offset=".45" stopColor="#bac7cb" />
            <stop offset="1" stopColor="#344751" />
          </linearGradient>
          <linearGradient id="rocketFlame">
            <stop stopColor="#75bded" stopOpacity="0" />
            <stop offset=".75" stopColor="#80cfff" stopOpacity=".7" />
            <stop offset="1" stopColor="#fff3d3" />
          </linearGradient>
        </defs>
        <path
          d="M0 31Q20 23 43 27L43 35Q20 39 0 31Z"
          fill="url(#rocketFlame)"
        />
        <path
          d="M48 23L51 9L72 19M48 39L51 54L72 43"
          fill="#34556b"
          stroke="#7796a5"
          strokeWidth="1"
        />
        <path
          d="M44 24Q75 10 109 22L133 31L109 40Q75 52 44 38Z"
          fill="url(#rocketHull)"
          stroke="#d5dedc"
          strokeWidth=".8"
        />
        <path d="M110 22L133 31L110 40Q116 31 110 22Z" fill="#b39a69" />
        <path d="M47 24L47 38M53 22L53 40" stroke="#263942" strokeWidth="2" />
        <ellipse
          cx="92"
          cy="30.5"
          rx="9"
          ry="8"
          fill="#173449"
          stroke="#d6bd88"
          strokeWidth="2"
        />
        <path
          d="M87 28Q91 24 96 28"
          stroke="#a3daed"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M62 32H77" stroke="#556773" strokeWidth="1" />
        <path d="M63 36H73" stroke="#556773" />
        <path d="M42 25L42 37" stroke="#87999c" strokeWidth="4" />
      </svg>
    </div>
  );
}
