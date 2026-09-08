const fs = require("fs");
const invSrc = fs.readFileSync("data/locationInventory.ts", "utf8");
const blocks = invSrc.split("\n  {\n").slice(1);

const records = blocks.map((b) => {
  const name = (b.match(/name: "([^"]*)"/) || [])[1] || "";
  const slug = (b.match(/slug: "([^"]*)"/) || [])[1] || "";
  const sectionsRaw = (b.match(/sourceSections: \[([^\]]*)\]/) || [])[1] || "";
  const sections = [...sectionsRaw.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  const variantsRaw = (b.match(/spellingVariants: \[([^\]]*)\]/) || [])[1] || "";
  const variants = [...variantsRaw.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  const parentM = (b.match(/parentName: (null|"[^"]*")/) || [])[1] || "null";
  const parent = parentM === "null" ? "" : parentM.replace(/^"|"$/g, "");
  const zoneHint = (b.match(/zoneHint: "([^"]*)"/) || [])[1] || "";
  const status = (b.match(/status: "([^"]*)"/) || [])[1] || "";
  const viable = (b.match(/viable: (true|false)/) || [])[1] || "true";
  const aliasM = (b.match(/aliasOf: (null|"[^"]*")/) || [])[1] || "null";
  const alias = aliasM === "null" ? "" : aliasM.replace(/^"|"$/g, "");
  const publishedSlugM = (b.match(/publishedSlug: (null|"[^"]*")/) || [])[1] || "null";
  const publishedSlug = publishedSlugM === "null" ? "" : publishedSlugM.replace(/^"|"$/g, "");
  const reasonMatch = b.match(/reason: "([\s\S]*?)",\n {2}\}/);
  const reason = reasonMatch ? reasonMatch[1].replace(/\\"/g, '"') : "";
  const flagForReview = /flagForReview: true/.test(b);
  let cls;
  if (alias) cls = "ALIAS";
  else if (viable === "false") cls = "SUB-UNIT";
  else if (status === "published") cls = "PUBLISHED";
  else cls = "NEEDS VERIFICATION";
  return { name, slug, sections, variants, parent, zoneHint, status, viable, alias, publishedSlug, reason, cls, flagForReview };
});

fs.writeFileSync("scripts/audit-records.json", JSON.stringify(records, null, 2));
const counts = {};
for (const r of records) counts[r.cls] = (counts[r.cls] || 0) + 1;
console.log(counts, "total:", records.length);
