const STORAGE_KEY = 'grandvell_reservasi';

export function getAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Gagal membaca riwayat reservasi:', error);
    return [];
  }
}

export function add(payload) {
  const current = getAll();
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    ...payload,
    dibuatPada: new Date().toISOString(),
  };
  const next = [item, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return item;
}

export function remove(id) {
  const next = getAll().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clear() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}
