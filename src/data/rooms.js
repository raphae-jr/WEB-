import { images } from './images';

export const rooms = [
  {
    id: 'superior',
    name: 'Superior Room',
    type: 'Superior',
    price: 685000,
    size: 28,
    capacity: 2,
    image: images.rooms.superior,
    description: 'Ruang istirahat yang hangat dan fungsional dengan tata ruang nyaman untuk perjalanan singkat maupun kunjungan bisnis.',
    facilities: ['King atau twin bed', 'Wi-Fi berkecepatan tinggi', 'Smart TV', 'Kamar mandi pribadi', 'Coffee & tea maker'],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    type: 'Deluxe',
    price: 925000,
    size: 34,
    capacity: 2,
    image: images.rooms.deluxe,
    description: 'Kamar lebih lapang dengan detail interior elegan, area duduk, dan fasilitas pilihan untuk pengalaman menginap yang rileks.',
    facilities: ['King bed', 'Wi-Fi berkecepatan tinggi', 'Smart TV', 'Area duduk', 'Minibar', 'Bathtub'],
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    type: 'Executive',
    price: 1450000,
    size: 52,
    capacity: 3,
    image: images.rooms.executive,
    description: 'Suite eksklusif dengan ruang tidur dan area bersantai terpisah, dirancang untuk tamu yang membutuhkan privasi dan keleluasaan.',
    facilities: ['King bed', 'Living area terpisah', 'Wi-Fi premium', 'Smart TV', 'Minibar', 'Bathtub', 'Executive amenities'],
  },
];
