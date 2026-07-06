import Image from "next/image";
import { Star } from "lucide-react";

export default function TechnicianCard() {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6 flex items-center gap-5 mt-8">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
        <Image src="/images/technician.jpg" alt="Varma, TurboFix technician" fill sizes="80px" className="object-cover" />
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-[15px] sm:text-base">
          Hi, I'm Varma — your TurboFix technician
        </p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          I cover Hitech City, Gachibowli, Madhapur, and Kondapur. Book a slot and I'll typically call within 30 minutes to confirm.
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-medium">4.9</span>
          <span>· 400+ repairs in Hyderabad</span>
        </div>
      </div>
    </div>
  );
}
