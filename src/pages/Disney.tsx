import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useDisneyPackages } from '@/hooks/useDisneyPackages';
import { useDisneyParks } from '@/hooks/useDisneyParks';
import {
  Ticket, Hotel, Car, Plane, Star, Calendar, Users, MapPin,
  Clock, CheckCircle, Send, X, Loader2, Sparkles, Heart,
  Sun, Umbrella, DollarSign, Camera, ShoppingBag } from
'lucide-react';
import { isValidEmail, isValidPhone, sanitizeText, formatPhone } from '@/utils/validation';

const WHATSAPP_NUMBER = '5548998365852';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrenepkw';

function WhatsAppIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_74cdee2725" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path data-ev-id="ev_30c7f0bd21" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>);

}

// Fallback para parques caso não haja dados no banco
const parquesFallback = [
{
  id: '1',
  nome: 'Magic Kingdom',
  descricao: 'O parque mais mágico do mundo com o icônico Castelo da Cinderela',
  imagem: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80',
  destaques: ['Castelo da Cinderela', 'Space Mountain', 'Piratas do Caribe']
},
{
  id: '2',
  nome: 'EPCOT',
  descricao: 'Tecnologia, inovação e cultura de 11 países em um só lugar',
  imagem: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80',
  destaques: ['World Showcase', 'Guardians of the Galaxy', 'Test Track']
},
{
  id: '3',
  nome: 'Hollywood Studios',
  descricao: 'A magia do cinema com Star Wars e Toy Story Land',
  imagem: 'https://images.unsplash.com/photo-1575993231821-5a92a5684105?w=800&q=80',
  destaques: ['Star Wars: Galaxy\'s Edge', 'Tower of Terror', 'Toy Story Land']
},
{
  id: '4',
  nome: 'Animal Kingdom',
  descricao: 'Natureza e aventura com o incrível mundo de Pandora',
  imagem: 'https://images.unsplash.com/photo-1564347214331-231060420e78?w=800&q=80',
  destaques: ['Pandora - Avatar', 'Kilimanjaro Safaris', 'Expedition Everest']
}];


// Pacotes de fallback caso não haja dados no banco
const pacotesFallback = [
{
  id: '1',
  nome: 'Pacote Mágico',
  dias: '7 dias / 6 noites',
  inclui: ['Passagem aérea', '6 noites de hotel', '4 dias de parque', 'Traslado aeroporto'],
  preco: 'A partir de R$ 8.990',
  destaque: false
},
{
  id: '2',
  nome: 'Pacote Encantado',
  dias: '10 dias / 9 noites',
  inclui: ['Passagem aérea', '9 noites de hotel', '6 dias de parque', 'Aluguel de carro', 'Seguro viagem'],
  preco: 'A partir de R$ 12.990',
  destaque: true
},
{
  id: '3',
  nome: 'Pacote Família',
  dias: '8 dias / 7 noites',
  inclui: ['Passagem aérea (4 pessoas)', '7 noites de hotel', '5 dias de parque', 'Carro SUV', 'Seguro viagem'],
  preco: 'A partir de R$ 32.990',
  destaque: false
}];


const hoteis = [
{ nome: 'Hotéis dentro da Disney', descricao: 'Experiência completa com transporte e magia 24h', icone: '🏰' },
{ nome: 'Hotéis parceiros', descricao: 'Excelênte custo-benefício próximos aos parques', icone: '🏨' },
{ nome: 'Casas e apartamentos', descricao: 'Ideal para famílias grandes com mais espaço', icone: '🏠' }];


const dicas = [
{ icone: Sun, titulo: 'Melhor Época', descricao: 'Setembro a novembro: menos filas e clima agradável' },
{ icone: Calendar, titulo: 'Quantos Dias', descricao: 'Mínimo 5 dias para conhecer os 4 parques principais' },
{ icone: DollarSign, titulo: 'Orçamento', descricao: 'Reserve USD 100-150 por pessoa/dia para alimentação e extras' },
{ icone: Camera, titulo: 'Memory Maker', descricao: 'Compre o pacote de fotos e tenha registros profissionais' },
{ icone: ShoppingBag, titulo: 'Compras', descricao: 'Os outlets de Orlando têm preços incríveis' },
{ icone: Umbrella, titulo: 'Prepare-se', descricao: 'Leve capa de chuva e calçados confortáveis' }];


const faqs = [
{
  pergunta: 'Qual a melhor época para ir à Disney?',
  resposta: 'As melhores épocas são setembro a novembro e janeiro a fevereiro (exceto feriados). Menos filas, clima agradável e preços mais acessíveis.'
},
{
  pergunta: 'Quantos dias preciso para conhecer tudo?',
  resposta: 'Recomendamos no mínimo 5 dias de parque: 1 dia para cada parque da Disney (4) e 1 dia para Universal ou descanso. Para uma experiência completa, 7-8 dias é ideal.'
},
{
  pergunta: 'Vale a pena alugar carro em Orlando?',
  resposta: 'Sim! Orlando é uma cidade espalhada e ter carro dá liberdade para ir a outlets, restaurantes e outros parques. Além disso, o aluguel é bem acessível.'
},
{
  pergunta: 'Qual hotel escolher: dentro ou fora da Disney?',
  resposta: 'Hotéis dentro da Disney oferecem transporte gratuito, entrada antecipada nos parques e imersão total. Hotéis fora são mais baratos e oferecem mais opções de alimentação.'
},
{
  pergunta: 'Como funciona o Lightning Lane?',
  resposta: 'É o sistema de fura-fila da Disney. Você pode comprar o Lightning Lane Multi Pass (acesso a várias atrações) ou Single Pass (atrações específicas). Recomendamos para alta temporada.'
},
{
  pergunta: 'Preciso de visto para os EUA?',
  resposta: 'Sim, brasileiros precisam de visto americano (B1/B2). O processo leva algumas semanas, então planeje com antecedência. Podemos ajudar com dicas para a entrevista!'
}];


function OrcamentoModal({ isOpen, onClose }: {isOpen: boolean;onClose: () => void;}) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    adultos: '2',
    criancas: '0',
    dataViagem: '',
    dias: '7',
    mensagem: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';else
    if (!isValidEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';else
    if (!isValidPhone(formData.telefone)) newErrors.telefone = 'Telefone inválido';
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
          adultos: formData.adultos,
          criancas: formData.criancas,
          data_viagem: formData.dataViagem,
          dias: formData.dias,
          mensagem: sanitizeText(formData.mensagem),
          tipo: 'Orçamento Disney',
          _subject: `Orçamento Disney - ${formData.nome}`
        })
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Olá! Quero um orçamento para Disney:\n\n👥 ${formData.adultos} adultos, ${formData.criancas} crianças\n📅 Data: ${formData.dataViagem || 'A definir'}\n🏖️ ${formData.dias} dias\n\n${formData.mensagem || 'Aguardo contato!'}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (submitted) {
    return (
      <div data-ev-id="ev_6990d67a6b" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div data-ev-id="ev_1557d18cce" className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div data-ev-id="ev_12a05e6e75" className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 data-ev-id="ev_9e7bd4e210" className="text-xl font-bold text-[#1A1A2E] mb-2">Orçamento Solicitado! 🏰</h3>
          <p data-ev-id="ev_9dfa90c12d" className="text-[#64748B] mb-6">
            Recebemos seu pedido! Nossa equipe vai preparar um orçamento personalizado e entrará em contato em breve.
          </p>
          <button data-ev-id="ev_43e36f3fcb" onClick={onClose} className="px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors">
            Fechar
          </button>
        </div>
      </div>);

  }

  return (
    <div data-ev-id="ev_1ae6106305" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div data-ev-id="ev_e99a88ea2f" className="bg-white rounded-2xl max-w-lg w-full my-8">
        <div data-ev-id="ev_65ac173fd5" className="p-6 border-b border-[#E2E8F0]">
          <div data-ev-id="ev_cce57d2b6e" className="flex items-center justify-between">
            <h3 data-ev-id="ev_58ddeaeddf" className="text-xl font-bold text-[#1A1A2E]">🏰 Orçamento Disney</h3>
            <button data-ev-id="ev_79f2404242" onClick={onClose} className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors">
              <X className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>
        </div>

        <form data-ev-id="ev_c2185aca57" onSubmit={handleSubmit} className="p-6">
          <input data-ev-id="ev_47a43e3377" type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div data-ev-id="ev_b62a8c6721" className="flex flex-col gap-4">
            <div data-ev-id="ev_4834e1f228">
              <label data-ev-id="ev_c407129eaa" className="block text-sm font-medium text-[#1A1A2E] mb-1">Nome completo *</label>
              <input data-ev-id="ev_582e7a2a57" type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${errors.nome ? 'border-red-500' : 'border-[#E2E8F0]'}`} placeholder="Seu nome" />
              {errors.nome && <p data-ev-id="ev_a2d14b562f" className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div data-ev-id="ev_7b78cec3cb" className="grid grid-cols-2 gap-4">
              <div data-ev-id="ev_39eb291382">
                <label data-ev-id="ev_37f35b8040" className="block text-sm font-medium text-[#1A1A2E] mb-1">Email *</label>
                <input data-ev-id="ev_fffb11981f" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${errors.email ? 'border-red-500' : 'border-[#E2E8F0]'}`} placeholder="seu@email.com" />
                {errors.email && <p data-ev-id="ev_edecc2df69" className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div data-ev-id="ev_3f32399df5">
                <label data-ev-id="ev_a80910028f" className="block text-sm font-medium text-[#1A1A2E] mb-1">Telefone *</label>
                <input data-ev-id="ev_ab28ac49c7" type="tel" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${errors.telefone ? 'border-red-500' : 'border-[#E2E8F0]'}`} placeholder="(00) 00000-0000" />
                {errors.telefone && <p data-ev-id="ev_b05abc3e99" className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
              </div>
            </div>

            <div data-ev-id="ev_3a0a14f2ae" className="grid grid-cols-2 gap-4">
              <div data-ev-id="ev_53a62c7a07">
                <label data-ev-id="ev_9983ea3949" className="block text-sm font-medium text-[#1A1A2E] mb-1">Adultos</label>
                <select data-ev-id="ev_0a1595c9cc" value={formData.adultos} onChange={(e) => setFormData({ ...formData, adultos: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option data-ev-id="ev_099a8e03fc" key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div data-ev-id="ev_540d8aeedc">
                <label data-ev-id="ev_beaaed593d" className="block text-sm font-medium text-[#1A1A2E] mb-1">Crianças</label>
                <select data-ev-id="ev_41835d1ca2" value={formData.criancas} onChange={(e) => setFormData({ ...formData, criancas: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                  {[0, 1, 2, 3, 4, 5].map((n) => <option data-ev-id="ev_59aeee5605" key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div data-ev-id="ev_6bf3e5acd8" className="grid grid-cols-2 gap-4">
              <div data-ev-id="ev_00123fa5af">
                <label data-ev-id="ev_cd99d80d4b" className="block text-sm font-medium text-[#1A1A2E] mb-1">Data da viagem</label>
                <input data-ev-id="ev_2053e29762" type="date" value={formData.dataViagem} onChange={(e) => setFormData({ ...formData, dataViagem: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
              </div>
              <div data-ev-id="ev_6431973cc5">
                <label data-ev-id="ev_cef0d9f45f" className="block text-sm font-medium text-[#1A1A2E] mb-1">Quantos dias</label>
                <select data-ev-id="ev_488ab32b9a" value={formData.dias} onChange={(e) => setFormData({ ...formData, dias: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                  {[5, 6, 7, 8, 9, 10, 12, 14].map((n) => <option data-ev-id="ev_962a0a7c30" key={n} value={n}>{n} dias</option>)}
                </select>
              </div>
            </div>

            <div data-ev-id="ev_8ebb4634bc">
              <label data-ev-id="ev_7fea51283e" className="block text-sm font-medium text-[#1A1A2E] mb-1">Observações</label>
              <textarea data-ev-id="ev_e8c4f751f5" value={formData.mensagem} onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })} rows={3} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none" placeholder="Hotel preferido, outros parques, etc." />
            </div>
          </div>

          <div data-ev-id="ev_d41fa1a247" className="flex flex-col gap-3 mt-6">
            <button data-ev-id="ev_37737ffc19" type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Solicitar Orçamento</>}
            </button>
            <button data-ev-id="ev_b5c413f097" type="button" onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20BD5A] transition-colors">
              <WhatsAppIcon className="w-5 h-5" /> Falar no WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>);

}

export default function Disney() {
  const [modalOpen, setModalOpen] = useState(false);
  const { packages: dbPackages, loading: packagesLoading } = useDisneyPackages();
  const { parks: dbParks, loading: parksLoading } = useDisneyParks();

  // Usa pacotes do banco se disponíveis, senão usa fallback
  const pacotes = dbPackages.length > 0 ? dbPackages.map((pkg) => ({
    id: pkg.id,
    nome: pkg.nome,
    dias: pkg.dias,
    inclui: pkg.inclui ?? [],
    preco: pkg.preco,
    destaque: pkg.destaque ?? false
  })) : pacotesFallback;

  // Usa parques do banco se disponíveis, senão usa fallback
  const parques = dbParks.length > 0 ? dbParks.map((park) => ({
    id: park.id,
    nome: park.nome,
    descricao: park.descricao ?? '',
    imagem: park.imagem ?? '',
    destaques: park.destaques ?? []
  })) : parquesFallback;

  const handleWhatsApp = (assunto: string) => {
    const message = `Olá! Tenho interesse em ${assunto} para Disney. Pode me ajudar?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Layout>
      <div data-ev-id="ev_dde46c2c97" className="pt-16">
        {/* Hero */}
        <section data-ev-id="ev_d846beb894" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div data-ev-id="ev_df8fc797c9" className="absolute inset-0">
            <img data-ev-id="ev_e07a672256"
            src="https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1920&q=80"
            alt="Disney Castle"
            className="w-full h-full object-cover" />

            <div data-ev-id="ev_bcb7a240e0" className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 via-[#1A1A2E]/70 to-[#1A1A2E]/50" />
          </div>
          
          <div data-ev-id="ev_1b9d33ab01" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div data-ev-id="ev_b324590d3e" className="max-w-3xl">
              <div data-ev-id="ev_d6a6983021" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Realize o sonho da sua família
              </div>
              <h1 data-ev-id="ev_514cff9afb" className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Viva a magia da
                <span data-ev-id="ev_0d5dab5f59" className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD166]">
                  Disney Orlando
                </span>
              </h1>
              <p data-ev-id="ev_b05ba82b4e" className="text-xl text-white/80 mb-8 leading-relaxed">
                Pacotes completos com passagem, hotel, ingressos e carro. 
                Planejamos cada detalhe para você só se preocupar em se divertir!
              </p>
              <div data-ev-id="ev_a2d1b6a221" className="flex flex-wrap gap-4">
                <button data-ev-id="ev_ff58abf2d5"
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#FF6B35]/30 hover:scale-105 transition-all">

                  <Ticket className="w-5 h-5" />
                  Quero meu orçamento
                </button>
                <button data-ev-id="ev_7aa79a73b9"
                onClick={() => handleWhatsApp('pacotes')}
                className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all">

                  <WhatsAppIcon className="w-5 h-5" />
                  Falar com especialista
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div data-ev-id="ev_f2867a904f" className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E] to-transparent py-8">
            <div data-ev-id="ev_2cffe8800a" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div data-ev-id="ev_91db0a1ca6" className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                <div data-ev-id="ev_2e855ebe39"><p data-ev-id="ev_4bd4ac2da1" className="text-3xl font-bold text-[#FF6B35]">500+</p><p data-ev-id="ev_cee3ee2427" className="text-white/60 text-sm">Famílias atendidas</p></div>
                <div data-ev-id="ev_989e15f4b7"><p data-ev-id="ev_59e4caa5be" className="text-3xl font-bold text-[#FF6B35]">4.9</p><p data-ev-id="ev_49342d8b34" className="text-white/60 text-sm">Avaliação média</p></div>
                <div data-ev-id="ev_1ca93bebbb"><p data-ev-id="ev_f989bce91f" className="text-3xl font-bold text-[#FF6B35]">10+</p><p data-ev-id="ev_b54d6f3b4f" className="text-white/60 text-sm">Anos de experiência</p></div>
                <div data-ev-id="ev_add35fc251"><p data-ev-id="ev_f0045cbc6b" className="text-3xl font-bold text-[#FF6B35]">24h</p><p data-ev-id="ev_ce94bf9cbe" className="text-white/60 text-sm">Suporte na viagem</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Parques */}
        <section data-ev-id="ev_e45a7108bf" className="py-20 bg-white">
          <div data-ev-id="ev_38bd47226d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_2d045800e7" className="text-center mb-12">
              <h2 data-ev-id="ev_b59265c39e" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Os 4 Parques <span data-ev-id="ev_d323b1908d" className="text-[#FF6B35]">Mágicos</span>
              </h2>
              <p data-ev-id="ev_fc98401ce9" className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Cada parque da Disney é uma experiência única e inesquecível
              </p>
            </div>

            <div data-ev-id="ev_dd6b0d4d3d" className="grid md:grid-cols-2 gap-6">
              {parksLoading ?
              <div data-ev-id="ev_5df326a5dc" className="col-span-2 text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35] mx-auto" />
                  <p data-ev-id="ev_abba75d627" className="text-[#64748B] mt-2">Carregando parques...</p>
                </div> :
              parques.map((parque) =>
              <div data-ev-id="ev_efbbb1e2f5" key={parque.id} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#1E293B]">
                  {/* Imagem */}
                  <div data-ev-id="ev_79e26e50ec" className="aspect-video overflow-hidden relative">
                    <img data-ev-id="ev_a8a14f9b8c" src={parque.imagem} alt={parque.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div data-ev-id="ev_d6157aee7f" className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />
                  </div>
                  
                  {/* Conteúdo - abaixo da imagem, expande no hover */}
                  <div data-ev-id="ev_b6987cc343" className="p-6 transition-all duration-500">
                    <h3 data-ev-id="ev_79e845a9b5" className="text-2xl font-bold text-white mb-3">{parque.nome}</h3>
                    
                    {/* Descrição - altura limitada por padrão, expande no hover */}
                    <div data-ev-id="ev_0925d20e65" className="overflow-hidden transition-all duration-500 max-h-[3.5rem] group-hover:max-h-[500px]">
                      <p data-ev-id="ev_e8a24557e6" className="text-[#94A3B8] leading-relaxed">
                        {parque.descricao}
                      </p>
                    </div>
                    
                    {/* Indicador "Ver mais" - some no hover */}
                    <div data-ev-id="ev_4fb14f1b20" className="flex items-center gap-2 mt-2 text-[#FF6B35] text-sm group-hover:hidden transition-all">
                      <span data-ev-id="ev_e495da86ad">Ver descrição completa</span>
                      <span data-ev-id="ev_e860db0634">→</span>
                    </div>
                    
                    {/* Badges - aparecem no hover */}
                    <div data-ev-id="ev_b7d9ac5e15" className="flex flex-wrap gap-2 mt-4 overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100">
                      {parque.destaques.map((destaque, i) =>
                    <span data-ev-id="ev_9a67ad902d" key={i} className="px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-medium rounded-full">
                          {destaque}
                        </span>
                    )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!parksLoading &&
            <div data-ev-id="ev_8ec68b3309" className="text-center mt-10">
                <button data-ev-id="ev_632b6b7511"
              onClick={() => handleWhatsApp('ingressos para os parques')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-full hover:bg-[#E55A2B] transition-colors">
                  <Ticket className="w-5 h-5" />
                  Consultar ingressos
                </button>
              </div>
            }
          </div>
        </section>

        {/* Pacotes */}
        <section data-ev-id="ev_453b1ec06f" className="py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
          <div data-ev-id="ev_a2ff2cf706" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_b0127a174a" className="text-center mb-12">
              <h2 data-ev-id="ev_247f9c7b32" className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Pacotes <span data-ev-id="ev_a1df41e821" className="text-[#FF6B35]">Completos</span>
              </h2>
              <p data-ev-id="ev_ed00a03753" className="text-white/70 text-lg max-w-2xl mx-auto">
                Tudo incluso para você só se preocupar em aproveitar
              </p>
            </div>

            <div data-ev-id="ev_66aecf84b8" className="grid md:grid-cols-3 gap-6">
              {packagesLoading ?
              <div data-ev-id="ev_4b2aaa25f2" className="col-span-3 text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35] mx-auto" />
                  <p data-ev-id="ev_aeb312fc8a" className="text-white/70 mt-2">Carregando pacotes...</p>
                </div> :
              pacotes.map((pacote) =>
              <div data-ev-id="ev_66beb55819" key={pacote.id} className={`relative bg-white rounded-2xl p-6 ${pacote.destaque ? 'ring-2 ring-[#FF6B35] scale-105' : ''}`}>
                  {pacote.destaque &&
                <div data-ev-id="ev_084d1587e0" className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF6B35] text-white text-sm font-bold rounded-full">
                      Mais vendido
                    </div>
                }
                  <h3 data-ev-id="ev_c10ea1069e" className="text-xl font-bold text-[#1A1A2E] mb-2">{pacote.nome}</h3>
                  <p data-ev-id="ev_3f5e8f5252" className="text-[#64748B] text-sm mb-4 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {pacote.dias}
                  </p>
                  <ul data-ev-id="ev_b6d3db7dec" className="flex flex-col gap-2 mb-6">
                    {pacote.inclui.map((item, i) =>
                  <li data-ev-id="ev_719736bcae" key={i} className="flex items-center gap-2 text-[#64748B] text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" /> {item}
                      </li>
                  )}
                  </ul>
                  <p data-ev-id="ev_f77fbd6b51" className="text-2xl font-bold text-[#FF6B35] mb-4">{pacote.preco}</p>
                  <button data-ev-id="ev_803a6cd5dd"
                onClick={() => setModalOpen(true)}
                className="w-full py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors">

                    Solicitar orçamento
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Hospedagem */}
        <section data-ev-id="ev_19a791a45d" className="py-20 bg-white">
          <div data-ev-id="ev_fdd58889b7" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_dc89346de8" className="text-center mb-12">
              <h2 data-ev-id="ev_99b834c604" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                <Hotel className="inline w-8 h-8 text-[#FF6B35] mr-2" />
                Hospedagem
              </h2>
              <p data-ev-id="ev_5d5bb2b170" className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Opções para todos os estilos e orçamentos
              </p>
            </div>

            <div data-ev-id="ev_b36de0f9b4" className="grid md:grid-cols-3 gap-6">
              {hoteis.map((hotel, index) =>
              <div data-ev-id="ev_ddd64b42c2" key={index} className="bg-[#FAFBFC] rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <div data-ev-id="ev_56ad98ba27" className="text-5xl mb-4">{hotel.icone}</div>
                  <h3 data-ev-id="ev_35466a24dd" className="text-xl font-bold text-[#1A1A2E] mb-2">{hotel.nome}</h3>
                  <p data-ev-id="ev_55f36b574a" className="text-[#64748B]">{hotel.descricao}</p>
                </div>
              )}
            </div>

            <div data-ev-id="ev_c806c82269" className="text-center mt-10">
              <button data-ev-id="ev_fef492f708"
              onClick={() => handleWhatsApp('hospedagem em Orlando')}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FF6B35] text-[#FF6B35] font-medium rounded-full hover:bg-[#FF6B35] hover:text-white transition-colors">

                <Hotel className="w-5 h-5" />
                Ver opções de hotéis
              </button>
            </div>
          </div>
        </section>

        {/* Aluguel de Carro */}
        <section data-ev-id="ev_cd83351447" className="py-20 bg-[#FAFBFC]">
          <div data-ev-id="ev_7d31e6dadf" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_737271288a" className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-ev-id="ev_35c70e9533">
                <h2 data-ev-id="ev_a3f39a389b" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                  <Car className="inline w-8 h-8 text-[#FF6B35] mr-2" />
                  Aluguel de Carro
                </h2>
                <p data-ev-id="ev_805cbecfd1" className="text-[#64748B] text-lg mb-6">
                  Ter um carro em Orlando é essencial! A cidade é espalhada e você vai querer liberdade para ir aos outlets, restaurantes e explorar a região.
                </p>
                <ul data-ev-id="ev_2c6dfe8ed5" className="flex flex-col gap-3 mb-8">
                  <li data-ev-id="ev_8f7d6307c3" className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Melhores preços com locadoras parceiras</li>
                  <li data-ev-id="ev_f2e97051f8" className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Seguro completo incluso</li>
                  <li data-ev-id="ev_658a7a768e" className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Retirada e devolução no aeroporto</li>
                  <li data-ev-id="ev_43679a511f" className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Carros para todos os tamanhos de família</li>
                </ul>
                <button data-ev-id="ev_9093c8f66c"
                onClick={() => handleWhatsApp('aluguel de carro em Orlando')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-full hover:bg-[#E55A2B] transition-colors">

                  <Car className="w-5 h-5" />
                  Cotar aluguel de carro
                </button>
              </div>
              <div data-ev-id="ev_cfb82888cf">
                <img data-ev-id="ev_9261cd6821"
                src="https://images.unsplash.com/photo-1449965408869-ebd3fee52887?w=800&q=80"
                alt="Carro em Orlando"
                className="rounded-2xl shadow-xl" />

              </div>
            </div>
          </div>
        </section>

        {/* Dicas */}
        <section data-ev-id="ev_2377d32cd7" className="py-20 bg-white">
          <div data-ev-id="ev_d740e76218" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_3d3422d139" className="text-center mb-12">
              <h2 data-ev-id="ev_0742aed085" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Dicas de <span data-ev-id="ev_9cdff41dfd" className="text-[#FF6B35]">Ouro</span>
              </h2>
              <p data-ev-id="ev_b759f539c5" className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Tudo que você precisa saber para aproveitar ao máximo
              </p>
            </div>

            <div data-ev-id="ev_75181451f1" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dicas.map((dica, index) => {
                const Icon = dica.icone;
                return (
                  <div data-ev-id="ev_cc725396e1" key={index} className="bg-[#FAFBFC] rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div data-ev-id="ev_ccc7acc511" className="w-12 h-12 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <h3 data-ev-id="ev_2c7743bec6" className="text-lg font-bold text-[#1A1A2E] mb-2">{dica.titulo}</h3>
                    <p data-ev-id="ev_454ae115f4" className="text-[#64748B]">{dica.descricao}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section data-ev-id="ev_6035b5a456" className="py-20 bg-[#FAFBFC]">
          <div data-ev-id="ev_0a5f4b1fab" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_4e806a1ed1" className="text-center mb-12">
              <h2 data-ev-id="ev_304b62e81b" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Dúvidas <span data-ev-id="ev_5b621df791" className="text-[#FF6B35]">Frequentes</span>
              </h2>
            </div>

            <div data-ev-id="ev_254e533229" className="flex flex-col gap-4">
              {faqs.map((faq, index) =>
              <details data-ev-id="ev_b552a41c64" key={index} className="group bg-white rounded-xl p-6 cursor-pointer shadow-sm">
                  <summary data-ev-id="ev_9b0f8d9a7c" className="flex items-center justify-between font-semibold text-[#1A1A2E] list-none">
                    {faq.pergunta}
                    <span data-ev-id="ev_60b22d1506" className="ml-4 text-[#FF6B35] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p data-ev-id="ev_21e8857414" className="mt-4 text-[#64748B] leading-relaxed">{faq.resposta}</p>
                </details>
              )}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section data-ev-id="ev_59101d64f4" className="py-20 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C]">
          <div data-ev-id="ev_38eed7e946" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 data-ev-id="ev_b7cb680e47" className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pronto para realizar o sonho? 🏰✨
            </h2>
            <p data-ev-id="ev_5463a0eeba" className="text-white/90 text-lg mb-8">
              Solicite seu orçamento personalizado agora e deixe a Vootrip cuidar de tudo!
            </p>
            <div data-ev-id="ev_2a76d3277c" className="flex flex-wrap justify-center gap-4">
              <button data-ev-id="ev_65c49fa3a0"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B35] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all">

                <Send className="w-5 h-5" />
                Solicitar orçamento
              </button>
              <button data-ev-id="ev_05b6b80a78"
              onClick={() => handleWhatsApp('pacotes Disney')}
              className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all">

                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </button>
            </div>
          </div>
        </section>
      </div>

      <OrcamentoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Layout>);

}
