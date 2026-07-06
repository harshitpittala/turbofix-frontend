import Image from "next/image";
import { MapPin } from "lucide-react";

const photos = [
  { src: "/images/repairs/repair-iphone15pro-back.jpeg", caption: "iPhone 15 Pro Back Glass" },
  { src: "/images/repairs/repair-iphone14pro-inprogress.jpeg", caption: "iPhone 14 Pro Max — In Repair" },
  { src: "/images/repairs/repair-iphone11-shattered.jpeg", caption: "iPhone 11 — Major Back Damage" },
];

export default function Gallery() {
  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">Real Repairs We've Done</h2>
        <p className="text-sm text-gray-500 mb-6">Phones we've brought back to life — no stock photos</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {photos.map((p) => (
            <div key={p.src} className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <div className="relative w-full aspect-[4/3]">
                <Image src={p.src} alt={p.caption} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <p className="text-xs font-medium text-gray-600 px-3 py-2">{p.caption}</p>
            </div>
          ))}
        </div>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-6">
          <MapPin className="w-3.5 h-3.5" />
          All repairs done at our Hyderabad studio — Aghapura, Nampally
        </p>
      </div>
    </section>
  );
}
