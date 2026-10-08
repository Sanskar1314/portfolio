import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import {
  siteConfig,
  education,
  projects,
  experience,
  achievements,
  certifications,
  skillGroups,
} from "@/lib/content";
import { chapters } from "@/lib/timeline";
import { ExperienceShell } from "@/components/cinematic/experience-shell";
import { SkillSystem } from "@/components/cinematic/skill-system";

function Chapter({
  index,
  children,
  className = "",
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const chapter = chapters[index];
  return (
    <section
      id={chapter.id}
      className={`chapter chapter-${chapter.id} ${className}`}
      style={{ "--duration": chapter.duration } as CSSProperties}
      aria-label={chapter.title}
    >
      <div className="scene-content">
        <div className="chapter-caption">
          <span>{String(index).padStart(2, "0")}</span>
          <span className="caption-rule" />
          {chapter.label}
        </div>
        {children}
      </div>
    </section>
  );
}
const external = { target: "_blank", rel: "noopener noreferrer" };
export default function Home() {
  return (
    <ExperienceShell>
      <Chapter index={0}>
        <div className="hero-portrait" aria-hidden="true">
          <Image
            src="/images/astronaut.webp"
            alt=""
            width={1024}
            height={1536}
            priority
            sizes="(max-width: 700px) 85vw, 50vw"
          />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">A PERSONAL EXPLORATION / PORTFOLIO</p>
          <h1>
            SANSKAR
            <br />
            GUPTA<span className="title-dot">.</span>
          </h1>
          <p className="hero-role">
            DEVELOPER <i /> DATA SCIENCE <i /> AI / ML
          </p>
          <p className="hero-intro">
            Turning curiosity into
            <br />
            intelligent experiences.
          </p>
          <a className="text-link" href="#work">
            Explore selected work <span>↗</span>
          </a>
        </div>
        <a href="#launch" className="begin">
          <span className="scroll-track" />
          SCROLL TO BEGIN <span>↓</span>
        </a>
        <p className="earth-note">
          HOME PLANET
          <br />
          <span>EARTH · INDIA</span>
        </p>
      </Chapter>
      <Chapter index={1}>
        <div className="launch-copy">
          <p className="eyebrow">LEAVING THE COMFORT ZONE</p>
          <h2>
            Every journey
            <br />
            starts with
            <br />
            <em>curiosity.</em>
          </h2>
        </div>
      </Chapter>
      <Chapter index={2}>
        <div className="copy-block right">
          <p className="eyebrow">THE PERSON INSIDE THE SUIT</p>
          <h2>
            A curious mind.
            <br />A builder at heart.
          </h2>
          <p>
            I’m Sanskar, a B.Tech Data Science student at ABES Engineering
            College. I build AI systems that turn complex information into
            something people can actually use.
          </p>
          <p>
            From the first messy dataset to the final API, I enjoy connecting
            the entire journey.
          </p>
          <div className="fact-line">
            <div>
              <span>BASED ON EARTH</span>
              <p>Ghaziabad, India</p>
            </div>
            <div>
              <span>EDUCATION</span>
              <p>B.Tech · 2023–2027</p>
            </div>
          </div>
          <a className="text-link" href={siteConfig.resume} {...external}>
            Read my résumé <span>↗</span>
          </a>
        </div>
      </Chapter>
      <Chapter index={3}>
        <div className="skills-heading">
          <p className="eyebrow">CONNECTED BY CURIOSITY</p>
          <h2>
            My technology
            <br />
            <em>universe.</em>
          </h2>
        </div>
        <SkillSystem />
        <div className="reader-skills">
          {skillGroups.map((g) => (
            <p key={g.label}>
              <strong>{g.label}</strong> — {g.skills.join(", ")}
            </p>
          ))}
        </div>
      </Chapter>
      {projects.map((project, index) => (
        <Chapter index={4 + index} key={project.title}>
          <article className={`mission-copy ${index === 1 ? "right" : ""}`}>
            <p className="eyebrow">
              SELECTED MISSION / {project.number}{" "}
              <span className="small-divider" /> {project.date}
            </p>
            <h2>
              {project.title}
              <span className="title-dot">.</span>
            </h2>
            <h3>{project.eyebrow}</h3>
            <p>{project.description}</p>
            <div className="stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <details className="mission-details">
              <summary>
                Inside the mission <span>+</span>
              </summary>
              <ul>
                {project.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <a className="pill-link" href={project.github} {...external}>
              View on GitHub <span>↗</span>
            </a>
            {"live" in project && project.live && (
              <a
                className="text-link live-link"
                href={project.live}
                {...external}
              >
                Live mission <span>↗</span>
              </a>
            )}
          </article>
          <div
            className={`world-label ${index === 1 ? "left" : ""}`}
            aria-hidden="true"
          >
            <span>{index === 0 ? "01 / DISCOVERY" : "02 / KNOWLEDGE"}</span>
            <div />
            {index === 0
              ? "Finding the next great story."
              : "Making knowledge accessible."}
          </div>
        </Chapter>
      ))}
      <Chapter index={6}>
        <article className="mission-copy">
          <p className="eyebrow">RESEARCH MISSION / 03</p>
          <h2>
            Intelligence.
            <br />
            With purpose.
          </h2>
          <h3>Brain Tumor Detection</h3>
          <p>
            Exploring deep learning for MRI tumor classification using the
            Xception architecture.
          </p>
          <p>
            Published research classifying Glioma, Meningioma, Pituitary, and No
            Tumor categories.
          </p>
          <div className="stack">
            <span>Deep Learning</span>
            <span>Xception</span>
            <span>MRI Classification</span>
          </div>
          <p className="research-note">
            A research project, not a clinical diagnostic tool.
          </p>
        </article>
        <div className="world-label" aria-hidden="true">
          <span>03 / UNDERSTANDING</span>
          <div />
          Finding patterns that matter.
        </div>
      </Chapter>
      <Chapter index={7}>
        <div className="philosophy">
          <p className="eyebrow">A MOMENT OF PERSPECTIVE</p>
          <h2>
            Complex data.
            <br />
            Clearer possibilities.
          </h2>
          <p>That’s the space I like to work in.</p>
        </div>
      </Chapter>
      <Chapter index={8}>
        <div className="journey-content">
          <p className="eyebrow">SMALL STEPS. A GROWING TRAJECTORY.</p>
          <h2>The journey so far.</h2>
          <div className="trajectory">
            <article>
              <span className="trajectory-dot" />
              <p className="eyebrow">{education.years}</p>
              <h3>Learning the foundations.</h3>
              <p>
                {education.degree}
                <br />
                {education.institution}
              </p>
            </article>
            {experience.map((exp) => (
              <article key={exp.company}>
                <span className="trajectory-dot" />
                <p className="eyebrow">{exp.date}</p>
                <h3>{exp.role}</h3>
                <p>
                  {exp.company} · {exp.type}
                </p>
                <p>{exp.points.join(" ")}</p>
              </article>
            ))}
          </div>
        </div>
      </Chapter>
      <Chapter index={9}>
        <div className="signals-content">
          <p className="eyebrow">SIGNALS OF PROGRESS</p>
          <h2>Milestones, not destinations.</h2>
          <div className="signals">
            {achievements.map((a) => (
              <article key={a.title}>
                <span className="signal-mark">✧</span>
                <h3>{a.title}</h3>
                <p>{a.copy}</p>
                {a.title !== "Brain Tumor Detection research" && (
                  <span className="signal-metric">{a.metric}</span>
                )}
              </article>
            ))}
          </div>
          <details className="credentials">
            <summary>
              Continuing to learn <span>Certifications ↗</span>
            </summary>
            <div>
              {certifications.map((c) => (
                <p key={c.title}>
                  {"link" in c && c.link ? (
                    <a href={c.link} {...external}>
                      {c.title} ↗
                    </a>
                  ) : (
                    c.title
                  )}
                  <small>
                    {c.issuer} · {c.date}
                  </small>
                </p>
              ))}
            </div>
          </details>
        </div>
      </Chapter>
      <Chapter index={10}>
        <div className="deep-copy">
          <p className="eyebrow">BEYOND THE KNOWN</p>
          <h2>
            There’s always
            <br />
            more to explore.
          </h2>
        </div>
      </Chapter>
      <Chapter index={11}>
        <div className="contact-copy">
          <p className="eyebrow">THE NEXT CHAPTER IS UNWRITTEN</p>
          <h2>What’s next?</h2>
          <p>
            A new idea. A meaningful problem.
            <br />
            Something worth building together.
          </p>
          <a className="pill-link" href={`mailto:${siteConfig.email}`}>
            Let’s make contact <span>↗</span>
          </a>
          <div className="contact-links">
            <a href={siteConfig.github} {...external}>
              GitHub ↗
            </a>
            <a href={siteConfig.linkedin} {...external}>
              LinkedIn ↗
            </a>
            <a href={`mailto:${siteConfig.email}`}>Email ↗</a>
          </div>
          <a className="email-address" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
        <footer>
          <span>© {new Date().getFullYear()} SANSKAR GUPTA</span>
          <a href="/credits.html">ASSET CREDITS</a>
          <a href="#top">BACK TO EARTH ↑</a>
        </footer>
      </Chapter>
    </ExperienceShell>
  );
}
