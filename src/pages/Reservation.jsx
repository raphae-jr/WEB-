import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ChevronRight, Clock3, Trash2 } from 'lucide-react';
import { hotel } from '../data/hotel';
import { rooms } from '../data/rooms';
import { halls } from '../data/halls';
import { formatRupiah, formatTanggal, hitungMalam } from '../utils/format';
import { add, clear, getAll, remove } from '../utils/storage';
import { validateAula, validateKamar } from '../utils/validation';
import ReservationForm from '../components/ReservationForm';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import SectionTitle from '../components/SectionTitle';
import './Pages.css';
import './Reservation.css';

const eventTypes = ['Pernikahan', 'Resepsi', 'Seminar', 'Rapat', 'Acara keluarga'];
const blankRoomForm = () => ({ nama: '', email: '', telepon: '', checkIn: '', checkOut: '', tipeKamar: '', jumlahKamar: '1', jumlahTamu: '1', catatan: '' });
const blankHallForm = () => ({ nama: '', email: '', telepon: '', tanggalAcara: '', aula: '', jenisAcara: '', jumlahTamu: '1', catatan: '' });

function todayLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const roomFields = (minimumDate) => [
  { name: 'nama', label: 'Nama lengkap', placeholder: 'Nama sesuai identitas' },
  { name: 'email', label: 'Alamat email', type: 'email', placeholder: 'nama@email.com' },
  { name: 'telepon', label: 'Nomor telepon', type: 'tel', placeholder: '+62 atau 08...' },
  { name: 'checkIn', label: 'Tanggal check-in', type: 'date', min: minimumDate },
  { name: 'checkOut', label: 'Tanggal check-out', type: 'date', min: minimumDate },
  { name: 'tipeKamar', label: 'Tipe kamar', type: 'select', placeholder: 'Pilih tipe kamar', options: rooms.map((room) => ({ value: room.id, label: `${room.name} — ${formatRupiah(room.price)}/malam` })) },
  { name: 'jumlahKamar', label: 'Jumlah kamar', type: 'number', min: 1 },
  { name: 'jumlahTamu', label: 'Jumlah tamu', type: 'number', min: 1 },
  { name: 'catatan', label: 'Catatan tambahan', type: 'textarea', required: false, wide: true, placeholder: 'Permintaan khusus (opsional)' },
];

const hallFields = (minimumDate) => [
  { name: 'nama', label: 'Nama lengkap', placeholder: 'Nama penanggung jawab' },
  { name: 'email', label: 'Alamat email', type: 'email', placeholder: 'nama@email.com' },
  { name: 'telepon', label: 'Nomor telepon', type: 'tel', placeholder: '+62 atau 08...' },
  { name: 'tanggalAcara', label: 'Tanggal acara', type: 'date', min: minimumDate },
  { name: 'aula', label: 'Pilihan aula', type: 'select', placeholder: 'Pilih aula', options: halls.map((hall) => ({ value: hall.id, label: `${hall.name} — ${hall.capacity} tamu` })) },
  { name: 'jenisAcara', label: 'Jenis acara', type: 'select', placeholder: 'Pilih jenis acara', options: eventTypes.map((event) => ({ value: event, label: event })) },
  { name: 'jumlahTamu', label: 'Perkiraan jumlah tamu', type: 'number', min: 1 },
  { name: 'catatan', label: 'Catatan tambahan', type: 'textarea', required: false, wide: true, placeholder: 'Kebutuhan tata ruang, konsumsi, dan lainnya (opsional)' },
];

export default function Reservation() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.jenis === 'aula' ? 'aula' : 'kamar');
  const [roomForm, setRoomForm] = useState(() => ({ ...blankRoomForm(), ...(location.state?.jenis === 'kamar' && location.state.id ? { tipeKamar: location.state.id } : {}) }));
  const [hallForm, setHallForm] = useState(() => ({ ...blankHallForm(), ...(location.state?.jenis === 'aula' && location.state.id ? { aula: location.state.id } : {}) }));
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState(() => getAll());
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const summaryRef = useRef(null);
  const submitLockRef = useRef(false);
  const minimumDate = todayLocal();

  useEffect(() => {
    if (!location.state?.jenis) return;
    const { jenis, id } = location.state;
    setActiveTab(jenis === 'aula' ? 'aula' : 'kamar');
    if (jenis === 'kamar' && id) setRoomForm((current) => ({ ...current, tipeKamar: id }));
    if (jenis === 'aula' && id) setHallForm((current) => ({ ...current, aula: id }));
    setErrors({});
    setSummary(null);
  }, [location.key, location.state]);

  useEffect(() => {
    if (summary && summaryRef.current) summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [summary]);

  const activeForm = activeTab === 'kamar' ? roomForm : hallForm;
  const selectedRoom = rooms.find((room) => room.id === roomForm.tipeKamar);
  const nightCount = hitungMalam(roomForm.checkIn, roomForm.checkOut);
  const roomEstimate = selectedRoom && nightCount > 0
    ? selectedRoom.price * nightCount * Math.max(1, Number(roomForm.jumlahKamar) || 1)
    : 0;
  const selectedHall = halls.find((hall) => hall.id === hallForm.aula);
  const fields = useMemo(() => activeTab === 'kamar' ? roomFields(minimumDate) : hallFields(minimumDate), [activeTab, minimumDate]);

  const closeToast = useCallback(() => setToastMessage(''), []);
  const updateField = (field, value) => {
    if (activeTab === 'kamar') setRoomForm((current) => ({ ...current, [field]: value }));
    else setHallForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSummary(null);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setSummary(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = activeTab === 'kamar' ? validateKamar(roomForm, rooms) : validateAula(hallForm, halls);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const data = { ...(activeTab === 'kamar' ? roomForm : hallForm) };
    if (activeTab === 'kamar') {
      data.jumlahKamar = Number(data.jumlahKamar);
      data.jumlahTamu = Number(data.jumlahTamu);
      setSummary({ jenis: 'kamar', data, estimasi: roomEstimate, malam: nightCount });
    } else {
      data.jumlahTamu = Number(data.jumlahTamu);
      setSummary({ jenis: 'aula', data, estimasi: 'Konsultasi harga' });
    }
  };

  const confirmReservation = () => {
    if (!summary || submitLockRef.current) return;
    submitLockRef.current = true;
    setIsSubmitting(true);
    try {
      add({ jenis: summary.jenis, data: summary.data, estimasi: summary.estimasi });
      setHistory(getAll());
      setSummary(null);
      if (summary.jenis === 'kamar') setRoomForm(blankRoomForm());
      else setHallForm(blankHallForm());
      setErrors({});
      setToastType('success');
      setToastMessage('Permintaan reservasi berhasil disimpan di browser Anda.');
    } catch (error) {
      console.error('Gagal menyimpan reservasi:', error);
      setToastType('error');
      setToastMessage('Data belum dapat disimpan. Periksa pengaturan penyimpanan browser Anda.');
    } finally {
      window.setTimeout(() => {
        submitLockRef.current = false;
        setIsSubmitting(false);
      }, 350);
    }
  };

  const deleteHistoryItem = (id) => {
    try {
      setHistory(remove(id));
      setToastType('success');
      setToastMessage('Riwayat reservasi dihapus.');
    } catch (error) {
      console.error('Gagal menghapus riwayat:', error);
      setToastType('error');
      setToastMessage('Riwayat belum dapat dihapus.');
    }
  };

  const confirmClearHistory = () => {
    try {
      setHistory(clear());
      setShowClearConfirm(false);
      setToastType('success');
      setToastMessage('Seluruh riwayat reservasi telah dihapus.');
    } catch (error) {
      console.error('Gagal menghapus seluruh riwayat:', error);
      setToastType('error');
      setToastMessage('Riwayat belum dapat dihapus.');
    }
  };

  const chosenName = summary?.jenis === 'kamar'
    ? rooms.find((room) => room.id === summary.data.tipeKamar)?.name
    : halls.find((hall) => hall.id === summary?.data.aula)?.name;

  return (
    <main className="reservation-page">
      <section className="page-intro"><div className="container"><p className="eyebrow">Rencanakan kunjungan</p><h1>Mulai dengan sebuah permintaan.</h1><p className="page-intro-copy">Lengkapi informasi berikut. Tim {hotel.name} akan menggunakan data ini sebagai simulasi permintaan reservasi.</p></div></section>
      <section className="reservation-section section-padding"><div className="container reservation-container">
        <SectionTitle eyebrow="Formulir reservasi" title="Apa yang ingin Anda pesan?" description="Pilih jenis reservasi, isi data, lalu periksa ringkasan sebelum menyimpan permintaan." />
        <div className="reservation-tabs" role="tablist" aria-label="Jenis reservasi">
          <button type="button" role="tab" aria-selected={activeTab === 'kamar'} className={activeTab === 'kamar' ? 'is-active' : ''} onClick={() => changeTab('kamar')}>Reservasi Kamar</button>
          <button type="button" role="tab" aria-selected={activeTab === 'aula'} className={activeTab === 'aula' ? 'is-active' : ''} onClick={() => changeTab('aula')}>Reservasi Aula</button>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit} noValidate>
          <div className="form-section-heading"><span>01</span><div><h3>Informasi pemesan</h3><p>Masukkan kontak yang dapat dihubungi.</p></div></div>
          <ReservationForm fields={fields} values={activeForm} errors={errors} onChange={updateField} />

          {activeTab === 'kamar' ? (
            <div className="estimate-panel">
              <div><span>Estimasi biaya kamar</span><small>{nightCount > 0 ? `${nightCount} malam × ${Number(roomForm.jumlahKamar) || 1} kamar` : 'Lengkapi tanggal menginap untuk melihat estimasi'}</small></div>
              <strong>{roomEstimate > 0 ? formatRupiah(roomEstimate) : '—'}</strong>
            </div>
          ) : (
            <div className="estimate-panel">
              <div><span>Estimasi biaya aula</span><small>{selectedHall ? `${selectedHall.name} · kapasitas ${selectedHall.capacity} tamu` : 'Pilih aula untuk melihat informasi kapasitas'}</small></div>
              <strong>Konsultasi harga</strong>
            </div>
          )}

          <div className="form-submit-row"><p><span>*</span> Wajib diisi, kecuali catatan tambahan.</p><button type="submit" className="button button-dark">Periksa Ringkasan <ChevronRight size={16} /></button></div>
        </form>

        {summary && (
          <section className="reservation-summary" ref={summaryRef} aria-live="polite">
            <div className="form-section-heading"><span>02</span><div><h3>Ringkasan permintaan</h3><p>Periksa kembali informasi sebelum menyimpan.</p></div></div>
            <div className="summary-table">
              <div><span>Jenis reservasi</span><strong>{summary.jenis === 'kamar' ? 'Kamar' : 'Aula'}</strong></div>
              <div><span>Pemesan</span><strong>{summary.data.nama}</strong></div>
              <div><span>Email</span><strong>{summary.data.email}</strong></div>
              <div><span>Telepon</span><strong>{summary.data.telepon}</strong></div>
              <div><span>{summary.jenis === 'kamar' ? 'Tipe kamar' : 'Pilihan aula'}</span><strong>{chosenName}</strong></div>
              {summary.jenis === 'kamar' ? <>
                <div><span>Check-in</span><strong>{formatTanggal(summary.data.checkIn)}</strong></div>
                <div><span>Check-out</span><strong>{formatTanggal(summary.data.checkOut)}</strong></div>
                <div><span>Durasi</span><strong>{summary.malam} malam · {summary.data.jumlahKamar} kamar · {summary.data.jumlahTamu} tamu</strong></div>
              </> : <>
                <div><span>Tanggal acara</span><strong>{formatTanggal(summary.data.tanggalAcara)}</strong></div>
                <div><span>Jenis acara</span><strong>{summary.data.jenisAcara}</strong></div>
                <div><span>Jumlah tamu</span><strong>{summary.data.jumlahTamu} orang</strong></div>
              </>}
              {summary.data.catatan && <div className="summary-note"><span>Catatan</span><strong>{summary.data.catatan}</strong></div>}
              <div className="summary-total"><span>{summary.jenis === 'kamar' ? 'Estimasi biaya' : 'Harga'}</span><strong>{summary.jenis === 'kamar' ? formatRupiah(summary.estimasi) : 'Konsultasi harga'}</strong></div>
            </div>
            <div className="summary-actions"><button type="button" className="button button-light" onClick={() => setSummary(null)}>Kembali mengedit</button><button type="button" className="button button-dark" disabled={isSubmitting} onClick={confirmReservation}>{isSubmitting ? 'Menyimpan...' : 'Kirim Permintaan'} <Check size={16} /></button></div>
          </section>
        )}
      </div></section>

      <section className="history-section section-padding"><div className="container">
        <div className="history-heading"><div><p className="eyebrow">Web Storage</p><h2>Riwayat reservasi</h2><p>Data tersimpan secara lokal pada browser yang digunakan.</p></div>{history.length > 0 && <button type="button" className="text-button delete-all-button" onClick={() => setShowClearConfirm(true)}><Trash2 size={15} /> Hapus semua</button>}</div>
        {history.length > 0 ? (
          <div className="history-list">{history.map((item) => {
            const itemChoice = item.jenis === 'kamar'
              ? rooms.find((room) => room.id === item.data?.tipeKamar)?.name || 'Kamar'
              : halls.find((hall) => hall.id === item.data?.aula)?.name || 'Aula';
            const dateText = item.jenis === 'kamar'
              ? `${formatTanggal(item.data?.checkIn)} – ${formatTanggal(item.data?.checkOut)}`
              : formatTanggal(item.data?.tanggalAcara);
            return (
              <article className="history-item" key={item.id}>
                <div className="history-item-main"><span className="history-type">{item.jenis === 'kamar' ? 'Kamar' : 'Aula'}</span><h3>{itemChoice}</h3><p>{item.data?.nama || 'Pemesan'} · {dateText}</p><small><Clock3 size={13} /> Disimpan {new Date(item.dibuatPada).toLocaleString('id-ID')}</small></div>
                <div className="history-item-end"><strong>{typeof item.estimasi === 'number' ? formatRupiah(item.estimasi) : item.estimasi}</strong><button type="button" className="icon-button" aria-label={`Hapus reservasi ${itemChoice}`} onClick={() => deleteHistoryItem(item.id)}><Trash2 size={16} /></button></div>
              </article>
            );
          })}</div>
        ) : <div className="history-empty"><p>Belum ada riwayat reservasi yang tersimpan.</p></div>}
      </div></section>

      <div className="simulation-notice"><div className="container"><strong>Catatan simulasi</strong><p>Ini simulasi permintaan reservasi. Ketersediaan dan pembayaran tidak diproses. Data hanya tersimpan di browser Anda (localStorage).</p></div></div>

      <Modal isOpen={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Hapus seluruh riwayat?" size="small">
        <p className="confirm-copy">Semua permintaan reservasi yang tersimpan di browser ini akan dihapus dan tidak dapat dipulihkan.</p>
        <div className="summary-actions"><button type="button" className="button button-light" onClick={() => setShowClearConfirm(false)}>Batal</button><button type="button" className="button button-dark" onClick={confirmClearHistory}>Ya, hapus semua</button></div>
      </Modal>
      <Toast message={toastMessage} onClose={closeToast} type={toastType} />
    </main>
  );
}
