import { useEffect, useRef, useState } from 'react';
import { navItems, site } from '../config/site';
import { asset } from '../utils/asset';
import { CloseIcon, MenuIcon, WhatsAppIcon } from './Icons';
import { WhatsAppLink } from './WhatsAppLink';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.classList.add('is-scroll-locked');

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Close if the viewport grows past the mobile breakpoint while open.
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.documentElement.classList.remove('is-scroll-locked');
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [menuOpen]);

  // Release the scroll lock synchronously, before the browser follows the anchor;
  // releasing it later (in the effect cleanup) interrupts the smooth scroll.
  const closeMenu = () => {
    document.documentElement.classList.remove('is-scroll-locked');
    setMenuOpen(false);
  };

  return (
    <header className={`header${scrolled || menuOpen ? ' is-raised' : ''}`}>
      <div className="header__inner container">
        <a className="header__brand" href="#home" onClick={closeMenu}>
          <img src={asset('brand/vellfire-logo-black.svg')} alt={`${site.brandName} home`} width="142" height="28" />
        </a>

        {/* Mobile controls come before the nav in the DOM so Tab moves from the
            menu button straight into the opened menu. Hidden on desktop. */}
        <div className="header__actions">
          <a
            className="icon-button icon-button--whatsapp"
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-button"
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav className="header__nav" aria-label="Primary">
          <ul id="primary-menu" className={`nav-list${menuOpen ? ' is-open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  className="nav-list__link"
                  aria-current={activeSection === item.target ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-list__cta">
              <WhatsAppLink variant="dark" size="small">
                Enquire on WhatsApp
              </WhatsAppLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
