import { ogCard, ogSize } from "@/app/og-card";
import { profile } from "@/content/profile";

// The home page's link preview (case studies have their own).
export const alt = `${profile.name}: ${profile.headline}, ${profile.location}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    command: "whoami",
    title: profile.name.toUpperCase(),
    titleSize: 170,
    subtitle: `${profile.headline} · ${profile.location}`,
  });
}
