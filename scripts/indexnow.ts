/* Tell Bing (and the other IndexNow search engines: Yandex, Seznam, Naver) which pages exist or changed:  bun run indexnow [--send]

   Bing's index also feeds ChatGPT search, Copilot and DuckDuckGo, so this is the quickest way to get a new post found by people and by agents.
   Run it after a deploy. By default it only prints what it would submit; add --send to submit it.
   Google does not support IndexNow: submit the sitemap in Search Console instead.

   The key is public by design. It lives in lib/config.ts and as public/<key>.txt, which is how the search engines check the site's owner sent the request.
   Set SITE_URL to submit another host, for example when testing against a local build. */

import { SITE_CONFIG } from '../lib/config';

const site = (process.env.SITE_URL?.trim() || SITE_CONFIG.baseUrl).replace(/\/+$/, '');
const key = SITE_CONFIG.seo.indexNowKey;
const send = process.argv.includes('--send');

const sitemap = await fetch(`${site}/sitemap.xml`);
if (!sitemap.ok) throw new Error(`Could not read ${site}/sitemap.xml (${sitemap.status}). Is the site deployed?`);
const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urls.length) throw new Error('The sitemap lists no pages.');

const keyLocation = `${site}/${key}.txt`;
const keyFile = await fetch(keyLocation);
if (!keyFile.ok || (await keyFile.text()).trim() !== key) throw new Error(`The key file at ${keyLocation} is missing or does not match. Deploy first.`);

console.log(`${send ? 'Submitting' : 'Would submit'} ${urls.length} URLs for ${new URL(site).host}:`);
for (const u of urls) console.log(`  ${u}`);

if (!send) {
  console.log('\nDry run. Add --send to submit.');
} else {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList: urls }),
  });
  /* 200 and 202 both mean the submission was accepted. 202 is "received, the key is still being checked". */
  console.log(`\nIndexNow replied ${res.status} ${res.statusText}${res.ok ? '' : `: ${await res.text()}`}`);
  if (!res.ok) process.exit(1);
}
