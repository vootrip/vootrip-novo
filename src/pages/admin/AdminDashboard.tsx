import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  Plane,
  LayoutDashboard,
  MapPin,
  LogOut,
  Menu,
  X,
  Plus,
  TrendingUp,
  Eye,
  Loader2,
  Castle } from
'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, signOut } = useAuth();

  // Redirect to login if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
      </div>);

  }

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Castle, label: 'Disney Pacotes', path: '/admin/disney' },
  { icon: MapPin, label: 'Disney Parques', path: '/admin/disney-parques' }];


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen &&
      <div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={() => setSidebarOpen(false)} />

      }

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#1A1A2E] z-50 transform transition-transform lg:translate-x-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
      }>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 bg-white rounded-xl px-2 py-1.5 w-fit">
            <img src="/Logo_Vootrip.jpg" alt="Vootrip - Ingressos para os parques da Disney" className="h-10 w-auto rounded-lg" />
          </Link>
          <p className="text-white/40 text-xs mt-2">Painel Admin</p>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive ?
                    'bg-[#FF6B35] text-white' :
                    'text-white/70 hover:bg-white/10 hover:text-white'}`
                    }>

                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>);

            })}
          </ul>

          <div className="mt-8 pt-4 border-t border-white/10">
            <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all w-full">

              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">

                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-[#1A1A2E]">{title}</h1>
            </div>
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-[#64748B] hover:text-[#1A1A2E] transition-colors">

              <Eye className="w-4 h-4" />
              Ver Site
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>);

}

export default function AdminDashboard() {
  const stats = [
  { label: 'Pacotes Disney', value: '-', icon: Castle, color: '#FF6B35' },
  { label: 'Parques Disney', value: '-', icon: MapPin, color: '#9B5DE5' }];


  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}>

                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-[#1A1A2E]">{stat.value}</p>
              <p className="text-[#64748B] text-sm">{stat.label}</p>
            </div>);

        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">Ações Rápidas</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/admin/disney"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all">

            <Plus className="w-5 h-5 text-[#FF6B35]" />
            <span className="font-medium text-[#1A1A2E]">Novo Pacote Disney</span>
          </Link>
          <Link
            to="/admin/disney-parques"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#9B5DE5] hover:bg-[#9B5DE5]/5 transition-all">

            <Plus className="w-5 h-5 text-[#9B5DE5]" />
            <span className="font-medium text-[#1A1A2E]">Novo Parque Disney</span>
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">💡 Dica</h3>
        <p className="text-white/90">
          Gerencie os pacotes e parques da página Disney pelo menu ao lado.
          As alterações aparecem automaticamente no site público.
        </p>
      </div>
    </AdminLayout>);

}
