import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../data/images';
import { hotel } from '../data/hotel';
import ImageWithFallback from './ImageWithFallback';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-label={`Sambutan ${hotel.name}`}>
      <ImageWithFallback src={images.hero} alt="Eksterior hotel mewah dengan kolam renang dan taman" className="hero-image" priority width={1920} height={1080} />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-kicker">{hotel.tagline}</p>
        <h1>Ruang istimewa untuk setiap momen.</h1>
        <p className="hero-description">Temukan keramahan berkelas, kenyamanan modern, dan pengalaman yang dirancang dengan perhatian pada setiap detail.</p>
        <div className="hero-actions">
          <Link className="button button-gold" to="/kamar">Lihat Kamar <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link className="button button-outline-light" to="/fasilitas">Lihat Fasilitas</Link>
        </div>
      </div>
      <div className="hero-caption"><span>Pekanbaru · Indonesia</span><span>01 / 04</span></div>
    </section>
  );
}
