# Vellfire — TV website

Single-page website for Vellfire televisions. React + Vite + TypeScript, plain CSS, no backend.
The page is prerendered to static HTML at build time (for search engines and link previews) and
deployed to GitHub Pages; every product enquiry goes to WhatsApp.

## Product details that need business confirmation

These are deliberately **not** shown on the website until the business confirms them.
Each one is a single field in [`src/data/products.ts`](src/data/products.ts) — update the field and the site updates everywhere (names, cards, dialog, structured data, WhatsApp messages).

| Product | Issue | Supplied wording | Field to update once confirmed |
| --- | --- | --- | --- |
| 43-inch TV (₹17,999) | Resolution conflict: 4K and FHD are different resolutions | "4K FHD display" | `display.resolution` (and `display.technology` if a panel type applies) |
| 43-inch BT TV (₹18,999) | Same resolution conflict | "4K FHD display" | `display.resolution` |
| 43-inch BT TV | Meaning of "BT" not supplied; shown only as the model identifier | "BT" | `modelIdentifier` |
| 55-inch TV (₹41,999) | Platform conflict: listed as both webOS and Android Smart TV. Shown as "Smart TV" (named "55-inch 4K OLED Smart TV", not "WEB OS TV") | "55-inch WEB OS TV", "WEB OS", "Android Smart TV" | `smartPlatform` |
| 65-inch TV (₹61,999) | Platform ambiguous. Shown as "Smart TV" | "webOS / Android television" | `smartPlatform` |
| 32-inch TV (₹8,999) | No streaming apps were listed, so none are shown. "2K QLED" is published as supplied; please confirm the wording | "2K QLED display" | `streamingApps`, `display` |
| All | No model numbers supplied. Products are named by size and confirmed display, e.g. "50-inch 4K OLED Smart TV" | — | `modelIdentifier` |
| All | No product photographs supplied. The site shows rendered TVs (see below) and states "Product images are representative" | — | `photo` |

Other points:

- **WhatsApp number.** Confirmed as **+91 89575 47726** for all website enquiries. (Older Instagram artwork shows +91 94530 76335; that number is not used on the site.) Change it in [`src/config/site.ts`](src/config/site.ts) if it ever moves.
- **City.** The supplied address ends at "Kalyanpur, 208017". "Kanpur, Uttar Pradesh" is added (PIN 208017 is in Kanpur, and the brand's Instagram material references Kanpur) so the directions link and structured data resolve. Change `address` in `site.ts` if needed.

## Local development

Requires Node.js 20.11+.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

`npm run build` type-checks, builds the client, builds a server bundle of the same React app, and runs [`scripts/prerender.mjs`](scripts/prerender.mjs), which writes the rendered page, JSON-LD structured data and `robots.txt` into `dist/`. The browser then hydrates the prerendered HTML.

To also get the canonical URL, absolute social-image URLs and `sitemap.xml`, set the public URL:

```bash
SITE_URL=https://example.github.io/vellfire-web/ npm run build
```

The GitHub Pages workflow sets `SITE_URL` automatically.

## Deploying to GitHub Pages

The folder is not yet a Git repository. To publish:

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Each push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site (with `SITE_URL` from the Pages configuration) and publishes `dist/`.

**Base path.** `vite.config.ts` uses a relative base (`./`), so the same build works at
`https://<user>.github.io/<repo>/`, at a user/organisation site root, and on a custom domain.
Files in `public/` are referenced through `asset()` in [`src/utils/asset.ts`](src/utils/asset.ts), which uses the same base in the prerendered HTML and in the browser. To force an absolute base, build with `BASE_PATH=/your-repo/`.

**Custom domain.** Add the domain under **Settings → Pages → Custom domain** (and a `public/CNAME` file containing the domain).

## SEO

- Prerendered HTML: every heading, product name, price and specification is in the page source.
- `<title>`, meta description, Open Graph and Twitter card tags in [`index.html`](index.html); share image `public/og-image.jpg` (1200×630, made from the official logo).
- JSON-LD: `Organization` (address, WhatsApp contact) and an `ItemList` of `Product`s with INR `Offer`s, generated from the catalogue in [`src/entry-server.tsx`](src/entry-server.tsx). No ratings or reviews are claimed.
- `robots.txt` always; `sitemap.xml` and `<link rel="canonical">` when `SITE_URL` is set.
- Web app manifest, Apple touch icon and SVG favicon from the official icon.
- One `<h1>`, ordered `<h2>`/`<h3>` per section, descriptive alt text, `lang="en-IN"`.
- Performance: responsive WebP images with `srcset`, the hero image preloaded at high priority, everything below the fold lazy-loaded, fonts self-hosted.

## Project structure

```
src/
  config/site.ts        Brand name, featured product, WhatsApp number, address, navigation
  data/
    types.ts            Product / Category types
    products.ts         The product catalogue (single source of truth)
    categories.ts       Product categories
    features.ts         Feature labels and one-line descriptions
    media.ts            On-screen photographs, panorama and room photo sources
  utils/
    whatsapp.ts         wa.me link + prefilled message builders
    format.ts           ₹ formatting, product names, platform/display labels
    specs.ts            Spec rows, card highlights
    asset.ts            URLs for files in /public
  components/
    Tv.tsx              The rendered TV (frame, glass, feet, logo, photo on screen)
    RoomScene.tsx       Room photo with a Vellfire TV placed over the original set
    ProductVisual.tsx   Product photo if supplied, otherwise the rendered TV
    Header, Hero, SizeFinder, ProductSection, ProductCard, ProductDialog,
    Spotlight, Features, About, Manufacturing, Contact, Footer, WhatsAppLink, Icons
  entry-server.tsx      Build-time render + structured data
  styles/
    tokens.css          Colours, type scale, spacing (design tokens)
    global.css          All component styles, BEM-style class names
scripts/prerender.mjs   Post-build: injects HTML, JSON-LD, robots, sitemap
public/
  brand/                Official Vellfire logos and icon (SVG)
  images/screens/       On-screen photographs, 800 and 1600 px WebP
  images/rooms/         Room photographs, cropped around the TV
  images/panorama/      Wide band for the three-screen wall
  og-image.jpg, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
```

## Design

- **Logo and icon** are copied unmodified from `Vellfire TV logo system_V2/VELLFIRE-BRAND-ASSETS/02-VECTOR/SVG/`. The header is white, so it uses the official **Black** logo; the dark footer uses the full-colour **Primary** logo, matching the brand guidelines.
- **Colours** come from `Brand-Colours.txt`: Vellfire Gold `#F7C34C` and Vellfire Black `#0A0B0D` on a white and warm-grey base. Deep Bronze is used for small accent text on light backgrounds, where gold lacks contrast.
- **Typography** uses the brand family from `Typography.txt`: Barlow 600 with tight tracking for headings, Barlow for text, and Barlow Condensed (uppercase, tracked) only for short technical labels — the brand's "engineering voice". Fonts are self-hosted through `@fontsource`.
- **Rendered TVs.** No product photographs were supplied. `Tv.tsx` builds a bezel-less TV in CSS — thin dark-metal frame, glass sheen, logo on the bottom bezel, angled feet and floor shadow — sized in container units so it holds its proportions at any size, with a real photograph on screen. Every place a TV appears says the images are representative.
- **Room scenes.** The hero and About photos are real rooms. The original TV's rectangle was measured to the pixel and the Vellfire TV is placed exactly over it; narrow screens get a tighter crop with its own coordinates (`RoomScene.tsx`).

### Photography credits

All photographs are from [Unsplash](https://unsplash.com/license) (free for commercial use; attribution not required). Sources are recorded in [`src/data/media.ts`](src/data/media.ts): peacock, Himalayan peak, Ladakh, tiger, Kerala houseboat (sunset and backwaters), turquoise sea, misty sunrise, misty fields at dawn (panorama), and two living rooms.
To replace a screen image, add `<id>-800.webp` and `<id>-1600.webp` (16:9) to `public/images/screens/` and register the id in `media.ts`.

### Adding product photographs

1. Put the image in `public/images/products/` (e.g. `tv-50.webp`, light background, ideally 1600 px wide).
2. Set the product's `photo` in `products.ts`:

```ts
photo: { path: 'images/products/tv-50.webp', width: 1600, height: 1000 },
```

The photo replaces the rendered TV on the card, in the spotlight and in the details dialog.

## Adding or changing products

Edit `src/data/products.ts` only. Each product is one object:

```ts
{
  id: 'tv-75',                    // unique, stable
  categoryId: 'televisions',
  modelIdentifier: null,          // only if the business supplies one
  screenSizeInches: 75,
  priceInr: 99999,                // whole rupees; formatted as ₹99,999 automatically
  display: { technology: 'OLED', resolution: '4K' },   // null = hidden until confirmed
  smartPlatform: 'Android Smart TV',                   // null = shown as "Smart TV"
  features: ['premium-sound', 'bezel-less'],           // keys from data/features.ts
  streamingApps: ['Netflix', 'Amazon Prime', 'JioHotstar'],
  screen: 'himalaya',             // on-screen photograph, from data/media.ts
  devNotes: ['Anything that still needs confirming. Never shown on the site.'],
}
```

The product name ("75-inch 4K OLED Smart TV"), size finder, filters, features ("available on" lists), About figures, spotlight, footer links, structured data and WhatsApp messages are all derived from this list. The spotlight shows `site.featuredProductId`.
Only enter specifications the business has confirmed — leave a field `null` rather than guessing.

## Adding a product category (e.g. weighing scales)

1. Add the id to `CategoryId` in `src/data/types.ts`, e.g. `'televisions' | 'weighing-scales'`.
2. Add the category to `src/data/categories.ts`.
3. Add its products to `products.ts` with that `categoryId`.

Once more than one category exists, category tabs appear above the product grid automatically.
TV-specific fields (`screenSizeInches`, `display`, `smartPlatform`, `streamingApps`, `screen`) would at that point move into a TV-specific type — make `Product` a union with a `kind` field rather than adding optional fields for every category.
Do not add a category until it has real products to show.

## Moving to an API later

Components receive the catalogue as props from `App.tsx`. To load from a backend, fetch the list in `App.tsx` (or a small `useProducts` hook) in the same `Product[]` shape and pass it down; for prerendering, fetch it in `scripts/prerender.mjs` before calling `render()`.

## WhatsApp links

All enquiry buttons use `https://wa.me/918957547726?text=…` (built by `src/utils/whatsapp.ts`) and open in a new tab with `rel="noopener noreferrer"`.
Product buttons prefill, for example:

> Hi, I am interested in the 50-inch 4K OLED Smart TV priced at ₹32,999. Please share more details.

The header, hero, manufacturing and contact buttons use the general message from `site.whatsApp.generalEnquiry`.
