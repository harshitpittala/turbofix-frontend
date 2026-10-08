/**
 * iphoneModels.ts — verified hardware facts for every iPhone from iPhone 11
 * through iPhone 18 Pro Max, used to build the /[model]/[service] pages.
 *
 * RULES (owner request, Oct 2026): only facts that can be verified. Sources:
 *  - Apple tech-spec pages (apple.com/<model>/specs) and Apple Support docs
 *    102658 (Parts and Service History), 103256 (genuine displays),
 *    103269 (genuine batteries), 101575 (battery and performance).
 *  - iFixit teardowns for internal construction (back glass, battery adhesive).
 * Anything we could not verify is left out (field omitted or "unverified"),
 * never guessed. No prices, turnaround times or per-model warranty terms
 * live here — those are TODO(owner).
 *
 * Not included, and why (checked 5 Oct 2026):
 *  - iPhone 18 and iPhone 18 Plus: not released (Apple only launched the
 *    18 Pro and 18 Pro Max on 18 Sep 2026).
 *  - iPhone Duo: announced 9 Sep 2026, not yet on sale, and outside the
 *    numbered 11–18 range.
 *  - iPhone SE (2nd/3rd gen): outside the numbered 11–18 range.
 */

export const IPHONE_FACTS_CHECKED = "October 2026";

export type PartsHistoryPart = "Battery" | "Display" | "Logic Board" | "Front camera" | "Rear cameras";

export interface IphoneModel {
  slug: string;              // URL segment: iphone-15-pro-max
  name: string;              // iPhone 15 Pro Max
  generation: number;        // 11 … 18 (iPhone Air counts as 17)
  tier: "standard" | "mini" | "plus" | "pro" | "pro-max" | "e" | "air";
  released: string;          // ISO date of first availability
  releasedLabel: string;     // "September 2019"
  chip: string;
  display: {
    size: string;            // "6.1-inch"
    tech: "LCD" | "OLED";
    brand: string;           // Apple's marketing name
    promotion: boolean;      // ProMotion up to 120 Hz
    alwaysOn: boolean;
    cutout: "notch" | "dynamic-island";
  };
  frontGlass?: string;       // "Ceramic Shield", "Ceramic Shield 2" — omitted before iPhone 12
  frame: string;             // "aluminium", "stainless steel", "titanium", "aluminium unibody"
  /** How the back is built — drives the back-panel page. */
  back:
    | "glass-bonded"         // glass glued into the housing (iPhone 11–13, 14 Pro)
    | "glass-removable"      // separately replaceable back glass (iPhone 14/14 Plus, 15 and later)
    | "unibody-inset";       // aluminium unibody with a Ceramic Shield glass section (17 Pro, 18 Pro)
  backFinish: string;        // short visible description
  connector: "Lightning" | "USB-C";
  usbSpeed?: "USB 2" | "USB 3";
  magsafe: boolean;
  rearCameras: string[];
  frontCamera: string;
  lidar: boolean;
  cameraControl: boolean;
  actionButton: boolean;
  /** Apple's stated design target: 80% capacity at this many full cycles. */
  batteryCycleTarget: 500 | 1000;
  batteryRemoval: "stretch-release" | "not-electric" | "electric" | "electric-tray" | "unverified";
  partsHistory: PartsHistoryPart[];
  water: string;
  modem?: string;
  speakerSpec?: string;      // only where Apple's spec sheet says something notable
  /** Handwritten, verified notes that only apply to this model, per service. */
  notes?: Partial<Record<IphoneServiceSlug, string[]>>;
  /** Spec source shown on the page. */
  specSource?: { label: string; href: string };
}

export type IphoneServiceSlug =
  | "screen-replacement"
  | "battery-replacement"
  | "charging-port-service"
  | "camera-service"
  | "speaker-microphone-service"
  | "back-panel-replacement"
  | "motherboard-replacement"
  | "chip-level-service";

const FULL_HISTORY: PartsHistoryPart[] = ["Battery", "Display", "Logic Board", "Front camera", "Rear cameras"];

export const iphoneModels: IphoneModel[] = [
  // ── iPhone 11 series (2019) ────────────────────────────────────────────
  {
    slug: "iphone-11", name: "iPhone 11", generation: 11, tier: "standard",
    released: "2019-09-20", releasedLabel: "September 2019", chip: "A13 Bionic",
    display: { size: "6.1-inch", tech: "LCD", brand: "Liquid Retina HD", promotion: false, alwaysOn: false, cutout: "notch" },
    frame: "aluminium", back: "glass-bonded", backFinish: "glossy glass back with a matte camera bump",
    connector: "Lightning", magsafe: false,
    rearCameras: ["12MP Wide", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: ["Battery", "Display"], water: "IP68 (up to 2 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The iPhone 11 is the only model in this range with an LCD panel instead of OLED. An LCD has a separate backlight, so a phone that shows a faint image under a torch but no light has a different fault from a cracked OLED.",
        "Because the iPhone 11 lists the display in Parts and Service History, a non-genuine screen will show as \"Unknown Part\" in Settings > General > About.",
      ],
      "chip-level-service": [
        "LCD backlight circuits only exist on the iPhone 11 in this range. A dark screen that still responds to touch can point to the backlight circuit rather than the panel, which is a board-level check.",
      ],
    },
  },
  {
    slug: "iphone-11-pro", name: "iPhone 11 Pro", generation: 11, tier: "pro",
    released: "2019-09-20", releasedLabel: "September 2019", chip: "A13 Bionic",
    display: { size: "5.8-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: false,
    rearCameras: ["12MP Wide", "12MP Ultra Wide", "12MP Telephoto (2x)"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: ["Battery", "Display"], water: "IP68 (up to 4 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "Unlike the LCD iPhone 11, the 11 Pro uses an OLED (Super Retina XDR) panel. OLED damage often shows as black spreading patches or green lines rather than the backlight bleed you'd see on the LCD iPhone 11.",
      ],
      "back-panel-replacement": [
        "The 11 Pro's back is textured matte glass. Matte replacement glass varies in finish between suppliers, so ask to see the replacement before it is fitted if an exact match matters to you.",
      ],
    },
  },
  {
    slug: "iphone-11-pro-max", name: "iPhone 11 Pro Max", generation: 11, tier: "pro-max",
    released: "2019-09-20", releasedLabel: "September 2019", chip: "A13 Bionic",
    display: { size: "6.5-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: false,
    rearCameras: ["12MP Wide", "12MP Ultra Wide", "12MP Telephoto (2x)"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: ["Battery", "Display"], water: "IP68 (up to 4 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "At 6.5 inches, the 11 Pro Max has the largest screen of the iPhone 11 series and takes its own display part — 11 Pro screens don't fit.",
      ],
    },
  },

  // ── iPhone 12 series (2020) ────────────────────────────────────────────
  {
    slug: "iphone-12-mini", name: "iPhone 12 mini", generation: 12, tier: "mini",
    released: "2020-11-13", releasedLabel: "November 2020", chip: "A14 Bionic",
    display: { size: "5.4-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-bonded", backFinish: "glossy glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "battery-replacement": [
        "The 12 mini has the smallest battery of any model on this list because of its 5.4-inch body, so it reaches the point where battery life feels short sooner than the larger iPhone 12 models. Check Battery Health before assuming a fault.",
      ],
      "screen-replacement": [
        "Inside a 5.4-inch body there is very little slack in the display and Face ID cables, so careful opening matters more on the mini than on the larger iPhone 12 models.",
      ],
    },
  },
  {
    slug: "iphone-12", name: "iPhone 12", generation: 12, tier: "standard",
    released: "2020-10-23", releasedLabel: "October 2020", chip: "A14 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-bonded", backFinish: "glossy glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The iPhone 12 and iPhone 12 Pro are both 6.1-inch, and their displays are physically similar. Make sure the quote is for an iPhone 12 display specifically.",
      ],
    },
  },
  {
    slug: "iphone-12-pro", name: "iPhone 12 Pro", generation: 12, tier: "pro",
    released: "2020-10-23", releasedLabel: "October 2020", chip: "A14 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide", "12MP Ultra Wide", "12MP Telephoto (2x)"], frontCamera: "12MP TrueDepth", lidar: true,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "camera-service": [
        "The 12 Pro was among the first iPhones with a LiDAR Scanner. If Portrait mode in low light or AR measuring is off but photos look fine, the LiDAR module is worth testing separately from the cameras.",
      ],
    },
  },
  {
    slug: "iphone-12-pro-max", name: "iPhone 12 Pro Max", generation: 12, tier: "pro-max",
    released: "2020-11-13", releasedLabel: "November 2020", chip: "A14 Bionic",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide (sensor-shift stabilisation)", "12MP Ultra Wide", "12MP Telephoto (2.5x)"], frontCamera: "12MP TrueDepth", lidar: true,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "camera-service": [
        "The 12 Pro Max's main camera uses sensor-shift stabilisation and its telephoto is 2.5x rather than the 12 Pro's 2x, so its camera modules are not interchangeable with the 12 Pro's.",
        "Sensor-shift stabilisation moves the sensor itself. A rattle or buzzing from the camera, or shaky video, can point to that mechanism and needs testing before a quote.",
      ],
    },
  },

  // ── iPhone 13 series (2021) ────────────────────────────────────────────
  {
    slug: "iphone-13-mini", name: "iPhone 13 mini", generation: 13, tier: "mini",
    released: "2021-09-24", releasedLabel: "September 2021", chip: "A15 Bionic",
    display: { size: "5.4-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-bonded", backFinish: "glossy glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide (sensor-shift stabilisation)", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "camera-service": [
        "The 13 mini moved the cameras to a diagonal layout and added sensor-shift stabilisation to the main camera — features the 12 mini doesn't have — so 12 mini camera parts don't fit.",
      ],
      "battery-replacement": [
        "The 13 mini was the last mini iPhone. It's still compact, so its battery is small compared with the 6.1-inch iPhone 13; set expectations on runtime accordingly.",
      ],
    },
  },
  {
    slug: "iphone-13", name: "iPhone 13", generation: 13, tier: "standard",
    released: "2021-09-24", releasedLabel: "September 2021", chip: "A15 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-bonded", backFinish: "glossy glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide (sensor-shift stabilisation)", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "back-panel-replacement": [
        "The iPhone 13 looks a lot like the iPhone 14, but the 14 was redesigned so its back glass comes off separately. On the iPhone 13 the glass is still bonded to the housing, which makes the job more involved.",
      ],
    },
  },
  {
    slug: "iphone-13-pro", name: "iPhone 13 Pro", generation: 13, tier: "pro",
    released: "2021-09-24", releasedLabel: "September 2021", chip: "A15 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion", promotion: true, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide", "12MP Ultra Wide (also used for macro)", "12MP Telephoto (3x)"], frontCamera: "12MP TrueDepth", lidar: true,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The 13 Pro was the first iPhone with ProMotion (adaptive refresh up to 120 Hz). Many lower-cost replacement panels don't support it, so ask whether the quoted screen keeps 120 Hz.",
      ],
      "camera-service": [
        "Macro photos on the 13 Pro come from the Ultra Wide camera. If close-up shots won't focus but normal wide shots are fine, the Ultra Wide module is the first suspect.",
      ],
    },
  },
  {
    slug: "iphone-13-pro-max", name: "iPhone 13 Pro Max", generation: 13, tier: "pro-max",
    released: "2021-09-24", releasedLabel: "September 2021", chip: "A15 Bionic",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion", promotion: true, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Wide", "12MP Ultra Wide (also used for macro)", "12MP Telephoto (3x)"], frontCamera: "12MP TrueDepth", lidar: true,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "As with the 13 Pro, the 13 Pro Max's original panel runs at up to 120 Hz. Confirm whether the replacement you're quoted keeps ProMotion; a 60 Hz panel will feel noticeably less smooth.",
      ],
    },
  },

  // ── iPhone 14 series (2022) ────────────────────────────────────────────
  {
    slug: "iphone-14", name: "iPhone 14", generation: 14, tier: "standard",
    released: "2022-09-16", releasedLabel: "September 2022", chip: "A15 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "glossy glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Main", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "back-panel-replacement": [
        "The iPhone 14 got a redesigned interior that lets the back glass come off on its own — something the iPhone 13 and the iPhone 14 Pro don't have. That generally makes back glass work on the 14 simpler than on those models.",
      ],
      "camera-service": [
        "The iPhone 14 added autofocus to the front TrueDepth camera. A front camera that takes soft, out-of-focus selfies on a 14 can be a focus fault rather than a dirty lens.",
      ],
    },
  },
  {
    slug: "iphone-14-plus", name: "iPhone 14 Plus", generation: 14, tier: "plus",
    released: "2022-10-07", releasedLabel: "October 2022", chip: "A15 Bionic",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "glossy glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["12MP Main", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The 14 Plus was the first non-Pro iPhone with a 6.7-inch screen. Its display is a different part from the 6.7-inch 14 Pro Max (which has the Dynamic Island) — they are not interchangeable.",
      ],
      "back-panel-replacement": [
        "Like the iPhone 14, the 14 Plus uses the redesigned interior with a separately removable back glass.",
      ],
    },
  },
  {
    slug: "iphone-14-pro", name: "iPhone 14 Pro", generation: 14, tier: "pro",
    released: "2022-09-16", releasedLabel: "September 2022", chip: "A16 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["48MP Main", "12MP Ultra Wide", "12MP Telephoto (3x)"], frontCamera: "12MP TrueDepth with autofocus", lidar: true,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The 14 Pro introduced the Dynamic Island and an Always-On display. Replacement panels need the correct Dynamic Island cut-out and should support Always-On and ProMotion — ask before you agree to a part.",
      ],
      "back-panel-replacement": [
        "Unlike the iPhone 14 and 14 Plus, the 14 Pro did not get the removable-back-glass interior. Its back glass is bonded to the stainless-steel housing.",
      ],
      "camera-service": [
        "The 14 Pro was the first iPhone with a 48MP main camera. If photos look hazy or show flare on only one camera, check that camera's lens cover for a crack before assuming the sensor has failed.",
      ],
    },
  },
  {
    slug: "iphone-14-pro-max", name: "iPhone 14 Pro Max", generation: 14, tier: "pro-max",
    released: "2022-09-16", releasedLabel: "September 2022", chip: "A16 Bionic",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "stainless steel", back: "glass-bonded", backFinish: "textured matte glass back",
    connector: "Lightning", magsafe: true,
    rearCameras: ["48MP Main", "12MP Ultra Wide", "12MP Telephoto (3x)"], frontCamera: "12MP TrueDepth with autofocus", lidar: true,
    cameraControl: false, actionButton: false, batteryCycleTarget: 500, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The 14 Pro Max shares the Dynamic Island, ProMotion and Always-On features with the 14 Pro but uses a larger 6.7-inch panel. It also isn't interchangeable with the 6.7-inch 14 Plus screen.",
      ],
      "charging-port-service": [
        "The iPhone 14 series was the last to use Lightning. Test with a known-good Apple or MFi-certified Lightning cable before assuming the port is at fault — a worn cable can look exactly like a port fault.",
      ],
    },
  },

  // ── iPhone 15 series (2023) ────────────────────────────────────────────
  {
    slug: "iphone-15", name: "iPhone 15", generation: 15, tier: "standard",
    released: "2023-09-22", releasedLabel: "September 2023", chip: "A16 Bionic",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "colour-infused matte glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Main", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 1000, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "charging-port-service": [
        "The iPhone 15 was the first standard iPhone with USB-C. Its port runs at USB 2 speeds, so slow cable transfers to a computer are expected and are not a port fault on their own.",
      ],
      "screen-replacement": [
        "The iPhone 15 brought the Dynamic Island to the standard model. Its screen is not interchangeable with the iPhone 14's notched panel even though both are 6.1-inch.",
      ],
    },
  },
  {
    slug: "iphone-15-plus", name: "iPhone 15 Plus", generation: 15, tier: "plus",
    released: "2023-09-22", releasedLabel: "September 2023", chip: "A16 Bionic",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "colour-infused matte glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Main", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: false, actionButton: false, batteryCycleTarget: 1000, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "battery-replacement": [
        "Apple rates iPhone 15 batteries, including the 15 Plus, to keep 80% of original capacity at 1,000 full cycles — double the 500-cycle figure for iPhone 14 and earlier. A 15 Plus that's struggling well before that point deserves a proper diagnosis, not just a new battery.",
      ],
    },
  },
  {
    slug: "iphone-15-pro", name: "iPhone 15 Pro", generation: 15, tier: "pro",
    released: "2023-09-22", releasedLabel: "September 2023", chip: "A17 Pro",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "titanium", back: "glass-removable", backFinish: "textured matte glass back",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Main", "12MP Ultra Wide", "12MP Telephoto (3x)"], frontCamera: "12MP TrueDepth with autofocus", lidar: true,
    cameraControl: false, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "back-panel-replacement": [
        "The 15 Pro has a titanium band over an internal structural frame that lets the back glass be replaced on its own — a change from the 14 Pro, where the glass is bonded to the housing.",
      ],
      "charging-port-service": [
        "The 15 Pro's USB-C port supports USB 3 (up to 10 Gb/s), but only with a USB 3 cable; the cable Apple includes is USB 2. Slow transfers with the included cable are normal.",
      ],
    },
  },
  {
    slug: "iphone-15-pro-max", name: "iPhone 15 Pro Max", generation: 15, tier: "pro-max",
    released: "2023-09-22", releasedLabel: "September 2023", chip: "A17 Pro",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "titanium", back: "glass-removable", backFinish: "textured matte glass back",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Main", "12MP Ultra Wide", "12MP Telephoto (5x tetraprism)"], frontCamera: "12MP TrueDepth with autofocus", lidar: true,
    cameraControl: false, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "stretch-release",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "camera-service": [
        "The 15 Pro Max is the only iPhone 15 model with the 5x tetraprism telephoto; the 15 Pro has a 3x telephoto. Their rear camera parts are therefore different.",
        "The tetraprism folds light sideways inside the phone. A 5x lens that won't focus, or shows a dark or smeared image only at 5x, should be diagnosed separately from the main camera.",
      ],
    },
  },

  // ── iPhone 16 series (2024–25) ─────────────────────────────────────────
  {
    slug: "iphone-16", name: "iPhone 16", generation: 16, tier: "standard",
    released: "2024-09-20", releasedLabel: "September 2024", chip: "A18",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "colour-infused glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Fusion", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "electric",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "battery-replacement": [
        "The iPhone 16 uses a battery adhesive that releases when a low voltage is applied, instead of the pull-tab strips used on earlier models. iFixit's teardown showed the battery coming free in seconds this way, which lowers the risk of bending or puncturing the cell during removal.",
      ],
      "camera-service": [
        "The iPhone 16 moved to a vertical camera layout and added the Camera Control button on the side. If the camera app opens but the Camera Control button doesn't respond, that's a button or flex issue, not a camera module fault.",
      ],
    },
  },
  {
    slug: "iphone-16-plus", name: "iPhone 16 Plus", generation: 16, tier: "plus",
    released: "2024-09-20", releasedLabel: "September 2024", chip: "A18",
    display: { size: "6.7-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "colour-infused glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Fusion", "12MP Ultra Wide"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "electric",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "battery-replacement": [
        "Like the iPhone 16, the 16 Plus uses Apple's electrically released battery adhesive. The 16 Pro and 16 Pro Max do not, so battery work on the 16 Plus follows a different procedure from the Pro models.",
      ],
    },
  },
  {
    slug: "iphone-16-pro", name: "iPhone 16 Pro", generation: 16, tier: "pro",
    released: "2024-09-20", releasedLabel: "September 2024", chip: "A18 Pro",
    display: { size: "6.3-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "titanium", back: "glass-removable", backFinish: "textured matte glass back",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Fusion", "48MP Ultra Wide", "12MP Telephoto (5x tetraprism)"], frontCamera: "12MP TrueDepth with autofocus", lidar: true,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "not-electric",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "camera-service": [
        "The 16 Pro is the first smaller Pro iPhone with the 5x tetraprism telephoto (the 15 Pro had 3x), and its Ultra Wide went up to 48MP. None of its rear camera parts are shared with the 15 Pro.",
      ],
      "screen-replacement": [
        "The 16 Pro's screen grew to 6.3 inches with thinner borders than the 15 Pro, so it needs its own display part.",
      ],
      "battery-replacement": [
        "Unlike the iPhone 16 and 16 Plus, the 16 Pro doesn't use the electrically released battery adhesive (per iFixit's teardown), so its battery comes out with a more conventional procedure.",
      ],
    },
  },
  {
    slug: "iphone-16-pro-max", name: "iPhone 16 Pro Max", generation: 16, tier: "pro-max",
    released: "2024-09-20", releasedLabel: "September 2024", chip: "A18 Pro",
    display: { size: "6.9-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield", frame: "titanium", back: "glass-removable", backFinish: "textured matte glass back",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Fusion", "48MP Ultra Wide", "12MP Telephoto (5x tetraprism)"], frontCamera: "12MP TrueDepth with autofocus", lidar: true,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "not-electric",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "At 6.9 inches, the 16 Pro Max had the largest iPhone display up to that point, and it needs its own display part — 15 Pro Max screens don't fit.",
      ],
    },
  },
  {
    slug: "iphone-16e", name: "iPhone 16e", generation: 16, tier: "e",
    released: "2025-02-28", releasedLabel: "February 2025", chip: "A18",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield", frame: "aluminium", back: "glass-removable", backFinish: "glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: false,
    rearCameras: ["48MP Fusion"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: false, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "electric",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)", modem: "Apple C1",
    notes: {
      "charging-port-service": [
        "The iPhone 16e has no MagSafe — it supports standard Qi wireless charging only. A MagSafe charger may still charge it as a standard Qi charger, but magnets won't hold it in place. That's by design, not a fault.",
        "iFixit noted that getting to the 16e's USB-C port means removing most other components first, so a port replacement is a bigger job than the small part suggests.",
      ],
      "screen-replacement": [
        "The 16e has a notch rather than a Dynamic Island, so its screen is not the same part as the iPhone 16's, even though both are 6.1-inch.",
      ],
      "motherboard-replacement": [
        "The 16e was the first iPhone with Apple's own C1 cellular modem. Network faults on a 16e (no service, weak signal) are diagnosed differently from earlier models that use a Qualcomm modem.",
      ],
    },
    specSource: { label: "iFixit iPhone 16e teardown", href: "https://www.ifixit.com/News/108430/iphone-16e-teardown-never-before-has-skipping-the-upgrade-made-more-sense" },
  },

  // ── iPhone 17 generation (2025–26) ─────────────────────────────────────
  {
    slug: "iphone-17", name: "iPhone 17", generation: 17, tier: "standard",
    released: "2025-09-19", releasedLabel: "September 2025", chip: "A19",
    display: { size: "6.3-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield 2", frame: "aluminium", back: "glass-removable", backFinish: "colour-infused glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Fusion", "48MP Ultra Wide"], frontCamera: "18MP Center Stage", lidar: false,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "electric-tray",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "screen-replacement": [
        "The iPhone 17 is the first standard iPhone with ProMotion and an Always-On display, on a 6.3-inch panel. Its screen is a different part from the 6.1-inch iPhone 16's.",
      ],
      "camera-service": [
        "The iPhone 17 replaced the 12MP front camera with an 18MP Center Stage camera. Center Stage keeps you framed in video calls; if it stops tracking but the camera itself works, test it before assuming the module has failed.",
      ],
      "battery-replacement": [
        "iFixit found the iPhone 17's battery sits on a metal tray held by screws, still using electrically debonding adhesive. That design makes removal more controlled than older pull-tab batteries.",
      ],
    },
    specSource: { label: "Apple iPhone 17 tech specs", href: "https://www.apple.com/iphone-17/specs/" },
  },
  {
    slug: "iphone-air", name: "iPhone Air", generation: 17, tier: "air",
    released: "2025-09-19", releasedLabel: "September 2025", chip: "A19 Pro",
    display: { size: "6.5-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield 2", frame: "titanium", back: "glass-removable", backFinish: "Ceramic Shield glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Fusion"], frontCamera: "18MP Center Stage", lidar: false,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "electric",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)", modem: "Apple C1X",
    speakerSpec: "Apple's spec sheet lists a built-in speaker for the iPhone Air, where other current models list stereo speakers.",
    notes: {
      "back-panel-replacement": [
        "The iPhone Air's back is Ceramic Shield glass on a titanium frame. iFixit's teardown found the back glass relatively easy to swap, despite how thin the phone is.",
      ],
      "battery-replacement": [
        "The Air uses electrically debonding battery adhesive. iFixit noted the battery itself was the trickier part of the job because of the phone's thin build, so treat it with care — don't attempt to pry it.",
      ],
      "speaker-microphone-service": [
        "Apple lists a built-in speaker for the iPhone Air rather than the stereo speakers on other current iPhones. If you're comparing it with another iPhone and the Air sounds less wide, that's expected — check for distortion or crackle instead.",
      ],
      "motherboard-replacement": [
        "The iPhone Air uses Apple's C1X modem and A19 Pro chip. Its very thin body leaves little room around the logic board, so board work needs extra care.",
      ],
    },
    specSource: { label: "Apple iPhone Air tech specs", href: "https://www.apple.com/iphone-air/specs/" },
  },
  {
    slug: "iphone-17-pro", name: "iPhone 17 Pro", generation: 17, tier: "pro",
    released: "2025-09-19", releasedLabel: "September 2025", chip: "A19 Pro",
    display: { size: "6.3-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield 2", frame: "aluminium unibody", back: "unibody-inset", backFinish: "aluminium unibody with a Ceramic Shield glass section",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Fusion Main", "48MP Fusion Ultra Wide", "48MP Telephoto (4x tetraprism)"], frontCamera: "18MP Center Stage", lidar: true,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "electric-tray",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "back-panel-replacement": [
        "The 17 Pro moved to an aluminium unibody. The glass part of the back is a small Ceramic Shield panel that, per iFixit, only gives access to the wireless charging assembly. Damage to the aluminium itself is a housing job, not a glass swap.",
      ],
      "screen-replacement": [
        "iFixit found the 17 Pro opens from the front, by removing the display — earlier Pro models were opened from the back glass. Any internal work on the 17 Pro therefore starts with careful display removal.",
      ],
      "charging-port-service": [
        "iFixit counted 22 screws to reach the 17 Pro's USB-C port, so a port replacement is a longer job than on many earlier models.",
      ],
      "battery-replacement": [
        "The 17 Pro's battery sits in a metal tray secured with screws and electrically debonding adhesive — iFixit cited this as the main reason for its improved repairability score.",
      ],
      "chip-level-service": [
        "The 17 Pro has a vapour chamber above the A19 Pro chip that spreads heat into the chassis. Overheating complaints should be checked against that cooling path before blaming the chip.",
      ],
    },
    specSource: { label: "iFixit iPhone 17 Pro teardown", href: "https://www.ifixit.com/News/113388/iphone-17-pro-teardown" },
  },
  {
    slug: "iphone-17-pro-max", name: "iPhone 17 Pro Max", generation: 17, tier: "pro-max",
    released: "2025-09-19", releasedLabel: "September 2025", chip: "A19 Pro",
    display: { size: "6.9-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield 2", frame: "aluminium unibody", back: "unibody-inset", backFinish: "aluminium unibody with a Ceramic Shield glass section",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Fusion Main", "48MP Fusion Ultra Wide", "48MP Telephoto (4x tetraprism)"], frontCamera: "18MP Center Stage", lidar: true,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "unverified",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)",
    notes: {
      "back-panel-replacement": [
        "Like the 17 Pro, the 17 Pro Max has an aluminium unibody with only a small Ceramic Shield glass section on the back. Dents or scratches in the aluminium can't be fixed by replacing glass.",
      ],
      "camera-service": [
        "All three rear cameras on the 17 Pro Max are 48MP, including the 4x tetraprism telephoto. The camera plateau spans the width of the phone, so a knock can damage more than one lens cover at once.",
      ],
    },
  },
  {
    slug: "iphone-17e", name: "iPhone 17e", generation: 17, tier: "e",
    released: "2026-03-11", releasedLabel: "March 2026", chip: "A19",
    display: { size: "6.1-inch", tech: "OLED", brand: "Super Retina XDR", promotion: false, alwaysOn: false, cutout: "notch" },
    frontGlass: "Ceramic Shield 2", frame: "aluminium", back: "glass-removable", backFinish: "glass back",
    connector: "USB-C", usbSpeed: "USB 2", magsafe: true,
    rearCameras: ["48MP Fusion (with 2x telephoto option)"], frontCamera: "12MP TrueDepth with autofocus", lidar: false,
    cameraControl: false, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "unverified",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)", modem: "Apple C1X",
    notes: {
      "charging-port-service": [
        "The 17e added MagSafe (up to 15 W), which the 16e lacked. If MagSafe accessories won't stay attached to a 17e, check the case first, then test the wireless charging coil.",
      ],
      "battery-replacement": [
        "We haven't been able to verify the 17e's internal battery design from a published teardown yet, so we confirm the procedure during inspection rather than assume it matches the 16e.",
      ],
    },
    specSource: { label: "Apple iPhone 17e tech specs", href: "https://www.apple.com/iphone-17e/specs/" },
  },

  // ── iPhone 18 Pro generation (Sep 2026) ────────────────────────────────
  {
    slug: "iphone-18-pro", name: "iPhone 18 Pro", generation: 18, tier: "pro",
    released: "2026-09-18", releasedLabel: "September 2026", chip: "A20 Pro",
    display: { size: "6.3-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield 2", frame: "aluminium unibody", back: "unibody-inset", backFinish: "aluminium unibody with a Ceramic Shield back",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Fusion Main with variable aperture", "48MP Ultra Wide", "48MP Telephoto (4x tetraprism)"], frontCamera: "18MP Center Stage", lidar: true,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "unverified",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)", modem: "Apple C2",
    notes: {
      "camera-service": [
        "The 18 Pro's main camera has a mechanical variable aperture with six blades (Apple lists f/1.48 to f/4). A sticking aperture would show as photos that are consistently too bright or too dark in Pro controls — a new kind of fault that didn't exist on earlier iPhones.",
        "Apple warns that on iPhone 18 Pro models with non-genuine parts, privacy indicators may not work as designed: the camera might be disabled, and the LED flash may blink when the microphone is in use.",
      ],
      "screen-replacement": [
        "Apple says non-genuine parts on iPhone 18 Pro models can affect privacy indicators, so on this model the choice of display and camera parts matters for more than picture quality.",
      ],
    },
    specSource: { label: "Apple iPhone 18 Pro tech specs", href: "https://www.apple.com/iphone-18-pro/specs/" },
  },
  {
    slug: "iphone-18-pro-max", name: "iPhone 18 Pro Max", generation: 18, tier: "pro-max",
    released: "2026-09-18", releasedLabel: "September 2026", chip: "A20 Pro",
    display: { size: "6.9-inch", tech: "OLED", brand: "Super Retina XDR with ProMotion and Always-On", promotion: true, alwaysOn: true, cutout: "dynamic-island" },
    frontGlass: "Ceramic Shield 2", frame: "aluminium unibody", back: "unibody-inset", backFinish: "aluminium unibody with a Ceramic Shield back",
    connector: "USB-C", usbSpeed: "USB 3", magsafe: true,
    rearCameras: ["48MP Fusion Main with variable aperture", "48MP Ultra Wide", "48MP Telephoto (4x tetraprism)"], frontCamera: "18MP Center Stage", lidar: true,
    cameraControl: true, actionButton: true, batteryCycleTarget: 1000, batteryRemoval: "unverified",
    partsHistory: FULL_HISTORY, water: "IP68 (up to 6 metres for 30 minutes)", modem: "Apple C2",
    notes: {
      "camera-service": [
        "The 18 Pro Max shares the 18 Pro's variable-aperture main camera. Apple's support documentation notes that non-genuine parts on iPhone 18 Pro models can disable the camera or make the flash blink when the microphone is in use.",
      ],
      "screen-replacement": [
        "The 18 Pro Max has a 6.9-inch panel with a smaller Dynamic Island than the 17 Pro Max, so it needs its own display part rather than a 17 Pro Max screen.",
      ],
    },
    specSource: { label: "Apple iPhone 18 Pro tech specs", href: "https://www.apple.com/iphone-18-pro/specs/" },
  },
];

export function getIphoneModel(slug: string): IphoneModel | undefined {
  return iphoneModels.find((m) => m.slug === slug);
}

/** Other models in the same generation, e.g. iPhone 15 → 15 Plus, 15 Pro, 15 Pro Max. */
export function getSiblingModels(model: IphoneModel): IphoneModel[] {
  return iphoneModels.filter((m) => m.generation === model.generation && m.slug !== model.slug);
}

/** Same tier in the previous and next generation, for "compare" links. */
export function getAdjacentModels(model: IphoneModel): IphoneModel[] {
  const sameTier = iphoneModels.filter((m) => m.tier === model.tier);
  const prev = sameTier.filter((m) => m.generation < model.generation).sort((a, b) => b.generation - a.generation)[0];
  const next = sameTier.filter((m) => m.generation > model.generation).sort((a, b) => a.generation - b.generation)[0];
  return [prev, next].filter(Boolean) as IphoneModel[];
}
