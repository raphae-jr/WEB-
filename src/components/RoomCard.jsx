import { ArrowUpRight, BedDouble, Maximize2, Users } from 'lucide-react';
import { formatRupiah } from '../utils/format';
import ImageWithFallback from './ImageWithFallback';
import './Cards.css';

export default function RoomCard({ room, onDetail, onReserve, featured = false }) {
  return (
    <article className={`room-card${featured ? ' room-card-featured' : ''}`}>
      <div className="room-card-image-wrap">
        <ImageWithFallback src={room.image} alt={`Interior ${room.name}`} className="room-card-image" />
        <span className="image-index">{room.type}</span>
      </div>
      <div className="room-card-body">
        <div className="room-card-heading">
          <div><p className="card-overline">Akomodasi</p><h3>{room.name}</h3></div>
          <p className="room-price">{formatRupiah(room.price)}<span>/ malam</span></p>
        </div>
        <p className="card-description">{room.description}</p>
        <div className="room-meta">
          <span><Maximize2 size={15} /> {room.size} m²</span>
          <span><Users size={15} /> {room.capacity} tamu</span>
          <span><BedDouble size={15} /> {room.type}</span>
        </div>
        <div className="card-actions">
          <button type="button" className="text-button" onClick={() => onDetail(room)}>Detail <ArrowUpRight size={15} /></button>
          <button type="button" className="button button-dark button-small" onClick={() => onReserve(room)}>Reservasi</button>
        </div>
      </div>
    </article>
  );
}
