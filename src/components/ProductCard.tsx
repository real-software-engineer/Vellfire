import type { Product } from '../data/types';
import { formatPrice, getProductName } from '../utils/format';
import { getKeyPoints, getProductMeta } from '../utils/specs';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { CheckIcon } from './Icons';
import { ProductVisual, getRelativeTvWidth } from './ProductVisual';
import { WhatsAppLink } from './WhatsAppLink';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product, trigger: HTMLElement) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const name = getProductName(product);
  const headingId = `product-${product.id}-name`;

  return (
    <article className="product-card" aria-labelledby={headingId}>
      <div className="product-card__stage">
        <span className="product-card__size" aria-hidden="true">
          {product.screenSizeInches}″
        </span>
        {/* Scaled so the largest model still fits the stage; sizes stay visibly relative. */}
        <div className="product-card__visual" style={{ width: `${getRelativeTvWidth(product.screenSizeInches, 58) * 0.86}%` }}>
          <ProductVisual product={product} sizes="(max-width: 47.99rem) 90vw, 30vw" />
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__meta">{getProductMeta(product)}</p>
        <h3 id={headingId} className="product-card__name">
          {name}
        </h3>
        <ul className="product-card__points">
          {getKeyPoints(product).map((point) => (
            <li key={point}>
              <CheckIcon />
              {point}
            </li>
          ))}
        </ul>

        <div className="product-card__buy">
          <p className="product-card__price">
            <span className="visually-hidden">Price </span>
            {formatPrice(product.priceInr)}
          </p>
          <div className="product-card__actions">
            <WhatsAppLink href={getProductWhatsAppUrl(product)} ariaLabel={`Enquire about the ${name} on WhatsApp`}>
              Enquire
            </WhatsAppLink>
            <button
              type="button"
              className="btn btn--outline"
              aria-label={`View details of the ${name}`}
              onClick={(event) => onViewDetails(product, event.currentTarget)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
