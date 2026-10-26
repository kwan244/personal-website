import { notFound } from "next/navigation";
import { ogCard, ogSize } from "@/app/og-card";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

// Each case study's link preview: the project's title and context on the site's card.
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
    command: `cat projects/${project.slug}`,
    title: project.title,
    titleSize: 104,
    subtitle: project.context,
  });
}
