import { useEffect, useRef, useState } from 'react';
import { navItems, site } from './config/site';
import { getProductById, products } from './data/products';
import type { Product } from './data/types';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manufacturing } from './components/Manufacturing';
import { ProductDialog } from './components/ProductDialog';
import { ProductSection } from './components/ProductSection';
import { SizeFinder } from './components/SizeFinder';
import { Spotlight } from './components/Spotlight';

/** Tracks which nav section is in view, for the header's current-location marker. */
function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      // A thin band a third of the way down the viewport decides the active section.
      { rootMargin: '-33% 0px -66% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navItems.map((item) => item.target);
const featured = getProductById(site.featuredProductId) ?? products[products.length - 1];

export default function App() {
  const activeSection = useActiveSection(sectionIds);
  const [sizeFilter, setSizeFilter] = useState<number | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const showSize = (size: number) => {
    setSizeFilter(size);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('products')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const openDetails = (product: Product, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(product);
  };

  const closeDetails = () => {
    setSelected(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <a className="skip-link" href="#products">
        Skip to products
      </a>
      <Header activeSection={activeSection} />
      <main>
        <Hero products={products} featured={featured} onViewDetails={openDetails} />
        <SizeFinder products={products} onSelectSize={showSize} />
        <ProductSection
          products={products}
          sizeFilter={sizeFilter}
          onSizeFilterChange={setSizeFilter}
          onViewDetails={openDetails}
        />
        <Spotlight product={featured} onViewDetails={openDetails} />
        <Features products={products} />
        <About products={products} />
        <Manufacturing products={products} />
        <Contact />
      </main>
      <Footer products={products} onSelectSize={showSize} />
      <ProductDialog product={selected} onClose={closeDetails} />
    </>
  );
}
