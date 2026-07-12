/**
 * Brand+City landing pages — targeted at high-intent keywords like
 * "iphone repair hyderabad", "samsung repair hyderabad" etc.
 *
 * These are separate from /brands/[brand] (which focuses on the brand generally).
 * These pages are hyper-targeted at the Hyderabad search intent.
 */
export interface BrandCityPageData {
  slug: string;               // iphone-service-hyderabad
  brand: string;              // iPhone
  brandSlug: string;          // apple → links to /brands/apple
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
    slug: "iphone-service-hyderabad",
    brand: "iPhone",
    brandSlug: "apple",
    h1: "iPhone Service in Hyderabad — Independent Doorstep Provider",
    tagline: "Doorstep iPhone screen & battery service with OEM-quality parts & Face ID calibration checked on every replacement.",
    intro:
      "TurboFix is an independent iPhone service provider serving Hyderabad. We service all iPhone models from iPhone X to the latest iPhone 15 Pro Max — screen replacements, battery swaps, and complex motherboard-level work — at your doorstep with OEM-quality components and a 6-month warranty.",
    whyHyderabad:
      "Hyderabad has one of India's fastest-growing iPhone user bases, driven by the city's large IT and tech professional community. Apple's authorised service centres in Hyderabad often require appointments weeks in advance and carry premium pricing. TurboFix fills this gap — professional independent iPhone service, same day, at your HITEC City office or Banjara Hills home.",
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
      { name: "iPhone Charging Port Service", desc: "Lightning / USB-C port. MagSafe compatibility tested.", price: "₹999 – ₹2,499" },
      { name: "iPhone Back Glass Replacement", desc: "Precision back glass replacement with fresh water-resistant adhesive seal.", price: "₹1,499 – ₹3,999" },
      { name: "iPhone Camera Service", desc: "ProRAW & ProRes capability restored after camera module replacement.", price: "₹1,999 – ₹4,999" },
      { name: "iPhone Water Damage Service", desc: "Ultrasonic PCB cleaning. Most iPhones restored same day.", price: "₹1,999 – ₹5,999" },
    ],
    trustPoints: [
      "Face ID and Touch ID fully functional after screen replacement",
      "True Tone calibration preserved on all iPhone 12+ screen replacements",
      "Battery Health visible and accurate in iOS Settings post-service",
      "OEM-grade parts used for Lightning connector service",
      "ProMotion 120Hz preserved on iPhone 13 Pro and above screen replacements",
    ],
    faqs: [
      { q: "Does TurboFix do iPhone screen replacement in Hyderabad?", a: "Yes — TurboFix replaces iPhone screens for all models from iPhone X to iPhone 15 Pro Max at your doorstep across Hyderabad. The visit takes 35–50 minutes." },
      { q: "Will Face ID still work after iPhone screen replacement?", a: "In almost all cases, yes. TurboFix technicians are trained to preserve the TrueDepth camera and Face ID sensor during screen replacement, and we test Face ID before returning your device." },
      { q: "Is TurboFix an Apple Authorised Service Provider?", a: "TurboFix is an independent premium service provider, not an Apple Authorised Service Provider. We use OEM-quality components that match Apple's original specifications. Genuine Apple parts are available on request for an additional charge." },
      { q: "How much does iPhone screen replacement cost in Hyderabad?", a: "iPhone screen replacement at TurboFix costs ₹2,499 for older models up to ₹8,999 for iPhone 15 Pro Max OLED. Exact price confirmed before work starts." },
      { q: "Can TurboFix service an iPhone that won't turn on?", a: "Yes — we diagnose and resolve iPhones that won't power on, including battery failures, charging IC issues, and motherboard-level component work." },
      { q: "Do you service iPhones at home in HITEC City and Gachibowli?", a: "Yes — TurboFix covers all Hyderabad areas including HITEC City, Gachibowli, Madhapur, Banjara Hills, Kondapur, Ameerpet, Secunderabad, and 80+ more locations." },
    ],
    keywords: [
      "iphone service hyderabad", "iphone screen replacement hyderabad",
      "iphone battery replacement hyderabad", "apple iphone service hyderabad",
      "iphone doorstep service hyderabad", "iphone 15 screen replacement hyderabad",
      "iphone 14 battery replacement hyderabad", "iphone water damage service hyderabad",
    ],
    color: "#555555",
  },

  {
    slug: "samsung-service-hyderabad",
    brand: "Samsung",
    brandSlug: "samsung",
    h1: "Samsung Service in Hyderabad — Galaxy Screen & Battery Experts",
    tagline: "Samsung Galaxy doorstep service — AMOLED-grade display quality.",
    intro:
      "Samsung is India's most popular smartphone brand, and TurboFix is Hyderabad's Samsung service specialist. From Galaxy S24 Ultra flagship models to budget Galaxy A and M series, we carry Samsung-compatible AMOLED and LCD display stock for same-day doorstep service across the city.",
    whyHyderabad:
      "Samsung Galaxy phones account for a significant share of all mobile servicing in Hyderabad. The wide range of Samsung models — from affordable M-series to premium Galaxy S Ultra — means finding quality service for your specific model can be difficult. TurboFix maintains stock for the top 30 Samsung models in Hyderabad, covering both display types and battery variants.",
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
      { name: "Samsung Charging Port Service", desc: "USB-C port replacement. Samsung DeX connectivity verified.", price: "₹799 – ₹2,499" },
      { name: "Samsung Back Glass Replacement", desc: "Gorilla Glass back replacement. Wireless charging re-tested.", price: "₹999 – ₹3,499" },
      { name: "Samsung Camera Service", desc: "108MP / 200MP camera module replacement. Night mode and Space Zoom verified.", price: "₹1,499 – ₹4,999" },
      { name: "Samsung Z Fold/Flip Service", desc: "Foldable display and hinge service. Book in advance for foldable models.", price: "₹4,999 – ₹12,999" },
    ],
    trustPoints: [
      "AMOLED colour profile and brightness preserved after screen replacement",
      "S-Pen digitizer compatibility maintained on Galaxy S Ultra models",
      "Samsung Pay / NFC functionality tested after service",
      "Fast charging (25W/45W/65W) verified after battery and port service",
      "Galaxy Z Fold and Flip foldable service with hinge alignment",
    ],
    faqs: [
      { q: "How much does Samsung screen replacement cost in Hyderabad?", a: "Samsung screen replacement at TurboFix costs ₹1,999–₹7,999 depending on the model. Galaxy A series AMOLED from ₹1,999. Galaxy S Ultra AMOLED from ₹4,999. Exact quote before work begins." },
      { q: "Will the Samsung AMOLED display quality be the same after replacement?", a: "Yes — we use AMOLED-compatible display modules that maintain the same brightness, colour gamut, and refresh rate as the original Samsung display." },
      { q: "Can TurboFix service Samsung Galaxy Z Fold and Z Flip?", a: "Yes — we service Samsung Galaxy Z Fold and Z Flip foldable phones including inner foldable display and hinge work. Please book in advance for foldable models as specialist parts are sourced on order." },
      { q: "Does S-Pen work after Galaxy S Ultra screen replacement?", a: "Yes — TurboFix preserves S-Pen digitizer compatibility during Samsung Galaxy S Ultra screen replacements." },
    ],
    keywords: [
      "samsung service hyderabad", "samsung screen replacement hyderabad",
      "samsung galaxy service hyderabad", "samsung battery replacement hyderabad",
      "samsung doorstep service hyderabad", "samsung s24 screen replacement hyderabad",
      "samsung amoled screen replacement hyderabad", "samsung galaxy doorstep service hyderabad",
    ],
    color: "#1428A0",
  },

  {
    slug: "oneplus-service-hyderabad",
    brand: "OnePlus",
    brandSlug: "oneplus",
    h1: "OnePlus Service in Hyderabad — Fast Charging & AMOLED Experts",
    tagline: "OnePlus doorstep service — Warp Charge compatibility tested after every visit.",
    intro:
      "OnePlus has built a loyal following in Hyderabad's tech community with its clean OxygenOS experience and flagship-grade performance at competitive prices. TurboFix services all OnePlus models — from the OnePlus 12 Pro to the Nord series — at your doorstep with full Warp/SUPERVOOC charging compatibility preserved.",
    whyHyderabad:
      "OnePlus is particularly popular among Hyderabad's IT professionals who value stock-like Android performance. TurboFix's OnePlus service team is experienced with the brand's specific display technology (LTPO AMOLED with adaptive refresh), alert slider mechanism, and Hasselblad camera calibration requirements.",
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
      { name: "OnePlus Charging Port Service", desc: "USB-C port. SUPERVOOC fast charge and USB data verified.", price: "₹799 – ₹2,499" },
      { name: "OnePlus Alert Slider Service", desc: "Alert slider mechanism service and replacement. All three positions tested.", price: "₹699 – ₹1,999" },
      { name: "OnePlus Camera Service", desc: "Hasselblad camera module replacement. Pro mode and RAW capture tested.", price: "₹1,299 – ₹4,499" },
    ],
    trustPoints: [
      "Warp Charge and SUPERVOOC 100W/150W fast charging preserved",
      "Alert Slider (Silent/Vibrate/Ring) functionality verified",
      "Hasselblad colour science maintained after camera service",
      "OxygenOS Always-On display functioning after screen replacement",
      "Dolby Atmos stereo speaker tested after every visit",
    ],
    faqs: [
      { q: "How much does OnePlus screen replacement cost in Hyderabad?", a: "OnePlus screen replacement at TurboFix costs ₹1,999–₹6,999. OnePlus Nord series from ₹1,999. OnePlus 12 Pro from ₹4,999." },
      { q: "Will SUPERVOOC 100W charging work after battery replacement?", a: "Yes — we use batteries rated for your model's maximum charging speed and verify SUPERVOOC/Warp Charge functionality before handover." },
      { q: "Can TurboFix service the OnePlus alert slider?", a: "Yes — the alert slider mechanism is something we handle specifically for OnePlus. We replace the slider module and test all three positions." },
    ],
    keywords: [
      "oneplus service hyderabad", "oneplus screen replacement hyderabad",
      "oneplus battery replacement hyderabad", "oneplus doorstep service hyderabad",
      "oneplus 12 screen replacement hyderabad", "oneplus nord screen replacement hyderabad",
    ],
    color: "#F5010C",
  },

  {
    slug: "realme-service-hyderabad",
    brand: "Realme",
    brandSlug: "realme",
    h1: "Realme Service in Hyderabad — All Models, Same-Day Doorstep",
    tagline: "Realme service with SUPERVOOC charging maintained — at your doorstep.",
    intro:
      "Realme has become one of the most widely used smartphone brands in Hyderabad due to its excellent price-to-performance ratio. TurboFix services a high volume of Realme devices in Hyderabad — from the budget Realme C series to the flagship Realme GT series — same-day at your home or office.",
    whyHyderabad:
      "Realme's popularity spans across all age groups in Hyderabad — students in Ameerpet, families in residential colonies, and even working professionals who prefer mid-range Android. TurboFix's Realme service expertise covers all Realme display types (AMOLED for Pro models, IPS for standard) and maintains SUPERVOOC charging compatibility throughout.",
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
      { name: "Realme Charging Port Service", desc: "USB-C port replacement. SUPERVOOC compatibility verified.", price: "₹599 – ₹1,499" },
      { name: "Realme Back Glass / Cover Replacement", desc: "Textured and glass back replacement. All colour variants.", price: "₹699 – ₹2,499" },
    ],
    trustPoints: [
      "SUPERVOOC fast charging preserved after battery and port service",
      "In-display fingerprint sensor re-calibrated after AMOLED screen replacement",
      "Realme UI features (Mini Capsule, Dynamic Island) unaffected by service",
      "Affordable pricing — Realme parts are widely available in India",
    ],
    faqs: [
      { q: "How much does Realme screen replacement cost in Hyderabad?", a: "Realme screen replacement at TurboFix costs ₹999–₹4,999. Budget C series from ₹999. Realme GT Pro AMOLED from ₹2,999." },
      { q: "Does TurboFix service Realme Narzo series?", a: "Yes — all Realme Narzo models are covered at TurboFix. We stock parts for current Narzo 70 and Narzo 60 series." },
      { q: "Will SUPERVOOC charging work after Realme battery replacement?", a: "Yes — we use batteries that support your Realme model's charging speed and verify SUPERVOOC functionality after replacement." },
    ],
    keywords: [
      "realme service hyderabad", "realme screen replacement hyderabad",
      "realme battery replacement hyderabad", "realme doorstep service hyderabad",
      "realme gt screen replacement hyderabad", "realme narzo service hyderabad",
    ],
    color: "#FFD700",
  },

  {
    slug: "oppo-service-hyderabad",
    brand: "Oppo",
    brandSlug: "oppo",
    h1: "Oppo Service in Hyderabad — Find X, Reno & A Series Specialists",
    tagline: "Oppo doorstep service — SUPERVOOC charging & camera quality preserved.",
    intro:
      "Oppo smartphones are known for their outstanding camera systems, premium designs, and SUPERVOOC fast charging technology. TurboFix services all Oppo models in Hyderabad — from the flagship Find X7 Pro to the popular Reno and A series — at your doorstep with same-day service in most areas.",
    whyHyderabad:
      "Oppo has a strong presence in Hyderabad's mid-range and premium smartphone segment. The brand's focus on camera quality (with Hasselblad partnerships on flagship models) means users have high expectations for camera functionality after service. TurboFix's Oppo-trained technicians verify camera module performance post-visit.",
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
      { name: "Oppo Charging Port Service", desc: "USB-C SUPERVOOC port replacement and verification.", price: "₹699 – ₹1,999" },
      { name: "Oppo Camera Service", desc: "50MP / 64MP camera module. Hasselblad colour tuning on Find X series.", price: "₹1,299 – ₹4,999" },
    ],
    trustPoints: [
      "SUPERVOOC 80W/100W charging speed preserved after every visit",
      "Oppo Glow textured back replacement available for Reno series",
      "Camera AI features verified post-service (portrait, XPan mode)",
      "ColorOS features unaffected by service",
    ],
    faqs: [
      { q: "How much does Oppo screen replacement cost in Hyderabad?", a: "Oppo screen replacement at TurboFix costs ₹1,299–₹6,999. A series from ₹1,299. Reno 12 Pro AMOLED from ₹2,999. Find X series from ₹4,999." },
      { q: "Does TurboFix service Oppo Find X7 Pro?", a: "Yes — we service Oppo Find X series including the Find X7 Pro. Display replacement and camera service for flagship Oppo models are available in Hyderabad." },
    ],
    keywords: [
      "oppo service hyderabad", "oppo screen replacement hyderabad",
      "oppo battery replacement hyderabad", "oppo doorstep service hyderabad",
      "oppo reno screen replacement hyderabad", "oppo find x service hyderabad",
    ],
    color: "#1D2129",
  },

  {
    slug: "vivo-service-hyderabad",
    brand: "Vivo",
    brandSlug: "vivo",
    h1: "Vivo Service in Hyderabad — X Series, V Series & Y Series",
    tagline: "Vivo doorstep service — selfie camera & FlashCharge preserved.",
    intro:
      "Vivo is one of the most popular brands in Hyderabad's mid-range segment, renowned for exceptional camera quality, especially for selfies and portrait photography. TurboFix services all Vivo models across Hyderabad — from the premium X100 Pro to the mass-market Y series — at your doorstep with FlashCharge compatibility preserved.",
    whyHyderabad:
      "Vivo's camera-focused lineup resonates strongly with Hyderabad's younger demographic. The brand's ZEISS optics partnership on X series phones means camera service quality standards must be high. TurboFix verifies autofocus, portrait mode, and night photography performance after every Vivo camera service.",
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
      { name: "Vivo Charging Port Service", desc: "USB-C FlashCharge port replacement.", price: "₹699 – ₹1,999" },
      { name: "Vivo Camera Service", desc: "ZEISS optics camera module replacement. Portrait & selfie tested.", price: "₹1,299 – ₹4,499" },
    ],
    trustPoints: [
      "FlashCharge fast charging speed preserved after battery and port service",
      "In-display fingerprint sensor re-calibrated after AMOLED screen replacement",
      "ZEISS camera colour tuning verified after camera module replacement",
      "iQOO gaming performance (GT mode) unaffected by service",
    ],
    faqs: [
      { q: "How much does Vivo screen replacement cost in Hyderabad?", a: "Vivo screen replacement at TurboFix costs ₹1,299–₹5,999. Y series from ₹1,299. V30 Pro AMOLED from ₹2,999. X100 Pro from ₹4,999." },
      { q: "Does TurboFix service Vivo iQOO phones?", a: "Yes — all Vivo iQOO models are covered at TurboFix including iQOO 12 Pro and iQOO Neo series." },
    ],
    keywords: [
      "vivo service hyderabad", "vivo screen replacement hyderabad",
      "vivo battery replacement hyderabad", "vivo doorstep service hyderabad",
      "vivo v30 screen replacement hyderabad", "vivo iqoo service hyderabad",
    ],
    color: "#415FFF",
  },

  {
    slug: "xiaomi-service-hyderabad",
    brand: "Xiaomi",
    brandSlug: "xiaomi",
    h1: "Xiaomi & Redmi Service in Hyderabad — Mi, Redmi, POCO Specialists",
    tagline: "Xiaomi / Redmi / POCO doorstep service — HyperOS experience preserved.",
    intro:
      "Xiaomi's ecosystem — spanning Xiaomi flagship, Redmi mid-range, and POCO performance series — accounts for a large share of the service requests TurboFix handles in Hyderabad. We service all Xiaomi, Redmi, and POCO models at your doorstep with same-day service and HyperOS / MIUI-compatible parts.",
    whyHyderabad:
      "Xiaomi's value-for-money proposition has made Redmi one of the best-selling series in Hyderabad's budget and mid-range segment. With a wide range of models and display types, finding the right service option for a specific Redmi model is challenging. TurboFix maintains stock for the top Redmi, POCO, and Xiaomi models sold in Hyderabad.",
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
      { name: "Xiaomi Charging Port Service", desc: "USB-C port. 67W/120W HyperCharge compatibility verified.", price: "₹599 – ₹1,799" },
      { name: "Xiaomi Camera Service", desc: "Leica camera module (Xiaomi 14 series). Camera app features verified.", price: "₹1,299 – ₹4,499" },
    ],
    trustPoints: [
      "HyperCharge 120W / Turbo Charge 67W speed preserved post-visit",
      "HyperOS / MIUI features unaffected by service",
      "Leica camera colour science verified after Xiaomi 14 camera service",
      "POCO's gaming display (144Hz) refresh rate maintained after screen replacement",
    ],
    faqs: [
      { q: "How much does Redmi / Xiaomi screen replacement cost in Hyderabad?", a: "Xiaomi and Redmi screen replacement at TurboFix costs ₹999–₹5,999. Redmi C series from ₹999. Redmi Note Pro AMOLED from ₹1,999. Xiaomi 14 Pro from ₹4,999." },
      { q: "Does TurboFix service POCO phones?", a: "Yes — all POCO models including POCO X6 Pro, POCO F6 Pro, and POCO M series are serviced at TurboFix Hyderabad." },
      { q: "Will HyperOS features work after screen replacement?", a: "Yes — screen replacement does not affect HyperOS / MIUI software features. We use compatible display modules that support all OS-level display functions." },
    ],
    keywords: [
      "xiaomi service hyderabad", "redmi service hyderabad",
      "xiaomi screen replacement hyderabad", "redmi screen replacement hyderabad",
      "poco service hyderabad", "xiaomi battery replacement hyderabad",
      "doorstep xiaomi service hyderabad", "mi phone service hyderabad",
    ],
    color: "#FF6900",
  },

  {
    slug: "google-pixel-service-hyderabad",
    brand: "Google Pixel",
    brandSlug: "google-pixel",
    h1: "Google Pixel Service in Hyderabad — Tensor Chip Specialists",
    tagline: "Pixel doorstep service — under-display fingerprint & computational photography preserved.",
    intro:
      "Google Pixel phones run the purest Android experience and feature the world's best computational photography. TurboFix's Pixel-trained technicians understand the unique calibration requirements of Pixel's Tensor chip ecosystem and ISOCELL camera stacks — delivering accurate service for all Pixel models at your doorstep in Hyderabad.",
    whyHyderabad:
      "Google Pixel has a growing and loyal user base in Hyderabad's tech community, particularly among software engineers who value stock Android and monthly security updates. Pixel service in Hyderabad is challenging to find due to limited authorised options — TurboFix fills this gap with specialist Pixel service expertise.",
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
      { name: "Pixel Camera Service", desc: "Tensor ISP-dependent camera module. Astrophotography and Cinematic Blur verified.", price: "₹2,499 – ₹5,999" },
      { name: "Pixel Back Glass Replacement", desc: "Matte and polished Pixel glass back. Wireless charging and Pixel Stand compatibility re-tested.", price: "₹1,999 – ₹4,499" },
      { name: "Pixel Charging Port Service", desc: "USB-C port. Pixel Stand 23W wireless and wired fast charge verified.", price: "₹1,299 – ₹2,499" },
    ],
    trustPoints: [
      "Under-display fingerprint sensor re-calibrated after every Pixel screen service",
      "Astrophotography mode verified after Pixel camera module replacement",
      "Face Unlock re-enrolled and tested after front camera service",
      "Pixel's Real Tone and Night Sight camera AI unaffected by service",
      "Monthly security updates continue normally after service",
    ],
    faqs: [
      { q: "How much does Google Pixel screen replacement cost in Hyderabad?", a: "Google Pixel screen replacement at TurboFix costs ₹2,999–₹7,999. Pixel 7a from ₹2,999. Pixel 8 Pro from ₹4,999. Pixel 9 Pro from ₹6,999." },
      { q: "Will the under-display fingerprint sensor work after Pixel screen service?", a: "Yes — TurboFix calibrates the under-display optical fingerprint sensor as part of every Pixel screen replacement. We verify fingerprint unlock before handover." },
      { q: "Are Google Pixel parts available in Hyderabad?", a: "Yes — TurboFix stocks Pixel 6, 7, 8, and 9 series parts in Hyderabad. Older or less common Pixel models may require 24–48 hours for part sourcing." },
      { q: "Does TurboFix service Google Pixel 9 Pro in Hyderabad?", a: "Yes — the Pixel 9 Pro and Pixel 9 Pro XL are both covered in Hyderabad by TurboFix. Screen, battery, and camera service available." },
    ],
    keywords: [
      "google pixel service hyderabad", "pixel screen replacement hyderabad",
      "pixel battery replacement hyderabad", "google pixel doorstep service hyderabad",
      "pixel 9 screen replacement hyderabad", "pixel 8 screen replacement hyderabad",
      "pixel 7 screen replacement hyderabad",
    ],
    color: "#4285F4",
  },

  {
    slug: "motorola-service-hyderabad",
    brand: "Motorola",
    brandSlug: "motorola",
    h1: "Motorola Service in Hyderabad — Moto G, Edge & Razr Specialists",
    tagline: "Motorola doorstep service — TurboPower charging & Moto Display preserved.",
    intro:
      "Motorola phones are beloved in Hyderabad for their near-stock Android experience, reliable build quality, and long software support. TurboFix services all Motorola models — from the budget Moto G series to the premium Edge series and the iconic Razr foldable — at your doorstep across Hyderabad.",
    whyHyderabad:
      "Motorola's Moto G series is one of the top-selling mid-range lineups in Hyderabad, valued for its clean Android interface and durable construction. The Edge series has been gaining traction with Hyderabad's professional demographic. TurboFix's Motorola service capabilities cover the full lineup including the Razr foldable.",
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
      { name: "Motorola Charging Port Service", desc: "USB-C TurboPower port replacement and charging speed verification.", price: "₹699 – ₹1,999" },
      { name: "Moto Razr Foldable Service", desc: "Razr foldable display and hinge service. Book in advance.", price: "₹4,999 – ₹11,999" },
    ],
    trustPoints: [
      "TurboPower 68W fast charging speed preserved after every visit",
      "Moto Display and Peek Display features unaffected by screen replacement",
      "Motorola Razr hinge alignment verified after foldable screen service",
      "Stock Android experience completely intact after service",
      "Corning Gorilla Glass protection on replacement screens for Edge series",
    ],
    faqs: [
      { q: "How much does Motorola screen replacement cost in Hyderabad?", a: "Motorola screen replacement at TurboFix costs ₹999–₹5,999. Moto G series from ₹999. Edge series pOLED from ₹2,999. Razr foldable from ₹4,999." },
      { q: "Does TurboFix service Motorola Razr foldable in Hyderabad?", a: "Yes — Razr series foldable screen and hinge service is available. Please book in advance as Razr parts require prior sourcing. Call +91 86396 05147 for Razr service availability." },
      { q: "Will TurboPower charging work after Motorola battery replacement?", a: "Yes — we use TurboPower-compatible batteries and verify fast charging speed after every Motorola battery replacement." },
    ],
    keywords: [
      "motorola service hyderabad", "moto service hyderabad",
      "motorola screen replacement hyderabad", "moto g service hyderabad",
      "motorola battery replacement hyderabad", "doorstep motorola service hyderabad",
      "motorola edge service hyderabad", "moto razr service hyderabad",
    ],
    color: "#E1140A",
  },
];

export function getBrandCityPageBySlug(slug: string): BrandCityPageData | undefined {
  return brandCityPages.find((b) => b.slug === slug);
}
