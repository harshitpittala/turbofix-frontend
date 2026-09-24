// SEO extras for blog posts (25 Sep 2026):
// - seoTitle: shorter <title> for posts whose headline is too long for search
//   results (≤ 54 chars + " | TurboFix"). The on-page H1 stays blog.title.
// - services: the service / brand pages each post should send readers to
//   ("Get it serviced" box), so blog traffic and relevance reach the pages
//   that take bookings.

export interface BlogServiceLink {
  label: string;
  href: string;
}

export interface BlogSeo {
  seoTitle?: string;
  services: BlogServiceLink[];
}

const S = {
  screen: { label: "Screen Replacement in Hyderabad", href: "/screen-replacement-hyderabad" },
  battery: { label: "Battery Replacement in Hyderabad", href: "/battery-replacement-hyderabad" },
  charging: { label: "Charging Port Service in Hyderabad", href: "/charging-port-service-hyderabad" },
  water: { label: "Water Damage Service in Hyderabad", href: "/water-damage-hyderabad" },
  camera: { label: "Phone Camera Service in Hyderabad", href: "/camera-service-hyderabad" },
  speaker: { label: "Mic & Speaker Service in Hyderabad", href: "/speaker-service-hyderabad" },
  back: { label: "Back Glass Replacement in Hyderabad", href: "/back-panel-replacement-hyderabad" },
  board: { label: "Motherboard Service in Hyderabad", href: "/motherboard-service-hyderabad" },
  iphone: { label: "iPhone Service in Hyderabad", href: "/iphone-service-hyderabad" },
  samsung: { label: "Samsung Service in Hyderabad", href: "/samsung-service-hyderabad" },
  oneplus: { label: "OnePlus Service in Hyderabad", href: "/oneplus-service-hyderabad" },
  pixel: { label: "Google Pixel Service in Hyderabad", href: "/google-pixel-service-hyderabad" },
  realme: { label: "Realme Service in Hyderabad", href: "/realme-service-hyderabad" },
  all: { label: "All Doorstep Services", href: "/services" },
  areas: { label: "Areas We Cover in Hyderabad", href: "/locations" },
} satisfies Record<string, BlogServiceLink>;

export const blogSeo: Record<string, BlogSeo> = {
  "phone-battery-replacement-signs": { services: [S.battery, S.charging] },
  "water-damage-phone-service": { seoTitle: "Phone in Water? What to Do in the First 30 Minutes", services: [S.water, S.board] },
  "iphone-screen-replacement-guide": { seoTitle: "iPhone Screen Replacement in Hyderabad: 2025 Guide", services: [S.screen, S.iphone] },
  "samsung-galaxy-screen-service": { seoTitle: "Samsung Galaxy Screen Service: What to Know", services: [S.screen, S.samsung] },
  "phone-overheating-causes": { seoTitle: "Why Is My Phone Overheating? Causes & Solutions", services: [S.battery, S.board] },
  "charging-port-service-guide": { seoTitle: "Charging Port Problems: Signs, Causes & Solutions", services: [S.charging, S.battery] },
  "android-vs-iphone-service": { seoTitle: "Android vs iPhone Service: Which Costs Less?", services: [S.iphone, S.samsung, S.all] },
  "extend-smartphone-battery-life": { services: [S.battery] },
  "oneplus-common-problems-solutions": { services: [S.oneplus, S.screen, S.battery] },
  "smartphone-data-loss-guide": { services: [S.board, S.water] },
  "clean-phone-camera-lens": { seoTitle: "How to Clean Your Phone Camera Lens Safely", services: [S.camera] },
  "phone-motherboard-service-guide": { services: [S.board, S.water] },
  "protect-phone-screen-tips": { services: [S.screen, S.back] },
  "software-vs-hardware-phone-issues": { seoTitle: "Software vs Hardware Phone Issues: How to Tell", services: [S.board, S.all] },
  "google-pixel-service-guide": { seoTitle: "Google Pixel Service in Hyderabad: Common Issues", services: [S.pixel, S.screen] },
  "realme-phone-service-guide": { seoTitle: "Realme Phone Service Guide for Hyderabad Users", services: [S.realme, S.battery] },
  "how-doorstep-mobile-service-works": { seoTitle: "How Doorstep Mobile Service Works: Step by Step", services: [S.all, S.areas] },
  "phone-maintenance-tips": { seoTitle: "Smartphone Maintenance Guide: Keep Your Phone Like New", services: [S.battery, S.charging, S.speaker] },
  "back-glass-replacement-guide": { seoTitle: "Phone Back Glass Replacement: What to Expect & Cost", services: [S.back, S.screen] },
  "choosing-mobile-service-hyderabad": { seoTitle: "How to Choose a Mobile Service Provider in Hyderabad", services: [S.all, S.areas] },
};

export function getBlogSeo(slug: string): BlogSeo | undefined {
  return blogSeo[slug];
}
