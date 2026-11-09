import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';
import Modal from '../components/Modal';
import RoomCard from '../components/RoomCard';
import SectionTitle from '../components/SectionTitle';
import ImageWithFallback from '../components/ImageWithFallback';
import { hotel } from '../data/hotel';
import './Pages.css';

const roomTypes = ['Semua', 'Superior', 'Deluxe', 'Executive'];

export default function Rooms() {
  const [typeFilter, setTypeFilter] = useState('Semua');
  const [search, setSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const filteredRooms = useMemo(() => rooms.filter((room) => {
    const matchesType = typeFilter === 'Semua' || room.type === typeFilter;
    const matchesSearch = `${room.name} ${room.description}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesType && matchesSearch;
  }), [typeFilter, search]);

  const goToReservation = (room) => navigate('/reservasi', { state: { jenis: 'kamar', id: room.id } });

  return (
    <main>
      <section className="page-intro"><div className="container"><p className="eyebrow">{hotel.name} · Akomodasi</p><h1>Kamar yang menghadirkan ruang untuk beristirahat.</h1><p className="page-intro-copy">Pilih akomodasi yang sesuai dengan kebutuhan Anda, mulai dari kamar praktis hingga suite eksklusif.</p></div></section>
      <section className="listing-section section-padding"><div className="container">
        <SectionTitle eyebrow="Pilihan kamar" title="Akomodasi" description="Seluruh harga merupakan estimasi per malam sebelum pajak dan biaya lain yang mungkin berlaku." />
        <div className="filter-toolbar">
          <div className="filter-tabs" role="group" aria-label="Filter tipe kamar">
            {roomTypes.map((type) => <button type="button" key={type} className={`filter-chip${typeFilter === type ? ' is-active' : ''}`} aria-pressed={typeFilter === type} onClick={() => setTypeFilter(type)}>{type}</button>)}
          </div>
          <label className="search-field"><span className="sr-only">Cari kamar</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama kamar..." /></label>
        </div>
        {filteredRooms.length ? (
          <div className="room-grid">{filteredRooms.map((room) => <RoomCard key={room.id} room={room} onDetail={setSelectedRoom} onReserve={goToReservation} />)}</div>
        ) : (
          <div className="empty-state"><h3>Kamar tidak ditemukan</h3><p>Coba ubah kata pencarian atau pilih tipe kamar yang lain.</p><button className="text-button" type="button" onClick={() => { setSearch(''); setTypeFilter('Semua'); }}>Reset filter</button></div>
        )}
      </div></section>

      <Modal isOpen={Boolean(selectedRoom)} onClose={() => setSelectedRoom(null)} title={selectedRoom?.name || 'Detail kamar'} size="large">
        {selectedRoom && <div className="room-detail-layout">
          <ImageWithFallback src={selectedRoom.image} alt={`Interior ${selectedRoom.name}`} className="room-detail-image" />
          <div><p className="eyebrow">{selectedRoom.type} · {selectedRoom.size} m²</p><h3 className="room-detail-title">{selectedRoom.name}</h3><p className="card-description">{selectedRoom.description}</p><p className="room-detail-capacity">Kapasitas hingga {selectedRoom.capacity} tamu</p><h4>Fasilitas kamar</h4><ul className="detail-list">{selectedRoom.facilities.map((facility) => <li key={facility}>{facility}</li>)}</ul><strong className="room-detail-price">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedRoom.price)} / malam</strong><button type="button" className="button button-dark" onClick={() => goToReservation(selectedRoom)}>Lanjut ke reservasi</button></div>
        </div>}
      </Modal>
    </main>
  );
}
