"use client";
import { useState } from "react";
import { skillGroups } from "@/lib/content";
import { selectSkill } from "@/lib/timeline";
const descriptions = [
  "The foundation. Turning a question into a clear, working solution.",
  "Learning from patterns. From preparing features to training neural networks.",
  "Connecting language and knowledge through retrieval and grounded answers.",
  "Taking an idea beyond the notebook and into a working application.",
  "Making messy information understandable, useful and visual.",
];
export function SkillSystem() {
  const [selected, select] = useState(0);
  function choose(index: number) {
    select(index);
    selectSkill(index);
  }
  return (
    <div className="skill-system skill-system-v2">
      <div className="skill-map" aria-hidden="true">
        <span className="system-orbit system-orbit-a" />
        <span className="system-orbit system-orbit-b" />
        <span className="system-coordinate">
          {String(selected + 1).padStart(2, "0")} / KNOWLEDGE SYSTEM
        </span>
      </div>
      <div
        className="skill-selectors"
        role="group"
        aria-label="Explore technology groups"
      >
        {skillGroups.map((group, index) => (
          <button
            key={group.label}
            className={`skill-node ${selected === index ? "selected" : ""}`}
            aria-label={group.label}
            aria-pressed={selected === index}
            onClick={() => choose(index)}
          >
            <span className="node-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{group.label}</span>
            <span className="node-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="skill-readout" aria-live="polite">
        <p className="eyebrow">
          {String(selected + 1).padStart(2, "0")} /{" "}
          {skillGroups[selected].label}
        </p>
        <h3>{descriptions[selected]}</h3>
        <div className="skill-tools">
          {skillGroups[selected].skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <span className="subtle">Select a field to explore.</span>
      </div>
    </div>
  );
}
