import { site } from '../config/site';
import { panorama } from '../data/media';
import { getScreenSizes } from '../data/products';
import type { Product } from '../data/types';
import { Tv } from './Tv';
import { WhatsAppLink } from './WhatsAppLink';

/** Three wall-mounted TVs sharing one continuous picture. */
const WALL_COUNT = 3;
/** Gap between TVs as a % of the wall width; must match .video-wall in global.css. */
const WALL_GAP_PERCENT = 2;
const tvWidthPercent = (100 - WALL_GAP_PERCENT * (WALL_COUNT - 1)) / WALL_COUNT;
/** Side bezel as a fraction of TV width; must match .tv__panel padding (0.42cqw). */
const BEZEL = 0.0042;
/** Gap between neighbouring screens (wall gap plus two bezels) relative to one screen's width. */
const screenGapRatio = (WALL_GAP_PERCENT + 2 * BEZEL * tvWidthPercent) / (tvWidthPercent * (1 - 2 * BEZEL));

export function Manufacturing({ products }: { products: Product[] }) {
  const sizeCount = getScreenSizes(products).length;
  const allBezelLess = products.every((p) => p.features.includes('bezel-less'));

  const points = [
    {
      title: 'Straight from the manufacturer',
      text: `Your enquiry reaches the ${site.brandName} team directly, not a reseller.`,
    },
    {
      title: 'Help choosing a size',
      text: 'Share your room size and viewing distance, and we will suggest the screen that fits.',
    },
    ...(allBezelLess
      ? [{ title: 'One design across the range', text: `All ${products.length} models share the same bezel-less design.` }]
      : []),
  ];

  return (
    <section id="manufacturing" className="section section--mist manufacturing" aria-labelledby="manufacturing-title">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <p className="label">Manufacturing</p>
            <h2 id="manufacturing-title" className="title">
              Made by {site.brandName}, sold direct
            </h2>
          </div>
          <p className="section-head__aside">
            One family of televisions in {sizeCount} screen sizes, so there is a {site.brandName} TV for every room.
          </p>
        </div>

        <figure className="video-wall" aria-hidden="true">
          <div className="video-wall__row">
            {Array.from({ length: WALL_COUNT }, (_, index) => (
              <div key={index} className="video-wall__tv" style={{ width: `${tvWidthPercent}%` }}>
                <Tv
                  screen={panorama}
                  pan={{ index, count: WALL_COUNT, gapRatio: screenGapRatio }}
                  mount="wall"
                  sizes="(max-width: 47.99rem) 100vw, 90vw"
                />
              </div>
            ))}
          </div>
        </figure>

        <div className="manufacturing__bottom">
          <ol className="points">
            {points.map((point, index) => (
              <li key={point.title} className="points__item">
                <span className="points__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="points__title">{point.title}</h3>
                <p className="points__text">{point.text}</p>
              </li>
            ))}
          </ol>
          <WhatsAppLink className="manufacturing__cta">Talk to our team</WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
