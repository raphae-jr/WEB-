import { formatRupiah } from '../utils/format';
import ImageWithFallback from './ImageWithFallback';
import './Cards.css';

export default function MenuCard({ menu }) {
  return (
    <article className="menu-card">
      <ImageWithFallback src={menu.image} alt={menu.name} className="menu-card-image" width={800} height={600} />
      <div className="menu-card-content">
        <div className="menu-card-top"><span className="card-overline">{menu.category}</span><span className="menu-price">{formatRupiah(menu.price)}</span></div>
        <h3>{menu.name}</h3>
        <p>{menu.description}</p>
      </div>
    </article>
  );
}
