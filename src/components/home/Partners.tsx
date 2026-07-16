const partners = [
{
  name: 'LATAM',
  logo: 'https://images.kiwi.com/airlines/64/LA.png',
  url: 'https://www.latamairlines.com/br/pt',
  tagline: 'A maior da América Latina',
  color: 'from-[#1B0088] to-[#E31837]'
},
{
  name: 'GOL',
  logo: 'https://images.kiwi.com/airlines/64/G3.png',
  url: 'https://www.voegol.com.br/nh/',
  tagline: 'Voe com o melhor custo-benefício',
  color: 'from-[#FF6600] to-[#FF8533]'
},
{
  name: 'Azul',
  logo: 'https://images.kiwi.com/airlines/64/AD.png',
  url: 'https://www.voeazul.com.br/br/pt/home',
  tagline: 'Conectando o Brasil inteiro',
  color: 'from-[#003366] to-[#0066CC]'
},
{
  name: 'TAP',
  logo: 'https://images.kiwi.com/airlines/64/TP.png',
  url: 'https://www.flytap.com/pt-br',
  tagline: 'Sua ponte para a Europa',
  color: 'from-[#00A36C] to-[#00CC88]'
},
{
  name: 'American Airlines',
  logo: 'https://images.kiwi.com/airlines/64/AA.png',
  url: 'https://www.aa.com.br/homePage.do?locale=pt_BR',
  tagline: 'Destinos pelo mundo todo',
  color: 'from-[#0078D2] to-[#E31837]'
},
{
  name: 'Emirates',
  logo: 'https://images.kiwi.com/airlines/64/EK.png',
  url: 'https://www.emirates.com/br/portuguese/',
  tagline: 'Luxo e conforto premium',
  color: 'from-[#D71A21] to-[#8B0000]'
}];





export function Partners() {
  return (
    <section data-ev-id="ev_cf1af1d2a9" className="py-12 lg:py-16 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div data-ev-id="ev_54baf37819" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-ev-id="ev_c972c4f16e" className="text-center mb-8">
          <h2 data-ev-id="ev_ec546e4b9d" className="text-2xl lg:text-3xl font-bold text-[#1E293B] mb-2">
            ✈️ Compare as Melhores Companhias
          </h2>
          <p data-ev-id="ev_7b6ec22eb7" className="text-[#64748B] text-base max-w-xl mx-auto">
            Encontre voos das principais companhias aéreas
          </p>
        </div>

        {/* Cards Grid */}
        <div data-ev-id="ev_22638be195" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner) =>
          <a data-ev-id="ev_d53b35b5a0"
          key={partner.name}
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1">

              {/* Gradient top bar */}
              <div data-ev-id="ev_b02e4f6923" className={`h-1 bg-gradient-to-r ${partner.color}`} />
              
              {/* Content */}
              <div data-ev-id="ev_ff5ccabdb8" className="p-4">
                {/* Logo */}
                <div data-ev-id="ev_8536e149bc" className="h-10 flex items-center justify-center mb-2">
                  <img data-ev-id="ev_5114c46bac"
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-[100px] object-contain group-hover:scale-105 transition-transform duration-300" />

                </div>
                
                {/* Info */}
                <div data-ev-id="ev_1069e33619" className="text-center">
                  <h3 data-ev-id="ev_4ce4e45ef6" className="font-semibold text-[#1E293B] text-sm mb-0.5">
                    {partner.name}
                  </h3>
                  <p data-ev-id="ev_ab5f138b33" className="text-[#94A3B8] text-xs leading-tight">
                    {partner.tagline}
                  </p>
                </div>
              </div>
            </a>
          )}
        </div>

        {/* Bottom text */}
        <p data-ev-id="ev_79086204c6" className="text-center text-[#94A3B8] text-xs mt-6">
          🔍 Buscamos em tempo real para você
        </p>
      </div>
    </section>);

}