import { products } from '../data/products';
import type { Product } from '../data/types';
import { featureInfo } from '../data/features';
import { formatPrice, getDisplayLabel, getProductName, joinWithAnd } from '../utils/format';
import { getSpecRows } from '../utils/specs';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { ProductVisual } from './ProductVisual';
import { WhatsAppLink } from './WhatsAppLink';

interface SpotlightProps {
  product: Product;
  onViewDetails: (product: Product, trigger: HTMLElement) => void;
}

const SPEC_LABELS = new Set(['Screen size', 'Display', 'Platform', 'Streaming apps', 'Sound', 'Design']);

/** Cinematic feature block for one product (site.featuredProductId). */
export function Spotlight({ product, onViewDetails }: SpotlightProps) {
  const name = getProductName(product);
  const isLargest = product.screenSizeInches === Math.max(...products.map((p) => p.screenSizeInches));
  const display = getDisplayLabel(product);
  const features = product.features.map((f) => featureInfo[f].label.toLowerCase());

  return (
    <section className="spotlight" aria-labelledby="spotlight-title">
      <div className="container spotlight__inner">
        <div className="spotlight__copy">
          <p className="label label--gold">{isLargest ? 'Our largest screen' : 'In focus'}</p>
          <h2 id="spotlight-title" className="title title--light">
            {name}
          </h2>
          <p className="lead lead--light">
            A {product.screenSizeInches}-inch {display ? `${display} ` : ''}screen with {joinWithAnd(features)}
            {product.streamingApps.length > 0 && <>, and {joinWithAnd(product.streamingApps)} ready to watch</>}.
          </p>

          <dl className="spotlight__specs">
            {getSpecRows(product)
              .filter((row) => SPEC_LABELS.has(row.label))
              .map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
          </dl>

          <div className="spotlight__buy">
            <p className="spotlight__price">{formatPrice(product.priceInr)}</p>
            <div className="spotlight__actions">
              <WhatsAppLink variant="gold" href={getProductWhatsAppUrl(product)}>
                Enquire on WhatsApp
              </WhatsAppLink>
              <button type="button" className="btn btn--outline-light" onClick={(e) => onViewDetails(product, e.currentTarget)}>
                Full details
              </button>
            </div>
          </div>
        </div>

        <div className="spotlight__stage">
          <ProductVisual product={product} angled sizes="(max-width: 63.99rem) 90vw, 55vw" />
        </div>
      </div>
    </section>
  );
}
