import type { Metadata } from "next";
import BookRepairClient from "./BookRepairClient";

export const metadata: Metadata = {
  title: "Book a Mobile Repair — Doorstep Pickup & Delivery in Hyderabad",
  description:
    "Book your mobile repair with TurboFix in minutes. Doorstep pickup and delivery in Hyderabad. Same-day service, genuine parts, 6-month warranty. All brands supported.",
  alternates: { canonical: "https://turbofix.in/book-repair" },
  openGraph: {
    title: "Book a Mobile Repair — Doorstep Service | TurboFix Hyderabad",
    description:
      "Book now — we'll pick up your phone, fix it, and deliver it back same day. Screen, battery, charging port, water damage and more.",
    url: "https://turbofix.in/book-repair",
  },
};

export default function BookRepairPage() {
  return <BookRepairClient />;
}
