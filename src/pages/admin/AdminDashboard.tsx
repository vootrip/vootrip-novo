import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  Plane,
  LayoutDashboard,
  Tag,
  FileText,
  MapPin,
  Users,
  LogOut,
  Menu,
  X,
  Plus,
  TrendingUp,
  Eye,
  DollarSign,
  Loader2,
  Briefcase } from
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
      <div data-ev-id="ev_0737ee0f84" className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
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
  { icon: Tag, label: 'Ofertas', path: '/admin/ofertas' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
  { icon: MapPin, label: 'Destinos', path: '/admin/destinos' },
  { icon: Users, label: 'Parceiros', path: '/admin/parceiros' },
  { icon: Briefcase, label: 'Vagas', path: '/admin/vagas' }];


  return (
    <div data-ev-id="ev_1f16e97c4a" className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen &&
      <div data-ev-id="ev_a90fd165e8"
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={() => setSidebarOpen(false)} />

      }

      {/* Sidebar */}
      <aside data-ev-id="ev_9d8bcdf574" className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#1A1A2E] z-50 transform transition-transform lg:translate-x-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
      }>
        {/* Logo */}
        <div data-ev-id="ev_acbf8157e3" className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div data-ev-id="ev_ca3e63d883" className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span data-ev-id="ev_1a24971432" className="text-xl font-bold text-white">
              voo<span data-ev-id="ev_dbc0cfe43e" className="text-[#FF6B35]">trip</span>
            </span>
          </Link>
          <p data-ev-id="ev_991780dd4f" className="text-white/40 text-xs mt-2">Painel Admin</p>
        </div>

        {/* Menu */}
        <nav data-ev-id="ev_c15f0d7329" className="p-4">
          <ul data-ev-id="ev_da20a5edb8" className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li data-ev-id="ev_722e358c64" key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive ?
                    'bg-[#FF6B35] text-white' :
                    'text-white/70 hover:bg-white/10 hover:text-white'}`
                    }>

                    <Icon className="w-5 h-5" />
                    <span data-ev-id="ev_774a841ea6" className="font-medium">{item.label}</span>
                  </Link>
                </li>);

            })}
          </ul>

          <div data-ev-id="ev_dc4122205b" className="mt-8 pt-4 border-t border-white/10">
            <button data-ev-id="ev_e870c4ff9c"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all w-full">

              <LogOut className="w-5 h-5" />
              <span data-ev-id="ev_48592fd6d1" className="font-medium">Sair</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div data-ev-id="ev_94de149cea" className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header data-ev-id="ev_5277bced69" className="bg-white border-b border-gray-200 px-6 py-4">
          <div data-ev-id="ev_2a801d6bba" className="flex items-center justify-between">
            <div data-ev-id="ev_ceb9926a32" className="flex items-center gap-4">
              <button data-ev-id="ev_0e2a25c9fe"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">

                <Menu className="w-6 h-6" />
              </button>
              <h1 data-ev-id="ev_e39151d59b" className="text-xl font-bold text-[#1A1A2E]">{title}</h1>
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
        <main data-ev-id="ev_f6d8693200" className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>);

}

export default function AdminDashboard() {
  const stats = [
  { label: 'Ofertas Ativas', value: '6', icon: Tag, color: '#FF6B35' },
  { label: 'Posts do Blog', value: '3', icon: FileText, color: '#00B4D8' },
  { label: 'Destinos', value: '8', icon: MapPin, color: '#06D6A0' },
  { label: 'Parceiros', value: '8', icon: Users, color: '#9B5DE5' }];


  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div data-ev-id="ev_fbb43c4237" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div data-ev-id="ev_3fbf1101c4" key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <div data-ev-id="ev_036d42aa76" className="flex items-center justify-between mb-4">
                <div data-ev-id="ev_b113e36ef3"
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}>

                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p data-ev-id="ev_7c8ff1a0e4" className="text-3xl font-bold text-[#1A1A2E]">{stat.value}</p>
              <p data-ev-id="ev_2b885e3324" className="text-[#64748B] text-sm">{stat.label}</p>
            </div>);

        })}
      </div>

      {/* Quick Actions */}
      <div data-ev-id="ev_04c3fca51a" className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h2 data-ev-id="ev_53b7ad85f0" className="text-lg font-bold text-[#1A1A2E] mb-4">Ações Rápidas</h2>
        <div data-ev-id="ev_45498d5cb6" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/ofertas?new=true"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all">

            <Plus className="w-5 h-5 text-[#FF6B35]" />
            <span data-ev-id="ev_7ce4f7c14b" className="font-medium text-[#1A1A2E]">Nova Oferta</span>
          </Link>
          <Link
            to="/admin/blog?new=true"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#00B4D8] hover:bg-[#00B4D8]/5 transition-all">

            <Plus className="w-5 h-5 text-[#00B4D8]" />
            <span data-ev-id="ev_d0236ae81e" className="font-medium text-[#1A1A2E]">Novo Post</span>
          </Link>
          <Link
            to="/admin/destinos?new=true"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#06D6A0] hover:bg-[#06D6A0]/5 transition-all">

            <Plus className="w-5 h-5 text-[#06D6A0]" />
            <span data-ev-id="ev_d66970ea06" className="font-medium text-[#1A1A2E]">Novo Destino</span>
          </Link>
          <Link
            to="/admin/parceiros?new=true"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#9B5DE5] hover:bg-[#9B5DE5]/5 transition-all">

            <Plus className="w-5 h-5 text-[#9B5DE5]" />
            <span data-ev-id="ev_e954c026f1" className="font-medium text-[#1A1A2E]">Novo Parceiro</span>
          </Link>
        </div>
      </div>

      {/* Info */}
      <div data-ev-id="ev_509efcb6e3" className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] rounded-2xl p-6 text-white">
        <h3 data-ev-id="ev_eb182c875a" className="font-bold text-lg mb-2">💡 Dica</h3>
        <p data-ev-id="ev_dc96487449" className="text-white/90">
          Este é o painel visual. Para salvar as alterações permanentemente, 
          habilite o Cloud Backend. Por enquanto, os dados são apenas para visualização.
        </p>
      </div>
    </AdminLayout>);

}