import { products } from '../data/products';
import type { Product } from '../data/types';
import { asset } from '../utils/asset';
import { getProductName } from '../utils/format';
import { Tv } from './Tv';

const allSizes = products.map((p) => p.screenSizeInches);
const MIN_SIZE = Math.min(...allSizes);
const MAX_SIZE = Math.max(...allSizes);

/**
 * Width of a TV relative to the largest in the range. 16:9 panel widths scale linearly
 * with the diagonal; `floor` keeps the smallest model readable in small layouts.
 */
export function getRelativeTvWidth(sizeInches: number, floor = 0): number {
  const trueScale = (sizeInches / MAX_SIZE) * 100;
  if (floor === 0 || MAX_SIZE === MIN_SIZE) return trueScale;
  const t = (sizeInches - MIN_SIZE) / (MAX_SIZE - MIN_SIZE);
  return floor + t * (100 - floor);
}

interface ProductVisualProps {
  product: Product;
  sizes?: string;
  priority?: boolean;
  angled?: boolean;
}

/** Product photograph when the catalogue has one, otherwise the rendered TV. */
export function ProductVisual({ product, sizes, priority, angled }: ProductVisualProps) {
  const label = `${getProductName(product)} (representative image)`;

  if (product.photo) {
    return (
      <img
        className="product-photo"
        src={asset(product.photo.path)}
        width={product.photo.width}
        height={product.photo.height}
        alt={label}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }
  return <Tv screen={product.screen} sizes={sizes} priority={priority} angled={angled} label={label} />;
}
