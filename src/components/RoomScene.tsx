import type { CSSProperties, ReactNode } from 'react';
import type { ScreenImageId } from '../data/media';
import { asset } from '../utils/asset';
import { Tv } from './Tv';

/** Position of the original TV in a room photo, as % of the (cropped) image. */
interface Placement {
  left: number;
  top: number;
  width: number;
}

interface RoomCrop {
  /** Files in public/images/rooms, keyed by pixel width. */
  files: Record<number, string>;
  width: number;
  height: number;
  tv: Placement;
}

/**
 * Room photographs with the TV rectangle measured to the pixel, so a rendered Vellfire
 * TV sits exactly over the original set. `tall` is a tighter crop for narrow screens.
 */
const rooms = {
  living: {
    alt: 'Bright minimal living room with a wall-mounted Vellfire TV above a white media unit',
    wide: {
      files: { 1600: 'images/rooms/living-wide-1600.webp', 2400: 'images/rooms/living-wide-2400.webp' },
      width: 2400,
      height: 1100,
      tv: { left: 47.04, top: 31.55, width: 22.79 },
    },
    tall: {
      files: { 800: 'images/rooms/living-tall-800.webp', 1200: 'images/rooms/living-tall-1200.webp' },
      width: 1200,
      height: 1000,
      tv: { left: 27.25, top: 34.7, width: 45.58 },
    },
  },
  family: {
    alt: 'Warm family living room with wooden panelling and a wall-mounted Vellfire TV',
    wide: {
      files: { 900: 'images/rooms/family-900.webp', 1600: 'images/rooms/family-1600.webp' },
      width: 1600,
      height: 1200,
      tv: { left: 36.1, top: 37.15, width: 27.9 },
    },
    tall: null,
  },
} satisfies Record<string, { alt: string; wide: RoomCrop; tall: RoomCrop | null }>;

const srcSet = (crop: RoomCrop) =>
  Object.entries(crop.files)
    .map(([w, file]) => `${asset(file)} ${w}w`)
    .join(', ');

const placementVars = (crop: RoomCrop, prefix: string): CSSProperties =>
  ({
    [`--${prefix}-ratio`]: `${crop.width} / ${crop.height}`,
    [`--${prefix}-left`]: `${crop.tv.left}%`,
    [`--${prefix}-top`]: `${crop.tv.top}%`,
    [`--${prefix}-width`]: `${crop.tv.width}%`,
  }) as CSSProperties;

interface RoomSceneProps {
  room: keyof typeof rooms;
  screen: ScreenImageId;
  /** Rendered width of the scene, for choosing image files. */
  sizes: string;
  /** Rendered width of the TV within the scene, for choosing its screen image. */
  tvSizes?: string;
  priority?: boolean;
  className?: string;
  /** Overlays such as a product tag, positioned by the caller. */
  children?: ReactNode;
}

export function RoomScene({
  room,
  screen,
  sizes,
  tvSizes = '(max-width: 47.99rem) 50vw, 25vw',
  priority = false,
  className,
  children,
}: RoomSceneProps) {
  const { alt, wide, tall } = rooms[room];
  const smallest = (crop: RoomCrop) => asset(crop.files[Math.min(...Object.keys(crop.files).map(Number))]);

  return (
    <figure
      className={['room-scene', tall && 'room-scene--responsive', className].filter(Boolean).join(' ')}
      style={{ ...placementVars(wide, 'wide'), ...(tall ? placementVars(tall, 'tall') : {}) }}
    >
      <picture>
        {tall && <source media="(max-width: 47.99rem)" srcSet={srcSet(tall)} sizes={sizes} width={tall.width} height={tall.height} />}
        <img
          className="room-scene__photo"
          src={smallest(wide)}
          srcSet={srcSet(wide)}
          sizes={sizes}
          width={wide.width}
          height={wide.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
        />
      </picture>
      <div className="room-scene__tv">
        <Tv screen={screen} mount="wall" priority={priority} sizes={tvSizes} />
      </div>
      {children}
    </figure>
  );
}
