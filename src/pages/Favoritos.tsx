import { Layout } from '@/components/Layout';
import { Heart, Trash2, ExternalLink, Plane, Building2, Car, Tag } from 'lucide-react';
import { useFavorites, type FavoriteItem } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router';

const tipoIcons = {
  voo: Plane,
  hotel: Building2,
  carro: Car,
  oferta: Tag
};

const tipoLabels = {
  voo: 'Voo',
  hotel: 'Hotel',
  carro: 'Carro',
  oferta: 'Oferta'
};

export default function Favoritos() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <Layout>
      <div data-ev-id="ev_856f73ae91" className="min-h-screen bg-[#FAFBFC] pt-24 pb-16">
        <div data-ev-id="ev_9397099d2c" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div data-ev-id="ev_1a0c1d4bb0" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div data-ev-id="ev_3c7ce3685c">
              <h1 data-ev-id="ev_e4c6d5aa1f" className="text-3xl font-bold text-[#1A1A2E] mb-2">
                Meus Favoritos
              </h1>
              <p data-ev-id="ev_c0c77e413b" className="text-[#64748B]">
                {favorites.length === 0 ?
                'Você ainda não salvou nenhum favorito' :
                `${favorites.length} ${favorites.length === 1 ? 'item salvo' : 'itens salvos'}`
                }
              </p>
            </div>
            {favorites.length > 0 &&
            <button data-ev-id="ev_5ee44e00e6"
            onClick={() => {
              if (confirm('Tem certeza que deseja limpar todos os favoritos?')) {
                clearFavorites();
              }
            }}
            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">

                <Trash2 className="w-4 h-4" />
                Limpar tudo
              </button>
            }
          </div>

          {/* Empty State */}
          {favorites.length === 0 ?
          <div data-ev-id="ev_294a89af79" className="text-center py-16 bg-white rounded-2xl">
              <div data-ev-id="ev_4e45984835" className="w-20 h-20 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#FF6B35]" />
              </div>
              <h2 data-ev-id="ev_9391cee64f" className="text-xl font-semibold text-[#1A1A2E] mb-2">
                Nenhum favorito ainda
              </h2>
              <p data-ev-id="ev_3f9937ffac" className="text-[#64748B] mb-6 max-w-md mx-auto">
                Clique no coração nas ofertas para salvar aqui e acessar depois!
              </p>
              <Link to="/ofertas">
                <Button>
                  Ver Ofertas
                </Button>
              </Link>
            </div> : (

          /* Favorites Grid */
          <div data-ev-id="ev_3102d405dc" className="grid gap-4">
              {favorites.map((item) => {
              const Icon = tipoIcons[item.tipo] || Tag;
              return (
                <div data-ev-id="ev_6add94a950"
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4">

                    {/* Image */}
                    {item.imagem &&
                  <div data-ev-id="ev_bdd17fdba3" className="sm:w-40 h-32 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                        <img data-ev-id="ev_6143b03c97"
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover" />

                      </div>
                  }

                    {/* Content */}
                    <div data-ev-id="ev_63c8cb71c2" className="flex-1 min-w-0">
                      <div data-ev-id="ev_43dc50cceb" className="flex items-center gap-2 mb-2">
                        <span data-ev-id="ev_d25a3a763b" className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-1 rounded-full">
                          <Icon className="w-3 h-3" />
                          {tipoLabels[item.tipo]}
                        </span>
                      </div>
                      <h3 data-ev-id="ev_854dcc87b5" className="text-lg font-semibold text-[#1A1A2E] mb-1 truncate">
                        {item.titulo}
                      </h3>
                      {item.descricao &&
                    <p data-ev-id="ev_9568883947" className="text-sm text-[#64748B] mb-2 line-clamp-2">
                          {item.descricao}
                        </p>
                    }
                      {item.preco &&
                    <p data-ev-id="ev_f96b854700" className="text-lg font-bold text-[#06D6A0]">
                          {item.preco}
                        </p>
                    }
                    </div>

                    {/* Actions */}
                    <div data-ev-id="ev_624366a870" className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                      {item.url &&
                    <a data-ev-id="ev_40e2572bc8"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-xl hover:bg-[#e55a2a] transition-colors text-sm font-medium">

                          <ExternalLink className="w-4 h-4" />
                          Ver
                        </a>
                    }
                      <button data-ev-id="ev_7e1deebd8b"
                    onClick={() => removeFavorite(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover dos favoritos">

                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>);

            })}
            </div>)
          }
        </div>
      </div>
    </Layout>);

}