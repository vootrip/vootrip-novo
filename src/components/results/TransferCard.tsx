import { Users, Briefcase, Clock, Check, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Transfer {
  id: string;
  name: string;
  image: string;
  type: string;
  vehicle: string;
  maxPassengers: number;
  maxLuggage: number;
  duration: string;
  company: string;
  price: number;
  originalPrice: number | null;
  features: string[];
  cancellation: string;
}

export function TransferCard({ transfer }: {transfer: Transfer;}) {
  const discount = transfer.originalPrice ?
  Math.round((1 - transfer.price / transfer.originalPrice) * 100) :
  null;

  return (
    <div data-ev-id="ev_0cea7b7d5f" className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#FF6B35]/20 transition-all duration-300">
      <div data-ev-id="ev_ef81cc4860" className="flex flex-col md:flex-row">
        {/* Image */}
        <div data-ev-id="ev_57f6fac9b0" className="md:w-56 h-44 md:h-auto relative overflow-hidden">
          <img data-ev-id="ev_65caaf836a"
          src={transfer.image}
          alt={transfer.name}
          className="w-full h-full object-cover" />

          <div data-ev-id="ev_71b497c15c" className="absolute top-3 left-3">
            <Badge variant={transfer.type === 'Privativo' ? 'info' : 'default'}>
              {transfer.type}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div data-ev-id="ev_7fa5ad6675" className="flex-1 p-4 lg:p-6">
          <div data-ev-id="ev_2cc3983a29" className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div data-ev-id="ev_05ad00ba3b" className="flex-1">
              <h3 data-ev-id="ev_dc81b27439" className="text-lg font-bold text-[#1A1A2E] mb-1">{transfer.name}</h3>
              <p data-ev-id="ev_814c727e87" className="text-sm text-[#64748B] mb-3">{transfer.vehicle} · {transfer.company}</p>

              {/* Specs */}
              <div data-ev-id="ev_3e2f48f1dc" className="flex flex-wrap items-center gap-4 mb-4">
                <div data-ev-id="ev_1ec5bf396a" className="flex items-center gap-1 text-sm text-[#64748B]">
                  <Users className="w-4 h-4" />
                  <span data-ev-id="ev_fa815bae33">Até {transfer.maxPassengers}</span>
                </div>
                <div data-ev-id="ev_78ba61b36a" className="flex items-center gap-1 text-sm text-[#64748B]">
                  <Briefcase className="w-4 h-4" />
                  <span data-ev-id="ev_8fe737e2e0">Até {transfer.maxLuggage} malas</span>
                </div>
                <div data-ev-id="ev_364a5d144b" className="flex items-center gap-1 text-sm text-[#64748B]">
                  <Clock className="w-4 h-4" />
                  <span data-ev-id="ev_230290f3b4">{transfer.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div data-ev-id="ev_63ecd3501a" className="flex flex-wrap gap-2 mb-3">
                {transfer.features.map((feature) =>
                <div data-ev-id="ev_1ef4ff265b" key={feature} className="flex items-center gap-1 text-xs text-[#06D6A0]">
                    <Check className="w-3 h-3" />
                    <span data-ev-id="ev_c737adbb54">{feature}</span>
                  </div>
                )}
              </div>

              {/* Cancellation */}
              <div data-ev-id="ev_20816650c5" className="flex items-center gap-1 text-xs text-[#00B4D8]">
                <Shield className="w-3 h-3" />
                <span data-ev-id="ev_6f25f1d3e1">{transfer.cancellation}</span>
              </div>
            </div>

            {/* Price */}
            <div data-ev-id="ev_5d5435973a" className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
              <div data-ev-id="ev_f3f72b915e" className="text-right">
                {discount &&
                <div data-ev-id="ev_dcfacd67cf" className="flex items-center gap-2 justify-end mb-1">
                    <span data-ev-id="ev_d5adc72baf" className="text-sm text-[#94A3B8] line-through">
                      R$ {transfer.originalPrice}
                    </span>
                    <Badge variant="success">{discount}% OFF</Badge>
                  </div>
                }
                <p data-ev-id="ev_1e50b9ba1b" className="text-2xl font-bold text-[#FF6B35]">
                  R$ {transfer.price}
                </p>
                <p data-ev-id="ev_1a86e04f44" className="text-xs text-[#64748B]">preço total</p>
              </div>
              <Button size="sm" className="mt-3">
                Reservar
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}