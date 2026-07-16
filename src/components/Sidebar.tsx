import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  X,
  Plane,
  Building2,
  Car,
  Bus,
  Compass,
  Heart,
  Globe,
  DollarSign,
  Menu,
  Sparkles,
  MapPin,
  Smartphone } from
'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTripModal: () => void;
}

const menuItems = [
{ icon: Plane, label: 'Passagens Aéreas', path: '/?tab=voos', color: '#FF6B35' },
{ icon: Building2, label: 'Hospedagens', path: '/?tab=hoteis', color: '#00B4D8' },
{ icon: Car, label: 'Carros', path: '/?tab=carros', color: '#06D6A0' },
{ icon: Bus, label: 'Traslados', path: '/?tab=traslados', color: '#9B5DE5' },
{ icon: Compass, label: 'Atividades', path: '/?tab=atividades', color: '#FFD166' },
{ icon: Sparkles, label: 'Planejar Viagem', path: '#planejar', special: true, color: '#FF6B35' }];


const exploreItems = [
{ icon: Compass, label: 'Explore Destinos', path: '/destinos', color: '#00B4D8' },
{ icon: MapPin, label: 'Ofertas', path: '/ofertas', color: '#FF6B35' },
{ icon: Smartphone, label: 'Chip Internacional', path: 'https://www.v7fhugd.com/32HKQB8/2CTPL/?__efq=1XzZiNTLF3AaKFjnpcw4rAz8f9NlCv33usbCXc6VqFM', color: '#22C55E', external: true }];



export function Sidebar({ isOpen, onClose, onOpenTripModal }: SidebarProps) {
  const location = useLocation();
  const [currency] = useState('BRL');
  const [language] = useState('Português');

  const handleItemClick = (path: string, special?: boolean) => {
    if (special) {
      onClose();
      onOpenTripModal();
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div data-ev-id="ev_0d685fa89a"
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
      }
      onClick={onClose} />


      {/* Sidebar */}
      <aside data-ev-id="ev_06752a722b" className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#1A1A2E] to-[#2D2D44] z-50 transform transition-transform duration-300 ease-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'}`
      }>
        {/* Header */}
        <div data-ev-id="ev_6221875e1d" className="flex items-center justify-between p-4 border-b border-white/10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <div data-ev-id="ev_d5b25fdb74" className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span data-ev-id="ev_45fcc75fe0" className="text-2xl font-bold text-white">
              voo<span data-ev-id="ev_35e920698c" className="text-[#FF6B35]">trip</span>
            </span>
          </Link>
          <button data-ev-id="ev_aa39051566"
          onClick={onClose}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">

            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav data-ev-id="ev_e9691b2453" className="p-4">
          <ul data-ev-id="ev_9ec0f4df97" className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isSpecial = item.special;

              if (isSpecial) {
                return (
                  <li data-ev-id="ev_d4d00659ba" key={item.label}>
                    <button data-ev-id="ev_f2bd513c4b"
                    onClick={() => handleItemClick(item.path, true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-medium mt-2">

                      <Icon className="w-5 h-5" />
                      <span data-ev-id="ev_d485cb2fc7">{item.label}</span>
                    </button>
                  </li>);

              }

              return (
                <li data-ev-id="ev_582d04cf68" key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => handleItemClick(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive ?
                    'bg-white/10 text-white' :
                    'text-white/70 hover:bg-white/10 hover:text-white'}`
                    }>

                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                    <span data-ev-id="ev_f107e5fc6c" className="font-medium">{item.label}</span>
                  </Link>
                </li>);

            })}
          </ul>

          {/* Divider */}
          <div data-ev-id="ev_3f8b4ac268" className="h-px bg-white/10 my-4" />

          {/* Explore Section */}
          <ul data-ev-id="ev_44a30734a1" className="flex flex-col gap-1">
            {exploreItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isExternal = 'external' in item && item.external;

              if (isExternal) {
                return (
                  <li data-ev-id="ev_054b6ee368" key={item.label}>
                    <a data-ev-id="ev_f8a8006e43"
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-white/70 hover:bg-white/10 hover:text-white">

                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                      <span data-ev-id="ev_c9fb66a797" className="font-medium">{item.label}</span>
                    </a>
                  </li>);

              }

              return (
                <li data-ev-id="ev_4a5649a6fa" key={item.label}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive ?
                    'bg-white/10 text-white' :
                    'text-white/70 hover:bg-white/10 hover:text-white'}`
                    }>

                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                    <span data-ev-id="ev_c25ffe56f5" className="font-medium">{item.label}</span>
                  </Link>
                </li>);

            })}
          </ul>

          {/* Divider */}
          <div data-ev-id="ev_1696eba24b" className="h-px bg-white/10 my-4" />

          {/* Settings */}
          <ul data-ev-id="ev_3128797bb8" className="flex flex-col gap-1">
            <li data-ev-id="ev_3a17bb29fc">
              <button data-ev-id="ev_e281e4735d" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200">
                <Globe className="w-5 h-5" style={{ color: '#00B4D8' }} />
                <span data-ev-id="ev_726a16f371" className="font-medium">{language}</span>
              </button>
            </li>
            <li data-ev-id="ev_ea7a0736d2">
              <button data-ev-id="ev_15ffe38cbe" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200">
                <DollarSign className="w-5 h-5" style={{ color: '#06D6A0' }} />
                <span data-ev-id="ev_2ac174281a" className="font-medium">R$ Real</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div data-ev-id="ev_9d4d0ee15e" className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <p data-ev-id="ev_393a13749a" className="text-white/40 text-xs text-center">
            © 2024 Vootrip. Todos os direitos reservados.
          </p>
        </div>
      </aside>
    </>);

}

// Botão para abrir o Sidebar (pode ser usado em qualquer lugar)
export function SidebarTrigger({ onClick }: {onClick: () => void;}) {
  return (
    <button data-ev-id="ev_48cadf1429"
    onClick={onClick}
    className="p-2 rounded-lg hover:bg-white/10 transition-colors">

      <Menu className="w-6 h-6" />
    </button>);

}