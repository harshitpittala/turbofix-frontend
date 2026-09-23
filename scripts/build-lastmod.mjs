// Writes data/lastmod.json: the real last-change date (YYYY-MM-DD) for each
// sitemap URL, taken from the git history of the files that render it.
// Run after committing content changes:  node scripts/build-lastmod.mjs
// app/sitemap.ts reads the file; a URL missing from it falls back to the
// newest date in the file (never "now", which made every lastmod identical).
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const gitDate = (...paths) => {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { encoding: "utf8" }).trim();
    return out || null;
  } catch { return null; }
};
const newest = (...dates) => dates.filter(Boolean).sort().at(-1) ?? null;

const shared = ["app/layout.tsx", "components/layout"];
const map = {};
const set = (url, ...paths) => { map[url] = gitDate(...paths, ...shared); };

set("/", "app/page.tsx", "components/home");
for (const p of ["services", "about", "contact", "faq", "testimonials", "blog", "brands", "locations",
  "sitemap-html", "privacy", "terms", "no-fix-no-fee-policy"]) set(`/${p}`, `app/${p}`);
map["/locations"] = gitDate("app/locations/page.tsx", "app/locations/LocationsPageClient.tsx", "data/locations.ts", "data/locality-merges.json", ...shared);
map["/sitemap-html"] = gitDate("app/sitemap-html", "data/locations.ts", "data/locality-merges.json", ...shared);
set("/book-a-visit", "app/book-a-visit", "app/book-repair/components");
set("/brands/nothing", "app/brands/[brand]", "data/brands.ts");

const svcSrc = readFileSync("data/servicePages.ts", "utf8");
for (const [, slug] of svcSrc.matchAll(/^    slug: "([^"]+)"/gm))
  set(`/${slug}`, `app/${slug}`, "data/servicePages.ts", "components/seo/ServicePageServer.tsx",
    "components/seo/ServicePageTemplate.tsx", "components/seo/PopularAreas.tsx", "lib/priorityAreas.ts");
const brandSrc = readFileSync("data/brandCityPages.ts", "utf8");
for (const [, slug] of brandSrc.matchAll(/^    slug: "([^"]+)"/gm))
  set(`/${slug}`, `app/${slug}`, "data/brandCityPages.ts", "components/seo/BrandCityPageServer.tsx",
    "components/seo/BrandCityPageTemplate.tsx", "components/seo/PopularAreas.tsx", "lib/priorityAreas.ts");

const locDate = gitDate("app/locations/[area]", "data/locations.ts", "data/locality-merges.json", ...shared);
const locSrc = readFileSync("data/locations.ts", "utf8");
const merges = JSON.parse(readFileSync("data/locality-merges.json", "utf8"));
for (const [, slug] of locSrc.matchAll(/^    slug: "([^"]+)"/gm))
  if (!merges[slug]) map[`/locations/${slug}`] = locDate;
for (const z of ["central", "west", "north", "south", "east", "outskirts"])
  map[`/locations/zones/${z}`] = gitDate("app/locations/zones", "data/locations.ts", "data/locality-merges.json", ...shared);

// Blog posts: the post's own date field (content is per-post in data/blogs.ts).
const blogSrc = readFileSync("data/blogs.ts", "utf8");
for (const [, slug, date] of blogSrc.matchAll(/slug: "([^"]+)",[\s\S]*?date: "(\d{4}-\d{2}-\d{2})"/g))
  map[`/blog/${slug}`] = newest(date, gitDate("app/blog/[slug]"));

writeFileSync("data/lastmod.json", JSON.stringify(map, null, 2) + "\n");
console.log(`lastmod.json: ${Object.keys(map).length} URLs`);
