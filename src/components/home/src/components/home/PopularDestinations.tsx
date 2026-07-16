import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const destinations = [
{
  id: 1,
  name: 'Rio de Janeiro',
  country: 'Brasil',
  image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80',
  price: 'A partir de R$ 299'
},
{
  id: 2,
  name: 'Lisboa',
  country: 'Portugal',
  image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&q=80',
  price: 'A partir de R$ 2.899'
},
{
  id: 3,
  name: 'Cancún',
  country: 'México',
  image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&q=80',
  price: 'A partir de R$ 1.999'
},
{
  id: 4,
  name: 'Buenos Aires',
  country: 'Argentina',
  image: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=600&q=80',
  price: 'A partir de R$ 599'
},
{
  id: 5,
  name: 'Paris',
  country: 'França',
  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  price: 'A partir de R$ 3.299'
},
{
  id: 6,
  name: 'Miami',
  country: 'EUA',
  image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80',
  price: 'A partir de R$ 2.199'
}];


export function PopularDestinations() {
  return (
    <section data-ev-id="ev_703c30306f" id="destinos" className="py-16 lg:py-24 bg-[#FAFBFC]">
      <div data-ev-id="ev_a12f8dd6e9" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-ev-id="ev_3e728464d1" className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div data-ev-id="ev_6d8b472f3a">
            <h2 data-ev-id="ev_1ed0e1956d" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-2">
              Destinos Populares
            </h2>
            <p data-ev-id="ev_741c472176" className="text-[#64748B] text-lg">
              Os lugares mais buscados pelos viajantes
            </p>
          </div>
          <Link
            to="/#destinos"
            className="flex items-center gap-2 text-[#FF6B35] font-semibold hover:gap-3 transition-all">

            Ver todos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div data-ev-id="ev_369043ee96" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) =>
          <Link
            key={dest.id}
            to={`/voos/resultados?destino=${encodeURIComponent(dest.name)}`}
            className="group relative h-72 rounded-2xl overflow-hidden">

              <img data-ev-id="ev_764e689107"
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              <div data-ev-id="ev_53c4488041" className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />
              <div data-ev-id="ev_1622db204a" className="absolute bottom-0 left-0 right-0 p-6">
                <div data-ev-id="ev_9011468d5e" className="flex items-end justify-between">
                  <div data-ev-id="ev_084e8dafee">
                    <h3 data-ev-id="ev_bd33ba68d8" className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                    <p data-ev-id="ev_dfd3f31b2c" className="text-white/70 text-sm">{dest.country}</p>
                  </div>
                  <div data-ev-id="ev_03f43eec55" className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] px-3 py-1.5 rounded-full">
                    <span data-ev-id="ev_6aa84a5410" className="text-white text-sm font-semibold">{dest.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}