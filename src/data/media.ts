import { asset } from '../utils/asset';

/**
 * Photographs shown on the TV screens in product renders. They illustrate the
 * screen only; they are not product photographs. All are from Unsplash
 * (https://unsplash.com/license — free for commercial use). Files live in
 * public/images/screens as <id>-800.webp and <id>-1600.webp (16:9).
 */
export const screenImages = {
  peacock: { description: 'Peacock with its tail fanned out', source: 'https://images.unsplash.com/photo-1548148491-90655471726c' },
  himalaya: { description: 'Himalayan peak at sunrise', source: 'https://images.unsplash.com/photo-1549926506-afba2eb9fb6f' },
  ladakh: { description: 'Mountains above a lake in Ladakh', source: 'https://images.unsplash.com/photo-1635255506105-b74adbd94026' },
  tiger: { description: 'Bengal tiger in dry grass', source: 'https://images.unsplash.com/photo-1506108928571-9f4b11ba3f10' },
  'kerala-sunset': { description: 'Kerala houseboat at sunset', source: 'https://images.unsplash.com/photo-1624554305378-0f440dd3a8c1' },
  'kerala-backwaters': { description: 'Houseboat on the Kerala backwaters', source: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e' },
  ocean: { description: 'Turquoise sea from above', source: 'https://images.unsplash.com/photo-1494879540385-bc170b0878a7' },
  sunrise: { description: 'Sunrise over misty hills', source: 'https://images.unsplash.com/photo-1665849863678-fc03a642a9aa' },
} as const;

export type ScreenImageId = keyof typeof screenImages;

export function screenSrc(id: ScreenImageId, width: 800 | 1600 = 800): string {
  return asset(`images/screens/${id}-${width}.webp`);
}

export function screenSrcSet(id: ScreenImageId): string {
  return `${screenSrc(id, 800)} 800w, ${screenSrc(id, 1600)} 1600w`;
}

/** Wide band spread across the three-screen wall in the Manufacturing section (Unsplash). */
export const panorama = {
  description: 'Misty fields and palms at dawn',
  source: 'https://images.unsplash.com/photo-1595433306946-233f47e4af3a',
  src: asset('images/panorama/fields-dawn-1800.webp'),
  srcSet: `${asset('images/panorama/fields-dawn-1800.webp')} 1800w, ${asset('images/panorama/fields-dawn-3600.webp')} 3600w`,
} as const;

/** Room photographs (Unsplash; original files linked) with a Vellfire TV placed over the original set. */
export const roomPhotos = {
  living: 'https://images.unsplash.com/photo-1761330439671-a7f20c285c5e',
  family: 'https://images.unsplash.com/photo-1636206508343-a6c955887476',
} as const;
