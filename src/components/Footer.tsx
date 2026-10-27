import { getDirectionsUrl, navItems, site } from '../config/site';
import { getScreenSizes } from '../data/products';
import type { Product } from '../data/types';
import { asset } from '../utils/asset';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  products: Product[];
  onSelectSize: (size: number) => void;
}

export function Footer({ products, onSelectSize }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={asset('brand/vellfire-logo-primary.svg')} alt={site.brandName} width="172" height="34" loading="lazy" />
          <p>{site.description}</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__heading">Explore</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.target}>
                <a href={`#${item.target}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Televisions</h2>
          <ul>
            <li>
              <a href="#products">All Smart TVs</a>
            </li>
            {getScreenSizes(products).map((size) => (
              <li key={size}>
                <a
                  href="#products"
                  onClick={(event) => {
                    event.preventDefault();
                    onSelectSize(size);
                  }}
                >
                  {size}-inch TVs
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Contact</h2>
          <address>
            <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
              {site.address.line}, {site.address.city}
            </a>
          </address>
          <p>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.whatsApp.number}
            </a>
          </p>
        </div>
      </div>

      <div className="container footer__legal">
        {/* Year is fixed at build time by prerendering; suppress the warning if it differs at hydration. */}
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {site.brandName}. All rights reserved.
        </p>
        <p>
          Product images are representative and on-screen pictures are simulated. Photography from{' '}
          <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
