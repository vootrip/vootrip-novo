import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  X,
  Plane,
  Compass,
  Heart,
  Globe,
  DollarSign,
  Menu,
  Sparkles,
  MapPin,
  Smartphone,
  Castle } from
'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTripModal: () => void;
}

const menuItems = [
{ icon: Sparkles, label: 'Planejar Viagem', path: '#planejar', special: true, color: '#FF6B35' }];


const exploreItems = [
{ icon: Castle, label: 'Disney', path: '/disney', color: '#FF6B35' },
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
      <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
      }
      onClick={onClose} />


      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#1A1A2E] to-[#2D2D44] z-50 transform transition-transform duration-300 ease-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'}`
      }>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 bg-white rounded-xl px-2 py-1.5">
            <img src="/Logo_Vootrip.jpg" alt="Vootrip - Ingressos para os parques da Disney" className="h-10 w-auto rounded-lg" />
          </Link>
          <button
          onClick={onClose}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">

            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isSpecial = item.special;

              if (isSpecial) {
                return (
                  <li key={item.label}>
                    <button
                    onClick={() => handleItemClick(item.path, true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-medium mt-2">

                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>);

              }

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => handleItemClick(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive ?
                    'bg-white/10 text-white' :
                    'text-white/70 hover:bg-white/10 hover:text-white'}`
                    }>

                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>);

            })}
          </ul>

          {/* Divider */}
          <div className="h-px bg-white/10 my-4" />

          {/* Explore Section */}
          <ul className="flex flex-col gap-1">
            {exploreItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isExternal = 'external' in item && item.external;

              if (isExternal) {
                return (
                  <li key={item.label}>
                    <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-white/70 hover:bg-white/10 hover:text-white">

                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </li>);

              }

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive ?
                    'bg-white/10 text-white' :
                    'text-white/70 hover:bg-white/10 hover:text-white'}`
                    }>

                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>);

            })}
          </ul>

          {/* Divider */}
          <div className="h-px bg-white/10 my-4" />

          {/* Settings */}
          <ul className="flex flex-col gap-1">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200">
                <Globe className="w-5 h-5" style={{ color: '#00B4D8' }} />
                <span className="font-medium">{language}</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200">
                <DollarSign className="w-5 h-5" style={{ color: '#06D6A0' }} />
                <span className="font-medium">R$ Real</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <p className="text-white/40 text-xs text-center">
            © 2024 Vootrip. Todos os direitos reservados.
          </p>
        </div>
      </aside>
    </>);

}

// Botão para abrir o Sidebar (pode ser usado em qualquer lugar)
export function SidebarTrigger({ onClick }: {onClick: () => void;}) {
  return (
    <button
    onClick={onClick}
    className="p-2 rounded-lg hover:bg-white/10 transition-colors">

      <Menu className="w-6 h-6" />
    </button>);

}
