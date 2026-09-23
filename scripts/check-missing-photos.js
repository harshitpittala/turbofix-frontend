const fs = require("fs");
const path = require("path");

const SRC_ROOT = "C:\\mobile_photos";
const scriptPath = path.join(__dirname, "build-model-photos.js");
const scriptContent = fs.readFileSync(scriptPath, "utf8");

const usedFiles = new Set();
const re = /\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\]/g;
let m;
while ((m = re.exec(scriptContent))) {
  usedFiles.add(m[1]);
}
const otherRe = /file:\s*"([^"]+)"/g;
while ((m = otherRe.exec(scriptContent))) {
  usedFiles.add(m[1]);
}

const brandFolders = {
  apple: "apple",
  samsung: "Samsung",
  "google-pixel": "Google Pixel",
  oneplus: "OnePlus",
  xiaomi: "Xiaomi",
  motorola: "Motorola",
};

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full).map((f) => ({ ...f, sub: entry.name + "/" + f.sub })));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        results.push({ name: entry.name, sub: entry.name, dir });
      }
    }
  }
  return results;
}

let totalMissing = 0;
for (const [slug, folder] of Object.entries(brandFolders)) {
  const dir = path.join(SRC_ROOT, folder);
  const allFiles = walk(dir);
  const missing = allFiles.filter((f) => !usedFiles.has(f.name));
  console.log(`\n=== ${slug} (${folder}) === total: ${allFiles.length}, unused: ${missing.length}`);
  missing.forEach((f) => console.log("  UNUSED: " + path.relative(dir, f.dir === dir ? path.join(f.dir, f.name) : path.join(f.dir, f.name))));
  totalMissing += missing.length;
}
console.log(`\nTOTAL UNUSED: ${totalMissing}`);
