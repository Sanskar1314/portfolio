import { Clapperboard, GraduationCap, Sparkles } from "lucide-react";

type ProjectVisualProps = {
  kind: "movie" | "rag";
};

export function ProjectVisual({ kind }: ProjectVisualProps) {
  if (kind === "movie") {
    return (
      <div className="project-visual movie-visual" aria-hidden="true">
        <div className="visual-grid" />
        <div className="movie-orb orb-one" />
        <div className="movie-orb orb-two" />
        <div className="visual-window">
          <div className="visual-window-top"><span /><span /><span /></div>
          <div className="movie-poster"><Clapperboard size={34} /></div>
          <div className="movie-lines"><i /><i /><i /></div>
        </div>
        <p className="visual-label">DISCOVER / RECOMMEND / WATCH</p>
      </div>
    );
  }

  return (
    <div className="project-visual rag-visual" aria-hidden="true">
      <div className="rag-grid" />
      <div className="knowledge-node node-one"><Sparkles size={15} /></div>
      <div className="knowledge-node node-two"><GraduationCap size={18} /></div>
      <div className="knowledge-node node-three" />
      <svg viewBox="0 0 500 280" className="connection-lines" fill="none">
        <path d="M90 194 C174 90 261 190 391 82" />
        <path d="M90 194 C228 236 298 190 391 82" />
      </svg>
      <div className="rag-query">What does this lecture explain?</div>
      <p className="visual-label">RETRIEVE / REASON / RESPOND</p>
    </div>
  );
}
