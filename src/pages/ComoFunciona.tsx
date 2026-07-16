import { Layout } from '@/components/Layout';
import { Search, Filter, CreditCard, Plane, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';

const steps = [
{
  number: '01',
  icon: Search,
  title: 'Busque',
  description: 'Digite seu destino, datas e número de viajantes. Nossa tecnologia busca em dezenas de sites simultaneamente.',
  color: '#FF6B35'
},
{
  number: '02',
  icon: Filter,
  title: 'Compare',
  description: 'Veja todas as opções lado a lado. Filtre por preço, horário, companhia, número de paradas e muito mais.',
  color: '#00B4D8'
},
{
  number: '03',
  icon: CheckCircle,
  title: 'Escolha',
  description: 'Selecione a melhor opção para você. Mostramos claramente todos os custos, sem surpresas.',
  color: '#06D6A0'
},
{
  number: '04',
  icon: CreditCard,
  title: 'Reserve',
  description: 'Você é redirecionado para o site do parceiro para finalizar a compra com segurança.',
  color: '#9B5DE5'
}];


const benefits = [
'Comparamos preços de +100 sites',
'Sem taxas ou cobranças extras',
'Alertas de queda de preço',
'Atendimento em português',
'Preços em Real (BRL)',
'Parceiros verificados'];


const faqs = [
{
  question: 'O Vootrip é uma agência de viagens?',
  answer: 'Sim! Somos uma agência de viagens completa, especializada em pacotes nacionais e internacionais. Trabalhamos com os melhores parceiros e fornecedores do mercado para oferecer viagens inesquecíveis com segurança e economia.'
},
{
  question: 'Como funciona a compra pelo Vootrip?',
  answer: 'Você pode solicitar um orçamento personalizado através do nosso formulário ou entrar em contato diretamente conosco. Nossa equipe vai montar o pacote ideal para sua viagem, considerando suas preferências, datas e orçamento.'
},
{
  question: 'Quais destinos vocês oferecem?',
  answer: 'Oferecemos pacotes para destinos nacionais (praias, serras, cidades históricas) e internacionais (América do Sul, Europa, EUA, Caribe e muito mais). Trabalhamos com as melhores companhias aéreas, hotéis e receptivos locais.'
},
{
  question: 'Os preços incluem tudo?',
  answer: 'Sim! Nossos pacotes são transparentes e incluem todos os custos. Passagens, hospedagem, transfers e taxas são detalhados no orçamento. Sem surpresas ou cobranças extras na hora de viajar.'
},
{
  question: 'Como faço para solicitar um orçamento?',
  answer: 'É simples! Clique em "Solicitar Viagem" no menu, preencha suas preferências de destino, datas e número de viajantes. Nossa equipe entrará em contato em até 24 horas com as melhores opções para você.'
}];


export default function ComoFunciona() {
  return (
    <Layout>
      <div data-ev-id="ev_b3b756e694" className="pt-20">
        {/* Hero */}
        <section data-ev-id="ev_b7b45bbe5a" className="bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] py-20 lg:py-32">
          <div data-ev-id="ev_c9f3927912" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 data-ev-id="ev_d261a1ca02" className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Como o Vootrip Funciona
            </h1>
            <p data-ev-id="ev_eeb221de94" className="text-xl text-white/90 max-w-3xl mx-auto">
              Somos uma agência de viagens que trabalha com os melhores parceiros 
              em voos, hotéis, traslados e aluguel de carros para montar o pacote ideal para você.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section data-ev-id="ev_92be01e050" className="py-16 lg:py-24 bg-white">
          <div data-ev-id="ev_36db8a4ddf" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_4955e1598c" className="text-center mb-16">
              <h2 data-ev-id="ev_bdf4874d86" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                4 passos simples
              </h2>
              <p data-ev-id="ev_4a5eec53db" className="text-[#64748B] text-lg">
                Da busca à reserva em poucos minutos
              </p>
            </div>

            <div data-ev-id="ev_f96133df04" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div data-ev-id="ev_171187ed8c" key={index} className="relative">
                    {index < steps.length - 1 &&
                    <div data-ev-id="ev_31b7b9064d" className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[#E2E8F0] -translate-x-1/2 z-0" />
                    }
                    <div data-ev-id="ev_03a9fecbe4" className="relative z-10 text-center">
                      <div data-ev-id="ev_d839a03f37"
                      className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: `${step.color}15` }}>

                        <Icon className="w-10 h-10" style={{ color: step.color }} />
                      </div>
                      <span data-ev-id="ev_0ab7716c47"
                      className="text-5xl font-bold opacity-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4"
                      style={{ color: step.color }}>

                        {step.number}
                      </span>
                      <h3 data-ev-id="ev_bc69b2dc71" className="text-xl font-bold text-[#1A1A2E] mb-3">{step.title}</h3>
                      <p data-ev-id="ev_e7a183d92c" className="text-[#64748B] leading-relaxed">{step.description}</p>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section data-ev-id="ev_45eede6e95" className="py-16 lg:py-24 bg-[#FAFBFC]">
          <div data-ev-id="ev_08e5755367" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_4784e27cd7" className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-ev-id="ev_1f31ffdd1e">
                <h2 data-ev-id="ev_ccee626f07" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-6">
                  Por que usar o Vootrip?
                </h2>
                <div data-ev-id="ev_2630c369a7" className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) =>
                  <div data-ev-id="ev_ba147ed4a0" key={index} className="flex items-center gap-3">
                      <div data-ev-id="ev_bb9a4b7070" className="w-6 h-6 bg-[#06D6A0] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span data-ev-id="ev_98e7fef451" className="text-[#1A1A2E]">{benefit}</span>
                    </div>
                  )}
                </div>
                <div data-ev-id="ev_aae5f3c8bd" className="mt-8">
                  <Link to="/">
                    <Button size="lg">
                      Comece a buscar
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div data-ev-id="ev_181c01ecd2" className="relative">
                <img data-ev-id="ev_c4c9d899c0"
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
                alt="Viajante feliz"
                className="rounded-2xl shadow-xl" />

              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section data-ev-id="ev_fc2d34ce39" className="py-16 lg:py-24 bg-white">
          <div data-ev-id="ev_39af5a9fb2" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_80eac51bee" className="text-center mb-12">
              <h2 data-ev-id="ev_79b44372aa" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Perguntas Frequentes
              </h2>
            </div>
            <div data-ev-id="ev_4986bc2572" className="flex flex-col gap-4">
              {faqs.map((faq, index) =>
              <details data-ev-id="ev_8e120da1ce" key={index} className="group bg-[#FAFBFC] rounded-xl p-6 cursor-pointer">
                  <summary data-ev-id="ev_56cb02ca9c" className="flex items-center justify-between font-semibold text-[#1A1A2E] list-none">
                    {faq.question}
                    <span data-ev-id="ev_8d9bd30c3f" className="ml-4 text-[#FF6B35] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p data-ev-id="ev_ca1c3a03cc" className="mt-4 text-[#64748B] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>);

}