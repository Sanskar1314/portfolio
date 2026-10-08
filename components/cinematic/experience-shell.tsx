"use client";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/content";
import {
  type ReactNode,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  chapters,
  chapterStart,
  clamp,
  sampleTimeline,
  timeline,
  sceneBlend,
  TRANSITION,
} from "@/lib/timeline";
const Universe = dynamic(() => import("./universe"), {
  ssr: false,
  loading: () => <span className="loading-world">ESTABLISHING TRAJECTORY</span>,
});

export function ExperienceShell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"loading" | "cinematic" | "reader">(
    "loading",
  );
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [failure, setFailure] = useState(false);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const destinationRef = useRef<string | null>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const choose = () => {
      timeline.reduced = media.matches;
      setMode(media.matches ? "reader" : "cinematic");
    };
    choose();
    media.addEventListener("change", choose);
    return () => media.removeEventListener("change", choose);
  }, []);
  useEffect(() => {
    if (destinationRef.current || (mode === "cinematic" && location.hash)) {
      const destination = destinationRef.current || location.hash.slice(1);
      destinationRef.current = null;
      requestAnimationFrame(() => {
        const el = document.getElementById(destination);
        if (el)
          window.scrollTo({
            top:
              mode === "cinematic"
                ? (chapterStart(
                    Math.max(
                      0,
                      chapters.findIndex((c) => c.id === destination),
                    ),
                  ) +
                    (destination === "top" ? 0 : TRANSITION * 1.05)) *
                  (document.documentElement.scrollHeight - innerHeight)
                : el.offsetTop,
            behavior: "instant",
          });
      });
    }
    if (mode !== "cinematic") return;
    const elements = [...document.querySelectorAll<HTMLElement>(".chapter")];
    let raf = 0;
    let previous = performance.now();
    let scrollMax = 1;
    const measure = () => {
      scrollMax = Math.max(
        1,
        document.documentElement.scrollHeight - innerHeight,
      );
    };
    measure();
    window.addEventListener("resize", measure);
    const alignHash = () => {
      const index = chapters.findIndex((c) => c.id === location.hash.slice(1));
      if (index < 0) return;
      requestAnimationFrame(() =>
        window.scrollTo({
          top:
            (chapterStart(index) + (index === 0 ? 0 : TRANSITION * 1.05)) *
            scrollMax,
          behavior: "smooth",
        }),
      );
    };
    window.addEventListener("hashchange", alignHash);

    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      timeline.target = clamp(scrollY / scrollMax);
      timeline.progress =
        Math.abs(timeline.target - timeline.progress) < 0.00001
          ? timeline.target
          : timeline.progress +
            (timeline.target - timeline.progress) * (1 - Math.exp(-dt * 10));
      const { chapter, local } = sampleTimeline(timeline.progress);
      timeline.chapter = chapter;
      timeline.local = local;
      if (chapter !== activeRef.current) {
        activeRef.current = chapter;
        setActive(chapter);
      }
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${timeline.progress})`;
      elements.forEach((el, i) => {
        const start = chapterStart(i);
        const localPosition =
          (timeline.progress - start) / (chapters[i].duration / 100);
        const content = el.firstElementChild as HTMLElement;
        const blend = sceneBlend(i, timeline.progress);
        const visible = blend.opacity > 0.001;
        content.style.visibility = visible ? "visible" : "hidden";
        content.style.pointerEvents = i === chapter ? "auto" : "none";
        content.inert = i !== chapter;
        content.style.opacity = String(blend.opacity);
        content.style.setProperty("--scene-shift", `${blend.offset}px`);
        content.style.setProperty(
          "--scene-phase",
          String(clamp(localPosition)),
        );
        content.style.setProperty("--exit", "0");
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("hashchange", alignHash);
      elements.forEach((el) => {
        const content = el.firstElementChild as HTMLElement;
        content.style.visibility = "";
        content.style.pointerEvents = "";
        content.style.opacity = "";
        content.inert = false;
        content.style.removeProperty("--scene-shift");
      });
    };
  }, [mode]);
  function toggleMode() {
    destinationRef.current =
      mode === "reader"
        ? location.hash.slice(1) || "top"
        : chapters[activeRef.current].id;
    setMode(mode === "reader" ? "cinematic" : "reader");
    setFailure(false);
  }
  function navigate(event: MouseEvent<HTMLDivElement>) {
    if (
      mode !== "cinematic" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = (event.target as HTMLElement).closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href")!.slice(1),
      index = chapters.findIndex((c) => c.id === id);
    if (index < 0) return;
    event.preventDefault();
    const max = document.documentElement.scrollHeight - innerHeight;
    const target =
      (chapterStart(index) + (index === 0 ? 0 : TRANSITION * 1.05)) * max;
    history.pushState(null, "", `#${id}`);
    window.scrollTo({
      top: target,
      behavior: timeline.reduced ? "instant" : "smooth",
    });
  }
  const reader = mode !== "cinematic";
  return (
    <div
      ref={shellRef}
      onClick={navigate}
      className={`experience ${reader ? "reader-mode" : "cinematic-mode"} ${paused ? "motion-paused" : ""}`}
    >
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Sanskar Gupta, back to start"
        >
          SG<span> / EXPLORER</span>
        </a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          {[
            ["About", "about"],
            ["Skills", "skills"],
            ["Projects", "work"],
            ["Experience", "experience"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenu(false)}
              aria-current={chapters[active].id === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-label="Toggle navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"} <span>{menu ? "−" : "+"}</span>
        </button>
        <a
          className="header-contact"
          href={`mailto:${siteConfig.email}`}
          aria-label="Email Sanskar"
        >
          LET’S TALK <span>↗</span>
        </a>
      </header>
      <div className="universe-fallback" aria-hidden="true" />
      {mode === "cinematic" && !failure && (
        <Universe
          paused={paused}
          onFailure={() => {
            setFailure(true);
            setMode("reader");
          }}
        />
      )}
      <main id="main-content">{children}</main>
      <aside className="flight-controls" aria-label="Display settings">
        <button onClick={toggleMode}>
          {reader ? "Enter space ↗" : "Read portfolio ↗"}
        </button>
        {!reader && (
          <button aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        )}
        {failure && (
          <span role="status">3D unavailable · all content is below</span>
        )}
      </aside>
      {!reader && (
        <div className="flight-position" aria-hidden="true">
          <span>
            {String(active).padStart(2, "0")} / {chapters[active].label}
          </span>
          <span className="flight-dots">
            {chapters.map((c, i) => (
              <i key={c.id} className={active === i ? "active" : ""} />
            ))}
          </span>
        </div>
      )}
      <div className="journey-progress" aria-hidden="true">
        <div ref={progressRef} />
      </div>
    </div>
  );
}
