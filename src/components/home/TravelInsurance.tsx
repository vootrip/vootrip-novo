import { Shield, Heart, Plane, Phone, CheckCircle } from 'lucide-react';

const benefits = [
{ icon: Heart, text: 'Cobertura médica internacional' },
{ icon: Plane, text: 'Cancelamento de viagem' },
{ icon: Phone, text: 'Assistência 24h em português' }];


const ASSIST_CARD_LINK = 'https://mais.app/ZJiXME';

export function TravelInsurance() {
  return (
    <section data-ev-id="ev_31c8abb435" className="py-16 lg:py-20">
      <div data-ev-id="ev_63138c902b" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_3156a12de3" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A1A2E] via-[#2D2D44] to-[#1A1A2E]">
          {/* Background decoration */}
          <div data-ev-id="ev_a21e938065" className="absolute inset-0 opacity-10">
            <div data-ev-id="ev_5762007c16" className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div data-ev-id="ev_1f4ed3e68f" className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div data-ev-id="ev_6301d8fafe" className="relative z-10 p-8 lg:p-12">
            <div data-ev-id="ev_845ec05f96" className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Icon */}
              <div data-ev-id="ev_8b3cd2fccc" className="flex-shrink-0">
                <div data-ev-id="ev_b364fd8f2a" className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#00B4D8]/30">
                  <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div data-ev-id="ev_ef9e2c1728" className="flex-1 text-center lg:text-left">
                <span data-ev-id="ev_fda30deaab" className="inline-block px-4 py-1 bg-[#FF6B35]/20 text-[#FF6B35] text-sm font-semibold rounded-full mb-4">
                  Parceiro Oficial
                </span>
                <h2 data-ev-id="ev_901d28f368" className="text-2xl lg:text-4xl font-bold text-white mb-4">
                  Viaje com <span data-ev-id="ev_4d4cf5d54a" className="text-[#00B4D8]">tranquilidade</span>
                </h2>
                <p data-ev-id="ev_5a30246eb0" className="text-white/70 text-lg mb-6 max-w-xl">
                  Proteja sua viagem com a Assist Card, líder mundial em assistência ao viajante. 
                  Cobertura completa para você e sua família.
                </p>
                
                {/* Benefits */}
                <div data-ev-id="ev_23f22088f7" className="flex flex-col sm:flex-row gap-4 mb-8">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div data-ev-id="ev_1a809fdd15" key={index} className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="w-5 h-5 text-[#06D6A0]" />
                        <span data-ev-id="ev_646c3ecf32" className="text-sm">{benefit.text}</span>
                      </div>);

                  })}
                </div>
                
                {/* CTA */}
                <a data-ev-id="ev_b14112f5ca"
                href={ASSIST_CARD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all transform hover:scale-105">

                  <Shield className="w-5 h-5" />
                  Cotar Seguro Viagem
                </a>
              </div>
              
              {/* Trust badge */}
              <div data-ev-id="ev_ad103c751a" className="hidden xl:block flex-shrink-0">
                <div data-ev-id="ev_f0dfcdbebd" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div data-ev-id="ev_ee4ba735bd" className="text-4xl font-bold text-white mb-1">+30</div>
                  <div data-ev-id="ev_f344d340fd" className="text-white/70 text-sm">anos de<br data-ev-id="ev_fa7abba63c" />experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}