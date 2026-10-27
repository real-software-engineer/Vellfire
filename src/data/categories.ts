import type { Category } from './types';

/**
 * Product categories. Only list categories that have products on sale;
 * the UI shows category tabs automatically once there is more than one.
 */
export const categories: Category[] = [{ id: 'televisions', name: 'Televisions', itemNoun: 'TV' }];
