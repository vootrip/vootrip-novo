import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Layout } from '@/components/Layout';
import { CarCard } from '@/components/results/CarCard';
import { ResultsFilter } from '@/components/results/ResultsFilter';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { Car, Loader2 } from 'lucide-react';

const mockCars = [
{
  id: '1',
  name: 'Fiat Mobi',
  image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80',
  category: 'Econômico',
  seats: 4,
  doors: 4,
  transmission: 'Manual',
  airConditioning: true,
  luggage: 1,
  company: 'Localiza',
  companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Localiza_logo.svg/200px-Localiza_logo.svg.png',
  price: 89,
  originalPrice: 129,
  perDay: true,
  features: ['Km ilimitado', 'Proteção básica']
},
{
  id: '2',
  name: 'Chevrolet Onix',
  image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80',
  category: 'Compacto',
  seats: 5,
  doors: 4,
  transmission: 'Automático',
  airConditioning: true,
  luggage: 2,
  company: 'Movida',
  companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Movida_logo.svg/200px-Movida_logo.svg.png',
  price: 129,
  originalPrice: null,
  perDay: true,
  features: ['Km ilimitado', 'Proteção total', 'Cadeirinha']
},
{
  id: '3',
  name: 'Jeep Renegade',
  image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80',
  category: 'SUV',
  seats: 5,
  doors: 4,
  transmission: 'Automático',
  airConditioning: true,
  luggage: 3,
  company: 'Unidas',
  companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Unidas_logo.svg/200px-Unidas_logo.svg.png',
  price: 199,
  originalPrice: 279,
  perDay: true,
  features: ['Km ilimitado', 'Proteção total', 'GPS']
},
{
  id: '4',
  name: 'Toyota Corolla',
  image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80',
  category: 'Intermediário',
  seats: 5,
  doors: 4,
  transmission: 'Automático',
  airConditioning: true,
  luggage: 3,
  company: 'Localiza',
  companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Localiza_logo.svg/200px-Localiza_logo.svg.png',
  price: 179,
  originalPrice: null,
  perDay: true,
  features: ['Km ilimitado', 'Proteção total']
}];


export default function CarResults() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price');
  const [isLoading] = useState(false);

  const retirada = searchParams.get('retirada') || 'Aeroporto GRU';

  const sortedCars = [...mockCars].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <Layout>
      <div data-ev-id="ev_aa5ffd195b" className="pt-24 pb-16 bg-[#F1F5F9] min-h-screen">
        <div data-ev-id="ev_090b77ff17" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ResultsHeader
            icon={Car}
            title={`Carros em ${retirada}`}
            subtitle="15 Jan, 10h - 22 Jan, 10h · 7 dias"
            resultsCount={mockCars.length}
            sortBy={sortBy}
            onSortChange={setSortBy} />


          <div data-ev-id="ev_401f8c05cd" className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <aside data-ev-id="ev_94d4d1c24b" className="lg:w-72 flex-shrink-0">
              <ResultsFilter type="car" />
            </aside>

            {/* Results */}
            <div data-ev-id="ev_a4ef520b0b" className="flex-1">
              {isLoading ?
              <div data-ev-id="ev_e5e22a2993" className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-4" />
                  <p data-ev-id="ev_a6ad53cc92" className="text-[#64748B]">Buscando os melhores carros...</p>
                </div> :

              <div data-ev-id="ev_be2d9fcbfc" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sortedCars.map((car) =>
                <CarCard key={car.id} car={car} />
                )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>);

}