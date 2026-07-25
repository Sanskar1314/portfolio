"use client";

import { useEffect, useState } from "react";

const roles = [
  "intelligent data products.",
  "AI-powered systems.",
  "NLP pipelines.",
  "RAG applications.",
  "recommendation engines.",
];

export function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 65);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <span className="typewriter-wrap">
      {roles[roleIndex].slice(0, charIndex)}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
