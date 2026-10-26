import type { Metadata } from "next";
import { profile } from "@/content/profile";

// The canonical address: kevin-wang.dev redirects here (set in Vercel's Domains settings).
export const siteUrl = "https://www.kevin-wang.dev";

// A page's openGraph replaces the layout's instead of merging, so pages spread this in.
export const openGraphBase: NonNullable<Metadata["openGraph"]> = {
  siteName: profile.name,
  locale: "en_NZ",
};
