import { Layout } from '@/components/Layout';
import { MapPin, Plane, Sun, Snowflake, Palmtree, Building2 } from 'lucide-react';
import { Link } from 'react-router';

const categories = [
{ icon: Sun, label: 'Praia', color: '#FF6B35' },
{ icon: Building2, label: 'Cidade', color: '#00B4D8' },
{ icon: Palmtree, label: 'Natureza', color: '#06D6A0' },
{ icon: Snowflake, label: 'Inverno', color: '#9B5DE5' }];


const destinos = [
{
  id: 1,
  nome: 'Rio de Janeiro',
  pais: 'Brasil',
  descricao: 'Praias icônicas, Cristo Redentor e vida noturna vibrante.',
  imagem: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
  categoria: 'Praia',
  precoDesde: 'R$ 450'
},
{
  id: 2,
  nome: 'Paris',
  pais: 'França',
  descricao: 'A cidade do amor, arte e gastronomia refinada.',
  imagem: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  categoria: 'Cidade',
  precoDesde: 'R$ 3.200'
},
{
  id: 3,
  nome: 'Cancún',
  pais: 'México',
  descricao: 'Resorts all-inclusive e ruínas maias impressionantes.',
  imagem: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800',
  categoria: 'Praia',
  precoDesde: 'R$ 2.800'
},
{
  id: 4,
  nome: 'Buenos Aires',
  pais: 'Argentina',
  descricao: 'Tango, arquitetura europeia e carníçarias incríveis.',
  imagem: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=800',
  categoria: 'Cidade',
  precoDesde: 'R$ 890'
},
{
  id: 5,
  nome: 'Fernando de Noronha',
  pais: 'Brasil',
  descricao: 'Paraíso ecológico com as melhores praias do Brasil.',
  imagem: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
  categoria: 'Natureza',
  precoDesde: 'R$ 1.500'
},
{
  id: 6,
  nome: 'Lisboa',
  pais: 'Portugal',
  descricao: 'História, pastéis de Belém e vistas deslumbrantes.',
  imagem: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
  categoria: 'Cidade',
  precoDesde: 'R$ 2.900'
},
{
  id: 7,
  nome: 'Bariloche',
  pais: 'Argentina',
  descricao: 'Esqui, chocolate e paisagens alpinas na Patagônia.',
  imagem: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
  categoria: 'Inverno',
  precoDesde: 'R$ 1.200'
},
{
  id: 8,
  nome: 'Miami',
  pais: 'Estados Unidos',
  descricao: 'Compras, praias e vida noturna em South Beach.',
  imagem: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800',
  categoria: 'Praia',
  precoDesde: 'R$ 2.400'
}];


export default function Destinos() {
  return (
    <Layout>
      <div data-ev-id="ev_d356877808" className="min-h-screen bg-[#FAFBFC] pt-24 pb-16">
        <div data-ev-id="ev_0a4d254a7a" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div data-ev-id="ev_db5986e904" className="text-center mb-12">
            <h1 data-ev-id="ev_d9d3f29afd" className="text-3xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
              Explore <span data-ev-id="ev_3ae7d12e78" className="text-[#FF6B35]">Destinos</span>
            </h1>
            <p data-ev-id="ev_f637e75cd3" className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Descubra os melhores lugares do mundo e encontre a viagem perfeita para você
            </p>
          </div>

          {/* Categories */}
          <div data-ev-id="ev_4de7ebaf6a" className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button data-ev-id="ev_f57ce766e6"
                key={index}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-[#E2E8F0] hover:shadow-md transition-all">

                  <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  <span data-ev-id="ev_a9b1351a50" className="font-medium text-[#1A1A2E]">{cat.label}</span>
                </button>);

            })}
          </div>

          {/* Grid de Destinos */}
          <div data-ev-id="ev_284f88649b" className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinos.map((destino) =>
            <Link
              key={destino.id}
              to={`/?destino=${encodeURIComponent(destino.nome)}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

                {/* Imagem */}
                <div data-ev-id="ev_554812bba6" className="relative h-48 overflow-hidden">
                  <img data-ev-id="ev_39eea85dfc"
                src={destino.imagem}
                alt={destino.nome}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                  <div data-ev-id="ev_fc2f4c51d7" className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#1A1A2E]">
                    {destino.categoria}
                  </div>
                </div>

                {/* Conteúdo */}
                <div data-ev-id="ev_e0d5574302" className="p-5">
                  <div data-ev-id="ev_b9f62e71bc" className="flex items-center gap-1 text-[#64748B] text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {destino.pais}
                  </div>
                  <h3 data-ev-id="ev_03304462af" className="text-lg font-bold text-[#1A1A2E] mb-2">
                    {destino.nome}
                  </h3>
                  <p data-ev-id="ev_fd6c6fa256" className="text-[#64748B] text-sm mb-4 line-clamp-2">
                    {destino.descricao}
                  </p>
                  <div data-ev-id="ev_25fc3ed02b" className="flex items-center justify-between">
                    <div data-ev-id="ev_dc0ce7b8fe">
                      <span data-ev-id="ev_74e1ee6639" className="text-xs text-[#64748B]">A partir de</span>
                      <p data-ev-id="ev_a420dd4660" className="text-[#FF6B35] font-bold">{destino.precoDesde}</p>
                    </div>
                    <div data-ev-id="ev_d9fef408fd" className="flex items-center gap-1 text-[#00B4D8] font-medium text-sm group-hover:gap-2 transition-all">
                      <Plane className="w-4 h-4" />
                      Ver voos
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* CTA */}
          <div data-ev-id="ev_56d2915156" className="mt-16 text-center">
            <div data-ev-id="ev_709cb0ad51" className="bg-gradient-to-r from-[#FF6B35] to-[#FFD166] rounded-2xl p-8 lg:p-12">
              <h2 data-ev-id="ev_9717261d14" className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Não encontrou seu destino?
              </h2>
              <p data-ev-id="ev_71051c34d0" className="text-white/90 mb-6 max-w-xl mx-auto">
                Use nossa busca personalizada para encontrar voos para qualquer lugar do mundo
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-white/90 transition-colors">

                <Plane className="w-5 h-5" />
                Buscar Voos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>);

}