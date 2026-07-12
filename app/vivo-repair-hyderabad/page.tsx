import { redirect } from "next/navigation";

// This route was renamed to /vivo-service-hyderabad to avoid "repair"
// trigger language in the URL for Google Ads policy compliance.
// See next.config.mjs redirects() for the primary 301 — this is a fallback.
export default function Page() {
  redirect("/vivo-service-hyderabad");
}
