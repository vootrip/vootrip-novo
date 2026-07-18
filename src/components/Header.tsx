import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Plane, Menu, User, Heart, Newspaper, Castle } from 'lucide-react';
import { TripFormModal } from '@/components/TripFormModal';
import { Sidebar } from '@/components/Sidebar';
import { useFavorites } from '@/hooks/useFavorites';

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tripModalOpen, setTripModalOpen] = useState(false);
  const { count: favoritesCount } = useFavorites();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const shouldBeTransparent = transparent && isHome;

  return (
    <>
      <header data-ev-id="ev_c30c6d4967" className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      shouldBeTransparent ? 'bg-transparent' : 'bg-white shadow-md'}`
      }>
        <div data-ev-id="ev_d8c9c7eb59" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_b7518821a9" className="flex items-center justify-between h-16 lg:h-20">
            {/* Menu Button + Logo */}
            <div data-ev-id="ev_65febf2223" className="flex items-center gap-3">
              {/* Menu Hamburger */}
              <button data-ev-id="ev_8db9be730d"
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-lg transition-colors ${
              shouldBeTransparent ?
              'text-white hover:bg-white/10' :
              'text-[#1A1A2E] hover:bg-[#F1F5F9]'}`
              }>

                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div data-ev-id="ev_6cada71f46" className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span data-ev-id="ev_81e6b30175" className={`text-2xl font-bold ${
                shouldBeTransparent ? 'text-white' : 'text-[#1A1A2E]'}`
                }>
                  voo<span data-ev-id="ev_49c1508560" className="text-[#FF6B35]">trip</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden, now in sidebar */}
            <nav data-ev-id="ev_dd144c3573" className="hidden lg:flex items-center gap-8">
              <NavLink to="/" label="Início" transparent={shouldBeTransparent} />
              <NavLink to="/destinos" label="Destinos" transparent={shouldBeTransparent} />
              <NavLink to="/ofertas" label="Ofertas" transparent={shouldBeTransparent} />
            </nav>

            {/* Desktop Actions */}
            <div data-ev-id="ev_3919053bad" className="flex items-center gap-2 lg:gap-4">
              <Link
                to="/disney"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B5DE5] text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">

                <Castle className="w-4 h-4" />
                <span data-ev-id="ev_disneybtn">Disney</span>
              </Link>
              <Link
                to="/blog"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">

                <Newspaper className="w-4 h-4" />
                <span data-ev-id="ev_d388b91edb">Blog</span>
              </Link>
              <Link
                to="/favoritos"
                className={`relative p-2 rounded-full transition-colors ${
                shouldBeTransparent ?
                'text-white hover:bg-white/10' :
                'text-[#64748B] hover:bg-[#F1F5F9]'} ${
                favoritesCount > 0 ? shouldBeTransparent ? 'text-red-400' : 'text-red-500' : ''}`}>

                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-current' : ''}`} />
                {favoritesCount > 0 &&
                <span data-ev-id="ev_54cedc77a8" className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                }
              </Link>
              <button data-ev-id="ev_ba4219b355"
              onClick={() => setTripModalOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              shouldBeTransparent ?
              'text-white border border-white/30 hover:bg-white/10' :
              'text-[#1A1A2E] border border-[#E2E8F0] hover:bg-[#F1F5F9]'}`
              }>

                <User className="w-5 h-5" />
                <span data-ev-id="ev_b05c751bfa" className="font-medium">Planejar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenTripModal={() => setTripModalOpen(true)} />


      {/* Trip Form Modal */}
      <TripFormModal isOpen={tripModalOpen} onClose={() => setTripModalOpen(false)} />
    </>);

}

function NavLink({ to, label, transparent }: {to: string;label: string;transparent: boolean;}) {
  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${
      transparent ?
      'text-white/90 hover:text-white' :
      'text-[#64748B] hover:text-[#1A1A2E]'}`
      }>

      {label}
    </Link>);

}
