// Parses scripts/master-location-list.txt (the full supplied master
// location list, organized by section), deduplicates it, cross-references
// against the live locationData array in data/locations.ts, classifies
// every entry (published / alias-of-a-published-page / sub-unit that
// shouldn't get its own page / draft awaiting verification), assigns a
// parent-locality + zone hint, and regenerates data/locationInventory.ts
// plus a coverage report. Pure Node, no deps — run with
// `node scripts/build-location-inventory.js`.
//
// Run this again after:
//   - adding more names to scripts/master-location-list.txt
//   - promoting a draft to a real page (add it to locationData in
//     data/locations.ts with real, verified content) — its status here
//     flips to "published" automatically on the next run.

const fs = require("fs");
const path = require("path");

const RAW_LIST_PATH = path.join(__dirname, "master-location-list.txt");
const LOCATIONS_TS_PATH = path.join(__dirname, "..", "data", "locations.ts");
const OUT_INVENTORY_TS = path.join(__dirname, "..", "data", "locationInventory.ts");
const OUT_REPORT_MD = path.join(__dirname, "coverage-report.md");

function collapse(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Known alternate-name/spelling collisions between the supplied list and
// the already-published data (confirmed manually — both names refer to the
// same real place). Maps supplied-list collapsed key -> published-data
// collapsed key.
const MANUAL_ALIASES = {
  punjagutta: "panjagutta", // both spellings common locally; published as "Panjagutta"
  kphb: "kphbcolony", // "KPHB" is colloquial shorthand for the published "KPHB Colony" page
  ramachandrapuram: "rcpuram", // "Ramachandrapuram" is the full name of the published "RC Puram" page
  serilingampally: "lingampally", // "Serilingampally" is the formal/mandal name; published as "Lingampally"
  sanjeevareddynagar: "srnagar", // Wikipedia: "Sanjeeva Reddy Nagar, commonly known as S. R. Nagar" — same place, published as "SR Nagar"
  doolpet: "dhoolpet", // alternate spelling of the published "Dhoolpet"
  charlapally: "cherlapally", // alternate romanization of the published "Cherlapally" (railway station is spelled "Charlapalli")
  musarambagh: "moosarambagh", // confirmed same place — "Musarambagh Metro Station" serves published "Moosarambagh"
  langerhouse: "langerhouz", // alternate spelling of the published "Langer Houz"
  errummanzil: "irrummanzil", // same 1870s palace/locality, two common transliterations — published as "Irrum Manzil"
  bheltownship: "rcpuram", // Wikipedia's own article title is "Ramachandrapuram (BHEL Township)" — same place, published as "RC Puram"
  rajarajeshwarinagar: "rajarajeshwaricolony", // confirmed via search: same Kondapur locality as the published "Raja Rajeshwari Colony", Nagar/Colony naming variance
  madeenaguda: "madinaguda", // same NH-9 locality between Chandanagar/Hafeezpet/Miyapur — Wikipedia's own page uses both spellings interchangeably; published under the more common "Madinaguda" spelling
  kalapather: "kalapathar", // same Old City neighbourhood, two common transliterations — police station, constituency and postal sources use "Kalapathar"; published under that spelling
  maruthinagar: "newmaruthinagar", // supplied list's bare "Maruthi Nagar" (Dilsukhnagar-area) is the same place real-estate portals list as "New Maruthi Nagar" — published under the disambiguated name to avoid conflation with the unrelated Maruthi Nagar near HMT Colony
  raidurgam: "raidurg", // confirmed via Wikipedia/SquareYards/Apple Maps to be the same HITEC-City-adjacent place as the published "Raidurg" — just an alternate spelling
  rashidguda: "rasheedguda", // same Shamshabad-mandal village; "Rasheedguda" is the more accurate spelling per village records, published under that spelling
  bhel: "rcpuram", // bare "BHEL" shares RC Puram/BHEL Township's coordinates and pincode (502032) — same place, not a separate locality
  fatehnagar: "fathenagar", // Wikipedia's own "Fateh Nagar, Hyderabad" article refers to the neighbourhood as "Fatehnagar" in its opening line — same place, published under that spelling
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── 1. Parse raw list into [{ name, section }], and record each section's
//    first-listed ("primary") name — the locality the section is named after. ──
const raw = fs.readFileSync(RAW_LIST_PATH, "utf8");
const lines = raw.split(/\r?\n/);
let currentSection = null;
const occurrences = []; // { name, section }
const sectionPrimary = new Map(); // section -> first name listed under it

for (const rawLine of lines) {
  const line = rawLine.trim();
  if (!line) continue;
  if (line.startsWith("## ")) {
    currentSection = line.slice(3).trim();
    continue;
  }
  occurrences.push({ name: line, section: currentSection });
  if (!sectionPrimary.has(currentSection)) sectionPrimary.set(currentSection, line);
}

// ── 2. Deduplicate by collapsed key, tracking every section + spelling seen ──
const byKey = new Map(); // collapsedKey -> { canonicalName, spellings:Set, sections:Set, count }

for (const { name, section } of occurrences) {
  const rawKey = collapse(name);
  const key = MANUAL_ALIASES[rawKey] || rawKey;
  if (!byKey.has(key)) {
    byKey.set(key, {
      canonicalName: name,
      spellings: new Set([name]),
      sections: new Set([section]),
      count: 1,
    });
  } else {
    const entry = byKey.get(key);
    entry.spellings.add(name);
    entry.sections.add(section);
    entry.count += 1;
  }
}

// ── 3. Cross-reference against live locationData ──
const locationsSrc = fs.readFileSync(LOCATIONS_TS_PATH, "utf8").replace(/\r\n/g, "\n");
const arrayStart = locationsSrc.indexOf("export const locationData");
const arrayBodyStart = locationsSrc.indexOf("[", arrayStart);
const arrayBodyEnd = locationsSrc.indexOf("\n];", arrayBodyStart);
const arrayBody = locationsSrc.slice(arrayBodyStart, arrayBodyEnd);
const objectBlocks = arrayBody.split(/\n  \},/).map((b) => b.trim()).filter(Boolean);

const published = []; // { slug, name, zone, key }
for (const block of objectBlocks) {
  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const zoneMatch = block.match(/zone:\s*"([^"]+)"/);
  if (!slugMatch || !nameMatch) continue;
  published.push({
    slug: slugMatch[1],
    name: nameMatch[1],
    zone: zoneMatch ? zoneMatch[1] : null,
    key: collapse(nameMatch[1]),
  });
}
const publishedByKey = new Map(published.map((p) => [p.key, p]));
if (published.length < 50) {
  console.error(`WARNING: only parsed ${published.length} published locations — parser likely broken on data/locations.ts formatting. Aborting without writing output.`);
  process.exit(1);
}

function resolvePublished(name) {
  const rawKey = collapse(name);
  const key = MANUAL_ALIASES[rawKey] || rawKey;
  return publishedByKey.get(key) || null;
}

// ── 4. Zone-hint lookup: prefer a published match's real zone; else derive
//    from the section header via a manual, geography-based lookup table.
//    This is a TRIAGE HINT for whoever verifies a draft next — not an
//    assertion of fact. ──
const sectionZoneHints = {
  "CENTRAL HYDERABAD": "central", "NAMPALLY": "central", "HIMAYATNAGAR / BASHEERBAGH": "central",
  "LAKDICAPUL / SAIFABAD": "central", "KHAIRATABAD": "central", "BANJARA HILLS": "central",
  "JUBILEE HILLS": "central", "PUNJAGUTTA": "central", "SOMAJIGUDA": "central", "BEGUMPET": "central",
  "AMEERPET": "central", "SR NAGAR": "central", "YOUSUFGUDA": "central", "SANATH NAGAR": "central",
  "ERRAGADDA": "central", "WEST HYDERABAD / IT CORRIDOR": "west", "MADHAPUR": "west", "KONDAPUR": "west",
  "GACHIBOWLI": "west", "FINANCIAL DISTRICT": "west", "NANAKRAMGUDA": "west", "RAIDURG": "west",
  "MANIKONDA": "west", "PUPPALAGUDA": "west", "NARSINGI": "west", "KOKAPET": "west", "TELLAPUR": "west",
  "OSMAN NAGAR": "west", "KUKATPALLY / NORTHWEST": "west", "MIYAPUR": "west", "HAFEEZPET": "west",
  "CHANDANAGAR": "west", "LINGAMPALLY": "west", "NIZAMPET": "west", "BACHUPALLY": "west",
  "PRAGATHI NAGAR": "west", "KOLLUR": "west", "PATANCHERU": "west", "BEERAMGUDA": "west",
  "AMEENPUR": "west", "RC PURAM": "west", "SECUNDERABAD / NORTH": "north", "MALKAJGIRI": "north",
  "TARNAKA": "north", "HABSIGUDA": "north", "UPPAL": "north", "RAMANTHAPUR": "north", "NACHARAM": "north",
  "MALLAPUR": "north", "BODUPPAL": "north", "PEERZADIGUDA": "north", "ALWAL": "north", "KOMPALLY": "north",
  "SUCHITRA": "north", "BOWENPALLY": "north", "TRIMULGHERRY": "north", "SAINIKPURI": "north", "ECIL": "north",
  "AS RAO NAGAR": "north", "KAPRA": "north", "MOULA ALI": "north", "MEDCHAL": "north",
  "MEHDIPATNAM / SOUTH-CENTRAL": "south", "TOLICHOWKI": "south", "SHAIKPET": "south", "ATTAPUR": "south",
  "RAJENDRANAGAR": "south", "LANGER HOUZ": "south", "OLD CITY / CHARMINAR": "south",
  "OLD CITY / SHAHALIBANDA": "south", "OLD CITY / MOGHALPURA": "south", "OLD CITY / HUSSAINI ALAM": "south",
  "OLD CITY / FALAKNUMA": "south", "OLD CITY / BAHADURPURA": "south", "OLD CITY / CHANDRAYANGUTTA": "south",
  "OLD CITY / BARKAS": "south", "OLD CITY / KANCHANBAGH": "south", "OLD CITY / MALAKPET": "south",
  "OLD CITY / DABEERPURA": "south", "OLD CITY / YAKUTPURA": "south", "OLD CITY / SANTOSHNAGAR": "south",
  "OLD CITY / SAIDABAD": "south", "OLD CITY / REIN BAZAAR": "south", "OLD CITY / CHANCHALGUDA": "south",
  "OLD CITY / MADANNAPET": "south", "LB NAGAR / EAST / SOUTH-EAST": "east", "KOTHAPET": "east",
  "DILSUKHNAGAR": "east", "SAROORNAGAR": "east", "NAGOLE": "east", "MANSOORABAD": "east",
  "VANASTHALIPURAM": "east", "HASTHINAPURAM": "east", "BN REDDY NAGAR": "east", "HAYATHNAGAR": "east",
  "CHINTALKUNTA": "east", "MEERPET": "south", "JILLELAGUDA": "south", "BADANGPET": "south",
  "AIRPORT / SOUTH / SHAMSHABAD": "south", "AIRPORT / SOUTH / ADIBATLA": "outskirts",
  "AIRPORT / SOUTH / KONGARA KALAN": "outskirts", "AIRPORT / SOUTH / TURKAYAMJAL": "outskirts",
  "AIRPORT / SOUTH / TUKKUGUDA": "outskirts", "AIRPORT / SOUTH / MAHESHWARAM": "outskirts",
  "AIRPORT / SOUTH / IBRAHIMPATNAM": "outskirts", "EAST / NORTH-EAST / GHATKESAR": "east",
  "EAST / NORTH-EAST / POCHARAM": "east", "EAST / NORTH-EAST / KEESARA": "outskirts",
  "EAST / NORTH-EAST / DAMMAIGUDA": "outskirts", "EAST / NORTH-EAST / NAGARAM": "outskirts",
  "EAST / NORTH-EAST / RAMPALLY": "outskirts", "EAST / NORTH-EAST / JAWAHAR NAGAR": "outskirts",
  "EAST / NORTH-EAST / SHAMIRPET": "outskirts", "ADDITIONAL LOCALITIES": null,
};

// ── 5. "Not a standalone locality" detection — three precise, low-risk
//    categories only. A named residential place (Nagar/Colony/Bagh/Enclave
//    suffixes included) is NEVER auto-classified not-viable here, because
//    many genuinely are established localities (e.g. "Sanjeeva Reddy
//    Nagar", "Ashok Nagar") — those stay "draft" for individual research,
//    same as Tier 1/2. Only mechanically-obvious non-localities are
//    caught automatically: ──
//
//    (a) numbered sub-units of an already-published parent
//    (b) generic transit/infrastructure names (a road, junction, station,
//        flyover, checkpost — not a place with its own residents/identity)
//    (c) a hand-curated list of landmark/IT-park/campus/complex brand
//        names that are commonly listed alongside localities but aren't
//        themselves residential localities
const NOT_VIABLE_NUMBERED_PATTERNS = [
  { re: /^Road No\.?\s*\d+$/i, parentSlug: "banjara-hills" },
  { re: /^KPHB Phase\s*\d+$/i, parentSlug: "kphb" },
  { re: /^Kavuri Hills Phase\s*\d+$/i, parentSlug: "jubilee-hills" },
  { re: /^Street No\.?\s*\d+$/i, parentSlug: null },
  { re: /^Pillar No\.?\s*\d+$/i, parentSlug: "attapur" },
];

const NOT_VIABLE_SUFFIX_PATTERNS = [
  /\bRoads?$/i,
  /Railway Station$/i,
  /Metro Station$/i,
  /Bus Stop$/i,
  /Bus Stand$/i,
  /Check ?Post$/i,
  /\bCircle$/i,
  /\bFlyover$/i,
  /\bJunction$/i,
  /\bDepot$/i,
  /\bBridge$/i,
  /\bDarwaza$/i,
  /\bChowk$/i,
  /\bArea$/i, // generic "X Area" (e.g. "ESI Hospital Area") describes proximity, not a place name
  /\bLane$/i, // a street, not a locality (verified case: "Chirag Ali Lane" is a commercial street within Abids)
  /\bStreet$/i,
];

// Named landmarks/institutions/markets confirmed (individually, not by
// pattern) to be a building, market, or facility rather than a distinct
// residential locality with its own identity — as opposed to e.g. "Sultan
// Bazaar" or "Troop Bazaar", which ARE established as their own locality
// pages by multiple independent real-estate sources and got full pages.
const NOT_VIABLE_LANDMARK_NAMES = new Set([
  "osmania university", "ou campus", "jntu", "botanical garden", "zoo park",
  "gachibowli stadium", "dlf", "dlf cyber city", "cyber towers",
  "cyber gateway", "cyber hills", "mindspace", "knowledge city", "waverock",
  "wave rock sez", "waverock sez", "golden mile", "durgam cheruvu",
  "general bazaar", "monda market", "nampally market", "mozamjahi market",
  "esamia bazaar", "bazar ghat", "koti women's college", "purani haveli",
  "jali hanuman", "clock tower", "paradise",
  "liberty", // famous cinema/junction landmark in Himayatnagar, not itself a locality
  "lower tank bund", // embankment/road around Hussain Sagar, not a locality
  "hyderabad airport", // the airport facility itself, not a residential locality
  "galaxy", // Galaxy Theatre, a cinema within Tolichowki
  "seven tombs", // heritage site referenced as "Seven Tombs Road" — a road/site, not a residential locality
  "neknampur lake", // a lake, not a locality
  "mayur marg", // "Marg" = road
  "gulzar houz", // a historic fountain/water reservoir near Charminar, not a residential locality
  "madina building", // a single Waqf-property building (~200 shops, 100 flats), not a locality
  "peddamma temple", // Sri Peddamma Thalli Temple, a religious landmark within Jubilee Hills/CBI Colony
  "shilpa park", // "a small neighbourhood park" per source — a facility, not a locality
  "aerospace sez", // a Special Economic Zone, not a residential locality
  "tcs adibatla", // a company campus (Tata Consultancy Services), not a locality
]);

// Named sub-colonies/enclaves confirmed to sit INSIDE an already-published
// locality rather than being distinct standalone localities themselves —
// mostly government-designated internal colonies of Banjara Hills, plus a
// handful of confirmed sub-parts of other published pages.
// Map (not just a Set) so each enclave can carry its OWN confirmed parent
// slug, overriding whatever the generic section-based parentHint would
// have guessed — needed because some of these (e.g. "Bagh Amberpet") only
// appear in the flat "ADDITIONAL LOCALITIES" bucket, which carries no
// reliable geographic signal on its own.
const NOT_VIABLE_ENCLAVE_NAMES = new Map([
  ["anand banjara colony", "banjara-hills"], ["banjara kamal", "banjara-hills"],
  ["banjara saman", "banjara-hills"], ["bhola nagar", "banjara-hills"],
  ["cbi colony", "banjara-hills"], ["ias colony", "banjara-hills"],
  ["journalist colony", "banjara-hills"], ["khaja nagar", "banjara-hills"],
  ["masab tank side", "banjara-hills"], ["ministers colony", "banjara-hills"],
  ["mithila nagar", "banjara-hills"], ["mla colony", "banjara-hills"],
  ["nbt nagar", "banjara-hills"], ["sagar society", "banjara-hills"],
  ["east marredpally", "marredpally"], ["west marredpally", "marredpally"],
  ["meerpet hb colony", "meerpet"],
  ["bagh amberpet", "amberpet"], // confirmed via search: same real-estate footprint as published "Amberpet"
  ["anand banjara", "banjara-hills"], // confirmed via search to be the same place as "Anand Banjara Colony", already an enclave of Banjara Hills
  ["old bowenpally", "bowenpally"], // a division of Bowenpally, not a distinct locality
  ["balamrai", "rasoolpura"], // explicitly described by source as "a sub-locality in Rasoolpura" with no distinct landmarks of its own
  ["prashasan nagar", "jubilee-hills"], // government-administrators' colony within Jubilee Hills — same category as the already-excluded Banjara Hills gov't colonies (IAS/MLA/Ministers/CBI Colony)
  ["bhel hig", "rc-puram"], ["bhel mig", "rc-puram"], // "High/Middle Income Group" housing categories within BHEL Township (RC Puram), not distinct localities
  ["old mla quarters", "himayatnagar"], // government housing quarters within Himayatnagar
  ["chintal basti", "nampally"], // small settlement referenced only as a sub-area within Nampally/Lakdikapul/Khairatabad sections
  ["east anandbagh", "anandbagh"], // Anandbagh is "bifurcated into East and West Anandbagh" per source — not a separate locality
  ["old alwal", "alwal"], ["temple alwal", "alwal"], ["surya nagar", "alwal"], // named sub-areas of Alwal/Old Alwal, thin standalone content
  ["new malakpet", "malakpet"], ["old malakpet", "malakpet"], // Malakpet is "divided into Old Malakpet and New Malakpet" per source
  ["idpl", "sanath-nagar"], ["ie sanath nagar", "sanath-nagar"], ["industrial estate", "sanath-nagar"], // Sanath Nagar's own industrial zone, already listed as a landmark on that page
  ["telecom nagar", "gachibowli"], // multiple real-estate sources describe it as a colony/extension of Gachibowli on Nehru ORR, not an independent locality
  ["shastripuram", "nawab-saheb-kunta"], // explicitly listed as "Shastripuram Colony, Nawab Saheb Kunta" by multiple sources — a colony within it
  ["auto nagar", "vanasthalipuram"], // confirmed automotive spare-parts/workshop trade zone (bus stop + traffic post named after it), not a residential locality
  ["ngo colony", "vanasthalipuram"], // Non-Gazetted Officers government housing colony — one of four planned colonies inside Vanasthalipuram per historical source
  ["gaganmahal", "himayatnagar"], // shares Himayatnagar's exact pincode (500029); onefivenine explicitly categorizes it as part of the Himayatnagar locality cluster
  ["doctors colony", "saroor-nagar"], // named residential colony within Saroor Nagar, not an independent locality
  ["krishna nagar", "yousufguda"], // named colony sharing Yousufguda's exact pincode (500045); single occurrence in supplied list, no cross-section ambiguity
  ["gar", "financial-district"], // GAR Corporation's IT Park/office campus (GAR Laxmi Infobahn) near Kokapet, not a residential locality
  ["mantri celestia", "financial-district"], // named Mantri Developers apartment complex, not a locality
  ["neopolis", "kokapet"], // HMDA-planned real-estate layout within Kokapet village, not an organically distinct locality
  ["edi bazaar", "falaknuma"], // confirmed market/bazaar area (Hyderabad's oldest marketplace per its own Wikipedia page), not a residential locality
  ["ida patancheru", "patancheru"], // Industrial Development Area (industrial estate) within Patancheru, not a residential locality
  ["dulapally", "kompally"], // Wikipedia documents its formal administrative merger into Kompally Municipality — not an independent locality
  ["saket", "kapra"], // a private township/colony brand (Saket Group's "Saket Colony"/"Saket Township") within Kapra, not an organic locality — also high collision risk with Delhi's well-known Saket
  ["rtc colony", "lb-nagar"], // generic RTC (Road Transport Corporation) employee-housing colony name with thin/inconsistent independent-locality evidence
  ["singareni colony", "saidabad"], // a Singareni Collieries company employee-housing colony within Saidabad
  ["prashanthi hills", "meerpet"], // confirmed a private residential colony (3 phases) under Meerpet village/Saroornagar mandal — administratively grouped into the Badangpet GHMC ward for civic purposes, but its real parent locality is Meerpet, not Badangpet
  ["alkapur township", "manikonda"], // private developer mega-township with internal numbered roads, not a civic locality
  ["lanco hills", "manikonda"], // a single named apartment complex (Lanco Hills Residential Towers), not a locality
  ["maitrivanam", "ameerpet"], // HMDA's own "Commercial Maitrivanam" — a public-office complex/junction landmark, not a residential locality
  ["esi", "sr-nagar"], // ESI (Employees' State Insurance) Hospital and its metro station — a landmark, not a locality
  ["lal bazaar", "trimulgherry"], // historic cantonment-era market area within Trimulgherry, not an independent locality
  ["secunderabad cantonment", "secunderabad"], // military/civic administrative board (Cantonment Board) that itself governs Trimulgherry, Bolarum, Marredpally etc. — an umbrella authority, not a single locality
  ["p&t colony", "dilsukhnagar"], // Posts & Telegraphs employee housing colony in the Dilsukhnagar/Saroornagar postal circle; also a generic name reused by ≥2 unrelated colonies elsewhere in Hyderabad
  ["akbarbagh", "malakpet"], // confirmed GHMC ward within the Malakpet circle
  ["chakripuram", "kapra"], // named colony near Cherlapalli industrial area, Kapra/ECIL
  ["chawani", "malakpet"], // GHMC Ward 29 within the Malakpet circle
  ["dd colony", "amberpet"], // Durgabai Deshmukh Colony, a named colony near Osmania University in Amberpet
  ["defence colony", "sainikpuri"], // well-established organized residential colony adjoining Sainikpuri — distinct from an unrelated same-named "Defence Colony, Gachibowli"
  ["drdo", "kanchanbagh"], // DRDO Township ("Lab Quarters"), a gated institutional-employee residential enclave within Kanchanbagh, not a locality in its own right
  ["hb colony", "moula-ali"], // APHB (Andhra Pradesh Housing Board) government housing colony near Moula Ali
  ["huda colony", "chandanagar"], // HUDA-developed government housing colony within Chandanagar
  ["ida bollaram", "bollaram"], // Industrial Development Area — an industrial estate, not a residential locality; parent is the already-published Bollaram
  ["is sadan", "saidabad"], // named for the IS Sadan police station in the Santosh Nagar/Saidabad division, not an independent locality
  ["janapriya nagar", "hafeezpet"], // builder-developed residential colony (Janapriya is a developer brand used citywide) within Hafeezpet
  ["kakatiya nagar", "neredmet"], // its own Wikipedia article explicitly describes it as "one of the largest and oldest colonies of Neredmet"
  ["lalith bagh", "uppuguda"], // temple-anchored named quarter within Uppuguda (sources use the spelling "Lalitha Bagh")
  ["ngri", "habsiguda"], // National Geophysical Research Institute — a CSIR research campus at the Habsiguda/Uppal boundary, not a residential locality
  ["nizampet village", "nizampet"], // the historic revenue-village core that the modern, already-published Nizampet suburb grew from and takes its name from — same place
  ["nmdc", "masab-tank"], // National Mineral Development Corporation head office plus a small associated employee colony in Masab Tank
  ["pragathi enclave", "pragathi-nagar"], // a private gated residential development (one of several "___ Enclave" colonies) in the Pragathi Nagar/Nizampet corridor
  ["qila mohammad nagar", "golconda"], // historic walled-city quarter within Golconda mandal, predating Charminar
  ["shakti sai nagar", "mallapur"], // named colony within the Mallapur/Nacharam Industrial Development Area
  ["srisailam highway", "tukkuguda"], // NH-765, the Hyderabad–Srisailam road — a road/corridor marketing label, not a locality
  ["thokatta", "bowenpally"], // real-estate sources describe it as part of "New Bowenpally" despite a historical village-level postal identity
  ["vayupuri", "sainikpuri"], // an ex-Air Force officers' defence colony within the Sainikpuri residential cluster
  ["daira", "himayatnagar"], // confirmed via hyderabad.telangana.gov.in's official Village & Panchayats list as one of four villages of Himayatnagar Mandal — real, but no independent postal/civic/real-estate identity found
  ["hasanaliguda", "himayatnagar"], // confirmed via the same official government village list for Himayatnagar Mandal — real, but administrative-only with no independent servicing footprint
  ["jyothi nagar", "rc-puram"], // shares RC Puram's own pincode (502032); real-estate sources tie it explicitly to "Jyothi Nagar, Chanda Nagar... Ramachandrapuram"
  ["kurmaguda", "saidabad"], // consistently tied to Saidabad S.O., pincode 500059, across multiple postal sources — distinct from the separate village "Kurmalguda" in Saroornagar mandal
  ["parvath nagar", "borabanda"], // Wikipedia's Borabanda article lists "Parvat Nagar" as one of its named sub-areas; a civic landmark (Parvath Nagar Community Hall) is addressed within Borabanda, pincode 500018 — distinct from the separately-pincoded "Parvathi Nagar, Madhapur"
  ["premavathi pet", "rajendranagar"], // five independent postal/real-estate sources converge on pincode 500030, postal head office Rajendranagar, with consistent nearby-locality lists
  ["rahmat nagar", "yousufguda"], // postal-tier sources (pincode.net.in, mapsofindia, mappls) consistently list it as "Rahamath Nagar, Yousufguda, Khairatabad," postal head office Yousufguda
  ["sahebnagar", "vanasthalipuram"], // two independent sources (NoBroker, a property-auction listing) both label the same place "Sahebnagar Kalan, Vanasthalipuram" — the colloquial name and the formal revenue-village name for one place, not two
  ["talab katta", "talabchanchalam"], // sits within the "Talab Chanchalam" GHMC ward, Yakutpura constituency — the already-published Talabchanchalam locality
  ["greenlands", "begumpet"], // confirmed no GHMC ward named "Greenlands" exists (sits between Ward 97 Somajiguda and Ward 149 Begumpet); anchored to Greenlands Road and the heritage Greenlands Guest House (Begumpet), not an independent residential colony
  ["gandimaisamma", "dundigal"], // survives only as a colloquial junction/temple-anchored locality name and half of the compound mandal name — the mandal itself (Gandimaisamma-Dundigal) has 0 revenue villages and is fully absorbed into Dundigal Municipality, its real administrative parent
  ["aramghar", "attapur"], // originates from the "Aramghar Home for the Disabled" institution on NH-44; "Aramghar X Roads" is a traffic junction named after it, not a residential locality — no GHMC/HMDA/Census/Wikipedia source treats it as an independent place; nearest administrative locality is Attapur
  ["vijayapuri colony", "uppal"], // a named residential colony within Uppal (alongside sibling colonies Hanumasai Nagar, Venkateswara Colony), sharing Uppal's own ward, constituency and pincode — not an independent locality
  ["anand nagar", "khairatabad"], // official GHMC 2009 ward-delimitation text names "Anand Nagar" within Ward 97–Panjagutta's boundary (Khairatabad/Erramanzil corridor), and the master list's own section tags for this entry match Khairatabad's published tags almost exactly — the competing "Anand Nagar, Swarajyanagar" (500018) namesake has no presence anywhere in the master list
  ["bakaram", "kavadiguda"], // current GHMC ward/circle data lists Bakaram as its own ward (Ward 167, Kavadiguda Circle, Secunderabad Zone) — a recent restructuring, since the 2009 delimitation document had no separate Bakaram ward at all; far more prominent and plausible for an urban locality list than the tiny (~2,253 pop.), 22km-distant Bakaram Jagir village in Moinabad mandal
  ["hakimpet", "shamirpet"], // official GHMC 2009 ward-delimitation text confirms "Hakimpet Kunta" (Jubilee Hills/Shaikpet side) is used only as a boundary/landmark reference for Ward 71–Nanalnagar, not a residential locality; the genuine Hakimpet is a Census village under Shamirpet mandal (not Medchal), pincode 500078, with its own civilian institutions (Telangana State Sports School) beyond the Air Force Station — the master list's own section tag matches Shamirpet's published tag exactly
  ["jawahar nagar", "keesara"], // the master list's own section tagging groups this entry with Keesara (matching the published Keesara page's own tag), and the Keesara-area Jawaharnagar is now confirmed a ward ("Jawahar Nagar Ward," Keesara Circle) under Malkajgiri Municipal Corporation post the Feb-2026 GHMC trifurcation — not an independent town; the competing Yousufguda-area "Jawahar Nagar" shares Yousufguda's own post office with no independent identity
  ["razdar khanpet", "mangalhat"], // the official India Post Mangalhat S.O. record (pincode 500006, Asifnagar taluk) is the governing post office for the area, and a postal aggregator explicitly bundles the pincode as "mangalhat-razdhar-khan-pet-hyderabad" — no independent post office, GHMC ward, or Census entry grants it independent status
  ["teegalguda", "moosarambagh"], // multiple independent mapping sources place "Teegala Guda" at pincode 500036 along Moosarambagh Road / East Prasanth Nagar, matching the already-published Moosarambagh page's own pincode exactly — the competing "Saidabad mandal village" theory doesn't match Saidabad's own confirmed pincode (500059) and the primary Census table shows no village-level breakdown for Saidabad mandal at all
  ["kistareddypet", "beeramguda"], // confirmed a single genuine census village (Krishtareddipet, code 573931, Patancheru mandal, Sangareddy district, pincode 502319) with no second/twin village found across three research passes; the one lingering doubt — a Wikipedia claim of annexation into "Cyberabad Municipal Corporation" — is resolved against annexation: the post-Feb-2026 Cyberabad MC's official Patancheru Circle ward list names exactly 4 wards (Tellapur, Muthangi, Patancheruvu, JP Colony) and Kistareddypet is not among them
  ["ntr nagar", "lb-nagar"], // this master-list entry, as originally grouped under Boduppal, corresponded to nothing real (only an unrelated "NTR Statue" landmark) — but the name is genuinely real elsewhere: GHMC/Malkajgiri MC Ward 36, Saroornagar Circle, confirmed via India Post postal-routing data (api.postalpincode.in) to share LB Nagar's own pincode (500074, no independent post office) and via multiple independent real-estate/locality sources to be locally identified as "NTR Nagar, LB Nagar" — not "Saroor Nagar" despite the administrative circle name. Researched fresh at the owner's direction as an independent candidate (2026-09-09); thin verified distinct content (a generically-named Dargah, NH65 frontage, an LB Nagar Metro Station distance figure not independently confirmed) argues for sub-unit tracking under the already-published LB Nagar page rather than a standalone page that would largely duplicate it
]);

// Manual override reasons for NEEDS VERIFICATION entries that HAVE been
// researched (a real batch spent WebSearch effort on them) but remain
// deliberately unresolved — as opposed to entries nobody has looked at yet.
// Without this, every draft gets the same generic auto-generated reason
// regardless of research history, so a future batch can't tell
// "never researched" apart from "researched, still ambiguous" just by
// reading the data. Keyed by slugify(canonicalName). Do not invent reasons
// here — only record what an actual research pass established.
const MANUAL_VERIFICATION_REASONS = {
  "alkapuri": "Two prior research passes are now in direct conflict, and a third pass did not resolve them. The repo's own master-list internal section tagging groups this entry with Nagole/Mansoorabad, and an official 2009 GHMC boundary text places it on the Kothapet-Nagole border. But a third pass found convergent evidence across 3 independent locality aggregators (onefivenine, findlatitudeandlongitude, 99acres) that pincode 500035 (Kothapet-side, RK Puram sub-locality, Lal Bahadur Nagar constituency) — not 500068 (Nagole) — is Alkapuri's pincode; no standalone \"Alkapuri\" ward exists in the current official ward list either way. The pincode evidence is only medium-confidence (real-estate aggregators, not a street-level GHMC/TSEC map) and directly contradicts the master list's own tagging — genuinely unresolved, not a case of insufficient research effort.",
  "bandlaguda": "Confirmed via the master list's own internal section tagging that \"Bandlaguda\" was sourced from two non-adjacent clusters simultaneously — the Old City cluster (matching the published Barkas/Chandrayangutta/Kanchanbagh pages' own tags) AND a separate Nagole tag — directly proving the supplied entry conflates at least two genuinely distinct, non-adjacent real places (the Old-City Bandlaguda near Chandrayangutta/Falaknuma, pincode 500058, and the fully separate Bandlaguda Jagir Municipal Corporation in Rangareddy district, pincode 500086), on top of the previously-found Nagole/Keshogiri pincode variants. A third pass found a THIRD officially-documented entity — an India Post \"GSI (SR) Bandlaguda\" sub-office, Hayathnagar taluk, pincode 500068 — which further confirms (does not resolve) the conflation: a genuinely multi-site name unfit for a single locality page.",
  "injamamoor": "No evidence found under this exact name across multiple spelling variants and source types (India Post finder, village directories, real-estate listings). The likely-intended nearby village \"Injapur\" (Hayathnagar-adjacent, now administratively under Abdullapurmet mandal/Turkayamjal Municipality following Abdullapurmet's 2016 carve-out from Hayathnagar, pincode 501510) is itself confirmed real and resolved — but the phonetic/spelling gap between \"Injamamoor\" and \"Injapur\" remains too wide to bridge without an explicit source connecting the two spellings; if \"Injapur\" was actually intended, it would need to be raised as a new, separately-named candidate rather than treated as a resolution of this entry.",
  "kondamadugu": "Real village, confirmed administrative parent is Bibinagar mandal, Yadadri Bhuvanagiri district (pincode 508126) — a different district than Ghatkesar (Medchal-Malkajgiri) as the supplied list groups it, roughly 35-45 km from central Hyderabad (17-23 km beyond Ghatkesar itself). Geography is fully resolved. BUSINESS DECISION (2026-09-09): owner reviewed this case-by-case against Mokila and Manchal and declined to publish for now — out of realistic service-area scope given the distance and district boundary; revisit if TurboFix's service area expands east toward Yadadri Bhuvanagiri.",
  "manchal": "Real village (Manchal mandal HQ, Ranga Reddy district, 2011 Census population 4,507), confirmed genuinely rural/exurban, ~45 km South-East of MGBS bus station (best-sourced figure after a third pass found no support for an earlier ~66 km outlier). Geography is fully resolved — this is TurboFix's farthest-flagged candidate. BUSINESS DECISION (2026-09-09): owner reviewed this case-by-case against Mokila and Kondamadugu and declined to publish for now — outside realistic service-area scope at this distance; revisit if the business expands that far south.",
  "sri-ram-nagar": "Confirmed at least THREE genuinely distinct, correctly-named \"Sri Ram Nagar\" localities exist, not two: Sri Ram Nagar, Yousufguda (pincode 500045), Sri Ram Nagar Colony, Kondapur (pincode 500084), and — via the repo's own already-published Kothapet page, which lists \"Sri Ram Nagar\" as one of its own landmarks (pincode 500035, east zone) — a third instance geographically and administratively unrelated to either of the first two. A third research pass specifically hunting for a dominance/prominence signal (commercial density, web presence) between the Yousufguda and Kondapur instances found no meaningful difference and no new disambiguating evidence of any kind — three passes now agree this is genuinely unresolvable without inventing a distinction the sources don't support.",
  "venkateshwara-colony": "Confirmed at least FOUR genuinely distinct \"Venkateshwara Colony\" instances, not two: Boduppal (pincode 500092, \"Shree Venkateshwara Colony\"), a Peerzadiguda/Medipally-area instance (\"Venkateswara Colony, Sai Nagar,\" Saroornagar mandal), a Moulali/Secunderabad instance (\"Venkateshwara Nagar Colony,\" pincode 500040), and — via the repo's own already-published ECIL page, which lists \"Venkateshwara Colony\" as its own landmark (pincode 500062, north zone) — a fourth instance. A third pass found the collision is worse still: a FIFTH instance via India Post (\"Venkateshwara Colony, Bandlaguda Jagir,\" pincode 500086), plus a SIXTH, qualitatively different instance — \"Venkateshwara Colony\" is itself the formal name of GHMC Ward 216, Jubilee Hills Circle, Khairatabad Zone (confirmed by 3 independent current ward-data sources) — a genuine standalone administrative ward, unlike the other five informal colony-name instances. Nothing in the master list's original context for this entry points to the Jubilee Hills ward rather than the Boduppal/Peerzadiguda grouping it was actually tagged under, so no resolution is forced; worth a human checking whether the entry's context was ever meant to reference the Jubilee Hills ward instead.",
  "mufeedpura": "No reliable source found confirming this as an actual Hyderabad locality under any spelling variant tried (Mufeedpura, Mufid Pura, Mofidpura, Mufeed Pura), across repeated primary-source checks (India Post, Wikipedia's Abids/Aghapura/Moghalpura/Dabirpura/Musheerabad/Barkatpura articles, locality databases). The only near-hit (\"Matba Mufid-e-Aam,\" a historical Urdu printing-press name) is an institution, not a place.",
  "sardarpur": "Confirmed absent from the official Census-2011-derived village list for Shamshabad mandal (36 villages enumerated across two independent checks), and a Telangana-wide search (excluding out-of-state namesakes in Madhya Pradesh/Gujarat/Rajasthan) found no \"Sardarpur\" anywhere in the state. The only phonetically similar results are two differently-named \"Sardar Nagar\" villages (Shabad mandal and Maheswaram mandal, Ranga Reddy district) — a distinct name, not a spelling variant, and not a match.",
  "totaguda": "Confirmed via a direct fetch of the primary Census 2011 subdistrict table that Nampally Mandal is recorded as 2 towns and 0 villages — meaning no locality named Totaguda can appear as a distinct Census-enumerated unit under Nampally. One low-tier real-estate aggregator (findeasy.in) lists \"Totaguda\" under a Nampally grouping, but this is uncorroborated by any Census, India Post, GHMC, or municipal record and does not outweigh the primary Census table; the only phonetic near-match found elsewhere is \"Toyaguda\" in Adilabad district, 330 km away and unrelated.",
};

// ── 6. Build the inventory ──
const usedSlugs = new Set(published.map((p) => p.slug));
const inventory = [];

for (const [key, entry] of byKey.entries()) {
  const pub = publishedByKey.get(key);
  const sections = [...entry.sections];

  // Zone hint: published entry's real zone, else section-based hint.
  let zoneHint = pub ? pub.zone : null;
  if (!zoneHint) {
    for (const s of sections) {
      if (sectionZoneHints[s]) { zoneHint = sectionZoneHints[s]; break; }
    }
  }

  // Parent hint: for a published entry, no parent needed (it IS a top-level
  // page). For a draft, look at each source section's primary (header)
  // name — if THAT resolves to a published page, use it as the parent.
  // "ADDITIONAL LOCALITIES" is a flat miscellaneous bucket at the end of
  // the supplied list, not a real geographic cluster — its first-listed
  // entry ("Chintal") is not a meaningful parent for everything else in
  // that bucket, so it's excluded from this lookup entirely.
  let parentSlug = null;
  let parentName = null;
  if (!pub) {
    for (const s of sections) {
      if (s === "ADDITIONAL LOCALITIES") continue;
      const primaryName = sectionPrimary.get(s);
      if (!primaryName) continue;
      const primaryPub = resolvePublished(primaryName);
      if (primaryPub && primaryPub.key !== key) {
        parentSlug = primaryPub.slug;
        parentName = primaryPub.name;
        break;
      }
    }
  }

  // Not-viable sub-unit / infrastructure / landmark check — see the three
  // categories documented above NOT_VIABLE_NUMBERED_PATTERNS.
  let viable = true;
  let notViableKind = null; // "numbered" | "infrastructure" | "landmark"
  if (!pub) {
    for (const { re, parentSlug: pSlug } of NOT_VIABLE_NUMBERED_PATTERNS) {
      if (re.test(entry.canonicalName)) {
        viable = false;
        notViableKind = "numbered";
        if (pSlug) {
          const p = published.find((x) => x.slug === pSlug);
          if (p) { parentSlug = p.slug; parentName = p.name; }
        }
        break;
      }
    }
    if (viable && NOT_VIABLE_SUFFIX_PATTERNS.some((re) => re.test(entry.canonicalName))) {
      viable = false;
      notViableKind = "infrastructure";
    }
    if (viable && NOT_VIABLE_LANDMARK_NAMES.has(entry.canonicalName.toLowerCase())) {
      viable = false;
      notViableKind = "landmark";
    }
    if (viable && NOT_VIABLE_ENCLAVE_NAMES.has(entry.canonicalName.toLowerCase())) {
      viable = false;
      notViableKind = "enclave";
      const enclaveParentSlug = NOT_VIABLE_ENCLAVE_NAMES.get(entry.canonicalName.toLowerCase());
      const p = published.find((x) => x.slug === enclaveParentSlug);
      if (p) { parentSlug = p.slug; parentName = p.name; }
    }
  }

  let slug = pub ? pub.slug : slugify(entry.canonicalName);
  let slugCollisionAdjusted = false;
  if (!pub) {
    let candidate = slug;
    let n = 2;
    while (usedSlugs.has(candidate)) {
      candidate = `${slug}-${n}`;
      n += 1;
      slugCollisionAdjusted = true;
    }
    slug = candidate;
    usedSlugs.add(slug);
  }

  const aliasOf = pub && pub.name !== entry.canonicalName ? pub.name : null;
  const spellingFlag = entry.spellings.size > 1;
  const flagForReview = spellingFlag || slugCollisionAdjusted;

  let reason;
  if (pub && aliasOf) {
    reason = `Same real locality as the published "${aliasOf}" page (supplied under a different name/spelling) — not a separate page, avoids duplicate content.`;
  } else if (pub) {
    reason = "Live page — verified and indexable.";
  } else if (!viable && notViableKind === "numbered") {
    reason = `Numbered sub-unit (road/phase) of "${parentName}", not a distinct locality — would be a thin duplicate page if published separately. Candidate to list as a landmark on the parent page instead.`;
  } else if (!viable && notViableKind === "infrastructure") {
    reason = `This names a road, junction, or transit stop, not a residential locality with its own identity.${parentName ? ` Likely within/near "${parentName}".` : ""} Not a standalone-page candidate.`;
  } else if (!viable && notViableKind === "landmark") {
    reason = `This names a landmark, IT park, campus, or commercial complex, not a residential locality.${parentName ? ` Likely within/near "${parentName}".` : ""} Not a standalone-page candidate.`;
  } else if (!viable && notViableKind === "enclave") {
    reason = `Confirmed to be a named sub-colony/enclave inside "${parentName}", not a distinct standalone locality. Covered under the parent page.`;
  } else {
    const manualReason = MANUAL_VERIFICATION_REASONS[slugify(entry.canonicalName)];
    if (manualReason) {
      reason = manualReason;
    } else if (parentName) {
      reason = `Not yet independently verified. Grouped with "${parentName}" in the supplied list — candidate for a future standalone page pending research (pincode, real landmarks).`;
    } else {
      reason = "Not yet independently verified — insufficient information available to confirm this is a distinct, standalone-worthy locality or assign a parent.";
    }
  }
  if (spellingFlag) {
    reason += ` Multiple spellings seen in the supplied list: ${[...entry.spellings].join(" / ")}.`;
  }

  // Research status only means something for still-unresolved drafts — it
  // distinguishes "a batch actually researched this and it stayed
  // ambiguous" from "nobody has looked at this yet", so a future batch
  // doesn't duplicate research effort. Not applicable to published/alias/
  // sub-unit entries, which already carry their own specific reason.
  const researchStatus = pub || !viable
    ? null
    : (MANUAL_VERIFICATION_REASONS[slugify(entry.canonicalName)] ? "RESEARCHED_UNRESOLVED" : "NEVER_RESEARCHED");

  inventory.push({
    name: entry.canonicalName,
    slug,
    sourceSections: sections,
    spellingVariants: [...entry.spellings],
    parentSlug: pub ? null : parentSlug,
    parentName: pub ? null : parentName,
    zoneHint: zoneHint || "unknown",
    status: pub ? "published" : "draft",
    verified: !!pub,
    indexable: !!pub,
    inSitemap: !!pub,
    publishedSlug: pub ? pub.slug : null,
    aliasOf,
    viable,
    flagForReview,
    reason,
    researchStatus,
  });
}

inventory.sort((a, b) => {
  if (a.status !== b.status) return a.status === "published" ? -1 : 1;
  return a.name.localeCompare(b.name);
});

// ── 7. Cross-check: any published location NOT present anywhere in the
//    supplied master list at all? ──
const suppliedKeys = new Set(byKey.keys());
const publishedNotInSuppliedList = published.filter((p) => !suppliedKeys.has(p.key));

// ── 8. Report ──
const aliasCount = inventory.filter((i) => i.aliasOf).length;
const notViableCount = inventory.filter((i) => !i.viable).length;
const draftCount = inventory.filter((i) => i.status === "draft" && i.viable).length;

// NOTE: a row can have status "published" AND aliasOf set at once — that
// happens when a supplied spelling (e.g. "Ramachandrapuram") merges into the
// same byKey group as an already-published page under a different display
// name ("RC Puram"). aliasOf must take priority here so the four buckets
// (published / alias / sub-unit / draft) stay mutually exclusive and sum to
// totalDistinctAfterDedup — matching the coverage dashboard's categoryOf().
const report = {
  totalLocationsSuppliedRaw: occurrences.length,
  totalDistinctAfterDedup: inventory.length,
  totalPublishedIndexable: inventory.filter((i) => i.status === "published" && !i.aliasOf).length,
  totalAliasOfPublished: aliasCount,
  totalNotViableSubUnit: notViableCount,
  totalDraftNeedsVerification: draftCount,
  totalExistingPublishedLocationsInDataModel: published.length,
  publishedLocationsNotFoundInSuppliedList: publishedNotInSuppliedList.map((p) => p.name),
  zoneHintUnknownCount: inventory.filter((i) => i.zoneHint === "unknown").length,
};

let md = `# Location Coverage Report\n\nGenerated by \`node scripts/build-location-inventory.js\`.\n\n`;
md += `| Metric | Count |\n|---|---|\n`;
md += `| Total location name occurrences in supplied master list | ${report.totalLocationsSuppliedRaw} |\n`;
md += `| Total distinct locations after dedup | ${report.totalDistinctAfterDedup} |\n`;
md += `| Published / indexable | ${report.totalPublishedIndexable} |\n`;
md += `| Alias/duplicate of a published page | ${report.totalAliasOfPublished} |\n`;
md += `| Not-viable sub-unit (road/phase, folds into a parent) | ${report.totalNotViableSubUnit} |\n`;
md += `| Draft — needs verification | ${report.totalDraftNeedsVerification} |\n`;
md += `| Existing published locations in data model | ${report.totalExistingPublishedLocationsInDataModel} |\n`;
md += `| Published locations NOT found anywhere in supplied list | ${publishedNotInSuppliedList.length} |\n`;
md += `| Zone hint unknown (needs manual triage) | ${report.zoneHintUnknownCount} |\n\n`;

if (publishedNotInSuppliedList.length) {
  md += `## Published locations not in the supplied list\n\n`;
  for (const p of publishedNotInSuppliedList) md += `- ${p.name} (${p.slug})\n`;
  md += `\n`;
}

md += `## Aliases — same place as an already-published page\n\n`;
for (const i of inventory.filter((x) => x.aliasOf)) {
  md += `- **${i.name}** → same as published "${i.aliasOf}" (${i.publishedSlug})\n`;
}

md += `\n## Not-viable sub-units (folded under a parent, not standalone pages)\n\n`;
for (const i of inventory.filter((x) => !x.viable)) {
  md += `- **${i.name}** → part of "${i.parentName}" (${i.parentSlug})\n`;
}

fs.writeFileSync(OUT_REPORT_MD, md);

// ── 9. Emit TS data file ──
let ts = `// AUTO-GENERATED by scripts/build-location-inventory.js from
// scripts/master-location-list.txt. This is a COVERAGE INVENTORY, not a
// page list — only entries with status "published" have a live page (see
// data/locations.ts). Draft entries carry no invented content: no intro,
// landmarks, or descriptions have been written for them.
//
// To publish a draft: add a matching entry to locationData in
// data/locations.ts with real, verified content, then re-run
// \`node scripts/build-location-inventory.js\` to refresh this file — no
// architecture changes needed.
//
// Do not hand-edit this file's entries directly; edit
// scripts/master-location-list.txt or data/locations.ts and regenerate.

export interface LocationInventoryEntry {
  name: string;
  slug: string;
  sourceSections: string[];
  spellingVariants: string[];
  /** Published slug this likely belongs under geographically (draft entries only). Null for published entries and for drafts with no derivable parent. */
  parentSlug: string | null;
  parentName: string | null;
  zoneHint: "central" | "west" | "north" | "south" | "east" | "outskirts" | "unknown";
  status: "published" | "draft";
  verified: boolean;
  indexable: boolean;
  inSitemap: boolean;
  publishedSlug: string | null;
  /** Set when this name is a known alt-spelling/alt-name of an already-published page — same real locality, not a separate page. */
  aliasOf: string | null;
  /** False for numbered sub-units (e.g. "Road No. 12", "KPHB Phase 6") that are part of a parent locality rather than a distinct standalone place. */
  viable: boolean;
  flagForReview: boolean;
  reason: string;
  /** Only meaningful for still-unresolved drafts (null for published/alias/sub-unit entries): distinguishes an entry a research batch actually investigated and deliberately left unresolved from one nobody has looked at yet. */
  researchStatus: "RESEARCHED_UNRESOLVED" | "NEVER_RESEARCHED" | null;
}

export const locationInventory: LocationInventoryEntry[] = [\n`;

for (const i of inventory) {
  ts += `  {\n`;
  ts += `    name: ${JSON.stringify(i.name)},\n`;
  ts += `    slug: ${JSON.stringify(i.slug)},\n`;
  ts += `    sourceSections: ${JSON.stringify(i.sourceSections)},\n`;
  ts += `    spellingVariants: ${JSON.stringify(i.spellingVariants)},\n`;
  ts += `    parentSlug: ${i.parentSlug ? JSON.stringify(i.parentSlug) : "null"},\n`;
  ts += `    parentName: ${i.parentName ? JSON.stringify(i.parentName) : "null"},\n`;
  ts += `    zoneHint: ${JSON.stringify(i.zoneHint)},\n`;
  ts += `    status: ${JSON.stringify(i.status)},\n`;
  ts += `    verified: ${i.verified},\n`;
  ts += `    indexable: ${i.indexable},\n`;
  ts += `    inSitemap: ${i.inSitemap},\n`;
  ts += `    publishedSlug: ${i.publishedSlug ? JSON.stringify(i.publishedSlug) : "null"},\n`;
  ts += `    aliasOf: ${i.aliasOf ? JSON.stringify(i.aliasOf) : "null"},\n`;
  ts += `    viable: ${i.viable},\n`;
  ts += `    flagForReview: ${i.flagForReview},\n`;
  ts += `    reason: ${JSON.stringify(i.reason)},\n`;
  ts += `    researchStatus: ${i.researchStatus ? JSON.stringify(i.researchStatus) : "null"},\n`;
  ts += `  },\n`;
}
ts += `];\n`;

fs.writeFileSync(OUT_INVENTORY_TS, ts);

console.log("Done.");
console.log(JSON.stringify(report, null, 2));
