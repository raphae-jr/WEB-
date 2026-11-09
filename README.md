# Grandvell Hotel & Convention

Website informasi hotel dan simulasi permintaan reservasi yang dibangun menggunakan React 18, Vite 5, React Router DOM 6, Lucide React, dan CSS murni.

## Persyaratan

- Node.js 18 atau lebih baru
- npm
- Koneksi internet saat instalasi dependensi dan pemuatan foto/font Unsplash/Google Fonts

## Instalasi dan menjalankan

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist/`.

## Struktur proyek

```text
src/
  components/   Navbar, Footer, Hero, SectionTitle, ImageWithFallback,
                Modal, Toast, RoomCard, MenuCard, HallCard, FacilityCard,
                ReservationForm, ScrollToTop
  data/         hotel.js, images.js, rooms.js, menus.js, halls.js, facilities.js
  pages/        Home, Rooms, Restaurant, Hall, Facilities, Reservation, NotFound
  utils/        storage.js, format.js, validation.js
  App.jsx
  main.jsx
  index.css
public/
  _redirects
vercel.json
```

## Fitur

- Beranda dengan hero, pengenalan hotel, layanan unggulan, kamar pilihan, dan ajakan reservasi.
- Daftar kamar dengan filter tipe, pencarian, modal detail, serta tautan reservasi otomatis.
- Menu restoran dengan 12 pilihan yang dapat difilter berdasarkan kategori dan pencarian.
- Informasi tiga aula, kapasitas, fasilitas, jenis acara, dan informasi harga.
- Informasi fasilitas hotel dengan jam operasional dan aturan penggunaan.
- Form reservasi kamar dan aula dengan validasi, estimasi biaya kamar, ringkasan konfirmasi, dan notifikasi.
- Riwayat reservasi menggunakan `localStorage`, termasuk hapus item dan hapus semua.
- Navigasi SPA, halaman 404, menu mobile, dan penanganan gambar yang gagal dimuat.

## Deploy

### Vercel

1. Push proyek ke repository Git.
2. Impor repository melalui dashboard Vercel.
3. Gunakan framework preset **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy. File `vercel.json` mengarahkan permintaan route SPA ke `index.html`.

### Netlify

1. Hubungkan repository melalui dashboard Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy. File `public/_redirects` disalin ke output build untuk mendukung route SPA.

## Catatan simulasi

Website ini merupakan proyek demonstrasi. Permintaan reservasi tidak memeriksa ketersediaan kamar/aula dan tidak memproses pembayaran. Data hanya disimpan pada `localStorage` di browser pengguna. Alamat, nomor telepon, email, harga, dan informasi operasional hotel merupakan data fiktif untuk keperluan proyek.
