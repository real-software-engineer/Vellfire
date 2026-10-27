import { useState } from 'react';
import { categories } from '../data/categories';
import { getScreenSizes } from '../data/products';
import type { CategoryId, Product } from '../data/types';
import { ProductCard } from './ProductCard';

interface ProductSectionProps {
  products: Product[];
  /** Selected screen size, or null for all. Lifted so the size finder can set it. */
  sizeFilter: number | null;
  onSizeFilterChange: (size: number | null) => void;
  onViewDetails: (product: Product, trigger: HTMLElement) => void;
}

export function ProductSection({ products, sizeFilter, onSizeFilterChange, onViewDetails }: ProductSectionProps) {
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0].id);

  const inCategory = products.filter((p) => p.categoryId === categoryId);
  const sizes = getScreenSizes(inCategory);
  const visible = sizeFilter === null ? inCategory : inCategory.filter((p) => p.screenSizeInches === sizeFilter);

  return (
    <section id="products" className="section section--mist products" aria-labelledby="products-title">
      <div className="container">
        <div className="section-head section-head--row">
          <h2 id="products-title" className="title">
            Smart TVs
          </h2>
          <p className="section-head__aside">
            Prices in Indian rupees. Enquire on WhatsApp for availability and to order.
          </p>
        </div>

        {categories.length > 1 && (
          <div className="tabs" role="group" aria-label="Product category">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="tabs__tab"
                aria-pressed={c.id === categoryId}
                onClick={() => {
                  setCategoryId(c.id);
                  onSizeFilterChange(null);
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <div className="tabs" role="group" aria-label="Filter by screen size">
          <button type="button" className="tabs__tab" aria-pressed={sizeFilter === null} onClick={() => onSizeFilterChange(null)}>
            All sizes
          </button>
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className="tabs__tab"
              aria-pressed={sizeFilter === size}
              onClick={() => onSizeFilterChange(size)}
            >
              {size}-inch
            </button>
          ))}
          <p className="tabs__count" role="status">
            {visible.length} {visible.length === 1 ? 'model' : 'models'}
          </p>
        </div>

        <ul className="product-grid">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} onViewDetails={onViewDetails} />
            </li>
          ))}
        </ul>

        <p className="footnote">Product images are representative. On-screen pictures are simulated.</p>
      </div>
    </section>
  );
}
