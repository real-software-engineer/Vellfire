/**
 * Post-build step: injects the server-rendered page and structured data into
 * dist/index.html, and writes robots.txt (plus sitemap.xml and absolute
 * canonical/social URLs when SITE_URL is set, e.g. by the GitHub Pages workflow).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, getStructuredData } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const rawSiteUrl = process.env.SITE_URL?.trim();
const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/?$/, '/') : undefined;

let html = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const appHtml = render();
if (!html.includes('<div id="root"></div>')) throw new Error('Root element not found in dist/index.html');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const headTags = getStructuredData(siteUrl).map(
  (data) => `<script type="application/ld+json">${escapeJson(data)}</script>`,
);

if (siteUrl) {
  headTags.push(
    `<link rel="canonical" href="${siteUrl}" />`,
    `<meta property="og:url" content="${siteUrl}" />`,
    `<meta property="og:image" content="${siteUrl}og-image.jpg" />`,
    `<meta name="twitter:image" content="${siteUrl}og-image.jpg" />`,
  );
}
html = html.replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`);
await fs.writeFile(path.join(dist, 'index.html'), html);

const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${siteUrl}sitemap.xml`] : [])].join('\n');
await fs.writeFile(path.join(dist, 'robots.txt'), `${robots}\n`);

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}</loc><lastmod>${today}</lastmod></url>
</urlset>
`;
  await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
}

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${(appHtml.length / 1024).toFixed(1)} KB of HTML${siteUrl ? ` for ${siteUrl}` : ' (no SITE_URL: canonical and sitemap skipped)'}.`);
