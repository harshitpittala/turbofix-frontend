import type { Metadata } from "next";
import DeviceServicePage, { type DeviceServicePageData } from "@/components/seo/DeviceServicePage";
import SamsungMotherboardLinks from "@/components/seo/SamsungMotherboardLinks";
import { samsungModels, SAMSUNG_FACTS_CHECKED } from "@/data/samsungModels";

const PATH = "/samsung-motherboard-service";
const TITLE = "Samsung Motherboard Service in Hyderabad";
const DESCRIPTION =
  "Samsung Galaxy motherboard service in Hyderabad: board-level diagnosis, component repair or board replacement, and what happens to data, IMEI, FRP and Knox.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://turbofix.in${PATH}` },
  openGraph: { title: `${TITLE} | TurboFix`, description: DESCRIPTION, url: `https://turbofix.in${PATH}`, type: "article" },
  twitter: { card: "summary_large_image", title: `${TITLE} | TurboFix`, description: DESCRIPTION },
};

const page: DeviceServicePageData = {
  path: PATH,
  h1: "Samsung Galaxy Motherboard Service in Hyderabad",
  subject: "Samsung motherboard service",
  quickAnswer:
    "Most Samsung board faults — no power, no network, no charging, constant restarts — come down to one failed component, which can often be repaired on your original board so your data and IMEI stay intact. A replacement motherboard is the fallback: it starts with empty storage, a different IMEI, and must be free of the previous owner's locks.",
  intro: [
    `This guide covers what applies to every Samsung Galaxy phone: how board faults show up, the difference between component-level repair and a replacement motherboard, and what happens to your data, IMEI, Factory Reset Protection and Samsung Knox. Below it you'll find a page for each of the ${samsungModels.length} Galaxy S, Note, Z, A, M and F models sold in India since 2020, with that model's chipset and details.`,
  ],
  facts: [
    { label: "Models covered", value: `${samsungModels.length} Galaxy phones sold in India since 2020` },
    { label: "Price", value: "Quoted after diagnosis, before any work starts" },
    { label: "Warranty", value: "3, 6 or 12 months depending on the part grade — confirmed with your quote" },
    { label: "Where", value: "Doorstep visit, pickup and delivery, or walk-in at our Nampally studio" },
  ],
  sections: [
    {
      id: "symptoms", heading: "Signs of a Samsung motherboard fault",
      bullets: [
        "No power and no vibration, even on a known-good charger",
        "Stuck on the Samsung logo or restarting in a loop",
        "\"No service\" or \"Emergency calls only\" with a working SIM",
        "Wi-Fi or Bluetooth won't switch on",
        "Hot and draining while idle",
        "Not charging after the port, cable and battery have been ruled out",
      ],
    },
    {
      id: "data", heading: "What happens to your data",
      paragraphs: [
        "Samsung phones encrypt their storage with keys tied to the motherboard. If your original board is repaired at component level, your data is there when it boots. If the board is replaced, the new board starts empty and your data can only come back from a backup — Samsung Smart Switch, Samsung Cloud or Google One.",
        "If the phone is dead and has no backup, board-level repair of the original board is the only way to reach the data. We can't promise recovery before diagnosis, and some faults — a failed processor or storage chip — make it impossible.",
      ],
    },
    {
      id: "frp", heading: "Factory Reset Protection and Reactivation Lock",
      paragraphs: [
        "Factory Reset Protection (FRP) is Google's anti-theft lock: after a reset, the phone asks for the Google account last signed in. Samsung adds its own Reactivation Lock through Find My Mobile. On your own board you simply sign in with your accounts. A replacement board must be free of anyone else's FRP and Reactivation Lock — a locked board is a sign it may not have come from a legitimate source.",
      ],
    },
    {
      id: "knox", heading: "Samsung Knox, Wallet and Secure Folder",
      paragraphs: [
        "Samsung Wallet and Secure Folder rely on Samsung Knox. A genuine board that hasn't been rooted or modified keeps Knox intact. A board whose Knox status has been tripped — for example by rooting — can't run Samsung Wallet or Secure Folder, and that can't be undone. We check Knox-dependent features after board work.",
      ],
    },
    {
      id: "imei", heading: "IMEI numbers",
      paragraphs: [
        "The IMEI belongs to the motherboard. Component-level repair keeps your IMEI; a replacement board means the phone reports that board's IMEI, which should be written on your invoice. Altering an IMEI is an offence in India and is never part of a legitimate repair.",
      ],
    },
  ],
  comparison: { heading: "", column: "", rows: [], summary: "" },
  process: [
    { title: "Diagnose", desc: "Battery, charging port, display and board are tested to find what has actually failed." },
    { title: "Explain options", desc: "Component-level repair or a replacement board — with the effect on data, IMEI and FRP — and a quote before any work." },
    { title: "Repair or replace", desc: "Faulty components are replaced on your board, or a lock-free replacement board is fitted." },
    { title: "Test and document", desc: "Calls, data, Wi-Fi, charging, cameras and Knox features are tested, and any IMEI change is recorded." },
  ],
  faqs: [
    { q: "Can a dead Samsung phone be fixed without replacing the motherboard?", a: "Often, yes. Many no-power faults come down to one component, a connector or liquid corrosion. We diagnose first and only suggest a replacement board when component-level repair isn't realistic." },
    { q: "Will I lose my data with a motherboard replacement?", a: "Yes — data on the old board doesn't move to a new one because storage is encrypted to the board. Restore from Smart Switch, Samsung Cloud or Google One. Without a backup, ask about repairing your original board." },
    { q: "Is it worth repairing an old Samsung phone's motherboard?", a: "It depends on the phone's value, whether you need the data on it, and the cost of the fix. We'll give you an honest comparison, including when a replacement phone makes more sense." },
    { q: "Do you use genuine Samsung motherboards?", a: "Replacement boards vary in source and condition, especially for older models. We tell you exactly what kind of board is being quoted and its warranty period before any work." },
    { q: "Is board work done at my doorstep?", a: "Board-level work needs a microscope and a soldering bench, so it may not be possible at your doorstep. Pickup and delivery are available, or you can bring the phone to our Nampally studio." },
    { q: "Should I go to a Samsung service centre instead?", a: "If your phone is under Samsung's warranty and the fault isn't something you caused, contact Samsung first. For out-of-warranty phones, or when you want component-level repair to keep your data, an independent service is an option." },
  ],
  relatedGroups: [],
  seeAlso: [
    { href: "/samsung-service-hyderabad", label: "Samsung service in Hyderabad" },
    { href: "/motherboard-service-hyderabad", label: "Motherboard service (all brands)" },
    { href: "/water-damage-hyderabad", label: "Water damage service" },
    { href: "/no-fix-no-fee-policy", label: "No fix, no fee policy" },
    { href: "/terms", label: "Warranty terms" },
  ],
  sources: [
    { label: "Wikipedia: List of Samsung Galaxy smartphones (release history)", href: "https://en.wikipedia.org/wiki/List_of_Samsung_Galaxy_smartphones" },
  ],
  checked: SAMSUNG_FACTS_CHECKED,
  breadcrumbs: [
    { name: "Samsung", href: "/samsung-service-hyderabad" },
    { name: "Motherboard Service", href: PATH },
  ],
  bookLabel: "Book Samsung motherboard service",
  disclaimer: "TurboFix is an independent service provider, not a Samsung service centre, and not affiliated with or endorsed by Samsung. Samsung and Galaxy are trademarks of Samsung Electronics.",
  serviceType: "Mobile phone motherboard service",
  datePublished: "2026-10-08",
  dateModified: "2026-10-08",
};

export default function Page() {
  return <DeviceServicePage page={page} extra={<SamsungMotherboardLinks />} />;
}
