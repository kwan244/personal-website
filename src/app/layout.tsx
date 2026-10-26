import type { Metadata } from "next";
import { Anton, Caveat, Geist, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { profile } from "@/content/profile";
import { openGraphBase, siteUrl } from "@/app/shared-metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Handwriting, for the sticky-note titles only.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const title = `${profile.name} | ${profile.headline}`;
const description = `Portfolio of ${profile.name} (${profile.legalName}), ${profile.headline.toLowerCase()} based in ${profile.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${profile.name}`,
    default: title,
  },
  description,
  openGraph: { ...openGraphBase, type: "website", title, description, url: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The script may set data-theme before React hydrates, hence suppressHydrationWarning.
    <html
      lang="en-NZ"
      suppressHydrationWarning
      className={`${geistSans.variable} ${anton.variable} ${jetBrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/* Applies a saved theme pick before first paint, so there's no flash of the other theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
