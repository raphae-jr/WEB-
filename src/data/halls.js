import { images } from './images';

export const halls = [
  {
    id: 'grand-ballroom',
    name: 'Grand Ballroom',
    capacity: 600,
    size: 720,
    price: 45000000,
    image: images.halls.grand,
    description: 'Ballroom utama dengan tata ruang luas dan fleksibel untuk perayaan berskala besar maupun agenda korporat.',
    facilities: ['Panggung dan ruang persiapan', 'Sistem audio visual', 'Lighting profesional', 'Ruang tunggu VIP', 'Area foyer'],
    events: ['Pernikahan', 'Resepsi', 'Seminar', 'Rapat', 'Acara keluarga'],
  },
  {
    id: 'emerald-hall',
    name: 'Emerald Hall',
    capacity: 180,
    size: 240,
    price: 18500000,
    image: images.halls.emerald,
    description: 'Aula berkarakter intim dengan pencahayaan hangat untuk pertemuan, resepsi, dan acara keluarga.',
    facilities: ['Proyektor dan layar', 'Sound system', 'Pengaturan meja fleksibel', 'Area penerima tamu'],
    events: ['Pernikahan', 'Resepsi', 'Seminar', 'Rapat', 'Acara keluarga'],
  },
  {
    id: 'sapphire-hall',
    name: 'Sapphire Hall',
    capacity: 80,
    size: 110,
    price: null,
    image: images.halls.sapphire,
    description: 'Ruang multifungsi untuk rapat, diskusi, dan pertemuan privat dengan fasilitas presentasi.',
    facilities: ['Smart display', 'Video conference', 'Whiteboard', 'Wi-Fi', 'Coffee break area'],
    events: ['Seminar', 'Rapat', 'Acara keluarga'],
  },
];
