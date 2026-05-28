import type { Metadata } from "next";
import RepairsListClient from "./RepairsListClient";

export const metadata: Metadata = {
  title: "Mobile Repair by Brand — Apple, Samsung, OnePlus & More | Hyderabad",
  description:
    "TurboFix offers expert mobile repair for all major brands in Hyderabad — Apple iPhone, Samsung Galaxy, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel, and Nothing Phone.",
  alternates: { canonical: "https://turbofix.in/repairs" },
  openGraph: {
    title: "Mobile Repair by Brand — All Brands Repaired | TurboFix Hyderabad",
    description:
      "Expert repair for Apple, Samsung, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel and Nothing phones in Hyderabad.",
    url: "https://turbofix.in/repairs",
  },
};

export default function RepairsPage() {
  return <RepairsListClient />;
}
