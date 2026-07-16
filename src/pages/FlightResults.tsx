import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Layout } from '@/components/Layout';
import { FlightCard } from '@/components/results/FlightCard';
import { ResultsFilter } from '@/components/results/ResultsFilter';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { Plane, Loader2 } from 'lucide-react';

const mockFlights = [
{
  id: '1',
  airline: 'LATAM',
  airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/LATAM_Airlines_logo.svg/200px-LATAM_Airlines_logo.svg.png',
  departure: '06:30',
  arrival: '09:45',
  duration: '3h 15min',
  stops: 0,
  origin: 'GRU',
  destination: 'GIG',
  price: 299,
  originalPrice: 459,
  class: 'Econômica',
  baggage: '1 mala de 23kg'
},
{
  id: '2',
  airline: 'GOL',
  airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gol-novo-logo.svg/200px-Gol-novo-logo.svg.png',
  departure: '08:00',
  arrival: '11:30',
  duration: '3h 30min',
  stops: 0,
  origin: 'GRU',
  destination: 'GIG',
  price: 279,
  originalPrice: null,
  class: 'Econômica',
  baggage: 'Apenas bagagem de mão'
},
{
  id: '3',
  airline: 'Azul',
  airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Azul_Brazilian_Airlines_logo.svg/200px-Azul_Brazilian_Airlines_logo.svg.png',
  departure: '10:15',
  arrival: '15:00',
  duration: '4h 45min',
  stops: 1,
  stopCity: 'Belo Horizonte',
  origin: 'GRU',
  destination: 'GIG',
  price: 199,
  originalPrice: 349,
  class: 'Econômica',
  baggage: '1 mala de 23kg'
},
{
  id: '4',
  airline: 'LATAM',
  airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/LATAM_Airlines_logo.svg/200px-LATAM_Airlines_logo.svg.png',
  departure: '14:00',
  arrival: '17:15',
  duration: '3h 15min',
  stops: 0,
  origin: 'GRU',
  destination: 'GIG',
  price: 349,
  originalPrice: null,
  class: 'Econômica Plus',
  baggage: '2 malas de 23kg'
},
{
  id: '5',
  airline: 'GOL',
  airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gol-novo-logo.svg/200px-Gol-novo-logo.svg.png',
  departure: '19:30',
  arrival: '22:45',
  duration: '3h 15min',
  stops: 0,
  origin: 'GRU',
  destination: 'GIG',
  price: 319,
  originalPrice: 459,
  class: 'Econômica',
  baggage: '1 mala de 23kg'
}];


export default function FlightResults() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price');
  const [isLoading] = useState(false);

  const origem = searchParams.get('origem') || 'São Paulo';
  const destino = searchParams.get('destino') || 'Rio de Janeiro';

  const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  return (
    <Layout>
      <div data-ev-id="ev_e03818aa76" className="pt-24 pb-16 bg-[#F1F5F9] min-h-screen">
        <div data-ev-id="ev_40251d1ac9" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ResultsHeader
            icon={Plane}
            title={`${origem} → ${destino}`}
            subtitle="Ida e volta · 1 passageiro · Econômica"
            resultsCount={mockFlights.length}
            sortBy={sortBy}
            onSortChange={setSortBy} />


          <div data-ev-id="ev_ebc4e3df2d" className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <aside data-ev-id="ev_5f66797587" className="lg:w-72 flex-shrink-0">
              <ResultsFilter type="flight" />
            </aside>

            {/* Results */}
            <div data-ev-id="ev_ba9f3cc49a" className="flex-1">
              {isLoading ?
              <div data-ev-id="ev_9cab14ae48" className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-4" />
                  <p data-ev-id="ev_c50c40e671" className="text-[#64748B]">Buscando os melhores voos...</p>
                </div> :

              <div data-ev-id="ev_a762bb2d9c" className="flex flex-col gap-4">
                  {sortedFlights.map((flight) =>
                <FlightCard key={flight.id} flight={flight} />
                )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>);

}