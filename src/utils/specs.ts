import { featureInfo } from '../data/features';
import type { Product } from '../data/types';
import { getDisplayLabel, getPlatformLabel, joinWithAnd } from './format';

export interface SpecRow {
  label: string;
  value: string;
}

/**
 * Full specification list for a product, built only from confirmed catalogue fields.
 * Rows with no confirmed value are left out rather than shown as blank.
 */
export function getSpecRows(product: Product): SpecRow[] {
  const rows: SpecRow[] = [{ label: 'Screen size', value: `${product.screenSizeInches} inches` }];
  const has = (feature: Product['features'][number]) => product.features.includes(feature);

  if (product.modelIdentifier) rows.push({ label: 'Model', value: product.modelIdentifier });

  const display = getDisplayLabel(product);
  if (display) rows.push({ label: 'Display', value: display });

  rows.push({ label: 'Platform', value: getPlatformLabel(product) });

  if (product.streamingApps.length > 0) {
    rows.push({ label: 'Streaming apps', value: product.streamingApps.join(', ') });
  }
  if (has('premium-sound')) rows.push({ label: 'Sound', value: featureInfo['premium-sound'].label });
  if (has('bezel-less')) rows.push({ label: 'Design', value: featureInfo['bezel-less'].label });

  const convenience = (['remote-cursor', 'smart-energy-saving'] as const).filter(has);
  if (convenience.length > 0) {
    rows.push({ label: 'Features', value: convenience.map((f) => featureInfo[f].label).join(', ') });
  }

  return rows;
}

/** Display and platform, e.g. "4K OLED · Android Smart TV". */
export function getProductMeta(product: Product): string {
  return [getDisplayLabel(product), getPlatformLabel(product)].filter(Boolean).join(' · ');
}

/** Up to three short selling points for a product card, from confirmed data only. */
export function getKeyPoints(product: Product): string[] {
  const points: string[] = [];
  if (product.streamingApps.length > 0) points.push(joinWithAnd(product.streamingApps));
  const order = ['remote-cursor', 'premium-sound', 'smart-energy-saving', 'bezel-less'] as const;
  for (const feature of order) {
    if (product.features.includes(feature)) points.push(featureInfo[feature].label);
  }
  return points.slice(0, 3);
}
