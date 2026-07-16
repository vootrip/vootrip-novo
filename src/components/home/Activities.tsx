import { Sun, Music, Waves, Heart } from 'lucide-react';

export function Activities() {
  return (
    <section data-ev-id="ev_7a78f9cb45" className="py-16 lg:py-24 bg-gradient-to-br from-[#00B4D8] via-[#0096C7] to-[#0077B6] relative overflow-hidden">
      {/* Background decorations */}
      <div data-ev-id="ev_ab8d4f6c7d" className="absolute inset-0 overflow-hidden">
        <div data-ev-id="ev_f6c7fc86e4" className="absolute top-0 right-0 w-96 h-96 bg-[#FFD166]/20 rounded-full blur-3xl" />
        <div data-ev-id="ev_a76d8b26c4" className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div data-ev-id="ev_5e87a99a0b" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div data-ev-id="ev_745a3490d5" className="text-center mb-12">
          <div data-ev-id="ev_e641267980" className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span data-ev-id="ev_51a21fa0a3" className="text-2xl">🇨🇻</span>
            <span data-ev-id="ev_8329ea2226" className="text-white font-semibold">Destino em Alta</span>
          </div>
          
          <h2 data-ev-id="ev_11c358c8c2" className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Descubra <span data-ev-id="ev_f6a201a374" className="text-[#FFD166]">Cabo Verde</span>
          </h2>
          
          <p data-ev-id="ev_fe6643fa5b" className="text-white/90 text-lg lg:text-xl max-w-3xl mx-auto mb-6">
            O paraíso africano que encantou o mundo! Praias cristálinas, música contagiante 
            e uma cultura vibrante te esperam neste destino único.
          </p>

          {/* Features */}
          <div data-ev-id="ev_090bbb9f14" className="flex flex-wrap justify-center gap-6 mb-10">
            <div data-ev-id="ev_3815e7be93" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sun className="w-5 h-5 text-[#FFD166]" />
              <span data-ev-id="ev_4fa5008f28" className="text-white">Sol o ano todo</span>
            </div>
            <div data-ev-id="ev_65c0b66106" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Waves className="w-5 h-5 text-white" />
              <span data-ev-id="ev_bfa3fa490a" className="text-white">Praias paradisíacas</span>
            </div>
            <div data-ev-id="ev_7aed3f5dd5" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Music className="w-5 h-5 text-[#FFD166]" />
              <span data-ev-id="ev_dbdc80262a" className="text-white">Morna & Funaná</span>
            </div>
            <div data-ev-id="ev_a2beddad8b" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-[#FF6B35]" />
              <span data-ev-id="ev_98c98206b4" className="text-white">Hospitalidade única</span>
            </div>
          </div>
        </div>

        {/* Widget Container */}
        <div data-ev-id="ev_9ea8ef4c31" className="bg-white rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div data-ev-id="ev_29d1b14b54" className="flex items-center gap-3 mb-6">
            <div data-ev-id="ev_bfa738c389" className="w-12 h-12 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-xl flex items-center justify-center text-2xl">
              🏖️
            </div>
            <div data-ev-id="ev_4de6cff095">
              <h3 data-ev-id="ev_98b9820fb3" className="text-[#1A1A2E] font-bold text-lg">Experiências em Cabo Verde</h3>
              <p data-ev-id="ev_9f7e3c88b1" className="text-[#64748B] text-sm">Tours, passeios e aventuras incríveis</p>
            </div>
          </div>

          {/* GetYourGuide Widget */}
          <div data-ev-id="ev_21c14857ee" className="min-h-[400px]">
            <div data-ev-id="ev_4526380974"
            data-gyg-href="https://widget.getyourguide.com/default/city.frame"
            data-gyg-location-id="169081"
            data-gyg-locale-code="pt-BR"
            data-gyg-widget="city"
            data-gyg-partner-id="Y0BZK0H">

              <span data-ev-id="ev_c4fbdf2a24" className="text-gray-500">Carregando experiências...</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div data-ev-id="ev_59b7601c6c" className="text-center mt-10">
          <p data-ev-id="ev_e552a4846c" className="text-white/70 text-sm">
            🌟 Cabo Verde: onde a África encontra o Atlântico em perfeita harmonia
          </p>
        </div>
      </div>
    </section>);

}