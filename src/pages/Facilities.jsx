import { facilities } from '../data/facilities';
import FacilityCard from '../components/FacilityCard';
import SectionTitle from '../components/SectionTitle';
import { hotel } from '../data/hotel';
import './Pages.css';

export default function Facilities() {
  return (
    <main>
      <section className="page-intro"><div className="container"><p className="eyebrow">Kenyamanan {hotel.name}</p><h1>Lebih dari sekadar tempat menginap.</h1><p className="page-intro-copy">Lengkapi kunjungan Anda dengan fasilitas untuk relaksasi, kebugaran, dan produktivitas.</p></div></section>
      <section className="facilities-section section-padding"><div className="container">
        <SectionTitle eyebrow="Fasilitas hotel" title="Ruang untuk menikmati waktu" description="Setiap fasilitas memiliki ketentuan dan jam operasional. Informasi dapat berubah mengikuti kebijakan hotel." />
        <div className="facility-list">{facilities.map((facility, index) => <FacilityCard key={facility.id} facility={facility} reverse={index % 2 === 1} />)}</div>
      </div></section>
    </main>
  );
}
