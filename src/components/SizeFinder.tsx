import { getOneModelPerSize } from '../data/products';
import type { Product } from '../data/types';
import { formatPrice } from '../utils/format';
import { Tv } from './Tv';
import { getRelativeTvWidth } from './ProductVisual';

interface SizeFinderProps {
  products: Product[];
  onSelectSize: (size: number) => void;
}

/** Every screen size drawn to true relative scale, as a shortcut into the product grid. */
export function SizeFinder({ products, onSelectSize }: SizeFinderProps) {
  const lineup = getOneModelPerSize(products);

  return (
    <section className="section size-finder" aria-labelledby="size-finder-title">
      <div className="container">
        <div className="section-head section-head--row">
          <h2 id="size-finder-title" className="title">
            Find your size
          </h2>
          <p className="section-head__aside">
            Drawn to scale. Tell us your room size on WhatsApp and we will suggest the right screen.
          </p>
        </div>

        <ul className="size-finder__row">
          {lineup.map((product) => {
            const size = product.screenSizeInches;
            const from = Math.min(...products.filter((p) => p.screenSizeInches === size).map((p) => p.priceInr));
            return (
              <li key={size} style={{ flexGrow: getRelativeTvWidth(size) }}>
                <button
                  type="button"
                  className="size-finder__item"
                  onClick={() => onSelectSize(size)}
                  aria-label={`Show ${size}-inch TVs, from ${formatPrice(from)}`}
                >
                  <Tv screen={product.screen} sizes="(max-width: 47.99rem) 30vw, 20vw" />
                  <span className="size-finder__size">
                    {size}
                    <span aria-hidden="true">″</span>
                  </span>
                  <span className="size-finder__price">from {formatPrice(from)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
