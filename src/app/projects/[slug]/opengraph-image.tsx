import { notFound } from "next/navigation";
import { ogCard, ogSize } from "@/app/og-card";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

// Each case study's link preview: the project's title, what kind of project it was and when.
export const alt = `A project case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? notFound();
  return ogCard({
    title: project.title,
    // One short line that still reads in a thumbnail: the kind of project and when.
    subtitle: `${project.noteLabel} · ${project.dates}`,
  });
}
