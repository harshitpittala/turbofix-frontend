"use client";

import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  const scrollToWizard = () => {
    document.getElementById("book-your-repair")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 sm:py-20 border-t border-gray-100">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Ready to get your phone sorted?
        </h2>
        <p className="text-gray-500 mb-6">Free pickup · Free diagnosis · Pay only after service</p>
        <button
          type="button"
          onClick={scrollToWizard}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-[#0066FF] hover:bg-[#0052CC] shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5"
        >
          Book Doorstep Visit
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-sm text-gray-400 mt-4">
          Or call us directly:{" "}
          <a href="tel:+918639605147" className="text-[#0066FF] font-medium">
            86396 05147
          </a>
        </p>
      </div>
    </section>
  );
}