import { Smartphone, Wifi, Globe, CheckCircle, Zap } from 'lucide-react';

const benefits = [
{ icon: Wifi, text: 'Internet ilimitada' },
{ icon: Globe, text: 'Cobertura em +140 países' },
{ icon: Zap, text: 'Ativação instantânea' }];


const AMERICA_CHIP_LINK = 'https://www.v7fhugd.com/32HKQB8/2CTPL/?__efq=1XzZiNTLF3AaKFjnpcw4rAz8f9NlCv33usbCXc6VqFM';

export function AmericaChip() {
  return (
    <section data-ev-id="ev_b838be3a6d" className="py-16 lg:py-20">
      <div data-ev-id="ev_4fff5c2065" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_4f09c8d2dd" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#0F172A]">
          {/* Background decoration */}
          <div data-ev-id="ev_38df2c69e1" className="absolute inset-0 opacity-10">
            <div data-ev-id="ev_44703e5858" className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div data-ev-id="ev_4b6c0bdbe0" className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          {/* Signal waves decoration */}
          <div data-ev-id="ev_79747a3372" className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
            <div data-ev-id="ev_f87e87b8bd" className="w-32 h-32 border-4 border-[#22C55E] rounded-full" />
            <div data-ev-id="ev_d80c0b3d31" className="w-48 h-48 border-4 border-[#22C55E] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div data-ev-id="ev_514b6f19b1" className="w-64 h-64 border-4 border-[#22C55E] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div data-ev-id="ev_7a3b0c0a79" className="relative z-10 p-8 lg:p-12">
            <div data-ev-id="ev_517ac767e6" className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Icon */}
              <div data-ev-id="ev_9992572524" className="flex-shrink-0">
                <div data-ev-id="ev_4499e9e254" className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#22C55E]/30">
                  <Smartphone className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div data-ev-id="ev_08c56bf8cd" className="flex-1 text-center lg:text-left">
                <span data-ev-id="ev_c96fed7fb0" className="inline-block px-4 py-1 bg-[#22C55E]/20 text-[#22C55E] text-sm font-semibold rounded-full mb-4">
                  📱 Parceiro Oficial
                </span>
                <h2 data-ev-id="ev_7680a92437" className="text-2xl lg:text-4xl font-bold text-white mb-4">
                  Fique <span data-ev-id="ev_d92480f264" className="text-[#22C55E]">conectado</span> no mundo todo
                </h2>
                <p data-ev-id="ev_6ec995b50e" className="text-white/70 text-lg mb-6 max-w-xl">
                  Viaje com internet ilimitada! Chip internacional AmericaChip com cobertura 
                  em mais de 140 países. Chegue conectado ao seu destino.
                </p>
                
                {/* Benefits */}
                <div data-ev-id="ev_589e52a5da" className="flex flex-col sm:flex-row gap-4 mb-8">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div data-ev-id="ev_0b841a6149" key={index} className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                        <span data-ev-id="ev_78d79507d8" className="text-sm">{benefit.text}</span>
                      </div>);

                  })}
                </div>
                
                {/* CTA */}
                <a data-ev-id="ev_2c6b00fd45"
                href={AMERICA_CHIP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#22C55E]/30 transition-all transform hover:scale-105">

                  <Smartphone className="w-5 h-5" />
                  Garanta seu Chip
                </a>
              </div>
              
              {/* Trust badge */}
              <div data-ev-id="ev_2de3bfcf88" className="hidden xl:block flex-shrink-0">
                <div data-ev-id="ev_0ce0e295df" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div data-ev-id="ev_0caa326285" className="text-4xl font-bold text-white mb-1">+140</div>
                  <div data-ev-id="ev_3b5d260fb9" className="text-white/70 text-sm">países com<br data-ev-id="ev_ee4a3f3849" />cobertura</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}