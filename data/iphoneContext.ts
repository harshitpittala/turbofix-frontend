/**
 * iphoneContext.ts — handwritten, verified context per iPhone generation and
 * per model tier, for each service. Combined with the per-model notes in
 * iphoneModels.ts this is what makes each /[model]/[service] page distinct.
 *
 * Same rules as iphoneModels.ts: verified facts only, no prices, times or
 * capability claims. Sources: Apple newsroom/spec/support pages and iFixit
 * teardowns (see iphoneModels.ts header).
 */
import type { IphoneModel, IphoneServiceSlug } from "./iphoneModels";

type Ctx = Partial<Record<IphoneServiceSlug, string>>;

/** One paragraph per generation × service. {m} is replaced with the model name. */
export const GENERATION_CONTEXT: Record<number, { label: string; ctx: Ctx }> = {
  11: {
    label: "iPhone 11 series (2019)",
    ctx: {
      "screen-replacement": "The iPhone 11 series was the first where iOS flags a display that it can't verify as genuine. On the 11 the panel is an LCD; on the 11 Pro and 11 Pro Max it's OLED, so the same drop can produce quite different symptoms across the three phones.",
      "battery-replacement": "These are the oldest phones in this range, launched in 2019. Most original iPhone 11-series batteries have long passed Apple's 500-cycle design target, so a worn battery is the most likely explanation for short runtime or sudden shutdowns on the {m}.",
      "charging-port-service": "All iPhone 11 models charge over Lightning and support Qi wireless charging but not MagSafe, which arrived with the iPhone 12. A {m} that charges on a Qi pad but not on a cable is a strong hint that the Lightning port or cable is at fault.",
      "camera-service": "The iPhone 11 series added an Ultra Wide camera across the whole line-up and introduced Night mode. iOS on these models doesn't track cameras in Parts and Service History — that started with the iPhone 12 — so a replaced camera on the {m} won't show an \"Unknown Part\" entry.",
      "speaker-microphone-service": "The iPhone 11 series introduced spatial audio and Dolby Atmos playback through the built-in stereo speakers. After years of pocket use, clogged grilles and earpiece mesh are a common reason a {m} sounds quieter than it used to.",
      "back-panel-replacement": "The iPhone 11 series introduced the square camera bump and, like every iPhone up to the iPhone 13, glues the back glass directly into the frame. That bonded construction is why back glass work on the {m} takes longer than on an iPhone 15.",
      "motherboard-replacement": "The iPhone 11 series uses the A13 Bionic and was the last iPhone generation with an Intel modem. Parts and Service History on these models tracks only the battery and display, so a board swap won't be flagged there — but data and Face ID still don't transfer.",
      "chip-level-service": "With the A13 Bionic, an Intel modem and Apple's U1 Ultra Wideband chip, the iPhone 11 series has a different board layout from later models. Its age means liquid exposure and worn charging circuitry are typical reasons a {m} ends up needing board-level diagnosis.",
    },
  },
  12: {
    label: "iPhone 12 series (2020)",
    ctx: {
      "screen-replacement": "The iPhone 12 series moved the whole line-up to OLED and introduced Ceramic Shield front glass. It was also the first generation where iOS tracks the display, battery, cameras and logic board in Parts and Service History, so a non-genuine screen on the {m} is recorded there.",
      "battery-replacement": "Apple shipped the iPhone 12 series without a charger in the box, so many owners use a mix of third-party adapters and cables. A poor-quality adapter can mimic battery problems; we test the {m} with a known-good charger before recommending a new battery.",
      "charging-port-service": "The iPhone 12 series introduced MagSafe while keeping Lightning. That gives the {m} two independent charging paths, which makes it easier to tell a port fault (MagSafe works, cable doesn't) from a battery or board fault (neither works).",
      "camera-service": "From the iPhone 12 onwards, iOS lists the front and rear cameras in Parts and Service History. A camera that isn't a genuine Apple part fitted through Apple's process shows as \"Unknown Part\" on the {m} — something worth knowing if you plan to resell.",
      "speaker-microphone-service": "The iPhone 12 series has flat edges and a slim earpiece slot at the top of the screen. Dust packs into that slot, and a {m} with quiet calls but a normal loudspeaker often just needs the earpiece mesh cleaned.",
      "back-panel-replacement": "The iPhone 12 series kept glass backs glued to the frame and added MagSafe magnets behind the glass. Back glass work on the {m} has to protect the MagSafe ring and wireless coil, which we test afterwards.",
      "motherboard-replacement": "The iPhone 12 series were the first 5G iPhones, using the A14 Bionic and a Qualcomm modem. The logic board appears in Parts and Service History from this generation, and Apple says a replaced, unverified board can affect features such as Apple Pay.",
      "chip-level-service": "As the first 5G iPhones, the iPhone 12 series added more radio hardware to the logic board. No-service or 5G-only faults on a {m} need board-level diagnosis rather than a new SIM tray or software reset once the basics are ruled out.",
    },
  },
  13: {
    label: "iPhone 13 series (2021)",
    ctx: {
      "screen-replacement": "The iPhone 13 series shrank the notch and brought ProMotion to the Pro models. When these phones launched, iFixit reported that a screen swap without moving a small chip from the original display disabled Face ID; Apple later changed this in a software update. Keep the {m} on current iOS before and after any screen work.",
      "battery-replacement": "Apple said the iPhone 13 series gained longer battery life than the iPhone 12 series. Even so, these phones are several years old and still use Apple's 500-cycle design target, so many {m} batteries are at or past that point.",
      "charging-port-service": "The iPhone 13 series still uses Lightning with MagSafe. If a {m} shows the liquid-detection alert repeatedly on a dry phone, there may be corrosion inside the Lightning port that cleaning alone won't clear.",
      "camera-service": "The iPhone 13 series added sensor-shift stabilisation to every model and Cinematic mode video. Sensor-shift moves the sensor itself, so a {m} with jittery video or a faint buzz from the camera points at the stabiliser rather than the lens.",
      "speaker-microphone-service": "The iPhone 13 series moved the earpiece to the top edge of the frame to shrink the notch. That slim opening collects dust, and cleaning it carefully is often the first step when calls on a {m} sound muffled.",
      "back-panel-replacement": "The iPhone 13 series was the last generation where every model has back glass bonded into the housing. A year later the iPhone 14 and 14 Plus switched to removable back glass, which is why the {m} needs a more involved back job.",
      "motherboard-replacement": "The iPhone 13 series uses the A15 Bionic with a Qualcomm 5G modem. The logic board is listed in Parts and Service History, so a replacement board on a {m} is recorded there and Face ID won't carry over.",
      "chip-level-service": "The iPhone 13 series packs the A15 Bionic and 5G radios onto a stacked logic board. Board-level work on a {m} often means separating the two layers, which needs proper equipment and experience.",
    },
  },
  14: {
    label: "iPhone 14 series (2022)",
    ctx: {
      "screen-replacement": "The iPhone 14 series split in two: the 14 and 14 Plus kept a notch and a 60 Hz panel, while the 14 Pro and Pro Max introduced the Dynamic Island and an Always-On display. The 14 and 14 Plus were also redesigned inside so both the screen and the back glass come off separately.",
      "battery-replacement": "The iPhone 14 series is the last generation with Apple's 500-cycle design target; from the iPhone 15 onwards the figure is 1,000 cycles. A {m} that has seen daily use since launch is likely to show reduced Battery Health by now.",
      "charging-port-service": "The iPhone 14 series was the last to use Lightning before the switch to USB-C. If you've moved to USB-C for your other devices, make sure the cable you test the {m} with is a known-good Lightning cable, not an adapter.",
      "camera-service": "The iPhone 14 series added autofocus to the front TrueDepth camera on every model, and the Pro models moved to a 48MP main camera. A soft-focus selfie on a {m} can be an autofocus fault rather than a smudge.",
      "speaker-microphone-service": "The iPhone 14 series added Crash Detection, which relies partly on the microphones to detect the sound of a crash. That's another reason to make sure every microphone on a {m} works after any audio service.",
      "back-panel-replacement": "The iPhone 14 and 14 Plus were redesigned with a removable back glass, while the 14 Pro and 14 Pro Max kept glass bonded to the housing. That split is unusual within one generation, so check which group the {m} belongs to before comparing quotes.",
      "motherboard-replacement": "The iPhone 14 and 14 Plus use the A15 Bionic, the same chip family as the iPhone 13 Pro; the 14 Pro and 14 Pro Max use the newer A16 Bionic. Their boards are not interchangeable, and Face ID stays paired to the original board.",
      "chip-level-service": "The iPhone 14 series is the last generation with Lightning charging circuitry. Charging faults that survive a new port on a {m} usually trace back to that circuitry or to power management on the board.",
    },
  },
  15: {
    label: "iPhone 15 series (2023)",
    ctx: {
      "screen-replacement": "Every iPhone 15 model has the Dynamic Island; only the 15 Pro and 15 Pro Max add ProMotion and Always-On. All four were built with the internal design that lets the screen and back glass be removed separately.",
      "battery-replacement": "From the iPhone 15 series, Apple designs batteries to keep 80% capacity at 1,000 cycles rather than 500, and iOS shows the cycle count and first-use date. That makes it much easier to judge whether a {m} battery is genuinely worn.",
      "charging-port-service": "The iPhone 15 series replaced Lightning with USB-C. The 15 and 15 Plus run at USB 2 speeds; the 15 Pro and 15 Pro Max support USB 3 with the right cable. Data speed differences between them are by design, not a port fault.",
      "camera-service": "The iPhone 15 series brought a 48MP main camera to the standard models, and the 15 Pro Max introduced the 5x tetraprism telephoto. Cameras are tracked in Parts and Service History, so a replacement on the {m} is recorded there.",
      "speaker-microphone-service": "The iPhone 15 Pro models added the Action button, replacing the ring/silent switch. If a {m} seems silent for notifications, check whether Silent mode is on before assuming a speaker fault.",
      "back-panel-replacement": "All iPhone 15 models have removable back glass. On the 15 Pro and 15 Pro Max that sits inside a titanium band over an aluminium internal frame; on the 15 and 15 Plus the back is colour-infused glass on aluminium.",
      "motherboard-replacement": "The iPhone 15 and 15 Plus use the A16 Bionic, while the 15 Pro and 15 Pro Max introduced the A17 Pro. The logic board is tracked in Parts and Service History and Face ID remains paired to it.",
      "chip-level-service": "The iPhone 15 series moved to USB-C, which changed the charging circuitry compared with earlier Lightning models. A {m} that won't charge after a known-good cable, adapter and port check needs board-level diagnosis.",
    },
  },
  16: {
    label: "iPhone 16 line-up (2024–25)",
    ctx: {
      "screen-replacement": "The iPhone 16 Pro and Pro Max grew to 6.3 and 6.9 inches, while the 16 and 16 Plus stayed at 6.1 and 6.7 inches with the Dynamic Island. The iPhone 16e, launched in February 2025, uses a 6.1-inch notched display instead.",
      "battery-replacement": "The iPhone 16, 16 Plus and 16e use battery adhesive that releases with a low voltage, while iFixit found the 16 Pro and 16 Pro Max do not. That split means battery work on the {m} follows a procedure specific to its group.",
      "charging-port-service": "Every iPhone 16 model uses USB-C, but only the Pro models support USB 3 speeds, and the 16e drops MagSafe entirely. Knowing which applies to the {m} avoids chasing faults that are really design differences.",
      "camera-service": "The iPhone 16, 16 Plus, 16 Pro and 16 Pro Max added the Camera Control button; the 16e did not. On models that have it, Camera Control is a separate part from the cameras and can fail on its own.",
      "speaker-microphone-service": "Apple introduced Audio Mix for video editing on the iPhone 16 line-up, which relies on the phone's microphones capturing clean audio. Distorted or one-sided recordings on a {m} are worth testing microphone by microphone.",
      "back-panel-replacement": "All iPhone 16 models have back glass that can be replaced on its own. The Pro models use textured matte glass with a titanium frame; the 16 and 16 Plus use colour-infused glass with aluminium.",
      "motherboard-replacement": "The iPhone 16, 16 Plus and 16e use the A18, the 16 Pro models the A18 Pro, and the 16e was the first iPhone with Apple's own C1 modem. These boards aren't interchangeable even within the same generation.",
      "chip-level-service": "The iPhone 16 line-up mixes Qualcomm modems (16, 16 Plus, 16 Pro models) with Apple's C1 (16e). Network faults are therefore diagnosed differently depending on which {m} variant is on the bench.",
    },
  },
  17: {
    label: "iPhone 17 generation (2025–26)",
    ctx: {
      "screen-replacement": "The iPhone 17 generation brought ProMotion and Always-On to the standard iPhone 17 and the iPhone Air, and moved to Ceramic Shield 2 front glass. iFixit found the 17 Pro now opens from the front, so its display comes off first for most internal work.",
      "battery-replacement": "iFixit's teardowns of the iPhone 17 and 17 Pro found batteries mounted on metal trays held by screws and electrically debonding adhesive, and the iPhone Air also uses electrical release. Battery work in this generation is more controlled than on older pull-tab designs.",
      "charging-port-service": "The iPhone 17 generation is all USB-C. The iPhone 17, Air and 17e run at USB 2 speeds and the 17 Pro models at USB 3. The 17e added MagSafe, which the 16e lacked.",
      "camera-service": "The iPhone 17, Air and 17 Pro models moved to an 18MP Center Stage front camera, while the 17e keeps a 12MP TrueDepth camera. The 17 Pro models use three 48MP rear cameras, including a 4x tetraprism telephoto.",
      "speaker-microphone-service": "Apple's spec sheets list stereo speakers for the iPhone 17, 17 Pro models and 17e, but only a built-in speaker for the iPhone Air. Each model's audio layout should be judged against its own spec, not against its siblings.",
      "back-panel-replacement": "The iPhone 17 generation is the most varied yet for back construction: glass on aluminium (17, 17e), Ceramic Shield glass on titanium (Air) and an aluminium unibody with a glass section (17 Pro and 17 Pro Max).",
      "motherboard-replacement": "The iPhone 17 and 17e use the A19 chip and the Air and 17 Pro models the A19 Pro; the Air and 17e use Apple's C1X modem. With so many board variants, a replacement board has to match the exact {m} model.",
      "chip-level-service": "iFixit found a vapour chamber above the A19 Pro in the 17 Pro, spreading heat into the chassis. Thermal complaints on 17-generation phones should be checked against each model's cooling design before blaming the chip.",
    },
  },
  18: {
    label: "iPhone 18 Pro models (September 2026)",
    ctx: {
      "screen-replacement": "Apple launched only the iPhone 18 Pro and 18 Pro Max in September 2026, with a smaller Dynamic Island than the 17 Pro models. Apple's support documentation says non-genuine parts on iPhone 18 Pro models can affect privacy indicators, so the part choice matters more than usual.",
      "battery-replacement": "No independent teardown of the iPhone 18 Pro battery design had been verified when this page was written, so we confirm the removal procedure during inspection. As a 2026 model it uses Apple's 1,000-cycle design target, so genuine wear this early is unlikely — sudden drain on a new {m} deserves a diagnosis first.",
      "charging-port-service": "The iPhone 18 Pro models use USB-C at USB 3 speeds and support MagSafe and Qi2 wireless charging up to 25 W. Apple says they charge to 50% in about 15 minutes with a suitable wired adapter — slower charging usually points to the adapter or cable first.",
      "camera-service": "The iPhone 18 Pro models introduced a variable-aperture 48MP main camera with six blades, alongside 48MP Ultra Wide and 4x tetraprism telephoto cameras and an 18MP Center Stage front camera. A mechanical aperture is new to iPhone, and so are the faults it could develop.",
      "speaker-microphone-service": "Apple's spec sheet lists stereo speakers and multiple microphones for the iPhone 18 Pro models. Apple also warns that with non-genuine parts the LED flash may blink when the microphone is in use, which is a privacy-indicator behaviour rather than an audio fault.",
      "back-panel-replacement": "The iPhone 18 Pro models use an aluminium unibody with a Ceramic Shield back. As with the 17 Pro models, glass damage and damage to the aluminium body are different jobs.",
      "motherboard-replacement": "The iPhone 18 Pro models use the A20 Pro chip, Apple's C2 modem and the N1 wireless chip. Logic boards for a model this new are unlikely to be available outside Apple's own channels in the first months.",
      "chip-level-service": "The iPhone 18 Pro models pair the A20 Pro with Apple's C2 modem, N1 wireless chip and a next-generation vapour chamber. Board-level documentation for brand-new models is limited, so any board diagnosis on a {m} starts with confirming what can realistically be done.",
    },
  },
};

/** Short tier-level notes: what being a mini / Plus / Pro / Pro Max / e / Air means for each service. */
export const TIER_CONTEXT: Record<IphoneModel["tier"], Ctx> = {
  mini: {
    "screen-replacement": "Mini models pack the same features into a 5.4-inch body, so cables around the display are short and opening needs extra care.",
    "battery-replacement": "Mini models have the smallest batteries in their generation, so they reach the point of not lasting a day sooner.",
  },
  standard: {
    "screen-replacement": "Standard models share their screen size with the Pro model of the same generation in several years, but the panels usually differ in refresh rate or cut-out, so they aren't interchangeable.",
    "camera-service": "Standard models have no telephoto camera; 2x zoom on recent ones is taken from the main sensor, so a bad 2x photo means looking at the main camera.",
  },
  plus: {
    "screen-replacement": "Plus models have a large 6.7-inch screen without the Pro features, which makes their panel a separate part from the same-size Pro Max.",
    "battery-replacement": "Plus models have larger batteries than the standard model of the same generation, so for the same daily use they complete fewer full charge cycles.",
  },
  pro: {
    "camera-service": "Pro models carry a telephoto camera and a LiDAR Scanner on top of the Wide and Ultra Wide, so there are more modules to test individually.",
    "back-panel-replacement": "Pro models use different frame materials from the standard model of the same year, which affects how the back is removed and finished.",
    "chip-level-service": "Pro models use the Pro version of each year's chip and, from the iPhone 15 Pro onwards, faster USB 3 controllers — more circuitry to check when diagnosing charging or data faults.",
  },
  "pro-max": {
    "screen-replacement": "Pro Max models have the largest panel in their generation, so a Pro Max screen is always its own part — never shared with the smaller Pro.",
    "battery-replacement": "Pro Max models have the largest battery in their generation, so a worn Pro Max battery can still outlast a newer standard model — Battery Health is a better guide than runtime alone.",
    "camera-service": "Pro Max models have sometimes had camera hardware the smaller Pro lacked (the 12 Pro Max's sensor-shift camera, the 15 Pro Max's 5x telephoto), so check that any camera part is for the Pro Max specifically.",
  },
  e: {
    "camera-service": "The \"e\" models have a single rear camera, so there's no separate Ultra Wide or telephoto to fail — every rear camera problem comes back to one module.",
    "charging-port-service": "The \"e\" models launched in spring as lower-cost iPhones, with some features trimmed — the 16e had no MagSafe, which the 17e then added back.",
    "screen-replacement": "The \"e\" models use a 6.1-inch notched OLED display rather than the Dynamic Island screens of the same-year standard models.",
  },
  air: {
    "screen-replacement": "The Air's thin body leaves very little room behind the display, so opening it needs particular care; iFixit found the screen itself straightforward to replace.",
    "battery-replacement": "The Air's battery is shaped to fit its very thin body, which is why iFixit described the battery as the trickiest part of working on it.",
    "back-panel-replacement": "The Air's back is Ceramic Shield glass rather than standard glass, which makes it more scratch-resistant but doesn't stop cracks from a hard drop.",
  },
};

/** Features to test after any service, driven by the model's hardware. */
export function postServiceChecks(m: IphoneModel, s: IphoneServiceSlug): string[] {
  const checks: string[] = [];
  const add = (cond: boolean, text: string) => { if (cond) checks.push(text); };
  const screenish = s === "screen-replacement" || s === "camera-service" || s === "motherboard-replacement" || s === "chip-level-service";
  add(true, "Face ID set-up and unlock");
  add(screenish && m.display.promotion, "120 Hz ProMotion scrolling");
  add(screenish && m.display.alwaysOn, "Always-On display when the phone is locked");
  add(screenish && m.display.cutout === "dynamic-island", "Dynamic Island animations and Live Activities");
  add(screenish && m.display.tech === "LCD", "Even backlight across the LCD");
  add(s !== "speaker-microphone-service" && s !== "screen-replacement", `${m.connector} charging with a reference cable`);
  add(m.magsafe && s !== "speaker-microphone-service", "MagSafe alignment and wireless charging");
  add(!m.magsafe, "Qi wireless charging");
  add(m.cameraControl && (s === "camera-service" || s === "screen-replacement" || s === "motherboard-replacement"), "Camera Control button press and swipe");
  add(m.actionButton, "Action button");
  add(!m.actionButton, "Ring/Silent switch");
  add(m.lidar && (s === "camera-service" || s === "back-panel-replacement" || s === "motherboard-replacement"), "LiDAR-assisted Portrait mode");
  add(m.frontCamera.includes("Center Stage") && (s === "camera-service" || s === "screen-replacement"), "Center Stage framing on the front camera");
  add(m.usbSpeed === "USB 3" && (s === "charging-port-service" || s === "chip-level-service"), "USB 3 data transfer with a USB 3 cable");
  add(s === "speaker-microphone-service" || s === "charging-port-service" || s === "motherboard-replacement" || s === "chip-level-service", "Calls on earpiece and speakerphone, and Voice Memo recording");
  add(s === "motherboard-replacement" || s === "chip-level-service", `Mobile data${m.generation >= 12 ? " including 5G where available" : ""}, Wi-Fi and Bluetooth`);
  add(m.partsHistory.includes("Display") && s === "screen-replacement", `Parts and Service History entry for the display`);
  add(m.partsHistory.includes("Rear cameras") && s === "camera-service", `Parts and Service History entries for the cameras`);
  return checks;
}

export function generationContext(m: IphoneModel, s: IphoneServiceSlug): { label: string; text: string } | undefined {
  const g = GENERATION_CONTEXT[m.generation];
  const t = g?.ctx[s];
  return t ? { label: g.label, text: t.replaceAll("{m}", m.name) } : undefined;
}

export function tierContext(m: IphoneModel, s: IphoneServiceSlug): string | undefined {
  return TIER_CONTEXT[m.tier]?.[s];
}
