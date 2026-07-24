import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Plane, Menu, User, Heart, Hotel, Ticket, Car, Ship, MapPin, FileText, Shield, Castle } from 'lucide-react';
import { TripFormModal } from '@/components/TripFormModal';
import { Sidebar } from '@/components/Sidebar';
import { useFavorites } from '@/hooks/useFavorites';

const WHATSAPP_NUMBER = '5548998365852';
const SEGURO_LINK = 'https://mais.app/ZJiXME';

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  action: 'link' | 'whatsapp' | 'external';
  href?: string;
  whatsappMsg?: string;
  highlight?: boolean;
}

const headerCategories: CategoryItem[] = [
{
  id: 'disney',
  label: 'Disney',
  icon: <Castle className="w-7 h-7" />,
  color: 'text-purple-600',
  action: 'link',
  href: '/disney',
  highlight: true
},
{
  id: 'hospedagem',
  label: 'Hospedagem',
  icon: <Hotel className="w-6 h-6" />,
  color: 'text-blue-500',
  action: 'whatsapp',
  whatsappMsg: 'Olá! Gostaria de informações sobre hospedagem.'
},
{
  id: 'ingressos',
  label: 'Ingressos',
  icon: <Ticket className="w-6 h-6" />,
  color: 'text-green-500',
  action: 'whatsapp',
  whatsappMsg: 'Olá! Gostaria de informações sobre ingressos para parques.'
},
{
  id: 'carros',
  label: 'Carros',
  icon: <Car className="w-6 h-6" />,
  color: 'text-orange-500',
  action: 'whatsapp',
  whatsappMsg: 'Olá! Gostaria de informações sobre aluguel de carros.'
},
{
  id: 'seguro',
  label: 'Seguro',
  icon: <Shield className="w-6 h-6" />,
  color: 'text-red-500',
  action: 'external',
  href: SEGURO_LINK
},
{
  id: 'cruzeiros',
  label: 'Cruzeiros',
  icon: <Ship className="w-6 h-6" />,
  color: 'text-cyan-500',
  action: 'whatsapp',
  whatsappMsg: 'Olá! Gostaria de informações sobre cruzeiros.'
}
];

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
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      shouldBeTransparent ? 'bg-transparent' : 'bg-white shadow-md'}`
      }>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-28">
            {/* Menu Button + Logo */}
            <div className="flex items-center gap-3">
              {/* Menu Hamburger */}
              <button
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
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className={`text-2xl font-bold ${
                shouldBeTransparent ? 'text-white' : 'text-[#1A1A2E]'}`
                }>
                  voo<span className="text-[#FF6B35]">trip</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Category Icons */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {headerCategories.map((cat) => {
                const handleCatClick = () => {
                  if (cat.action === 'whatsapp' && cat.whatsappMsg) {
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(cat.whatsappMsg)}`, '_blank');
                  } else if (cat.action === 'external' && cat.href) {
                    window.open(cat.href, '_blank');
                  }
                };

                const content =
                <div className={`flex flex-col items-center gap-1.5 px-3 xl:px-4 py-2.5 rounded-2xl cursor-pointer transition-all border group ${
                cat.highlight 
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 shadow-md shadow-purple-200/50' 
                  : 'bg-white border-[#E2E8F0] hover:border-[#FF6B35] hover:shadow-md'}`
                }>
                    <div className={`${cat.color} ${cat.highlight ? 'scale-110' : ''} group-hover:scale-110 transition-transform`}>
                      {cat.icon}
                    </div>
                    <span className={`text-xs font-semibold ${
                  cat.highlight 
                    ? 'text-purple-700' 
                    : shouldBeTransparent 
                      ? 'text-[#1A1A2E]' 
                      : 'text-[#64748B] group-hover:text-[#1A1A2E]'}`}>
                      {cat.label}
                    </span>
                    {cat.highlight &&
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse ring-2 ring-white" />
                  }
                  </div>;

                if (cat.action === 'link' && cat.href) {
                  return (
                    <Link key={cat.id} to={cat.href} className="relative">
                      {content}
                    </Link>);
                }

                return (
                  <div key={cat.id} onClick={handleCatClick} className="relative">
                    {content}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button
              onClick={() => setTripModalOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              shouldBeTransparent ?
              'text-white border border-white/30 hover:bg-white/10' :
              'text-[#1A1A2E] border border-[#E2E8F0] hover:bg-[#F1F5F9]'}`
              }>
                <User className="w-5 h-5" />
                <span className="font-medium">Planejar</span>
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
