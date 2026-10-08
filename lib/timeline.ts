export const chapters = [
  { id: "top", label: "Departure", title: "Earth orbit", duration: 8 },
  { id: "launch", label: "Launch", title: "Beyond the familiar", duration: 9 },
  { id: "about", label: "About", title: "The explorer", duration: 10 },
  {
    id: "skills",
    label: "Skills",
    title: "A technology universe",
    duration: 13,
  },
  { id: "work", label: "Mission 01", title: "MovieMind", duration: 8 },
  {
    id: "sigmalearn",
    label: "Mission 02",
    title: "SigmaLearn AI",
    duration: 8,
  },
  {
    id: "research",
    label: "Mission 03",
    title: "Brain tumor detection",
    duration: 7,
  },
  {
    id: "nebula",
    label: "Perspective",
    title: "A moment of perspective",
    duration: 6,
  },
  {
    id: "experience",
    label: "Journey",
    title: "The trajectory so far",
    duration: 8,
  },
  {
    id: "achievements",
    label: "Signals",
    title: "Milestones along the way",
    duration: 7,
  },
  { id: "deep-space", label: "Deep space", title: "The unknown", duration: 7 },
  {
    id: "contact",
    label: "What’s next?",
    title: "The event horizon",
    duration: 9,
  },
] as const;
export const timeline = {
  progress: 0,
  target: 0,
  chapter: 0,
  local: 0,
  reduced: false,
};
export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, n));
export const smooth = (a: number, b: number, value: number) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export function sampleTimeline(progress: number) {
  let start = 0;
  for (let i = 0; i < chapters.length; i++) {
    const end = start + chapters[i].duration / 100;
    if (progress < end - 0.0001 || i === chapters.length - 1)
      return { chapter: i, local: clamp((progress - start) / (end - start)) };
    start = end;
  }
  return { chapter: 0, local: 0 };
}
export function chapterStart(index: number) {
  return (
    chapters
      .slice(0, index)
      .reduce((sum, chapter) => sum + chapter.duration, 0) / 100
  );
}

// Crossfades are functions of scroll position, not elapsed time: fully reversible.
export const TRANSITION = 0.012;
export function sceneBlend(index: number, progress: number) {
  const start = chapterStart(index);
  const end = start + chapters[index].duration / 100;
  const enter =
    index === 0 ? 1 : smooth(start - TRANSITION, start + TRANSITION, progress);
  const leave =
    index === chapters.length - 1
      ? 0
      : smooth(end - TRANSITION, end + TRANSITION, progress);
  return {
    opacity: Math.pow(enter * (1 - leave), 1.6),
    offset: (1 - enter) * 34 - leave * 34,
  };
}
export const skillState = { selected: 0 };

export function selectSkill(index: number) {
  skillState.selected = index;
}
