import type { Metadata } from "next";
import RepairsListClient from "../repairs/RepairsListClient";

export const metadata: Metadata = {
  title: "Mobile Service by Brand — Apple, Samsung, OnePlus & More | Hyderabad",
  description:
    "TurboFix offers expert mobile service for all major brands in Hyderabad — Apple iPhone, Samsung Galaxy, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel, and Nothing Phone.",
  alternates: { canonical: "https://turbofix.in/brands" },
  openGraph: {
    title: "Mobile Service by Brand — All Brands Serviced | TurboFix Hyderabad",
    description:
      "Expert service for Apple, Samsung, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel and Nothing phones in Hyderabad.",
    url: "https://turbofix.in/brands",
  },
};

export default function BrandsPage() {
  return <RepairsListClient />;
}
