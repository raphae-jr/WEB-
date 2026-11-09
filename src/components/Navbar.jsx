import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { hotel } from '../data/hotel';
import './Navbar.css';

const navigation = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/kamar', label: 'Kamar' },
  { to: '/restoran', label: 'Restoran' },
  { to: '/aula', label: 'Aula' },
  { to: '/fasilitas', label: 'Fasilitas' },
  { to: '/reservasi', label: 'Reservasi', emphasis: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Tutup navigasi mobile setelah pengguna berpindah halaman.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="navbar container">
        <NavLink className="brand" to="/" aria-label={`${hotel.name}, beranda`}>
          <span className="brand-mark" aria-hidden="true">G</span>
          <span className="brand-copy">
            <span className="brand-name">{hotel.name}</span>
            <span className="brand-tagline">{hotel.tagline}</span>
          </span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          aria-label="Navigasi utama"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => [
                'nav-link',
                isActive ? 'active' : '',
                item.emphasis ? 'nav-link-emphasis' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
