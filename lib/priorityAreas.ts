import { getLocationBySlug, isMergedLocality } from "@/data/locations";

// Priority Hyderabad localities (SEO report, 23 Sep 2026): the areas with the
// most Search Console impressions or the largest under-served demand. Linking
// them from every service and brand page spreads internal links beyond the
// seven footer localities. All are standalone (never merged) pages.
// Server-only: call from server components and pass the result as props, so
// the full locations dataset never ships to the browser.
export const PRIORITY_AREA_SLUGS = [
  "madhapur", "gachibowli", "ameerpet", "dilsukhnagar", "kondapur", "hitech-city",
  "banjara-hills", "kukatpally", "kphb", "secunderabad", "lb-nagar", "kompally",
  "sr-nagar", "miyapur", "nizampet", "uppal", "nagole", "habsiguda", "tarnaka",
  "mehdipatnam", "attapur", "nampally", "abids", "koti", "begumpet",
];

export interface AreaLink { slug: string; name: string }

export function getPriorityAreas(): AreaLink[] {
  return PRIORITY_AREA_SLUGS
    .filter((s) => !isMergedLocality(s))
    .map((s) => getLocationBySlug(s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
    .map((l) => ({ slug: l.slug, name: l.name }));
}
