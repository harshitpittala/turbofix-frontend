export interface AreaData {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  landmarks: string[];
  pincode?: string;
}

export const hyderabadAreas: AreaData[] = [
  {
    slug: "gachibowli",
    name: "Gachibowli",
    fullName: "Gachibowli, Hyderabad",
    description: "Gachibowli is Hyderabad's premier IT hub, home to major tech parks including DLF Cyber City, Raheja IT Park, and Microsoft. TurboFix provides same-day doorstep mobile service for all of Gachibowli — from apartments to offices.",
    landmarks: ["DLF Cyber City", "Raheja IT Park", "ISB", "Gachibowli Stadium", "Apple House"],
    pincode: "500032",
  },
  {
    slug: "madhapur",
    name: "Madhapur",
    fullName: "Madhapur, Hyderabad",
    description: "Madhapur is at the heart of Hyderabad's HITEC City corridor, surrounded by major tech companies and residential complexes. Our technicians cover all of Madhapur for doorstep mobile service.",
    landmarks: ["HITEC City", "Cyber Towers", "Shilparamam", "Inorbit Mall", "Madhapur Police Station"],
    pincode: "500081",
  },
  {
    slug: "kukatpally",
    name: "Kukatpally",
    fullName: "Kukatpally, Hyderabad",
    description: "Kukatpally is one of Hyderabad's largest and most densely populated residential areas. TurboFix covers all of KPHB, Kukatpally, and surrounding areas for mobile service at your doorstep.",
    landmarks: ["KPHB Colony", "Kukatpally Bus Stand", "Forum Sujana Mall", "JNTU Hyderabad", "Kukatpally Metro"],
    pincode: "500072",
  },
  {
    slug: "ameerpet",
    name: "Ameerpet",
    fullName: "Ameerpet, Hyderabad",
    description: "Ameerpet is central Hyderabad's busiest commercial hub, known for education centers, coaching institutes, and business activity. TurboFix offers convenient doorstep service so you never have to interrupt your busy day.",
    landmarks: ["Ameerpet Metro Station", "SR Nagar", "Begumpet", "Punjagutta", "Street of Coaching Centers"],
    pincode: "500016",
  },
  {
    slug: "kondapur",
    name: "Kondapur",
    fullName: "Kondapur, Hyderabad",
    description: "Kondapur is a thriving residential and commercial area adjacent to HITEC City. A preferred address for IT professionals, Kondapur residents get TurboFix's same-day doorstep service.",
    landmarks: ["Botanical Garden Road", "Lanco Hills", "ISB Road", "Whitefields", "Kondapur Main Road"],
    pincode: "500084",
  },
  {
    slug: "hitech-city",
    name: "HITEC City",
    fullName: "HITEC City, Hyderabad",
    description: "HITEC City (Hyderabad Information Technology and Engineering Consultancy City) is Hyderabad's global IT destination. TurboFix serves all corporate campuses and residential complexes in HITEC City with on-site service at your desk or home.",
    landmarks: ["Cyber Towers", "HITEC City Metro", "Cobalt Block", "L&T Info Park", "iLabs Centre"],
    pincode: "500081",
  },
  {
    slug: "dilsukhnagar",
    name: "Dilsukhnagar",
    fullName: "Dilsukhnagar, Hyderabad",
    description: "Dilsukhnagar is one of Hyderabad's most active commercial areas on the south side. TurboFix extends its doorstep service to Dilsukhnagar and all of south Hyderabad.",
    landmarks: ["Dilsukhnagar Bus Stand", "Kothapet", "Moosarambagh", "Malakpet", "LB Nagar Expressway"],
    pincode: "500060",
  },
  {
    slug: "lb-nagar",
    name: "LB Nagar",
    fullName: "LB Nagar, Hyderabad",
    description: "LB Nagar (Lal Bahadur Nagar) is a major south Hyderabad residential and commercial hub with excellent connectivity. TurboFix covers LB Nagar and all surrounding areas for mobile service.",
    landmarks: ["LB Nagar Metro Station", "Saroornagar", "Vanasthalipuram", "Hayathnagar", "ORR Interchange"],
    pincode: "500074",
  },
];

export function getAreaBySlug(slug: string): AreaData | undefined {
  return hyderabadAreas.find((a) => a.slug === slug);
}
