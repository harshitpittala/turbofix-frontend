/**
 * samsungMotherboardPages.ts — builds /samsung-galaxy-<model>/motherboard-service
 * pages from the verified facts in data/samsungModels.ts.
 *
 * Content varies with the facts that matter for board work: chipset vendor
 * and the other models sharing that chip, series and launch year, display
 * type (LCD backlight circuits), foldable construction, 4G/5G, S Pen,
 * ultrasonic fingerprint, verified twins and model notes.
 *
 * Wording rules: no "repair" in titles, meta or URLs (owner's Google Ads
 * decision; body copy may use it). No prices, turnaround times or capability
 * claims beyond the site-wide policies — TODO(owner) where needed.
 */
import { samsungModels, getSamsungModel, SAMSUNG_FACTS_CHECKED, type SamsungModel } from "./samsungModels";
import type { DeviceServicePageData } from "@/components/seo/DeviceServicePage";
import { samsungImage } from "@/lib/modelImages";

export const SAMSUNG_PAGES_PUBLISHED = "2026-10-08";
export const SAMSUNG_PAGES_UPDATED = "2026-10-08";

const SRC = {
  list: { label: "Wikipedia: List of Samsung Galaxy smartphones (release history)", href: "https://en.wikipedia.org/wiki/List_of_Samsung_Galaxy_smartphones" },
  A: { label: "Wikipedia: Samsung Galaxy A series", href: "https://en.wikipedia.org/wiki/Samsung_Galaxy_A_series" },
  M: { label: "Wikipedia: Samsung Galaxy M series", href: "https://en.wikipedia.org/wiki/Samsung_Galaxy_M_series" },
  F: { label: "Wikipedia: Samsung Galaxy F series", href: "https://en.wikipedia.org/wiki/Samsung_Galaxy_F_series" },
};

/** Model-specific launch coverage used to confirm the Indian chipset. */
const MODEL_SOURCES: Record<string, { label: string; href: string }> = {
  "samsung-galaxy-s26": { label: "Beebom: Galaxy S26 and S26+ launched in India", href: "https://gadgets.beebom.com/news/samsung-galaxy-s26-and-galaxy-s26-plus-launched-in-india-key-specs-price-availability" },
  "samsung-galaxy-s26-plus": { label: "Beebom: Galaxy S26 and S26+ launched in India", href: "https://gadgets.beebom.com/news/samsung-galaxy-s26-and-galaxy-s26-plus-launched-in-india-key-specs-price-availability" },
  "samsung-galaxy-s26-ultra": { label: "The Mobile Indian: Galaxy S26 series chipsets", href: "https://themobileindian.com/news/samsung-galaxy-s26-series-launched-with-snapdragon-8-elite-gen-5-exynos-2600-chipsets" },
  "samsung-galaxy-z-fold8": { label: "Smartprix: Z Fold8, Z Flip8 and Z Fold8 Ultra launched in India", href: "https://www.smartprix.com/bytes/samsung-galaxy-z-fold8-z-flip8-and-z-fold8-ultra-launched-in-india-check-pricing-and-specifications/" },
  "samsung-galaxy-z-flip8": { label: "Smartprix: Z Fold8, Z Flip8 and Z Fold8 Ultra launched in India", href: "https://www.smartprix.com/bytes/samsung-galaxy-z-fold8-z-flip8-and-z-fold8-ultra-launched-in-india-check-pricing-and-specifications/" },
  "samsung-galaxy-z-fold8-ultra": { label: "91mobiles: Galaxy Z Fold8 Ultra specifications", href: "https://www.91mobiles.com/samsung-galaxy-z-fold-8-ultra-price-in-india" },
  "samsung-galaxy-a57-5g": { label: "Beebom: Galaxy A57 5G launched in India", href: "https://gadgets.beebom.com/news/samsung-galaxy-a57-5g-launched-in-india-key-specifications-price-availability" },
  "samsung-galaxy-a37-5g": { label: "91mobiles: Galaxy A57 and A37 launched in India", href: "https://www.91mobiles.com/hub/samsung-galaxy-a57-a37-launched-india-price-specifications/" },
  "samsung-galaxy-a17-5g": { label: "Digit: Galaxy A17 5G with Exynos 1330 launched in India", href: "https://www.digit.in/news/mobile-phones/samsung-galaxy-a17-5g-with-exynos-1330-chipset-launched-in-india-check-price-and-specs.html" },
  "samsung-galaxy-a07": { label: "Beebom: Galaxy A07 and F07 launched in India", href: "https://gadgets.beebom.com/news/samsung-galaxy-a07-and-f07-launched-in-india" },
  "samsung-galaxy-f07": { label: "Beebom: Galaxy A07 and F07 launched in India", href: "https://gadgets.beebom.com/news/samsung-galaxy-a07-and-f07-launched-in-india" },
  "samsung-galaxy-m07": { label: "Beebom: Galaxy M07 launched in India", href: "https://gadgets.beebom.com/news/samsung-galaxy-m07-launched-india" },
  "samsung-galaxy-m47-5g": { label: "Smartprix: Galaxy M47 launched in India", href: "https://www.smartprix.com/bytes/samsung-galaxy-m47-launched-in-india-with-snapdragon-6-gen-3-6000-mah-battery/" },
  "samsung-galaxy-s25-fe": { label: "Beebom: Galaxy S25 FE launched in India with Exynos 2400", href: "https://gadgets.beebom.com/news/samsung-galaxy-s25-fe-launched-india-key-specs-price-availability" },
  "samsung-galaxy-a16-5g": { label: "GSMArena: Galaxy A16 5G uses Dimensity 6300 in India", href: "https://www.gsmarena.com/the_galaxy_a16_5g_will_use_the_dimensity_6300_in_india_and_thailand-news-64674.php" },
  "samsung-galaxy-a26-5g": { label: "Digit: Galaxy A26 5G launched in India with Exynos 1380", href: "https://www.digit.in/news/mobile-phones/samsung-galaxy-a26-5g-launched-in-india-with-exynos-1380-chipset-check-price-specifications.html" },
  "samsung-galaxy-s21-fe": { label: "GSMArena: Galaxy S21 FE 5G launches in India with Exynos 2100", href: "https://m.gsmarena.com/samsung_galaxy_s21_fe_5g_launches_in_india_with_exynos_2100_-news-52603.php" },
  "samsung-galaxy-s20-fe-5g": { label: "TechRadar: Galaxy S20 FE 5G with Snapdragon 865 launched in India", href: "https://www.techradar.com/news/samsung-galaxy-s20-fe-5g-with-snapdragon-865-launched-in-india" },
};

function sourcesFor(m: SamsungModel) {
  const out = [SRC.list];
  if (m.series === "A" || m.series === "M" || m.series === "F") out.push(SRC[m.series]);
  if (MODEL_SOURCES[m.slug]) out.push(MODEL_SOURCES[m.slug]);
  return out;
}

export const SAMSUNG_MB_SERVICE = "motherboard-service";
const CURRENT_YEAR = 2026;

type Vendor = "Exynos" | "Snapdragon" | "MediaTek" | "Unisoc" | "unknown";

function vendor(m: SamsungModel): Vendor {
  const c = m.chipset ?? "";
  if (c.startsWith("Exynos")) return "Exynos";
  if (c.startsWith("Snapdragon")) return "Snapdragon";
  if (/^(Helio|Dimensity|MediaTek)/.test(c)) return "MediaTek";
  if (c.startsWith("Unisoc")) return "Unisoc";
  return "unknown";
}

const VENDOR_NOTE: Record<Vendor, string> = {
  Exynos: "Exynos is Samsung's own chip family. Exynos phones pair the processor with Samsung-designed power-management chips, so power faults are traced through that platform's power rails.",
  Snapdragon: "Snapdragon is Qualcomm's platform. Snapdragon phones use Qualcomm's matching power-management and radio chips, so power and network faults are diagnosed along that platform's circuits.",
  MediaTek: "MediaTek chips (Helio and Dimensity) come with MediaTek's own power-management and radio chips, so board diagnosis follows MediaTek's platform design rather than Samsung's or Qualcomm's.",
  Unisoc: "Unisoc chips power some of Samsung's most affordable phones. Board-level parts for Unisoc platforms are less common than for Exynos, Snapdragon or MediaTek, which can affect what's practical.",
  unknown: "",
};

const SERIES_LABEL: Record<SamsungModel["series"], string> = {
  S: "Galaxy S", Note: "Galaxy Note", "Z Fold": "Galaxy Z Fold", "Z Flip": "Galaxy Z Flip", A: "Galaxy A", M: "Galaxy M", F: "Galaxy F",
};

function segment(m: SamsungModel): "flagship" | "foldable" | "budget" {
  if (m.series === "Z Fold" || m.series === "Z Flip") return "foldable";
  if (m.series === "S" || m.series === "Note") return "flagship";
  return "budget";
}

/** Handwritten, verified context per segment and launch year. */
const YEAR_CONTEXT: Record<"flagship" | "foldable" | "budget", Record<number, string>> = {
  flagship: {
    2020: "Samsung's 2020 Galaxy S and Note phones sold in India — the S20 series, the Note20 series and the 4G S20 FE — all used Samsung's Exynos 990, while the S10 Lite (Snapdragon 855) and Note10 Lite (Exynos 9810) were lower-priced spin-offs built on older chips.",
    2021: "The Galaxy S21 series used the Exynos 2100 in India and was the first Galaxy S line sold without a charger in the box. The S20 FE 5G reached India the same year with a Snapdragon 865.",
    2022: "In 2022 Samsung moved the Indian Galaxy S22 series to Snapdragon (8 Gen 1) after two Exynos generations, while the S21 FE 5G launched in India with the Exynos 2100.",
    2023: "Every Galaxy S23 model uses the Snapdragon 8 Gen 2 for Galaxy, a version tuned for Samsung. The S23 FE, launched later in 2023, went back to Exynos with the Exynos 2200.",
    2024: "In India the Galaxy S24 and S24+ use the Exynos 2400 and the S24 Ultra the Snapdragon 8 Gen 3 for Galaxy; the S24 FE uses a variant, the Exynos 2400e.",
    2025: "The Galaxy S25, S25+, S25 Ultra and the thinner S25 Edge all use the Snapdragon 8 Elite for Galaxy, while the S25 FE uses the Exynos 2400.",
    2026: "In India the Galaxy S26 and S26+ use Samsung's Exynos 2600, which Samsung describes as a 2nm chip, and the S26 Ultra uses the Snapdragon 8 Elite Gen 5 for Galaxy.",
  },
  foldable: {
    2020: "Samsung's 2020 foldables were the Snapdragon 855+ Galaxy Z Flip and the Snapdragon 865+ Galaxy Z Fold2.",
    2021: "The Z Fold3 and Z Flip3 both use the Snapdragon 888, and were Samsung's first foldables with an IPX8 water-resistance rating; the Fold3 also added S Pen support.",
    2022: "The Z Fold4 and Z Flip4 moved to the Snapdragon 8+ Gen 1.",
    2023: "The Z Fold5 and Z Flip5 use the Snapdragon 8 Gen 2 for Galaxy and introduced Samsung's Flex Hinge, which lets the phones close without a gap.",
    2024: "The Z Fold6 and Z Flip6 use the Snapdragon 8 Gen 3 for Galaxy.",
    2025: "In 2025 Samsung split chip suppliers across its foldables: the Z Fold7 uses the Snapdragon 8 Elite for Galaxy, the Z Flip7 the Exynos 2500 and the Flip7 FE the Exynos 2400.",
    2026: "Samsung's 2026 line-up added a third foldable, the Z Fold8 Ultra, alongside the Z Fold8 (both Snapdragon 8 Elite Gen 5 for Galaxy) and the Exynos-based Z Flip8. All three launched in India in July 2026.",
  },
  budget: {
    2020: "Samsung's 2020 budget phones in India ranged from entry models on MediaTek and Snapdragon 400-series chips to mid-rangers built on the Exynos 9611, and were all 4G-only.",
    2021: "2021 brought Samsung's first 5G budget phones in India, such as the Galaxy M42 5G, A22 5G and F42 5G, alongside many 4G models built on the MediaTek Helio G80 and Exynos 850.",
    2022: "Samsung's Exynos 1280 debuted in 2022 in the Galaxy A53 5G and A33 5G, and was later reused in M- and F-series phones.",
    2023: "2023 brought the Exynos 1330 (first in the Galaxy A14 5G) and the Exynos 1380 (first in the Galaxy A54 5G) to Samsung's mid-range.",
    2024: "The Exynos 1480 debuted in the Galaxy A55 5G in 2024, and Samsung began promising six years of Android updates on some budget models, starting with the Galaxy A16 5G.",
    2025: "In 2025 the Galaxy A56 5G introduced the Exynos 1580 and the A36 5G moved to Qualcomm's Snapdragon 6 Gen 3, while MediaTek's Dimensity 6300 and Helio G99 powered many entry-level models.",
    2026: "The Galaxy A57 5G introduced the Exynos 1680 in March 2026, and the A37 5G reused the Exynos 1480 from the Galaxy A55 and M56.",
  },
};

function ageNote(m: SamsungModel): string {
  const age = CURRENT_YEAR - m.year;
  if (age <= 0) return `The ${m.name} launched in India in ${m.year}, so your phone is very likely still inside Samsung's standard one-year warranty. For a fault you didn't cause, contact Samsung first — an independent repair can affect what Samsung will cover.`;
  if (age === 1) return `The ${m.name} launched in India in ${m.year}. If yours was bought within the last year, it may still be under Samsung's warranty; check your purchase date before booking an independent service.`;
  if (age <= 3) return `The ${m.name} launched in India in ${m.year}, so most units are now outside Samsung's standard warranty unless extended cover was bought.`;
  return `The ${m.name} launched in India in ${m.year}. At this age, weigh the cost of board work against the phone's value and how much the data on it matters to you — we'll help you compare honestly.`;
}

function sameChip(m: SamsungModel): SamsungModel[] {
  if (!m.chipset) return [];
  return samsungModels.filter((o) => o.slug !== m.slug && o.chipset === m.chipset);
}

function sameSeriesYear(m: SamsungModel): SamsungModel[] {
  return samsungModels.filter((o) => o.slug !== m.slug && o.year === m.year &&
    (segment(o) === segment(m)) && (segment(m) !== "budget" || o.series === m.series));
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function clampMeta(s: string): string {
  if (s.length <= 155) return s;
  const cut = s.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}

const chipText = (m: SamsungModel) => m.chipset ?? "chipset confirmed from your model number";

export function samsungMotherboardMeta(m: SamsungModel) {
  const title = `Samsung ${m.name} Motherboard Service`;
  const faults = `no power, ${m.network === "5G" ? "no 5G/network" : "no network"}, charging${m.display === "LCD" ? " and backlight" : ""} faults`;
  const candidates = m.chipset
    ? [
        `Samsung ${m.name} motherboard service in Hyderabad: ${m.chipset} board diagnosis for ${faults}. Data and IMEI facts, quote first.`,
        `${m.name} motherboard service in Hyderabad: ${m.chipset} board diagnosis for ${faults}. Quote before any work.`,
        `${m.name} motherboard service, Hyderabad: ${m.chipset} board diagnosis for no power, network and charging faults.`,
      ]
    : [
        `Samsung ${m.name} motherboard service in Hyderabad: board diagnosis for no power, no network and charging faults. Quote before any work.`,
        `${m.name} motherboard service in Hyderabad: board diagnosis for no power, no network and charging faults. Quote first.`,
      ];
  const desc = clampMeta(candidates.find((c) => c.length <= 155) ?? candidates[candidates.length - 1]);
  return { title, description: desc, keywords: [
    `samsung ${m.name.toLowerCase()} motherboard`,
    `${m.name.toLowerCase()} motherboard replacement`,
    `${m.name.toLowerCase()} dead phone`,
    `${m.name.toLowerCase()} not turning on`,
    `${m.name.toLowerCase()} motherboard hyderabad`,
  ] };
}

export function buildSamsungMotherboardPage(slug: string): DeviceServicePageData | undefined {
  const m = getSamsungModel(slug);
  if (!m) return undefined;
  const seg = segment(m);
  const v = vendor(m);
  const chipTwins = sameChip(m);
  const twins = (m.twins ?? []).map(getSamsungModel).filter(Boolean) as SamsungModel[];
  const path = `/${m.slug}/${SAMSUNG_MB_SERVICE}`;
  const foldable = seg === "foldable";
  const lcd = m.display === "LCD";
  const is5g = m.network === "5G";

  // ── what's specific ──
  const specifics: string[] = [
    m.chipset
      ? `Chipset: ${m.chipset} (the version sold in India). ${VENDOR_NOTE[v]}`
      : `Chipset: ${m.chipsetNote ?? "not confirmed"}. We read your exact model number (Settings > About phone) before quoting, rather than guess which board you have.`,
    `Display: ${lcd ? "LCD — the backlight is driven by circuitry on the motherboard, so a dark screen on a phone that still rings can be a board fault rather than a broken display" : "AMOLED — each pixel lights itself, so there's no backlight circuit; a black screen on a working phone usually points to the display or its connector first"}.`,
    m.network ? `Network: ${m.network}${is5g ? ". 5G adds more radio hardware to the board, so 'no 5G' and 'no service' faults are checked separately" : " only — this model can't connect to 5G, which is by design, not a fault"}.` : "",
    foldable ? `Foldable construction: the ${m.name} splits its electronics across two halves joined by flex cables that run through the hinge, and uses two batteries. A fault that appears only when folded or unfolded often traces to those hinge flex cables rather than the main board.` : "",
    m.ultrasonicFp ? `Fingerprint: an ultrasonic sensor sits under the display and connects to the board. After board work, fingerprints have to be enrolled again.` : "",
    m.sPen ? `S Pen: the ${m.name} supports the S Pen, so we check pen detection and input after any board work.` : "",
    twins.length ? `Twins: the ${m.name} is sold in India alongside the ${list(twins.map((t) => t.name))}, which share the same hardware under a different name.` : "",
    ...(m.notes ?? []),
  ].filter(Boolean);

  const sectionsArr: DeviceServicePageData["sections"] = [
    {
      id: "symptoms",
      heading: `How do I know my ${m.name} has a motherboard fault?`,
      bullets: [
        "No power and no vibration, even on a known-good charger",
        "Stuck on the Samsung logo or restarting in a loop after a software reinstall",
        is5g ? "\"No service\", or 5G that disappears while 4G works, with a good SIM" : "\"No service\" or \"Emergency calls only\" with a working SIM",
        "Wi-Fi or Bluetooth won't switch on",
        "Gets hot and drains even when idle",
        "Not charging after the port, cable and battery have been ruled out",
        lcd ? "Screen dark but the phone rings, vibrates or shows up on a computer" : "Display stays black after a known-good display is tried",
        foldable ? "One screen or one half stops working, especially at certain fold angles" : "Faults that started after a drop or liquid exposure",
      ],
    },
    { id: "model-specific", heading: `What makes the ${m.name}'s board different?`, bullets: specifics },
    {
      id: "context",
      heading: `Where does the ${m.name} fit in Samsung's ${m.year} ${SERIES_LABEL[m.series]} line-up?`,
      paragraphs: [
        YEAR_CONTEXT[seg][m.year] ?? "",
        chipTwins.length
          ? `The ${m.chipset} is also used in the ${list(chipTwins.slice(0, 8).map((o) => o.name))}${chipTwins.length > 8 ? " and other Galaxy phones" : ""}. Sharing a chip doesn't make boards interchangeable — layout, memory and radios differ — but the same chipset means the same platform-level diagnosis applies.`
          : m.chipset ? `Among the Galaxy phones on our list, the ${m.chipset} is used only in the ${m.name}, so its board-level parts are specific to this model.` : "",
      ].filter(Boolean),
    },
    {
      id: "repair-or-replace",
      heading: "Board-level repair or a replacement motherboard?",
      paragraphs: [
        `Fixing the failed component on your ${m.name}'s ${m.chipset ? `${m.chipset} ` : ""}board keeps your data and IMEI. A replacement ${m.name} board starts with empty storage, reports a new IMEI and must be free of the previous owner's locks.${m.year >= CURRENT_YEAR - 1 ? ` For a model as recent as the ${m.name}, replacement boards may also be hard to source, which makes component-level repair the more practical route.` : m.year <= CURRENT_YEAR - 5 ? ` On a ${m.year} phone, replacement boards are usually second-hand or refurbished, so component-level repair of your own board is often the better option.` : ""} Our Samsung motherboard service guide explains data, Factory Reset Protection, Knox and IMEI in detail.`,
      ],
    },
    {
      id: "diagnosis",
      heading: `What do we rule out before blaming the ${m.name}'s board?`,
      bullets: [
        "Battery: a failed battery can look exactly like a dead board, so we test with a known-good supply.",
        `Charging port and cable: a damaged USB-C port or sub-board stops charging without any board fault.`,
        lcd ? "Display and backlight: we check whether the LCD is lit before blaming the board." : "Display: a damaged AMOLED or its connector can leave a working phone with a black screen.",
        "Software: a phone stuck on the logo may only need a software reinstall — though that erases data, so we discuss it with you first.",
        foldable ? "Hinge flex cables: problems that change with the fold angle are checked before the main board." : "Liquid damage: we inspect for corrosion around connectors and chips.",
      ],
    },
    {
      id: "before-booking",
      heading: `What should I check on my ${m.name} before booking?`,
      bullets: [
        "Note the model number from Settings > About phone (it starts with SM-) if the phone still turns on — it tells us exactly which board variant you have.",
        "Know your Google and Samsung account passwords — Factory Reset Protection will ask for them after board work.",
        foldable ? `If the fault changes when you fold or unfold the ${m.name}, note the angle — it helps us check the hinge flex cables.` : lcd ? `If the screen is dark, check with a torch whether a faint image is visible and tell us — it separates an LCD backlight fault from a dead board.` : `If the ${m.name} still works intermittently, back it up now with Smart Switch, Samsung Cloud or Google One.`,
        ageNote(m),
      ],
    },
    {
      id: "after",
      heading: `What do we test on your ${m.name} afterwards?`,
      bullets: [
        "Power-on, charging and battery drain at idle",
        is5g ? "Calls, 4G and 5G mobile data" : "Calls and 4G mobile data",
        "Wi-Fi, Bluetooth and GPS",
        m.ultrasonicFp ? "Ultrasonic fingerprint enrolment and unlock" : "Fingerprint and face unlock",
        "Front and rear cameras, speakers and microphones",
        foldable ? "Both displays, and behaviour across the full fold range" : lcd ? "Even LCD backlight" : "AMOLED display and touch",
        m.sPen ? "S Pen detection and input" : "",
        "IMEI shown in Settings matches the board, and Samsung Wallet/Knox features where supported",
      ].filter(Boolean),
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      q: `Will I lose my data if the ${m.name} motherboard is replaced?`,
      a: "With a replacement board, yes — storage is part of the board and encrypted to it, so your data can only be restored from a backup (Smart Switch, Samsung Cloud or Google). If you need data from a dead phone with no backup, ask about board-level repair: reviving the original board is the only way to reach it.",
    },
    {
      q: `Can a dead ${m.name} be fixed without replacing the motherboard?`,
      a: `Often, yes. Many no-power faults on the ${m.name} come down to one component${m.chipset ? ` in the ${m.chipset} platform's power or charging circuitry` : ""}, a connector or liquid corrosion. We diagnose first and only suggest a replacement board when component-level repair isn't realistic.`,
    },
    {
      q: `Will my ${m.name}'s IMEI change?`,
      a: `Only if the ${m.name} gets a replacement board — the IMEI belongs to the board. Component-level repair on your own board keeps your IMEI. Altering an IMEI is an offence in India and never part of a legitimate repair.`,
    },
    lcd
      ? { q: `My ${m.name} screen is dark but the phone rings. Is it the motherboard?`, a: `It can be. The ${m.name} has an LCD whose backlight is powered from the board. Shine a torch at the screen: if you can faintly see the image, the LCD works and the backlight circuit (a board-level fault) or the display's own backlight is the likely cause. We test with a known-good display to tell which.` }
      : { q: `My ${m.name} screen is black but the phone rings. Is it the motherboard?`, a: `Usually not first. The ${m.name} has an AMOLED display with no separate backlight, so a black screen on a phone that rings is more often the display or its connector. We test with a known-good display before looking at the board.` },
    is5g
      ? { q: `My ${m.name} shows 4G but never 5G. Is that a board fault?`, a: "Check first that 5G is selected under Settings > Connections > Mobile networks, that your SIM plan includes 5G, and that you're in a 5G area. If 5G still never appears where other phones get it, the 5G radio path on the board needs testing." }
      : { q: `Can the ${m.name} be upgraded to 5G with a new board?`, a: `No. The ${m.name} is a 4G phone; 5G needs different radio hardware that this model doesn't have. A board replacement uses the same 4G design.` },
    foldable
      ? { q: `Only one screen on my ${m.name} works. Does it need a new motherboard?`, a: `Not necessarily. On the ${m.name}, signals to the displays pass through flex cables in the hinge, and those cables wear with folding. We test the displays and hinge flex before suspecting the main board.` }
      : { q: `My ${m.name} stopped working after water damage. Can the board be saved?`, a: "Often, if it's looked at quickly. Liquid causes corrosion and shorts on specific parts of the board, and cleaning and replacing those parts can bring a phone back. Don't charge it or keep trying to switch it on." },
    {
      q: `How much does ${m.name} motherboard service cost?`,
      a: "It depends on whether a component-level repair works or a replacement board is needed, and on board availability for your exact variant. You get a quote after diagnosis and before any work, and you pay after the service.",
    },
    {
      q: `Is ${m.name} board work done at my doorstep?`,
      // TODO(owner): confirm where board-level work is carried out.
      a: "Board-level work needs a microscope and a soldering bench, so it may not be possible at your doorstep. We'll tell you when you book; pickup and delivery are available, or you can bring the phone to our Nampally studio.",
    },
  ];

  const compareRows = [m, ...twins, ...sameSeriesYear(m).filter((o) => !twins.includes(o))].slice(0, 9).map((o) => ({
    name: o.name, href: `/${o.slug}/${SAMSUNG_MB_SERVICE}`, current: o.slug === m.slug,
    detail: `${o.chipset ?? "chipset varies"} · ${o.display} · ${o.network ?? "network varies"}`,
  }));
  const sameAsMe = compareRows.filter((r) => !r.current && m.chipset && r.detail.startsWith(m.chipset));

  const quickAnswer = `A ${m.name} with a board fault — no power, no network, no charging despite a good port and battery${foldable ? ", or a display that fails through the hinge" : ""} — can often be fixed at component level on its ${m.chipset ? `${m.chipset} ` : ""}board, keeping your data and IMEI. A replacement motherboard is the fallback; it starts with empty storage and a different IMEI.`;

  const related = [...chipTwins, ...sameSeriesYear(m)]
    .filter((o, i, arr) => arr.findIndex((x) => x.slug === o.slug) === i).slice(0, 12)
    .map((o) => ({ href: `/${o.slug}/${SAMSUNG_MB_SERVICE}`, label: `${o.name} motherboard service` }));

  return {
    path,
    h1: `Samsung ${m.name} Motherboard Service`,
    subject: `${m.name} motherboard service`,
    quickAnswer,
    intro: [
      `The ${m.name} is a ${m.year} ${SERIES_LABEL[m.series]} phone${m.chipset ? ` built on the ${m.chipset}` : ""}${m.network ? ` (${m.network})` : ""} with ${m.display === "LCD" ? "an LCD" : "an AMOLED"} display. Its motherboard holds the processor, memory, storage and radios, so a board fault can look like almost anything — a dead phone, no signal, no charging or constant restarts.`,
      `This page explains how board faults show up on the ${m.name}, what we rule out first, when board-level repair is possible, and what changes if the motherboard has to be replaced. We serve customers across Hyderabad at their doorstep, by pickup, or at our Nampally studio.`,
    ],
    notice: m.year >= CURRENT_YEAR
      ? `The ${m.name} launched in ${m.year}. Boards and board-level parts for very new models can be hard to source outside Samsung's own network, and your phone is likely still under Samsung's warranty — please contact us to confirm availability, and consider Samsung's service first for faults you didn't cause.`
      : undefined,
    facts: [
      { label: "Chipset (India)", value: m.chipset ?? (m.chipsetNote ?? "Confirmed from your model number") },
      { label: "Launched in India", value: String(m.year) },
      { label: "Series", value: SERIES_LABEL[m.series] },
      { label: "Display", value: m.display },
      ...(m.network ? [{ label: "Network", value: m.network }] : []),
      // TODO(owner): add per-model prices and turnaround times once confirmed.
      { label: "Price", value: `Quoted for your ${m.name} after diagnosis, before any work starts` },
      { label: "Warranty", value: "3, 6 or 12 months depending on the part grade — confirmed with your quote" },
      { label: "Where", value: "Doorstep visit, pickup and delivery, or walk-in at our Nampally studio" },
    ],
    sections: sectionsArr,
    comparison: {
      heading: `How does the ${m.name}'s board compare with related Galaxy phones?`,
      column: "Chipset · display · network",
      rows: compareRows,
      summary: sameAsMe.length
        ? `The ${list(sameAsMe.map((r) => r.name))} share${sameAsMe.length === 1 ? "s" : ""} the ${m.name}'s chipset${twins.length ? " (and, for its twins, the same hardware)" : ""}. Even so, we quote and source boards for your exact model number.`
        : `The ${m.name}'s board differs from these related models, so its board work is quoted specifically for the ${m.name}.`,
    },
    process: [
      { title: "Diagnose", desc: `Battery, port, display${foldable ? ", hinge flex" : ""} and board are tested to find exactly what has failed on the ${m.name}.` },
      { title: "Explain options", desc: "Component-level repair or replacement board — with the effect on data, IMEI and FRP — and a quote, before any work." },
      { title: "Repair or replace", desc: `Faulty components are replaced on your ${m.chipset ?? "original"} board, or a lock-free replacement board is fitted.` },
      { title: "Test and document", desc: "Every function is tested and any IMEI change is recorded on your invoice." },
    ],
    faqs,
    relatedGroups: [
      { heading: "Motherboard service for related Galaxy phones", links: related },
    ],
    seeAlso: [
      { href: "/samsung-motherboard-service", label: "Samsung motherboard service guide" },
      { href: "/samsung-service-hyderabad", label: "Samsung service in Hyderabad" },
      { href: "/motherboard-service-hyderabad", label: "Motherboard service (all brands)" },
      { href: "/water-damage-hyderabad", label: "Water damage service" },
      { href: "/no-fix-no-fee-policy", label: "No fix, no fee policy" },
      { href: "/terms", label: "Warranty terms" },
    ],
    sources: sourcesFor(m),
    checked: SAMSUNG_FACTS_CHECKED,
    breadcrumbs: [
      { name: "Samsung", href: "/samsung-service-hyderabad" },
      { name: "Motherboard Service", href: "/samsung-motherboard-service" },
      { name: m.name, href: path },
    ],
    bookLabel: `Book ${m.name} motherboard service`,
    disclaimer: "TurboFix is an independent service provider, not a Samsung service centre, and not affiliated with or endorsed by Samsung. Samsung and Galaxy are trademarks of Samsung Electronics.",
    serviceType: "Mobile phone motherboard service",
    device: { name: `Samsung ${m.name}`, brand: "Samsung" },
    image: (() => { const src = samsungImage(m.slug); return src ? { src, alt: `Samsung ${m.name}` } : undefined; })(),
    datePublished: SAMSUNG_PAGES_PUBLISHED,
    dateModified: SAMSUNG_PAGES_UPDATED,
  };
}

export function allSamsungMotherboardPaths(): { model: string; service: string }[] {
  return samsungModels.map((m) => ({ model: m.slug, service: SAMSUNG_MB_SERVICE }));
}
