import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page-intro not-found-page">
      <div className="container">
        <p className="eyebrow">Kesalahan 404</p>
        <h1>Halaman Tidak Ditemukan</h1>
        <p className="page-intro-copy">Halaman yang Anda cari tidak tersedia atau alamatnya telah berubah.</p>
        <Link className="text-link" to="/">Kembali ke Beranda</Link>
      </div>
    </main>
  );
}
