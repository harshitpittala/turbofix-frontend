/**
 * iphoneServicePages.ts — builds the content for every /[model]/[service]
 * page from the verified facts in data/iphoneModels.ts.
 *
 * Each section is assembled from facts that differ between models (display
 * type, connector, cameras, back construction, battery design, parts-history
 * coverage, age, model notes), so pages are not name-swapped copies.
 *
 * Wording rules (see project memory / owner decisions):
 *  - No "repair" in titles, meta descriptions or URLs (Google Ads policy
 *    choice by the owner). Body copy may use it where accurate.
 *  - No invented prices, turnaround times, per-model warranty terms,
 *    ratings or capabilities. Anything the owner must confirm is marked
 *    TODO(owner) in code and phrased as "confirmed with your quote" on page.
 */
import {
  IPHONE_FACTS_CHECKED, iphoneModels, getIphoneModel, getSiblingModels, getAdjacentModels,
  type IphoneModel, type IphoneServiceSlug,
} from "./iphoneModels";
import { generationContext, tierContext, postServiceChecks } from "./iphoneContext";

// Fixed reference date so static output doesn't drift between builds.
// Update together with IPHONE_FACTS_CHECKED when the facts are re-checked.
const REFERENCE_DATE = new Date("2026-10-05");

/** Shown on the pages and in WebPage schema. Update IPHONE_PAGES_UPDATED whenever content changes. */
export const IPHONE_PAGES_PUBLISHED = "2026-10-08";
export const IPHONE_PAGES_UPDATED = "2026-10-08";

export interface IphoneServiceDef {
  slug: IphoneServiceSlug;
  /** Short name used in titles and links. */
  label: (m: IphoneModel) => string;
  /** Longer name for the H1. */
  h1Label: (m: IphoneModel) => string;
  /** Existing general service page this one sits under. */
  generalPage: { href: string; label: string };
  schemaType: string;
}

export const iphoneServices: IphoneServiceDef[] = [
  {
    slug: "screen-replacement",
    label: () => "Screen Replacement", h1Label: () => "Screen Replacement",
    generalPage: { href: "/screen-replacement-hyderabad", label: "Screen replacement (all brands)" },
    schemaType: "Mobile phone screen replacement",
  },
  {
    slug: "battery-replacement",
    label: () => "Battery Replacement", h1Label: () => "Battery Replacement",
    generalPage: { href: "/battery-replacement-hyderabad", label: "Battery replacement (all brands)" },
    schemaType: "Mobile phone battery replacement",
  },
  {
    slug: "charging-port-service",
    label: () => "Charging Port Service", h1Label: () => "Charging Port Service",
    generalPage: { href: "/charging-port-service-hyderabad", label: "Charging port service (all brands)" },
    schemaType: "Mobile phone charging port service",
  },
  {
    slug: "camera-service",
    label: () => "Camera Service", h1Label: () => "Front and Rear Camera Service",
    generalPage: { href: "/camera-service-hyderabad", label: "Camera service (all brands)" },
    schemaType: "Mobile phone camera service",
  },
  {
    slug: "speaker-microphone-service",
    label: () => "Speaker & Mic Service", h1Label: () => "Speaker and Microphone Service",
    generalPage: { href: "/speaker-service-hyderabad", label: "Speaker & mic service (all brands)" },
    schemaType: "Mobile phone speaker and microphone service",
  },
  {
    slug: "back-panel-replacement",
    label: (m) => (m.back === "unibody-inset" ? "Back Panel Replacement" : "Back Glass Replacement"),
    h1Label: (m) => (m.back === "unibody-inset" ? "Back Panel Replacement" : "Back Glass Replacement"),
    generalPage: { href: "/back-panel-replacement-hyderabad", label: "Back panel replacement (all brands)" },
    schemaType: "Mobile phone back panel replacement",
  },
  {
    slug: "motherboard-replacement",
    label: () => "Motherboard Replacement", h1Label: () => "Motherboard Replacement",
    generalPage: { href: "/motherboard-service-hyderabad", label: "Motherboard service (all brands)" },
    schemaType: "Mobile phone motherboard replacement",
  },
  {
    slug: "chip-level-service",
    label: () => "Chip-Level Service", h1Label: () => "Chip-Level Service",
    generalPage: { href: "/motherboard-service-hyderabad", label: "Motherboard service (all brands)" },
    schemaType: "Mobile phone chip-level board service",
  },
];

export function getIphoneService(slug: string): IphoneServiceDef | undefined {
  return iphoneServices.find((s) => s.slug === slug);
}

export interface PageSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface IphoneServicePage {
  model: IphoneModel;
  service: IphoneServiceDef;
  path: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  facts: { label: string; value: string }[];
  sections: PageSection[];
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  sources: { label: string; href: string }[];
  /** Shown as a highlighted notice near the top when set. */
  notice?: string;
  checked: string;
  /** Short, fact-based answer shown at the top of the page. */
  quickAnswer: string;
  /** How this model compares with related models for this service. */
  comparison: { heading: string; column: string; rows: { model: IphoneModel; detail: string; current: boolean }[]; summary: string };
  keywords: string[];
}

// ── helpers ────────────────────────────────────────────────────────────────

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function ageMonths(m: IphoneModel): number {
  const r = new Date(m.released);
  return (REFERENCE_DATE.getFullYear() - r.getFullYear()) * 12 + (REFERENCE_DATE.getMonth() - r.getMonth());
}

/** Honest note on Apple warranty likelihood, based on launch date only. */
function warrantyNote(m: IphoneModel): string {
  const months = ageMonths(m);
  if (months < 12) {
    return `The ${m.name} went on sale in ${m.releasedLabel}, so every unit is less than a year old and is likely still covered by Apple's one-year limited warranty. For a fault you didn't cause, check your coverage at checkcoverage.apple.com and contact Apple first — an independent service can affect what Apple will cover. Accidental damage isn't covered by Apple's limited warranty, but AppleCare+ may cover it for a fee.`;
  }
  if (months < 30) {
    return `The ${m.name} went on sale in ${m.releasedLabel}. Depending on when yours was bought, and whether it has AppleCare+, it may still be under Apple coverage — check at checkcoverage.apple.com before booking any independent service.`;
  }
  return `The ${m.name} went on sale in ${m.releasedLabel}, so unless it was bought much later or has extended cover, it's likely outside Apple's one-year limited warranty. You can confirm at checkcoverage.apple.com.`;
}

function isNew(m: IphoneModel): boolean {
  return ageMonths(m) < 6;
}

function newModelNotice(m: IphoneModel): string | undefined {
  if (!isNew(m)) return undefined;
  // TODO(owner): confirm whether TurboFix can source parts for the newest models.
  return `The ${m.name} launched in ${m.releasedLabel}. Replacement parts for brand-new iPhones can be scarce outside Apple's own network for the first months, and every unit is still inside Apple's one-year warranty. Please contact us to confirm part availability before booking, and check whether Apple or AppleCare+ should handle your phone first.`;
}

function hasHistory(m: IphoneModel, part: string): boolean {
  return m.partsHistory.includes(part as never);
}

function siblingNames(m: IphoneModel): string {
  return list(getSiblingModels(m).map((s) => s.name));
}

function noteFor(m: IphoneModel, s: IphoneServiceSlug): string[] {
  return m.notes?.[s] ?? [];
}

const HISTORY_PATH = "Settings > General > About";

const COMMON_SOURCES = {
  partsHistory: { label: "Apple Support: iPhone Parts and Service History", href: "https://support.apple.com/en-us/102658" },
  displays: { label: "Apple Support: About genuine iPhone displays", href: "https://support.apple.com/en-us/103256" },
  batteries: { label: "Apple Support: About genuine iPhone batteries", href: "https://support.apple.com/en-us/103269" },
  batteryPerf: { label: "Apple Support: iPhone battery and performance", href: "https://support.apple.com/en-us/101575" },
};

function withSpecSource(m: IphoneModel, extra: { label: string; href: string }[]) {
  return m.specSource ? [...extra, m.specSource] : extra;
}

function clampMeta(s: string): string {
  if (s.length <= 155) return s;
  const cut = s.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}

function seoTitleFor(m: IphoneModel, svc: IphoneServiceDef): string {
  const base = `${m.name} ${svc.label(m)}`;
  // Root layout appends " | TurboFix"; keep the page part ≤ 50 characters.
  return `${base} in Hyderabad`.length <= 50 ? `${base} in Hyderabad` : base;
}

/** What every page says about price, warranty and service mode. */
function quoteFacts(m: IphoneModel): { label: string; value: string }[] {
  // TODO(owner): add per-model prices and turnaround times once confirmed.
  return [
    { label: "Price", value: `Quoted for your ${m.name} after inspection, before any work starts` },
    { label: "Warranty", value: "3, 6 or 12 months depending on the part grade — confirmed with your quote" },
    { label: "Where", value: "Doorstep visit, pickup and delivery, or walk-in at our Nampally studio" },
    { label: "Payment", value: "After the service · cash, UPI, cards" },
  ];
}

const BACKUP_TIP = "Back up the phone to iCloud or a computer. Most hardware jobs don't touch your data, but a backup is the only real protection if something unexpected turns up.";
const PASSCODE_TIP = "Keep your passcode handy so you can unlock the phone yourself when we test Face ID, cameras and calls after the work.";

// ── per-service builders ───────────────────────────────────────────────────

type Built = Omit<IphoneServicePage, "model" | "service" | "path" | "seoTitle" | "h1" | "checked" | "notice" | "quickAnswer" | "comparison" | "keywords">;

function buildScreen(m: IphoneModel): Built {
  const d = m.display;
  const sib = getSiblingModels(m);
  const oled = d.tech === "OLED";
  const glass = m.frontGlass ? ` behind ${m.frontGlass} front glass` : "";

  const symptoms = [
    "Cracked or shattered front glass, or glass lifting at the edges",
    oled
      ? "Black or purple ink-like patches spreading from a crack, or green, pink or white lines across the OLED panel"
      : "White patches, uneven backlight or a dark screen that still shows a faint image under a torch",
    "Touch that misses taps, registers ghost touches or is dead in one area",
    "Flickering, or brightness that won't adjust properly",
    d.alwaysOn ? "Always-On display showing marks, banding or flicker when the screen dims" : "",
    d.cutout === "dynamic-island"
      ? "Dead pixels or a crack around the Dynamic Island, sometimes with Face ID failing after the same drop"
      : "A crack across the notch area, sometimes with Face ID failing after the same drop",
  ].filter(Boolean);

  const specifics = [
    `Display: ${d.size} ${d.brand} (${d.tech})${glass}, with a ${d.cutout === "dynamic-island" ? "Dynamic Island" : "notch"} for the TrueDepth camera.`,
    d.promotion
      ? "ProMotion: the original panel refreshes at up to 120 Hz. Some replacement panels only run at 60 Hz — ask which one you're being quoted."
      : "Refresh rate: this model's original display runs at a standard 60 Hz, so ProMotion isn't a factor in choosing a part.",
    d.alwaysOn ? "Always-On: the replacement panel needs to support the Always-On mode for it to keep working." : "",
    hasHistory(m, "Display")
      ? `Parts history: the ${m.name} lists the display in ${HISTORY_PATH}. Apple says a non-genuine display shows as "Unknown Part" there; it doesn't stop the phone working, but Apple notes it can affect trade-in value.`
      : "",
    "True Tone and auto-brightness: Apple says that with a non-genuine display, True Tone might not work correctly and the ambient light sensor may not dim or brighten properly.",
    ...noteFor(m, "screen-replacement"),
  ].filter(Boolean);

  const sameSize = sib.filter((s) => s.display.size === d.size);
  const faqs: { q: string; a: string }[] = [
    {
      q: `Will Face ID still work after a ${m.name} screen replacement?`,
      a: `It should, provided the Face ID parts weren't damaged in the original accident. The TrueDepth parts that power Face ID sit at the top of the phone and are paired to the logic board; a careful screen replacement works around them rather than replacing them. We check Face ID before we start, so you know beforehand if the drop already affected it — a new screen can't bring back Face ID if those parts are damaged.`,
    },
    hasHistory(m, "Display")
      ? {
          q: `Will my ${m.name} show an "Unknown Part" message after the new screen?`,
          a: `If the replacement isn't a genuine Apple display installed through Apple's process, yes — ${HISTORY_PATH} will list the display as "Unknown Part". Apple states this doesn't affect your ability to use the phone. We'll tell you which part grade we're quoting so there are no surprises.`,
        }
      : { q: "", a: "" },
    d.promotion
      ? {
          q: `Will the replacement screen keep 120 Hz ProMotion on my ${m.name}?`,
          a: `Only if the replacement panel supports it. The ${m.name}'s original ${d.brand} panel refreshes at up to 120 Hz, but some lower-cost panels are 60 Hz only. Ask us to confirm the refresh rate of the part in your quote; we can test it with you after fitting by scrolling and checking that motion looks smooth.`,
        }
      : { q: "", a: "" },
    d.alwaysOn
      ? {
          q: `Will the Always-On display still work?`,
          a: `Always-On depends on the panel being able to run at a very low refresh rate. A replacement that doesn't support that may lose the feature or flicker when dimmed. We confirm this per part before quoting.`,
        }
      : { q: "", a: "" },
    !oled
      ? {
          q: `Can just the glass be replaced on an ${m.name}?`,
          a: `On the ${m.name}'s LCD, the glass, touch layer and panel are laminated together, so the practical fix for a cracked screen is a complete display assembly. If you've been offered a glass-only job, ask what happens to the touch layer and how it's resealed.`,
        }
      : {
          q: `My ${m.name} screen is cracked but works — can I wait?`,
          a: `You can, but cracks in front glass usually spread, sharp edges can cut, and on an OLED panel like the ${m.name}'s a crack can let pressure reach the panel and start black ink-like spots. If the image is perfect and touch works everywhere, a screen protector over the crack buys time; once you see lines or spots, the panel is damaged too.`,
        },
    {
      q: `Does a screen replacement affect True Tone on the ${m.name}?`,
      a: `It can. Apple's own guidance is that with a non-genuine display, True Tone might not work correctly and colours may look too warm or too cool. After fitting, check Settings > Display & Brightness for the True Tone switch and compare a white page with your old screen if you remember it.`,
    },
    sameSize.length
      ? {
          q: `Is the ${m.name} screen the same as the ${list(sameSize.map((s) => s.name))} screen?`,
          a: sameSize.some((s) => s.display.cutout !== d.cutout || s.display.promotion !== d.promotion)
            ? `No. Although they share the ${d.size} size, they differ in the cut-out or refresh rate, so they use different display parts. We quote by exact model.`
            : `They share the ${d.size} size, but we always quote and fit by exact model so the fit, connectors and features match your phone.`,
        }
      : {
          q: `Does the ${m.name} use the same screen as other ${m.generation === 17 && m.tier === "air" ? "iPhone 17-generation" : `iPhone ${m.generation}`} models?`,
          a: `No. The ${m.name}'s ${d.size} display isn't shared with the ${siblingNames(m) || "other models"}, so it needs its own part.`,
        },
    {
      q: `How much does ${m.name} screen replacement cost?`,
      a: `We don't publish a fixed price for the ${m.name} because it depends on the part grade you choose and current availability. You get a firm quote after we inspect the phone and before any work starts, and you pay only after the service.`,
    },
    {
      q: `Is the ${m.name} still water resistant after the screen is replaced?`,
      a: `Apple rates the ${m.name} ${m.water} when new. Once a phone has been opened, nobody can honestly guarantee that rating again, even with fresh adhesive. Treat the phone as no longer water resistant and keep it away from water.`,
    },
  ].filter((f) => f.q);

  return {
    metaDescription: clampMeta(
      `${m.name} screen replacement in Hyderabad: signs of ${oled ? "OLED" : "LCD"} damage, ${d.promotion ? "keeping 120 Hz ProMotion, " : ""}Face ID and True Tone checks, and a quote before any work.`,
    ),
    intro: [
      `The ${m.name} has a ${d.size} ${d.brand} ${d.tech} display${glass}. When it cracks, stops responding to touch or shows lines, the usual fix is a complete display assembly replacement — but not every dark or glitchy screen is a broken screen, so we test first.`,
      `This page covers what to look for on an ${m.name} specifically, what can and can't be fixed by a new screen, and what to check before you book a doorstep visit or bring the phone to our studio in Nampally.`,
    ],
    facts: [
      { label: "Display", value: `${d.size} ${d.tech}${d.promotion ? ", up to 120 Hz" : ""}${d.alwaysOn ? ", Always-On" : ""}` },
      { label: "Front glass", value: m.frontGlass ?? "Glass (pre-Ceramic Shield)" },
      ...quoteFacts(m),
    ],
    sections: [
      { id: "symptoms", heading: `How do I know my ${m.name} screen needs replacing?`, bullets: symptoms },
      {
        id: "causes", heading: `What usually damages the ${m.name}'s screen?`,
        paragraphs: [
          `Most screen damage comes from drops onto corners or hard floors, pressure from sitting on the phone, or something heavy pressing on it in a bag. ${oled ? "OLED panels can also develop spreading black patches some time after an impact, because the damage to the panel layers grows." : "On an LCD, a hard knock can damage the backlight or panel even when the glass looks intact."} Liquid that gets under cracked glass can cause touch faults that come and go.`,
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `When won't a new screen fix my ${m.name}?`,
        bullets: [
          "If the screen is completely black and the phone doesn't ring, vibrate or show up on a computer, the fault may be power or the logic board, not the display.",
          !oled
            ? "If you can see a faint image with a torch held close, the LCD may be fine and the backlight or its circuit may be the issue — a board-level check, not a screen swap."
            : "If the display stays black but the phone rings and vibrates, it's usually the panel or its connector; a quick test with a known-good screen tells us which.",
          "If Face ID stopped working in the same drop, a new screen alone won't restore it. Face ID parts are paired to the logic board.",
          "If the phone has had a previous screen replacement, touch problems can come from a poorly fitted connector or a low-grade panel rather than new damage.",
          "Touch faults that started after liquid exposure may involve corrosion on the board as well as the screen.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          BACKUP_TIP,
          `Check whether Face ID works now and note it — it tells us whether the TrueDepth parts survived the drop.`,
          hasHistory(m, "Display") ? `Look at ${HISTORY_PATH} to see whether the display has been replaced before.` : "",
          warrantyNote(m),
          PASSCODE_TIP,
        ].filter(Boolean),
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          `We test touch across the whole screen, brightness, True Tone, the proximity sensor (screen should switch off when held to your ear on a call) and Face ID before handing the phone back.${d.promotion ? " We also check smooth scrolling to confirm the refresh rate." : ""} ${hasHistory(m, "Display") ? `If a non-genuine part was used, ${HISTORY_PATH} will show "Unknown Part" for the display — that's expected.` : ""}`,
          `Give any new screen a day or two of normal use and contact us if you notice touch dead zones or brightness problems, so they can be checked under the warranty you were quoted.`,
        ],
      },
    ],
    process: [
      { title: "Check and test", desc: `We inspect the ${m.name}, confirm Face ID and touch status, and rule out board or power faults.` },
      { title: "Quote and part grade", desc: "You get a price and the part grade (with its warranty period) before we open the phone." },
      { title: "Replace the display", desc: "The old display is removed, any parts that stay with your phone are transferred, and the new assembly is sealed with fresh adhesive." },
      { title: "Test with you", desc: "Touch, brightness, True Tone, proximity and Face ID are checked before you pay." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.displays, COMMON_SOURCES.partsHistory]),
  };
}

function buildBattery(m: IphoneModel): Built {
  const cycles = m.batteryCycleTarget;
  const removal = {
    "stretch-release": `The ${m.name}'s battery is held with pull-tab adhesive strips. Removing it safely means releasing that adhesive without bending or puncturing the cell.`,
    "not-electric": `Per iFixit's teardown, the ${m.name} does not use the electrically released adhesive found on the iPhone 16 and 16 Plus, so its battery is removed with a more conventional procedure.`,
    electric: `The ${m.name} uses battery adhesive that lets go when a low voltage is applied (iFixit's teardown showed this), which makes removal quicker and lowers the risk of damaging the cell.`,
    "electric-tray": `Per iFixit's teardown, the ${m.name}'s battery sits on a metal tray held by screws and uses electrically debonding adhesive — a more controlled design than older pull-tab batteries.`,
    unverified: `We haven't been able to verify the ${m.name}'s internal battery design from a published teardown yet, so we confirm the removal procedure during inspection rather than assume it matches another model.`,
  }[m.batteryRemoval];

  const specifics = [
    `Apple's design target: ${m.generation >= 15 ? "iPhone 15 models and later" : "iPhone 14 models and earlier"} are designed to keep 80% of their original capacity at ${cycles.toLocaleString("en-IN")} complete charge cycles under ideal conditions.`,
    "Performance management: Apple applies performance management on iPhone 11 and later when a worn battery can't deliver peak power, which can make the phone feel slower. A new battery removes the cause.",
    m.generation >= 15
      ? `Cycle count: on the ${m.name} you can see the battery's cycle count, manufacture date and first-use date in the Settings app (under General > About or Battery > Battery Health, depending on your iOS version), which is useful for judging wear.`
      : `Cycle count: older models like the ${m.name} don't show a cycle count in Settings, so Battery Health percentage and real-world behaviour are the main guides.`,
    m.generation >= 15
      ? "Charging limit: iPhone 15 and later offer an 80% charging limit in Battery settings, which can slow ageing if you usually have spare charge left at night."
      : "",
    `Parts history: Apple shows a message — "Unable to verify this iPhone has a genuine Apple battery" — on iPhone XS and later, including the ${m.name}, when the battery isn't genuine. Apple says battery health information may not be accurate in that case, but the phone and battery keep working.`,
    removal,
    ...noteFor(m, "battery-replacement"),
  ];

  const faqs = [
    {
      q: `How do I check my ${m.name}'s battery health?`,
      a: `Go to Settings > Battery > Battery Health${m.generation >= 15 ? " (on recent iOS versions it may be labelled Battery Health & Charging)" : ""}. It shows Maximum Capacity and whether peak performance is being limited. ${m.generation >= 15 ? `On the ${m.name} the cycle count is also shown in Settings (under General > About or within Battery Health, depending on iOS version).` : ""} If iOS says the battery is "significantly degraded", Apple's own message recommends service.`,
    },
    {
      q: `At what percentage should I replace the ${m.name} battery?`,
      a: `There isn't a single cut-off. Apple designs ${m.generation >= 15 ? "iPhone 15-and-later" : "iPhone 14-and-earlier"} batteries to hold about 80% capacity at ${cycles.toLocaleString("en-IN")} cycles, and iOS will tell you when the battery is significantly degraded. If the phone shuts down unexpectedly, slows noticeably, or doesn't last your day, it's worth replacing regardless of the number.`,
    },
    {
      q: "Will Battery Health show correctly after a replacement?",
      a: `With a genuine Apple battery fitted through Apple's process, yes. With other batteries, Apple shows "Unable to verify this iPhone has a genuine Apple battery" and says health information may not be accurate. We'll tell you which battery grade you're getting before we start.`,
    },
    {
      q: `My ${m.name} feels slow. Will a new battery help?`,
      a: "If Battery Health says peak performance capability is being managed, yes — performance management exists because the old battery can't supply peak power, and a healthy battery removes the reason for it. If it isn't being managed, the slowness is more likely storage, software or heat, and a battery won't fix it.",
    },
    {
      q: "Is a swollen battery dangerous?",
      a: "A swollen battery can push the screen or back away from the frame. Stop charging the phone, don't press on the bulge or try to flatten it, keep it away from heat, and get it looked at promptly. Tell us it's swollen when you book so the technician comes prepared.",
    },
    m.batteryRemoval === "electric" || m.batteryRemoval === "electric-tray"
      ? {
          q: `Is battery replacement easier on the ${m.name} than on older iPhones?`,
          a: `The removal step is. The ${m.name} uses adhesive that releases with a low electrical current instead of the stretch-release strips on older models, so the old battery comes out more safely. The rest of the job — opening the phone and resealing it — still needs the same care.`,
        }
      : { q: "", a: "" },
    {
      q: `How much does ${m.name} battery replacement cost?`,
      a: `It depends on the battery grade you choose. We give you an exact price for the ${m.name} after inspection and before any work, and you pay after the service.`,
    },
    {
      q: "What if a new battery doesn't fix the drain?",
      a: "Then the drain isn't the battery. Common culprits are an app running in the background (check Settings > Battery for usage by app), weak mobile signal, or a board-level fault drawing power. That's why we test before replacing anything.",
    },
  ].filter((f) => f.q);

  return {
    metaDescription: clampMeta(
      `${m.name} battery replacement in Hyderabad: when to replace, what Apple's ${cycles.toLocaleString("en-IN")}-cycle design target means, Battery Health messages, and a quote first.`,
    ),
    intro: [
      `All lithium-ion batteries wear out. Apple designs the ${m.name}'s battery to keep 80% of its original capacity at ${cycles.toLocaleString("en-IN")} complete charge cycles under ideal conditions — heat, fast charging habits and age all push real-world results below that.`,
      `Here's how to tell whether your ${m.name} actually needs a new battery, what's different about this model, and what happens during a TurboFix visit.`,
    ],
    facts: [
      { label: "Apple design target", value: `80% capacity at ${cycles.toLocaleString("en-IN")} cycles` },
      { label: "Chip", value: m.chip },
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `How do I know my ${m.name} battery is worn out?`,
        bullets: [
          "Battery Health shows low Maximum Capacity or says the battery is significantly degraded",
          "The phone switches off at 20–30% or during cold mornings or camera use",
          "Apps open slowly and Battery Health says peak performance is being managed",
          "The percentage jumps or drops suddenly",
          "The phone gets unusually warm while charging",
          "The screen or back has started to lift — a sign of swelling",
        ],
      },
      {
        id: "causes", heading: "Why do iPhone batteries wear out faster?",
        paragraphs: [
          "Every charge cycle ages a battery a little. Heat speeds that up — leaving a phone on a car dashboard or charging under a pillow in summer does real damage. Regularly running the battery to zero, or holding it at 100% on a hot charger, adds to the wear.",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `When won't a new battery fix my ${m.name}?`,
        bullets: [
          "Fast drain caused by one app or a background process — Settings > Battery shows usage by app.",
          "A phone that won't charge at all may have a charging port or charging-circuit fault rather than a dead battery.",
          "A phone that won't power on even on the charger may have a board-level fault; we test with a known-good battery to tell the difference.",
          "Overheating while idle can point to a short on the logic board.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          `Note your Maximum Capacity${m.generation >= 15 ? " and cycle count" : ""} from Settings so we can compare after the job.`,
          BACKUP_TIP,
          "If the battery is swollen, stop charging it and tell us when you book.",
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          `We confirm the new battery charges, check that wired${m.magsafe ? ", MagSafe" : ""} and wireless charging work, and look at the Battery Health screen with you. A new battery may take a few charge cycles for the percentage readings to settle.`,
          `${m.generation >= 15 ? `If you want to slow future wear, consider the 80% charging limit in Battery settings. ` : ""}Keep the phone out of direct sun and avoid charging it under pillows or in hot cars.`,
        ],
      },
    ],
    process: [
      { title: "Health check", desc: "We read Battery Health and test charging to confirm the battery is the cause." },
      { title: "Quote", desc: "Battery grade, price and warranty period are agreed before opening the phone." },
      { title: "Swap", desc: `The ${m.name} is opened, the old battery released${m.batteryRemoval === "electric" || m.batteryRemoval === "electric-tray" ? " using its electrically debonding adhesive" : ""}, and the new one fitted and sealed.` },
      { title: "Verify", desc: "Charging, wireless charging and Battery Health are checked with you." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.batteryPerf, COMMON_SOURCES.batteries]),
  };
}

function buildChargingPort(m: IphoneModel): Built {
  const usbc = m.connector === "USB-C";
  const specifics = [
    usbc
      ? `Connector: USB-C, running at ${m.usbSpeed}${m.usbSpeed === "USB 3" ? " (up to 10 Gb/s with a USB 3 cable — the cable in the box is USB 2)" : " (up to 480 Mb/s), so slow transfers to a computer are normal and not a fault"}.`
      : "Connector: Lightning. Cheap, uncertified Lightning cables are a common cause of \"accessory not supported\" warnings and intermittent charging, so we test with a known-good cable first.",
    m.magsafe
      ? "MagSafe: if MagSafe or wireless charging works but the cable doesn't, that strongly points at the port or its flex cable rather than the battery."
      : `Wireless charging: the ${m.name} supports standard Qi wireless charging but not MagSafe. If wireless charging works but the cable doesn't, that points at the port.`,
    `Liquid detection: on iPhone XS and later, including the ${m.name}, iOS can warn that liquid has been detected in the ${m.connector} connector and stop charging through it until it's dry. Apple advises against drying the phone with heat or putting it in rice.`,
    "Shared flex: on many iPhones the charging port sits on a flex cable that also carries a bottom microphone, so a port fault and a microphone fault can share the same cause.",
    ...noteFor(m, "charging-port-service"),
  ];

  const faqs = [
    {
      q: `Why does my ${m.name} only charge at a certain angle?`,
      a: `Usually lint packed into the back of the ${m.connector} port stops the plug seating fully, or the cable itself is worn. Less often the contacts inside the port are damaged. We clean and test first, because a cleaning often resolves it without any parts.`,
    },
    {
      q: `My ${m.name} says liquid was detected in the ${m.connector} connector. What should I do?`,
      a: `Unplug everything, tap the phone gently with the connector facing down, and leave it to dry in a place with some airflow. Apple advises not to use heat, compressed air or rice. If the warning keeps returning on a dry phone, the port may have corrosion that needs cleaning or replacing.`,
    },
    usbc
      ? {
          q: `Can I use any USB-C cable with the ${m.name}?`,
          a: `Most good-quality USB-C cables will charge it. Data speed depends on both the cable and the phone: the ${m.name} supports ${m.usbSpeed}. ${m.usbSpeed === "USB 3" ? "You'll need a cable rated for USB 3 to get the faster speed." : "A faster cable won't make transfers quicker on this model."} Very cheap cables can be loose or charge intermittently — try another cable before booking.`,
        }
      : {
          q: `Do I need an Apple cable for the ${m.name}?`,
          a: "Not necessarily, but use an Apple or MFi-certified Lightning cable. Uncertified cables can fail early, trigger \"accessory not supported\" messages, or charge intermittently — symptoms that look like a port fault.",
        },
    {
      q: "Will cleaning the port fix it, or does it need replacing?",
      a: "Many charging problems are lint and dust. If the port is clean and charging is still unreliable with a known-good cable, or the contacts are visibly damaged or corroded, a replacement is the next step. We show you what we find before recommending anything.",
    },
    {
      q: "Can a charging port replacement fix a phone that won't charge at all?",
      a: "Only if the port is the problem. A phone that doesn't charge by cable or wirelessly may have a battery or charging-circuit fault on the logic board instead. We test wireless charging and use a known-good battery where needed to narrow it down.",
    },
    m.magsafe
      ? {
          q: "MagSafe charging works but the cable doesn't — what does that mean?",
          a: `That's a useful clue: the battery and main charging path are working, so the fault is very likely the ${m.connector} port, its flex cable, or the cable you're using.`,
        }
      : { q: "", a: "" },
    {
      q: `How much does ${m.name} charging port service cost?`,
      a: "If a cleaning solves it, it's the simplest outcome. If a part is needed, we quote the exact price for your model and the warranty period before any work, and you pay after.",
    },
  ].filter((f) => f.q);

  return {
    metaDescription: clampMeta(
      `${m.name} charging port service in Hyderabad: ${m.connector} cleaning and replacement, liquid-detection alerts, cable checks${m.magsafe ? ", MagSafe tests" : ""} and a quote before work.`,
    ),
    intro: [
      `The ${m.name} charges through a ${m.connector} port${usbc ? ` (${m.usbSpeed})` : ""}${m.magsafe ? " and supports MagSafe wireless charging" : " and supports Qi wireless charging"}. When wired charging gets unreliable, the port is often just full of lint — but it can also be a worn cable, liquid in the connector, or a fault further inside.`,
      `We start with the simplest explanation and work inwards, so you're not paying for a part you don't need.`,
    ],
    facts: [
      { label: "Connector", value: `${m.connector}${m.usbSpeed ? ` (${m.usbSpeed})` : ""}` },
      { label: "Wireless", value: m.magsafe ? "MagSafe and Qi" : "Qi only (no MagSafe)" },
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `How do I know my ${m.name} charging port is faulty?`,
        bullets: [
          "The cable feels loose or falls out easily",
          "Charging only works at a certain angle, or starts and stops",
          "\"Accessory not supported\" or liquid-detection alerts when you plug in",
          m.magsafe ? "MagSafe or wireless charging works, but the cable doesn't" : "Wireless charging works, but the cable doesn't",
          "A computer doesn't recognise the phone over the cable",
          "Visible green or white corrosion inside the port",
        ],
      },
      {
        id: "causes", heading: `What causes ${m.name} charging port problems?`,
        paragraphs: [
          "Pocket lint packs into the port each time you plug in, until the plug can't seat. Liquid — sweat, rain, a spill — can corrode the contacts. Plugging in at an angle or with the phone in use can bend contacts over time. And many \"broken ports\" turn out to be a frayed cable.",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `When won't a new port fix my ${m.name}?`,
        bullets: [
          `If neither cable nor ${m.magsafe ? "MagSafe" : "wireless"} charging works, the battery or charging circuitry is more likely than the port.`,
          "If the phone charges but the percentage barely moves, the battery may be worn.",
          "If charging stopped after liquid exposure, corrosion may have reached the logic board — the port alone may not be enough.",
          "If the phone gets hot and drains while plugged in, there may be a short that needs board-level diagnosis.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          `Try a second, known-good ${m.connector} cable and a different adapter.`,
          `Try ${m.magsafe ? "a MagSafe or" : "a"} wireless charger, and note whether that works.`,
          "Don't dig into the port with metal pins — it can bend the contacts.",
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          `We test charging with a reference cable, check that the phone connects to a computer, and test a call and voice recording because of the shared microphone flex. ${m.usbSpeed === "USB 3" ? "If fast data transfer matters to you, bring your USB 3 cable and we'll test with it." : ""}`,
          "To keep the port clean, avoid carrying the phone in lint-heavy pockets with the port facing down, and use a case with a port cover if you work in dusty places.",
        ],
      },
    ],
    process: [
      { title: "Inspect and clean", desc: `The ${m.connector} port is inspected under light and cleaned with non-conductive tools.` },
      { title: "Test with reference parts", desc: "Known-good cable and charger rule out accessory problems." },
      { title: "Quote if a part is needed", desc: "If cleaning doesn't fix it, you get a price and warranty period before we open the phone." },
      { title: "Replace and verify", desc: "The port assembly is replaced and charging, data and microphones are tested." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.partsHistory]),
  };
}

function buildCamera(m: IphoneModel): Built {
  const rear = m.rearCameras;
  const camHistory = hasHistory(m, "Rear cameras");
  const tele = rear.find((c) => /Telephoto/.test(c));
  const specifics = [
    `Rear cameras: ${list(rear)}.`,
    `Front camera: ${m.frontCamera}, part of the TrueDepth system that also handles Face ID.`,
    m.lidar ? "LiDAR Scanner: helps with low-light focus, Portrait mode and AR. It's a separate module from the cameras and can fail on its own." : "",
    m.cameraControl ? "Camera Control: the side button that opens and adjusts the camera is a separate part. If it stops responding but the camera works, it's the button or its flex, not the camera module." : "",
    camHistory
      ? `Parts history: on iPhone 12 and later, including the ${m.name}, ${HISTORY_PATH} lists the front and rear cameras. A non-genuine or unverified camera shows as "Unknown Part".`
      : `Parts history: on the ${m.name}, ${HISTORY_PATH} tracks the battery and display but not the cameras.`,
    "Face ID: front camera work happens next to the Face ID parts, which are paired to the logic board. Damaged Face ID components can't be swapped from another phone and keep working.",
    ...noteFor(m, "camera-service"),
  ].filter(Boolean);

  const faqs = [
    {
      q: `My ${m.name} photos are blurry. Is the camera broken?`,
      a: `Not always. First wipe the lens covers and remove the case — some cases block or reflect into the lenses. If one lens cover is cracked, photos from that camera look hazy or flared, and replacing the cover may be enough. If photos are blurry on a clean, uncracked lens, or focus hunts back and forth, the camera module itself is the likely cause.`,
    },
    {
      q: "Can you replace just the camera lens glass?",
      a: `Often, yes. The lens cover is a separate piece of glass over each camera on the ${m.name}. If the camera behind it is undamaged, replacing the cover restores clear photos without changing the camera module. We check the camera behind the crack before quoting.`,
    },
    {
      q: `Why does my ${m.name} camera shake, buzz or click?`,
      a: `The ${m.name}'s main camera uses optical image stabilisation, which physically moves parts to counter hand shake. If those parts are damaged, the image can jitter or you may hear buzzing. Apple has warned that strong vibrations — for example from mounting a phone on a high-powered motorcycle — can degrade the stabilisation and autofocus systems. A damaged stabiliser means replacing that camera module.`,
    },
    camHistory
      ? {
          q: "Will a replaced camera show as \"Unknown Part\"?",
          a: `On the ${m.name}, yes, if the replacement isn't a genuine Apple part installed through Apple's process. It shows under ${HISTORY_PATH}. We tell you the part grade before starting.`,
        }
      : { q: "", a: "" },
    {
      q: "Will Face ID be affected if you work on the front camera?",
      a: "It shouldn't be, when the work is done carefully. The front camera and the Face ID parts sit side by side, and the Face ID parts are paired to the logic board. We test Face ID before and after. If Face ID was already failing before the job, replacing the front camera won't bring it back.",
    },
    tele
      ? {
          q: `Only the zoom lens is blurry on my ${m.name} — why?`,
          a: `Each rear camera on the ${m.name} is a separate module. The ${tele.replace(/^12MP |^48MP /, "")} can fail or have a cracked cover on its own while the main camera stays fine. Test by switching between the zoom levels in the Camera app and note which ones are affected.`,
        }
      : {
          q: rear.length === 1
            ? `The ${m.name} has one rear camera — what does that mean for service?`
            : `Which ${m.name} camera is faulty if only some photos look wrong?`,
          a: rear.length === 1
            ? `Every rear zoom level on the ${m.name}, including 2x, comes from the single main camera, so if all of them look bad the main module or its lens cover is the cause. There's no separate zoom camera to replace.`
            : `On the ${m.name}, 0.5x uses the Ultra Wide camera and 1x${m.rearCameras[0].startsWith("48MP") ? " and 2x" : ""} use${m.rearCameras[0].startsWith("48MP") ? "" : "s"} the main camera. Take a photo at each setting: if only one looks wrong, that module (or its lens cover) is the one to look at.`,
        },
    m.lidar
      ? {
          q: "Portrait mode or AR measuring doesn't work properly — is that the camera?",
          a: `It may be the LiDAR Scanner rather than the cameras. On the ${m.name}, LiDAR helps with depth, low-light focus and AR. We test it separately so you only pay for what's actually faulty.`,
        }
      : { q: "", a: "" },
    {
      q: `How much does ${m.name} camera service cost?`,
      a: "It depends on which camera, or just the lens cover, needs work and the part grade. You'll get the price and warranty period after inspection, before any work starts.",
    },
    {
      q: "My camera app shows a black screen. Is the camera dead?",
      a: "Force-close the Camera app and restart the phone first. If one camera is black but others work, that module is likely faulty. If every camera is black, the cause may be a shared connector or the logic board — we diagnose before replacing anything.",
    },
  ].filter((f) => f.q);

  return {
    metaDescription: clampMeta(
      `${m.name} camera service in Hyderabad: ${rear.length === 1 ? "rear" : `${rear.length} rear cameras`}, ${m.frontCamera.split(" ")[0]} front camera, lens covers${m.lidar ? ", LiDAR" : ""} and Face ID checks. Diagnosis and a quote before work.`,
    ),
    intro: [
      `The ${m.name} has ${rear.length === 1 ? "a single rear camera" : `${rear.length} rear cameras`} (${list(rear)}) and a ${m.frontCamera} front camera${m.lidar ? ", plus a LiDAR Scanner" : ""}. Camera trouble can be anything from a cracked lens cover to a failed stabiliser, and the fix is very different for each.`,
      `This page explains how to narrow down a camera fault on the ${m.name}, which problems a camera replacement solves, and where it won't help.`,
    ],
    facts: [
      { label: "Rear", value: rear.join(" · ") },
      { label: "Front", value: m.frontCamera },
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `How do I know my ${m.name} camera needs service?`,
        bullets: [
          "Blurry or hazy photos even on a clean lens",
          "Focus that hunts back and forth, or won't lock",
          "Shaking image, buzzing or clicking from the camera area",
          "Black screen when switching to one of the cameras",
          "Dust or a spot that appears in the same place in every photo",
          "Cracked lens cover",
          "Front camera black or blurry, or selfies out of focus",
          "Flash not firing",
        ],
      },
      {
        id: "causes", heading: `What causes ${m.name} camera problems?`,
        paragraphs: [
          "Drops are the main cause — the camera bump takes impacts first and lens covers crack. Strong vibration can damage the stabilisation system. Liquid can fog lenses or corrode connectors. Occasionally dust gets inside after a previous repair.",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `When won't a new camera fix my ${m.name}?`,
        bullets: [
          "A cracked lens cover over a healthy camera needs a new cover, not a camera module.",
          "If every camera fails at once, the cause may be a shared connector or the logic board.",
          "Face ID problems aren't solved by replacing the front camera.",
          "App crashes or a frozen camera after an update are software issues — restart and update first.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          "Take test photos at every zoom level and in Portrait mode, and note which ones look wrong.",
          "Record a short video to check for shaking or noise.",
          "Remove the case and clean the lenses with a soft cloth.",
          PASSCODE_TIP,
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          `We test photos and video on each camera, focus at near and far distances, the flash${m.lidar ? ", LiDAR-assisted Portrait mode" : ""} and Face ID before handing back. ${camHistory ? `If a non-genuine camera was fitted, ${HISTORY_PATH} will show "Unknown Part" for it.` : ""}`,
        ],
      },
    ],
    process: [
      { title: "Test each camera", desc: "Every lens, zoom level and the front camera are tested to isolate the fault." },
      { title: "Quote", desc: "Lens cover or module, part grade, price and warranty period — agreed before opening." },
      { title: "Replace", desc: "The faulty module or cover is replaced, with care around the Face ID parts." },
      { title: "Verify", desc: "Focus, stabilisation, flash and Face ID are checked with you." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.partsHistory]),
  };
}

function buildSpeakerMic(m: IphoneModel): Built {
  const specifics = [
    m.speakerSpec
      ?? (m.tier === "e" && m.generation === 17
        ? "Audio: Apple lists a built-in stereo speaker with dual microphones for the iPhone 17e."
        : "Audio: stereo speakers — the earpiece at the top doubles as the second speaker, and the main loudspeaker is at the bottom."),
    "Microphones: Apple fits several microphones (bottom, front and rear) used for calls, video and noise reduction. Each can fail separately, so we test each one.",
    "Shared parts: on many iPhones the bottom microphone shares a flex cable with the charging port, so charging and mic problems can have one cause.",
    `Water resistance: Apple rates the ${m.name} ${m.water} when new, but it isn't waterproof and resistance decreases with wear. Liquid in the speaker grilles can muffle sound until it dries.`,
    ...noteFor(m, "speaker-microphone-service"),
  ];

  const faqs = [
    {
      q: `People can't hear me on calls with my ${m.name}. Which part is faulty?`,
      a: "Try this: record a Voice Memo holding the phone normally (bottom mic), then record a video with the front camera and another with the rear camera (these use other mics). If one recording is silent or muffled, that tells us which microphone to look at. Also check that Bluetooth isn't routing the call to earbuds.",
    },
    {
      q: `My ${m.name} earpiece is quiet — does it need replacing?`,
      a: `Often the fine mesh over the earpiece is clogged with dust or skin oil. ${m.generation >= 13 ? `On the ${m.name} the earpiece is a slim slot at the very top edge of the screen, which collects dirt easily.` : `On the ${m.name} the earpiece sits inside the notch at the top of the display.`} A careful cleaning can bring the volume back; if it's still quiet or crackles afterwards, the earpiece speaker may need replacing.`,
    },
    {
      q: `The ${m.name} loudspeaker crackles at high volume. What causes that?`,
      a: "A damaged speaker diaphragm, debris in the grille, or liquid that hasn't fully dried. If it started after water exposure, give it time to dry and try again. Persistent distortion usually means the speaker needs replacing.",
    },
    {
      q: `Could my ${m.name}'s sound problem be a setting rather than hardware?`,
      a: m.actionButton
        ? `Sometimes. The ${m.name} has an Action button instead of a Ring/Silent switch, so check Control Centre or the Action button hasn't put the phone in Silent mode. Then restart, turn Bluetooth off and try another app. If sound works through headphones but not the speaker, the hardware is the likely cause.`
        : `Sometimes. Check the Ring/Silent switch on the side of the ${m.name} isn't showing orange, then restart, turn Bluetooth off and try another app. If sound works through headphones but not the speaker, the hardware is the likely cause.`,
    },
    {
      q: "Can a board fault cause audio problems?",
      a: "Yes. If speaker, earpiece and microphones all fail together, or audio stopped after a drop or liquid exposure, the cause can be on the logic board. Replacing speakers won't fix that; we diagnose first.",
    },
    m.speakerSpec
      ? {
          q: `Does the ${m.name} have stereo speakers?`,
          a: `${m.speakerSpec} If you're comparing it with another iPhone and it sounds narrower, that's expected. Look for distortion, crackling or very low volume instead as signs of a fault.`,
        }
      : { q: "", a: "" },
    {
      q: `How much does ${m.name} speaker or microphone service cost?`,
      a: "If cleaning sorts it out, it's quick. If a part is needed, we quote the exact price and warranty period after testing, before any work starts.",
    },
    {
      q: `Will the ${m.name} stay water resistant afterwards?`,
      a: `Apple rates the ${m.name} ${m.water} when new. Opening the phone disturbs the factory seals; fresh adhesive is used when we close it, but nobody can honestly guarantee the original rating after any opening. Treat it as no longer water resistant.`,
    },
  ].filter((f) => f.q);

  return {
    metaDescription: clampMeta(
      `${m.name} speaker and microphone service in Hyderabad: muffled calls, quiet earpiece, crackling speaker or mic faults. Simple tests to try, diagnosis and a quote first.`,
    ),
    intro: [
      `Audio problems on the ${m.name} — callers who can't hear you, a muffled earpiece, a crackling loudspeaker — have causes ranging from a clogged grille to a failed part or a board fault.`,
      `Below are simple checks you can do yourself, what's specific to the ${m.name}'s audio hardware, and what to expect if you book a visit.`,
    ],
    facts: [
      { label: "Water rating (when new)", value: m.water },
      { label: "Chip", value: m.chip },
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `How do I know my ${m.name} speaker or mic is faulty?`,
        bullets: [
          "Callers say you sound muffled or far away",
          "Siri or dictation can't hear you",
          "The earpiece is quiet even at full volume",
          "The loudspeaker crackles, buzzes or distorts",
          "Videos you record have no sound or very low sound",
          "Speakerphone is much quieter than it used to be",
        ],
      },
      {
        id: "causes", heading: `What causes ${m.name} speaker and mic problems?`,
        paragraphs: [
          "Dust and pocket lint in the grilles, liquid exposure, drops that dislodge or damage a speaker, and corrosion on connectors. Bluetooth or software routing can also send audio somewhere unexpected.",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `When won't a new speaker or mic fix my ${m.name}?`,
        bullets: [
          "If all audio fails at once, suspect the board or software before individual parts.",
          "If the fault only happens on calls, check network and Bluetooth first.",
          "If the speaker works but is quieter after water exposure, let it dry fully before deciding.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          "Record a Voice Memo, a front-camera video and a rear-camera video, and note which have bad sound.",
          "Play music through the speaker and through headphones to compare.",
          "Turn Bluetooth off and restart the phone.",
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          "We test a call, speakerphone, a Voice Memo and videos on both cameras, so every speaker and microphone is checked before you pay.",
        ],
      },
    ],
    process: [
      { title: "Test every mic and speaker", desc: "Recordings and calls isolate exactly which part is affected." },
      { title: "Clean", desc: "Grilles and meshes are cleaned; sometimes that's all it needs." },
      { title: "Quote if needed", desc: "If a part is required, price and warranty period are agreed first." },
      { title: "Replace and verify", desc: "The part is replaced and every audio path is retested." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.partsHistory]),
  };
}

function buildBack(m: IphoneModel): Built {
  const name = m.back === "unibody-inset" ? "back panel" : "back glass";
  const construction = {
    "glass-bonded": `On the ${m.name}, the back glass is bonded into the ${m.frame} housing rather than fitted as a separate part. Replacing it means either removing the broken glass from the housing or moving all internal parts into a new housing. Both are slower jobs than on models with removable back glass — ask which method your quote uses.`,
    "glass-removable": `The ${m.name} has a back glass panel that can be replaced on its own, so the job doesn't involve stripping the whole phone into a new housing.`,
    "unibody-inset": `The ${m.name} has an aluminium unibody with a Ceramic Shield glass section on the back. Cracks in that glass section and damage to the aluminium body are different jobs: glass can be replaced, but dents or deep scratches in the aluminium need a housing replacement.`,
  }[m.back];

  const specifics = [
    `Back: ${m.backFinish}; frame: ${m.frame}.`,
    construction,
    m.magsafe
      ? "MagSafe: the magnets and wireless charging coil sit behind the back. We test MagSafe alignment and wireless charging after the job."
      : "Wireless charging: the coil sits behind the back; we test Qi wireless charging after the job.",
    ...noteFor(m, "back-panel-replacement"),
  ];

  const faqs = [
    {
      q: `Can I keep using my ${m.name} with a cracked ${name}?`,
      a: "Usually, yes, but loose shards can cut your fingers, cracks tend to spread, and a broken back no longer keeps dust and moisture out. A case or a clear protective film can hold things together until it's replaced.",
    },
    {
      q: `How is the ${m.name} ${name} replaced?`,
      a: construction,
    },
    {
      q: "Will the colour and finish match?",
      a: `We aim to match your ${m.name}'s colour and ${m.backFinish}. Replacement parts can vary slightly in shade or texture between suppliers, so if an exact match matters, ask to see the part before it's fitted.`,
    },
    {
      q: m.magsafe ? "Will MagSafe and wireless charging still work?" : "Will wireless charging still work?",
      a: `They should. The ${m.magsafe ? "MagSafe magnets and " : ""}charging coil aren't part of the glass itself, but they sit right behind it, so we test wireless charging${m.magsafe ? " and MagSafe alignment" : ""} before handing back.`,
    },
    {
      q: "My frame is bent as well — does that matter?",
      a: `Yes. A new ${name} won't sit flat on a bent frame and can crack again. If the frame is bent, a housing replacement is usually the better fix; we'll tell you after inspection.`,
    },
    {
      q: "Is the camera lens glass part of the back?",
      a: `No. The camera lens covers are separate pieces of glass. If they're cracked too, they're quoted separately — see our ${m.name} camera service page.`,
    },
    {
      q: `How much does ${m.name} ${name} replacement cost?`,
      a: `The price depends on the method${m.back === "glass-bonded" ? " (glass-only or housing swap)" : ""} and the part grade. We quote after inspection, before any work starts.`,
    },
    {
      q: "Does replacing the back affect water resistance?",
      a: `Apple rates the ${m.name} ${m.water} when new. After the back has been removed, that rating can't honestly be guaranteed, even with new adhesive. Treat the phone as no longer water resistant.`,
    },
  ];

  return {
    metaDescription: clampMeta(
      `${m.name} ${name} replacement in Hyderabad: how the ${m.backFinish} is replaced on this model, colour match${m.magsafe ? ", MagSafe checks" : ""} and a quote before any work.`,
    ),
    intro: [
      `The ${m.name} has a ${m.backFinish} with a ${m.frame} frame. ${m.back === "glass-bonded" ? "Because its back glass is bonded into the housing, replacing it is more involved than on newer iPhones with removable back glass." : m.back === "glass-removable" ? "Its back glass can be replaced as a separate part, which keeps the job simpler than on older iPhones." : "Its design is different from earlier glass-backed iPhones, which changes what a 'back replacement' means."}`,
      `Here's what affects a ${name} job on the ${m.name}, what to check, and what to expect.`,
    ],
    facts: [
      { label: "Back", value: m.backFinish },
      { label: "Frame", value: m.frame },
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `When does the ${m.name} ${name} need replacing?`,
        bullets: [
          "Cracked or shattered glass on the back",
          "Glass shards coming loose around the edges or camera",
          m.back === "unibody-inset" ? "Dents or gouges in the aluminium body" : "Cracks spreading from a corner after a drop",
          m.magsafe ? "MagSafe accessories not sitting flat because of raised glass" : "Wireless charger not sitting flat because of raised glass",
          "A back that has lifted because the battery underneath is swelling (this needs a battery check first)",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `When isn't a new ${name} enough on the ${m.name}?`,
        bullets: [
          "A lifted back can be caused by a swollen battery — that has to be dealt with first.",
          "A bent frame needs a housing, not just glass.",
          "Wireless charging that stopped working may be a coil or board fault rather than the glass.",
          "Cracked camera lens covers are a separate part.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          "Check whether the back is flat or lifted — a lifted back may mean a swollen battery.",
          `Test ${m.magsafe ? "MagSafe and " : ""}wireless charging and note whether it works.`,
          "Put tape or a case over loose glass so it doesn't cut you or shed shards.",
          BACKUP_TIP,
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          `We check the fit around the edges and camera, test ${m.magsafe ? "MagSafe and " : ""}wireless charging, and confirm the cameras and flash work before you pay.`,
        ],
      },
    ],
    process: [
      { title: "Inspect", desc: "We check the glass, the frame, the battery and wireless charging." },
      { title: "Quote", desc: `Method${m.back === "glass-bonded" ? " (glass or housing)" : ""}, part grade, price and warranty period agreed before work.` },
      { title: "Replace", desc: `The damaged ${name} is removed and the new one fitted and sealed.` },
      { title: "Verify", desc: "Fit, wireless charging and cameras are checked with you." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.partsHistory]),
  };
}

function buildMotherboard(m: IphoneModel): Built {
  const logicHistory = hasHistory(m, "Logic Board");
  const specifics = [
    `Chip: ${m.chip}${m.modem ? `, with Apple's ${m.modem.replace("Apple ", "")} cellular modem` : ""}. The chip, storage and security hardware are all on the logic board.`,
    "Your data lives on the board. Storage is soldered to the logic board and encrypted with keys tied to that board, so a replacement board starts empty. Without a backup, the data on a dead board can only be reached by bringing that board back to life (chip-level work).",
    "Face ID is paired to the original board. On a replacement board from another phone, Face ID normally won't work, and that pairing can't be redone outside Apple.",
    logicHistory
      ? `Parts history: the ${m.name} lists the logic board in ${HISTORY_PATH}. Apple says a replaced, unverified logic board might affect features such as Apple Pay.`
      : "",
    "Identifiers: the IMEI and serial number belong to the logic board. After a board replacement the phone reports the replacement board's identifiers. A legitimate replacement never involves altering an IMEI.",
    "Activation Lock: any replacement board must be free of Activation Lock and come from a legitimate source.",
    ...noteFor(m, "motherboard-replacement"),
  ].filter(Boolean);

  const faqs = [
    {
      q: `Will I lose my data if the ${m.name} motherboard is replaced?`,
      a: "Yes — data on the old board doesn't move to the new one, because storage is part of the board and encrypted to it. If you have an iCloud or computer backup, you can restore it onto the replacement. If you don't, ask about chip-level service first: reviving the original board is the only way to reach that data.",
    },
    {
      q: "Will Face ID work after a motherboard replacement?",
      a: "Usually not. Face ID parts are paired to the original logic board, and that pairing can't be redone outside Apple. Plan on using your passcode instead.",
    },
    logicHistory
      ? {
          q: "Will Apple Pay still work?",
          a: `Apple says a replaced logic board that shows as "Unverified" in ${HISTORY_PATH} might affect features such as Apple Pay. We'll discuss this with you before you decide.`,
        }
      : { q: "", a: "" },
    {
      q: "Will my IMEI number change?",
      a: "Yes. The IMEI belongs to the logic board, so the phone will report the replacement board's IMEI and serial number. Ask for them in writing with your invoice. A legitimate board replacement never involves editing an IMEI.",
    },
    {
      q: "Is a motherboard replacement worth it?",
      a: `It depends on the ${m.name}'s value to you, whether you have a backup, and the alternatives. Because Face ID usually won't work afterwards and data isn't transferred, we often recommend trying chip-level service on your original board first.`,
    },
    {
      q: "When is a motherboard replacement the right choice?",
      a: "When the original board is beyond economical chip-level work — for example severe liquid corrosion or damage to the main processor or storage — and you have a backup or don't need the data.",
    },
    {
      q: `How much does a ${m.name} motherboard replacement cost?`,
      a: isNew(m)
        ? `For a model as new as the ${m.name}, replacement boards may not be available outside Apple yet. Contact us to check availability; if a board can be sourced, you get a quote before any work.`
        : "It depends on board availability and storage size. We quote after diagnosis, before any work, and explain whether chip-level service is a better option.",
    },
  ].filter((f) => f.q);

  return {
    metaDescription: clampMeta(
      `${m.name} motherboard replacement in Hyderabad: what happens to your data, Face ID${logicHistory ? ", Apple Pay" : ""} and IMEI, when chip-level service is better, and a quote first.`,
    ),
    intro: [
      `The ${m.name}'s logic board holds the ${m.chip} chip, its storage and its security hardware. Replacing the whole board is a big step: your data doesn't come across, and Face ID usually won't work afterwards.`,
      `This page explains when a motherboard replacement makes sense for an ${m.name}, what changes afterwards, and when chip-level service on your original board is the better route.`,
    ],
    facts: [
      { label: "Chip", value: m.chip },
      ...(m.modem ? [{ label: "Modem", value: m.modem }] : []),
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `When does a ${m.name} need a new motherboard?`,
        bullets: [
          "Phone is completely dead even with a known-good battery and charger",
          "Constant restarts or a boot loop that a software restore doesn't fix",
          "Severe liquid damage with corrosion across the board",
          "Damage to the main processor or storage that can't be repaired at component level",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `Why does diagnosis come before a ${m.name} board replacement?`,
        paragraphs: [
          "Many 'dead' iPhones turn out to have a failed battery, charging port, display connector or a single faulty component. We rule those out before ever suggesting a board replacement, because a new board means losing Face ID and starting with an empty phone.",
        ],
        bullets: [
          "Try a software restore with a computer if the phone powers on but won't boot.",
          "If you need your data and have no backup, chip-level service on the original board is the only way to reach it.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          "Check whether you have a recent iCloud or computer backup.",
          "Know your Apple Account password — you'll need it to sign in and restore.",
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          `The phone is set up fresh, so you'll restore from backup and sign in again. Face ID will usually be unavailable. We test calls, mobile data, Wi-Fi, Bluetooth, cameras, charging and audio with you, and note the new IMEI and serial number on your invoice.`,
        ],
      },
    ],
    process: [
      { title: "Full diagnosis", desc: "Battery, port, display and board are tested to confirm the board is beyond component-level work." },
      { title: "Explain the trade-offs", desc: "Data, Face ID, Apple Pay and IMEI changes are discussed before you decide." },
      { title: "Source and fit", desc: "An Activation Lock-free board is fitted and the phone reassembled." },
      { title: "Test and document", desc: "Every function is tested and the new identifiers are recorded." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.partsHistory]),
  };
}

function buildChipLevel(m: IphoneModel): Built {
  const lcd = m.display.tech === "LCD";
  const specifics = [
    `Chip: ${m.chip}${m.modem ? `; cellular modem: ${m.modem}` : ""}.`,
    "Board design: many iPhones in this range use a stacked, two-layer logic board, which has to be separated carefully for some component work.",
    m.connector === "Lightning"
      ? "Charging circuitry: Lightning models use dedicated charging and port-control chips; failures there can stop charging even with a new port."
      : "Charging circuitry: a phone that won't charge through a new USB-C port may have a fault in the charging or power-management circuitry on the board.",
    lcd ? "Backlight: as the only LCD model in this range, a dark-but-working screen on the iPhone 11 can come from the backlight circuit." : "",
    "Face ID, Secure Enclave and storage are tied to this board. Chip-level work keeps your original board — and therefore your data and Face ID — if it succeeds.",
    ...noteFor(m, "chip-level-service"),
  ].filter(Boolean);

  const faqs = [
    {
      q: "What is chip-level service?",
      a: `It's component-level work on the ${m.name}'s logic board: finding the failed part — a power chip, a connector, a filter, a short circuit — and replacing just that component under a microscope, rather than replacing the whole board.`,
    },
    {
      q: `Can you recover data from a dead ${m.name}?`,
      a: "Only by getting the original board working again, because the storage is encrypted to that board. If the fault is in a repairable component, data is often reachable once the phone boots. We can't promise recovery before diagnosis, and some faults (for example a failed processor or storage chip) make it impossible.",
    },
    {
      q: "How is this different from a motherboard replacement?",
      a: "Chip-level service keeps your original board, so your data, Face ID and IMEI stay as they are if the work succeeds. A motherboard replacement swaps the whole board: data isn't transferred and Face ID usually stops working.",
    },
    {
      q: `Is chip-level work on a ${m.name} done at my doorstep?`,
      // TODO(owner): confirm where board-level work is carried out.
      a: "Board-level work needs a microscope and a soldering bench, so it may not be possible at your doorstep. We'll tell you when you book; pickup and delivery are available, or you can bring the phone to our Nampally studio.",
    },
    {
      q: `My ${m.name} stopped working after water damage. Is chip-level service the right option?`,
      a: `Often, yes. Apple rates the ${m.name} ${m.water} when new, but that resistance wears over time and doesn't cover every kind of liquid. Liquid that gets in causes corrosion and shorts on specific parts of the board, and cleaning and replacing those components can bring a phone back. The sooner it's looked at, the better — don't charge a phone that has been in water.`,
    },
    {
      q: "What happens if it can't be fixed?",
      a: "We explain what we found and your options. See our no fix, no fee policy for how that's handled.",
    },
    {
      q: `How long does chip-level work on a ${m.name} take, and how much does it cost?`,
      a: "Both depend on the fault, which we can only know after diagnosis. We give you a quote and an estimate after diagnosis, before starting the work.",
    },
  ];

  return {
    metaDescription: clampMeta(
      `${m.name} chip-level service in Hyderabad: board-level diagnosis for no power, no charging, no service or liquid damage — keeping your data and Face ID where possible.`,
    ),
    intro: [
      `When an ${m.name} won't power on, won't charge even with a new port, loses mobile signal or stops working after liquid exposure, the fault is often a single component on the logic board. Chip-level service finds and replaces that component, keeping your original board.`,
      `That matters because the ${m.name}'s storage and Face ID are tied to its original board. If the board can be revived, your data and Face ID come back with it.`,
    ],
    facts: [
      { label: "Chip", value: m.chip },
      ...(m.modem ? [{ label: "Modem", value: m.modem }] : []),
      ...quoteFacts(m),
    ],
    sections: [
      {
        id: "symptoms", heading: `How do I know my ${m.name} needs board-level work?`,
        bullets: [
          "No power, even with a known-good battery and charger",
          "Won't charge after the port and battery have been ruled out",
          "No service or \"searching\" while the SIM and network are fine",
          "Wi-Fi or Bluetooth greyed out or unable to turn on",
          "Gets hot while idle, or drains fast even when switched off",
          "Stopped working after liquid exposure",
          lcd ? "Screen is dark but the phone responds to touch and sound" : "Display stays black after a new screen was fitted",
        ],
      },
      { id: "model-specific", heading: `What makes the ${m.name} different for this service?`, bullets: specifics },
      {
        id: "diagnosis", heading: `What can chip-level work on a ${m.name} fix?`,
        bullets: [
          "It can often fix power, charging, backlight, connector and liquid-damage faults on specific components.",
          "It can't change Apple's parts pairing — for example, it can't make a Face ID part from another phone work.",
          "If the main processor or storage itself has failed, the board usually can't be saved, and the data can't be recovered.",
          "We never alter IMEI numbers.",
        ],
      },
      {
        id: "before-booking", heading: `What should I check on my ${m.name} before booking?`,
        bullets: [
          "Tell us the full history: drops, liquid, and any previous repairs.",
          "If the phone was in water, don't charge it or try to switch it on repeatedly.",
          "Let us know if data recovery is your main goal — it changes how we approach the job.",
          warrantyNote(m),
        ],
      },
      {
        id: "after", heading: `What should I expect after the ${m.name} service?`,
        paragraphs: [
          "If the work succeeds, the phone comes back with your data and Face ID intact. We test power, charging, calls, mobile data, Wi-Fi, Bluetooth, cameras and audio before handing it back. Board faults caused by liquid can sometimes return as hidden corrosion develops, so tell us promptly if anything changes.",
        ],
      },
    ],
    process: [
      { title: "Diagnosis", desc: "Power-draw tests and inspection under magnification locate the faulty circuit." },
      { title: "Quote", desc: "What we found, the likely outcome and the price — agreed before starting." },
      { title: "Component work", desc: "Faulty components are replaced or corrosion cleaned on your original board." },
      { title: "Full test", desc: "Every function is tested before return." },
    ],
    faqs,
    sources: withSpecSource(m, [COMMON_SOURCES.partsHistory]),
  };
}

// ── comparison + quick answer ─────────────────────────────────────────────

const REMOVAL_LABEL: Record<IphoneModel["batteryRemoval"], string> = {
  "stretch-release": "pull-tab adhesive strips",
  "not-electric": "conventional adhesive (no electrical release)",
  electric: "electrically released adhesive",
  "electric-tray": "metal tray with electrically released adhesive",
  unverified: "internal design not yet verified",
};

const BACK_LABEL: Record<IphoneModel["back"], string> = {
  "glass-bonded": "back glass bonded to the housing",
  "glass-removable": "separately replaceable back glass",
  "unibody-inset": "aluminium unibody with a glass section",
};

function compareDetail(o: IphoneModel, s: IphoneServiceSlug): string {
  switch (s) {
    case "screen-replacement":
      return `${o.display.size} ${o.display.tech} · ${o.display.promotion ? "up to 120 Hz" : "60 Hz"} · ${o.display.cutout === "dynamic-island" ? "Dynamic Island" : "notch"}${o.display.alwaysOn ? " · Always-On" : ""}`;
    case "battery-replacement":
      return `80% at ${o.batteryCycleTarget.toLocaleString("en-IN")} cycles · ${REMOVAL_LABEL[o.batteryRemoval]}`;
    case "charging-port-service":
      return `${o.connector}${o.usbSpeed ? ` (${o.usbSpeed})` : ""} · ${o.magsafe ? "MagSafe" : "no MagSafe"}`;
    case "camera-service":
      return `${o.rearCameras.join(" + ")} · front ${o.frontCamera.replace(" with autofocus", " (AF)")}${o.lidar ? " · LiDAR" : ""}`;
    case "speaker-microphone-service":
      return `${o.speakerSpec ? "built-in speaker" : "stereo speakers"} · ${o.water.replace("IP68 (up to ", "IP68, ").replace(" for 30 minutes)", "")}`;
    case "back-panel-replacement":
      return `${BACK_LABEL[o.back]} · ${o.frame} frame`;
    case "motherboard-replacement":
    case "chip-level-service":
      return `${o.chip}${o.modem ? ` · ${o.modem} modem` : ""} · logic board ${o.partsHistory.includes("Logic Board") ? "listed" : "not listed"} in parts history`;
  }
}

const COMPARE_COLUMN: Record<IphoneServiceSlug, string> = {
  "screen-replacement": "Display",
  "battery-replacement": "Battery design",
  "charging-port-service": "Port and wireless charging",
  "camera-service": "Cameras",
  "speaker-microphone-service": "Audio and water rating",
  "back-panel-replacement": "Back construction",
  "motherboard-replacement": "Logic board",
  "chip-level-service": "Logic board",
};

function buildComparison(m: IphoneModel, svc: IphoneServiceDef): IphoneServicePage["comparison"] {
  const others = [...getSiblingModels(m), ...getAdjacentModels(m)]
    .filter((o, i, arr) => arr.findIndex((x) => x.slug === o.slug) === i);
  const mine = compareDetail(m, svc.slug);
  const rows = [m, ...others].map((o) => ({ model: o, detail: compareDetail(o, svc.slug), current: o.slug === m.slug }));
  const same = others.filter((o) => compareDetail(o, svc.slug) === mine);
  const summary = same.length
    ? `On these points the ${m.name} matches the ${list(same.map((o) => o.name))}. Parts can still differ in size or fit, so we always quote by exact model.`
    : `None of these models matches the ${m.name} on every point above, so ${svc.label(m).toLowerCase()} is quoted specifically for the ${m.name}.`;
  return {
    heading: `How does the ${m.name} compare for ${svc.label(m).toLowerCase()}?`,
    column: COMPARE_COLUMN[svc.slug],
    rows,
    summary,
  };
}

function buildQuickAnswer(m: IphoneModel, s: IphoneServiceSlug): string {
  const d = m.display;
  switch (s) {
    case "screen-replacement":
      return `A cracked or faulty ${m.name} display is normally fixed by replacing the complete ${d.size} ${d.tech} display assembly.${d.promotion ? " Ask for a panel that keeps 120 Hz ProMotion." : ""} Face ID keeps working if its parts weren't damaged in the drop${m.partsHistory.includes("Display") ? `, and a non-genuine display shows as "Unknown Part" in ${HISTORY_PATH}` : ""}.`;
    case "battery-replacement":
      return `Replace the ${m.name} battery when Battery Health reports significant degradation, the phone shuts down unexpectedly, or performance is being managed. Apple designs this model's battery to keep 80% capacity at ${m.batteryCycleTarget.toLocaleString("en-IN")} cycles; it is held with ${REMOVAL_LABEL[m.batteryRemoval]}.`;
    case "charging-port-service":
      return `Most ${m.name} charging faults start with lint in the ${m.connector} port or a worn cable, so we clean and test before replacing anything. ${m.magsafe ? "If MagSafe charging works but the cable doesn't" : "If Qi wireless charging works but the cable doesn't"}, the port is the likely cause.`;
    case "camera-service":
      return `The ${m.name} has ${m.rearCameras.length === 1 ? "one rear camera" : `${m.rearCameras.length} separate rear cameras`} and a ${m.frontCamera} front camera. A cracked lens cover can often be replaced on its own; blur on a clean lens, shaking or a black view usually means that camera module needs replacing.`;
    case "speaker-microphone-service":
      return `Muffled calls or quiet sound on the ${m.name} are often clogged grilles, so we clean and test every speaker and microphone first. Record a Voice Memo and front and rear camera videos to see which microphone is affected before booking.`;
    case "back-panel-replacement":
      return m.back === "glass-bonded"
        ? `The ${m.name}'s back glass is bonded to its ${m.frame} housing, so it's replaced either by removing the glass from the housing or by moving everything into a new housing. Check for a swollen battery first if the back has lifted.`
        : m.back === "glass-removable"
          ? `The ${m.name} has back glass that can be replaced on its own, which keeps the job simpler than on bonded-glass iPhones. We test ${m.magsafe ? "MagSafe and " : ""}wireless charging afterwards.`
          : `The ${m.name} has an aluminium unibody with a Ceramic Shield glass section. Cracked glass and a damaged aluminium body are different jobs — the body needs a housing replacement.`;
    case "motherboard-replacement":
      return `A ${m.name} motherboard replacement swaps the ${m.chip} logic board. Your data doesn't transfer, Face ID usually stops working and the IMEI changes to the new board's, so we look at chip-level service on your original board first.`;
    case "chip-level-service":
      return `Chip-level service finds and replaces the failed component on the ${m.name}'s original ${m.chip} board. If it succeeds, your data, Face ID and IMEI stay as they were — which a motherboard replacement can't offer.`;
  }
}

function keywordsFor(m: IphoneModel, svc: IphoneServiceDef): string[] {
  const n = m.name.toLowerCase();
  const base = svc.label(m).toLowerCase().replace(" & mic", " and microphone");
  const extra: Record<IphoneServiceSlug, string[]> = {
    "screen-replacement": [`${n} display replacement`, `${n} broken screen`, `${n} ${m.display.tech.toLowerCase()} screen`],
    "battery-replacement": [`${n} battery health`, `${n} new battery`, `${n} battery draining fast`],
    "charging-port-service": [`${n} not charging`, `${n} ${m.connector.toLowerCase()} port`, `${n} charging problem`],
    "camera-service": [`${n} camera not working`, `${n} camera lens replacement`, `${n} front camera`],
    "speaker-microphone-service": [`${n} speaker not working`, `${n} microphone not working`, `${n} earpiece low`],
    "back-panel-replacement": [`${n} back glass`, `${n} cracked back`, `${n} back panel`],
    "motherboard-replacement": [`${n} motherboard`, `${n} logic board`, `${n} dead phone`],
    "chip-level-service": [`${n} board level service`, `${n} not turning on`, `${n} data recovery`],
  };
  return [`${n} ${base}`, `${n} ${base} hyderabad`, ...extra[svc.slug]];
}

const BUILDERS: Record<IphoneServiceSlug, (m: IphoneModel) => Built> = {
  "screen-replacement": buildScreen,
  "battery-replacement": buildBattery,
  "charging-port-service": buildChargingPort,
  "camera-service": buildCamera,
  "speaker-microphone-service": buildSpeakerMic,
  "back-panel-replacement": buildBack,
  "motherboard-replacement": buildMotherboard,
  "chip-level-service": buildChipLevel,
};

export function buildIphoneServicePage(modelSlug: string, serviceSlug: string): IphoneServicePage | undefined {
  const model = getIphoneModel(modelSlug);
  const service = getIphoneService(serviceSlug);
  if (!model || !service) return undefined;
  const built = withoutUniversal(BUILDERS[service.slug](model), service.slug);
  const gen = generationContext(model, service.slug);
  const tier = tierContext(model, service.slug);
  const extra: PageSection[] = [];
  if (gen || tier) {
    extra.push({
      id: "generation",
      heading: gen ? `How does ${service.label(model).toLowerCase()} differ across the ${gen.label}?` : `What matters for ${service.label(model).toLowerCase()} on a ${model.name}?`,
      paragraphs: [gen?.text, tier].filter((t): t is string => Boolean(t)),
    });
  }
  extra.push({
    id: "checks",
    heading: `What do we test on your ${model.name} before handing it back?`,
    paragraphs: [`These checks are chosen for the ${model.name}'s hardware, so features this model has are confirmed working after ${service.label(model).toLowerCase()}:`],
    bullets: postServiceChecks(model, service.slug),
  });
  // Insert after the model-specific section so the page reads: symptoms → causes → this model → its generation → limits …
  const at = built.sections.findIndex((x) => x.id === "model-specific") + 1;
  const sections = [...built.sections.slice(0, at), extra[0], ...built.sections.slice(at)].filter(Boolean) as PageSection[];
  if (extra.length > 1) {
    const afterAt = sections.findIndex((x) => x.id === "after");
    sections.splice(afterAt >= 0 ? afterAt : sections.length, 0, extra[1]);
  }
  const guideTitle = iphoneGuideMeta(service).title.replace(" in Hyderabad", "").toLowerCase().replace(/^iphone/, "iPhone");
  return {
    ...built,
    faqs: [...built.faqs, ...extraFaqs(model, service.slug)],
    intro: [...built.intro, `Advice that applies to every iPhone — data safety, what to check before booking and common causes — is in our ${guideTitle} guide; this page focuses on what's specific to the ${model.name}.`],
    sections,
    model,
    service,
    path: `/${model.slug}/${service.slug}`,
    seoTitle: seoTitleFor(model, service),
    h1: `${model.name} ${service.h1Label(model)}`,
    notice: newModelNotice(model),
    checked: IPHONE_FACTS_CHECKED,
    quickAnswer: buildQuickAnswer(model, service.slug),
    comparison: buildComparison(model, service),
    keywords: keywordsFor(model, service),
  };
}

/** Every model × service combination, for generateStaticParams and the sitemap. */
export function allIphoneServicePaths(): { model: string; service: string }[] {
  return iphoneModels.flatMap((m) => iphoneServices.map((s) => ({ model: m.slug, service: s.slug })));
}

/** Related links for a page: same model's other services, same service on related models. */
export function relatedIphoneLinks(model: IphoneModel, service: IphoneServiceDef) {
  const otherServices = iphoneServices
    .filter((s) => s.slug !== service.slug)
    .map((s) => ({ href: `/${model.slug}/${s.slug}`, label: `${model.name} ${s.label(model)}` }));
  const relatedModels = [...getSiblingModels(model), ...getAdjacentModels(model)]
    .filter((m, i, arr) => arr.findIndex((x) => x.slug === m.slug) === i)
    .map((m) => ({ href: `/${m.slug}/${service.slug}`, label: `${m.name} ${service.label(m)}` }));
  return { otherServices, relatedModels };
}

/** One-line, model-specific summary per service for the model hub page. */
export function hubSummary(m: IphoneModel, s: IphoneServiceSlug): string {
  switch (s) {
    case "screen-replacement":
      return `${m.display.size} ${m.display.tech}${m.display.promotion ? " with 120 Hz ProMotion" : ""}${m.display.cutout === "dynamic-island" ? " and Dynamic Island" : ""}.`;
    case "battery-replacement":
      return `Apple design target: 80% capacity at ${m.batteryCycleTarget.toLocaleString("en-IN")} cycles.`;
    case "charging-port-service":
      return `${m.connector}${m.usbSpeed ? ` (${m.usbSpeed})` : ""}${m.magsafe ? ", plus MagSafe" : ", Qi wireless only"}.`;
    case "camera-service":
      return `${m.rearCameras.length} rear camera${m.rearCameras.length > 1 ? "s" : ""}, ${m.frontCamera} front${m.lidar ? ", LiDAR" : ""}.`;
    case "speaker-microphone-service":
      return m.speakerSpec ? "Built-in speaker (not listed as stereo) and multiple mics." : "Stereo speakers and multiple microphones.";
    case "back-panel-replacement":
      return m.back === "glass-bonded" ? "Back glass bonded to the housing." : m.back === "glass-removable" ? "Separately replaceable back glass." : "Aluminium unibody with a glass section.";
    case "motherboard-replacement":
      return `${m.chip} logic board — data and Face ID don't transfer.`;
    case "chip-level-service":
      return "Component-level work that keeps your original board and data.";
  }
}

/** Model-specific intro for the /[model] hub page. */
export function hubIntro(m: IphoneModel): string[] {
  const d = m.display;
  const sib = getSiblingModels(m);
  const distinct: string[] = [];
  if (d.tech === "LCD") distinct.push("the only LCD screen in the iPhone 11–18 range");
  if (d.promotion) distinct.push("a 120 Hz ProMotion display");
  if (d.alwaysOn) distinct.push("an Always-On display");
  if (m.back === "glass-removable") distinct.push("separately replaceable back glass");
  if (m.back === "glass-bonded") distinct.push("back glass bonded to the housing");
  if (m.back === "unibody-inset") distinct.push("an aluminium unibody");
  if (!m.magsafe && m.generation >= 12) distinct.push("no MagSafe");
  if (m.batteryRemoval === "electric" || m.batteryRemoval === "electric-tray") distinct.push("electrically released battery adhesive");
  if (m.lidar) distinct.push("a LiDAR Scanner");
  if (m.modem) distinct.push(`Apple's ${m.modem.replace("Apple ", "")} modem`);
  return [
    `The ${m.name} went on sale in ${m.releasedLabel} with the ${m.chip} chip, a ${d.size} ${d.tech} display and a ${m.connector} port. For service, the details that matter most are ${list(distinct.slice(0, 4))}.`,
    `${sib.length ? `It sits alongside the ${list(sib.map((s) => s.name))}, but parts and procedures differ between them. ` : ""}Choose a service below for symptoms, causes, what a fix can and can't do, and FAQs written for the ${m.name}. Every job starts with a check and a quote before any work.`,
  ];
}

export function hubMeta(m: IphoneModel): { title: string; description: string } {
  return {
    title: `${m.name} Service in Hyderabad`,
    description: clampMeta(
      `${m.name} service in Hyderabad: screen, battery, ${m.connector} port, cameras, speakers, back glass and board-level work. Model-specific guides and a quote before any work.`,
    ),
  };
}

// ── universal content → per-service guide pages ──────────────────────────
// Text that appears on nearly every model page for a service (data safety,
// Face ID pairing, port cleaning, swollen batteries …) lives once on that
// service's guide page (/iphone-<service>) instead of being repeated 31 times.

const UNIVERSAL_MIN = 25; // of 31 models
const universalCache = new Map<IphoneServiceSlug, Set<string>>();

const faqKey = (f: { q: string; a: string }) => `Q:${f.q}\nA:${f.a}`;

function universalUnits(s: IphoneServiceSlug): Set<string> {
  const cached = universalCache.get(s);
  if (cached) return cached;
  const counts = new Map<string, number>();
  for (const m of iphoneModels) {
    const b = BUILDERS[s](m);
    const units = new Set<string>([
      ...b.sections.flatMap((x) => [...(x.paragraphs ?? []), ...(x.bullets ?? [])]),
      ...b.faqs.map(faqKey),
    ]);
    for (const u of units) counts.set(u, (counts.get(u) ?? 0) + 1);
  }
  const set = new Set([...counts].filter(([, c]) => c >= UNIVERSAL_MIN).map(([u]) => u));
  universalCache.set(s, set);
  return set;
}

/** Removes universal text from a model page; empty sections are dropped. */
function withoutUniversal(b: Built, s: IphoneServiceSlug): Built {
  const u = universalUnits(s);
  const sections = b.sections
    .map((x) => ({
      ...x,
      paragraphs: x.paragraphs?.filter((t) => !u.has(t)),
      bullets: x.bullets?.filter((t) => !u.has(t)),
    }))
    .filter((x) => (x.paragraphs?.length ?? 0) + (x.bullets?.length ?? 0) > 0);
  return { ...b, sections, faqs: b.faqs.filter((f) => !u.has(faqKey(f))) };
}

export const iphoneGuideSlug = (s: IphoneServiceSlug) => `iphone-${s}`;

export function getIphoneGuideService(slug: string): IphoneServiceDef | undefined {
  return iphoneServices.find((s) => iphoneGuideSlug(s.slug) === slug);
}

const GUIDE_LABEL: Record<IphoneServiceSlug, { noun: string; quick: string }> = {
  "screen-replacement": { noun: "screen", quick: "A cracked or faulty iPhone display is normally fixed by replacing the complete display assembly. Face ID keeps working if its parts weren't damaged in the drop, but iPhone 11 and later models show an \"Unknown Part\" message for non-genuine displays, and Apple says True Tone may not work correctly with them." },
  "battery-replacement": { noun: "battery", quick: "Replace an iPhone battery when Battery Health reports significant degradation, the phone shuts down unexpectedly, or performance is being managed. Apple designs iPhone 14 and earlier batteries to keep 80% capacity at 500 cycles, and iPhone 15 and later at 1,000 cycles." },
  "charging-port-service": { noun: "charging port", quick: "Most iPhone charging faults start with lint in the Lightning or USB-C port or a worn cable, so a cleaning and a test with a known-good cable come first. If wireless charging works but the cable doesn't, the port is the likely cause." },
  "camera-service": { noun: "camera", quick: "iPhone camera faults range from a cracked lens cover, which can often be replaced on its own, to a failed camera module or stabiliser. Testing each camera and zoom level separately shows which part needs replacing." },
  "speaker-microphone-service": { noun: "speaker and microphone", quick: "Muffled calls or quiet sound on an iPhone are often clogged grilles, so cleaning and testing each speaker and microphone comes first. Recording a Voice Memo and front and rear camera videos shows which microphone is affected." },
  "back-panel-replacement": { noun: "back glass", quick: "How an iPhone's back is replaced depends on the model: iPhone 11–13 and 14 Pro models have glass bonded to the housing, the iPhone 14, 14 Plus and later have separately replaceable back glass, and the iPhone 17 Pro and 18 Pro models use an aluminium unibody." },
  "motherboard-replacement": { noun: "motherboard", quick: "An iPhone motherboard replacement swaps the whole logic board: data doesn't transfer, Face ID usually stops working and the IMEI changes to the new board's. Chip-level service on the original board is worth trying first." },
  "chip-level-service": { noun: "logic board", quick: "Chip-level service finds and replaces the failed component on an iPhone's original logic board. If it succeeds, your data, Face ID and IMEI stay as they were — which a motherboard replacement can't offer." },
};

const GUIDE_HEADINGS: Record<string, (label: string, noun: string) => string> = {
  symptoms: (_l, n) => `What are the common signs of an iPhone ${n} problem?`,
  causes: (_l, n) => `What causes iPhone ${n} problems?`,
  "model-specific": () => "What applies to every iPhone model?",
  diagnosis: (l) => `When won't ${l.toLowerCase()} fix an iPhone?`,
  "before-booking": () => "What should I check before booking?",
  after: () => "What should I expect afterwards?",
};

function guideLabel(s: IphoneServiceDef): string {
  return s.slug === "back-panel-replacement" ? "Back Glass Replacement" : s.label(iphoneModels[0]);
}

export function iphoneGuideMeta(s: IphoneServiceDef) {
  const label = guideLabel(s);
  const title = `iPhone ${label} in Hyderabad`;
  const description = clampMeta(`iPhone ${label.toLowerCase()} in Hyderabad for every model from iPhone 11 to iPhone 18 Pro Max: signs, causes, what a fix can't do, a model comparison and FAQs.`);
  return { title, description };
}

/** Data for the /iphone-<service> guide page. */
export function buildIphoneGuide(s: IphoneServiceDef) {
  const u = universalUnits(s.slug);
  const label = guideLabel(s);
  const { noun, quick } = GUIDE_LABEL[s.slug];
  const groups = new Map<string, { paragraphs: string[]; bullets: string[] }>();
  const faqs: { q: string; a: string }[] = [];
  for (const m of iphoneModels) {
    const b = BUILDERS[s.slug](m);
    for (const x of b.sections) {
      const g = groups.get(x.id) ?? { paragraphs: [], bullets: [] };
      for (const t of x.paragraphs ?? []) if (u.has(t) && !g.paragraphs.includes(t)) g.paragraphs.push(t);
      for (const t of x.bullets ?? []) if (u.has(t) && !g.bullets.includes(t)) g.bullets.push(t);
      groups.set(x.id, g);
    }
    for (const f of b.faqs) if (u.has(faqKey(f)) && !faqs.some((y) => y.q === f.q)) faqs.push(f);
  }
  const sections = [...groups]
    .filter(([, g]) => g.paragraphs.length + g.bullets.length > 0)
    .map(([id, g]) => ({
      id,
      heading: (GUIDE_HEADINGS[id] ?? (() => `iPhone ${label.toLowerCase()}`))(label, noun),
      paragraphs: g.paragraphs.length ? g.paragraphs : undefined,
      bullets: g.bullets.length ? g.bullets : undefined,
    }));
  const rows = iphoneModels.map((m) => ({ model: m, detail: compareDetail(m, s.slug) }));
  return {
    path: `/${iphoneGuideSlug(s.slug)}`,
    label,
    quick,
    noun,
    sections,
    faqs,
    rows,
    distinct: new Set(rows.map((r) => r.detail)).size,
    column: COMPARE_COLUMN[s.slug],
  };
}

// ── model-specific FAQs added after universal filtering ───────────────────

function extraFaqs(m: IphoneModel, s: IphoneServiceSlug): { q: string; a: string }[] {
  const months = ageMonths(m);
  switch (s) {
    case "battery-replacement": {
      const years = (m.batteryCycleTarget / 365).toFixed(1);
      return [
        {
          q: `How long does a ${m.name} battery last before it needs replacing?`,
          a: `It depends on how you use it. Apple designs the ${m.name}'s battery to keep 80% capacity at ${m.batteryCycleTarget.toLocaleString("en-IN")} full charge cycles under ideal conditions. If you use roughly one full charge a day, that's about ${years} years — heavy use, heat and fast charging shorten it, light use stretches it.`,
        },
        m.generation >= 15
          ? {
              q: `Should I turn on the 80% charging limit on my ${m.name}?`,
              a: `If the ${m.name} usually has charge to spare at the end of the day, the 80% limit in Battery settings reduces the time the battery spends full, which slows wear. If you regularly need every bit of charge, leave it off and rely on Optimised Battery Charging instead.`,
            }
          : {
              q: `Does Optimised Battery Charging help my ${m.name}'s battery?`,
              a: `Yes. With Optimised Battery Charging on (Settings > Battery > Battery Health), the ${m.name} learns your routine and holds charging at 80% overnight until you need it, which reduces time spent at full charge.`,
            },
      ];
    }
    case "charging-port-service":
      return [
        {
          q: `What charger should I use with my ${m.name}?`,
          a: `Fast charging on the ${m.name} needs a USB-C Power Delivery adapter of 18–20 W or more${m.connector === "Lightning" ? " and a USB-C to Lightning cable" : " and a USB-C cable"}. Older 5 W USB-A adapters still work but charge slowly — slow charging on its own isn't a port fault.`,
        },
        {
          q: `Can I keep charging my ${m.name} while the port is faulty?`,
          a: m.magsafe
            ? `Yes — a MagSafe or Qi wireless charger bypasses the ${m.connector} port entirely, so it's a good stop-gap until the port is serviced.`
            : `Yes — the ${m.name} supports Qi wireless charging, which bypasses the ${m.connector} port, so a Qi pad is a good stop-gap until the port is serviced.`,
        },
      ];
    case "motherboard-replacement":
      return [
        {
          q: `Are replacement logic boards available for the ${m.name}?`,
          a: months < 6
            ? `For a model released in ${m.releasedLabel}, replacement boards are rarely available outside Apple yet. Every ${m.name} is still under Apple's warranty, so contact Apple first for faults you didn't cause.`
            : months < 24
              ? `Sometimes, but supply for a model released in ${m.releasedLabel} is limited and varies. We confirm availability and the board's source before quoting.`
              : `Usually, as used or refurbished boards, because the ${m.name} has been on sale since ${m.releasedLabel}. Condition and source vary, so we tell you exactly what's being quoted.`,
        },
        {
          q: `Will a replacement board have the same storage as my ${m.name}?`,
          a: `Not necessarily. Storage is part of the logic board, so the replacement brings its own capacity. Make sure the quote states the storage size you're getting.`,
        },
        hasHistory(m, "Logic Board")
          ? {
              q: `Will Settings show that the ${m.name}'s board was replaced?`,
              a: `Yes. On iPhone 12 and later, including the ${m.name}, ${HISTORY_PATH} lists the logic board, and Apple marks a replaced board that can't be verified as "Unverified".`,
            }
          : {
              q: `Will Settings show that the ${m.name}'s board was replaced?`,
              a: `Apple's Parts and Service History on the ${m.name} tracks only the battery and display, so a board replacement isn't listed there — but data and Face ID still don't carry over.`,
            },
      ];
    case "chip-level-service":
      return [
        m.modem
          ? {
              q: `My ${m.name} shows "No Service". Can chip-level work fix it?`,
              a: `Sometimes. The ${m.name} uses Apple's own ${m.modem.replace("Apple ", "")} modem. After ruling out the SIM, carrier settings and a software restore, a no-service fault can come from the radio circuitry around that modem, which needs board-level diagnosis. Some faults in the modem chip itself can't be repaired.`,
            }
          : {
              q: `My ${m.name} shows "No Service". Can chip-level work fix it?`,
              a: `Sometimes. After ruling out the SIM, carrier settings and a software restore, a no-service fault on the ${m.name} can come from the radio circuitry on the logic board, which needs board-level diagnosis. Some faults in the modem chip itself can't be repaired.`,
            },
      ];
    default:
      return [];
  }
}
