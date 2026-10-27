import { site } from '../config/site';
import type { Product } from '../data/types';
import { formatPrice, getProductName } from './format';

/** "+91 89575 47726" → "918957547726" */
export function toWhatsAppNumber(displayNumber: string): string {
  return displayNumber.replace(/\D/g, '');
}

export function buildWhatsAppUrl(message: string = site.whatsApp.generalEnquiry): string {
  const number = toWhatsAppNumber(site.whatsApp.number);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getProductEnquiryMessage(product: Product): string {
  return `Hi, I am interested in the ${getProductName(product)} priced at ${formatPrice(product.priceInr)}. Please share more details.`;
}

export function getProductWhatsAppUrl(product: Product): string {
  return buildWhatsAppUrl(getProductEnquiryMessage(product));
}
