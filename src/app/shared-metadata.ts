import type { Metadata } from "next";
import { profile } from "@/content/profile";

// shortcut: hard-coded Vercel URL; switch to the custom domain in Phase 4.
export const siteUrl = "https://personal-website-two-gray-19.vercel.app";

// A page's openGraph replaces the layout's instead of merging, so pages spread this in.
export const openGraphBase: NonNullable<Metadata["openGraph"]> = {
  siteName: profile.name,
  locale: "en_NZ",
};
