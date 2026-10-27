/**
 * Site-level settings: brand, contact details and navigation.
 * Edit here; components read from this file and never hardcode these values.
 */

export const site = {
  brandName: 'Vellfire',
  /** Short description used in the footer and meta tags. */
  description:
    'Vellfire is a television manufacturer making bezel-less Smart TVs for Indian homes, from 32 to 65 inches.',
  /** Product shown in the dark spotlight section and pictured in the hero. */
  featuredProductId: 'tv-65',

  whatsApp: {
    /** Display format. The wa.me link is derived from this by stripping non-digits. */
    number: '+91 89575 47726',
    generalEnquiry: 'Hi, I would like to know more about Vellfire TVs. Please share details.',
  },

  address: {
    /** Address as supplied by the business. */
    line: 'Plot No. 1, Nagar Nigam Enclave, Panki Road, Awas Vikas 3, Kalyanpur, 208017',
    /** City for PIN 208017. Appended so map searches resolve correctly. */
    city: 'Kanpur, Uttar Pradesh',
    /** Structured parts of the address, for search engines (JSON-LD). */
    locality: 'Kanpur',
    region: 'Uttar Pradesh',
    postalCode: '208017',
    country: 'IN',
  },
} as const;

export interface NavItem {
  label: string;
  /** In-page anchor id, without the leading '#'. */
  target: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', target: 'home' },
  { label: 'Products', target: 'products' },
  { label: 'About Us', target: 'about' },
  { label: 'Manufacturing', target: 'manufacturing' },
  { label: 'Contact', target: 'contact' },
];

export function getFullAddress(): string {
  return `${site.address.line}, ${site.address.city}`;
}

export function getDirectionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getFullAddress())}`;
}
