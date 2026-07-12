import Link from "next/link";
import { Smartphone, Battery, Zap, Volume2, PanelTop, Camera, Droplets, Cpu, Info } from "lucide-react";

const pricing = [
  { icon: Smartphone, color: "#2563EB", title: "Screen Replacement", price: "from ₹799", note: "Varies by model" },
  { icon: Battery, color: "#16A34A", title: "Battery Replacement", price: "from ₹499", note: "OEM-grade cells" },
  { icon: Zap, color: "#DB2777", title: "Charging Port Cleaning", price: "from ₹499", note: "Clean or replace" },
  { icon: Volume2, color: "#D97706", title: "Speaker / Mic Replacement", price: "from ₹399", note: "Speaker & earpiece" },
  { icon: PanelTop, color: "#2563EB", title: "Back Glass", price: "from ₹699", note: "All models supported" },
  { icon: Camera, color: "#7C3AED", title: "Camera Module Replacement", price: "from ₹799", note: "Front & rear cameras" },
  { icon: Droplets, color: "#0891B2", title: "Water Damage Service", price: "from ₹999", note: "Full diagnostic first" },
  { icon: Cpu, color: "#EA580C", title: "Motherboard Service", price: "from ₹1,499", note: "Advanced diagnostics" },
];

export default function PricingGrid() {
  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">Transparent Pricing</h2>
        <p className="text-sm text-gray-500 mb-6">Approximate starting prices. Final quote given before any work begins.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {pricing.map(({ icon: Icon, color, title, price, note }) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
              <Icon className="w-5 h-5 mb-3" style={{ color }} />
              <p className="text-sm font-semibold text-gray-900 leading-snug">{title}</p>
              <p className="text-sm font-bold mt-1.5" style={{ color }}>{price}</p>
              <p className="text-xs text-gray-400 mt-0.5">{note}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-green-50 border border-green-100 px-5 py-4 mt-5">
          <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">
            No hidden charges. You'll receive a fixed quote before any work starts — free diagnosis, no obligation. If
            you decline the quote after inspection, a ₹499 visit charge applies (covers the technician's time and
            travel, not a service fee).{" "}
            <Link href="/no-fix-no-fee-policy" className="font-medium underline underline-offset-2">
              See full policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
