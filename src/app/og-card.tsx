import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

// The link-preview card, in the laptop screen's look (mint on ink, a terminal prompt, a title in Anton), for
// the home page and each case study. 1200 × 630, rendered at build time.
export const ogSize = { width: 1200, height: 630 };

// The site's fonts as TTF (what the renderer reads). Cached ("use cache"), so the build fetches them once and
// the images stay static; an uncached fetch would make every image route wait for a request.
async function googleFont(family: string) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}`).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Couldn't load the ${family} font for the Open Graph images`);
  return fetch(url).then((res) => res.arrayBuffer());
}
async function loadFonts() {
  "use cache";
  cacheLife("max"); // the fonts never change between deploys
  return Promise.all([googleFont("Anton"), googleFont("JetBrains+Mono:wght@500"), googleFont("Geist:wght@500")]);
}

export async function ogCard({
  command,
  title,
  titleSize,
  subtitle,
}: {
  command: string;
  title: string;
  titleSize: number;
  subtitle: string;
}) {
  const [anton, mono, sans] = await loadFonts();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 84px",
        background: "radial-gradient(ellipse 70% 80% at 30% 55%, #123827 0%, #0a0d0c 70%)",
        color: "#eef6f2",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 76,
            height: 76,
            border: "4px solid #6ee7b7",
            borderRadius: 6,
            color: "#6ee7b7",
            fontFamily: "Anton",
            fontSize: 38,
          }}
        >
          KW
        </div>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 28, color: "#eef6f2" }}>Kevin Wang</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 30, color: "#8fb8a5" }}>
          <span style={{ color: "#6ee7b7" }}>kevin@auckland ~ %</span>
          <span style={{ marginLeft: 16 }}>{command}</span>
        </div>
        <div
          style={{
            fontFamily: "Anton",
            fontSize: titleSize,
            lineHeight: 1.02,
            color: "#8bf5cb",
            marginTop: 18,
            textWrap: "balance",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 36, color: "#c4dccf", marginTop: 26, textWrap: "balance" }}>{subtitle}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Anton", data: anton, weight: 400 },
        { name: "JetBrains Mono", data: mono, weight: 500 },
        { name: "Geist", data: sans, weight: 500 },
      ],
    },
  );
}
