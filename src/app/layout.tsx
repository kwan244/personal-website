import type { Metadata } from "next";
import { Anton, Geist, JetBrains_Mono } from "next/font/google";
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
    <html
      lang="en-NZ"
      className={`${geistSans.variable} ${anton.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
