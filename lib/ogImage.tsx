/**
 * ogImage — shared 1200×630 Open Graph card renderer (next/og, no extra
 * dependency). Text only, brand colours; no manufacturer logos.
 */
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700 }}>T</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>TurboFix</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 30, color: "#93C5FD" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 40 ? 64 : 76, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ fontSize: 26, color: "#CBD5E1" }}>{footer}</div>
      </div>
    ),
    OG_SIZE,
  );
}
