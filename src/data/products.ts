import type { CategoryId, Product, StreamingApp } from './types';

/**
 * The product catalogue — the single source of truth for every product shown on the site.
 * Prices and specifications are as supplied by the business. Unconfirmed values are null
 * and are hidden on the site; see `devNotes` and the README for what needs confirming.
 */

const STANDARD_APPS: StreamingApp[] = ['Netflix', 'Amazon Prime', 'JioHotstar'];

export const products: Product[] = [
  {
    id: 'tv-32',
    categoryId: 'televisions',
    modelIdentifier: null,
    screenSizeInches: 32,
    priceInr: 8999,
    display: { technology: 'QLED', resolution: '2K' },
    smartPlatform: 'Android Smart TV',
    features: ['premium-sound', 'smart-energy-saving', 'bezel-less'],
    streamingApps: [],
    screen: 'ocean',
    devNotes: ['No streaming apps were listed for this model, so none are shown.'],
  },
  {
    id: 'tv-43',
    categoryId: 'televisions',
    modelIdentifier: null,
    screenSizeInches: 43,
    priceInr: 17999,
    display: { technology: null, resolution: null },
    smartPlatform: 'Android Smart TV',
    features: ['smart-energy-saving', 'premium-sound', 'bezel-less'],
    streamingApps: STANDARD_APPS,
    screen: 'kerala-backwaters',
    devNotes: ['Supplied display wording: "4K FHD display". 4K and FHD conflict; resolution hidden until confirmed.'],
  },
  {
    id: 'tv-43-bt',
    categoryId: 'televisions',
    modelIdentifier: 'BT',
    screenSizeInches: 43,
    priceInr: 18999,
    display: { technology: null, resolution: null },
    smartPlatform: 'Android Smart TV',
    features: ['smart-energy-saving', 'premium-sound', 'bezel-less'],
    streamingApps: STANDARD_APPS,
    screen: 'kerala-sunset',
    devNotes: [
      'Supplied display wording: "4K FHD display". 4K and FHD conflict; resolution hidden until confirmed.',
      'Meaning of "BT" not supplied; shown only as the model identifier.',
    ],
  },
  {
    id: 'tv-50',
    categoryId: 'televisions',
    modelIdentifier: null,
    screenSizeInches: 50,
    priceInr: 32999,
    display: { technology: 'OLED', resolution: '4K' },
    smartPlatform: 'Android Smart TV',
    features: ['premium-sound', 'bezel-less'],
    streamingApps: STANDARD_APPS,
    screen: 'tiger',
  },
  {
    id: 'tv-55',
    categoryId: 'televisions',
    modelIdentifier: null,
    screenSizeInches: 55,
    priceInr: 41999,
    display: { technology: 'OLED', resolution: '4K' },
    smartPlatform: null,
    features: ['remote-cursor', 'bezel-less'],
    streamingApps: STANDARD_APPS,
    screen: 'ladakh',
    devNotes: [
      'Supplied as "55-inch WEB OS TV" with both "WEB OS" and "Android Smart TV" listed. Platform hidden until confirmed.',
    ],
  },
  {
    id: 'tv-65',
    categoryId: 'televisions',
    modelIdentifier: null,
    screenSizeInches: 65,
    priceInr: 61999,
    display: { technology: 'OLED', resolution: '4K' },
    smartPlatform: null,
    features: ['bezel-less', 'premium-sound'],
    streamingApps: STANDARD_APPS,
    screen: 'himalaya',
    devNotes: ['Supplied platform: "webOS / Android television". Platform hidden until confirmed.'],
  },
];

export function getProductsByCategory(categoryId: CategoryId): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/** Distinct screen sizes in ascending order, for filters and the size finder. */
export function getScreenSizes(list: Product[] = products): number[] {
  return [...new Set(list.map((product) => product.screenSizeInches))].sort((a, b) => a - b);
}

/** One representative model per screen size (the lowest priced), smallest first. */
export function getOneModelPerSize(list: Product[] = products): Product[] {
  return getScreenSizes(list).map(
    (size) =>
      list.filter((p) => p.screenSizeInches === size).sort((a, b) => a.priceInr - b.priceInr)[0],
  );
}
