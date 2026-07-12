import { redirect } from "next/navigation";

interface Props {
  params: { brand: string };
}

// This route was renamed to /brands/[brand] to remove "repair" from the URL
// for Google Ads policy compliance. See next.config.mjs redirects() for the
// primary 301 — this is a fallback.
export default function Page({ params }: Props) {
  redirect(`/brands/${params.brand}`);
}
