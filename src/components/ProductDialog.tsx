import { useEffect, useRef } from 'react';
import type { Product } from '../data/types';
import { formatPrice, getProductName } from '../utils/format';
import { getProductMeta, getSpecRows } from '../utils/specs';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { CloseIcon } from './Icons';
import { ProductVisual } from './ProductVisual';
import { WhatsAppLink } from './WhatsAppLink';

interface ProductDialogProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Product details in a native modal <dialog>: the browser handles the focus trap,
 * inert background and Escape key; we add scroll locking and backdrop-click close.
 */
export function ProductDialog({ product, onClose }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      dialog.showModal();
      // Focus the close button explicitly; otherwise browsers may focus the scrollable panel.
      closeButtonRef.current?.focus();
      document.documentElement.classList.add('is-scroll-locked');
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  const handleClose = () => {
    document.documentElement.classList.remove('is-scroll-locked');
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      aria-labelledby="product-dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        // A click whose target is the <dialog> itself landed on the backdrop.
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      {product && (
        <div className="product-dialog__panel">
          <button
            ref={closeButtonRef}
            type="button"
            className="product-dialog__close"
            aria-label="Close product details"
            onClick={() => dialogRef.current?.close()}
          >
            <CloseIcon />
          </button>

          <div className="product-dialog__media">
            <div className="product-dialog__visual">
              <ProductVisual product={product} sizes="(max-width: 51.99rem) 90vw, 40vw" />
            </div>
          </div>

          <div className="product-dialog__content">
            <p className="product-card__meta">{getProductMeta(product)}</p>
            <h2 id="product-dialog-title" className="product-dialog__title">
              {getProductName(product)}
            </h2>
            <p className="product-dialog__price">{formatPrice(product.priceInr)}</p>

            <dl className="spec-list">
              {getSpecRows(product).map((row) => (
                <div key={row.label} className="spec-list__row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="product-dialog__actions">
              <WhatsAppLink href={getProductWhatsAppUrl(product)} size="large">
                Enquire on WhatsApp
              </WhatsAppLink>
              <button type="button" className="btn btn--ghost" onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </div>
            <p className="footnote">Representative image. On-screen picture simulated.</p>
          </div>
        </div>
      )}
    </dialog>
  );
}
