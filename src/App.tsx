/**
 * ⚠️ ROUTING RULES:
 * - Use <Routes> + <Route> for defining routes
 * - Do NOT add <BrowserRouter> here — it's in main.tsx
 * - Do NOT use useRoutes() hook
 * - All page components must be default exports
 */

import { Routes, Route } from 'react-router';
import Index from '@/pages/Index';
import FlightResults from '@/pages/FlightResults';
import HotelResults from '@/pages/HotelResults';
import CarResults from '@/pages/CarResults';
import TransferResults from '@/pages/TransferResults';
import SobreNos from '@/pages/SobreNos';
import ComoFunciona from '@/pages/ComoFunciona';
import SejaParceiro from '@/pages/SejaParceiro';
import Blog from '@/pages/Blog';
import Carreiras from '@/pages/Carreiras';
import DownloadLogo from '@/pages/DownloadLogo';
import Termos from '@/pages/Termos';
import Privacidade from '@/pages/Privacidade';
import Destinos from '@/pages/Destinos';
import Ofertas from '@/pages/Ofertas';
import Favoritos from '@/pages/Favoritos';
import Disney from '@/pages/Disney';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOfertas from '@/pages/admin/AdminOfertas';
import AdminBlog from '@/pages/admin/AdminBlog';
import AdminDestinos from '@/pages/admin/AdminDestinos';
import AdminParceiros from '@/pages/admin/AdminParceiros';
import AdminVagas from '@/pages/admin/AdminVagas';
import AdminDisney from '@/pages/admin/AdminDisney';
import AdminDisneyParks from '@/pages/admin/AdminDisneyParks';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/voos/resultados" element={<FlightResults />} />
      <Route path="/hoteis/resultados" element={<HotelResults />} />
      <Route path="/carros/resultados" element={<CarResults />} />
      <Route path="/traslados/resultados" element={<TransferResults />} />
      <Route path="/sobre" element={<SobreNos />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/parceiros" element={<SejaParceiro />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/carreiras" element={<Carreiras />} />
      <Route path="/download-logo" element={<DownloadLogo />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="/ofertas" element={<Ofertas />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/disney" element={<Disney />} />
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/ofertas" element={<AdminOfertas />} />
      <Route path="/admin/blog" element={<AdminBlog />} />
      <Route path="/admin/destinos" element={<AdminDestinos />} />
      <Route path="/admin/parceiros" element={<AdminParceiros />} />
      <Route path="/admin/vagas" element={<AdminVagas />} />
      <Route path="/admin/disney" element={<AdminDisney />} />
      <Route path="/admin/disney-parques" element={<AdminDisneyParks />} />
    </Routes>
  );
}
