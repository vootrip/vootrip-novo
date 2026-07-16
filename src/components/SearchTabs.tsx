import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Plane, Building2, Car, Bus, Ticket } from 'lucide-react';
import { FlightSearch } from '@/components/search/FlightSearch';
import { HotelSearch } from '@/components/search/HotelSearch';
import { CarSearch } from '@/components/search/CarSearch';
import { TransferSearch } from '@/components/search/TransferSearch';
import { ActivitiesSearch } from '@/components/search/ActivitiesSearch';

type TabType = 'flights' | 'hotels' | 'cars' | 'transfers' | 'activities';

const tabs = [
  { id: 'flights' as TabType, label: 'Voos', icon: Plane, urlParam: 'voos' },
  { id: 'hotels' as TabType, label: 'Hotéis', icon: Building2, urlParam: 'hoteis' },
  { id: 'cars' as TabType, label: 'Carros', icon: Car, urlParam: 'carros' },
  { id: 'transfers' as TabType, label: 'Traslados', icon: Bus, urlParam: 'traslados' },
  { id: 'activities' as TabType, label: 'Atividades', icon: Ticket, urlParam: 'atividades' },
];

const urlParamToTab: Record<string, TabType> = {
  'voos': 'flights',
  'hoteis': 'hotels',
  'carros': 'cars',
  'traslados': 'transfers',
  'atividades': 'activities',
};

export function SearchTabs() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam && urlParamToTab[tabParam] ? urlParamToTab[tabParam] : 'flights';
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  useEffect(() => {
    if (tabParam && urlParamToTab[tabParam]) {
      setActiveTab(urlParamToTab[tabParam]);
    }
  }, [tabParam]);

  return (
    <div data-ev-id="ev_796458c72f" className="w-full">
      {/* Tabs */}
      <div data-ev-id="ev_f83a68698a" className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button data-ev-id="ev_1a0a4451c8"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
                flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-200
                ${isActive ?
            'bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white shadow-lg shadow-[#FF6B35]/25' :
            'bg-white/80 text-[#64748B] hover:bg-white hover:text-[#1A1A2E]'}
              `
            }>

              <Icon className="w-5 h-5" />
              <span data-ev-id="ev_f8c37d528a">{tab.label}</span>
            </button>);

        })}
      </div>

      {/* Search Forms */}
      <div data-ev-id="ev_acc37b1056" className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        {activeTab === 'flights' && <FlightSearch />}
        {activeTab === 'hotels' && <HotelSearch />}
        {activeTab === 'cars' && <CarSearch />}
        {activeTab === 'transfers' && <TransferSearch />}
        {activeTab === 'activities' && <ActivitiesSearch />}
      </div>
    </div>);

}