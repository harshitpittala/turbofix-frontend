/**
 * modelImages.ts — finds the existing product photo in public/images/models
 * for an iPhone or Samsung model page. Server-only (uses fs at build time).
 * Returns undefined when no photo exists, so pages never show a wrong phone.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images", "models");

function exists(rel: string): boolean {
  try { return fs.existsSync(path.join(ROOT, rel)); } catch { return false; }
}

const IPHONE_ALIASES: Record<string, string> = { "iphone-air": "iphone-17-air" };

export function iphoneImage(slug: string): string | undefined {
  const file = `apple/${IPHONE_ALIASES[slug] ?? slug}.webp`;
  return exists(file) ? `/images/models/${file}` : undefined;
}

/** samsung-galaxy-z-fold7 → galaxy-z-fold-7, samsung-galaxy-note20 → galaxy-note-20, drops -5g when needed. */
export function samsungImage(slug: string): string | undefined {
  const base = slug.replace(/^samsung-/, "");
  const variants = [
    base,
    base.replace(/-5g$/, ""),
    base.replace(/z-(fold|flip)(\d)/, "z-$1-$2"),
    base.replace(/note(\d+)/, "note-$1"),
  ];
  for (const v of variants) {
    if (exists(`samsung/${v}.webp`)) return `/images/models/samsung/${v}.webp`;
  }
  return undefined;
}
