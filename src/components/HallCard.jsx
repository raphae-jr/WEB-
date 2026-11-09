import { ArrowUpRight, Maximize2, Users } from 'lucide-react';
import { formatRupiah } from '../utils/format';
import ImageWithFallback from './ImageWithFallback';
import './Cards.css';

export default function HallCard({ hall, onReserve }) {
  return (
    <article className="hall-card">
      <div className="hall-card-image-wrap"><ImageWithFallback src={hall.image} alt={`Tata ruang ${hall.name}`} className="hall-card-image" /></div>
      <div className="hall-card-body">
        <p className="card-overline">Ruang acara</p>
        <h3>{hall.name}</h3>
        <p className="card-description">{hall.description}</p>
        <div className="room-meta"><span><Users size={15} /> Hingga {hall.capacity} tamu</span><span><Maximize2 size={15} /> {hall.size} m²</span></div>
        <div className="hall-details">
          <div><span className="hall-detail-label">Fasilitas</span><ul>{hall.facilities.map((facility) => <li key={facility}>{facility}</li>)}</ul></div>
          <div><span className="hall-detail-label">Jenis acara</span><div className="hall-event-tags">{hall.events.map((event) => <span key={event}>{event}</span>)}</div></div>
        </div>
        <div className="hall-card-price"><span>Harga mulai</span><strong>{hall.price ? formatRupiah(hall.price) : 'Konsultasi harga'}</strong></div>
        <button type="button" className="text-button" onClick={() => onReserve(hall)}>Pilih aula <ArrowUpRight size={15} /></button>
      </div>
    </article>
  );
}
