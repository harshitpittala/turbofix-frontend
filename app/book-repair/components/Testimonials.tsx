import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Srujan",
    initials: "SR",
    location: "Hitech City",
    color: "#2563EB",
    tagColor: "#2563EB",
    tagBg: "#EFF6FF",
    tag: "Screen Replacement",
    text: "iPhone 14 screen cracked on a Sunday. TurboFix came to my apartment in Hitech City by 3 PM and had it done in 25 minutes. Display looks brand new.",
  },
  {
    name: "Tanu Rani",
    initials: "TR",
    location: "Gachibowli",
    color: "#7C3AED",
    tagColor: "#7C3AED",
    tagBg: "#F5F3FF",
    tag: "Water Damage",
    text: "Dropped my phone in water. Thought it was gone for good. The technician came to my office in Gachibowli, recovered everything, and it's been perfect since.",
  },
  {
    name: "Madhava",
    initials: "MD",
    location: "Kondapur",
    color: "#16A34A",
    tagColor: "#16A34A",
    tagBg: "#F0FDF4",
    tag: "Charging Port",
    text: "Charging port wasn't working for weeks. Booked at 11 AM, tech arrived by 1 PM at my home in Kondapur. Sorted in 30 minutes. Straightforward and professional.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-gray-900 mb-6">
          <span className="w-1 h-5 rounded-full bg-[#0066FF]" />
          What Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: `${t.color}18`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 leading-none">{t.name}</p>
                    <p className="text-[11px] text-gray-400 flex items-center gap-0.5 mt-0.5">{t.location}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                  style={{ color: t.tagColor, background: t.tagBg }}
                >
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">Verified customers from across Hyderabad</p>
      </div>
    </section>
  );
}
