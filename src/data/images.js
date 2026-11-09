const photo = (id) => `https://images.unsplash.com/${id}?w=1200&q=70&auto=format`;

export const images = {
  hero: photo('photo-1566073771259-6a8506099945'),
  lobby: photo('photo-1564501049412-61c2a3083791'),
  exterior: photo('photo-1542314831-068cd1dbfeeb'),
  rooms: {
    superior: photo('photo-1611892440504-42a792e24d32'),
    deluxe: photo('photo-1590490360182-c33d57733427'),
    executive: photo('photo-1618221195710-dd6b41faaea6'),
  },
  menus: {
    beef: photo('photo-1546833999-b9f581a1996d'),
    salmon: photo('photo-1519708227418-c8fd9a32b7a2'),
    pasta: photo('photo-1473093295043-cdd812d0e601'),
    salad: photo('photo-1512621776951-a57141f2eefd'),
    soup: photo('photo-1547592180-85f173990554'),
    springRoll: photo('photo-1544025162-d76694265947'),
    cake: photo('photo-1578985545062-69928b1d9587'),
    tart: photo('photo-1488477181946-6428a0291777'),
    pudding: photo('photo-1551024506-0bccd828d307'),
    coffee: photo('photo-1509042239860-f550ce710b93'),
    juice: photo('photo-1600271886742-f049cd451bba'),
    tea: photo('photo-1544787219-7f47gaf8d1'),
  },
  halls: {
    grand: photo('photo-1519167758481-83f550bb49b3'),
    emerald: photo('photo-1511795409834-ef04bbd61622'),
    sapphire: photo('photo-1507504031003-b417219a0fde'),
  },
  facilities: {
    pool: photo('photo-1576013551627-0cc20b96c2a7'),
    gym: photo('photo-1534438327276-14e5300c3a48'),
    spa: photo('photo-1540555700478-4be289fbecef'),
    meeting: photo('photo-1497366754035-f200968a6e72'),
  },
};
