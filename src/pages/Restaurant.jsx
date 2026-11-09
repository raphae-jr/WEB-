import { useMemo, useState } from 'react';
import { menus, menuCategories } from '../data/menus';
import SectionTitle from '../components/SectionTitle';
import MenuCard from '../components/MenuCard';
import { hotel } from '../data/hotel';
import './Pages.css';

export default function Restaurant() {
  const [category, setCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const filteredMenus = useMemo(() => menus.filter((menu) => {
    const matchesCategory = category === 'Semua' || menu.category === category;
    const matchesSearch = `${menu.name} ${menu.description}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, search]);

  return (
    <main>
      <section className="page-intro"><div className="container"><p className="eyebrow">{hotel.name} Dining</p><h1>Perjalanan rasa dalam suasana istimewa.</h1><p className="page-intro-copy">Nikmati sajian yang disiapkan dengan bahan pilihan, dari hidangan utama hingga minuman untuk melengkapi hari Anda.</p></div></section>
      <section className="listing-section section-padding"><div className="container">
        <SectionTitle eyebrow="Menu restoran" title="Pilihan dari dapur kami" description="Menu dan harga berikut merupakan informasi simulasi untuk kebutuhan proyek." />
        <div className="filter-toolbar">
          <div className="filter-tabs" role="group" aria-label="Filter kategori menu">
            {menuCategories.map((item) => <button type="button" key={item} className={`filter-chip${category === item ? ' is-active' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="search-field"><span className="sr-only">Cari menu</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari hidangan..." /></label>
        </div>
        {filteredMenus.length ? <div className="menu-grid">{filteredMenus.map((menu) => <MenuCard key={menu.id} menu={menu} />)}</div> : <div className="empty-state"><h3>Menu tidak ditemukan</h3><p>Silakan coba kata kunci atau kategori lain.</p><button className="text-button" type="button" onClick={() => { setSearch(''); setCategory('Semua'); }}>Reset filter</button></div>}
      </div></section>
      <section className="restaurant-note"><div className="container"><p className="eyebrow">Informasi restoran</p><h2>Dining, at your own pace.</h2><p>Untuk permintaan khusus, alergi makanan, atau informasi layanan restoran, silakan hubungi concierge hotel.</p></div></section>
    </main>
  );
}
