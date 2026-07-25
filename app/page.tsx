import { ArrowUpRight, Award, BookOpen, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { Typewriter } from "@/components/typewriter";
import { Particles } from "@/components/particles";
import { AnimatedCounter } from "@/components/animated-counter";
import { CursorGlow } from "@/components/cursor-glow";
import { StaggerChildren, StaggerItem } from "@/components/stagger";
import {
  siteConfig,
  skillGroups,
  projects,
  experience,
  achievements,
  certifications,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <SiteHeader />

      {/* ─── HERO ─── */}
      <section id="top" className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-gradient" />
          <div className="hero-gradient hero-gradient-two" />
          <div className="hero-grid" />
          <Particles count={50} />
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            <Reveal>
              <p className="hero-eyebrow">
                <span className="status-dot" />
                <MapPin size={14} />
                {siteConfig.location}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="hero-title">
                Hi, I&apos;m <span className="text-accent text-glow">{siteConfig.name.split(" ")[0]}</span>.
                <br />I build <Typewriter />
              </h1>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="hero-actions">
                <a className="button button-primary button-shine" href="#work">
                  View my work <ArrowUpRight size={16} />
                </a>
                <a className="button button-ghost" href="#contact">
                  Get in touch
                </a>
                <a className="button button-ghost" href="https://drive.google.com/file/d/1kDzGB_21uUpgiVoKk-TimiH8v0K1r9lF/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                  Resume <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="hero-socials">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={19} />
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={19} />
                </a>
                <a href={`mailto:${siteConfig.email}`} aria-label="Email">
                  <Mail size={19} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="hero-image-wrapper">
              <img src="/profile.png" alt="Sanskar Gupta" className="hero-image" />
            </div>
          </Reveal>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-line" />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">
              <span className="section-number">01</span> About me
            </h2>
          </Reveal>

          <div className="about-grid">
            <Reveal delay={0.06}>
              <div className="about-text">
                <p>
                  I&apos;m a <strong>B.Tech Data Science</strong> student at
                  <strong> ABES Engineering College</strong> (2023 – 2027),
                  focused on building AI systems that solve real problems — from
                  NLP-powered search to retrieval-augmented teaching assistants.
                </p>
                <p>
                  I enjoy the full journey: wrangling messy datasets, engineering
                  features, training models, and shipping production-grade APIs
                  and UIs that put AI directly in users&apos; hands.
                </p>
              </div>
            </Reveal>

            <div className="skills-grid">
              {skillGroups.map((group, gi) => (
                <Reveal key={group.label} delay={0.1 + gi * 0.06}>
                  <div className="skill-group">
                    <h3 className="skill-group-label">{group.label}</h3>
                    <StaggerChildren className="skill-list" stagger={0.04}>
                      {group.skills.map((s) => (
                        <StaggerItem key={s}>
                          <span className="skill-chip">{s}</span>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="section section-alt">
        <div className="container">
          <Reveal>
            <h2 className="section-title">
              <span className="section-number">02</span> Featured work
            </h2>
          </Reveal>

          <div className="projects-list">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <article className={`project-card accent-${project.accent} card-glow`}>
                  <div className="project-body">
                    <p className="project-eyebrow">
                      <span>{project.number}</span> — {project.eyebrow}
                    </p>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-date">{project.date}</p>
                    <p className="project-desc">{project.description}</p>
                    <ul className="project-details">
                      {project.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <div className="project-stack">
                      {project.stack.map((t) => (
                        <span key={t} className="stack-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      className="button button-outline"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={15} /> View on GitHub <ArrowUpRight size={14} />
                    </a>
                  </div>
                  <div className="project-visual-wrap">
                    <ProjectVisual kind={project.title === "MovieMind" ? "movie" : "rag"} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">
              <span className="section-number">03</span> Experience
            </h2>
          </Reveal>

          <div className="timeline">
            {experience.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.08}>
                <article className="timeline-item">
                  <div className="timeline-marker" />
                  <div className="timeline-content">
                    <p className="timeline-date">{exp.date}</p>
                    <h3 className="timeline-title">
                      {exp.role} <span className="timeline-company">@ {exp.company}</span>
                    </h3>
                    <p className="timeline-type">{exp.type}</p>
                    <ul className="timeline-points">
                      {exp.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS ─── */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <h2 className="section-title">
              <span className="section-number">04</span> Achievements
            </h2>
          </Reveal>

          <StaggerChildren className="achievements-grid" stagger={0.1}>
            {achievements.map((a) => (
              <StaggerItem key={a.title}>
                <div className="achievement-card card-glow">
                  <Award size={20} className="achievement-icon" />
                  <AnimatedCounter value={a.metric} className="achievement-metric" />
                  <h3 className="achievement-title">{a.title}</h3>
                  <p className="achievement-copy">{a.copy}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">
              <span className="section-number">05</span> Certifications
            </h2>
          </Reveal>

          <StaggerChildren className="certs-list" stagger={0.08}>
            {certifications.map((cert) => (
              <StaggerItem key={cert.title}>
                {("link" in cert && cert.link) ? (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card card-glow cert-link">
                    <BookOpen size={18} className="cert-icon" />
                    <div>
                      <h3 className="cert-title">{cert.title}</h3>
                      <p className="cert-meta">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                    <ArrowUpRight size={16} className="cert-arrow" />
                  </a>
                ) : (
                  <div className="cert-card card-glow">
                    <BookOpen size={18} className="cert-icon" />
                    <div>
                      <h3 className="cert-title">{cert.title}</h3>
                      <p className="cert-meta">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section section-alt">
        <div className="container contact-container">
          <Reveal>
            <h2 className="section-title">
              <span className="section-number">06</span> Let&apos;s connect
            </h2>
            <p className="contact-intro">
              Whether it&apos;s a project, an internship opportunity, or just to say hello —
              I&apos;d love to hear from you.
            </p>
          </Reveal>

          <div className="contact-grid">
            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="contact-info">
                <a href={`mailto:${siteConfig.email}`} className="contact-link">
                  <Mail size={18} /> {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone}`} className="contact-link">
                  <Phone size={18} /> {siteConfig.phone}
                </a>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github size={18} /> GitHub
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Crafted with purpose.</p>
          <div className="footer-socials">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
