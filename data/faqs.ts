/**
 * faqs.ts — the /faq page content. The visible list (app/faq/FAQPageClient.tsx)
 * and the FAQPage JSON-LD (app/faq/page.tsx) are both built from this array,
 * so the structured data can never say something the page doesn't.
 *
 * `confirm: true` marks answers carried over from earlier copy that the owner
 * still needs to confirm. They stay visible but are left out of the JSON-LD
 * until confirmed. TODO(owner): confirm or correct each, then delete the flag.
 */

export interface FaqItem {
  q: string;
  a: string;
  confirm?: boolean;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    category: "Booking & Visits",
    items: [
      { q: "How do I book a TurboFix visit?", a: "Book online at turbofix.in/book-a-visit, call +91 86396 05147, or send a WhatsApp message to the same number. Bookings are accepted any time; doorstep visits run 9 AM – 9 PM, every day." },
      { q: "What should I tell you when I book?", a: "Your phone's brand and exact model (Settings → About phone), what's wrong and when it started, whether the phone has been exposed to water or opened before, your area in Hyderabad, and a time that suits you. A photo of the damage on WhatsApp helps us bring the right part." },
      { q: "Where is TurboFix located?", a: "Our studio is at Bharat Nagar, Aghapura, Nampally, Hyderabad, Telangana 500001. You can also book a doorstep visit and a technician comes to your home or office." },
      { q: "Which areas of Hyderabad do you cover?", a: "All of Hyderabad, including Secunderabad. Our Locations page lists many areas by zone, but you don't need to be on the list: wherever you are in Hyderabad, we can come to you." },
      { q: "What happens after I book?", a: "We confirm your booking, and the technician usually visits at the time slot you chose. They diagnose the problem and give you a quote before any work starts. Once you approve it, most visits are completed in under 30 minutes, and you pay after the service is done. Water damage and motherboard jobs take longer; we tell you the expected time first." },
      { q: "Do you offer pickup and delivery?", a: "Yes, anywhere in Hyderabad. As well as onsite service at your home or office, our field executive can collect your phone, have it serviced, and deliver it back." },
      { q: "Do I need to book an appointment?", a: "Walk-ins to the Nampally studio are welcome, but booking reserves your slot so a technician and the right part are ready for you. Doorstep visits always need a booking." },
      { q: "How long does a typical visit take?", a: "Most common services — screen replacements, battery swaps, charging port fixes — are done in 20–45 minutes. Complex jobs like water damage service or motherboard service may take 2–4 hours or up to a day." },
      { q: "Can I wait in-store while my phone is being serviced?", a: "Absolutely! Our waiting area has complimentary coffee, fast Wi-Fi, and a loaner device if needed. We'll text you when your service is complete.", confirm: true },
    ],
  },
  {
    category: "Parts & Quality",
    items: [
      { q: "Which phone brands do you service?", a: "Apple iPhone, Samsung Galaxy, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel and Nothing phones. For other brands, contact us with the model and we'll check." },
      { q: "Do you use genuine OEM parts?", a: "We use OEM (Original Equipment Manufacturer) quality parts as standard. Genuine Apple parts are available for an extra charge. We'll always tell you exactly which parts we're using before the work begins." },
      { q: "Will my phone look and feel the same after service?", a: "For screen and battery replacements, yes — absolutely. We strive for factory-quality results. Parts are color-matched and all work is tested through a 10-point quality checklist before handoff." },
      { q: "Do you sell spare parts separately?", a: "Yes, we stock common batteries, screens, and accessories for self-service enthusiasts. Visit our store or contact us for availability.", confirm: true },
    ],
  },
  {
    category: "Warranty & Policies",
    items: [
      { q: "What warranty do you offer?", a: "Every service carries a warranty of 3 months, 6 months or 1 year, depending on the quality grade of the part used; we confirm the period with your quote. If the same issue recurs within that period due to parts or workmanship, we resolve it free. Physical damage and new issues are not covered." },
      { q: "What if my phone develops a new problem after service?", a: "If the new issue is related to our service, it's covered under warranty. If it's an unrelated problem, we'll diagnose it for free and give you a fair quote." },
      { q: "What if you can't resolve my device's issue?", a: "We don't charge for unsuccessful work. You only pay when your device is fully functional. If we're unable to resolve it, the diagnostic assessment is free in most cases. Full details are in our No Fix, No Fee policy." },
    ],
  },
  {
    category: "Data & Security",
    items: [
      { q: "Will my data be safe?", a: "We only access components relevant to the service. Our technicians never access your files, photos, or apps. We recommend backing up before any service visit as a precaution — though your data will be safe with us." },
      { q: "Do you require my passcode?", a: "Only if the service requires software testing (e.g., screen touch verification). Even then, you can change your passcode before and after. We never retain access credentials." },
      { q: "Is my device insured while in your care?", a: "Yes. All devices are covered under our in-store insurance. In the extremely unlikely event of accidental damage in our care, we will service or replace the device at no cost to you.", confirm: true },
    ],
  },
  {
    category: "Payment Methods",
    items: [
      { q: "How do you charge — upfront or after?", a: "You receive a confirmed quote before any work begins. Payment is made after the service is complete and you're satisfied with the result. No payment before work." },
      { q: "What payment methods do you accept?", a: "Cash, all UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking." },
      { q: "Do you offer student or senior discounts?", a: "Yes! Show a valid student ID for 5% off. Senior citizens (60+) receive 10% off all services. Cannot be combined with other offers.", confirm: true },
    ],
  },
];
