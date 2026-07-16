import { Layout } from '@/components/Layout';
import { SearchTabs } from '@/components/SearchTabs';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { WhyVootrip } from '@/components/home/WhyVootrip';
import { Partners } from '@/components/home/Partners';
import { Newsletter } from '@/components/home/Newsletter';
import { Activities } from '@/components/home/Activities';
import { TravelInsurance } from '@/components/home/TravelInsurance';
import { AmericaChip } from '@/components/home/AmericaChip';
import heroImage from '@/assets/generated/hero-beach.png';

export default function Index() {
  return (
    <Layout showHero>
      {/* Hero Section */}
      <section data-ev-id="ev_f9c42e4435" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div data-ev-id="ev_920ff14330" className="absolute inset-0">
          <img data-ev-id="ev_48ff094dd2"
          src={heroImage}
          alt="Praia tropical paradisíaca vista aérea"
          className="w-full h-full object-cover" />

          <div data-ev-id="ev_04feb48672" className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/60 via-[#1A1A2E]/40 to-[#1A1A2E]/70" />
        </div>

        {/* Content */}
        <div data-ev-id="ev_7d593b09ad" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div data-ev-id="ev_c67b98dacc" className="text-center mb-10">
            <h1 data-ev-id="ev_96fee7dddf" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
              Sua próxima aventura<br data-ev-id="ev_17853b6243" />
              <span data-ev-id="ev_0a1d802040" className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD166]">
                começa aqui
              </span>
            </h1>
            <p data-ev-id="ev_3878039489" className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto text-pretty">
              Compare preços de voos, hotéis, carros e traslados em tempo real. 
              Encontre as melhores ofertas para viajar mais gastando menos.
            </p>
          </div>

          <SearchTabs />
        </div>

        {/* Scroll Indicator */}
        <div data-ev-id="ev_68fd800613" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div data-ev-id="ev_20d5fd71ce" className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div data-ev-id="ev_c205ab6ab6" className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Travel Insurance - Assist Card */}
      <TravelInsurance />

      {/* AmericaChip - Chip Internacional */}
      <AmericaChip />

      {/* Activities */}
      <Activities />

      {/* Why Vootrip */}
      <WhyVootrip />

      {/* Partners */}
      <Partners />

      {/* Newsletter */}
      <Newsletter />
    </Layout>);

}