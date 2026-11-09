import { hotel } from '../data/hotel';
import { Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <span className="footer-brand-mark" aria-hidden="true">G</span>
          <div>
            <h2>{hotel.name}</h2>
            <p>{hotel.tagline}</p>
          </div>
        </div>

        <div className="footer-contact">
          <h3>Informasi Kontak</h3>
          <p><MapPin size={15} aria-hidden="true" /> <span>{hotel.address}</span></p>
          <p><Phone size={15} aria-hidden="true" /> <a href={`tel:${hotel.phone.replace(/\s/g, '')}`}>{hotel.phone}</a></p>
          <p><Mail size={15} aria-hidden="true" /> <a href={`mailto:${hotel.email}`}>{hotel.email}</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} {hotel.name}. Hak cipta dilindungi.</span>
          <span>Alamat dan kontak merupakan data fiktif.</span>
        </div>
      </div>
    </footer>
  );
}
