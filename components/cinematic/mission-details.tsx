"use client";

import { useEffect, useId, useRef, useState } from "react";

type Mission = {
  title: string;
  number: string;
  details: readonly string[];
  stack: readonly string[];
  github: string;
  live?: string;
};

export function MissionDetails({ project }: { project: Mission }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const panel = dialog.current!;
    const opener = trigger.current;
    const position = { left: window.scrollX, top: window.scrollY, behavior: "instant" as const };
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panel.showModal();
    window.scrollTo(position);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      panel.close();
      document.documentElement.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
      window.scrollTo(position);
    };
  }, [open]);

  function close() {
    if (closing) return;
    setClosing(true);
    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    timer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, delay);
  }

  return <>
    <details className="mission-details mission-disclosure">
      <summary ref={trigger} aria-haspopup="dialog" onClick={event => {
        event.preventDefault();
        setOpen(true);
      }}>
        <span>Inside the mission</span><span className="mission-open-icon" aria-hidden="true">↗</span>
      </summary>
      <ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
    </details>
    <dialog ref={dialog} className="mission-dialog" data-closing={closing} aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="mission-dossier">
        <header className="dossier-header">
          <span className="eyebrow">MISSION {project.number} / BEHIND THE BUILD</span>
          <button type="button" className="dossier-close" onClick={close} aria-label="Close project details" autoFocus>✕</button>
        </header>
        <div className="dossier-body">
          <h2 id={titleId}>{project.title}<span className="title-dot">.</span></h2>
          <p className="dossier-label">From idea to implementation</p>
          <ol>{project.details.map((detail, index) => <li key={detail}>
            <span aria-hidden="true">0{index + 1}</span><p>{detail}</p>
          </li>)}</ol>
          <div className="dossier-stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
        </div>
        <footer className="dossier-actions">
          <a className="pill-link" href={project.github} target="_blank" rel="noopener noreferrer">View on GitHub <span>↗</span></a>
          {project.live && <a className="text-link" href={project.live} target="_blank" rel="noopener noreferrer">Live mission <span>↗</span></a>}
        </footer>
      </div>
    </dialog>
  </>;
}
