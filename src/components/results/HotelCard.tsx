import { Star, MapPin, Wifi, Waves, Dumbbell, Coffee, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  stars: number;
  location: string;
  amenities: string[];
  price: number;
  originalPrice: number | null;
  perNight: boolean;
}

const amenityIcons: Record<string, typeof Wifi> = {
  'Wi-Fi': Wifi,
  'Piscina': Waves,
  'Academia': Dumbbell,
  'Café da manhã': Coffee
};

export function HotelCard({ hotel }: {hotel: Hotel;}) {
  const discount = hotel.originalPrice ?
  Math.round((1 - hotel.price / hotel.originalPrice) * 100) :
  null;

  return (
    <div data-ev-id="ev_ead3f20ca7" className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#FF6B35]/20 transition-all duration-300">
      <div data-ev-id="ev_5efcbe354f" className="flex flex-col md:flex-row">
        {/* Image */}
        <div data-ev-id="ev_e01b38432c" className="md:w-72 h-48 md:h-auto relative overflow-hidden">
          <img data-ev-id="ev_a32b224ca0"
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover" />

          {discount &&
          <div data-ev-id="ev_f304f6ab64" className="absolute top-3 left-3">
              <Badge variant="success">{discount}% OFF</Badge>
            </div>
          }
        </div>

        {/* Content */}
        <div data-ev-id="ev_295a120fb9" className="flex-1 p-4 lg:p-6 flex flex-col">
          <div data-ev-id="ev_6cdc6ed60f" className="flex-1">
            {/* Stars */}
            <div data-ev-id="ev_00f2f9175e" className="flex items-center gap-1 mb-2">
              {Array.from({ length: hotel.stars }).map((_, i) =>
              <Star key={i} className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />
              )}
            </div>

            {/* Name & Location */}
            <h3 data-ev-id="ev_8ed3bf1715" className="text-xl font-bold text-[#1A1A2E] mb-1">{hotel.name}</h3>
            <div data-ev-id="ev_9c5ecdecbb" className="flex items-center gap-1 text-[#64748B] text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span data-ev-id="ev_a43d75cdf6">{hotel.location}</span>
            </div>

            {/* Rating */}
            <div data-ev-id="ev_1d157199cd" className="flex items-center gap-2 mb-4">
              <div data-ev-id="ev_a888da33ef" className="bg-[#06D6A0] text-white text-sm font-bold px-2 py-1 rounded">
                {hotel.rating}
              </div>
              <span data-ev-id="ev_6679fe3c00" className="text-sm text-[#64748B]">
                Excelente · {hotel.reviews.toLocaleString()} avaliações
              </span>
            </div>

            {/* Amenities */}
            <div data-ev-id="ev_c2250c8ce1" className="flex flex-wrap items-center gap-3">
              {hotel.amenities.slice(0, 4).map((amenity) => {
                const Icon = amenityIcons[amenity];
                return (
                  <div data-ev-id="ev_a2efe50d35" key={amenity} className="flex items-center gap-1 text-xs text-[#64748B]">
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span data-ev-id="ev_d5ebb28c29">{amenity}</span>
                  </div>);

              })}
              {hotel.amenities.length > 4 &&
              <span data-ev-id="ev_e8731a9d12" className="text-xs text-[#FF6B35]">
                  +{hotel.amenities.length - 4} mais
                </span>
              }
            </div>
          </div>

          {/* Price */}
          <div data-ev-id="ev_0530f5e5a4" className="flex items-end justify-between mt-4 pt-4 border-t border-[#E2E8F0]">
            <div data-ev-id="ev_571de379c1">
              {hotel.originalPrice &&
              <span data-ev-id="ev_69da3971c2" className="text-sm text-[#94A3B8] line-through">
                  R$ {hotel.originalPrice}
                </span>
              }
              <p data-ev-id="ev_b4b498638e" className="text-2xl font-bold text-[#FF6B35]">
                R$ {hotel.price}
                <span data-ev-id="ev_546d24de6d" className="text-sm font-normal text-[#64748B]">/noite</span>
              </p>
            </div>
            <Button size="sm">
              Ver quartos
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>);

}