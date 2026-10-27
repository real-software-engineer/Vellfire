import type { ReactNode } from 'react';
import { featureInfo } from '../data/features';
import { screenSrc, screenSrcSet } from '../data/media';
import { getScreenSizes } from '../data/products';
import type { FeatureId, Product } from '../data/types';
import { getDisplayLabel, joinWithAnd } from '../utils/format';
import { CursorIcon, LeafIcon, SoundIcon } from './Icons';
import { Tv } from './Tv';

interface FeatureItem {
  key: 'display' | 'streaming' | FeatureId;
  title: string;
  summary: string;
  /** The models this applies to, so no feature is implied for the whole range. */
  models: Product[];
}

const iconFor: Partial<Record<FeatureItem['key'], ReactNode>> = {
  'premium-sound': <SoundIcon />,
  'smart-energy-saving': <LeafIcon />,
  'remote-cursor': <CursorIcon />,
};

function buildFeatureItems(products: Product[]): FeatureItem[] {
  const items: FeatureItem[] = [];

  if (products.some((p) => p.features.includes('bezel-less'))) {
    const models = products.filter((p) => p.features.includes('bezel-less'));
    items.push({ key: 'bezel-less', title: featureInfo['bezel-less'].label, summary: featureInfo['bezel-less'].summary, models });
  }

  // Every confirmed display type, e.g. "4K OLED on the 50, 55 and 65-inch models".
  const byDisplay = new Map<string, Product[]>();
  for (const product of products) {
    const label = getDisplayLabel(product);
    if (label) byDisplay.set(label, [...(byDisplay.get(label) ?? []), product]);
  }
  if (byDisplay.size > 0) {
    const parts = [...byDisplay]
      .sort(([, a], [, b]) => b.length - a.length)
      .map(([label, models]) => `${label} on the ${joinWithAnd(getScreenSizes(models).map(String))}-inch ${models.length === 1 ? 'model' : 'models'}`);
    const [first, ...rest] = [...byDisplay.keys()].sort((a, b) => byDisplay.get(b)!.length - byDisplay.get(a)!.length);
    items.push({
      key: 'display',
      title: rest.length > 0 ? `${first} and ${joinWithAnd(rest)}` : `${first} display`,
      summary: `${joinWithAnd(parts)}.`.replace(/^./, (c) => c.toUpperCase()),
      models: [...byDisplay.values()].flat(),
    });
  }

  const withApps = products.filter((p) => p.streamingApps.length > 0);
  if (withApps.length > 0) {
    items.push({
      key: 'streaming',
      title: 'Streaming built in',
      summary: 'Watch without a separate streaming device.',
      models: withApps,
    });
  }

  for (const id of ['premium-sound', 'smart-energy-saving', 'remote-cursor'] as const) {
    const models = products.filter((p) => p.features.includes(id));
    if (models.length > 0) items.push({ key: id, title: featureInfo[id].label, summary: featureInfo[id].summary, models });
  }
  return items;
}

/**
 * "All six models", or the sizes it applies to ("32″ · 43″ · 50″"). Where only some
 * models of a size have the feature, those models are named instead.
 */
function describeModels(models: Product[], all: Product[]): string {
  if (models.length === all.length) return `All ${all.length} models`;
  return getScreenSizes(models)
    .flatMap((size) => {
      const included = models.filter((p) => p.screenSizeInches === size);
      const ofSize = all.filter((p) => p.screenSizeInches === size);
      return included.length === ofSize.length
        ? [`${size}″`]
        : included.map((p) => `${size}″${p.modelIdentifier ? ` ${p.modelIdentifier}` : ''}`);
    })
    .join(' · ');
}

function TileVisual({ item }: { item: FeatureItem }) {
  switch (item.key) {
    case 'bezel-less':
      // A close crop of the top-right corner shows how little frame there is.
      return (
        <div className="feature-tile__visual feature-tile__visual--corner" aria-hidden="true">
          <Tv screen="kerala-sunset" mount="wall" sizes="(max-width: 47.99rem) 200vw, 120vw" />
        </div>
      );
    case 'display':
      return (
        <div className="feature-tile__visual feature-tile__visual--photo" aria-hidden="true">
          <img src={screenSrc('peacock', 800)} srcSet={screenSrcSet('peacock')} sizes="(max-width: 47.99rem) 100vw, 34vw" alt="" width={1600} height={900} loading="lazy" decoding="async" />
        </div>
      );
    case 'streaming': {
      const apps = [...new Set(item.models.flatMap((p) => p.streamingApps))];
      return (
        <ul className="feature-tile__apps" aria-label="Supported apps">
          {apps.map((app) => (
            <li key={app}>{app}</li>
          ))}
        </ul>
      );
    }
    default:
      return <span className="feature-tile__icon">{iconFor[item.key]}</span>;
  }
}

export function Features({ products }: { products: Product[] }) {
  const items = buildFeatureItems(products);

  return (
    <section className="section features" aria-labelledby="features-title">
      <div className="container">
        <div className="section-head section-head--row">
          <h2 id="features-title" className="title">
            Built into the range
          </h2>
          <p className="section-head__aside">Features vary by model. Each one lists the sizes that have it.</p>
        </div>

        <ul className="feature-grid">
          {items.map((item) => (
            <li key={item.key} className={`feature-tile feature-tile--${item.key}`}>
              <TileVisual item={item} />
              <div className="feature-tile__text">
                <h3 className="feature-tile__title">{item.title}</h3>
                <p className="feature-tile__summary">{item.summary}</p>
                <p className="feature-tile__models">
                  <span className="visually-hidden">Available on: </span>
                  {describeModels(item.models, products)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
