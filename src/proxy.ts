import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

const slugs = new Set(projects.map((project) => project.slug));

// Unknown case studies get a real 404 status. The page can't give one itself: its shell streams first (with
// a 200) and only then finds the slug missing. Rewriting to a path no route matches renders not-found.tsx
// with a 404.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!slugs.has(slug)) return NextResponse.rewrite(new URL("/404", request.url));
}

// One segment only, so the case studies' own image routes (/projects/<slug>/opengraph-image) pass straight by.
export const config = { matcher: "/projects/:slug" };
