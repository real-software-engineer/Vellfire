import type { ReactNode } from 'react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './Icons';

interface WhatsAppLinkProps {
  /** Prefilled message. Defaults to the general enquiry text from site config. */
  message?: string;
  /** Use a prebuilt URL instead of `message` (e.g. from getProductWhatsAppUrl). */
  href?: string;
  /** dark = ink on light backgrounds; gold = on dark backgrounds; outline = secondary. */
  variant?: 'dark' | 'gold' | 'outline' | 'outline-light';
  size?: 'small' | 'medium' | 'large';
  /** Accessible name when the visible text alone is ambiguous (e.g. "Enquire"). */
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export function WhatsAppLink({
  message,
  href,
  variant = 'dark',
  size = 'medium',
  ariaLabel,
  className,
  children,
}: WhatsAppLinkProps) {
  const url = href ?? buildWhatsAppUrl(message);
  const classes = ['btn', `btn--${variant}`, size !== 'medium' && `btn--${size}`, className].filter(Boolean).join(' ');

  return (
    <a className={classes} href={url} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      <WhatsAppIcon className="btn__icon" />
      <span>{children}</span>
    </a>
  );
}
