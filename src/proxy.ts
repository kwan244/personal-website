import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

const slugs = new Set(projects.map((project) => project.slug));

// Unknown case studies get a real 404 status. The page can't give one itself: its shell streams first (with
// a 200) and only then finds the slug missing. Rewriting to a path no route matches renders not-found.tsx;
// the explicit status is needed on Vercel, which otherwise serves that prerendered page with a 200.
export function proxy(request: NextRequest) {
  if (!slugs.has(decodedSlug(request.nextUrl.pathname))) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
}

// The path arrives still encoded (/projects/%70lateful), but the page decodes its params, so compare the decoded
// slug. A malformed encoding can't be any project.
function decodedSlug(pathname: string) {
  try {
    return decodeURIComponent(pathname.split("/")[2]);
  } catch {
    return "";
  }
}

// One segment only, so the case studies' own image routes (/projects/<slug>/opengraph-image) pass straight by.
export const config = { matcher: "/projects/:slug" };
