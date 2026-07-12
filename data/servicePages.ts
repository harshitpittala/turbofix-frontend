export interface ServicePageData {
  slug: string;          // URL path: screen-replacement-hyderabad
  name: string;          // Screen Replacement
  h1: string;            // Mobile Screen Replacement in Hyderabad
  tagline: string;
  intro: string;
  whyNeeded: string;     // paragraph explaining the problem this service solves
  symptoms: string[];    // list: signs you need this service
  process: { step: string; title: string; desc: string }[];
  priceRange: string;
  repairTime: string;
  warranty: string;
  affectedBrands: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  relatedServiceSlugs: string[];
  repairType: string;    // for schema serviceType
}

export const servicePages: ServicePageData[] = [
  {
    slug: "screen-replacement-hyderabad",
    name: "Screen Replacement",
    h1: "Mobile Screen Replacement in Hyderabad",
    tagline: "Cracked screen? We resolve it at your door in 30–45 minutes.",
    intro:
      "A cracked or shattered phone screen doesn't mean the end of your device. TurboFix brings professional screen replacement service directly to your home or office across Hyderabad — using OEM-quality displays that restore original brightness, colour accuracy, and touch sensitivity.",
    whyNeeded:
      "Phone screens are the most commonly damaged component — drops, pressure, and impacts break the glass and damage the display layers underneath. A broken screen isn't just cosmetic: touch unresponsiveness, dead pixels, or screen blackout make the phone unusable. Delaying the replacement risks further internal damage from exposed components.",
    symptoms: [
      "Cracked or shattered glass on the front panel",
      "Black spots, bleeding ink, or discolouration on the display",
      "Unresponsive touch zones or ghost touches",
      "Dead pixels or lines across the screen",
      "Screen flickers, goes dim, or turns completely black",
      "Display works but glass is broken and sharp",
    ],
    process: [
      { step: "01", title: "Free Diagnosis", desc: "Our technician assesses the damage — cracked glass only, full display, or touch digitizer — and provides a firm quote before starting." },
      { step: "02", title: "Component Sourcing Confirmed", desc: "We carry OEM-grade screens for most popular models on the van. Rare models may require same-day courier sourcing." },
      { step: "03", title: "Screen Replacement", desc: "Careful disassembly, removal of the broken screen, installation of the new display with proper adhesive and alignment." },
      { step: "04", title: "Full Calibration Test", desc: "Touch response, brightness levels, auto-brightness sensor, Face ID / fingerprint sensor, and proximity sensor all tested before handover." },
    ],
    priceRange: "₹999 – ₹8,999",
    repairTime: "30–45 minutes",
    warranty: "6 months on screen and workmanship",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "What is the cost of screen replacement in Hyderabad?", a: "Screen replacement at TurboFix costs ₹999–₹8,999 depending on the model. iPhone OLED screens and Samsung Ultra AMOLED displays are at the higher end. Basic Android screens start from ₹999. You receive the exact quote before work begins." },
      { q: "How long does screen replacement take at your doorstep?", a: "Most screen replacements take 30–45 minutes at your home or office. We carry common screen models on our service vehicle, so there's no waiting." },
      { q: "Will Face ID still work after an iPhone screen replacement?", a: "Yes — TurboFix technicians preserve the Face ID sensor and TrueDepth camera module during screen replacement. We do not damage the Face ID components." },
      { q: "Is OEM screen the same quality as the original?", a: "OEM-quality (Original Equipment Manufacturer) screens are made by the same factories that supply the phone brands, using identical specifications. The colour accuracy, brightness, and touch sensitivity are equivalent to the original." },
      { q: "Do you replace just the glass or the full display assembly?", a: "We typically replace the full display assembly (glass + digitizer + LCD/OLED) as this gives the best quality result. Glass-only replacement is available for certain models on request." },
      { q: "Can you replace my phone screen at my office in HITEC City?", a: "Yes — we serve all Hyderabad locations including HITEC City, Gachibowli, Madhapur, and all major areas. Book a slot and we arrive at your office reception or desk." },
    ],
    keywords: [
      "screen replacement hyderabad", "mobile screen replacement hyderabad",
      "phone screen replacement hyderabad", "cracked screen replacement hyderabad",
      "iphone screen replacement hyderabad", "samsung screen replacement hyderabad",
      "doorstep screen replacement hyderabad", "mobile display replacement hyderabad",
    ],
    relatedServiceSlugs: ["battery-replacement-hyderabad", "back-panel-replacement-hyderabad", "camera-service-hyderabad"],
    repairType: "Mobile Phone Screen Replacement",
  },

  {
    slug: "battery-replacement-hyderabad",
    name: "Battery Replacement",
    h1: "Mobile Battery Replacement in Hyderabad",
    tagline: "Fast battery drain or sudden shutdowns? New battery in 20 minutes.",
    intro:
      "All lithium-ion batteries degrade over time — typically losing significant capacity after 500 charge cycles. TurboFix brings same-day battery replacement to your doorstep across Hyderabad, restoring full-day battery life with OEM-quality batteries and a 6-month warranty.",
    whyNeeded:
      "A degraded battery doesn't just mean shorter battery life — it causes unexpected shutdowns, slow performance throttling (especially on iPhones), and eventually the battery may swell, which can warp the device body and damage other internal components. Replacing the battery at the right time extends your phone's usable life by 2–3 years.",
    symptoms: [
      "Phone battery drains from 100% to 0% in under 3–4 hours",
      "Phone shuts down unexpectedly at 20–30% battery",
      "Battery percentage jumps erratically (e.g., 60% to 10% in minutes)",
      "Phone won't charge past a certain percentage",
      "Device becomes very hot during charging",
      "Swollen battery causing back panel to bulge",
      "iPhone battery health below 80%",
    ],
    process: [
      { step: "01", title: "Battery Health Test", desc: "We run a diagnostic to confirm actual battery health percentage and charge cycle count before recommending replacement." },
      { step: "02", title: "Confirmed Quote", desc: "Battery replacement price varies by model. We confirm the exact cost before opening the device." },
      { step: "03", title: "Battery Swap", desc: "Safe disassembly, removal of the old battery with heat-based adhesive release, installation of the new OEM-quality battery." },
      { step: "04", title: "Charging & Runtime Test", desc: "New battery charged to 100%, fast-charge verified, and battery health percentage confirmed before handover." },
    ],
    priceRange: "₹699 – ₹3,999",
    repairTime: "20–30 minutes",
    warranty: "6 months on battery and workmanship",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "How much does battery replacement cost in Hyderabad?", a: "Battery replacement at TurboFix costs ₹699–₹3,999 depending on the model. iPhone battery replacement starts from ₹1,299. Samsung and OnePlus from ₹999. Budget Android models from ₹699." },
      { q: "How do I know if my phone battery needs to be replaced?", a: "Key signs: battery drains faster than normal, phone shuts down unexpectedly, battery percentage jumps erratically, or the phone back panel has a slight bulge. On iPhone, check Settings → Battery → Battery Health — below 80% strongly indicates replacement is needed." },
      { q: "Does battery replacement affect my phone's warranty?", a: "If your phone is still under manufacturer warranty, please check whether third-party service affects it. For out-of-warranty phones, our battery replacement comes with a 6-month TurboFix warranty." },
      { q: "Will fast charging still work after battery replacement?", a: "Yes — we use batteries compatible with your model's fast charging standard (SUPERVOOC, Warp Charge, Fast Charge, etc.) and verify fast charging after the visit." },
      { q: "Can you replace a swollen battery safely?", a: "Yes — swollen batteries are handled with care using proper tools and ventilation. Do not press or puncture a swollen battery. Book a visit immediately as swollen batteries are a fire risk." },
    ],
    keywords: [
      "battery replacement hyderabad", "mobile battery replacement hyderabad",
      "iphone battery replacement hyderabad", "samsung battery replacement hyderabad",
      "phone battery replacement hyderabad", "battery drain solutions hyderabad",
      "doorstep battery replacement hyderabad", "mobile battery service hyderabad",
    ],
    relatedServiceSlugs: ["screen-replacement-hyderabad", "charging-port-service-hyderabad", "motherboard-service-hyderabad"],
    repairType: "Mobile Phone Battery Replacement",
  },

  {
    slug: "charging-port-service-hyderabad",
    name: "Charging Port Service",
    h1: "Mobile Charging Port Service in Hyderabad",
    tagline: "Phone not charging? Loose port? Resolved in under 35 minutes.",
    intro:
      "A faulty charging port is one of the most frustrating phone problems — but it's also one of the most fixable. TurboFix technicians diagnose charging issues on-site, often resolving them with a thorough port cleaning at no extra charge. For genuine port damage, full port replacement is completed at your doorstep in under 35 minutes.",
    whyNeeded:
      "Charging ports accumulate lint, dust, and corrosion over time, causing intermittent or complete charging failure. Forcing bent or wrong-size cables can physically damage the pins. A fully dead charging port means the phone can't charge at all — leaving you without a working device unless serviced promptly.",
    symptoms: [
      "Phone only charges at certain angles",
      "Cable feels very loose in the charging port",
      "Phone charges intermittently — stops and starts on its own",
      "Phone doesn't charge at all despite trying multiple cables",
      "Wireless charging works but wired charging doesn't",
      "Computer doesn't recognise phone when connected via USB",
      "Fast charging stopped working suddenly",
    ],
    process: [
      { step: "01", title: "Port Inspection & Cleaning", desc: "First, we clean the port with a specialised non-conductive tool to remove lint and debris. Many charging problems are resolved at this step for free." },
      { step: "02", title: "Cable & Adapter Test", desc: "We test with standard reference cables to confirm the issue is the port, not the cable or adapter." },
      { step: "03", title: "Port Replacement (if needed)", desc: "If cleaning doesn't resolve it, we replace the USB-C or Lightning port module. Takes 25–35 minutes." },
      { step: "04", title: "Charging Verification", desc: "Fast charging, data transfer, and wired earphone pass-through (where applicable) all tested before handover." },
    ],
    priceRange: "₹499 – ₹2,999",
    repairTime: "25–35 minutes",
    warranty: "6 months on port and workmanship",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "How much does charging port service cost in Hyderabad?", a: "Charging port service at TurboFix costs ₹499–₹2,999 depending on whether cleaning resolves it or a full port replacement is needed. Cleaning-only service starts from ₹299." },
      { q: "Can lint in the charging port cause charging problems?", a: "Yes — accumulated lint and debris are the most common cause of intermittent charging. Our technician cleans the port first. If cleaning fixes it, no replacement is needed and the cost is minimal." },
      { q: "My phone charges wirelessly but not via cable — what's wrong?", a: "This almost always indicates a faulty USB-C or Lightning port. The wireless charging coil is a separate component and still works. Port service or replacement will restore wired charging." },
      { q: "Will data transfer work after port service?", a: "Yes — we verify USB data transfer functionality as part of our port service test protocol." },
    ],
    keywords: [
      "charging port service hyderabad", "phone not charging hyderabad",
      "mobile charging port service hyderabad", "usb port replacement hyderabad",
      "iphone charging port service hyderabad", "samsung charging port service hyderabad",
      "doorstep charging service hyderabad",
    ],
    relatedServiceSlugs: ["battery-replacement-hyderabad", "screen-replacement-hyderabad", "water-damage-hyderabad"],
    repairType: "Mobile Phone Charging Port Service",
  },

  {
    slug: "water-damage-hyderabad",
    name: "Water Damage Service",
    h1: "Water Damage Mobile Service in Hyderabad",
    tagline: "Phone dropped in water? Act fast — restoration is possible.",
    intro:
      "Water damage is time-critical — the longer liquid remains inside a phone, the more corrosion spreads across the motherboard. TurboFix's water damage service uses ultrasonic cleaning and professional drying equipment to maximise restoration rates, even for phones submerged for several minutes.",
    whyNeeded:
      "Modern phones with IP ratings can withstand brief water exposure, but even IP68 phones are not waterproof indefinitely — pressure, salt water, and repeated exposure degrade the seals. Phones without IP ratings are immediately vulnerable. Corrosion from water damage is progressive: a phone that 'seemed fine on its own' may fail weeks later from ongoing internal corrosion.",
    symptoms: [
      "Phone dropped in water, toilet, or rain",
      "Phone won't turn on after water exposure",
      "Display shows water marks or condensation under screen",
      "Speaker sounds muffled or distorted after water contact",
      "Phone turning on and off randomly after getting wet",
      "Charging port corroded or discoloured after liquid exposure",
      "Touch screen unresponsive or erratic after water contact",
    ],
    process: [
      { step: "01", title: "Immediate Power-Off", desc: "CRITICAL: Do not attempt to charge or turn on a water-damaged phone. Power off immediately and book a service visit. This prevents short-circuit damage." },
      { step: "02", title: "Full Disassembly & Inspection", desc: "Complete teardown to assess water ingress points, identify corroded components, and map the damage extent." },
      { step: "03", title: "Ultrasonic Cleaning", desc: "PCB and affected components cleaned with ultrasonic equipment and isopropyl alcohol to remove corrosive mineral deposits." },
      { step: "04", title: "Drying & Component Replacement", desc: "Professional drying process followed by replacement of any damaged components — battery, charging port, speaker modules as needed." },
    ],
    priceRange: "₹999 – ₹5,999",
    repairTime: "2–6 hours (same day for most cases)",
    warranty: "3 months (nature of water damage limits a longer warranty period)",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "Can a water-damaged phone be restored?", a: "Yes — in most cases, water-damaged phones can be fully restored if serviced promptly. Success rate depends on how long the phone was submerged, type of liquid (fresh water vs salt water), and how quickly the service process begins." },
      { q: "Should I put my phone in rice after water damage?", a: "Rice is not effective — it does not absorb internal moisture fast enough and can introduce dust into ports. The correct action is: power off immediately, do not charge, and bring to TurboFix for professional drying as soon as possible." },
      { q: "My phone worked after getting wet but stopped working a few days later — why?", a: "Corrosion from water damage is progressive. Even if a phone initially 'works', mineral deposits from the water corrode circuit board traces over hours or days. This is called latent water damage. It's important to have the phone professionally cleaned even if it seems fine initially." },
      { q: "How much does water damage service cost in Hyderabad?", a: "Water damage service at TurboFix starts from ₹999 for cleaning and assessment. Full restoration including component replacement costs ₹1,999–₹5,999 depending on damage extent." },
    ],
    keywords: [
      "water damage service hyderabad", "phone water damage service hyderabad",
      "mobile water damage hyderabad", "phone dropped in water hyderabad",
      "water damaged phone service hyderabad", "iphone water damage hyderabad",
      "doorstep water damage service hyderabad",
    ],
    relatedServiceSlugs: ["charging-port-service-hyderabad", "motherboard-service-hyderabad", "screen-replacement-hyderabad"],
    repairType: "Mobile Phone Water Damage Service",
  },

  {
    slug: "speaker-service-hyderabad",
    name: "Speaker & Mic Service",
    h1: "Mobile Speaker & Microphone Service in Hyderabad",
    tagline: "No sound, muffled audio, or mic issues? Resolved at your doorstep.",
    intro:
      "Speaker issues can range from completely silent to distorted or crackling audio — and microphone problems make calls and voice recordings unusable. TurboFix diagnoses and services all speaker, earpiece, and microphone issues across all major phone brands at your doorstep in Hyderabad.",
    whyNeeded:
      "Phone speakers and microphones are vulnerable to dust, moisture, and physical impact. A clogged speaker grille often mimics a broken speaker — our technician checks this first. For genuine component failure, speaker module replacement restores full audio quality including stereo separation, Dolby Atmos compatibility, and call clarity.",
    symptoms: [
      "No sound during calls or media playback",
      "Sound works only on loudspeaker but not earpiece (or vice versa)",
      "Audio is muffled, crackling, or distorted at any volume",
      "Caller can't hear you on calls (microphone issue)",
      "Voice recordings sound muffled or silent",
      "One side of stereo speakers stopped working",
      "Sound works only through headphones, not phone speaker",
    ],
    process: [
      { step: "01", title: "Speaker Grille Cleaning", desc: "We first clean the speaker and microphone meshes to check if blockage is causing the issue. This resolves many cases without any replacement." },
      { step: "02", title: "Audio Diagnostics", desc: "Software audio test to identify whether the issue is hardware (speaker module) or software (audio driver / settings)." },
      { step: "03", title: "Speaker Module Replacement", desc: "Replacement of the earpiece speaker, bottom loudspeaker, or microphone module as needed. Stereo speaker balance calibrated." },
      { step: "04", title: "Call Quality Test", desc: "Call audio, speakerphone, media playback, and microphone recording all tested before handover." },
    ],
    priceRange: "₹499 – ₹2,999",
    repairTime: "25–40 minutes",
    warranty: "6 months on speaker/mic and workmanship",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "How much does speaker service cost in Hyderabad?", a: "Speaker service at TurboFix costs ₹499–₹2,999. Simple cleaning is often ₹299–₹499. Full speaker module replacement costs ₹799–₹2,999 depending on the model." },
      { q: "Why does my phone speaker sound muffled?", a: "The most common cause is blocked speaker grilles from dust and lint accumulation — this is extremely common. Our technician cleans the speaker first. If the mesh is clear and the problem persists, the speaker module itself needs replacement." },
      { q: "Can you service my phone's microphone so people can hear me properly?", a: "Yes — microphone issues are commonly caused by blocked mic holes, moisture, or physical damage to the microphone module. We diagnose and service both earpiece mic and bottom microphone." },
    ],
    keywords: [
      "speaker service hyderabad", "mobile speaker service hyderabad",
      "phone speaker not working hyderabad", "microphone service hyderabad",
      "mobile mic service hyderabad", "earpiece replacement hyderabad",
      "doorstep speaker service hyderabad",
    ],
    relatedServiceSlugs: ["screen-replacement-hyderabad", "charging-port-service-hyderabad", "water-damage-hyderabad"],
    repairType: "Mobile Phone Speaker and Microphone Service",
  },

  {
    slug: "camera-service-hyderabad",
    name: "Camera Service",
    h1: "Mobile Camera Service in Hyderabad",
    tagline: "Blurry photos, cracked lens, or camera app crashing? Resolved at your door.",
    intro:
      "Modern smartphones carry multi-camera systems with complex optics and sensor technology. TurboFix handles camera module replacement, cracked lens replacement, and camera calibration for all brands in Hyderabad — at your doorstep with OEM-grade camera components.",
    whyNeeded:
      "Camera issues range from cracked outer glass (purely cosmetic but worsens image quality) to complete module failure (camera app crashes or shows black screen). Blurry photos can indicate autofocus motor failure. Leaving a cracked camera lens unaddressed allows dust and moisture to enter the camera module, causing more expensive damage.",
    symptoms: [
      "Camera lens glass cracked or shattered",
      "Photos come out blurry despite cleaning the lens",
      "Camera app crashes or shows a black screen",
      "Autofocus not working — photos never sharp",
      "One camera works but another doesn't (front/rear, telephoto)",
      "Camera has a persistent spot or smudge inside the lens",
      "Bokeh mode or portrait mode stopped working",
    ],
    process: [
      { step: "01", title: "Camera Diagnostics", desc: "We test all camera modules — front, rear wide, telephoto, macro — to identify exactly which component has failed." },
      { step: "02", title: "Lens or Module Replacement", desc: "Cracked outer lens glass replaced where possible. Full camera module replaced when the sensor or optics assembly has failed." },
      { step: "03", title: "Focus Calibration", desc: "After module replacement, autofocus, OIS (optical image stabilisation), and face detection are calibrated and tested." },
      { step: "04", title: "Image Quality Verification", desc: "Test photos taken in multiple lighting conditions to confirm sharpness, colour accuracy, and bokeh performance." },
    ],
    priceRange: "₹799 – ₹4,999",
    repairTime: "40–60 minutes",
    warranty: "6 months on camera module and workmanship",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "How much does camera service cost in Hyderabad?", a: "Camera service at TurboFix costs ₹799–₹4,999. Lens glass replacement is cheaper. Full camera module replacement for flagship phones (Pixel, iPhone Pro, Galaxy Ultra) is at the higher end." },
      { q: "My phone camera is blurry after dropping — what's wrong?", a: "A drop can dislodge the lens element or damage the OIS module, causing permanently blurry images. Autofocus motor damage is also common from drops. Camera module replacement will restore sharp image quality." },
      { q: "Will the camera performance be the same after service?", a: "With OEM-grade camera modules, image quality is equivalent to the original. We verify sharpness, colour accuracy, and special features (portrait mode, zoom) after every camera visit." },
      { q: "Can you replace only the cracked camera glass without replacing the full module?", a: "Yes — for many models, we can replace just the camera lens glass (the outer protective cover) if the sensor and optics underneath are undamaged. This is a more affordable option." },
    ],
    keywords: [
      "camera service hyderabad", "mobile camera service hyderabad",
      "phone camera replacement hyderabad", "camera not working hyderabad",
      "iphone camera service hyderabad", "samsung camera service hyderabad",
      "blurry camera fix hyderabad", "doorstep camera service hyderabad",
    ],
    relatedServiceSlugs: ["screen-replacement-hyderabad", "back-panel-replacement-hyderabad", "water-damage-hyderabad"],
    repairType: "Mobile Phone Camera Service",
  },

  {
    slug: "back-panel-replacement-hyderabad",
    name: "Back Panel Replacement",
    h1: "Mobile Back Panel & Back Glass Replacement in Hyderabad",
    tagline: "Shattered back glass or damaged back panel? Restored at your door.",
    intro:
      "Shattered back glass is both a cosmetic and functional problem — sharp edges, compromised wireless charging, and moisture ingress all result from a broken back panel. TurboFix replaces back glass and back panels for all major phones at your doorstep in Hyderabad, using correctly coloured OEM-quality panels.",
    whyNeeded:
      "Modern glass-back smartphones are as fragile on the rear as the front. Unlike older plastic-back phones, glass backs shatter under impact and cannot be ignored — sharp glass edges cause injuries, wireless charging efficiency drops significantly, and the integrity of the IP water resistance is broken. Back panel replacement at the right time prevents more expensive work down the line.",
    symptoms: [
      "Back glass cracked, shattered, or completely broken",
      "Back panel has dents, cracks, or structural damage",
      "Wireless charging stopped working or is inefficient",
      "Back panel has separated from the device frame",
      "Scratches or chips that expose internal components",
      "Back cover damaged from a drop but phone otherwise functional",
    ],
    process: [
      { step: "01", title: "Model & Colour Verification", desc: "We confirm your exact model and colour variant to ensure the replacement panel matches perfectly." },
      { step: "02", title: "Safe Glass Removal", desc: "Heat-based adhesive softening to safely remove the broken back panel without damaging the battery or internal components." },
      { step: "03", title: "New Panel Installation", desc: "New back panel installed with factory-grade adhesive and heat press bonding for a seamless finish." },
      { step: "04", title: "Wireless Charging Test", desc: "Wireless charging functionality verified after panel replacement. IP water-resistance adhesive re-sealed where applicable." },
    ],
    priceRange: "₹699 – ₹3,999",
    repairTime: "40–60 minutes",
    warranty: "6 months on panel and workmanship",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing Phone"],
    faqs: [
      { q: "How much does back panel replacement cost in Hyderabad?", a: "Back panel replacement at TurboFix costs ₹699–₹3,999. iPhone back glass replacement starts from ₹1,499. Samsung Galaxy glass back from ₹999. Budget Android plastic back panels from ₹699." },
      { q: "Does a cracked back glass affect wireless charging?", a: "Yes — cracks in the glass back reduce wireless charging efficiency significantly. The electromagnetic induction requires an intact glass layer for full power transfer. Replacing the back panel fully restores wireless charging performance." },
      { q: "Can you match the exact colour of my phone's back panel?", a: "We stock back panels in the most popular colours for major models. For uncommon colour variants, we may need 24–48 hours to source the correct panel." },
      { q: "Is back panel replacement risky for the battery?", a: "In experienced hands, back panel replacement is safe. Our technicians use proper heat tools and are trained to avoid the battery during removal." },
    ],
    keywords: [
      "back panel replacement hyderabad", "back glass replacement hyderabad",
      "phone back cover replacement hyderabad", "iphone back glass replacement hyderabad",
      "samsung back glass replacement hyderabad", "mobile back panel service hyderabad",
      "doorstep back panel service hyderabad",
    ],
    relatedServiceSlugs: ["screen-replacement-hyderabad", "camera-service-hyderabad", "water-damage-hyderabad"],
    repairType: "Mobile Phone Back Panel Replacement",
  },

  {
    slug: "motherboard-service-hyderabad",
    name: "Motherboard Service",
    h1: "Mobile Motherboard Service in Hyderabad",
    tagline: "Phone not powering on or restarting on its own? Component-level service available.",
    intro:
      "Motherboard service is the most complex form of mobile hardware work — requiring micro-soldering skills, component-level diagnostics, and specialist equipment. TurboFix offers component-level motherboard service in Hyderabad as an alternative to expensive phone replacement, successfully restoring phones that others declare beyond help.",
    whyNeeded:
      "The motherboard (main PCB) is the brain of the phone — it contains the processor, RAM, storage, and all key chips. Damage from drops, water, power surges, or component wear can make the phone completely non-functional. Replacing a motherboard is usually more expensive than the phone itself, making component-level service the only economical path.",
    symptoms: [
      "Phone does not power on at all despite charging",
      "Phone restarts repeatedly at the logo screen",
      "No signal — SIM not detected despite correct SIM",
      "Phone restarts randomly throughout the day",
      "Phone gets extremely hot near the processor area",
      "Screen doesn't respond though display is fine",
      "Apps crash constantly or phone resets itself unexpectedly",
    ],
    process: [
      { step: "01", title: "Component-Level Diagnosis", desc: "Full PCB inspection using specialised diagnostic equipment to identify the specific failed component — power IC, charging IC, CPU, baseband chip, or storage module." },
      { step: "02", title: "Service Assessment", desc: "We provide a detailed report on what's damaged, what's serviceable, success probability, and cost — before starting any work." },
      { step: "03", title: "Micro-Soldering Service", desc: "Component-level work under microscope — reballing, chip replacement, trace restoration, or pad restoration as required." },
      { step: "04", title: "Full Function Test", desc: "After service, all functions tested: power on, cellular signal, WiFi, touch, camera, charging, and general device stability." },
    ],
    priceRange: "₹2,999 – ₹12,999",
    repairTime: "1–3 days (complexity dependent)",
    warranty: "3 months (motherboard service complexity limits a longer warranty period)",
    affectedBrands: ["Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel"],
    faqs: [
      { q: "How much does motherboard service cost in Hyderabad?", a: "Motherboard service at TurboFix costs ₹2,999–₹12,999 depending on the specific component failure and complexity. We provide a detailed quote after diagnosis." },
      { q: "Is it worth servicing a phone motherboard?", a: "It depends on the phone's value and the service cost. For flagship phones (iPhone, Galaxy Ultra, OnePlus Pro) costing ₹50,000+, motherboard service at ₹3,000–₹8,000 is almost always worthwhile. We'll give you an honest assessment." },
      { q: "My phone doesn't power on at all — can it be serviced?", a: "In many cases, yes. A phone that won't power on is often caused by a failed power management IC, charging IC, or PCB trace damage — all addressable at the component level. We diagnose first and only proceed with your approval." },
      { q: "How long does motherboard service take?", a: "Motherboard service takes 1–3 working days depending on the specific fault. Complex chip-level work requires more time. We provide a timeline estimate after diagnosis." },
    ],
    keywords: [
      "motherboard service hyderabad", "mobile motherboard service hyderabad",
      "phone not turning on hyderabad", "phone restarting on its own hyderabad",
      "iphone motherboard service hyderabad", "samsung motherboard service hyderabad",
      "component level phone service hyderabad", "PCB service hyderabad",
    ],
    relatedServiceSlugs: ["water-damage-hyderabad", "battery-replacement-hyderabad", "screen-replacement-hyderabad"],
    repairType: "Mobile Phone Motherboard Service",
  },
];

export function getServicePageBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((s) => s.slug === slug);
}
