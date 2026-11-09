import { useNavigate } from 'react-router-dom';
import { halls } from '../data/halls';
import HallCard from '../components/HallCard';
import SectionTitle from '../components/SectionTitle';
import { hotel } from '../data/hotel';
import './Pages.css';

export default function Hall() {
  const navigate = useNavigate();

  const selectHall = (hall) => navigate('/reservasi', { state: { jenis: 'aula', id: hall.id } });

  return (
    <main>
      <section className="page-intro"><div className="container"><p className="eyebrow">{hotel.name} · Convention</p><h1>Ruang yang tepat untuk pertemuan berarti.</h1><p className="page-intro-copy">Dari perayaan personal hingga agenda profesional, setiap aula dirancang untuk menghadirkan pengalaman acara yang tertata.</p></div></section>
      <section className="listing-section section-padding"><div className="container">
        <SectionTitle eyebrow="Pilihan ruang" title="Aula & Convention" description="Informasi kapasitas dan luas membantu Anda menentukan ruang acara. Harga dapat disesuaikan dengan tata ruang serta kebutuhan layanan." />
        <div className="hall-list">{halls.map((hall) => <HallCard key={hall.id} hall={hall} onReserve={selectHall} />)}</div>
      </div></section>
      <section className="hall-event-section"><div className="container hall-event-grid">
        <div><p className="eyebrow">Beragam kebutuhan</p><h2>Acara Anda, perhatian kami.</h2><p>Tim convention dapat membantu menyiapkan kebutuhan pernikahan, resepsi, seminar, rapat, dan acara keluarga.</p></div>
        <div className="event-types">{['Pernikahan', 'Resepsi', 'Seminar', 'Rapat', 'Acara keluarga'].map((event, index) => <span key={event}><b>0{index + 1}</b>{event}</span>)}</div>
      </div></section>
    </main>
  );
}
