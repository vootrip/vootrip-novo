import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Tag, Clock, Plane, Building2, Car, Percent, Heart, Flame, Send, X, Loader2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useOffers, Offer } from '@/hooks/useOffers';
import { isValidEmail, isValidPhone, sanitizeText, formatPhone } from '@/utils/validation';

const WHATSAPP_NUMBER = '5548998365852';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrenepkw';

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case 'voo':return Plane;
    case 'hotel':return Building2;
    case 'carro':return Car;
    default:return Tag;
  }
};

const getTipoLabel = (tipo: string) => {
  switch (tipo) {
    case 'voo':return 'Passagem Aérea';
    case 'hotel':return 'Hospedagem';
    case 'carro':return 'Aluguel de Carro';
    case 'pacote':return 'Pacote de Viagem';
    default:return 'Oferta';
  }
};

function WhatsAppIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_e83240d51c" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path data-ev-id="ev_a87101e646" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>);

}

interface SolicitarModalProps {
  oferta: Offer;
  isOpen: boolean;
  onClose: () => void;
}

function SolicitarModal({ oferta, isOpen, onClose }: SolicitarModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!isValidPhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: sanitizeText(formData.nome),
          email: formData.email.toLowerCase().trim(),
          telefone: formatPhone(formData.telefone),
          mensagem: sanitizeText(formData.mensagem),
          pacote_titulo: oferta.titulo,
          pacote_preco: oferta.preco_atual,
          pacote_tipo: oferta.tipo,
          _subject: `Solicitação de Pacote: ${oferta.titulo}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no pacote:\n\n*${oferta.titulo}*\nPreço: ${oferta.preco_atual}\n\nPoderia me passar mais informações?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (submitted) {
    return (
      <div data-ev-id="ev_9bccf8256c" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div data-ev-id="ev_83b387a6df" className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div data-ev-id="ev_de163aa6c9" className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h3 data-ev-id="ev_0f630fff63" className="text-xl font-bold text-[#1A1A2E] mb-2">Solicitação Enviada!</h3>
          <p data-ev-id="ev_9f55bc5523" className="text-[#64748B] mb-6">
            Recebemos seu interesse no pacote <strong data-ev-id="ev_c6465223c2">{oferta.titulo}</strong>. 
            Nossa equipe entrará em contato em breve.
          </p>
          <button data-ev-id="ev_9be172f28c"
          onClick={onClose}
          className="px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors">

            Fechar
          </button>
        </div>
      </div>);

  }

  return (
    <div data-ev-id="ev_b641df196a" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div data-ev-id="ev_0a9613cced" className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div data-ev-id="ev_c72a93776d" className="p-6 border-b border-[#E2E8F0]">
          <div data-ev-id="ev_eb978882b1" className="flex items-center justify-between">
            <h3 data-ev-id="ev_d832473670" className="text-xl font-bold text-[#1A1A2E]">Solicitar Pacote</h3>
            <button data-ev-id="ev_9d1c04d38e" onClick={onClose} className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors">
              <X className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>
          <p data-ev-id="ev_c3ccec5f4b" className="text-[#64748B] mt-1">{oferta.titulo}</p>
        </div>

        {/* Form */}
        <form data-ev-id="ev_ac045d4336" onSubmit={handleSubmit} className="p-6">
          <input data-ev-id="ev_2f61bea134"
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off" />


          <div data-ev-id="ev_42edfd8a56" className="flex flex-col gap-4">
            <div data-ev-id="ev_20ab6a49e5">
              <label data-ev-id="ev_4b7622b01f" className="block text-sm font-medium text-[#1A1A2E] mb-1">Nome completo *</label>
              <input data-ev-id="ev_8bbf47cf7a"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
              errors.nome ? 'border-red-500' : 'border-[#E2E8F0]'}`
              }
              placeholder="Seu nome" />

              {errors.nome && <p data-ev-id="ev_1ea71d5acf" className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div data-ev-id="ev_a04d5c03b9">
              <label data-ev-id="ev_8d4467e36c" className="block text-sm font-medium text-[#1A1A2E] mb-1">Email *</label>
              <input data-ev-id="ev_23fe5c4412"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
              errors.email ? 'border-red-500' : 'border-[#E2E8F0]'}`
              }
              placeholder="seu@email.com" />

              {errors.email && <p data-ev-id="ev_3308d105e5" className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div data-ev-id="ev_eccd4becee">
              <label data-ev-id="ev_90c63a158d" className="block text-sm font-medium text-[#1A1A2E] mb-1">Telefone/WhatsApp *</label>
              <input data-ev-id="ev_3ebab14ec8"
              type="tel"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
              errors.telefone ? 'border-red-500' : 'border-[#E2E8F0]'}`
              }
              placeholder="(00) 00000-0000" />

              {errors.telefone && <p data-ev-id="ev_72216c823e" className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
            </div>

            <div data-ev-id="ev_7e14165efc">
              <label data-ev-id="ev_1634c31915" className="block text-sm font-medium text-[#1A1A2E] mb-1">Mensagem (opcional)</label>
              <textarea data-ev-id="ev_bf2c4ffeb9"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none"
              placeholder="Datas desejadas, número de pessoas, etc." />

            </div>
          </div>

          {/* Buttons */}
          <div data-ev-id="ev_06cab13d23" className="flex flex-col gap-3 mt-6">
            <button data-ev-id="ev_e079584817"
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50">

              {isSubmitting ?
              <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> :

              <><Send className="w-5 h-5" /> Enviar Solicitação</>
              }
            </button>
            
            <button data-ev-id="ev_8e726b5907"
            type="button"
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20BD5A] transition-colors">

              <WhatsAppIcon className="w-5 h-5" /> Chamar no WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>);

}

export default function Ofertas() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { offers, loading, error } = useOffers();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const ofertasDestaque = offers.filter((o) => o.destaque);
  const outrasOfertas = offers.filter((o) => !o.destaque);

  const handleWhatsAppDirect = (oferta: Offer) => {
    const message = `Olá! Tenho interesse no pacote:\n\n*${oferta.titulo}*\nPreço: ${oferta.preco_atual}\n\nPoderia me passar mais informações?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Layout>
      <div data-ev-id="ev_6abde80103" className="min-h-screen bg-[#FAFBFC] pt-24 pb-16">
        <div data-ev-id="ev_09aed073cd" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div data-ev-id="ev_75e0196579" className="text-center mb-12">
            <div data-ev-id="ev_f3fc0873c3" className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-sm font-medium mb-4">
              <Flame className="w-4 h-4" />
              Pacotes exclusivos
            </div>
            <h1 data-ev-id="ev_c6fabe571f" className="text-3xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
              Pacotes de <span data-ev-id="ev_399356f3f5" className="text-[#FF6B35]">Viagem</span>
            </h1>
            <p data-ev-id="ev_41dd94b608" className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Os melhores pacotes nacionais e internacionais selecionados para você
            </p>
          </div>

          {/* Loading */}
          {loading &&
          <div data-ev-id="ev_b4cd944fd0" className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
            </div>
          }

          {/* Error */}
          {error &&
          <div data-ev-id="ev_8913a8ab6f" className="text-center py-20">
              <p data-ev-id="ev_daab72051e" className="text-[#64748B]">Não foi possível carregar os pacotes.</p>
            </div>
          }

          {/* Empty State */}
          {!loading && !error && offers.length === 0 &&
          <div data-ev-id="ev_54bdc5e325" className="text-center py-20">
              <Tag className="w-16 h-16 text-[#E2E8F0] mx-auto mb-4" />
              <h3 data-ev-id="ev_5e016c8884" className="text-xl font-bold text-[#1A1A2E] mb-2">Nenhum pacote disponível</h3>
              <p data-ev-id="ev_536d4ac7b5" className="text-[#64748B]">Em breve teremos novos pacotes para você!</p>
            </div>
          }

          {/* Ofertas em Destaque */}
          {ofertasDestaque.length > 0 &&
          <div data-ev-id="ev_b75c698ed8" className="mb-12">
              <h2 data-ev-id="ev_387e8cfdcf" className="text-xl font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#FF6B35]" />
                Em Destaque
              </h2>
              <div data-ev-id="ev_0abdceba8a" className="grid md:grid-cols-2 gap-6">
                {ofertasDestaque.map((oferta) => {
                const Icon = getTipoIcon(oferta.tipo);
                const isFav = isFavorite(`oferta-${oferta.id}`);
                return (
                  <div data-ev-id="ev_97dd63ff58"
                  key={oferta.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

                      {/* Badge Desconto */}
                      {oferta.desconto &&
                    <div data-ev-id="ev_9bfdb0cb28" className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FF6B35] text-white text-sm font-bold rounded-full">
                          -{oferta.desconto} OFF
                        </div>
                    }

                      {/* Botão Favorito */}
                      <button data-ev-id="ev_5909c538dd"
                    onClick={() => {
                      toggleFavorite({
                        id: `oferta-${oferta.id}`,
                        tipo: oferta.tipo as 'voo' | 'hotel' | 'carro' | 'oferta',
                        titulo: oferta.titulo,
                        descricao: oferta.descricao || '',
                        preco: oferta.preco_atual,
                        imagem: oferta.imagem || '',
                        url: oferta.search_url || '#'
                      });
                    }}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${
                    isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`
                    }>

                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <div data-ev-id="ev_2fefd0448c" className="flex flex-col md:flex-row">
                        {/* Imagem */}
                        <div data-ev-id="ev_f6b5915238" className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                          <img data-ev-id="ev_c565e1e8f2"
                        src={oferta.imagem || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
                        alt={oferta.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                        </div>

                        {/* Conteúdo */}
                        <div data-ev-id="ev_2e890721d5" className="md:w-3/5 p-6">
                          <div data-ev-id="ev_362b2d15d6" className="flex items-center gap-2 text-[#64748B] text-sm mb-2">
                            <Icon className="w-4 h-4" />
                            {getTipoLabel(oferta.tipo)}
                          </div>
                          <h3 data-ev-id="ev_29386d1eee" className="text-xl font-bold text-[#1A1A2E] mb-2">{oferta.titulo}</h3>
                          <p data-ev-id="ev_adbe1d563d" className="text-[#64748B] mb-4 line-clamp-2">{oferta.descricao}</p>

                          <div data-ev-id="ev_fb3d9426b0" className="flex items-end justify-between mb-4">
                            <div data-ev-id="ev_afc080c620">
                              {oferta.preco_original &&
                            <span data-ev-id="ev_aec5abe312" className="text-[#94A3B8] line-through text-sm">
                                  {oferta.preco_original}
                                </span>
                            }
                              <p data-ev-id="ev_63b1173780" className="text-2xl font-bold text-[#FF6B35]">{oferta.preco_atual}</p>
                            </div>
                            {oferta.validade &&
                          <div data-ev-id="ev_436d8d63f0" className="flex items-center gap-1 text-[#64748B] text-sm">
                                <Clock className="w-4 h-4" />
                                {oferta.validade}
                              </div>
                          }
                          </div>

                          {/* Botões */}
                          <div data-ev-id="ev_ce10ad7ef0" className="flex gap-2">
                            <button data-ev-id="ev_71109dff8e"
                          onClick={() => setSelectedOffer(oferta)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors">

                              <Send className="w-4 h-4" /> Solicitar
                            </button>
                            <button data-ev-id="ev_eb9c917234"
                          onClick={() => handleWhatsAppDirect(oferta)}
                          className="px-4 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#20BD5A] transition-colors"
                          title="WhatsApp">

                              <WhatsAppIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>);

              })}
              </div>
            </div>
          }

          {/* Outras Ofertas */}
          {outrasOfertas.length > 0 &&
          <div data-ev-id="ev_864cdc9001">
              <h2 data-ev-id="ev_057b5dcf1b" className="text-xl font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#00B4D8]" />
                Mais Pacotes
              </h2>
              <div data-ev-id="ev_09ef3f110b" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {outrasOfertas.map((oferta) => {
                const Icon = getTipoIcon(oferta.tipo);
                const isFav = isFavorite(`oferta-${oferta.id}`);
                return (
                  <div data-ev-id="ev_1d3953f0a9"
                  key={oferta.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">

                      {/* Imagem */}
                      <div data-ev-id="ev_2eb43597ec" className="relative h-44 overflow-hidden">
                        <img data-ev-id="ev_77a5af6cbc"
                      src={oferta.imagem || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
                      alt={oferta.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />


                        {oferta.desconto &&
                      <div data-ev-id="ev_764389a875" className="absolute top-3 left-3 px-2 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full">
                            -{oferta.desconto}
                          </div>
                      }

                        <button data-ev-id="ev_a635d35582"
                      onClick={() => {
                        toggleFavorite({
                          id: `oferta-${oferta.id}`,
                          tipo: oferta.tipo as 'voo' | 'hotel' | 'carro' | 'oferta',
                          titulo: oferta.titulo,
                          descricao: oferta.descricao || '',
                          preco: oferta.preco_atual,
                          imagem: oferta.imagem || '',
                          url: oferta.search_url || '#'
                        });
                      }}
                      className={`absolute top-3 right-3 p-1.5 rounded-full transition-all ${
                      isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`
                      }>

                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Conteúdo */}
                      <div data-ev-id="ev_935d532f80" className="p-5">
                        <div data-ev-id="ev_1f6efea293" className="flex items-center gap-1 text-[#64748B] text-xs mb-2">
                          <Icon className="w-3 h-3" />
                          {getTipoLabel(oferta.tipo)}
                        </div>
                        <h3 data-ev-id="ev_211c279c37" className="font-bold text-[#1A1A2E] mb-2">{oferta.titulo}</h3>
                        <p data-ev-id="ev_ec1c278ef5" className="text-[#64748B] text-sm mb-3 line-clamp-2">{oferta.descricao}</p>

                        <div data-ev-id="ev_5040ef1252" className="flex items-center justify-between mb-4">
                          <div data-ev-id="ev_5d36d04bc6">
                            {oferta.preco_original &&
                          <span data-ev-id="ev_4d47f91154" className="text-[#94A3B8] line-through text-xs">
                                {oferta.preco_original}
                              </span>
                          }
                            <p data-ev-id="ev_16b31784d6" className="text-[#FF6B35] font-bold text-lg">{oferta.preco_atual}</p>
                          </div>
                          {oferta.validade &&
                        <span data-ev-id="ev_546f795d5b" className="text-[#64748B] text-xs">
                              {oferta.validade}
                            </span>
                        }
                        </div>

                        {/* Botões */}
                        <div data-ev-id="ev_f36387a6ee" className="flex gap-2">
                          <button data-ev-id="ev_afdb366013"
                        onClick={() => setSelectedOffer(oferta)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF6B35] text-white text-sm font-medium rounded-xl hover:bg-[#E55A2B] transition-colors">

                            <Send className="w-4 h-4" /> Solicitar
                          </button>
                          <button data-ev-id="ev_d60809118a"
                        onClick={() => handleWhatsAppDirect(oferta)}
                        className="px-3 py-2.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20BD5A] transition-colors"
                        title="WhatsApp">

                            <WhatsAppIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>);

              })}
              </div>
            </div>
          }
        </div>
      </div>

      {/* Modal de Solicitação */}
      {selectedOffer &&
      <SolicitarModal
        oferta={selectedOffer}
        isOpen={!!selectedOffer}
        onClose={() => setSelectedOffer(null)} />

      }
    </Layout>);

}