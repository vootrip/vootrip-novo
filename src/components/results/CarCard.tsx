import { Users, DoorOpen, Cog, Snowflake, Briefcase, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Car {
  id: string;
  name: string;
  image: string;
  category: string;
  seats: number;
  doors: number;
  transmission: string;
  airConditioning: boolean;
  luggage: number;
  company: string;
  companyLogo: string;
  price: number;
  originalPrice: number | null;
  perDay: boolean;
  features: string[];
}

export function CarCard({ car }: {car: Car;}) {
  const discount = car.originalPrice ?
  Math.round((1 - car.price / car.originalPrice) * 100) :
  null;

  return (
    <div data-ev-id="ev_95bbd78d90" className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#FF6B35]/20 transition-all duration-300">
      {/* Image */}
      <div data-ev-id="ev_08a49c03a5" className="relative h-44 bg-[#F1F5F9]">
        <img data-ev-id="ev_a4adfc7cc8"
        src={car.image}
        alt={car.name}
        className="w-full h-full object-cover" />

        <div data-ev-id="ev_c125b0db1c" className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="info">{car.category}</Badge>
          {discount && <Badge variant="success">{discount}% OFF</Badge>}
        </div>
        <div data-ev-id="ev_3855519e6d" className="absolute bottom-3 right-3">
          <img data-ev-id="ev_2e03edc477"
          src={car.companyLogo}
          alt={car.company}
          className="h-6 w-auto bg-white rounded px-2 py-1" />

        </div>
      </div>

      {/* Content */}
      <div data-ev-id="ev_c76df88243" className="p-4">
        <h3 data-ev-id="ev_75febd89df" className="text-lg font-bold text-[#1A1A2E] mb-1">{car.name}</h3>
        <p data-ev-id="ev_c480fa52d2" className="text-sm text-[#64748B] mb-3">ou similar</p>

        {/* Specs */}
        <div data-ev-id="ev_b3ba26d783" className="flex flex-wrap items-center gap-3 mb-4">
          <div data-ev-id="ev_4a1a578cd1" className="flex items-center gap-1 text-xs text-[#64748B]">
            <Users className="w-3.5 h-3.5" />
            <span data-ev-id="ev_00a0d934d1">{car.seats}</span>
          </div>
          <div data-ev-id="ev_f5b45d9958" className="flex items-center gap-1 text-xs text-[#64748B]">
            <DoorOpen className="w-3.5 h-3.5" />
            <span data-ev-id="ev_3fe5f2f8f7">{car.doors} portas</span>
          </div>
          <div data-ev-id="ev_cd8a6ac414" className="flex items-center gap-1 text-xs text-[#64748B]">
            <Cog className="w-3.5 h-3.5" />
            <span data-ev-id="ev_7229e0d9a6">{car.transmission}</span>
          </div>
          {car.airConditioning &&
          <div data-ev-id="ev_9bea1840ef" className="flex items-center gap-1 text-xs text-[#64748B]">
              <Snowflake className="w-3.5 h-3.5" />
              <span data-ev-id="ev_721d2718f0">A/C</span>
            </div>
          }
          <div data-ev-id="ev_8c548fbdcd" className="flex items-center gap-1 text-xs text-[#64748B]">
            <Briefcase className="w-3.5 h-3.5" />
            <span data-ev-id="ev_3a1d94a2cc">{car.luggage} {car.luggage === 1 ? 'mala' : 'malas'}</span>
          </div>
        </div>

        {/* Features */}
        <div data-ev-id="ev_790ec8a09a" className="flex flex-wrap gap-2 mb-4">
          {car.features.map((feature) =>
          <div data-ev-id="ev_ac80b6bbf5" key={feature} className="flex items-center gap-1 text-xs text-[#06D6A0]">
              <Check className="w-3 h-3" />
              <span data-ev-id="ev_8066f89d36">{feature}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div data-ev-id="ev_8859757554" className="flex items-end justify-between pt-4 border-t border-[#E2E8F0]">
          <div data-ev-id="ev_63db1baf46">
            {car.originalPrice &&
            <span data-ev-id="ev_3bcbd15bbb" className="text-sm text-[#94A3B8] line-through">
                R$ {car.originalPrice}
              </span>
            }
            <p data-ev-id="ev_ab328be091" className="text-2xl font-bold text-[#FF6B35]">
              R$ {car.price}
              <span data-ev-id="ev_6f1773407d" className="text-sm font-normal text-[#64748B]">/dia</span>
            </p>
          </div>
          <Button size="sm">
            Reservar
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>);

}