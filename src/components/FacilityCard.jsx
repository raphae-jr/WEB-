import { ArrowUpRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { hotel } from '../data/hotel';
import './Cards.css';

export default function FacilityCard({ facility, reverse = false }) {
  return (
    <article className={`facility-row${reverse ? ' facility-row-reverse' : ''}`}>
      <div className="facility-row-image"><ImageWithFallback src={facility.image} alt={facility.name} /></div>
      <div className="facility-row-content">
        <p className="card-overline">Fasilitas hotel</p>
        <h2>{facility.name}</h2>
        <p className="facility-description">{facility.description}</p>
        <div className="facility-hours"><span>Jam operasional</span><strong>{facility.hours}</strong></div>
        <h3>Ketentuan penggunaan</h3>
        <ul>{facility.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
        <a className="text-button facility-contact" href={`mailto:${hotel.email}`}>Hubungi concierge <ArrowUpRight size={15} /></a>
      </div>
    </article>
  );
}
