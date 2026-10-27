import type { Product } from '../data/types';
import { getScreenSizes } from '../data/products';
import { asset } from '../utils/asset';
import { formatPrice, getDisplayLabel, getProductName, joinWithAnd } from '../utils/format';
import { ArrowRightIcon } from './Icons';
import { RoomScene } from './RoomScene';
import { WhatsAppLink } from './WhatsAppLink';

interface HeroProps {
  products: Product[];
  featured: Product;
  onViewDetails: (product: Product, trigger: HTMLElement) => void;
}

export function Hero({ products, featured, onViewDetails }: HeroProps) {
  const sizes = getScreenSizes(products);
  const startingPrice = Math.min(...products.map((p) => p.priceInr));
  const oledSizes = getScreenSizes(products.filter((p) => getDisplayLabel(p) === '4K OLED'));

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__intro">
        <img className="hero__mark" src={asset('brand/vellfire-icon-primary.svg')} alt="" width="56" height="40" />
        <h1 id="hero-title" className="display hero__title">
          See every frame, <span className="nowrap">edge to edge.</span>
        </h1>
        <p className="lead hero__lead">
          Bezel-less Smart TVs from {sizes[0]} to {sizes[sizes.length - 1]} inches
          {oledSizes.length > 0 && <>, with 4K OLED on our {joinWithAnd(oledSizes.map(String))}-inch models</>}. From{' '}
          {formatPrice(startingPrice)}.
        </p>
        <div className="hero__actions">
          <a className="btn btn--dark" href="#products">
            <span>Explore TVs</span>
            <ArrowRightIcon className="btn__icon" />
          </a>
          <WhatsAppLink variant="outline">Enquire on WhatsApp</WhatsAppLink>
        </div>
      </div>

      <RoomScene room="living" screen="peacock" sizes="100vw" tvSizes="(max-width: 47.99rem) 46vw, 23vw" priority className="hero__scene">
        <button
          type="button"
          className="scene-tag"
          onClick={(event) => onViewDetails(featured, event.currentTarget)}
          aria-label={`Pictured: ${getProductName(featured)}, ${formatPrice(featured.priceInr)}. View details`}
        >
          <span className="scene-tag__dot" aria-hidden="true" />
          <span className="scene-tag__text">
            <span className="scene-tag__name">{getProductName(featured)}</span>
            <span className="scene-tag__price">{formatPrice(featured.priceInr)}</span>
          </span>
          <ArrowRightIcon className="scene-tag__arrow" />
        </button>
      </RoomScene>
    </section>
  );
}
