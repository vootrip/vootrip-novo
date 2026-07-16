import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Layout } from '@/components/Layout';
import { TransferCard } from '@/components/results/TransferCard';
import { ResultsHeader } from '@/components/results/ResultsHeader';
import { Bus, Loader2 } from 'lucide-react';

const mockTransfers = [
{
  id: '1',
  name: 'Transfer Privativo Sedan',
  image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80',
  type: 'Privativo',
  vehicle: 'Sedan Executivo',
  maxPassengers: 3,
  maxLuggage: 3,
  duration: '45 min',
  company: 'CVC Transfers',
  price: 189,
  originalPrice: 249,
  features: ['Água mineral', 'Wi-Fi', 'Ar-condicionado'],
  cancellation: 'Cancelamento grátis até 24h'
},
{
  id: '2',
  name: 'Transfer Compartilhado',
  image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80',
  type: 'Compartilhado',
  vehicle: 'Van',
  maxPassengers: 12,
  maxLuggage: 12,
  duration: '1h 30min',
  company: 'Shuttle Express',
  price: 49,
  originalPrice: null,
  features: ['Ar-condicionado'],
  cancellation: 'Cancelamento grátis até 48h'
},
{
  id: '3',
  name: 'Transfer Privativo SUV',
  image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80',
  type: 'Privativo',
  vehicle: 'SUV Premium',
  maxPassengers: 5,
  maxLuggage: 5,
  duration: '45 min',
  company: 'Premium Transfers',
  price: 299,
  originalPrice: 399,
  features: ['Água mineral', 'Wi-Fi', 'Ar-condicionado', 'TV'],
  cancellation: 'Cancelamento grátis até 24h'
},
{
  id: '4',
  name: 'Transfer Executivo',
  image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80',
  type: 'Privativo',
  vehicle: 'Mercedes Classe E',
  maxPassengers: 3,
  maxLuggage: 3,
  duration: '40 min',
  company: 'Luxe Transfers',
  price: 449,
  originalPrice: null,
  features: ['Água mineral', 'Wi-Fi', 'Ar-condicionado', 'Jornal', 'Snacks'],
  cancellation: 'Cancelamento grátis até 12h'
}];


export default function TransferResults() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price');
  const [isLoading] = useState(false);

  const origem = searchParams.get('origem') || 'Aeroporto GRU';
  const destino = searchParams.get('destino') || 'Hotel Centro';

  const sortedTransfers = [...mockTransfers].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <Layout>
      <div data-ev-id="ev_e1607c7885" className="pt-24 pb-16 bg-[#F1F5F9] min-h-screen">
        <div data-ev-id="ev_01ca532e04" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ResultsHeader
            icon={Bus}
            title={`${origem} → ${destino}`}
            subtitle="15 Jan, 14h · 2 passageiros"
            resultsCount={mockTransfers.length}
            sortBy={sortBy}
            onSortChange={setSortBy} />


          {/* Results */}
          <div data-ev-id="ev_33d346a786" className="max-w-4xl">
            {isLoading ?
            <div data-ev-id="ev_d58bdf5546" className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-4" />
                <p data-ev-id="ev_5d52131605" className="text-[#64748B]">Buscando os melhores traslados...</p>
              </div> :

            <div data-ev-id="ev_55bc246b9e" className="flex flex-col gap-4">
                {sortedTransfers.map((transfer) =>
              <TransferCard key={transfer.id} transfer={transfer} />
              )}
              </div>
            }
          </div>
        </div>
      </div>
    </Layout>);

}