import { ImageResponse } from "next/og";

/**
 * Link preview card.
 *
 * Generated at build time from the same words as the page title, so a link
 * pasted into a Discord server or a forum shows what the site is instead of a
 * bare URL.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Career Hub — EA SPORTS FC Career Mode database";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#09090b",
          color: "#fafafa",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#a3e635", textTransform: "uppercase" }}>
          Career Mode only
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Career Hub
        </div>
        <div style={{ fontSize: 36, color: "#a1a1aa", marginTop: 24, lineHeight: 1.35 }}>
          Wonderkids, growth curves, release clauses and contracts for EA SPORTS FC Career Mode.
        </div>
        <div style={{ fontSize: 28, color: "#71717a", marginTop: 40 }}>
          Free · no ads · no signup
        </div>
      </div>
    ),
    size,
  );
}
