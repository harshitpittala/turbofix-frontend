/**
 * JsonLd — Server-side JSON-LD schema injector.
 *
 * IMPORTANT: Do NOT use next/script for JSON-LD.
 * next/script renders asynchronously — Google Rich Results Test and
 * Googlebot read raw HTML and will never see schema injected via JS.
 * This component uses a plain <script> tag, which is rendered in the
 * initial server HTML and detected correctly by all schema validators.
 */
export function JsonLd({ schema, id }: { schema: object; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
