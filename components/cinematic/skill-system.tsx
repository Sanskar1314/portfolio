import { skillGroups } from "@/lib/content";
export function SkillSystem() {
  return (
    <div
      className="skill-solar-system"
      role="group"
      aria-label="Technology solar system"
    >
      <div className="solar-orbits" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="solar-planets">
        {skillGroups.map((group, index) => (
          <article
            className={`tech-planet tech-planet-${index}`}
            key={group.label}
            aria-label={group.label}
          >
            <div className="tech-surface" aria-hidden="true" />
            <div className="tech-label">
              <span className="tech-number">WORLD 0{index + 1}</span>
              <h3>{group.label}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
