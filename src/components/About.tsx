import { site } from '../config/site';
import { getScreenSizes } from '../data/products';
import type { Product } from '../data/types';
import { formatPrice } from '../utils/format';
import { RoomScene } from './RoomScene';

export function About({ products }: { products: Product[] }) {
  const sizes = getScreenSizes(products);
  const smallest = sizes[0];
  const largest = sizes[sizes.length - 1];

  // Every figure here is derived from the catalogue, so it stays accurate as products change.
  const facts = [
    { value: String(products.length), label: 'Smart TV models' },
    { value: `${smallest}–${largest}″`, label: 'Screen sizes' },
    { value: formatPrice(Math.min(...products.map((p) => p.priceInr))), label: 'Starting price' },
  ];

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__inner">
        <RoomScene
          room="family"
          screen="sunrise"
          sizes="(max-width: 55.99rem) 100vw, 50vw"
          tvSizes="(max-width: 55.99rem) 30vw, 15vw"
          className="about__scene"
        />

        <div className="about__copy">
          <p className="label">About {site.brandName}</p>
          <h2 id="about-title" className="title">
            A television maker for Indian homes
          </h2>
          <p className="lead">
            {site.brandName} manufactures Smart TVs — from a compact {smallest}-inch screen for the bedroom to a{' '}
            {largest}-inch screen for the living room. Every model shares the same bezel-less design.
          </p>
          <p>
            We are based in {site.address.locality} and speak with customers directly. Tell us about your room and how
            you watch, and we will help you choose the right size.
          </p>

          <dl className="facts">
            {facts.map((fact) => (
              <div key={fact.label} className="facts__item">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
