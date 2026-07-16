import { Clock, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/Badge';

const deals = [
{
  id: 1,
  type: 'flight',
  title: 'São Paulo → Orlando',
  subtitle: 'Ida e volta com bagagem',
  originalPrice: 'R$ 4.890',
  price: 'R$ 2.990',
  discount: '39% OFF',
  image: 'https://images.unsplash.com/photo-1575089776834-8be34fb5b6ba?w=400&q=80',
  expiresIn: '2 dias',
  hot: true
},
{
  id: 2,
  type: 'hotel',
  title: 'Resort All-Inclusive em Punta Cana',
  subtitle: '5 noites para 2 pessoas',
  originalPrice: 'R$ 8.500',
  price: 'R$ 5.999',
  discount: '29% OFF',
  image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80',
  expiresIn: '5 dias',
  hot: false
},
{
  id: 3,
  type: 'car',
  title: 'SUV em Miami',
  subtitle: '7 dias com seguro total',
  originalPrice: 'R$ 1.890',
  price: 'R$ 1.190',
  discount: '37% OFF',
  image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80',
  expiresIn: '3 dias',
  hot: true
},
{
  id: 4,
  type: 'package',
  title: 'Pacote Completo Santiago',
  subtitle: 'Aéreo + Hotel 4 noites',
  originalPrice: 'R$ 3.200',
  price: 'R$ 2.299',
  discount: '28% OFF',
  image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80',
  expiresIn: '4 dias',
  hot: false
}];


export function Deals() {
  return (
    <section data-ev-id="ev_59aa6209a2" className="py-16 lg:py-24 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
      <div data-ev-id="ev_895160aee1" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-ev-id="ev_b41053ab99" className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div data-ev-id="ev_b95fad2186">
            <div data-ev-id="ev_4b53cacd3d" className="flex items-center gap-2 mb-3">
              <Flame className="w-6 h-6 text-[#FF6B35]" />
              <Badge variant="error">Ofertas Limitadas</Badge>
            </div>
            <h2 data-ev-id="ev_88321f71af" className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Promoções Imperdíveis
            </h2>
            <p data-ev-id="ev_b62b2e6130" className="text-white/60 text-lg">
              Ofertas exclusivas por tempo limitado
            </p>
          </div>
          <Link
            to="/ofertas"
            className="flex items-center gap-2 text-[#FF6B35] font-semibold hover:gap-3 transition-all">

            Ver todas as ofertas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Deals Grid */}
        <div data-ev-id="ev_4a16fcd238" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) =>
          <Link
            key={deal.id}
            to={`/ofertas/${deal.id}`}
            className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

              {/* Image */}
              <div data-ev-id="ev_e64dbc9f5c" className="relative h-40 overflow-hidden">
                <img data-ev-id="ev_f744f1ce76"
              src={deal.image}
              alt={deal.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div data-ev-id="ev_02b3187ac3" className="absolute top-3 left-3 flex items-center gap-2">
                  {deal.hot &&
                <span data-ev-id="ev_3a29394b9f" className="flex items-center gap-1 bg-[#EF476F] text-white text-xs font-bold px-2 py-1 rounded-full">
                      <Flame className="w-3 h-3" /> HOT
                    </span>
                }
                  <span data-ev-id="ev_ad5ec34640" className="bg-[#06D6A0] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {deal.discount}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div data-ev-id="ev_1653d062bd" className="p-4">
                <h3 data-ev-id="ev_04af3ceed7" className="font-semibold text-[#1A1A2E] mb-1 line-clamp-1">
                  {deal.title}
                </h3>
                <p data-ev-id="ev_f0cd7f41a1" className="text-sm text-[#64748B] mb-3">{deal.subtitle}</p>
                
                <div data-ev-id="ev_dead6cb55a" className="flex items-end justify-between">
                  <div data-ev-id="ev_e6bc37940b">
                    <span data-ev-id="ev_089a0d4746" className="text-sm text-[#94A3B8] line-through">
                      {deal.originalPrice}
                    </span>
                    <p data-ev-id="ev_d726ce4cb0" className="text-xl font-bold text-[#FF6B35]">{deal.price}</p>
                  </div>
                  <div data-ev-id="ev_50e5effc79" className="flex items-center gap-1 text-[#64748B] text-sm">
                    <Clock className="w-4 h-4" />
                    <span data-ev-id="ev_c8ece86b9f">{deal.expiresIn}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}