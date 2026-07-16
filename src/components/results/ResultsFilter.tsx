import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div data-ev-id="ev_439eab098c" className="border-b border-[#E2E8F0] pb-4">
      <button data-ev-id="ev_bc6f78e2b4"
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-between w-full py-2 text-left">

        <span data-ev-id="ev_a34cc0a169" className="font-semibold text-[#1A1A2E]">{title}</span>
        {isOpen ?
        <ChevronUp className="w-4 h-4 text-[#64748B]" /> :

        <ChevronDown className="w-4 h-4 text-[#64748B]" />
        }
      </button>
      {isOpen && <div data-ev-id="ev_c6dc64b3ef" className="mt-2">{children}</div>}
    </div>);

}

interface ResultsFilterProps {
  type: 'flight' | 'hotel' | 'car' | 'transfer';
}

export function ResultsFilter({ type }: ResultsFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 5000]);

  return (
    <div data-ev-id="ev_d007abee92" className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
      <h3 data-ev-id="ev_9cbb3655af" className="text-lg font-bold text-[#1A1A2E] mb-4">Filtros</h3>

      {/* Price Range */}
      <FilterSection title="Preço">
        <div data-ev-id="ev_6a0720b827" className="flex flex-col gap-3">
          <input data-ev-id="ev_8ec1707c4e"
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-[#FF6B35]" />

          <div data-ev-id="ev_97cc61738e" className="flex justify-between text-sm text-[#64748B]">
            <span data-ev-id="ev_507423c13d">R$ {priceRange[0]}</span>
            <span data-ev-id="ev_329694a9a5">R$ {priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {type === 'flight' &&
      <>
          {/* Stops */}
          <FilterSection title="Paradas">
            <div data-ev-id="ev_d854a1b860" className="flex flex-col gap-2">
              <label data-ev-id="ev_a801060888" className="flex items-center gap-2 cursor-pointer">
                <input data-ev-id="ev_c3d45a91f9" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                <span data-ev-id="ev_499cccc869" className="text-sm text-[#1A1A2E]">Direto</span>
              </label>
              <label data-ev-id="ev_dd1c1a2a3f" className="flex items-center gap-2 cursor-pointer">
                <input data-ev-id="ev_68c31bbc55" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                <span data-ev-id="ev_b4f56f2474" className="text-sm text-[#1A1A2E]">1 parada</span>
              </label>
              <label data-ev-id="ev_4ec3519b40" className="flex items-center gap-2 cursor-pointer">
                <input data-ev-id="ev_2353b7879f" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" />
                <span data-ev-id="ev_f08d9de5c1" className="text-sm text-[#1A1A2E]">2+ paradas</span>
              </label>
            </div>
          </FilterSection>

          {/* Airlines */}
          <FilterSection title="Companhias">
            <div data-ev-id="ev_16c06ad6f0" className="flex flex-col gap-2">
              {['LATAM', 'GOL', 'Azul', 'TAP'].map((airline) =>
            <label data-ev-id="ev_ccade683b3" key={airline} className="flex items-center gap-2 cursor-pointer">
                  <input data-ev-id="ev_1d2afb7343" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                  <span data-ev-id="ev_07f01afda3" className="text-sm text-[#1A1A2E]">{airline}</span>
                </label>
            )}
            </div>
          </FilterSection>

          {/* Departure Time */}
          <FilterSection title="Horário de Saída">
            <div data-ev-id="ev_ca701b2aa4" className="flex flex-col gap-2">
              {[
            { label: 'Manhã (06h - 12h)', value: 'morning' },
            { label: 'Tarde (12h - 18h)', value: 'afternoon' },
            { label: 'Noite (18h - 00h)', value: 'evening' }].
            map((time) =>
            <label data-ev-id="ev_49c6d8e59d" key={time.value} className="flex items-center gap-2 cursor-pointer">
                  <input data-ev-id="ev_4cd32619c4" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                  <span data-ev-id="ev_9df68f98bc" className="text-sm text-[#1A1A2E]">{time.label}</span>
                </label>
            )}
            </div>
          </FilterSection>
        </>
      }

      {type === 'hotel' &&
      <>
          {/* Star Rating */}
          <FilterSection title="Estrelas">
            <div data-ev-id="ev_31e12aef0a" className="flex flex-col gap-2">
              {[5, 4, 3, 2].map((stars) =>
            <label data-ev-id="ev_101cb3cfda" key={stars} className="flex items-center gap-2 cursor-pointer">
                  <input data-ev-id="ev_6ccd376d47" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                  <span data-ev-id="ev_d6594415d0" className="text-sm text-[#1A1A2E]">{stars} estrelas</span>
                </label>
            )}
            </div>
          </FilterSection>

          {/* Amenities */}
          <FilterSection title="Comodidades">
            <div data-ev-id="ev_b3168e7eb6" className="flex flex-col gap-2">
              {['Wi-Fi grátis', 'Piscina', 'Café da manhã', 'Estacionamento', 'Academia'].map((amenity) =>
            <label data-ev-id="ev_d6cf351cd7" key={amenity} className="flex items-center gap-2 cursor-pointer">
                  <input data-ev-id="ev_d53036d2d4" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" />
                  <span data-ev-id="ev_5edda4a0ac" className="text-sm text-[#1A1A2E]">{amenity}</span>
                </label>
            )}
            </div>
          </FilterSection>
        </>
      }

      {type === 'car' &&
      <>
          {/* Car Type */}
          <FilterSection title="Categoria">
            <div data-ev-id="ev_823263eb38" className="flex flex-col gap-2">
              {['Econômico', 'Compacto', 'Intermediário', 'SUV', 'Luxo'].map((category) =>
            <label data-ev-id="ev_49a9db09ca" key={category} className="flex items-center gap-2 cursor-pointer">
                  <input data-ev-id="ev_00f0ca0f23" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                  <span data-ev-id="ev_c6702737a5" className="text-sm text-[#1A1A2E]">{category}</span>
                </label>
            )}
            </div>
          </FilterSection>

          {/* Transmission */}
          <FilterSection title="Câmbio">
            <div data-ev-id="ev_2d307662a0" className="flex flex-col gap-2">
              <label data-ev-id="ev_eb6fb8746e" className="flex items-center gap-2 cursor-pointer">
                <input data-ev-id="ev_05f386a744" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                <span data-ev-id="ev_630bdee487" className="text-sm text-[#1A1A2E]">Automático</span>
              </label>
              <label data-ev-id="ev_97c001f182" className="flex items-center gap-2 cursor-pointer">
                <input data-ev-id="ev_ed95a78b83" type="checkbox" className="w-4 h-4 accent-[#FF6B35] rounded" defaultChecked />
                <span data-ev-id="ev_9b708970c0" className="text-sm text-[#1A1A2E]">Manual</span>
              </label>
            </div>
          </FilterSection>
        </>
      }

      {/* Clear Filters */}
      <button data-ev-id="ev_161e5db962" className="w-full mt-4 py-2 text-sm font-medium text-[#FF6B35] hover:bg-[#FF6B35]/5 rounded-lg transition-colors">
        Limpar filtros
      </button>
    </div>);

}