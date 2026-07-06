/**
 * Brand+City landing pages — targeted at high-intent keywords like
 * "iphone repair hyderabad", "samsung repair hyderabad" etc.
 *
 * These are separate from /repairs/[brand] (which focuses on the brand generally).
 * These pages are hyper-targeted at the Hyderabad search intent.
 */
export interface BrandCityPageData {
  slug: string;               // iphone-repair-hyderabad
  brand: string;              // iPhone
  brandSlug: string;          // apple → links to /repairs/apple
  h1: string;
  tagline: string;
  intro: string;
  whyHyderabad: string;       // unique paragraph about this brand in Hyderabad
  popularModels: string[];
  topRepairs: { name: string; desc: string; price: string }[];
  trustPoints: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  color: string;              // accent color for the page
}

export const brandCityPages: BrandCityPageData[] = [
  {
    slug: "iphone-repair-hyderabad",
    brand: "iPhone",
    brandSlug: "apple",
    h1: "iPhone Repair in Hyderabad — Independent Doorstep Service",
    tagline: "Doorstep iPhone repair with OEM-quality parts & Face ID calibration checked on every screen replacement.",
    intro:
      "TurboFix is an independent iPhone repair service serving Hyderabad. We repair all iPhone models from iPhone X to the latest iPhone 15 Pro Max — screen replacements, battery swaps, and complex motherboard repairs — at your doorstep with OEM-quality components and a 6-month warranty.",
    whyHyderabad:
      "Hyderabad has one of India's fastest-growing iPhone user bases, driven by the city's large IT and tech professional community. Apple's authorised service centres in Hyderabad often require appointments weeks in advance and carry premium pricing. TurboFix fills this gap — professional independent iPhone repair, same day, at your HITEC City office or Banjara Hills home.",
    popularModels: [
      "iPhone 15 Pro Max / 15 Pro / 15 Plus / 15",
      "iPhone 14 Pro Max / 14 Pro / 14 Plus / 14",
      "iPhone 13 Pro Max / 13 Pro / 13 Mini / 13",
      "iPhone 12 Pro Max / 12 Pro / 12 Mini / 12",
      "iPhone SE (3rd gen) / SE (2nd gen)",
      "iPhone 11 Pro Max / 11 Pro / 11",
      "iPhone XS Max / XS / XR / X",
    ],
    topRepairs: [
      { name: "iPhone Screen Replacement", desc: "OEM-quality OLED display. Face ID, True Tone, ProMotion all preserved.", price: "₹2,499 – ₹8,999" },
      { name: "iPhone Battery Replacement", desc: "OEM-grade battery. Battery Health restored to 100%.", price: "₹1,299 – ₹2,999" },
      { name: "iPhone Charging Port Repair", desc: "Lightning / USB-C port. MagSafe compatibility tested.", price: "₹999 – ₹2,499" },
      { name: "iPhone Back Glass Replacement", desc: "Precision back glass replacement with fresh water-resistant adhesive seal.", price: "₹1,499 – ₹3,999" },
      { name: "iPhone Camera Repair", desc: "ProRAW & ProRes capability restored after camera module replacement.", price: "₹1,999 – ₹4,999" },
      { name: "iPhone Water Damage Recovery", desc: "Ultrasonic PCB cleaning. Most iPhones recovered same day.", price: "₹1,999 – ₹5,999" },
    ],
    trustPoints: [
      "Face ID and Touch ID fully functional after screen replacement",
      "True Tone calibration preserved on all iPhone 12+ repairs",
      "Battery Health visible and accurate in iOS Settings post-repair",
      "OEM-grade parts used for Lightning connector repair",
      "ProMotion 120Hz preserved on iPhone 13 Pro and above screen replacements",
    ],
    faqs: [
      { q: "Does TurboFix do iPhone screen replacement in Hyderabad?", a: "Yes — TurboFix replaces iPhone screens for all models from iPhone X to iPhone 15 Pro Max at your doorstep across Hyderabad. Repair takes 35–50 minutes." },
      { q: "Will Face ID still work after iPhone screen replacement?", a: "In almost all cases, yes. TurboFix technicians are trained to preserve the TrueDepth camera and Face ID sensor during screen replacement, and we test Face ID before returning your device." },
      { q: "Is TurboFix an Apple Authorised Service Provider?", a: "TurboFix is an independent premium repair service, not an Apple Authorised Service Provider. We use OEM-quality components that match Apple's original specifications. Genuine Apple parts are available on request for an additional charge." },
      { q: "How much does iPhone screen replacement cost in Hyderabad?", a: "iPhone screen replacement at TurboFix costs ₹2,499 for older models up to ₹8,999 for iPhone 15 Pro Max OLED. Exact price confirmed before repair starts." },
      { q: "Can TurboFix repair an iPhone that won't turn on?", a: "Yes — we diagnose and repair iPhones that won't power on, including battery failures, charging IC issues, and motherboard component-level repairs." },
      { q: "Do you repair iPhones at home in HITEC City and Gachibowli?", a: "Yes — TurboFix covers all Hyderabad areas including HITEC City, Gachibowli, Madhapur, Banjara Hills, Kondapur, Ameerpet, Secunderabad, and 80+ more locations." },
    ],
    keywords: [
      "iphone repair hyderabad", "iphone screen replacement hyderabad",
      "iphone battery replacement hyderabad", "apple iphone repair hyderabad",
      "iphone repair near me hyderabad", "doorstep iphone repair hyderabad",
      "iphone 15 repair hyderabad", "iphone 14 repair hyderabad",
      "iphone water damage repair hyderabad",
    ],
    color: "#555555",
  },

  {
    slug: "samsung-repair-hyderabad",
    brand: "Samsung",
    brandSlug: "samsung",
    h1: "Samsung Repair in Hyderabad — Galaxy Screen & Battery Experts",
    tagline: "Samsung Galaxy repair at your doorstep — AMOLED-grade display quality.",
    intro:
      "Samsung is India's most popular smartphone brand, and TurboFix is Hyderabad's Samsung repair specialist. From Galaxy S24 Ultra flagship repairs to budget Galaxy A and M series, we carry Samsung-compatible AMOLED and LCD display stock for same-day doorstep repair across the city.",
    whyHyderabad:
      "Samsung Galaxy phones account for a significant share of all mobile repairs in Hyderabad. The wide range of Samsung models — from affordable M-series to premium Galaxy S Ultra — means finding quality repair service for your specific model can be difficult. TurboFix maintains stock for the top 30 Samsung models in Hyderabad, covering both display types and battery variants.",
    popularModels: [
      "Samsung Galaxy S24 Ultra / S24+ / S24",
      "Samsung Galaxy S23 Ultra / S23+ / S23",
      "Samsung Galaxy A55 5G / A35 5G / A25 5G",
      "Samsung Galaxy M55 5G / M35 5G / M34",
      "Samsung Galaxy F55 / F35 / F15",
      "Samsung Galaxy S22 Ultra / S22+ / S22",
      "Samsung Galaxy Z Fold5 / Z Flip5",
    ],
    topRepairs: [
      { name: "Samsung AMOLED Screen Replacement", desc: "Dynamic AMOLED 2X quality maintained. S-Pen compatibility preserved on Ultra models.", price: "₹1,999 – ₹7,999" },
      { name: "Samsung Battery Replacement", desc: "Compatible battery with Samsung's 25W/45W fast charging preserved.", price: "₹999 – ₹2,999" },
      { name: "Samsung Charging Port Repair", desc: "USB-C port replacement. Samsung DeX connectivity verified.", price: "₹799 – ₹2,499" },
      { name: "Samsung Back Glass Replacement", desc: "Gorilla Glass back replacement. Wireless charging re-tested.", price: "₹999 – ₹3,499" },
      { name: "Samsung Camera Repair", desc: "108MP / 200MP camera module replacement. Night mode and Space Zoom verified.", price: "₹1,499 – ₹4,999" },
      { name: "Samsung Z Fold/Flip Repair", desc: "Foldable display and hinge repair. Book in advance for foldable models.", price: "₹4,999 – ₹12,999" },
    ],
    trustPoints: [
      "AMOLED colour profile and brightness preserved after screen replacement",
      "S-Pen digitizer compatibility maintained on Galaxy S Ultra models",
      "Samsung Pay / NFC functionality tested after repair",
      "Fast charging (25W/45W/65W) verified after battery and port repairs",
      "Galaxy Z Fold and Flip foldable repairs with hinge alignment",
    ],
    faqs: [
      { q: "How much does Samsung screen replacement cost in Hyderabad?", a: "Samsung screen replacement at TurboFix costs ₹1,999–₹7,999 depending on the model. Galaxy A series AMOLED from ₹1,999. Galaxy S Ultra AMOLED from ₹4,999. Exact quote before repair." },
      { q: "Will the Samsung AMOLED display quality be the same after repair?", a: "Yes — we use AMOLED-compatible display modules that maintain the same brightness, colour gamut, and refresh rate as the original Samsung display." },
      { q: "Can TurboFix repair Samsung Galaxy Z Fold and Z Flip?", a: "Yes — we repair Samsung Galaxy Z Fold and Z Flip foldable phones including inner foldable display and hinge repairs. Please book in advance for foldable repairs as specialist parts are sourced on order." },
      { q: "Does S-Pen work after Galaxy S Ultra screen replacement?", a: "Yes — TurboFix preserves S-Pen digitizer compatibility during Samsung Galaxy S Ultra screen replacements." },
    ],
    keywords: [
      "samsung repair hyderabad", "samsung screen replacement hyderabad",
      "samsung galaxy repair hyderabad", "samsung battery replacement hyderabad",
      "samsung repair near me hyderabad", "doorstep samsung repair hyderabad",
      "samsung s24 repair hyderabad", "samsung amoled repair hyderabad",
    ],
    color: "#1428A0",
  },

  {
    slug: "oneplus-repair-hyderabad",
    brand: "OnePlus",
    brandSlug: "oneplus",
    h1: "OnePlus Repair in Hyderabad — Fast Charging & AMOLED Experts",
    tagline: "OnePlus doorstep repair — Warp Charge compatibility tested after every repair.",
    intro:
      "OnePlus has built a loyal following in Hyderabad's tech community with its clean OxygenOS experience and flagship-grade performance at competitive prices. TurboFix repairs all OnePlus models — from the OnePlus 12 Pro to the Nord series — at your doorstep with full Warp/SUPERVOOC charging compatibility preserved.",
    whyHyderabad:
      "OnePlus is particularly popular among Hyderabad's IT professionals who value stock-like Android performance. TurboFix's OnePlus repair team is experienced with the brand's specific display technology (LTPO AMOLED with adaptive refresh), alert slider mechanism, and Hasselblad camera calibration requirements.",
    popularModels: [
      "OnePlus 12 / 12R / 11 / 11R",
      "OnePlus Nord 4 / Nord CE 4 / Nord CE 4 Lite",
      "OnePlus Nord 3 / Nord CE 3 / Nord CE 3 Lite",
      "OnePlus 10 Pro / 10T / 10R",
      "OnePlus 9 Pro / 9 / 9R",
      "OnePlus Open (foldable)",
    ],
    topRepairs: [
      { name: "OnePlus Screen Replacement", desc: "LTPO AMOLED. Adaptive refresh rate (1–120Hz) preserved. Hasselblad colour tuning maintained.", price: "₹1,999 – ₹6,999" },
      { name: "OnePlus Battery Replacement", desc: "100W/150W SUPERVOOC battery replacement. Full fast-charge speed verified.", price: "₹1,299 – ₹2,999" },
      { name: "OnePlus Charging Port Repair", desc: "USB-C port. SUPERVOOC fast charge and USB data verified.", price: "₹799 – ₹2,499" },
      { name: "OnePlus Alert Slider Repair", desc: "Alert slider mechanism repair and replacement. All three positions tested.", price: "₹699 – ₹1,999" },
      { name: "OnePlus Camera Repair", desc: "Hasselblad camera module replacement. Pro mode and RAW capture tested.", price: "₹1,299 – ₹4,499" },
    ],
    trustPoints: [
      "Warp Charge and SUPERVOOC 100W/150W fast charging preserved",
      "Alert Slider (Silent/Vibrate/Ring) functionality verified",
      "Hasselblad colour science maintained after camera repair",
      "OxygenOS Always-On display functioning after screen replacement",
      "Dolby Atmos stereo speaker tested after every repair",
    ],
    faqs: [
      { q: "How much does OnePlus screen replacement cost in Hyderabad?", a: "OnePlus screen replacement at TurboFix costs ₹1,999–₹6,999. OnePlus Nord series from ₹1,999. OnePlus 12 Pro from ₹4,999." },
      { q: "Will SUPERVOOC 100W charging work after battery replacement?", a: "Yes — we use batteries rated for your model's maximum charging speed and verify SUPERVOOC/Warp Charge functionality before handover." },
      { q: "Can TurboFix fix the OnePlus alert slider?", a: "Yes — the alert slider mechanism is a repair we handle specifically for OnePlus. We replace the slider module and test all three positions." },
    ],
    keywords: [
      "oneplus repair hyderabad", "oneplus screen replacement hyderabad",
      "oneplus battery replacement hyderabad", "oneplus repair near me hyderabad",
      "doorstep oneplus repair hyderabad", "oneplus 12 repair hyderabad",
      "oneplus nord repair hyderabad",
    ],
    color: "#F5010C",
  },

  {
    slug: "realme-repair-hyderabad",
    brand: "Realme",
    brandSlug: "realme",
    h1: "Realme Repair in Hyderabad — All Models, Same-Day Doorstep",
    tagline: "Realme repair with SUPERVOOC charging maintained — at your doorstep.",
    intro:
      "Realme has become one of the most widely used smartphone brands in Hyderabad due to its excellent price-to-performance ratio. TurboFix repairs a high volume of Realme devices in Hyderabad — from the budget Realme C series to the flagship Realme GT series — same-day at your home or office.",
    whyHyderabad:
      "Realme's popularity spans across all age groups in Hyderabad — students in Ameerpet, families in residential colonies, and even working professionals who prefer mid-range Android. TurboFix's Realme repair expertise covers all Realme display types (AMOLED for Pro models, IPS for standard) and maintains SUPERVOOC charging compatibility throughout.",
    popularModels: [
      "Realme 13 Pro+ / 13 Pro / 13 / 13x",
      "Realme 12 Pro+ / 12 Pro / 12",
      "Realme GT 6 / GT 6T / GT Neo 6",
      "Realme Narzo 70 Pro / Narzo 70 / Narzo 60 Pro",
      "Realme C65 / C55 / C35 / C33",
      "Realme 11 Pro+ / 11 Pro / 11",
    ],
    topRepairs: [
      { name: "Realme Screen Replacement", desc: "AMOLED for Pro models, IPS for standard. Touch sensor and fingerprint preserved.", price: "₹999 – ₹4,999" },
      { name: "Realme Battery Replacement", desc: "SUPERVOOC battery replacement. Fast charge speed tested.", price: "₹799 – ₹1,999" },
      { name: "Realme Charging Port Repair", desc: "USB-C port replacement. SUPERVOOC compatibility verified.", price: "₹599 – ₹1,499" },
      { name: "Realme Back Glass / Cover Replacement", desc: "Textured and glass back replacement. All colour variants.", price: "₹699 – ₹2,499" },
    ],
    trustPoints: [
      "SUPERVOOC fast charging preserved after battery and port repair",
      "In-display fingerprint sensor re-calibrated after AMOLED screen replacement",
      "Realme UI features (Mini Capsule, Dynamic Island) unaffected by repair",
      "Affordable repair cost — Realme parts are widely available in India",
    ],
    faqs: [
      { q: "How much does Realme screen replacement cost in Hyderabad?", a: "Realme screen replacement at TurboFix costs ₹999–₹4,999. Budget C series from ₹999. Realme GT Pro AMOLED from ₹2,999." },
      { q: "Does TurboFix repair Realme Narzo series?", a: "Yes — all Realme Narzo models are covered at TurboFix. We stock parts for current Narzo 70 and Narzo 60 series." },
      { q: "Will SUPERVOOC charging work after Realme battery replacement?", a: "Yes — we use batteries that support your Realme model's charging speed and verify SUPERVOOC functionality after replacement." },
    ],
    keywords: [
      "realme repair hyderabad", "realme screen replacement hyderabad",
      "realme battery replacement hyderabad", "realme repair near me hyderabad",
      "doorstep realme repair hyderabad", "realme gt repair hyderabad",
      "realme narzo repair hyderabad",
    ],
    color: "#FFD700",
  },

  {
    slug: "oppo-repair-hyderabad",
    brand: "Oppo",
    brandSlug: "oppo",
    h1: "Oppo Repair in Hyderabad — Find X, Reno & A Series Specialists",
    tagline: "Oppo doorstep repair — SUPERVOOC charging & camera quality preserved.",
    intro:
      "Oppo smartphones are known for their outstanding camera systems, premium designs, and SUPERVOOC fast charging technology. TurboFix repairs all Oppo models in Hyderabad — from the flagship Find X7 Pro to the popular Reno and A series — at your doorstep with same-day service in most areas.",
    whyHyderabad:
      "Oppo has a strong presence in Hyderabad's mid-range and premium smartphone segment. The brand's focus on camera quality (with Hasselblad partnerships on flagship models) means users have high expectations for camera functionality after repair. TurboFix's Oppo-trained technicians verify camera module performance post-repair.",
    popularModels: [
      "Oppo Find X7 Pro / Find X6 Pro",
      "Oppo Reno 12 Pro / Reno 12 / Reno 12F",
      "Oppo Reno 11 Pro / Reno 11",
      "Oppo A3 Pro / A79 5G / A78",
      "Oppo F27 Pro+ / F25 Pro",
      "Oppo K12x / K12",
    ],
    topRepairs: [
      { name: "Oppo Screen Replacement", desc: "AMOLED for Reno/Find series, IPS for A series. Touch response calibrated.", price: "₹1,299 – ₹6,999" },
      { name: "Oppo Battery Replacement", desc: "SUPERVOOC 80W/100W compatible battery. Full charge speed verified.", price: "₹899 – ₹2,499" },
      { name: "Oppo Charging Port Repair", desc: "USB-C SUPERVOOC port replacement and verification.", price: "₹699 – ₹1,999" },
      { name: "Oppo Camera Repair", desc: "50MP / 64MP camera module. Hasselblad colour tuning on Find X series.", price: "₹1,299 – ₹4,999" },
    ],
    trustPoints: [
      "SUPERVOOC 80W/100W charging speed preserved after all repairs",
      "Oppo Glow textured back replacement available for Reno series",
      "Camera AI features verified post-repair (portrait, XPan mode)",
      "ColorOS features unaffected by hardware repair",
    ],
    faqs: [
      { q: "How much does Oppo screen replacement cost in Hyderabad?", a: "Oppo screen replacement at TurboFix costs ₹1,299–₹6,999. A series from ₹1,299. Reno 12 Pro AMOLED from ₹2,999. Find X series from ₹4,999." },
      { q: "Does TurboFix repair Oppo Find X7 Pro?", a: "Yes — we repair Oppo Find X series including the Find X7 Pro. Display replacement and camera repair for flagship Oppo models are available in Hyderabad." },
    ],
    keywords: [
      "oppo repair hyderabad", "oppo screen replacement hyderabad",
      "oppo battery replacement hyderabad", "oppo repair near me hyderabad",
      "doorstep oppo repair hyderabad", "oppo reno repair hyderabad",
      "oppo find x repair hyderabad",
    ],
    color: "#1D2129",
  },

  {
    slug: "vivo-repair-hyderabad",
    brand: "Vivo",
    brandSlug: "vivo",
    h1: "Vivo Repair in Hyderabad — X Series, V Series & Y Series",
    tagline: "Vivo doorstep repair — selfie camera & FlashCharge preserved.",
    intro:
      "Vivo is one of the most popular brands in Hyderabad's mid-range segment, renowned for exceptional camera quality, especially for selfies and portrait photography. TurboFix repairs all Vivo models across Hyderabad — from the premium X100 Pro to the mass-market Y series — at your doorstep with FlashCharge compatibility preserved.",
    whyHyderabad:
      "Vivo's camera-focused lineup resonates strongly with Hyderabad's younger demographic. The brand's ZEISS optics partnership on X series phones means camera repair quality standards must be high. TurboFix verifies autofocus, portrait mode, and night photography performance after every Vivo camera repair.",
    popularModels: [
      "Vivo X100 Pro / X100",
      "Vivo V30 Pro / V30e / V30",
      "Vivo V29 Pro / V29e / V29",
      "Vivo Y200 Pro / Y200 / Y100",
      "Vivo T3 Pro / T3 / T2 Pro",
      "Vivo iQOO 12 Pro / iQOO 12 / iQOO Neo 9 Pro",
    ],
    topRepairs: [
      { name: "Vivo Screen Replacement", desc: "AMOLED for X/V series, IPS for Y series. In-display fingerprint re-calibrated.", price: "₹1,299 – ₹5,999" },
      { name: "Vivo Battery Replacement", desc: "FlashCharge 80W/120W compatible battery. Full charge speed verified.", price: "₹899 – ₹2,499" },
      { name: "Vivo Charging Port Repair", desc: "USB-C FlashCharge port replacement.", price: "₹699 – ₹1,999" },
      { name: "Vivo Camera Repair", desc: "ZEISS optics camera module replacement. Portrait & selfie tested.", price: "₹1,299 – ₹4,499" },
    ],
    trustPoints: [
      "FlashCharge fast charging speed preserved after battery and port repairs",
      "In-display fingerprint sensor re-calibrated after AMOLED screen replacement",
      "ZEISS camera colour tuning verified after camera module replacement",
      "iQOO gaming performance (GT mode) unaffected by hardware repair",
    ],
    faqs: [
      { q: "How much does Vivo screen replacement cost in Hyderabad?", a: "Vivo screen replacement at TurboFix costs ₹1,299–₹5,999. Y series from ₹1,299. V30 Pro AMOLED from ₹2,999. X100 Pro from ₹4,999." },
      { q: "Does TurboFix repair Vivo iQOO phones?", a: "Yes — all Vivo iQOO models are covered at TurboFix including iQOO 12 Pro and iQOO Neo series." },
    ],
    keywords: [
      "vivo repair hyderabad", "vivo screen replacement hyderabad",
      "vivo battery replacement hyderabad", "vivo repair near me hyderabad",
      "doorstep vivo repair hyderabad", "vivo v30 repair hyderabad",
      "vivo iqoo repair hyderabad",
    ],
    color: "#415FFF",
  },

  {
    slug: "xiaomi-repair-hyderabad",
    brand: "Xiaomi",
    brandSlug: "xiaomi",
    h1: "Xiaomi & Redmi Repair in Hyderabad — Mi, Redmi, POCO Specialists",
    tagline: "Xiaomi / Redmi / POCO doorstep repair — HyperOS experience preserved.",
    intro:
      "Xiaomi's ecosystem — spanning Xiaomi flagship, Redmi mid-range, and POCO performance series — accounts for a large share of the repairs TurboFix handles in Hyderabad. We repair all Xiaomi, Redmi, and POCO models at your doorstep with same-day service and HyperOS / MIUI-compatible parts.",
    whyHyderabad:
      "Xiaomi's value-for-money proposition has made Redmi one of the best-selling series in Hyderabad's budget and mid-range segment. With a wide range of models and display types, finding the right repair service for a specific Redmi model is challenging. TurboFix maintains stock for the top Redmi, POCO, and Xiaomi models sold in Hyderabad.",
    popularModels: [
      "Xiaomi 14 / 14T Pro / 14T",
      "Xiaomi 13 Pro / 13T Pro / 13T",
      "Redmi Note 13 Pro+ / Note 13 Pro / Note 13",
      "Redmi 13C / 12 / 12C",
      "POCO X6 Pro / X6 / F6 Pro / F6",
      "POCO M6 Pro / M6 / C75",
    ],
    topRepairs: [
      { name: "Xiaomi / Redmi Screen Replacement", desc: "AMOLED for flagship/Note Pro, IPS for Redmi/POCO standard. Touch ID preserved.", price: "₹999 – ₹5,999" },
      { name: "Xiaomi Battery Replacement", desc: "HyperCharge/Turbo Charge compatible battery. Full speed verified.", price: "₹799 – ₹2,499" },
      { name: "Xiaomi Charging Port Repair", desc: "USB-C port. 67W/120W HyperCharge compatibility verified.", price: "₹599 – ₹1,799" },
      { name: "Xiaomi Camera Repair", desc: "Leica camera module (Xiaomi 14 series). Camera app features verified.", price: "₹1,299 – ₹4,499" },
    ],
    trustPoints: [
      "HyperCharge 120W / Turbo Charge 67W speed preserved post-repair",
      "HyperOS / MIUI features unaffected by hardware repair",
      "Leica camera colour science verified after Xiaomi 14 camera repairs",
      "POCO's gaming display (144Hz) refresh rate maintained after screen replacement",
    ],
    faqs: [
      { q: "How much does Redmi / Xiaomi screen replacement cost in Hyderabad?", a: "Xiaomi and Redmi screen replacement at TurboFix costs ₹999–₹5,999. Redmi C series from ₹999. Redmi Note Pro AMOLED from ₹1,999. Xiaomi 14 Pro from ₹4,999." },
      { q: "Does TurboFix repair POCO phones?", a: "Yes — all POCO models including POCO X6 Pro, POCO F6 Pro, and POCO M series are repaired at TurboFix Hyderabad." },
      { q: "Will HyperOS features work after screen replacement?", a: "Yes — hardware repair does not affect HyperOS / MIUI software features. We use compatible display modules that support all OS-level display functions." },
    ],
    keywords: [
      "xiaomi repair hyderabad", "redmi repair hyderabad",
      "xiaomi screen replacement hyderabad", "redmi screen replacement hyderabad",
      "poco repair hyderabad", "xiaomi battery replacement hyderabad",
      "doorstep xiaomi repair hyderabad", "mi phone repair hyderabad",
    ],
    color: "#FF6900",
  },

  {
    slug: "google-pixel-repair-hyderabad",
    brand: "Google Pixel",
    brandSlug: "google-pixel",
    h1: "Google Pixel Repair in Hyderabad — Tensor Chip Specialists",
    tagline: "Pixel doorstep repair — under-display fingerprint & computational photography preserved.",
    intro:
      "Google Pixel phones run the purest Android experience and feature the world's best computational photography. TurboFix's Pixel-trained technicians understand the unique calibration requirements of Pixel's Tensor chip ecosystem and ISOCELL camera stacks — delivering accurate repairs for all Pixel models at your doorstep in Hyderabad.",
    whyHyderabad:
      "Google Pixel has a growing and loyal user base in Hyderabad's tech community, particularly among software engineers who value stock Android and monthly security updates. Pixel repair in Hyderabad is challenging due to limited authorised service options — TurboFix fills this gap with specialist Pixel repair expertise.",
    popularModels: [
      "Google Pixel 9 Pro XL / 9 Pro / 9",
      "Google Pixel 8 Pro / 8 / 8a",
      "Google Pixel 7 Pro / 7 / 7a",
      "Google Pixel 6 Pro / 6 / 6a",
      "Google Pixel 5 / 5a / 4a (5G) / 4a",
    ],
    topRepairs: [
      { name: "Pixel OLED Screen Replacement", desc: "LTPO OLED quality. Pixel Visual Core display tuning and under-display fingerprint calibrated.", price: "₹2,999 – ₹7,999" },
      { name: "Pixel Battery Replacement", desc: "Adaptive Battery compatible. Extreme Battery Saver functionality preserved.", price: "₹1,499 – ₹2,999" },
      { name: "Pixel Camera Repair", desc: "Tensor ISP-dependent camera module. Astrophotography and Cinematic Blur verified.", price: "₹2,499 – ₹5,999" },
      { name: "Pixel Back Glass Replacement", desc: "Matte and polished Pixel glass back. Wireless charging and Pixel Stand compatibility re-tested.", price: "₹1,999 – ₹4,499" },
      { name: "Pixel Charging Port Repair", desc: "USB-C port. Pixel Stand 23W wireless and wired fast charge verified.", price: "₹1,299 – ₹2,499" },
    ],
    trustPoints: [
      "Under-display fingerprint sensor re-calibrated after every Pixel screen repair",
      "Astrophotography mode verified after Pixel camera module replacement",
      "Face Unlock re-enrolled and tested after front camera repair",
      "Pixel's Real Tone and Night Sight camera AI unaffected by hardware repair",
      "Monthly security updates continue normally after repair",
    ],
    faqs: [
      { q: "How much does Google Pixel screen replacement cost in Hyderabad?", a: "Google Pixel screen replacement at TurboFix costs ₹2,999–₹7,999. Pixel 7a from ₹2,999. Pixel 8 Pro from ₹4,999. Pixel 9 Pro from ₹6,999." },
      { q: "Will the under-display fingerprint sensor work after Pixel screen repair?", a: "Yes — TurboFix calibrates the under-display optical fingerprint sensor as part of every Pixel screen replacement. We verify fingerprint unlock before handover." },
      { q: "Are Google Pixel parts available in Hyderabad?", a: "Yes — TurboFix stocks Pixel 6, 7, 8, and 9 series parts in Hyderabad. Older or less common Pixel models may require 24–48 hours for part sourcing." },
      { q: "Does TurboFix repair Google Pixel 9 Pro in Hyderabad?", a: "Yes — the Pixel 9 Pro and Pixel 9 Pro XL are both covered in Hyderabad by TurboFix. Screen, battery, and camera repairs available." },
    ],
    keywords: [
      "google pixel repair hyderabad", "pixel screen replacement hyderabad",
      "pixel battery replacement hyderabad", "google pixel repair near me hyderabad",
      "doorstep pixel repair hyderabad", "pixel 9 repair hyderabad",
      "pixel 8 repair hyderabad", "pixel 7 repair hyderabad",
    ],
    color: "#4285F4",
  },

  {
    slug: "motorola-repair-hyderabad",
    brand: "Motorola",
    brandSlug: "motorola",
    h1: "Motorola Repair in Hyderabad — Moto G, Edge & Razr Specialists",
    tagline: "Motorola doorstep repair — TurboPower charging & Moto Display preserved.",
    intro:
      "Motorola phones are beloved in Hyderabad for their near-stock Android experience, reliable build quality, and long software support. TurboFix repairs all Motorola models — from the budget Moto G series to the premium Edge series and the iconic Razr foldable — at your doorstep across Hyderabad.",
    whyHyderabad:
      "Motorola's Moto G series is one of the top-selling mid-range lineups in Hyderabad, valued for its clean Android interface and durable construction. The Edge series has been gaining traction with Hyderabad's professional demographic. TurboFix's Motorola repair capabilities cover the full lineup including the Razr foldable.",
    popularModels: [
      "Motorola Edge 50 Pro / Edge 50 / Edge 50 Neo",
      "Motorola Edge 40 Pro / Edge 40 Neo",
      "Moto G85 5G / G84 5G / G64 5G",
      "Moto G54 Pro / G54 / G34",
      "Motorola Razr 50 Ultra / Razr 50 / Razr 40 Ultra",
      "Moto G24 Power / G24 / G14",
    ],
    topRepairs: [
      { name: "Motorola Screen Replacement", desc: "pOLED for Edge series, IPS/AMOLED for Moto G. Moto Display always-on preserved.", price: "₹999 – ₹5,999" },
      { name: "Motorola Battery Replacement", desc: "TurboPower 68W compatible battery. Moto G massive battery (5000mAh+) replacement.", price: "₹799 – ₹2,499" },
      { name: "Motorola Charging Port Repair", desc: "USB-C TurboPower port replacement and charging speed verification.", price: "₹699 – ₹1,999" },
      { name: "Moto Razr Foldable Repair", desc: "Razr foldable display and hinge repair. Book in advance.", price: "₹4,999 – ₹11,999" },
    ],
    trustPoints: [
      "TurboPower 68W fast charging speed preserved after every repair",
      "Moto Display and Peek Display features unaffected by screen replacement",
      "Motorola Razr hinge alignment verified after foldable screen repair",
      "Stock Android experience completely intact after hardware repairs",
      "Corning Gorilla Glass protection on replacement screens for Edge series",
    ],
    faqs: [
      { q: "How much does Motorola screen replacement cost in Hyderabad?", a: "Motorola screen replacement at TurboFix costs ₹999–₹5,999. Moto G series from ₹999. Edge series pOLED from ₹2,999. Razr foldable from ₹4,999." },
      { q: "Does TurboFix repair Motorola Razr foldable in Hyderabad?", a: "Yes — Razr series foldable screen and hinge repair is available. Please book in advance as Razr parts require prior sourcing. Call +91 86396 05147 for Razr repair availability." },
      { q: "Will TurboPower charging work after Motorola battery replacement?", a: "Yes — we use TurboPower-compatible batteries and verify fast charging speed after every Motorola battery replacement." },
    ],
    keywords: [
      "motorola repair hyderabad", "moto repair hyderabad",
      "motorola screen replacement hyderabad", "moto g repair hyderabad",
      "motorola battery replacement hyderabad", "doorstep motorola repair hyderabad",
      "motorola edge repair hyderabad", "moto razr repair hyderabad",
    ],
    color: "#E1140A",
  },
];

export function getBrandCityPageBySlug(slug: string): BrandCityPageData | undefined {
  return brandCityPages.find((b) => b.slug === slug);
}
