import { ClipboardList, Bike, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Book in 2 minutes", desc: "Tell us your device and what's wrong" },
  { icon: Bike, title: "We come to you", desc: "Technician arrives at your door" },
  { icon: CheckCircle2, title: "Pay after service", desc: "Only if you're fully satisfied" },
];

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-gray-900 mb-6">
          <span className="w-1 h-5 rounded-full bg-[#0066FF]" />
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-[#0066FF]" />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
