import { Layout } from '@/components/Layout';
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
      <section className="relative h-[50vh] min-h-[400px] max-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Praia tropical paradisíaca vista aérea"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/40 via-[#1A1A2E]/20 to-[#1A1A2E]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center mb-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF6B35] rounded-full text-white text-sm font-semibold mb-4 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>NOVIDADE</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              Planeje sua viagem dos sonhos ✨
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-md mx-auto">
              Tudo que você precisa para viajar em um só lugar
            </p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />

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
