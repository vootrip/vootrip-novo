import { Layout } from '@/components/Layout';
import { Target, Heart, Globe, TrendingUp, Package } from 'lucide-react';

const stats = [
{ number: '500K+', label: 'Viajantes atendidos' },
{ number: '150+', label: 'Destinos' },
{ number: '50+', label: 'Parceiros' },
{ number: '4.8', label: 'Avaliação média' }];


const values = [
{
  icon: Target,
  title: 'Missão',
  description: 'Democratizar o acesso a viagens, oferecendo as melhores opções e preços para que todos possam explorar o mundo.'
},
{
  icon: Globe,
  title: 'Visão',
  description: 'Ser a principal plataforma de metabusca de viagens da América Latina, reconhecida pela excelência e inovação.'
},
{
  icon: Heart,
  title: 'Valores',
  description: 'Transparência, compromisso com o cliente, inovação contínua e paixão por viagens.'
},
{
  icon: Package,
  title: 'Melhores Pacotes',
  description: 'Oferecemos os melhores pacotes nacionais e internacionais, com preços exclusivos e condições especiais para você realizar a viagem dos sonhos.'
}];





export default function SobreNos() {
  return (
    <Layout>
      <div data-ev-id="ev_4dc8fcf5a6" className="pt-20">
        {/* Hero */}
        <section data-ev-id="ev_aebc304c9f" className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] py-20 lg:py-32">
          <div data-ev-id="ev_8385ae5bef" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 data-ev-id="ev_ae900bde53" className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Sobre o <span data-ev-id="ev_a2441bfaee" className="text-[#FF6B35]">Vootrip</span>
            </h1>
            <p data-ev-id="ev_712850ae04" className="text-xl text-white/70 max-w-3xl mx-auto">
              Somos uma agência de viagens que trabalha com os melhores parceiros e fornecedores 
              do mercado, oferecendo pacotes completos nacionais e internacionais para você 
              viajar com tranquilidade e economia.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section data-ev-id="ev_f418a57819" className="py-12 bg-white border-b border-[#E2E8F0]">
          <div data-ev-id="ev_5a3bee8121" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_d0d71aedad" className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) =>
              <div data-ev-id="ev_6e4e1196d5" key={index} className="text-center">
                  <p data-ev-id="ev_7cb6c220a9" className="text-3xl lg:text-4xl font-bold text-[#FF6B35]">{stat.number}</p>
                  <p data-ev-id="ev_dc461882be" className="text-[#64748B] mt-1">{stat.label}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section data-ev-id="ev_bdf1cfdeaf" className="py-16 lg:py-24 bg-[#FAFBFC]">
          <div data-ev-id="ev_42eeb13f16" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_b579a8d740" className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-ev-id="ev_2f0d8f0aa9">
                <h2 data-ev-id="ev_d2f175d775" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-6">
                  Nossa História
                </h2>
                <div data-ev-id="ev_4913c2f34d" className="flex flex-col gap-4 text-[#64748B] leading-relaxed">
                  <p data-ev-id="ev_b2343f1892">
                    O Vootrip nasceu com a missão de oferecer os melhores pacotes de viagem 
                    para destinos nacionais e internacionais, conectando você às experiências 
                    mais incríveis ao redor do mundo.
                  </p>
                  <p data-ev-id="ev_f42e58b3f2">
                    Trabalhamos com uma rede seleta de parceiros e fornecedores de confiança, 
                    garantindo qualidade, segurança e os melhores preços em passagens aéreas, 
                    hospedagens, transfers e pacotes completos.
                  </p>
                  <p data-ev-id="ev_7bf731ff70">
                    Nossa equipe está sempre em busca das melhores oportunidades para você: 
                    desde escapadas de fim de semana até viagens internacionais dos sonhos, 
                    temos opções para todos os gostos e bolsos.
                  </p>
                  <p data-ev-id="ev_a722082ae0">
                    Hoje, somos referência em pacotes de viagem, ajudando milhares de 
                    viajantes a conhecer novos destinos com economia e tranquilidade.
                  </p>
                </div>
              </div>
              <div data-ev-id="ev_5b399d483d" className="relative">
                <img data-ev-id="ev_5b892b8d9d"
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=600&q=80"
                alt="Equipe Vootrip"
                className="rounded-2xl shadow-xl" />

                <div data-ev-id="ev_7b2560976b" className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white p-6 rounded-2xl shadow-lg">
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <p data-ev-id="ev_54ca421d62" className="font-bold text-lg">+200%</p>
                  <p data-ev-id="ev_ab2cea8364" className="text-sm text-white/80">Crescimento em 2023</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão, Valores */}
        <section data-ev-id="ev_c8a9adf1a0" className="py-16 lg:py-24 bg-white">
          <div data-ev-id="ev_f63f655c9d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 data-ev-id="ev_850b1a790c" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] text-center mb-12">
              Nossos Pilares
            </h2>
            <div data-ev-id="ev_5ed46213ae" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div data-ev-id="ev_86e2f610b8" key={index} className="text-center p-8 rounded-2xl border border-[#E2E8F0] hover:shadow-lg transition-shadow">
                    <div data-ev-id="ev_1679c84b26" className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-[#FF6B35]" />
                    </div>
                    <h3 data-ev-id="ev_4f3ca857b4" className="text-xl font-bold text-[#1A1A2E] mb-3">{item.title}</h3>
                    <p data-ev-id="ev_baf222fbd5" className="text-[#64748B] leading-relaxed">{item.description}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>


      </div>
    </Layout>);

}