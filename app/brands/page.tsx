import type { Metadata } from "next";
import RepairsListClient from "../repairs/RepairsListClient";

export const metadata: Metadata = {
  title: "Mobile Service by Brand in Hyderabad",
  description:
    "Expert doorstep service for iPhone, Samsung, OnePlus, Xiaomi, Vivo, Oppo & all major brands in Hyderabad. OEM parts, 6-month warranty. Book now!",
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
