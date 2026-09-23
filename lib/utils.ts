import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Builds a meta description that never exceeds ~155 chars (Google's SERP
// snippet limit) while always keeping the trailing CTA/suffix intact —
// truncates the lead-in text at a word boundary instead of the whole string.
export function buildMetaDescription(intro: string, suffix: string, maxLen = 155): string {
  const budget = maxLen - suffix.length - 1; // space before suffix
  const cleanIntro = intro.trim();
  if (cleanIntro.length <= budget) return `${cleanIntro} ${suffix}`;

  // Prefer cutting at the end of the first full sentence if it fits — avoids
  // lopping off mid-clause right after a stray proper noun or comma.
  const firstSentence = cleanIntro.match(/^.*?[.!?](?=\s|$)/)?.[0];
  if (firstSentence && firstSentence.length <= budget && firstSentence.length > budget * 0.4) {
    return `${firstSentence} ${suffix}`;
  }

  // Otherwise cut at the last clause boundary (comma or em dash) if there is
  // one past the halfway point of the budget — reads better than stopping
  // mid-adjective at an arbitrary word boundary.
  const truncated = cleanIntro.slice(0, budget);
  const lastComma = truncated.lastIndexOf(",");
  const lastDash = truncated.lastIndexOf(" — ");
  const lastClause = Math.max(lastComma, lastDash);
  const lastSpace = truncated.lastIndexOf(" ");
  const cutPoint = lastClause > budget * 0.5 ? lastClause : lastSpace;
  const cut = truncated.slice(0, cutPoint > 0 ? cutPoint : budget).trim().replace(/[,.;:—-]+$/, "").trim();
  return `${cut}. ${suffix}`;
}

// Parses a display string like "₹999 – ₹8,999" into numeric bounds for
// schema.org PriceSpecification (Google's structured data expects numbers,
// not a formatted string).
export function parsePriceRange(range: string): { minPrice: number; maxPrice: number } | null {
  const numbers = range.match(/[\d,]+/g)?.map((n) => Number(n.replace(/,/g, "")));
  if (!numbers || numbers.length === 0) return null;
  return { minPrice: Math.min(...numbers), maxPrice: Math.max(...numbers) };
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
