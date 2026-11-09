import { images } from './images';

export const menuCategories = ['Semua', 'Makanan Utama', 'Pembuka', 'Dessert', 'Minuman'];

export const menus = [
  { id: 'm1', name: 'Grilled Tenderloin', category: 'Makanan Utama', price: 185000, description: 'Daging tenderloin panggang dengan saus lada hitam dan sayuran musiman.', image: images.menus.beef },
  { id: 'm2', name: 'Pan-Seared Salmon', category: 'Makanan Utama', price: 168000, description: 'Salmon panggang dengan lemon butter, kentang, dan asparagus.', image: images.menus.salmon },
  { id: 'm3', name: 'Truffle Cream Pasta', category: 'Makanan Utama', price: 128000, description: 'Pasta al dente dengan saus krim jamur dan sentuhan minyak truffle.', image: images.menus.pasta },
  { id: 'm4', name: 'Garden Salad', category: 'Pembuka', price: 58000, description: 'Sayuran segar, tomat ceri, keju, dan dressing lemon madu.', image: images.menus.salad },
  { id: 'm5', name: 'Mushroom Velouté', category: 'Pembuka', price: 52000, description: 'Sup krim jamur dengan aroma herbs dan roti panggang.', image: images.menus.soup },
  { id: 'm6', name: 'Golden Spring Rolls', category: 'Pembuka', price: 48000, description: 'Lumpia sayuran renyah disajikan dengan saus khas rumah.', image: images.menus.springRoll },
  { id: 'm7', name: 'Classic Opera Cake', category: 'Dessert', price: 62000, description: 'Lapisan almond sponge, kopi, dan cokelat dengan tekstur lembut.', image: images.menus.cake },
  { id: 'm8', name: 'Seasonal Fruit Tart', category: 'Dessert', price: 55000, description: 'Tart renyah dengan pastry cream dan buah musiman.', image: images.menus.tart },
  { id: 'm9', name: 'Vanilla Panna Cotta', category: 'Dessert', price: 52000, description: 'Panna cotta vanilla lembut dengan saus buah beri.', image: images.menus.pudding },
  { id: 'm10', name: 'Grandvell Espresso', category: 'Minuman', price: 38000, description: 'Espresso dengan karakter kuat dan aroma biji kopi pilihan.', image: images.menus.coffee },
  { id: 'm11', name: 'Fresh Citrus Juice', category: 'Minuman', price: 42000, description: 'Jus jeruk segar yang disajikan dingin tanpa pemanis berlebih.', image: images.menus.juice },
  { id: 'm12', name: 'Jasmine Tea', category: 'Minuman', price: 35000, description: 'Teh melati pilihan dengan aroma floral yang lembut.', image: images.menus.tea },
];
