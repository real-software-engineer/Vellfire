/**
 * Catalogue types. Shaped so the static data in this folder can later be
 * replaced by an API response without changing the components.
 */
import type { ScreenImageId } from './media';

export type CategoryId = 'televisions';

export interface Category {
  id: CategoryId;
  name: string;
  /** Singular noun used in copy, e.g. "TV". */
  itemNoun: string;
}

/** Keys into the feature dictionary in features.ts. */
export type FeatureId = 'premium-sound' | 'bezel-less' | 'smart-energy-saving' | 'remote-cursor';

export type StreamingApp = 'Netflix' | 'Amazon Prime' | 'JioHotstar';

export interface ProductDisplay {
  /** Panel technology, e.g. "OLED". null = not confirmed, hidden on the site. */
  technology: string | null;
  /** Resolution label, e.g. "4K". null = not confirmed, hidden on the site. */
  resolution: string | null;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  /**
   * Model identifier exactly as supplied by the business, or null if none was given.
   * The customer-facing name is built from size, identifier and display — see getProductName().
   */
  modelIdentifier: string | null;
  screenSizeInches: number;
  /** Price in whole rupees. */
  priceInr: number;
  display: ProductDisplay;
  /**
   * Confirmed smart TV platform, e.g. "Android Smart TV".
   * null = platform not confirmed; the site shows the generic "Smart TV".
   */
  smartPlatform: string | null;
  features: FeatureId[];
  streamingApps: StreamingApp[];
  /**
   * Optional product photograph in /public (e.g. "images/products/tv-50.webp").
   * When absent, the site renders the TV with `screen` shown on its display.
   */
  photo?: { path: string; width: number; height: number };
  /** Photograph shown on the rendered TV's screen. */
  screen: ScreenImageId;
  /** Raw supplied wording and open questions. Never rendered on the site. */
  devNotes?: string[];
}
