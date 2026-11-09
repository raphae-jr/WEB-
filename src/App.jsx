import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Hall from './pages/Hall';
import Facilities from './pages/Facilities';
import Reservation from './pages/Reservation';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter basename="/WEB-">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kamar" element={<Rooms />} />
        <Route path="/restoran" element={<Restaurant />} />
        <Route path="/aula" element={<Hall />} />
        <Route path="/fasilitas" element={<Facilities />} />
        <Route path="/reservasi" element={<Reservation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
