/**
 * ⚠️ ROUTING RULES:
 * - Use <Routes> + <Route> for defining routes
 * - Do NOT add <BrowserRouter> here — it's in main.tsx
 * - Do NOT use useRoutes() hook
 * - All page components must be default exports
 */

import { Routes, Route } from 'react-router';
import Disney from '@/pages/Disney';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminDisney from '@/pages/admin/AdminDisney';
import AdminDisneyParks from '@/pages/admin/AdminDisneyParks';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Disney />} />
      <Route path="/disney" element={<Disney />} />
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/disney" element={<AdminDisney />} />
      <Route path="/admin/disney-parques" element={<AdminDisneyParks />} />
    </Routes>
  );
}
