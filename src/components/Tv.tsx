import type { CSSProperties } from 'react';
import { screenSrc, screenSrcSet, type ScreenImageId } from '../data/media';
import { asset } from '../utils/asset';

/** Spreads one wide image across several TVs, as on a video wall. */
export interface ScreenPan {
  index: number;
  count: number;
  /** Gap between neighbouring screens, as a fraction of one screen's width. */
  gapRatio: number;
}

interface TvProps {
  /** Photograph shown on the screen. */
  screen: ScreenImageId | { src: string; srcSet: string };
  pan?: ScreenPan;
  /** How the TV is mounted: on its own feet, or flat on a wall (room scenes). */
  mount?: 'feet' | 'wall';
  /** Three-quarter view with visible depth, for hero-style product shots. */
  angled?: boolean;
  /** `sizes` for the screen image, so the browser picks the 800 or 1600 px file. */
  sizes?: string;
  /** Load eagerly at high priority (above-the-fold renders only). */
  priority?: boolean;
  /** Accessible description. Omit when the surrounding content already names the product. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * A rendered Vellfire TV: thin metal frame, glass glare and a small logo on the bottom
 * bezel, with a real photograph on screen. Everything is sized in container units
 * (cqw), so proportions hold at any width. Product photographs, when supplied, replace
 * this in ProductVisual.
 */
export function Tv({ screen, pan, mount = 'feet', angled = false, sizes = '400px', priority = false, label, className, style }: TvProps) {
  const classes = ['tv', `tv--${mount}`, angled && 'tv--angled', className].filter(Boolean).join(' ');
  const image = typeof screen === 'string' ? { src: screenSrc(screen), srcSet: screenSrcSet(screen) } : screen;
  const panStyle: CSSProperties | undefined = pan && {
    position: 'absolute',
    top: 0,
    width: `${(pan.count + (pan.count - 1) * pan.gapRatio) * 100}%`,
    maxWidth: 'none',
    left: `${-pan.index * (1 + pan.gapRatio) * 100}%`,
  };

  return (
    <div
      className={classes}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div className="tv__body">
        <div className="tv__panel">
          <div className="tv__screen">
            <img
              src={image.src}
              srcSet={image.srcSet}
              style={panStyle}
              sizes={sizes}
              width={1600}
              height={900}
              alt=""
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              decoding="async"
            />
            <span className="tv__glare" />
          </div>
          <img className="tv__badge" src={asset('brand/vellfire-logo-white.svg')} alt="" width={50} height={10} />
        </div>
        {mount === 'feet' && (
          <>
            <span className="tv__foot tv__foot--left" />
            <span className="tv__foot tv__foot--right" />
          </>
        )}
      </div>
      {mount === 'feet' && <span className="tv__shadow" />}
    </div>
  );
}
