import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Layout } from '@/components/Layout';
import { MapPin, Clock, Briefcase, ArrowRight, Heart, Zap, Users, Globe, Send, CheckCircle, User, Mail, Phone, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useActiveJobs } from '@/hooks/useJobs';

const benefits = [
{ icon: Heart, title: 'Plano de Saúde', description: 'Cobertura completa para você e dependentes' },
{ icon: Zap, title: 'Trabalho Remoto', description: 'Flexibilidade para trabalhar de onde quiser' },
{ icon: Users, title: 'Ambiente Colaborativo', description: 'Equipe diversa e acolhedora' },
{ icon: Globe, title: 'Viagens com Desconto', description: 'Benefícios exclusivos em parceiros' }];


export default function Carreiras() {
  const { jobs, loading: loadingJobs } = useActiveJobs();
  const [state, handleSubmit] = useForm('xaqrqeoo');
  const [selectedVaga, setSelectedVaga] = useState('Banco de Talentos');

  const scrollToForm = () => {
    document.getElementById('candidatura-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div data-ev-id="ev_bc4eabf9a9" className="pt-20">
        {/* Hero */}
        <section data-ev-id="ev_82ce406b95" className="bg-gradient-to-br from-[#9B5DE5] to-[#7B2CBF] py-20 lg:py-32">
          <div data-ev-id="ev_d07c8e06d3" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 data-ev-id="ev_f08ba033a1" className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Faça parte do <span data-ev-id="ev_1b0e9a7781" className="text-[#FFD166]">Vootrip</span>
            </h1>
            <p data-ev-id="ev_7b0b479a44" className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Junte-se a uma equipe apaixonada por viagens e tecnologia. 
              Ajude-nos a transformar a forma como as pessoas exploram o mundo.
            </p>
            <Button onClick={scrollToForm} className="bg-white text-[#7B2CBF] hover:bg-white/90">
              Enviar Candidatura
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section data-ev-id="ev_9e2439a509" className="py-16 lg:py-24 bg-white">
          <div data-ev-id="ev_c89193d287" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_a68607ffe2" className="text-center mb-12">
              <h2 data-ev-id="ev_84f06e75f3" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Por que trabalhar conosco?
              </h2>
            </div>
            <div data-ev-id="ev_f5d56c6b84" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div data-ev-id="ev_de445cbd47" key={index} className="text-center p-6 rounded-2xl border border-[#E2E8F0] hover:shadow-lg transition-shadow">
                    <div data-ev-id="ev_ec1c5cebfb" className="w-14 h-14 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#FF6B35]" />
                    </div>
                    <h3 data-ev-id="ev_ef69116c7e" className="font-bold text-[#1A1A2E] mb-2">{benefit.title}</h3>
                    <p data-ev-id="ev_5ad046fddd" className="text-sm text-[#64748B]">{benefit.description}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* Jobs */}
        <section data-ev-id="ev_5fec36abbe" className="py-16 lg:py-24 bg-[#FAFBFC]">
          <div data-ev-id="ev_8df2420d47" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_b565d3e8d2" className="text-center mb-12">
              <h2 data-ev-id="ev_c651c45c7d" className="text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
                Vagas Abertas
              </h2>
              <p data-ev-id="ev_c51eb22b7e" className="text-[#64748B]">
                Encontre a oportunidade perfeita para você
              </p>
            </div>

            <div data-ev-id="ev_ff19addb7c" className="flex flex-col gap-4">
              {loadingJobs ?
              <div data-ev-id="ev_8d5840de1a" className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
                </div> :
              jobs.length === 0 ?
              <div data-ev-id="ev_689ad410b6" className="text-center py-12 bg-white rounded-2xl">
                  <Briefcase className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
                  <p data-ev-id="ev_e2489e29db" className="text-[#64748B] mb-2">No momento não temos vagas abertas</p>
                  <p data-ev-id="ev_e7adca502a" className="text-sm text-[#64748B]/70">
                    Mas você pode enviar sua candidatura para o nosso Banco de Talentos abaixo!
                  </p>
                </div> :

              jobs.map((job) =>
              <div data-ev-id="ev_21c468c4d0" key={job.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <div data-ev-id="ev_2ccd8df5ea" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div data-ev-id="ev_afaf399608">
                        <div data-ev-id="ev_1a482a921a" className="flex items-center gap-2 mb-2">
                          <span data-ev-id="ev_aa5b24427c" className="text-xs font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-1 rounded-full">
                            {job.department}
                          </span>
                        </div>
                        <h3 data-ev-id="ev_d674893906" className="text-xl font-bold text-[#1A1A2E] mb-2">{job.title}</h3>
                        <p data-ev-id="ev_f3b69f2098" className="text-[#64748B] text-sm mb-3">{job.description}</p>
                        <div data-ev-id="ev_a9e5bff4d3" className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                          <span data-ev-id="ev_fff242e959" className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span data-ev-id="ev_febde7762c" className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button
                    onClick={() => {
                      setSelectedVaga(job.title);
                      scrollToForm();
                    }}
                    className="flex-shrink-0">

                        Candidatar-se
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
              )
              }
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section data-ev-id="ev_648250a995" id="candidatura-form" className="py-16 lg:py-24 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
          <div data-ev-id="ev_2865008132" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-ev-id="ev_f760faa56a" className="text-center mb-12">
              <div data-ev-id="ev_faa705c0ff" className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35] rounded-2xl mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 data-ev-id="ev_4a418f0888" className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Envie sua Candidatura
              </h2>
              <p data-ev-id="ev_158e70040f" className="text-white/70">
                Preencha o formulário abaixo e entraremos em contato em breve
              </p>
            </div>

            {state.succeeded ?
            <div data-ev-id="ev_fef851347e" className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                <div data-ev-id="ev_84aa5ff4b7" className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 data-ev-id="ev_024b56ec15" className="text-2xl font-bold text-white mb-4">Candidatura Enviada!</h3>
                <p data-ev-id="ev_967f21c46e" className="text-white/80 mb-6">
                  Obrigado pelo interesse em fazer parte do Vootrip! 
                  Nossa equipe analisará seu perfil e entrará em contato em breve.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Enviar outra candidatura
                </Button>
              </div> :

            <form data-ev-id="ev_88f12f89f1" onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div data-ev-id="ev_faf4b61b7d" className="grid gap-6">
                  {/* Nome e Email */}
                  <div data-ev-id="ev_327cc17efb" className="grid sm:grid-cols-2 gap-4">
                    <div data-ev-id="ev_99d2bfd3e6">
                      <label data-ev-id="ev_56a7a155e2" className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                        <User className="w-4 h-4" />
                        Nome Completo *
                      </label>
                      <input data-ev-id="ev_d36025986f"
                    type="text"
                    name="nome"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="Seu nome completo" />

                      <ValidationError prefix="Nome" field="nome" errors={state.errors} className="text-red-300 text-sm mt-1" />
                    </div>
                    <div data-ev-id="ev_ccd50e72b6">
                      <label data-ev-id="ev_c190edaeb1" className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </label>
                      <input data-ev-id="ev_ee2fdced3e"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="seu@email.com" />

                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-300 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Telefone e Vaga */}
                  <div data-ev-id="ev_e8722a31c2" className="grid sm:grid-cols-2 gap-4">
                    <div data-ev-id="ev_446d7d1c37">
                      <label data-ev-id="ev_34cb2cd091" className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                        <Phone className="w-4 h-4" />
                        Telefone / WhatsApp
                      </label>
                      <input data-ev-id="ev_95fda749e9"
                    type="tel"
                    name="telefone"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors"
                    placeholder="(11) 99999-9999" />

                    </div>
                    <div data-ev-id="ev_85e4fff56b">
                      <label data-ev-id="ev_4a826d72eb" className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                        <Briefcase className="w-4 h-4" />
                        Vaga de Interesse
                      </label>
                      <select data-ev-id="ev_65984b76f1"
                    name="vaga"
                    value={selectedVaga}
                    onChange={(e) => setSelectedVaga(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#FF6B35] transition-colors">

                        <option data-ev-id="ev_da54f934ef" value="Banco de Talentos" className="bg-[#1A1A2E]">Banco de Talentos</option>
                        {jobs.map((job) =>
                      <option data-ev-id="ev_880790c0fa" key={job.id} value={job.title} className="bg-[#1A1A2E]">
                            {job.title}
                          </option>
                      )}
                      </select>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div data-ev-id="ev_9b9b6ff0ab">
                    <label data-ev-id="ev_4c28e24e72" className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                      <FileText className="w-4 h-4" />
                      LinkedIn ou Link do Currículo
                    </label>
                    <input data-ev-id="ev_5c0f15d4c3"
                  type="url"
                  name="linkedin"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors"
                  placeholder="https://linkedin.com/in/seu-perfil ou link do currículo" />

                  </div>

                  {/* Mensagem */}
                  <div data-ev-id="ev_ca3facc1f2">
                    <label data-ev-id="ev_3209243731" className="text-white/80 text-sm font-medium mb-2 block">
                      Conte um pouco sobre você *
                    </label>
                    <textarea data-ev-id="ev_1e4be171f5"
                  name="mensagem"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                  placeholder="Fale sobre sua experiência, por que quer trabalhar no Vootrip, e o que te motiva..." />

                    <ValidationError prefix="Mensagem" field="mensagem" errors={state.errors} className="text-red-300 text-sm mt-1" />
                  </div>

                  <button data-ev-id="ev_0559dfa395"
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2">

                    {state.submitting ?
                  <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </> :

                  <>
                        <Send className="w-5 h-5" />
                        Enviar Candidatura
                      </>
                  }
                  </button>

                  <p data-ev-id="ev_2569473437" className="text-white/50 text-xs text-center">
                    Ao enviar, você concorda com nossa política de privacidade. 
                    Seus dados serão usados apenas para o processo seletivo.
                  </p>
                </div>
              </form>
            }
          </div>
        </section>
      </div>
    </Layout>);

}