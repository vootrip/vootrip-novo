import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Building2, TrendingUp, Users, Globe, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { isValidEmail, isValidPhone, sanitizeText } from '@/utils/validation';

const benefits = [
{
  icon: TrendingUp,
  title: 'Aumente suas vendas',
  description: 'Alcance milhares de viajantes qualificados que estão prontos para comprar.'
},
{
  icon: Users,
  title: 'Novos clientes',
  description: 'Expanda sua base de clientes com tráfego segmentado e de alta qualidade.'
},
{
  icon: Globe,
  title: 'Visibilidade nacional',
  description: 'Sua marca exposta para viajantes de todo o Brasil.'
},
{
  icon: Building2,
  title: 'Parceria sólida',
  description: 'Suporte dedicado e condições comerciais competitivas.'
}];


const partnerTypes = [
'Companhia Aérea',
'Rede Hoteleira',
'Locadora de Veículos',
'Agência de Viagens',
'Serviço de Traslado',
'Outro'];


export default function SejaParceiro() {
  const [formData, setFormData] = useState({
    empresa: '',
    tipo: '',
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Proteção anti-spam
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    // Validações
    if (!isValidEmail(formData.email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (formData.telefone && !isValidPhone(formData.telefone)) {
      setError('Por favor, insira um telefone válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xaqrqebq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🤝 Nova Solicitação de Parceria - ${sanitizeText(formData.empresa)}`,
          empresa: sanitizeText(formData.empresa),
          tipo: formData.tipo,
          nome: sanitizeText(formData.nome),
          cargo: sanitizeText(formData.cargo),
          email: formData.email.trim().toLowerCase(),
          telefone: formData.telefone.replace(/\D/g, ''),
          mensagem: sanitizeText(formData.mensagem)
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div data-ev-id="ev_8661cf0df0" className="pt-20">
        {/* Hero */}
        <section data-ev-id="ev_b4b132940c" className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] py-20 lg:py-32">
          <div data-ev-id="ev_f79d53cac2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 data-ev-id="ev_58108cc2ac" className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Seja um <span data-ev-id="ev_6d73367dd2" className="text-[#FF6B35]">Parceiro</span>
            </h1>
            <p data-ev-id="ev_38c10baa2d" className="text-xl text-white/70 max-w-3xl mx-auto">
              Junte-se ao Vootrip e alcance milhares de viajantes em busca das melhores ofertas.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section data-ev-id="ev_3463ff07db" className="py-16 lg:py-24 bg-white">
          <div data-ev-id="ev_04ba96231d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_95697432e2" className="text-center mb-12">
              <h2 data-ev-id="ev_e6b6cbe8ca" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Vantagens de ser parceiro
              </h2>
            </div>
            <div data-ev-id="ev_4a649611b2" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div data-ev-id="ev_3239bb0f34" key={index} className="text-center p-6">
                    <div data-ev-id="ev_25a90b0c7a" className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#FF6B35]" />
                    </div>
                    <h3 data-ev-id="ev_6c7224fc9d" className="text-lg font-bold text-[#1A1A2E] mb-2">{benefit.title}</h3>
                    <p data-ev-id="ev_26193cb556" className="text-[#64748B] text-sm">{benefit.description}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* Form */}
        <section data-ev-id="ev_65d5af37b5" className="py-16 lg:py-24 bg-[#FAFBFC]">
          <div data-ev-id="ev_20395432a2" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_da7f6f9e88" className="bg-white rounded-2xl shadow-xl p-8">
              {isSuccess ?
              <div data-ev-id="ev_16bb5b43ce" className="text-center py-8">
                  <div data-ev-id="ev_09e1276374" className="w-16 h-16 bg-[#06D6A0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#06D6A0]" />
                  </div>
                  <h3 data-ev-id="ev_b15894adc4" className="text-2xl font-bold text-[#1A1A2E] mb-2">Solicitação Enviada!</h3>
                  <p data-ev-id="ev_37266ec18c" className="text-[#64748B]">
                    Recebemos seu interesse. Nossa equipe comercial entrará em contato em breve.
                  </p>
                </div> :

              <>
                  <h2 data-ev-id="ev_3e317df09c" className="text-2xl font-bold text-[#1A1A2E] mb-6 text-center">
                    Preencha o formulário
                  </h2>
                  <form data-ev-id="ev_476c9b4cdd" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Honeypot anti-spam */}
                    <input data-ev-id="ev_23d407da8c"
                  type="text"
                  name="_gotcha"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off" />

                    
                    {/* Mensagem de erro */}
                    {error &&
                  <div data-ev-id="ev_0a93bd3218" className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                  }
                    
                    <div data-ev-id="ev_e66d596261" className="grid sm:grid-cols-2 gap-4">
                      <div data-ev-id="ev_9b5af25614">
                        <label data-ev-id="ev_0ea7b1f79b" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome da Empresa</label>
                        <input data-ev-id="ev_bc745171db"
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none" />

                      </div>
                      <div data-ev-id="ev_c7542d8647">
                        <label data-ev-id="ev_7437f50ded" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Tipo de Negócio</label>
                        <select data-ev-id="ev_90ddab67bd"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none appearance-none bg-white">

                          <option data-ev-id="ev_58fcfaa793" value="">Selecione...</option>
                          {partnerTypes.map((type) =>
                        <option data-ev-id="ev_dc58c64d59" key={type} value={type}>{type}</option>
                        )}
                        </select>
                      </div>
                    </div>

                    <div data-ev-id="ev_71a8a21a62" className="grid sm:grid-cols-2 gap-4">
                      <div data-ev-id="ev_cc139ad76e">
                        <label data-ev-id="ev_5903948a91" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Seu Nome</label>
                        <input data-ev-id="ev_877618f892"
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none" />

                      </div>
                      <div data-ev-id="ev_0a93bd3218">
                        <label data-ev-id="ev_4361194519" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Cargo</label>
                        <input data-ev-id="ev_c70e919575"
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none" />

                      </div>
                    </div>

                    <div data-ev-id="ev_b6f08f22c3" className="grid sm:grid-cols-2 gap-4">
                      <div data-ev-id="ev_5d6b7df8c6">
                        <label data-ev-id="ev_32b8973f36" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Email Corporativo</label>
                        <input data-ev-id="ev_9dd0b8520c"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none" />

                      </div>
                      <div data-ev-id="ev_5857662fb8">
                        <label data-ev-id="ev_0903b8a994" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Telefone</label>
                        <input data-ev-id="ev_4c44b982a1"
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none" />

                      </div>
                    </div>

                    <div data-ev-id="ev_38e128c793">
                      <label data-ev-id="ev_9ab553590f" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Mensagem (opcional)</label>
                      <textarea data-ev-id="ev_47a4500fee"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Conte-nos mais sobre sua empresa e como podemos colaborar..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none resize-none" />

                    </div>

                    <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
                      {isSubmitting ?
                    <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </> :

                    <>
                          <Send className="w-5 h-5" />
                          Enviar Solicitação
                        </>
                    }
                    </Button>
                  </form>
                </>
              }
            </div>
          </div>
        </section>
      </div>
    </Layout>);

}