import type { FeatureId } from './types';

export interface FeatureInfo {
  label: string;
  /** One-line explanation, worded to stay within what the business supplied. */
  summary: string;
}

export const featureInfo: Record<FeatureId, FeatureInfo> = {
  'bezel-less': {
    label: 'Bezel-less design',
    summary: 'A slim frame keeps attention on the picture, not the border around it.',
  },
  'premium-sound': {
    label: 'Premium loud sound',
    summary: 'Loud built-in sound for films, cricket and music.',
  },
  'smart-energy-saving': {
    label: 'Smart energy saving',
    summary: 'A smart energy-saving feature for everyday viewing.',
  },
  'remote-cursor': {
    label: 'Remote cursor control',
    summary: 'Move a pointer on screen with the remote to select apps and menus.',
  },
};
