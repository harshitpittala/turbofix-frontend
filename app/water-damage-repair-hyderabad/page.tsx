import { redirect } from "next/navigation";

// This route was renamed to /water-damage-hyderabad to avoid "repair"
// trigger language in the URL for Google Ads policy compliance.
// See next.config.js redirects() for the primary 301 — this is a fallback.
export default function Page() {
  redirect("/water-damage-hyderabad");
}
