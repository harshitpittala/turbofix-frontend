import type { Metadata } from "next";
import SuccessPageClient from "../../book-repair/success/SuccessPageClient";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your service booking has been confirmed. We'll be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function BookingSuccessPage() {
  return <SuccessPageClient />;
}
