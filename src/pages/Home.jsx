import { ArrowRight, BedDouble, Coffee, Dumbbell, Waves } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { hotel } from '../data/hotel';
import { images } from '../data/images';
import { rooms } from '../data/rooms';
import Hero from '../components/Hero';
import ImageWithFallback from '../components/ImageWithFallback';
import RoomCard from '../components/RoomCard';
import SectionTitle from '../components/SectionTitle';
import './Pages.css';

const services = [
  { icon: BedDouble, title: 'Kamar & Suite', text: 'Pilihan akomodasi dengan detail kenyamanan yang dipikirkan secara saksama.', link: '/kamar', label: 'Jelajahi kamar' },
  { icon: Coffee, title: 'Kuliner', text: 'Hidangan pilihan dan suasana bersantap yang hangat sepanjang hari.', link: '/restoran', label: 'Lihat restoran' },
  { icon: Waves, title: 'Relaksasi', text: 'Fasilitas rekreasi untuk menjaga keseimbangan selama perjalanan.', link: '/fasilitas', label: 'Lihat fasilitas' },
  { icon: Dumbbell, title: 'Convention', text: 'Ruang acara dan pertemuan yang fleksibel untuk berbagai kebutuhan.', link: '/aula', label: 'Temukan aula' },
];

export default function Home() {
  const featuredRooms = rooms;
  const navigate = useNavigate();

  return (
    <main>
      <Hero />

      <section className="intro-section section-padding">
        <div className="container intro-grid">
          <div className="intro-copy">
            <p className="eyebrow">Selamat datang di {hotel.name}</p>
            <h2>{hotel.name}, tempat kenyamanan bertemu keanggunan.</h2>
            <p>Dirancang untuk perjalanan bisnis maupun momen personal, {hotel.name} menghadirkan keramahan yang tulus dalam suasana yang tenang dan berkelas.</p>
            <Link className="text-button" to="/fasilitas">Kenali lebih dekat <ArrowRight size={15} /></Link>
          </div>
          <div className="intro-image-wrap">
            <ImageWithFallback src={images.lobby} alt="Lobi hotel dengan interior klasik elegan" className="intro-image" />
            <span className="intro-image-caption">Hospitality, thoughtfully curated</span>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <SectionTitle eyebrow={`Pengalaman ${hotel.name}`} title="Dirancang untuk kebutuhan Anda" description="Setiap layanan menyatukan kenyamanan, perhatian, dan standar pelayanan yang konsisten." align="center" />
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="service-item" key={service.title}>
                  <span className="service-number">0{index + 1}</span>
                  <Icon className="service-icon" size={27} strokeWidth={1.4} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link to={service.link} className="text-button">{service.label} <ArrowRight size={14} /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="featured-rooms-section section-padding">
        <div className="container">
          <div className="section-heading-row">
            <SectionTitle eyebrow="Akomodasi" title="Temukan ruang istirahat Anda" description="Tiga pilihan kamar dengan karakter dan kenyamanan yang berbeda." />
            <Link className="text-button section-heading-link" to="/kamar">Semua kamar <ArrowRight size={15} /></Link>
          </div>
          <div className="room-grid home-room-grid">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} featured onDetail={() => navigate('/kamar')} onReserve={() => navigate('/reservasi', { state: { jenis: 'kamar', id: room.id } })} />
            ))}
          </div>
        </div>
      </section>

      <section className="promo-section">
        <ImageWithFallback src={images.exterior} alt="Tampilan luar hotel di sore hari" className="promo-image" />
        <div className="promo-overlay" />
        <div className="container promo-content">
          <p className="eyebrow">Mulai rencanakan kunjungan</p>
          <h2>Momen yang baik dimulai dari tempat yang tepat.</h2>
          <p>Hubungi tim kami untuk informasi akomodasi, kebutuhan acara, dan layanan hotel.</p>
          <Link className="button button-gold" to="/reservasi">Buat Permintaan Reservasi <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
