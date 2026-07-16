import { Sparkles, Castle, Star, Ticket } from 'lucide-react';

export function PopularDestinations() {

  return (
    <section data-ev-id="ev_a3482109c9" className="py-16 lg:py-24 bg-gradient-to-b from-[#1A1A2E] to-[#2D2D44] relative overflow-hidden">
      {/* Background decorations */}
      <div data-ev-id="ev_8e6c3c0326" className="absolute inset-0 overflow-hidden">
        <div data-ev-id="ev_f587268ad8" className="absolute top-10 left-10 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div data-ev-id="ev_509b1279b2" className="absolute bottom-10 right-10 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl" />
      </div>

      <div data-ev-id="ev_de87aa95cd" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div data-ev-id="ev_d1475cb81d" className="text-center mb-12">
          <div data-ev-id="ev_7be89d759d" className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/20 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[#FFD166]" />
            <span data-ev-id="ev_c2d951257a" className="text-[#FFD166] font-semibold">Destino dos Sonhos</span>
            <Sparkles className="w-5 h-5 text-[#FFD166]" />
          </div>
          
          <h2 data-ev-id="ev_9c7c8f0b07" className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Vai para a <span data-ev-id="ev_9e8fed2e3f" className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD166]">Disney</span>?
          </h2>
          
          <p data-ev-id="ev_10ed686087" className="text-white/70 text-lg lg:text-xl max-w-3xl mx-auto mb-6">
            Realize o sonho de conhecer o lugar mais mágico do mundo! 
            Ingressos, tours e experiências exclusivas com os melhores preços.
          </p>

          {/* Features */}
          <div data-ev-id="ev_b24cc7f9ea" className="flex flex-wrap justify-center gap-6 mb-10">
            <div data-ev-id="ev_5ed29b3869" className="flex items-center gap-2 text-white/80">
              <Castle className="w-5 h-5 text-[#00B4D8]" />
              <span data-ev-id="ev_4d88e74853">Magic Kingdom</span>
            </div>
            <div data-ev-id="ev_59d7788265" className="flex items-center gap-2 text-white/80">
              <Star className="w-5 h-5 text-[#FFD166]" />
              <span data-ev-id="ev_430ada8a3c">Hollywood Studios</span>
            </div>
            <div data-ev-id="ev_afb1d63355" className="flex items-center gap-2 text-white/80">
              <Ticket className="w-5 h-5 text-[#06D6A0]" />
              <span data-ev-id="ev_4a632aabe5">EPCOT</span>
            </div>
            <div data-ev-id="ev_d93b390f25" className="flex items-center gap-2 text-white/80">
              <Sparkles className="w-5 h-5 text-[#9B5DE5]" />
              <span data-ev-id="ev_0f6ed820cd">Animal Kingdom</span>
            </div>
          </div>
        </div>

        {/* Widget Container */}
        <div data-ev-id="ev_2a0110093a" className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10">
          <div data-ev-id="ev_31f3bfa32d" className="flex items-center gap-3 mb-6">
            <div data-ev-id="ev_8fada47169" className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FFD166] rounded-xl flex items-center justify-center">
              <Castle className="w-6 h-6 text-white" />
            </div>
            <div data-ev-id="ev_9a3d1583b7">
              <h3 data-ev-id="ev_3be57d3d91" className="text-white font-bold text-lg">Ingressos e Experiências Disney</h3>
              <p data-ev-id="ev_1078688cba" className="text-white/60 text-sm">Garanta já sua magia com preços especiais</p>
            </div>
          </div>

          {/* GetYourGuide Widget */}
          <div data-ev-id="ev_a9760f8eed" className="min-h-[300px] bg-white rounded-2xl p-4">
            <div data-ev-id="ev_3b9537d4c5"
            data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
            data-gyg-location-id="5019"
            data-gyg-locale-code="pt-BR"
            data-gyg-widget="activities"
            data-gyg-number-of-items="4"
            data-gyg-partner-id="Y0BZK0H">

              <span data-ev-id="ev_232c984075" className="text-gray-500">Carregando ofertas...</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div data-ev-id="ev_8f6d23b59c" className="text-center mt-10">
          <p data-ev-id="ev_db6aaf71b4" className="text-white/50 text-sm">
            ✨ Mais de 1 milhão de viajantes já realizaram o sonho Disney
          </p>
        </div>
      </div>
    </section>);

}