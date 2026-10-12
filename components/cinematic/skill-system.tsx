"use client";
import { useState } from "react";
import { skillGroups } from "@/lib/content";
const marks = ["{ }", "∿", "✳", "⌘", "∑"];
const descriptions = ["The foundations I build with.", "Exploring intelligence in data.", "Understanding and building with language.", "Everything that makes ideas real.", "Turning data into decisions."];
export function SkillSystem() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="skill-orbital-atlas interactive-atlas" role="group" aria-label="Explore technology planets" onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}>
      <div className="atlas-stage">
        <div className="atlas-orbits" aria-hidden="true"><i /><i /><i /><b /><b /><b /></div>
        <div className="atlas-sun" aria-hidden="true"><span /></div>
        {skillGroups.map((group, index) => (
          <button type="button" className={`planet-selector planet-selector-${index}`} key={group.label}
            onPointerEnter={event => { if (event.pointerType !== "touch") setSelected(index); }}
            onPointerLeave={event => { if (event.pointerType !== "touch") setSelected(current => current === index ? null : current); }}
            onBlur={() => setSelected(current => current === index ? null : current)}
            onFocus={() => setSelected(index)} onClick={() => setSelected(index)}
            aria-expanded={selected === index} aria-controls="planet-information" aria-describedby="skills-explore-hint">
            <span className="atlas-badge" aria-hidden="true"><span>{marks[index]}</span></span>
            <span className="planet-name">{group.label}<span className="planet-reveal-mark" aria-hidden="true">+</span></span>
          </button>
        ))}
        <div className="planet-information" id="planet-information" aria-live="polite" hidden={selected === null}>
          {selected !== null && <>
            <span className="atlas-index">0{selected + 1} / KNOWLEDGE FIELD</span>
            <h3>{skillGroups[selected].label}</h3>
            <p>{descriptions[selected]}</p>
            <ul>{skillGroups[selected].skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </>}
        </div>
      </div>
    </div>
  );
}
