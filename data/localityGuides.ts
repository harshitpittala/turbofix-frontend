// Extended, area-specific content for the priority locality pages (SEO plan,
// 25 Sep 2026). Rendered by app/locations/[area]/LocationPageClient.tsx as a
// "What to know" section, and the FAQs are added to that page's FAQ list and
// FAQPage schema. Wording is Ads-safe (no "repair" / manufacturer-affiliation
// claims) and deliberately avoids numbers we can't back up (response times,
// job counts, ratings). Add an entry here to upgrade another area page.

export interface LocalityGuide {
  /** 2–3 short paragraphs, unique to the area. */
  overview: string[];
  /** Streets, pockets and landmarks our technicians regularly visit. */
  pockets: string[];
  /** Practical booking tips specific to how people live/work here. */
  bookingTips: string[];
  /** Area-specific questions (added to the page's FAQs + FAQPage schema). */
  faqs: { q: string; a: string }[];
}

export const localityGuides: Record<string, LocalityGuide> = {
  madhapur: {
    overview: [
      "Madhapur sits between Jubilee Hills and HITEC City, and most of its streets mix apartments, PG hostels, co-living buildings and small offices. That means a lot of phones are used for work all day and charged overnight — which is exactly when batteries, charging ports and cracked screens start causing trouble.",
      "TurboFix technicians visit homes, PGs and offices across Madhapur, including the lanes around Inorbit Mall, Shilparamam, Durgam Cheruvu and the Cyber Towers road. You don't need to travel to a service centre: the technician brings the parts, works at your door and tests the phone in front of you before you pay.",
    ],
    pockets: ["Ayyappa Society", "Image Gardens Road", "Patrika Nagar", "Vittal Rao Nagar", "Durgam Cheruvu area", "Inorbit Mall / Shilparamam", "Cyber Towers road", "Madhapur Metro station area"],
    bookingTips: [
      "Staying in a PG or hostel? Mention the building name and the nearest landmark — many Madhapur PGs share the same lane.",
      "Office visit? Tell us the building and whether visitors need a gate pass, so the technician can be registered in advance.",
      "Evening slots fill fastest on weekdays; book earlier in the day if you want same-day service.",
    ],
    faqs: [
      { q: "Can a technician come to my PG or hostel in Madhapur?", a: "Yes. We regularly visit PGs, hostels and co-living buildings in Madhapur. Share the building name, floor and a landmark when you book, and the technician will call on arrival." },
      { q: "Can you service my phone at my office near Cyber Towers or Durgam Cheruvu?", a: "Yes, wherever visitors are allowed. Tell us the building name and any gate-pass process at booking; most screen and battery jobs are done within a lunch break." },
      { q: "Do you cover Ayyappa Society and Image Gardens Road?", a: "Yes — both are part of our Madhapur route, along with Patrika Nagar and Vittal Rao Nagar. Kavuri Hills has its own area page but gets the same doorstep service." },
      { q: "Is doorstep service more expensive in Madhapur?", a: "No. The price is the same as anywhere else in Hyderabad and there is no travel charge. You get a quote before any work starts." },
    ],
  },

  gachibowli: {
    overview: [
      "Gachibowli is where Hyderabad's Financial District begins — large tech campuses, ISB, the University of Hyderabad, IIIT Hyderabad and the GMC Balayogi Stadium, surrounded by gated communities and high-rise apartments. People here tend to carry recent flagship phones, and a cracked screen or failing battery gets in the way of a working day quickly.",
      "TurboFix comes to you — at home in a gated community or at your office — with OEM-grade parts and a warranty of up to 1 year. For premium models we confirm part availability before the visit so the job can be finished in one go.",
    ],
    pockets: ["Indira Nagar", "Anjaiah Nagar", "Gowlidoddi", "Khajaguda", "DLF Cyber City", "ISB Road", "Gachibowli Stadium area", "Telecom Nagar"],
    bookingTips: [
      "Gated community? Share the tower and flat number and approve the visitor entry when the technician reaches the gate.",
      "Tech campuses often restrict visitors — we can meet you at the reception, visitor lounge or a nearby café instead.",
      "For iPhone Pro / Galaxy Ultra / Pixel Pro models, tell us the exact model when booking so the right part is carried.",
    ],
    faqs: [
      { q: "Can you come to my office campus in Gachibowli?", a: "Yes, if visitors are allowed. Many campuses have security rules, so we can also meet you at reception or a visitor area. Tell us the campus name when booking." },
      { q: "Do you cover Khajaguda, Gowlidoddi and Indira Nagar?", a: "Yes. They are part of our Gachibowli route, along with Anjaiah Nagar, DLF Cyber City and the ISB Road area." },
      { q: "Do you service premium phones like iPhone Pro or Galaxy Ultra at home?", a: "Yes. We use OEM-grade parts as standard and confirm availability for your exact model before the visit. Genuine brand parts can be arranged on request." },
      { q: "What happens to my data during the service?", a: "The work is done in front of you and our technicians do not open your photos, messages or apps. You can keep the phone locked for most screen and battery jobs." },
    ],
  },

  ameerpet: {
    overview: [
      "Ameerpet is Hyderabad's best-known coaching district — IT training institutes, bank-exam and competitive-exam classes, and the hostels and PGs that house thousands of students. It is also one of the city's busiest Metro interchanges, where the Red and Blue lines meet.",
      "For students, a phone is the classroom: recorded lectures, mock tests, notes and payments all live on it. TurboFix keeps prices transparent and quotes before starting, and because our studio is in Aghapura, Nampally, Ameerpet is one of the areas closest to our base.",
    ],
    pockets: ["Vengal Rao Nagar", "Ameerpet Metro station area", "Mythrivanam / coaching institutes lane", "Ameerpet main road", "SR Nagar border", "Begumpet side lanes"],
    bookingTips: [
      "Between classes? Book a slot around your class timings — most screen and battery jobs take under an hour.",
      "Hostel or PG stay: share the hostel name and a nearby landmark; many are in the same building blocks.",
      "Prefer to drop in? Our walk-in studio in Aghapura, Nampally is a short ride away.",
    ],
    faqs: [
      { q: "Do you offer student-friendly pricing in Ameerpet?", a: "Every job is quoted before work starts, with no travel charge, and you pay only after the phone is working. For budget phones we can suggest the most cost-effective part option." },
      { q: "Can you come to my hostel or PG in Ameerpet?", a: "Yes. Share the hostel name, room or floor, and a landmark. The technician will call you on arrival." },
      { q: "Can I get my phone serviced between coaching classes?", a: "Yes. Screen and battery replacements usually take 20–45 minutes, so we can schedule the visit around your class timings." },
      { q: "Do you cover Vengal Rao Nagar and SR Nagar?", a: "Yes. Vengal Rao Nagar is part of our Ameerpet route, and SR Nagar, Begumpet and Panjagutta have their own area pages with the same doorstep service." },
    ],
  },

  dilsukhnagar: {
    overview: [
      "Dilsukhnagar is one of south-east Hyderabad's busiest shopping and commuting hubs — the main road is lined with stores, cinemas and coaching centres, and the Dilsukhnagar and Chaitanyapuri Metro stations on the Red line bring in people from across the city every day.",
      "Shop owners, students and families here can't afford to be without a phone for long. TurboFix brings the technician to your home, shop or office in and around Dilsukhnagar, quotes before starting, and you pay only after the phone is tested and working.",
    ],
    pockets: ["Gaddiannaram", "New Maruthi Nagar", "Dilsukhnagar main road", "Chaitanyapuri", "Kothapet side", "Dilsukhnagar Metro station area"],
    bookingTips: [
      "Running a shop? We can visit during quieter hours so the job doesn't interrupt business.",
      "Give the nearest main-road landmark — the side lanes off Dilsukhnagar main road can be hard to find.",
      "Booking for several family phones? Tell us all the models so we can bring parts for each.",
    ],
    faqs: [
      { q: "Can you visit my shop in Dilsukhnagar?", a: "Yes. Tell us the shop name and a landmark on the main road. We can also schedule the visit for a quieter time of day." },
      { q: "Do you cover Gaddiannaram, Chaitanyapuri and Kothapet?", a: "Yes. Gaddiannaram and New Maruthi Nagar are part of our Dilsukhnagar route; Kothapet, LB Nagar and Nagole have their own area pages." },
      { q: "Can you service more than one phone in a single visit?", a: "Yes. Each phone gets its own quote and warranty. Let us know all the models when booking so the right parts are carried." },
      { q: "Do I need to pay anything before the technician starts?", a: "No. There is no advance payment. You get a quote first and pay after the phone is working." },
    ],
  },

  kondapur: {
    overview: [
      "Kondapur is a residential favourite for people working in HITEC City and Gachibowli — large gated communities, independent houses in older colonies, schools, and shopping along the Kondapur–Miyapur road around Sarath City Capital Mall and Botanical Garden.",
      "TurboFix covers the gated communities, older colonies and offices across Kondapur with doorstep service: the technician brings OEM-grade parts, works at your door and tests every function before handing the phone back.",
    ],
    pockets: ["Kothaguda", "Masjid Banda", "Raghavendra Colony", "Raja Rajeshwari Colony", "Hanuman Nagar", "Botanical Garden Road", "Sarath City Capital Mall area", "Whitefields Road"],
    bookingTips: [
      "Gated community? Share the tower and flat number and approve the visitor entry at the gate.",
      "Older colonies like Masjid Banda and Kothaguda have similar lane names — a landmark helps the technician reach you faster.",
      "Weekend slots are popular in Kondapur; book early for a Saturday or Sunday visit.",
    ],
    faqs: [
      { q: "Do you cover Kothaguda, Masjid Banda and Raghavendra Colony?", a: "Yes. They are all part of our Kondapur route, along with Raja Rajeshwari Colony, Hanuman Nagar and the Botanical Garden Road area." },
      { q: "Can the technician come inside my gated community?", a: "Yes. Share your tower and flat number and approve the visitor entry when the technician reaches the gate." },
      { q: "Are weekend visits available in Kondapur?", a: "Yes, on Saturdays and Sundays too. Weekend slots fill up quickly, so it helps to book a day ahead." },
      { q: "Will I get a warranty for work done at home?", a: "Yes. Parts and workmanship carry our warranty of up to 1 year, whether the job is done at your home, your office or our studio." },
    ],
  },

  "hitech-city": {
    overview: [
      "HITEC City is the heart of Hyderabad's IT industry — Cyber Towers, Mindspace and the tech parks around them employ tens of thousands of people who rely on their phones for work calls, authentication apps and messaging all day.",
      "Most HITEC City bookings are office visits: the technician meets you at your building, completes common jobs like screen or battery replacement within a lunch break, and tests everything before you pay. Evening visits to nearby homes in Madhapur, Kondapur and Raidurg are also available.",
    ],
    pockets: ["Cyber Towers", "Mindspace", "HITEC City Metro station area", "Raidurg side", "Shilparamam", "Kothaguda junction"],
    bookingTips: [
      "Most tech parks need visitor registration — share your building, company reception and any gate-pass process when you book.",
      "Keep work authentication apps in mind: back up or note any app that needs re-verification after a screen or board-level job.",
      "Lunch-hour slots are the easiest for office visits; book the day before for a specific time.",
    ],
    faqs: [
      { q: "Can you service my phone at my office in HITEC City?", a: "Yes, where visitors are allowed. Share your building and reception details at booking; if entry is restricted we can meet you at the visitor area." },
      { q: "Can the job be done during my lunch break?", a: "Screen and battery replacements usually take 20–45 minutes, so they fit in most lunch breaks. Board-level work takes longer and is scheduled separately." },
      { q: "Will my work apps and data be safe?", a: "Our technicians do not access your apps, files or photos. For most screen and battery jobs you can keep the phone locked throughout." },
      { q: "Do you also visit homes near HITEC City?", a: "Yes. We cover homes in Madhapur, Kondapur, Raidurg and Gachibowli, including evening slots after office hours." },
    ],
  },

  "banjara-hills": {
    overview: [
      "Banjara Hills is one of Hyderabad's most established addresses — its numbered roads (Road No. 1 to Road No. 14) are lined with residences, hospitals, hotels, boutiques and offices, from GVK One and City Center Mall to the hospitals along Road No. 1.",
      "Many phones here are premium models, and owners want careful work with the right parts. TurboFix confirms part availability for your exact model before the visit, works at your home or office, and tests every function before handing the phone back. Banjara Hills is also close to our studio in Aghapura, Nampally.",
    ],
    pockets: ["Road No. 1 to Road No. 14", "Road No. 12 commercial strip", "GVK One / City Center Mall area", "Care Hospitals Road No. 1", "Taj Krishna / Road No. 1", "Near KBR Park border"],
    bookingTips: [
      "Share the Road number and house or building name — addresses in Banjara Hills are organised by road number.",
      "For premium models (iPhone Pro, Galaxy Ultra, Pixel Pro), tell us the exact model so the correct part is carried.",
      "Staff or security at the gate? Let them know a TurboFix technician is expected.",
    ],
    faqs: [
      { q: "Do you use genuine parts for premium phones in Banjara Hills?", a: "We use OEM-grade parts as standard. Genuine brand parts can be arranged on request for supported models — we confirm availability and price before the visit." },
      { q: "Can the technician come to my residence or office on any Road number?", a: "Yes, we cover all of Banjara Hills, from Road No. 1 to Road No. 14. Share the road number and building name when booking." },
      { q: "Can I get a quote before the technician visits?", a: "Yes. Tell us the model and the problem when booking and we'll share an estimate; the final price is confirmed on inspection before any work starts." },
      { q: "Is there a walk-in option near Banjara Hills?", a: "Yes. Our studio in Aghapura, Nampally is a short drive away if you prefer to drop in." },
    ],
  },

  kukatpally: {
    overview: [
      "Kukatpally is one of Hyderabad's largest residential areas — KPHB Colony's phases, JNTU, the Forum and Nexus malls around the Y junction, and dense colonies of apartments, independent houses and student accommodation along the Metro's Red line.",
      "With so many families, students and IT commuters, Kukatpally is one of our busiest service areas. The technician comes to your home, hostel or shop, gives a quote before starting, and tests the phone with you before you pay.",
    ],
    pockets: ["Allwyn Colony", "Balaji Nagar", "Bhagya Nagar Colony", "Hyder Nagar", "Vivekananda Nagar", "Gajularamaram", "JNTU area", "Y Junction / Forum Mall area"],
    bookingTips: [
      "Mention your colony name as well as the street — many Kukatpally colonies have similar road names.",
      "For KPHB, tell us the phase number; KPHB also has its own area page.",
      "Students near JNTU: share your hostel name and a landmark; evening slots work well after classes.",
    ],
    faqs: [
      { q: "Do you cover all of Kukatpally, including Allwyn Colony and Vivekananda Nagar?", a: "Yes. Allwyn Colony, Balaji Nagar, Bhagya Nagar Colony, Hyder Nagar, Vivekananda Nagar and Gajularamaram are all part of our Kukatpally route. KPHB has its own page with the same service." },
      { q: "Can you come to a student hostel near JNTU?", a: "Yes. Share the hostel name and a landmark when you book; the technician will call on arrival." },
      { q: "How long does a typical visit take?", a: "Most screen and battery jobs take 20–45 minutes. Charging port work usually takes 25–35 minutes." },
      { q: "Is there a travel charge for Kukatpally?", a: "No. Doorstep service costs the same across Hyderabad, and you only pay after the phone is working." },
    ],
  },

  secunderabad: {
    overview: [
      "Secunderabad, Hyderabad's twin city, grew around its cantonment and the Secunderabad Railway Station. Today it combines busy commercial streets like MG Road, Rashtrapati Road and the Paradise junction with residential neighbourhoods such as Marredpally, Sitaphalmandi and Chilkalguda.",
      "TurboFix covers both the civilian areas and the neighbourhoods around the cantonment with doorstep service — useful if you're travelling, working long hours, or simply don't want to queue at a shop near the station.",
    ],
    pockets: ["Marredpally", "Sitaphalmandi", "Chilkalguda", "Patny", "Rani Gunj", "Paradise junction", "Clock Tower / MG Road", "Secunderabad Railway Station area"],
    bookingTips: [
      "Some cantonment areas have entry checks — share the exact address and any entry requirements when you book.",
      "Travelling from the station? We can meet you at a convenient nearby location; tell us your timing.",
      "Give a landmark such as Paradise, Clock Tower or Patny — it helps the technician reach you faster.",
    ],
    faqs: [
      { q: "Do you cover Marredpally, Sitaphalmandi and Chilkalguda?", a: "Yes. They are part of our Secunderabad route, along with Patny and Rani Gunj. Trimulgherry, Bowenpally, Tarnaka and Malkajgiri have their own area pages." },
      { q: "Can you visit addresses inside the cantonment?", a: "Where entry is permitted, yes. Share the address and any entry requirements when you book so the visit can be arranged." },
      { q: "I'm catching a train — can I get a quick screen or battery replacement?", a: "Often, yes. Tell us your train time when booking; screen and battery jobs usually take 20–45 minutes, and we'll confirm whether the slot works." },
      { q: "Do you service older or budget phones?", a: "Yes. We service all price segments and confirm part availability for older models before the visit." },
    ],
  },

  "lb-nagar": {
    overview: [
      "LB Nagar (Lal Bahadur Nagar) is the gateway to south-east Hyderabad — the Inner Ring Road meets the Vijayawada highway here, and LB Nagar is the end of the Metro's Red line. Around the busy junction are large residential colonies that stretch towards Hasthinapuram, Mansoorabad and Meerpet.",
      "With long commutes and busy markets, few people here want to spend half a day at a service shop. TurboFix brings the technician to your home or shop across LB Nagar and the surrounding colonies, with a quote before starting and payment only after the phone is working.",
    ],
    pockets: ["Hasthinapuram", "Chintalkunta", "Mansoorabad", "Bairamalguda", "Meerpet", "LB Nagar Metro / junction area", "Kothapet side"],
    bookingTips: [
      "Give a landmark away from the main junction — the colonies around LB Nagar are spread out.",
      "For Meerpet, Hasthinapuram and Mansoorabad, mention the colony name as well as the road.",
      "Evening and weekend slots are available for people who commute to work.",
    ],
    faqs: [
      { q: "Do you cover Hasthinapuram, Mansoorabad and Meerpet?", a: "Yes. They are part of our LB Nagar route, along with Chintalkunta and Bairamalguda. Vanasthalipuram, Saroor Nagar and Kothapet have their own area pages." },
      { q: "Can you come in the evening after I get back from work?", a: "Yes. Evening slots are available; weekend visits can be booked too." },
      { q: "Is doorstep service available on the same day in LB Nagar?", a: "Same-day slots are often available for bookings made earlier in the day, depending on the technician schedule." },
      { q: "Do I pay before or after the service?", a: "After. You get a quote before any work starts and pay only when the phone is tested and working." },
    ],
  },
};

export function getLocalityGuide(slug: string): LocalityGuide | undefined {
  return localityGuides[slug];
}
