import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

// Unknown addresses (and unknown case studies, via src/proxy.ts), in the laptop screen's terminal voice.
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-center px-4 py-24"
    >
      <p aria-hidden="true" className="font-mono text-sm text-muted sm:text-base">
        <span className="text-accent">kevin@auckland ~ %</span> cd this-page
        <br />
        cd: no such file or directory
      </p>
      <h1 id="not-found-heading" className="mt-6 text-6xl leading-none sm:text-8xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-prose text-lg text-muted">
        The link may be out of date, or the address mistyped. Everything on the site is one step away from here.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Back to the home page
        </Link>
        <Link
          href="/#projects"
          className="inline-flex min-h-12 items-center rounded-md border border-border px-5 font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          See my projects
        </Link>
      </div>
    </section>
  );
}
