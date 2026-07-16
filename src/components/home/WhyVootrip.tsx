import { Search, Shield, Zap, Headphones, TrendingDown, Globe } from 'lucide-react';

const features = [
{
  icon: Search,
  title: 'Metabusca Inteligente',
  description: 'Comparamos preços de dezenas de sites em segundos para você encontrar a melhor oferta.',
  color: '#FF6B35'
},
{
  icon: TrendingDown,
  title: 'Melhores Preços',
  description: 'Alertas de queda de preço e ofertas exclusivas para você viajar mais gastando menos.',
  color: '#06D6A0'
},
{
  icon: Zap,
  title: 'Rápido e Fácil',
  description: 'Interface intuitiva e resultados em tempo real. Encontre o que precisa em poucos cliques.',
  color: '#FFD166'
},
{
  icon: Shield,
  title: 'Segurança Total',
  description: 'Reservas seguras com empresas verificadas. Seus dados sempre protegidos.',
  color: '#00B4D8'
},
{
  icon: Globe,
  title: 'Cobertura Global',
  description: 'Voos, hotéis, carros e traslados em milhares de destinos ao redor do mundo.',
  color: '#9B5DE5'
},
{
  icon: Headphones,
  title: 'Suporte 24h',
  description: 'Equipe dedicada para ajudar você antes, durante e depois da sua viagem.',
  color: '#EF476F'
}];


export function WhyVootrip() {
  return (
    <section data-ev-id="ev_48fb983eff" className="py-16 lg:py-24 bg-white">
      <div data-ev-id="ev_90e93137d6" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-ev-id="ev_d3d510883e" className="text-center max-w-3xl mx-auto mb-14">
          <h2 data-ev-id="ev_2f6f1ea310" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
            Por que escolher o <span data-ev-id="ev_3977224e80" className="text-[#FF6B35]">Vootrip</span>?
          </h2>
          <p data-ev-id="ev_b4b76eb081" className="text-[#64748B] text-lg">
            Somos mais que um comparador de preços. Somos seu parceiro de viagem.
          </p>
        </div>

        {/* Features Grid */}
        <div data-ev-id="ev_ad48eabcff" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div data-ev-id="ev_3af3f07a24"
              key={index}
              className="group p-6 rounded-2xl border border-[#E2E8F0] hover:border-transparent hover:shadow-xl transition-all duration-300">

                <div data-ev-id="ev_5b35f26cef"
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15` }}>

                  <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 data-ev-id="ev_2ead3ca164" className="text-xl font-semibold text-[#1A1A2E] mb-2">
                  {feature.title}
                </h3>
                <p data-ev-id="ev_355d8d7a44" className="text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>);

          })};
        </div>
      </div>
    </section>);

}