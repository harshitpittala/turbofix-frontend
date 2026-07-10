import Link from "next/link";
import { CheckCircle2, ShieldCheck, Home } from "lucide-react";

const badges = [
  { icon: CheckCircle2, color: "#16A34A", title: "Pay After Service", desc: "Zero payment upfront" },
  { icon: ShieldCheck, color: "#2563EB", title: "6-Month Warranty", desc: "Parts & workmanship" },
  { icon: Home, color: "#B45309", title: "Doorstep Service", desc: "We come to you" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {badges.map(({ icon: Icon, color, title, desc }) => (
        <div
          key={title}
          className="flex flex-col items-center text-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-6"
        >
          <Icon className="w-6 h-6" style={{ color }} />
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{desc}</p>
          {title === "6-Month Warranty" && (
            <Link href="/terms" className="text-[11px] text-[#0066FF] underline underline-offset-2 mt-0.5">
              View full terms
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}