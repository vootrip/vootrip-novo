import { Layout } from '@/components/Layout';
import { Link } from 'react-router';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const posts = [
{
  id: 1,
  title: '10 Destinos Imperdíveis para 2024',
  excerpt: 'Descubra os lugares mais incríveis para visitar este ano, desde praias paradisíacas até cidades históricas.',
  image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  category: 'Destinos',
  author: 'Ana Santos',
  date: '15 Jan 2024',
  readTime: '5 min'
},
{
  id: 2,
  title: 'Como Economizar nas Passagens Aéreas',
  excerpt: 'Dicas práticas para encontrar os melhores preços e viajar mais gastando menos.',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  category: 'Dicas',
  author: 'Carlos Silva',
  date: '12 Jan 2024',
  readTime: '7 min'
},
{
  id: 3,
  title: 'Guia Completo: Cancún para Brasileiros',
  excerpt: 'Tudo que você precisa saber para planejar sua viagem ao Caribe mexicano.',
  image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&q=80',
  category: 'Guias',
  author: 'Julia Oliveira',
  date: '10 Jan 2024',
  readTime: '10 min'
},
{
  id: 4,
  title: 'Melhores Hotéis All-Inclusive do Brasil',
  excerpt: 'Conheça os resorts que oferecem a melhor experiência de hospedagem no país.',
  image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
  category: 'Hotéis',
  author: 'Pedro Costa',
  date: '08 Jan 2024',
  readTime: '6 min'
},
{
  id: 5,
  title: 'Road Trip: Costa Verde do Rio de Janeiro',
  excerpt: 'Roteiro completo para explorar as praias mais bonitas entre Rio e São Paulo.',
  image: 'https://images.unsplash.com/photo-1544015759-237f87627549?w=600&q=80',
  category: 'Roteiros',
  author: 'Ana Santos',
  date: '05 Jan 2024',
  readTime: '8 min'
},
{
  id: 6,
  title: 'O que Levar na Mala: Checklist Definitivo',
  excerpt: 'Nunca mais esqueça nada importante com nossa lista completa para viagens.',
  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  category: 'Dicas',
  author: 'Julia Oliveira',
  date: '03 Jan 2024',
  readTime: '4 min'
}];


const categories = ['Todos', 'Destinos', 'Dicas', 'Guias', 'Hotéis', 'Roteiros'];

export default function Blog() {
  return (
    <Layout>
      <div data-ev-id="ev_2a8364d4bf" className="pt-20">
        {/* Hero */}
        <section data-ev-id="ev_9abdfb2d96" className="relative py-24 lg:py-36 overflow-hidden">
          {/* Background Image */}
          <div data-ev-id="ev_0d76c78342" className="absolute inset-0">
            <img data-ev-id="ev_cfeccb39f2"
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
            alt="Viagem"
            className="w-full h-full object-cover" />

            <div data-ev-id="ev_c414624432" className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 via-[#1A1A2E]/70 to-transparent" />
          </div>
          
          {/* Content */}
          <div data-ev-id="ev_d462b0f40c" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_fab01600c8" className="max-w-2xl">
              <span data-ev-id="ev_b6e48e78ec" className="inline-block px-4 py-2 bg-[#FF6B35] text-white text-sm font-medium rounded-full mb-6">
                ✈️ Inspire-se para viajar
              </span>
              <h1 data-ev-id="ev_c714127b41" className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Descubra o Mundo <br data-ev-id="ev_c765f4b0d0" />
                <span data-ev-id="ev_1b23bd196f" className="text-[#FF6B35]">com a Vootrip</span>
              </h1>
              <p data-ev-id="ev_b8dec2bf32" className="text-xl text-white/80 leading-relaxed">
                Dicas exclusivas, roteiros incríveis e inspirações para transformar 
                seus sonhos de viagem em realidade. Explore nosso conteúdo!
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section data-ev-id="ev_6314778b01" className="py-8 bg-white border-b border-[#E2E8F0] sticky top-16 lg:top-20 z-30">
          <div data-ev-id="ev_3b42c0f8f7" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_42710bee8b" className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) =>
              <button data-ev-id="ev_3493282b29"
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === 'Todos' ?
              'bg-[#FF6B35] text-white' :
              'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'}`
              }>

                  {category}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section data-ev-id="ev_f9c476d64a" className="py-16 lg:py-24 bg-[#FAFBFC]">
          <div data-ev-id="ev_07088125d9" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_64beaf3f94" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) =>
              <article data-ev-id="ev_26a1eaf065" key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                  <div data-ev-id="ev_70e844a4bf" className="relative h-48 overflow-hidden">
                    <img data-ev-id="ev_22a9860b24"
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                    <span data-ev-id="ev_009c2e8e62" className="absolute top-4 left-4 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div data-ev-id="ev_8dbe28c5dc" className="p-6">
                    <h2 data-ev-id="ev_9c4aeab552" className="text-lg font-bold text-[#1A1A2E] mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                      {post.title}
                    </h2>
                    <p data-ev-id="ev_be6942432e" className="text-[#64748B] text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div data-ev-id="ev_7e87198226" className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <div data-ev-id="ev_a4a290af77" className="flex items-center gap-4">
                        <span data-ev-id="ev_d7428ed520" className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </span>
                        <span data-ev-id="ev_452d8c9e29" className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <span data-ev-id="ev_a6ea145425" className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* Load More */}
            <div data-ev-id="ev_f24365e267" className="text-center mt-12">
              <button data-ev-id="ev_6425346551" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FF6B35] text-[#FF6B35] font-semibold rounded-xl hover:bg-[#FF6B35] hover:text-white transition-colors">
                Carregar mais posts
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>);

}