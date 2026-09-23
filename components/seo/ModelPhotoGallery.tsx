"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ModelSeries } from "@/data/modelPhotos.generated";

const INITIAL_VISIBLE = 12;

function SeriesGrid({ series }: { series: ModelSeries }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = series.models.length > INITIAL_VISIBLE;
  const visible = expanded ? series.models : series.models.slice(0, INITIAL_VISIBLE);

  return (
    <div className="mb-8 sm:mb-10">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Series {series.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
        {visible.map((model) => (
          <div
            key={model.name}
            className="min-w-0 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 flex flex-col items-center text-center transition-transform duration-150 active:scale-[0.97] sm:hover:shadow-md touch-manipulation"
            style={{ background: "#EFF6FA", border: "1px solid #DCEAF2" }}
          >
            <div className="relative w-full aspect-square mb-1.5 sm:mb-2">
              <Image
                src={model.image}
                alt={`${model.name} photo`}
                fill
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 15vw"
                className="object-contain"
              />
            </div>
            <span className="w-full text-[11px] sm:text-sm text-slate-700 font-medium leading-snug line-clamp-2">
              {model.name}
            </span>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 mx-auto flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 transition-colors active:scale-95 sm:hover:bg-blue-100 touch-manipulation"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Show less" : `Show all ${series.models.length} models`}
        </button>
      )}
    </div>
  );
}

export default function ModelPhotoGallery({ series }: { series: ModelSeries[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.3 }}
      className="overflow-x-hidden"
    >
      {series.map((s) => (
        <SeriesGrid key={s.name} series={s} />
      ))}
    </motion.div>
  );
}
