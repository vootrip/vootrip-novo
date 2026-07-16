import { LucideIcon, SlidersHorizontal } from 'lucide-react';

interface ResultsHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  resultsCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function ResultsHeader({
  icon: Icon,
  title,
  subtitle,
  resultsCount,
  sortBy,
  onSortChange
}: ResultsHeaderProps) {
  return (
    <div data-ev-id="ev_f2d1657f1e" className="mb-6">
      <div data-ev-id="ev_dc46814c51" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div data-ev-id="ev_e686ed48ee" className="flex items-center gap-3">
          <div data-ev-id="ev_948544cd8c" className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div data-ev-id="ev_c9af2189b3">
            <h1 data-ev-id="ev_a82f8f0c81" className="text-2xl font-bold text-[#1A1A2E]">{title}</h1>
            <p data-ev-id="ev_b4ca08a93f" className="text-[#64748B] text-sm">{subtitle}</p>
          </div>
        </div>

        <div data-ev-id="ev_6fb5d36b91" className="flex items-center gap-3">
          <span data-ev-id="ev_a6926142bb" className="text-sm text-[#64748B]">
            {resultsCount} resultados encontrados
          </span>
          <div data-ev-id="ev_6c8bdc7144" className="flex items-center gap-2 bg-white rounded-xl border border-[#E2E8F0] px-3 py-2">
            <SlidersHorizontal className="w-4 h-4 text-[#64748B]" />
            <select data-ev-id="ev_5a07a4b1cb"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm text-[#1A1A2E] bg-transparent outline-none cursor-pointer">

              <option data-ev-id="ev_0ebaec7f8a" value="price">Menor preço</option>
              <option data-ev-id="ev_537e460012" value="duration">Menor duração</option>
              <option data-ev-id="ev_558592e714" value="departure">Horário de saída</option>
              <option data-ev-id="ev_c6d8eb2283" value="recommended">Recomendados</option>
            </select>
          </div>
        </div>
      </div>
    </div>);

}