import { ViewTransition, type ReactNode } from "react";

// Pairs a project's screenshot or title on the home page with the same part of its case study, so
// navigating between them morphs one into the other (React + the View Transitions API; browsers without
// it just swap pages). Names must be unique on a page, so only the project cards use this, not the notes.
export function ProjectMorph({ slug, part, children }: { slug: string; part: "image" | "title"; children: ReactNode }) {
  return (
    <ViewTransition name={`project-${part}-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
