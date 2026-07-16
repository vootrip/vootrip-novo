import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { isValidEmail } from '@/utils/validation';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Proteção anti-spam
    if (honeypot) {
      setSubscribed(true);
      return;
    }

    if (!email || !isValidEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/xgogoayp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: '📧 Nova inscrição na Newsletter - Vootrip',
          email: email.trim().toLowerCase(),
          tipo: 'newsletter'
        })
      });

      if (response.ok) {
        setSubscribed(true);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-ev-id="ev_8fc03e9a13" className="py-16 lg:py-24 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C]">
      <div data-ev-id="ev_ed6cc6ca6d" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {subscribed ?
        <div data-ev-id="ev_16ade14a86" className="flex flex-col items-center gap-4">
            <div data-ev-id="ev_868aa5c46d" className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-[#06D6A0]" />
            </div>
            <h2 data-ev-id="ev_75b1d5b40c" className="text-2xl lg:text-3xl font-bold text-white">
              Você está na lista!
            </h2>
            <p data-ev-id="ev_45b5d59871" className="text-white/80">
              Fique de olho no seu e-mail para receber as melhores ofertas.
            </p>
          </div> :

        <>
            <h2 data-ev-id="ev_446f9a2747" className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Receba as melhores ofertas
            </h2>
            <p data-ev-id="ev_8b62a50805" className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Cadastre-se e seja o primeiro a saber sobre promoções exclusivas, 
              descontos e dicas de viagem.
            </p>
            {error &&
          <div data-ev-id="ev_864377f276" className="flex items-center justify-center gap-2 p-3 bg-white/20 text-white rounded-lg text-sm mb-4">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
          }
            <form data-ev-id="ev_1fdbfbe254" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              {/* Honeypot */}
              <input data-ev-id="ev_5e7148af09"
            type="text"
            name="_gotcha"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off" />

              <input data-ev-id="ev_8628dbfb6f"
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-4 rounded-xl border-0 text-[#1A1A2E] placeholder:text-[#94A3B8] focus:outline-none focus:ring-4 focus:ring-white/30"
            required />

              <Button
              type="submit"
              className="!bg-[#1A1A2E] hover:!bg-[#2D2D44] !shadow-none"
              size="lg"
              disabled={loading}>

                <Send className="w-5 h-5" />
                {loading ? 'Enviando...' : 'Inscrever'}
              </Button>
            </form>
            <p data-ev-id="ev_3ba4882950" className="text-white/60 text-sm mt-4">
              Sem spam, prometemos. Cancele quando quiser.
            </p>
          </>
        }
      </div>
    </section>);

}