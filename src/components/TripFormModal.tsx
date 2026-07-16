import { useState } from 'react';
import { X, Send, Plane, Calendar, DollarSign, User, Phone, MessageSquare, Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { isValidEmail, isValidPhone, sanitizeText, isValidFutureDate, isValidDateRange } from '@/utils/validation';

interface TripFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TripFormModal({ isOpen, onClose }: TripFormModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    destino: '',
    dataIda: '',
    dataVolta: '',
    orcamento: '',
    observacoes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Campo anti-spam

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Proteção anti-spam (honeypot)
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    // Validações
    if (!isValidEmail(formData.email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (formData.whatsapp && !isValidPhone(formData.whatsapp)) {
      setError('Por favor, insira um telefone válido.');
      return;
    }

    if (formData.dataIda && !isValidFutureDate(formData.dataIda)) {
      setError('A data de ida não pode ser no passado.');
      return;
    }

    if (!isValidDateRange(formData.dataIda, formData.dataVolta)) {
      setError('A data de volta deve ser após a data de ida.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xrenepkw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🌟 Nova Solicitação de Viagem - ${sanitizeText(formData.nome)}`,
          nome: sanitizeText(formData.nome),
          email: formData.email.trim().toLowerCase(),
          whatsapp: formData.whatsapp.replace(/\D/g, ''),
          destino: sanitizeText(formData.destino),
          'data_ida': formData.dataIda,
          'data_volta': formData.dataVolta,
          orcamento: formData.orcamento,
          observacoes: sanitizeText(formData.observacoes) || 'Nenhuma'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          nome: '',
          email: '',
          whatsapp: '',
          destino: '',
          dataIda: '',
          dataVolta: '',
          orcamento: '',
          observacoes: ''
        });
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div data-ev-id="ev_f9b2a1a5b9" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div data-ev-id="ev_8eea8d93f1"
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={handleClose} />

      
      {/* Modal */}
      <div data-ev-id="ev_8cf25242a9" className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div data-ev-id="ev_276e9d8b38" className="bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] p-6 rounded-t-2xl">
          <button data-ev-id="ev_5d1eaa585d"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">

            <X className="w-6 h-6" />
          </button>
          <div data-ev-id="ev_98f2563318" className="flex items-center gap-3">
            <div data-ev-id="ev_d87e0903bd" className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div data-ev-id="ev_e826bfe63c">
              <h2 data-ev-id="ev_f02dcf7cee" className="text-2xl font-bold text-white">Planeje sua Viagem</h2>
              <p data-ev-id="ev_0ed07ff768" className="text-white/80 text-sm">Receba ofertas personalizadas</p>
            </div>
          </div>
        </div>

        {isSuccess ? (
        /* Success State */
        <div data-ev-id="ev_a7940f75de" className="p-8 text-center">
            <div data-ev-id="ev_3b581ca962" className="w-16 h-16 bg-[#06D6A0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#06D6A0]" />
            </div>
            <h3 data-ev-id="ev_f9cf346d92" className="text-xl font-bold text-[#1A1A2E] mb-2">Solicitação Enviada!</h3>
            <p data-ev-id="ev_a7d4c4533f" className="text-[#64748B] mb-6">
              Recebemos seu pedido e em breve entraremos em contato com as melhores ofertas para sua viagem.
            </p>
            <Button onClick={handleClose}>
              Fechar
            </Button>
          </div>) : (

        /* Form */
        <form data-ev-id="ev_9e8775d3a8" onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {/* Honeypot anti-spam (invisível) */}
            <input data-ev-id="ev_3bb344a8d2"
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off" />

            
            {/* Mensagem de erro */}
            {error &&
          <div data-ev-id="ev_2194fd8c2e" className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
          }
            
            {/* Nome */}
            <div data-ev-id="ev_e897c1680b">
              <label data-ev-id="ev_1e690aebba" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Seu Nome</label>
              <div data-ev-id="ev_e996d645ac" className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input data-ev-id="ev_15219cb8ea"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Como podemos te chamar?"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all" />

              </div>
            </div>

            {/* Email */}
            <div data-ev-id="ev_d0168058ba">
              <label data-ev-id="ev_f578ec8244" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Seu Email</label>
              <div data-ev-id="ev_fb0581b402" className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input data-ev-id="ev_3407296583"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all" />

              </div>
            </div>

            {/* WhatsApp */}
            <div data-ev-id="ev_65819ce98b">
              <label data-ev-id="ev_c746eba7d4" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Seu WhatsApp</label>
              <div data-ev-id="ev_a99f2ef855" className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input data-ev-id="ev_cd6c279727"
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all" />

              </div>
            </div>

            {/* Destino */}
            <div data-ev-id="ev_ce8f4408ee">
              <label data-ev-id="ev_dd90a9eb53" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Para onde quer viajar?</label>
              <div data-ev-id="ev_0c84668020" className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B35]" />
                <input data-ev-id="ev_848274115c"
              type="text"
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              placeholder="Ex: Cancún, Paris, Orlando..."
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all" />

              </div>
            </div>

            {/* Datas */}
            <div data-ev-id="ev_7dc041899d" className="grid grid-cols-2 gap-4">
              <div data-ev-id="ev_6e1f283f8b">
                <label data-ev-id="ev_a6a691d515" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Data de Ida</label>
                <div data-ev-id="ev_86ab981f49" className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input data-ev-id="ev_95fe7d9125"
                type="date"
                name="dataIda"
                value={formData.dataIda}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all" />

                </div>
              </div>
              <div data-ev-id="ev_caee00d687">
                <label data-ev-id="ev_1ac3ddbf44" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Data de Volta</label>
                <div data-ev-id="ev_1f7d5b23f8" className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input data-ev-id="ev_dfeda0a78a"
                type="date"
                name="dataVolta"
                value={formData.dataVolta}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all" />

                </div>
              </div>
            </div>

            {/* Orçamento */}
            <div data-ev-id="ev_71ddf78166">
              <label data-ev-id="ev_b69e3f6e19" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Orçamento estimado</label>
              <div data-ev-id="ev_f377f8a584" className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <select data-ev-id="ev_9d33d44bdb"
              name="orcamento"
              value={formData.orcamento}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all appearance-none bg-white">

                  <option data-ev-id="ev_62f30c797c" value="">Selecione...</option>
                  <option data-ev-id="ev_3eb69203a7" value="Até R$ 2.000">Até R$ 2.000</option>
                  <option data-ev-id="ev_3cd1a81967" value="R$ 2.000 - R$ 5.000">R$ 2.000 - R$ 5.000</option>
                  <option data-ev-id="ev_f4878486b0" value="R$ 5.000 - R$ 10.000">R$ 5.000 - R$ 10.000</option>
                  <option data-ev-id="ev_62c264f046" value="R$ 10.000 - R$ 20.000">R$ 10.000 - R$ 20.000</option>
                  <option data-ev-id="ev_49d2e252e1" value="Acima de R$ 20.000">Acima de R$ 20.000</option>
                </select>
              </div>
            </div>

            {/* Observações */}
            <div data-ev-id="ev_9edd43a6d6">
              <label data-ev-id="ev_2c2d134749" className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Observações (opcional)</label>
              <div data-ev-id="ev_f7d0752790" className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[#64748B]" />
                <textarea data-ev-id="ev_7b5d3b6140"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Alguma preferência especial? Viagem em família, lua de mel..."
              rows={3}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all resize-none" />

              </div>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" fullWidth className="mt-2" disabled={isSubmitting}>
              {isSubmitting ?
            <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </> :

            <>
                  <Send className="w-5 h-5" />
                  Solicitar Orçamento
                </>
            }
            </Button>

            <p data-ev-id="ev_cb0057669d" className="text-center text-xs text-[#64748B]">
              Responderemos em até 24 horas com as melhores ofertas para você!
            </p>
          </form>)
        }
      </div>
    </div>);

}