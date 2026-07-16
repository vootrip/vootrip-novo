import { Ticket, MapPin, Camera, Utensils, ExternalLink } from 'lucide-react';

// Monta um link de afiliado (Travelpayouts -> GetYourGuide) apontando pra
// uma busca específica dentro do GetYourGuide, em vez de mandar todo mundo
// pra home genérica deles. A comissão é a mesma não importa a página de
// destino, contanto que o marker/trs continue no link — só muda a página
// que a pessoa vê primeiro (e isso converte bem mais quando é relevante
// pro que ela está buscando).
function gygLink(query: string): string {
  const target = `https://www.getyourguide.com/pt-br/s/?q=${encodeURIComponent(query)}`;
  return `https://tp.media/r?marker=749258.749258&trs=549322&p=3984&u=${encodeURIComponent(target)}&campaign_id=89`;
}

const categories = [
{ icon: Ticket, label: 'Ingressos', color: '#FF6B35', query: 'ingressos' },
{ icon: MapPin, label: 'Passeios', color: '#00B4D8', query: 'passeios guiados' },
{ icon: Camera, label: 'Experiências', color: '#06D6A0', query: 'experiências' },
{ icon: Utensils, label: 'Gastronomia', color: '#9B5DE5', query: 'tour gastronômico' }];

// Mesmos 6 destinos que aparecem em "Destinos Populares" — texto curto e
// real sobre o que costuma valer a pena fazer em cada um, com link direto
// pra busca daquele destino no GetYourGuide.
const destinationHighlights = [
{
  name: 'Rio de Janeiro',
  blurb: 'Cristo Redentor, Pão de Açúcar e a Escadaria Selarón são os clássicos — mas trilhas guiadas pelo Parque Nacional da Tijuca e passeios de barco pela Baía de Guanabara também estão entre os mais procurados.'
},
{
  name: 'Lisboa',
  blurb: 'Torre de Belém, Mosteiro dos Jerónimos e o bairro de Alfama contam a história da cidade — complete com um passeio de tram 28 e uma noite de fado no Bairro Alto.'
},
{
  name: 'Cancún',
  blurb: 'Além das praias de areia branca, vale reservar um mergulho nos cenotes de água doce e uma visita às ruínas maias de Chichén Itzá ou Tulum, a poucas horas da cidade.'
},
{
  name: 'Buenos Aires',
  blurb: 'Um show de tango em San Telmo, o colorido de La Boca e um passeio gastronômico pelos parrillas tradicionais resumem bem a cidade — o Cemitério da Recoleta também surpreende quem visita.'
},
{
  name: 'Paris',
  blurb: 'Torre Eiffel e Museu do Louvre lideram a lista, mas reservar entrada com hora marcada evita boa parte da fila — um passeio de barco pelo Sena ao entardecer também vale a pena.'
},
{
  name: 'Miami',
  blurb: 'South Beach e a arquitetura art déco de Ocean Drive são o cartão-postal, mas um passeio de barco por Biscayne Bay e uma tarde em Wynwood (arte de rua) completam bem a viagem.'
}];

export function Activities() {
  return (
    <section data-ev-id="ev_055499fb76" className="py-16 lg:py-24 bg-white">
      <div data-ev-id="ev_639f52f631" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-ev-id="ev_43b2566c30" className="text-center mb-12">
          <h2 data-ev-id="ev_4c5606b29c" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
            O que fazer no <span data-ev-id="ev_4c90278783" className="text-[#FF6B35]">destino</span>
          </h2>
          <p data-ev-id="ev_52e18ff8d5" className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Descubra atividades, passeios e experiências incríveis para tornar sua viagem inesquecível
          </p>
        </div>

        {/* Categories (cada uma busca algo diferente agora) */}
        <div data-ev-id="ev_43078f36ee" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <a data-ev-id="ev_1d6897c22c"
              key={index}
              href={gygLink(cat.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#E2E8F0] hover:shadow-lg hover:border-transparent transition-all cursor-pointer group">

                <div data-ev-id="ev_27252b844d"
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}15` }}>

                  <Icon className="w-7 h-7" style={{ color: cat.color }} />
                </div>
                <span data-ev-id="ev_6fe027a0f7" className="font-medium text-[#1A1A2E]">{cat.label}</span>
              </a>);

          })}
        </div>

        {/* Destaques por destino, com conteúdo real e link específico */}
        <div data-ev-id="ev_dest_highlights_head" className="mb-8">
          <h3 className="text-xl lg:text-2xl font-bold text-[#1A1A2E] mb-1">O que vale a pena em cada destino</h3>
          <p className="text-[#64748B]">Um resumo rápido pra já chegar sabendo o que reservar</p>
        </div>
        <div data-ev-id="ev_dest_highlights_grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {destinationHighlights.map((dest) =>
          <a data-ev-id="ev_dest_highlight_card"
          key={dest.name}
          href={gygLink(dest.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-3 p-6 rounded-2xl border border-[#E2E8F0] hover:shadow-lg hover:border-[#FF6B35]/40 transition-all group">

              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-[#1A1A2E]">{dest.name}</h4>
                <ExternalLink className="w-4 h-4 text-[#94A3B8] group-hover:text-[#FF6B35] transition-colors" />
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed">{dest.blurb}</p>
              <span className="text-[#FF6B35] text-sm font-semibold mt-auto">Ver atividades em {dest.name.split(' ')[0]} →</span>
            </a>
          )}
        </div>

        {/* CTA Card */}
        <div data-ev-id="ev_a74a036475" className="bg-gradient-to-r from-[#FF6B35] to-[#FFD166] rounded-2xl p-8 lg:p-12 text-center">
          <div data-ev-id="ev_fcc8ab0de8" className="max-w-2xl mx-auto">
            <Ticket className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 data-ev-id="ev_b5c23cc558" className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Encontre as melhores atividades
            </h3>
            <p data-ev-id="ev_9fc74ff437" className="text-white/90 text-lg mb-8">
              Tours, ingressos para atrações, experiências gastronômicas e muito mais.
              Reserve com antecedência e garanta os melhores preços!
            </p>
            <a data-ev-id="ev_3c06807a31"
            href={gygLink('atividades')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg">

              Explorar atividades <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>);

}
