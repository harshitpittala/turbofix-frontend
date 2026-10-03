/**
 * serviceLinks.ts — cross-links between service pages and brand pages, so
 * every service page reaches the brand pages and vice versa.
 * Only URLs that exist (see app/sitemap.ts) are listed here.
 */

/** Brand label as written in data/servicePages.ts → its brand page. */
export const BRAND_PAGE_BY_LABEL: Record<string, string> = {
  "Apple iPhone": "/iphone-service-hyderabad",
  "Samsung Galaxy": "/samsung-service-hyderabad",
  "OnePlus": "/oneplus-service-hyderabad",
  "Xiaomi / Redmi": "/xiaomi-service-hyderabad",
  "Vivo": "/vivo-service-hyderabad",
  "Oppo": "/oppo-service-hyderabad",
  "Realme": "/realme-service-hyderabad",
  "Motorola": "/motorola-service-hyderabad",
  "Google Pixel": "/google-pixel-service-hyderabad",
  "Nothing Phone": "/brands/nothing",
};

// Order matters: the first keyword found in the job name wins.
const SERVICE_KEYWORDS: [RegExp, { href: string; label: string }][] = [
  [/screen/i, { href: "/screen-replacement-hyderabad", label: "Screen replacement" }],
  [/battery/i, { href: "/battery-replacement-hyderabad", label: "Battery replacement" }],
  [/charging port/i, { href: "/charging-port-service-hyderabad", label: "Charging port service" }],
  [/water damage/i, { href: "/water-damage-hyderabad", label: "Water damage service" }],
  [/camera/i, { href: "/camera-service-hyderabad", label: "Camera service" }],
  [/speaker|mic/i, { href: "/speaker-service-hyderabad", label: "Speaker & mic service" }],
  [/back glass|back panel|cover/i, { href: "/back-panel-replacement-hyderabad", label: "Back panel replacement" }],
  [/motherboard/i, { href: "/motherboard-service-hyderabad", label: "Motherboard service" }],
];

/** Brand-page job name (e.g. "iPhone Battery Replacement") → general service page, if one matches. */
export function servicePageForJob(name: string): { href: string; label: string } | undefined {
  return SERVICE_KEYWORDS.find(([re]) => re.test(name))?.[1];
}
