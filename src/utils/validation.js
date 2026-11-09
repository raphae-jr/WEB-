const phonePattern = /^(?:\+62[0-9]{7,13}|0[0-9]{8,14}|[0-9]{9,15})$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function requiredText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateContact(data, errors) {
  if (!requiredText(data.nama)) errors.nama = 'Nama wajib diisi.';
  if (!requiredText(data.email)) errors.email = 'Email wajib diisi.';
  else if (!emailPattern.test(data.email.trim())) errors.email = 'Format email tidak valid.';
  if (!requiredText(data.telepon)) errors.telepon = 'Nomor telepon wajib diisi.';
  else if (!phonePattern.test(data.telepon.replace(/[\s-]/g, ''))) errors.telepon = 'Gunakan 9–15 digit, boleh diawali +62 atau 0.';
}

function isPastDate(value) {
  const today = new Date();
  const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selected = new Date(`${value}T00:00:00`);
  return selected < localToday;
}

export function validateKamar(data, roomList) {
  const errors = {};
  validateContact(data, errors);
  if (!data.checkIn) errors.checkIn = 'Tanggal check-in wajib diisi.';
  else if (isPastDate(data.checkIn)) errors.checkIn = 'Check-in tidak boleh sebelum hari ini.';
  if (!data.checkOut) errors.checkOut = 'Tanggal check-out wajib diisi.';
  else if (data.checkIn && new Date(`${data.checkOut}T00:00:00`) <= new Date(`${data.checkIn}T00:00:00`)) errors.checkOut = 'Check-out harus setelah check-in.';
  if (!data.tipeKamar) errors.tipeKamar = 'Pilih tipe kamar.';
  if (!Number.isInteger(Number(data.jumlahKamar)) || Number(data.jumlahKamar) < 1) errors.jumlahKamar = 'Jumlah kamar minimal 1.';
  if (!Number.isInteger(Number(data.jumlahTamu)) || Number(data.jumlahTamu) < 1) errors.jumlahTamu = 'Jumlah tamu minimal 1.';
  const room = roomList.find((item) => item.id === data.tipeKamar);
  if (room && Number(data.jumlahTamu) > room.capacity * Number(data.jumlahKamar)) {
    errors.jumlahTamu = `Maksimal ${room.capacity * Number(data.jumlahKamar)} tamu untuk jumlah kamar ini.`;
  }
  return errors;
}

export function validateAula(data, hallList) {
  const errors = {};
  validateContact(data, errors);
  if (!data.tanggalAcara) errors.tanggalAcara = 'Tanggal acara wajib diisi.';
  else if (isPastDate(data.tanggalAcara)) errors.tanggalAcara = 'Tanggal acara tidak boleh sebelum hari ini.';
  if (!data.aula) errors.aula = 'Pilih aula.';
  if (!requiredText(data.jenisAcara)) errors.jenisAcara = 'Jenis acara wajib diisi.';
  if (!Number.isInteger(Number(data.jumlahTamu)) || Number(data.jumlahTamu) < 1) errors.jumlahTamu = 'Jumlah tamu minimal 1.';
  const hall = hallList.find((item) => item.id === data.aula);
  if (hall && Number(data.jumlahTamu) > hall.capacity) errors.jumlahTamu = `Kapasitas ${hall.name} maksimal ${hall.capacity} tamu.`;
  return errors;
}
