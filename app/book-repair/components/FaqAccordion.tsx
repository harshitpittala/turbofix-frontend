"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { bookRepairFaqs as faqs } from "@/data/bookRepairFaqs";

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900">{q}</span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 sm:py-16">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">Common Questions</h2>
        <p className="text-sm text-gray-500 mb-6">Everything you need to know before booking</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Still have questions? Call us:{" "}
          <a href="tel:+918639605147" className="text-[#0066FF] font-medium">
            86396 05147
          </a>
        </p>
      </div>
    </section>
  );
}
