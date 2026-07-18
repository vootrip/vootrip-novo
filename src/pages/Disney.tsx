import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useDisneyPackages } from '@/hooks/useDisneyPackages';
import { useDisneyParks } from '@/hooks/useDisneyParks';
import {
  Ticket, Hotel, Car, Plane, Star, Calendar, Users, MapPin,
  Clock, CheckCircle, Send, X, Loader2, Sparkles, Heart,
  Sun, Umbrella, DollarSign, Camera, ShoppingBag
} from 'lucide-react';
import { isValidEmail, isValidPhone, sanitizeText, formatPhone } from '@/utils/validation';

const WHATSAPP_NUMBER = '5548998365852';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrenepkw';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
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
    destaques: ["Star Wars: Galaxy's Edge", 'Tower of Terror', 'Toy Story Land']
  },
  {
    id: '4',
    nome: 'Animal Kingdom',
    descricao: 'Natureza e aventura com o incrível mundo de Pandora',
    imagem: 'https://images.unsplash.com/photo-1564347214331-231060420e78?w=800&q=80',
    destaques: ['Pandora - Avatar', 'Kilimanjaro Safaris', 'Expedition Everest']
  }
];

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
  }
];

const hoteis = [
  { nome: 'Hotéis dentro da Disney', descricao: 'Experiência completa com transporte e magia 24h', icone: '🏰' },
  { nome: 'Hotéis parceiros', descricao: 'Excelênte custo-benefício próximos aos parques', icone: '🏨' },
  { nome: 'Casas e apartamentos', descricao: 'Ideal para famílias grandes com mais espaço', icone: '🏠' }
];

const dicas = [
  { icone: Sun, titulo: 'Melhor Época', descricao: 'Setembro a novembro: menos filas e clima agradável' },
  { icone: Calendar, titulo: 'Quantos Dias', descricao: 'Mínimo 5 dias para conhecer os 4 parques principais' },
  { icone: DollarSign, titulo: 'Orçamento', descricao: 'Reserve USD 100-150 por pessoa/dia para alimentação e extras' },
  { icone: Camera, titulo: 'Memory Maker', descricao: 'Compre o pacote de fotos e tenha registros profissionais' },
  { icone: ShoppingBag, titulo: 'Compras', descricao: 'Os outlets de Orlando têm preços incríveis' },
  { icone: Umbrella, titulo: 'Prepare-se', descricao: 'Leve capa de chuva e calçados confortáveis' }
];

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
  }
];

// Simulador Interativo de Pacotes
function SimuladorPacote() {
  const [simulador, setSimulador] = useState({
    adultos: 2,
    criancas: 0,
    mes: '',
    diasParque: 4,
    hotel: 'moderado',
    refeicoes: false,
    ingressos: true,
    whatsapp: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleSubmit = () => {
    if (!simulador.whatsapp || !simulador.mes) {
      alert('Por favor, preencha seu WhatsApp e o mês da viagem.');
      return;
    }

    setEnviando(true);

    const mensagem = `🏰 *COTAÇÃO DISNEY - VOOTRIP*

👥 *Viajantes:*
• ${simulador.adultos} adulto(s)
• ${simulador.criancas} criança(s)

📅 *Período:* ${simulador.mes}

🎢 *Dias de Parque:* ${simulador.diasParque} dias

🏨 *Hotel:* ${simulador.hotel === 'economico' ? 'Econômico (All-Star, Pop Century)' : simulador.hotel === 'moderado' ? 'Moderado (Caribbean Beach, Coronado)' : 'Luxo (Grand Floridian, Contemporary)'}

🎟️ *Ingressos Disney:* ${simulador.ingressos ? 'Sim' : 'Não'}

🍽️ *Plano de Refeições:* ${simulador.refeicoes ? 'Sim' : 'Não'}

📱 *WhatsApp:* ${simulador.whatsapp}

Aguardo o orçamento! 🙏`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`, '_blank');

    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 1000);
  };

  if (enviado) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Solicitação Enviada!</h2>
            <p className="text-white/70 text-lg mb-8">
              Recebemos seu pedido de cotação. Nossa equipe vai analisar e enviar o orçamento personalizado em até 24 horas!
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="px-8 py-3 bg-[#FF6B35] text-white font-medium rounded-full hover:bg-[#E55A2B] transition-colors"
            >
              Fazer nova cotação
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/20 text-[#FF6B35] rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Simulador Exclusivo
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Monte seu <span className="text-[#FF6B35]">Pacote Disney</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Personalize sua viagem e receba um orçamento sob medida em minutos
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Coluna 1 */}
            <div className="flex flex-col gap-6">
              {/* Viajantes */}
              <div>
                <label className="flex items-center gap-2 text-white font-medium mb-3">
                  <Users className="w-5 h-5 text-[#FF6B35]" />
                  Quantos vão viajar?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/60 text-sm">Adultos</span>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        onClick={() => setSimulador(s => ({ ...s, adultos: Math.max(1, s.adultos - 1) }))}
                        className="w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-white w-8 text-center">{simulador.adultos}</span>
                      <button
                        onClick={() => setSimulador(s => ({ ...s, adultos: Math.min(10, s.adultos + 1) }))}
                        className="w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Crianças (até 9)</span>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        onClick={() => setSimulador(s => ({ ...s, criancas: Math.max(0, s.criancas - 1) }))}
                        className="w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-white w-8 text-center">{simulador.criancas}</span>
                      <button
                        onClick={() => setSimulador(s => ({ ...s, criancas: Math.min(10, s.criancas + 1) }))}
                        className="w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mês */}
              <div>
                <label className="flex items-center gap-2 text-white font-medium mb-3">
                  <Calendar className="w-5 h-5 text-[#FF6B35]" />
                  Quando quer viajar?
                </label>
                <select
                  value={simulador.mes}
                  onChange={(e) => setSimulador(s => ({ ...s, mes: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-800">Selecione o mês...</option>
                  {meses.map(mes => (
                    <option key={mes} value={mes} className="text-gray-800">{mes} 2025</option>
                  ))}
                </select>
              </div>

              {/* Dias de parque */}
              <div>
                <label className="flex items-center gap-2 text-white font-medium mb-3">
                  <Ticket className="w-5 h-5 text-[#FF6B35]" />
                  Quantos dias de parque?
                </label>
                <div className="flex gap-2">
                  {[3, 4, 5, 6, 7].map(dias => (
                    <button
                      key={dias}
                      onClick={() => setSimulador(s => ({ ...s, diasParque: dias }))}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        simulador.diasParque === dias
                          ? 'bg-[#FF6B35] text-white scale-105'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {dias}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="flex flex-col gap-6">
              {/* Hotel */}
              <div>
                <label className="flex items-center gap-2 text-white font-medium mb-3">
                  <Hotel className="w-5 h-5 text-[#FF6B35]" />
                  Categoria do hotel?
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'economico', label: '💰 Econômico', desc: 'All-Star, Pop Century' },
                    { id: 'moderado', label: '⭐ Moderado', desc: 'Caribbean Beach, Coronado' },
                    { id: 'luxo', label: '👑 Luxo', desc: 'Grand Floridian, Contemporary' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSimulador(s => ({ ...s, hotel: opt.id }))}
                      className={`p-4 rounded-xl text-left transition-all ${
                        simulador.hotel === opt.id
                          ? 'bg-[#FF6B35] text-white ring-2 ring-[#FF6B35] ring-offset-2 ring-offset-transparent'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-sm opacity-70 ml-2">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Opcionais */}
              <div>
                <label className="text-white font-medium mb-3 block">Incluir no pacote:</label>
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    simulador.ingressos ? 'bg-[#FF6B35]/30 ring-2 ring-[#FF6B35]' : 'bg-white/20'
                  }`}>
                    <input
                      type="checkbox"
                      checked={simulador.ingressos}
                      onChange={(e) => setSimulador(s => ({ ...s, ingressos: e.target.checked }))}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-white">🎟️ Ingressos dos parques</span>
                  </label>
                  <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    simulador.refeicoes ? 'bg-[#FF6B35]/30 ring-2 ring-[#FF6B35]' : 'bg-white/20'
                  }`}>
                    <input
                      type="checkbox"
                      checked={simulador.refeicoes}
                      onChange={(e) => setSimulador(s => ({ ...s, refeicoes: e.target.checked }))}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-white">🍽️ Plano de refeições Disney</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp e Botão */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="max-w-md mx-auto">
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                Seu WhatsApp para contato
              </label>
              <input
                type="tel"
                value={simulador.whatsapp}
                onChange={(e) => setSimulador(s => ({ ...s, whatsapp: formatPhone(e.target.value) }))}
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-4 bg-white/20 text-white placeholder-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-center text-lg"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={enviando}
              className="w-full mt-6 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {enviando ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Enviando...</>
              ) : (
                <><Sparkles className="w-6 h-6" /> Receber Minha Cotação</>)
              }
            </button>

            <p className="text-center text-white/50 text-sm mt-4">
              Resposta em até 2 horas • Sem compromisso • 100% personalizado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrcamentoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    else if (!isValidPhone(formData.telefone)) newErrors.telefone = 'Telefone inválido';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">Orçamento Solicitado! 🏰</h3>
          <p className="text-[#64748B] mb-6">
            Recebemos seu pedido! Nossa equipe vai preparar um orçamento personalizado e entrará em contato em breve.
          </p>
          <button onClick={onClose} className="px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors">
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full my-8">
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#1A1A2E]">🏰 Orçamento Disney</h3>
            <button onClick={onClose} className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors">
              <X className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Nome completo *</label>
              <input type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${errors.nome ? 'border-red-500' : 'border-[#E2E8F0]'}`} placeholder="Seu nome" />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${errors.email ? 'border-red-500' : 'border-[#E2E8F0]'}`} placeholder="seu@email.com" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Telefone *</label>
                <input type="tel" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${errors.telefone ? 'border-red-500' : 'border-[#E2E8F0]'}`} placeholder="(00) 00000-0000" />
                {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Adultos</label>
                <select value={formData.adultos} onChange={(e) => setFormData({ ...formData, adultos: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Crianças</label>
                <select value={formData.criancas} onChange={(e) => setFormData({ ...formData, criancas: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                  {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Data da viagem</label>
                <input type="date" value={formData.dataViagem} onChange={(e) => setFormData({ ...formData, dataViagem: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Quantos dias</label>
                <select value={formData.dias} onChange={(e) => setFormData({ ...formData, dias: e.target.value })} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                  {[5, 6, 7, 8, 9, 10, 12, 14].map((n) => <option key={n} value={n}>{n} dias</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Observações</label>
              <textarea value={formData.mensagem} onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })} rows={3} className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none" placeholder="Hotel preferido, outros parques, etc." />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Solicitar Orçamento</>}
            </button>
            <button type="button" onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20BD5A] transition-colors">
              <WhatsAppIcon className="w-5 h-5" /> Falar no WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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
      <div className="pt-16">
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1920&q=80"
              alt="Disney Castle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 via-[#1A1A2E]/70 to-[#1A1A2E]/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Realize o sonho da sua família
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Viva a magia da
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD166]">
                  Disney Orlando
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Pacotes completos com passagem, hotel, ingressos e carro.
                Planejamos cada detalhe para você só se preocupar em se divertir!
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#FF6B35]/30 hover:scale-105 transition-all"
                >
                  <Ticket className="w-5 h-5" />
                  Quero meu orçamento
                </button>
                <button
                  onClick={() => handleWhatsApp('pacotes')}
                  className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Falar com especialista
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A2E] to-transparent py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                <div><p className="text-3xl font-bold text-[#FF6B35]">500+</p><p className="text-white/60 text-sm">Famílias atendidas</p></div>
                <div><p className="text-3xl font-bold text-[#FF6B35]">4.9</p><p className="text-white/60 text-sm">Avaliação média</p></div>
                <div><p className="text-3xl font-bold text-[#FF6B35]">10+</p><p className="text-white/60 text-sm">Anos de experiência</p></div>
                <div><p className="text-3xl font-bold text-[#FF6B35]">24h</p><p className="text-white/60 text-sm">Suporte na viagem</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Parques */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Os 4 Parques <span className="text-[#FF6B35]">Mágicos</span>
              </h2>
              <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Cada parque da Disney é uma experiência única e inesquecível
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {parksLoading ? (
                <div className="col-span-2 text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35] mx-auto" />
                  <p className="text-[#64748B] mt-2">Carregando parques...</p>
                </div>
              ) : (
                parques.map((parque) => (
                  <div key={parque.id} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                    <div className="aspect-video overflow-hidden">
                      <img src={parque.imagem} alt={parque.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{parque.nome}</h3>
                      <p className="text-white/90 mb-3 drop-shadow-lg line-clamp-2">{parque.descricao}</p>
                      <div className="flex flex-wrap gap-2">
                        {parque.destaques.map((destaque, i) => (
                          <span key={i} className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
                            {destaque}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!parksLoading && (
              <div className="text-center mt-10">
                <button
                  onClick={() => handleWhatsApp('ingressos para os parques')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-full hover:bg-[#E55A2B] transition-colors"
                >
                  <Ticket className="w-5 h-5" />
                  Consultar ingressos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Simulador de Pacotes */}
        <SimuladorPacote />

        {/* Hospedagem */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                <Hotel className="inline w-8 h-8 text-[#FF6B35] mr-2" />
                Hospedagem
              </h2>
              <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Opções para todos os estilos e orçamentos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {hoteis.map((hotel, index) => (
                <div key={index} className="bg-[#FAFBFC] rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-5xl mb-4">{hotel.icone}</div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{hotel.nome}</h3>
                  <p className="text-[#64748B]">{hotel.descricao}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => handleWhatsApp('hospedagem em Orlando')}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FF6B35] text-[#FF6B35] font-medium rounded-full hover:bg-[#FF6B35] hover:text-white transition-colors"
              >
                <Hotel className="w-5 h-5" />
                Ver opções de hotéis
              </button>
            </div>
          </div>
        </section>

        {/* Aluguel de Carro */}
        <section className="py-20 bg-[#FAFBFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                  <Car className="inline w-8 h-8 text-[#FF6B35] mr-2" />
                  Aluguel de Carro
                </h2>
                <p className="text-[#64748B] text-lg mb-6">
                  Ter um carro em Orlando é essencial! A cidade é espalhada e você vai querer liberdade para ir aos outlets, restaurantes e explorar a região.
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  <li className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Melhores preços com locadoras parceiras</li>
                  <li className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Seguro completo incluso</li>
                  <li className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Retirada e devolução no aeroporto</li>
                  <li className="flex items-center gap-3 text-[#1A1A2E]"><CheckCircle className="w-5 h-5 text-green-500" /> Carros para todos os tamanhos de família</li>
                </ul>
                <button
                  onClick={() => handleWhatsApp('aluguel de carro em Orlando')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-full hover:bg-[#E55A2B] transition-colors"
                >
                  <Car className="w-5 h-5" />
                  Cotar aluguel de carro
                </button>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1449965408869-ebd3fee52887?w=800&q=80"
                  alt="Carro em Orlando"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dicas */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Dicas de <span className="text-[#FF6B35]">Ouro</span>
              </h2>
              <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
                Tudo que você precisa saber para aproveitar ao máximo
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dicas.map((dica, index) => {
                const Icon = dica.icone;
                return (
                  <div key={index} className="bg-[#FAFBFC] rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{dica.titulo}</h3>
                    <p className="text-[#64748B]">{dica.descricao}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#FAFBFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Dúvidas <span className="text-[#FF6B35]">Frequentes</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-white rounded-xl p-6 cursor-pointer shadow-sm">
                  <summary className="flex items-center justify-between font-semibold text-[#1A1A2E] list-none">
                    {faq.pergunta}
                    <span className="ml-4 text-[#FF6B35] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-[#64748B] leading-relaxed">{faq.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pronto para realizar o sonho? 🏰✨
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Solicite seu orçamento personalizado agora e deixe a Vootrip cuidar de tudo!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B35] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5" />
                Solicitar orçamento
              </button>
              <button
                onClick={() => handleWhatsApp('pacotes Disney')}
                className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </button>
            </div>
          </div>
        </section>
      </div>

      <OrcamentoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Layout>
  );
}
