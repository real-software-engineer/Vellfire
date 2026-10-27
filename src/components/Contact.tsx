import { getDirectionsUrl, site } from '../config/site';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ArrowRightIcon, MapPinIcon, WhatsAppIcon } from './Icons';
import { WhatsAppLink } from './WhatsAppLink';

export function Contact() {
  return (
    <section id="contact" className="section section--dark contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div className="contact__intro">
          <p className="label label--gold">Contact</p>
          <h2 id="contact-title" className="title title--light">
            Talk to {site.brandName}
          </h2>
          <p className="lead lead--light">
            Message us on WhatsApp for prices, availability and help choosing a size. Tell us which model you are
            looking at and we will reply with the details.
          </p>
          <WhatsAppLink variant="gold" size="large">
            Enquire on WhatsApp
          </WhatsAppLink>
        </div>

        <div className="contact__details">
          <div className="contact-block">
            <span className="contact-block__icon">
              <WhatsAppIcon />
            </span>
            <div>
              <h3 className="contact-block__title">WhatsApp</h3>
              <a className="contact-block__phone" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                {site.whatsApp.number}
              </a>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-block__icon">
              <MapPinIcon />
            </span>
            <div>
              <h3 className="contact-block__title">Address</h3>
              <address className="contact-block__address">
                {site.address.line}
                <br />
                {site.address.city}
              </address>
              <a className="text-link" href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
                Get directions
                <ArrowRightIcon />
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
