import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import './Toast.css';

export default function Toast({ message, onClose, type = 'success' }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <CheckCircle2 size={19} aria-hidden="true" />
      <span>{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Tutup notifikasi"><X size={17} /></button>
    </div>
  );
}
