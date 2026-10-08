/**
 * samsungModels.ts — Samsung Galaxy phones sold in India from 2020 onwards
 * (S, Note, Z, A, M and F series), used for the
 * /samsung-galaxy-<model>/motherboard-service pages.
 *
 * Facts checked 8 Oct 2026 against Wikipedia's Samsung release history and
 * series pages, Samsung India product pages and Indian launch coverage
 * (91mobiles, Beebom, Digit, GSMArena). Chipsets are the INDIAN variant.
 * Where sources disagree or we couldn't confirm the Indian chipset, `chipset`
 * is left undefined and the page asks the customer for the model number
 * instead of guessing.
 *
 * Deliberately left out:
 *  - Models not sold in India (A11, A21, A41, A51 5G, A71 5G, A42 5G, A32 5G,
 *    A52 5G, A13 5G, A24, M22, M23, M54, M62, F52 5G, Z Flip 5G,
 *    Z Fold Special Edition).
 *  - Galaxy Z TriFold: Indian availability not confirmed.
 *  - Galaxy A27: no confirmed launch found.
 */

export type SamsungSeries = "S" | "Note" | "Z Fold" | "Z Flip" | "A" | "M" | "F";

export interface SamsungModel {
  slug: string;            // samsung-galaxy-s24-ultra
  name: string;            // Galaxy S24 Ultra
  series: SamsungSeries;
  year: number;            // India launch year
  launched: string;        // "Jan 2024"
  /** Indian-variant chipset; undefined when not verified. */
  chipset?: string;
  /** Short reason shown when chipset is undefined. */
  chipsetNote?: string;
  network?: "4G" | "5G";
  display: "LCD" | "AMOLED";
  /** Ultrasonic in-display fingerprint (S/Note flagships). */
  ultrasonicFp?: boolean;
  sPen?: boolean;
  /** Verified twin/rebadge sold under another name. */
  twins?: string[];        // slugs
  notes?: string[];
}

const s = (
  slug: string, name: string, series: SamsungSeries, year: number, launched: string,
  chipset: string | undefined, display: "LCD" | "AMOLED", network?: "4G" | "5G",
  extra: Partial<SamsungModel> = {},
): SamsungModel => ({ slug, name, series, year, launched, chipset, display, network, ...extra });

const UNCONFIRMED = "Indian-variant chipset not confirmed";

export const samsungModels: SamsungModel[] = [
  // ── Galaxy S / Note ────────────────────────────────────────────────────
  s("samsung-galaxy-s10-lite", "Galaxy S10 Lite", "S", 2020, "Jan 2020", "Snapdragon 855", "AMOLED", "4G"),
  s("samsung-galaxy-note10-lite", "Galaxy Note10 Lite", "Note", 2020, "Jan 2020", "Exynos 9810", "AMOLED", "4G", { sPen: true }),
  s("samsung-galaxy-s20", "Galaxy S20", "S", 2020, "Mar 2020", "Exynos 990", "AMOLED", undefined, { ultrasonicFp: true }),
  s("samsung-galaxy-s20-plus", "Galaxy S20+", "S", 2020, "Mar 2020", "Exynos 990", "AMOLED", undefined, { ultrasonicFp: true }),
  s("samsung-galaxy-s20-ultra", "Galaxy S20 Ultra", "S", 2020, "Mar 2020", "Exynos 990", "AMOLED", undefined, { ultrasonicFp: true }),
  s("samsung-galaxy-note20", "Galaxy Note20", "Note", 2020, "Aug 2020", "Exynos 990", "AMOLED", "4G", { ultrasonicFp: true, sPen: true }),
  s("samsung-galaxy-note20-ultra", "Galaxy Note20 Ultra 5G", "Note", 2020, "Aug 2020", "Exynos 990", "AMOLED", "5G", { ultrasonicFp: true, sPen: true }),
  s("samsung-galaxy-s20-fe", "Galaxy S20 FE", "S", 2020, "Oct 2020", "Exynos 990", "AMOLED", "4G", {
    notes: ["The 4G Galaxy S20 FE sold in India uses the Exynos 990, while the Galaxy S20 FE 5G that followed in 2021 uses a Snapdragon 865 — the two boards are completely different."],
  }),
  s("samsung-galaxy-s20-fe-5g", "Galaxy S20 FE 5G", "S", 2021, "Mar 2021", "Snapdragon 865", "AMOLED", "5G", {
    notes: ["Don't confuse it with the 4G Galaxy S20 FE: the 5G model uses a Snapdragon 865 instead of the Exynos 990, so its board, modem and power circuitry are different."],
  }),
  s("samsung-galaxy-s21", "Galaxy S21", "S", 2021, "Jan 2021", "Exynos 2100", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s21-plus", "Galaxy S21+", "S", 2021, "Jan 2021", "Exynos 2100", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s21-ultra", "Galaxy S21 Ultra", "S", 2021, "Jan 2021", "Exynos 2100", "AMOLED", "5G", { ultrasonicFp: true, notes: ["The S21 Ultra was the first Galaxy S phone to support the S Pen (sold separately); unlike the Note series it has no built-in S Pen slot."] }),
  s("samsung-galaxy-s21-fe", "Galaxy S21 FE 5G", "S", 2022, "Jan 2022", "Exynos 2100", "AMOLED", "5G", {
    notes: ["The S21 FE 5G launched in India with the Exynos 2100. Because Samsung has sold more than one chipset version of this phone in different markets, we confirm your unit's exact model number before quoting for board work."],
  }),
  s("samsung-galaxy-s22", "Galaxy S22", "S", 2022, "Feb 2022", "Snapdragon 8 Gen 1", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s22-plus", "Galaxy S22+", "S", 2022, "Feb 2022", "Snapdragon 8 Gen 1", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s22-ultra", "Galaxy S22 Ultra", "S", 2022, "Feb 2022", "Snapdragon 8 Gen 1", "AMOLED", "5G", { ultrasonicFp: true, sPen: true, notes: ["The S22 Ultra brought the built-in S Pen slot from the Note series into the Galaxy S line."] }),
  s("samsung-galaxy-s23", "Galaxy S23", "S", 2023, "Feb 2023", "Snapdragon 8 Gen 2 for Galaxy", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s23-plus", "Galaxy S23+", "S", 2023, "Feb 2023", "Snapdragon 8 Gen 2 for Galaxy", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s23-ultra", "Galaxy S23 Ultra", "S", 2023, "Feb 2023", "Snapdragon 8 Gen 2 for Galaxy", "AMOLED", "5G", { ultrasonicFp: true, sPen: true }),
  s("samsung-galaxy-s23-fe", "Galaxy S23 FE", "S", 2023, "Oct 2023", "Exynos 2200", "AMOLED", "5G", {
    notes: ["The S23 FE sold in India uses the Exynos 2200 — not the Snapdragon 8 Gen 2 of the main S23 series — so it shares no board parts with the S23."],
  }),
  s("samsung-galaxy-s24", "Galaxy S24", "S", 2024, "Jan 2024", "Exynos 2400", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s24-plus", "Galaxy S24+", "S", 2024, "Jan 2024", "Exynos 2400", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s24-ultra", "Galaxy S24 Ultra", "S", 2024, "Jan 2024", "Snapdragon 8 Gen 3 for Galaxy", "AMOLED", "5G", {
    ultrasonicFp: true, sPen: true,
    notes: ["In India the S24 Ultra uses the Snapdragon 8 Gen 3 for Galaxy while the S24 and S24+ use the Exynos 2400, so the Ultra's board is a different design from its siblings'."],
  }),
  s("samsung-galaxy-s24-fe", "Galaxy S24 FE", "S", 2024, "Sep 2024", "Exynos 2400e", "AMOLED", "5G"),
  s("samsung-galaxy-s25", "Galaxy S25", "S", 2025, "Jan 2025", "Snapdragon 8 Elite for Galaxy", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s25-plus", "Galaxy S25+", "S", 2025, "Jan 2025", "Snapdragon 8 Elite for Galaxy", "AMOLED", "5G", { ultrasonicFp: true }),
  s("samsung-galaxy-s25-ultra", "Galaxy S25 Ultra", "S", 2025, "Jan 2025", "Snapdragon 8 Elite for Galaxy", "AMOLED", "5G", { ultrasonicFp: true, sPen: true }),
  s("samsung-galaxy-s25-edge", "Galaxy S25 Edge", "S", 2025, "May 2025", "Snapdragon 8 Elite for Galaxy", "AMOLED", "5G", {
    ultrasonicFp: true,
    notes: ["The S25 Edge squeezes the S25-series chip into a much thinner body. Thin phones leave less room around the board and less thermal mass, which matters for heat-related and board-level faults."],
  }),
  s("samsung-galaxy-s25-fe", "Galaxy S25 FE", "S", 2025, "Sep 2025", "Exynos 2400", "AMOLED", "5G"),
  s("samsung-galaxy-s26", "Galaxy S26", "S", 2026, "Mar 2026", "Exynos 2600", "AMOLED", "5G"),
  s("samsung-galaxy-s26-plus", "Galaxy S26+", "S", 2026, "Mar 2026", "Exynos 2600", "AMOLED", "5G"),
  s("samsung-galaxy-s26-ultra", "Galaxy S26 Ultra", "S", 2026, "Mar 2026", "Snapdragon 8 Elite Gen 5 for Galaxy", "AMOLED", "5G", {
    sPen: true,
    notes: ["In India the S26 and S26+ use Samsung's 2nm Exynos 2600, while the S26 Ultra uses the Snapdragon 8 Elite Gen 5 for Galaxy — the Ultra's board is a separate design."],
  }),

  // ── Galaxy Z ───────────────────────────────────────────────────────────
  s("samsung-galaxy-z-flip", "Galaxy Z Flip", "Z Flip", 2020, "Feb 2020", "Snapdragon 855+", "AMOLED", "4G"),
  s("samsung-galaxy-z-fold2", "Galaxy Z Fold2", "Z Fold", 2020, "Sep 2020", "Snapdragon 865+", "AMOLED", "5G"),
  s("samsung-galaxy-z-fold3", "Galaxy Z Fold3", "Z Fold", 2021, "Aug 2021", "Snapdragon 888", "AMOLED", "5G", { sPen: true, notes: ["The Z Fold3 was the first foldable to support the S Pen (Fold Edition), using a digitizer in the inner display."] }),
  s("samsung-galaxy-z-flip3", "Galaxy Z Flip3", "Z Flip", 2021, "Aug 2021", "Snapdragon 888", "AMOLED", "5G"),
  s("samsung-galaxy-z-fold4", "Galaxy Z Fold4", "Z Fold", 2022, "Aug 2022", "Snapdragon 8+ Gen 1", "AMOLED", "5G"),
  s("samsung-galaxy-z-flip4", "Galaxy Z Flip4", "Z Flip", 2022, "Aug 2022", "Snapdragon 8+ Gen 1", "AMOLED", "5G"),
  s("samsung-galaxy-z-fold5", "Galaxy Z Fold5", "Z Fold", 2023, "Jul 2023", "Snapdragon 8 Gen 2 for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-flip5", "Galaxy Z Flip5", "Z Flip", 2023, "Jul 2023", "Snapdragon 8 Gen 2 for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-fold6", "Galaxy Z Fold6", "Z Fold", 2024, "Jul 2024", "Snapdragon 8 Gen 3 for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-flip6", "Galaxy Z Flip6", "Z Flip", 2024, "Jul 2024", "Snapdragon 8 Gen 3 for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-fold7", "Galaxy Z Fold7", "Z Fold", 2025, "Jul 2025", "Snapdragon 8 Elite for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-flip7", "Galaxy Z Flip7", "Z Flip", 2025, "Jul 2025", "Exynos 2500", "AMOLED", "5G", { notes: ["The Z Flip7 was the first Flip to use an Exynos chip (the Exynos 2500) instead of Snapdragon, so its board shares nothing with the Snapdragon-based Flip6."] }),
  s("samsung-galaxy-z-flip7-fe", "Galaxy Z Flip7 FE", "Z Flip", 2025, "Jul 2025", "Exynos 2400", "AMOLED", "5G", { notes: ["The Flip7 FE uses the Exynos 2400 rather than the Flip7's Exynos 2500, so the two Flips launched together have different boards."] }),
  s("samsung-galaxy-z-fold8", "Galaxy Z Fold8", "Z Fold", 2026, "Jul 2026", "Snapdragon 8 Elite Gen 5 for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-fold8-ultra", "Galaxy Z Fold8 Ultra", "Z Fold", 2026, "Jul 2026", "Snapdragon 8 Elite Gen 5 for Galaxy", "AMOLED", "5G"),
  s("samsung-galaxy-z-flip8", "Galaxy Z Flip8", "Z Flip", 2026, "Jul 2026", "Exynos 2600", "AMOLED", "5G", { notes: ["Most Indian listings report the Exynos 2600 for the Z Flip8 sold in India, while some regions get a Snapdragon version. We confirm your unit's model number before any board work."] }),

  // ── Galaxy A ───────────────────────────────────────────────────────────
  s("samsung-galaxy-a51", "Galaxy A51", "A", 2020, "Jan 2020", "Exynos 9611", "AMOLED", "4G"),
  s("samsung-galaxy-a71", "Galaxy A71", "A", 2020, "Feb 2020", "Snapdragon 730", "AMOLED", "4G"),
  s("samsung-galaxy-a31", "Galaxy A31", "A", 2020, "Jun 2020", "Helio P65", "AMOLED", "4G"),
  s("samsung-galaxy-a21s", "Galaxy A21s", "A", 2020, "Jun 2020", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-a01-core", "Galaxy A01 Core", "A", 2020, "Jul 2020", "MediaTek MT6739", "LCD", "4G", { twins: ["samsung-galaxy-m01-core"] }),
  s("samsung-galaxy-a02", "Galaxy A02", "A", 2021, "Feb 2021", "MediaTek MT6739W", "LCD", "4G"),
  s("samsung-galaxy-a02s", "Galaxy A02s", "A", 2021, "Jan 2021", "Snapdragon 450", "LCD", "4G"),
  s("samsung-galaxy-a12", "Galaxy A12", "A", 2021, "Feb 2021", undefined, "LCD", "4G", {
    chipsetNote: "The Galaxy A12 was sold with more than one chipset (MediaTek Helio P35 and, in a later revision, Exynos 850)",
  }),
  s("samsung-galaxy-a32", "Galaxy A32", "A", 2021, "Mar 2021", "Helio G80", "AMOLED", "4G"),
  s("samsung-galaxy-a52", "Galaxy A52", "A", 2021, "Mar 2021", "Snapdragon 720G", "AMOLED", "4G"),
  s("samsung-galaxy-a72", "Galaxy A72", "A", 2021, "Mar 2021", "Snapdragon 720G", "AMOLED", "4G"),
  s("samsung-galaxy-a22", "Galaxy A22", "A", 2021, "Jul 2021", "Helio G80", "AMOLED", "4G"),
  s("samsung-galaxy-a22-5g", "Galaxy A22 5G", "A", 2021, "Jul 2021", "Dimensity 700", "LCD", "5G", { notes: ["Despite the shared name, the A22 5G (Dimensity 700, LCD) and the 4G A22 (Helio G80, AMOLED) are different phones with different boards."] }),
  s("samsung-galaxy-a52s", "Galaxy A52s 5G", "A", 2021, "Sep 2021", "Snapdragon 778G", "AMOLED", "5G"),
  s("samsung-galaxy-a03s", "Galaxy A03s", "A", 2021, "Aug 2021", "Helio P35", "LCD", "4G"),
  s("samsung-galaxy-a03-core", "Galaxy A03 Core", "A", 2021, "Dec 2021", "Unisoc SC9863A", "LCD", "4G"),
  s("samsung-galaxy-a03", "Galaxy A03", "A", 2022, "Mar 2022", "Unisoc T606", "LCD", "4G"),
  s("samsung-galaxy-a13", "Galaxy A13", "A", 2022, "Mar 2022", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-a23", "Galaxy A23", "A", 2022, "Mar 2022", "Snapdragon 680", "LCD", "4G"),
  s("samsung-galaxy-a33-5g", "Galaxy A33 5G", "A", 2022, "Apr 2022", "Exynos 1280", "AMOLED", "5G"),
  s("samsung-galaxy-a53-5g", "Galaxy A53 5G", "A", 2022, "Mar 2022", "Exynos 1280", "AMOLED", "5G"),
  s("samsung-galaxy-a73-5g", "Galaxy A73 5G", "A", 2022, "Apr 2022", "Snapdragon 778G", "AMOLED", "5G"),
  s("samsung-galaxy-a04s", "Galaxy A04s", "A", 2022, "Sep 2022", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-a04", "Galaxy A04", "A", 2022, "Oct 2022", "Helio P35", "LCD", "4G"),
  s("samsung-galaxy-a04e", "Galaxy A04e", "A", 2022, "Nov 2022", "Helio P35", "LCD", "4G"),
  s("samsung-galaxy-a23-5g", "Galaxy A23 5G", "A", 2023, "Jan 2023", "Snapdragon 695", "LCD", "5G"),
  s("samsung-galaxy-a14-5g", "Galaxy A14 5G", "A", 2023, "Jan 2023", "Exynos 1330", "LCD", "5G"),
  s("samsung-galaxy-a14", "Galaxy A14", "A", 2023, "Mar 2023", "Helio G80", "LCD", "4G"),
  s("samsung-galaxy-a34-5g", "Galaxy A34 5G", "A", 2023, "Mar 2023", "Dimensity 1080", "AMOLED", "5G"),
  s("samsung-galaxy-a54-5g", "Galaxy A54 5G", "A", 2023, "Mar 2023", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-a05", "Galaxy A05", "A", 2023, "Nov 2023", "Helio G85", "LCD", "4G"),
  s("samsung-galaxy-a05s", "Galaxy A05s", "A", 2023, "Oct 2023", "Snapdragon 680", "LCD", "4G"),
  s("samsung-galaxy-a15-5g", "Galaxy A15 5G", "A", 2023, "Dec 2023", "Dimensity 6100+", "AMOLED", "5G"),
  s("samsung-galaxy-a25-5g", "Galaxy A25 5G", "A", 2023, "Dec 2023", "Exynos 1280", "AMOLED", "5G"),
  s("samsung-galaxy-a35-5g", "Galaxy A35 5G", "A", 2024, "Mar 2024", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-a55-5g", "Galaxy A55 5G", "A", 2024, "Mar 2024", "Exynos 1480", "AMOLED", "5G"),
  s("samsung-galaxy-a06", "Galaxy A06", "A", 2024, "Aug 2024", "Helio G85", "LCD", "4G"),
  s("samsung-galaxy-a16-5g", "Galaxy A16 5G", "A", 2024, "Oct 2024", undefined, "AMOLED", "5G", {
    chipsetNote: "Sources disagree on the Indian Galaxy A16 5G's chipset (MediaTek Dimensity 6300 or Exynos 1330 depending on the model code)",
  }),
  s("samsung-galaxy-a06-5g", "Galaxy A06 5G", "A", 2025, "Feb 2025", "Dimensity 6300", "LCD", "5G"),
  s("samsung-galaxy-a26-5g", "Galaxy A26 5G", "A", 2025, "Mar 2025", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-a36-5g", "Galaxy A36 5G", "A", 2025, "Mar 2025", "Snapdragon 6 Gen 3", "AMOLED", "5G"),
  s("samsung-galaxy-a56-5g", "Galaxy A56 5G", "A", 2025, "Mar 2025", "Exynos 1580", "AMOLED", "5G"),
  s("samsung-galaxy-a17-5g", "Galaxy A17 5G", "A", 2025, "Aug 2025", "Exynos 1330", "AMOLED", "5G"),
  s("samsung-galaxy-a07", "Galaxy A07", "A", 2025, "Oct 2025", "Helio G99", "LCD", "4G", { twins: ["samsung-galaxy-f07", "samsung-galaxy-m07"] }),
  s("samsung-galaxy-a07-5g", "Galaxy A07 5G", "A", 2026, "Jan 2026", undefined, "LCD", "5G", { chipsetNote: UNCONFIRMED }),
  s("samsung-galaxy-a37-5g", "Galaxy A37 5G", "A", 2026, "Mar 2026", "Exynos 1480", "AMOLED", "5G"),
  s("samsung-galaxy-a57-5g", "Galaxy A57 5G", "A", 2026, "Mar 2026", "Exynos 1680", "AMOLED", "5G"),

  // ── Galaxy M ───────────────────────────────────────────────────────────
  s("samsung-galaxy-m31", "Galaxy M31", "M", 2020, "Feb 2020", "Exynos 9611", "AMOLED", "4G"),
  s("samsung-galaxy-m21", "Galaxy M21", "M", 2020, "Mar 2020", "Exynos 9611", "AMOLED", "4G"),
  s("samsung-galaxy-m11", "Galaxy M11", "M", 2020, "Jun 2020", "Snapdragon 450", "LCD", "4G"),
  s("samsung-galaxy-m01", "Galaxy M01", "M", 2020, "Jun 2020", "Snapdragon 439", "LCD", "4G"),
  s("samsung-galaxy-m01s", "Galaxy M01s", "M", 2020, "Jul 2020", "Helio P22", "LCD", "4G"),
  s("samsung-galaxy-m01-core", "Galaxy M01 Core", "M", 2020, "Jul 2020", "MediaTek MT6739", "LCD", "4G", { twins: ["samsung-galaxy-a01-core"] }),
  s("samsung-galaxy-m31s", "Galaxy M31s", "M", 2020, "Jul 2020", "Exynos 9611", "AMOLED", "4G"),
  s("samsung-galaxy-m51", "Galaxy M51", "M", 2020, "Sep 2020", "Snapdragon 730G", "AMOLED", "4G"),
  s("samsung-galaxy-m02s", "Galaxy M02s", "M", 2021, "Jan 2021", "Snapdragon 450", "LCD", "4G"),
  s("samsung-galaxy-m02", "Galaxy M02", "M", 2021, "Feb 2021", "MediaTek MT6739W", "LCD", "4G"),
  s("samsung-galaxy-m12", "Galaxy M12", "M", 2021, "Mar 2021", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-m42-5g", "Galaxy M42 5G", "M", 2021, "Apr 2021", "Snapdragon 750G", "AMOLED", "5G"),
  s("samsung-galaxy-m32", "Galaxy M32", "M", 2021, "Jun 2021", "Helio G80", "AMOLED", "4G"),
  s("samsung-galaxy-m32-5g", "Galaxy M32 5G", "M", 2021, "Aug 2021", "Dimensity 720", "LCD", "5G", { notes: ["The M32 5G (Dimensity 720, LCD) is a different phone from the 4G M32 (Helio G80, AMOLED), with a different board."] }),
  s("samsung-galaxy-m52-5g", "Galaxy M52 5G", "M", 2021, "Sep 2021", "Snapdragon 778G", "AMOLED", "5G"),
  s("samsung-galaxy-m33-5g", "Galaxy M33 5G", "M", 2022, "Apr 2022", "Exynos 1280", "LCD", "5G"),
  s("samsung-galaxy-m53-5g", "Galaxy M53 5G", "M", 2022, "Apr 2022", "Dimensity 900", "AMOLED", "5G"),
  s("samsung-galaxy-m13", "Galaxy M13", "M", 2022, "Jul 2022", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-m13-5g", "Galaxy M13 5G", "M", 2022, "Jul 2022", "Dimensity 700", "LCD", "5G"),
  s("samsung-galaxy-m04", "Galaxy M04", "M", 2022, "Dec 2022", "Helio P35", "LCD", "4G"),
  s("samsung-galaxy-m14-5g", "Galaxy M14 5G", "M", 2023, "Apr 2023", "Exynos 1330", "LCD", "5G"),
  s("samsung-galaxy-m34-5g", "Galaxy M34 5G", "M", 2023, "Jul 2023", "Exynos 1280", "AMOLED", "5G"),
  s("samsung-galaxy-m15-5g", "Galaxy M15 5G", "M", 2024, "Apr 2024", "Dimensity 6100+", "AMOLED", "5G"),
  s("samsung-galaxy-m55-5g", "Galaxy M55 5G", "M", 2024, "Apr 2024", "Snapdragon 7 Gen 1", "AMOLED", "5G"),
  s("samsung-galaxy-m14", "Galaxy M14", "M", 2024, "Mar 2024", "Snapdragon 680", "LCD", "4G"),
  s("samsung-galaxy-m35-5g", "Galaxy M35 5G", "M", 2024, "Jul 2024", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-m05", "Galaxy M05", "M", 2024, "Sep 2024", "Helio G85", "LCD", "4G"),
  s("samsung-galaxy-m55s-5g", "Galaxy M55s 5G", "M", 2024, "Sep 2024", "Snapdragon 7 Gen 1", "AMOLED", "5G"),
  s("samsung-galaxy-m06-5g", "Galaxy M06 5G", "M", 2025, "Feb 2025", "Dimensity 6300", "LCD", "5G"),
  s("samsung-galaxy-m16-5g", "Galaxy M16 5G", "M", 2025, "Feb 2025", "Dimensity 6300", "AMOLED", "5G"),
  s("samsung-galaxy-m56-5g", "Galaxy M56 5G", "M", 2025, "Apr 2025", "Exynos 1480", "AMOLED", "5G"),
  s("samsung-galaxy-m36-5g", "Galaxy M36 5G", "M", 2025, "Jun 2025", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-m07", "Galaxy M07", "M", 2025, "Oct 2025", "Helio G99", "LCD", "4G", { twins: ["samsung-galaxy-a07", "samsung-galaxy-f07"] }),
  s("samsung-galaxy-m17-5g", "Galaxy M17 5G", "M", 2025, "Oct 2025", "Exynos 1330", "AMOLED", "5G"),
  s("samsung-galaxy-m17e-5g", "Galaxy M17e 5G", "M", 2026, "Mar 2026", "Dimensity 6300", "LCD", "5G"),
  s("samsung-galaxy-m47-5g", "Galaxy M47 5G", "M", 2026, "Jun 2026", "Snapdragon 6 Gen 3", "AMOLED", "5G"),

  // ── Galaxy F ───────────────────────────────────────────────────────────
  s("samsung-galaxy-f41", "Galaxy F41", "F", 2020, "Oct 2020", "Exynos 9611", "AMOLED", "4G"),
  s("samsung-galaxy-f62", "Galaxy F62", "F", 2021, "Feb 2021", "Exynos 9825", "AMOLED", "4G", { notes: ["The F62 uses the Exynos 9825, the chip from the 2019 Galaxy Note10 series — an unusually high-end chip for an F-series phone."] }),
  s("samsung-galaxy-f02s", "Galaxy F02s", "F", 2021, "Apr 2021", "Snapdragon 450", "LCD", "4G"),
  s("samsung-galaxy-f12", "Galaxy F12", "F", 2021, "Apr 2021", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-f22", "Galaxy F22", "F", 2021, "Jul 2021", "Helio G80", "AMOLED", "4G"),
  s("samsung-galaxy-f42-5g", "Galaxy F42 5G", "F", 2021, "Sep 2021", "Dimensity 700", "LCD", "5G"),
  s("samsung-galaxy-f23-5g", "Galaxy F23 5G", "F", 2022, "Mar 2022", "Snapdragon 750G", "LCD", "5G"),
  s("samsung-galaxy-f13", "Galaxy F13", "F", 2022, "Jun 2022", "Exynos 850", "LCD", "4G"),
  s("samsung-galaxy-f04", "Galaxy F04", "F", 2023, "Jan 2023", "Helio P35", "LCD", "4G"),
  s("samsung-galaxy-f14-5g", "Galaxy F14 5G", "F", 2023, "Mar 2023", "Exynos 1330", "LCD", "5G"),
  s("samsung-galaxy-f54-5g", "Galaxy F54 5G", "F", 2023, "Jun 2023", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-f34-5g", "Galaxy F34 5G", "F", 2023, "Aug 2023", "Exynos 1280", "AMOLED", "5G"),
  s("samsung-galaxy-f15-5g", "Galaxy F15 5G", "F", 2024, "Mar 2024", "Dimensity 6100+", "AMOLED", "5G"),
  s("samsung-galaxy-f55-5g", "Galaxy F55 5G", "F", 2024, "May 2024", "Snapdragon 7 Gen 1", "AMOLED", "5G"),
  s("samsung-galaxy-f14", "Galaxy F14", "F", 2024, "Aug 2024", "Snapdragon 680", "LCD", "4G"),
  s("samsung-galaxy-f05", "Galaxy F05", "F", 2024, "Sep 2024", "Helio G85", "LCD", "4G"),
  s("samsung-galaxy-f06-5g", "Galaxy F06 5G", "F", 2025, "Feb 2025", "Dimensity 6300", "LCD", "5G"),
  s("samsung-galaxy-f16-5g", "Galaxy F16 5G", "F", 2025, "Mar 2025", "Dimensity 6300", "AMOLED", "5G"),
  s("samsung-galaxy-f56-5g", "Galaxy F56 5G", "F", 2025, "May 2025", "Exynos 1480", "AMOLED", "5G"),
  s("samsung-galaxy-f36-5g", "Galaxy F36 5G", "F", 2025, "Jul 2025", "Exynos 1380", "AMOLED", "5G"),
  s("samsung-galaxy-f17-5g", "Galaxy F17 5G", "F", 2025, "Sep 2025", "Exynos 1330", "AMOLED", "5G"),
  s("samsung-galaxy-f07", "Galaxy F07", "F", 2025, "Oct 2025", "Helio G99", "LCD", "4G", { twins: ["samsung-galaxy-a07", "samsung-galaxy-m07"] }),
  s("samsung-galaxy-f70e", "Galaxy F70e", "F", 2026, "2026", undefined, "LCD", "5G", { chipsetNote: UNCONFIRMED }),
];

export const SAMSUNG_FACTS_CHECKED = "October 2026";

export function getSamsungModel(slug: string): SamsungModel | undefined {
  return samsungModels.find((m) => m.slug === slug);
}
