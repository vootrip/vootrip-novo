import { Clock, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  stopCity?: string;
  origin: string;
  destination: string;
  price: number;
  originalPrice: number | null;
  class: string;
  baggage: string;
}

export function FlightCard({ flight }: {flight: Flight;}) {
  const discount = flight.originalPrice ?
  Math.round((1 - flight.price / flight.originalPrice) * 100) :
  null;

  return (
    <div data-ev-id="ev_569a9f7a24" className="bg-white rounded-2xl border border-[#E2E8F0] p-4 lg:p-6 hover:shadow-lg hover:border-[#FF6B35]/20 transition-all duration-300">
      <div data-ev-id="ev_dce639931a" className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* Airline */}
        <div data-ev-id="ev_ea89e27be5" className="flex items-center gap-3 lg:w-32">
          <img data-ev-id="ev_a393686c6a"
          src={flight.airlineLogo}
          alt={flight.airline}
          className="h-8 w-auto object-contain" />

          <span data-ev-id="ev_9064d8a446" className="text-sm text-[#64748B] lg:hidden">{flight.airline}</span>
        </div>

        {/* Flight Info */}
        <div data-ev-id="ev_11c7eb2b10" className="flex-1">
          <div data-ev-id="ev_65a43d6284" className="flex items-center gap-4">
            {/* Departure */}
            <div data-ev-id="ev_cb6a6f1b93" className="text-center">
              <p data-ev-id="ev_ad088e61dc" className="text-2xl font-bold text-[#1A1A2E]">{flight.departure}</p>
              <p data-ev-id="ev_73e6115cfd" className="text-sm text-[#64748B]">{flight.origin}</p>
            </div>

            {/* Duration */}
            <div data-ev-id="ev_516acd20d8" className="flex-1 flex flex-col items-center">
              <span data-ev-id="ev_b5212f0b1e" className="text-xs text-[#64748B] mb-1">{flight.duration}</span>
              <div data-ev-id="ev_aacb642fd3" className="w-full flex items-center gap-1">
                <div data-ev-id="ev_31bd4bc91c" className="h-px flex-1 bg-[#E2E8F0]" />
                <div data-ev-id="ev_895a4d97da" className="w-2 h-2 rounded-full border-2 border-[#FF6B35] bg-white" />
                {flight.stops > 0 &&
                <>
                    <div data-ev-id="ev_b411fb39d5" className="h-px flex-1 bg-[#E2E8F0]" />
                    <div data-ev-id="ev_7dffa75042" className="w-2 h-2 rounded-full bg-[#64748B]" />
                  </>
                }
                <div data-ev-id="ev_be5716e3bc" className="h-px flex-1 bg-[#E2E8F0]" />
                <div data-ev-id="ev_a589609ff1" className="w-2 h-2 rounded-full border-2 border-[#00B4D8] bg-white" />
              </div>
              <span data-ev-id="ev_79cc9c0b22" className="text-xs text-[#64748B] mt-1">
                {flight.stops === 0 ? 'Direto' : `${flight.stops} parada${flight.stops > 1 ? 's' : ''}`}
                {flight.stopCity && ` em ${flight.stopCity}`}
              </span>
            </div>

            {/* Arrival */}
            <div data-ev-id="ev_d08922bf60" className="text-center">
              <p data-ev-id="ev_6d229e4147" className="text-2xl font-bold text-[#1A1A2E]">{flight.arrival}</p>
              <p data-ev-id="ev_3d97f5ef33" className="text-sm text-[#64748B]">{flight.destination}</p>
            </div>
          </div>

          {/* Tags */}
          <div data-ev-id="ev_11814db605" className="flex flex-wrap items-center gap-2 mt-3">
            <div data-ev-id="ev_1b6477962f" className="flex items-center gap-1 text-xs text-[#64748B]">
              <Briefcase className="w-3.5 h-3.5" />
              <span data-ev-id="ev_cc6a76595f">{flight.baggage}</span>
            </div>
            <span data-ev-id="ev_03a554f2e6" className="text-[#E2E8F0]">·</span>
            <span data-ev-id="ev_e3f00ea10a" className="text-xs text-[#64748B]">{flight.class}</span>
          </div>
        </div>

        {/* Price */}
        <div data-ev-id="ev_d85c93982e" className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 lg:w-40 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E2E8F0] lg:pl-6">
          <div data-ev-id="ev_a908d57d23" className="text-right">
            {discount &&
            <div data-ev-id="ev_dc54ddcc42" className="flex items-center gap-2 justify-end mb-1">
                <span data-ev-id="ev_6bbac8569f" className="text-sm text-[#94A3B8] line-through">
                  R$ {flight.originalPrice}
                </span>
                <Badge variant="success">{discount}% OFF</Badge>
              </div>
            }
            <p data-ev-id="ev_7b4ee8603e" className="text-2xl font-bold text-[#FF6B35]">
              R$ {flight.price}
            </p>
            <p data-ev-id="ev_e4b2e9e05e" className="text-xs text-[#64748B]">por pessoa</p>
          </div>
          <Button size="sm">
            Selecionar
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>);

}