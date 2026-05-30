import type { Metadata } from "next";
import SuccessPageClient from "./SuccessPageClient";

export const metadata: Metadata = {
  title: "Booking Confirmed — TurboFix",
  description: "Your repair booking has been confirmed. We'll be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function BookingSuccessPage() {
  return <SuccessPageClient />;
}
