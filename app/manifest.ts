import type { MetadataRoute } from "next";

// Web app manifest: one consistent name and icon set for browsers and crawlers.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TurboFix — Doorstep Mobile Service, Hyderabad",
    short_name: "TurboFix",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#0F172A",
    icons: [
      { src: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
