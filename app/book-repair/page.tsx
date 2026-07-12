import { redirect } from "next/navigation";

// This route was renamed to /book-a-visit to remove "repair" from the URL
// for Google Ads policy compliance. See next.config.mjs redirects() for the
// primary 301 — this is a fallback.
export default function Page() {
  redirect("/book-a-visit");
}
