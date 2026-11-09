export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function hitungMalam(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
}

export function formatTanggal(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(`${value}T00:00:00`));
}
