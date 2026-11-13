// Notify Bing (which feeds ChatGPT search and Microsoft Copilot), Yandex and
// other IndexNow engines that TurboFix pages changed.
//
// Run AFTER a deploy is live (the key file must be reachable on turbofix.in):
//   node scripts/indexnow.mjs            -> submits every URL in the live sitemap
//   node scripts/indexnow.mjs /faq /about -> submits only these paths
//
// The key file is public/c20d7e74adf9460f88bb606bec3d1dc2.txt. Don't delete it.

const HOST = 'turbofix.in';
const KEY = 'c20d7e74adf9460f88bb606bec3d1dc2';

async function sitemapUrls() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urls = args.length
  ? args.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? '' : '/'}${p}`))
  : await sitemapUrls();

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const res = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: batch,
    }),
  });
  console.log(`Submitted ${batch.length} URLs: HTTP ${res.status} ${res.statusText}`);
}
