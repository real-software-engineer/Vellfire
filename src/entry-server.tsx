/**
 * Build-time entry used by scripts/prerender.mjs: renders the page to static HTML
 * and builds the structured data, so search engines see the full content.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { site } from './config/site';
import { products } from './data/products';
import { getProductName } from './utils/format';
import { getSpecRows } from './utils/specs';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

/** schema.org JSON-LD. `siteUrl` is the absolute deployed URL (with trailing slash), when known. */
export function getStructuredData(siteUrl?: string): object[] {
  const url = siteUrl ?? undefined;
  const brand = { '@type': 'Brand', name: site.brandName };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brandName,
    description: site.description,
    ...(url && { url, logo: `${url}icon-512.png` }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line.replace(/,\s*\d{6}$/, ''),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.whatsApp.number.replace(/\s/g, ''),
      contactType: 'sales',
    },
  };

  const catalogue = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.brandName} Smart TVs`,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${site.brandName} ${getProductName(product)}`,
        brand,
        description: getSpecRows(product)
          .map((row) => `${row.label}: ${row.value}`)
          .join('. '),
        ...(url && { image: `${url}og-image.jpg` }),
        offers: {
          '@type': 'Offer',
          price: String(product.priceInr),
          priceCurrency: 'INR',
          ...(url && { url: `${url}#products` }),
          seller: { '@type': 'Organization', name: site.brandName },
        },
      },
    })),
  };

  return [organization, catalogue];
}
