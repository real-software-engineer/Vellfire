import type { Product } from '../data/types';

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** 32999 → "₹32,999" */
export function formatPrice(amountInr: number): string {
  return inrFormatter.format(amountInr);
}

/** Generic "Smart TV" until the platform is confirmed in the catalogue. */
export function getPlatformLabel(product: Product): string {
  return product.smartPlatform ?? 'Smart TV';
}

/** e.g. "4K OLED", "QLED", or null when nothing about the display is confirmed. */
export function getDisplayLabel(product: Product): string | null {
  const parts = [product.display.resolution, product.display.technology].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : null;
}

/**
 * Customer-facing name, built only from confirmed fields:
 * "50-inch 4K OLED Smart TV", "43-inch BT Smart TV", "43-inch Smart TV".
 * Used on cards, in the dialog, in structured data and in WhatsApp messages.
 */
export function getProductName(product: Product): string {
  return [`${product.screenSizeInches}-inch`, product.modelIdentifier, getDisplayLabel(product), 'Smart TV']
    .filter(Boolean)
    .join(' ');
}

/** ["a", "b", "c"] → "a, b and c" */
export function joinWithAnd(parts: string[]): string {
  if (parts.length <= 1) return parts.join('');
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}
