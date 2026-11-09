import { images } from './images';

export const facilities = [
  {
    id: 'pool',
    name: 'Kolam Renang',
    image: images.facilities.pool,
    description: 'Kolam renang outdoor dengan area berjemur dan suasana tenang untuk menyegarkan diri setelah beraktivitas.',
    hours: '06.00–20.00 WIB',
    rules: ['Gunakan pakaian renang yang sesuai.', 'Anak-anak wajib didampingi orang dewasa.', 'Mandi sebelum memasuki kolam.', 'Dilarang membawa makanan dan minuman ke tepi kolam.'],
  },
  {
    id: 'gym',
    name: 'Fitness Center',
    image: images.facilities.gym,
    description: 'Area kebugaran dengan pilihan peralatan kardio dan latihan beban untuk menjaga rutinitas olahraga.',
    hours: '06.00–22.00 WIB',
    rules: ['Gunakan pakaian dan sepatu olahraga.', 'Bersihkan peralatan setelah digunakan.', 'Kembalikan beban ke tempat semula.', 'Gunakan alat sesuai petunjuk keselamatan.'],
  },
  {
    id: 'spa',
    name: 'Serenity Spa',
    image: images.facilities.spa,
    description: 'Ruang relaksasi dengan pilihan perawatan tubuh untuk membantu memulihkan energi dan menciptakan waktu istirahat berkualitas.',
    hours: '10.00–21.00 WIB (dengan reservasi)',
    rules: ['Reservasi dianjurkan sebelum kunjungan.', 'Datang 15 menit sebelum jadwal.', 'Informasikan kebutuhan khusus kepada terapis.', 'Pembatalan mengikuti ketentuan layanan.'],
  },
  {
    id: 'meeting',
    name: 'Ruang Pertemuan',
    image: images.facilities.meeting,
    description: 'Beberapa ruang pertemuan dengan konfigurasi fleksibel untuk rapat bisnis, diskusi, dan presentasi.',
    hours: '08.00–21.00 WIB (berdasarkan pemesanan)',
    rules: ['Pemesanan dilakukan melalui tim reservasi.', 'Gunakan fasilitas audio visual sesuai panduan.', 'Jaga kebersihan dan ketertiban ruangan.', 'Perubahan jadwal mengikuti konfirmasi hotel.'],
  },
];
