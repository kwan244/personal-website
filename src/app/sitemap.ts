import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/shared-metadata";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` }))];
}
