import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Layout } from '@/components/Layout';
import { HotelCard } from '@/components/results/HotelCard';
import { ResultsFilter } from '@/components/results/ResultsFilter';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { Building2, Loader2 } from 'lucide-react';

const mockHotels = [
{
  id: '1',
  name: 'Grand Hyatt Rio de Janeiro',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  rating: 4.8,
  reviews: 2341,
  stars: 5,
  location: 'Barra da Tijuca',
  amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Academia', 'Restaurante'],
  price: 890,
  originalPrice: 1290,
  perNight: true
},
{
  id: '2',
  name: 'Copacabana Palace',
  image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
  rating: 4.9,
  reviews: 4521,
  stars: 5,
  location: 'Copacabana',
  amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Academia', 'Praia'],
  price: 1590,
  originalPrice: null,
  perNight: true
},
{
  id: '3',
  name: 'Ibis Styles Centro',
  image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
  rating: 4.2,
  reviews: 1823,
  stars: 3,
  location: 'Centro',
  amenities: ['Wi-Fi', 'Café da manhã', 'Ar-condicionado'],
  price: 289,
  originalPrice: 399,
  perNight: true
},
{
  id: '4',
  name: 'Windsor Atlântica',
  image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
  rating: 4.5,
  reviews: 3102,
  stars: 4,
  location: 'Copacabana',
  amenities: ['Wi-Fi', 'Piscina', 'Vista mar', 'Restaurante'],
  price: 650,
  originalPrice: 850,
  perNight: true
},
{
  id: '5',
  name: 'Hilton Barra',
  image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  rating: 4.6,
  reviews: 2876,
  stars: 5,
  location: 'Barra da Tijuca',
  amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Academia', 'Estacionamento'],
  price: 720,
  originalPrice: null,
  perNight: true
}];


export default function HotelResults() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price');
  const [isLoading] = useState(false);

  const destino = searchParams.get('destino') || 'Rio de Janeiro';

  const sortedHotels = [...mockHotels].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <Layout>
      <div data-ev-id="ev_722410eb49" className="pt-24 pb-16 bg-[#F1F5F9] min-h-screen">
        <div data-ev-id="ev_46e544c4fb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ResultsHeader
            icon={Building2}
            title={`Hotéis em ${destino}`}
            subtitle="15-20 Jan · 1 quarto · 2 hóspedes"
            resultsCount={mockHotels.length}
            sortBy={sortBy}
            onSortChange={setSortBy} />


          <div data-ev-id="ev_9f6302ceb2" className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <aside data-ev-id="ev_8fd75be141" className="lg:w-72 flex-shrink-0">
              <ResultsFilter type="hotel" />
            </aside>

            {/* Results */}
            <div data-ev-id="ev_37681d2c46" className="flex-1">
              {isLoading ?
              <div data-ev-id="ev_7301591386" className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-4" />
                  <p data-ev-id="ev_8fadd8eae0" className="text-[#64748B]">Buscando os melhores hotéis...</p>
                </div> :

              <div data-ev-id="ev_e7a65c1a83" className="flex flex-col gap-4">
                  {sortedHotels.map((hotel) =>
                <HotelCard key={hotel.id} hotel={hotel} />
                )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>);

}