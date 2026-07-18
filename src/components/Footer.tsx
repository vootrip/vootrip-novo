import { Link } from 'react-router';
import { Plane, Mail, MapPin } from 'lucide-react';

function WhatsAppIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_c0b5c6f124" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path data-ev-id="ev_b4a003355e" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>);
}

function InstagramIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_7b6b2a6e62" className={className} viewBox="0 0 24 24" fill="none">
      <defs data-ev-id="ev_ed51b3c486">
        <linearGradient data-ev-id="ev_c767ef88a7" id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop data-ev-id="ev_90717cb4ca" offset="0%" stopColor="#FFDC80" />
          <stop data-ev-id="ev_9d1d6cd434" offset="25%" stopColor="#FCAF45" />
          <stop data-ev-id="ev_523737024a" offset="50%" stopColor="#F77737" />
          <stop data-ev-id="ev_279ed95991" offset="75%" stopColor="#F56040" />
          <stop data-ev-id="ev_bec0f7a960" offset="90%" stopColor="#C13584" />
          <stop data-ev-id="ev_37ba204c7c" offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect data-ev-id="ev_2c65443e24" x="2" y="2" width="20" height="20" rx="5" fill="url(#instagram-gradient)" />
      <circle data-ev-id="ev_91888caa50" cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
      <circle data-ev-id="ev_b9025d91fc" cx="17.5" cy="6.5" r="1.5" fill="white" />
    </svg>);

}

function FacebookIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_7d7385d005" className={className} viewBox="0 0 24 24">
      <path data-ev-id="ev_4d208ccf30" fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>);

}

function TwitterIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_1ecafce2c6" className={className} viewBox="0 0 24 24">
      <path data-ev-id="ev_9a776fe2f3" fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>);

}

function YoutubeIcon({ className }: {className?: string;}) {
  return (
    <svg data-ev-id="ev_cfaa18a8b6" className={className} viewBox="0 0 24 24">
      <path data-ev-id="ev_c6d307bf58" fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>);

}

export function Footer() {
  return (
    <footer data-ev-id="ev_ce84c34fae" className="bg-[#1A1A2E] text-white">
      <div data-ev-id="ev_2b7b685a19" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div data-ev-id="ev_e5d8e7dded" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div data-ev-id="ev_1ea444df2f" className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div data-ev-id="ev_9697e09b8b" className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span data-ev-id="ev_9d8967238d" className="text-2xl font-bold">
                voo<span data-ev-id="ev_50968a76e2" className="text-[#FF6B35]">trip</span>
              </span>
            </Link>
            <p data-ev-id="ev_87906dae45" className="text-white/70 text-sm leading-relaxed">
              Sua agência de viagens completa. Trabalhamos com os melhores parceiros 
              em voos, hotéis, traslados e aluguel de carros para sua viagem perfeita.
            </p>
            <div data-ev-id="ev_804b19e04f" className="flex items-center gap-3 mt-2">
              <SocialLink href="https://www.instagram.com/vootrip_oficial/" icon={<InstagramIcon className="w-5 h-5" />} label="Instagram" />
              <SocialLink href="https://facebook.com/vootrip" icon={<FacebookIcon className="w-5 h-5" />} label="Facebook" />
              <SocialLink href="https://x.com/vootrip" icon={<TwitterIcon className="w-5 h-5" />} label="X" />
              <SocialLink href="https://youtube.com/@vootrip" icon={<YoutubeIcon className="w-5 h-5" />} label="YouTube" />
            </div>
          </div>

          {/* Serviços */}
          <div data-ev-id="ev_09b56b8960">
            <h4 data-ev-id="ev_cec0bdbf0a" className="font-semibold text-lg mb-4">Serviços</h4>
            <ul data-ev-id="ev_8996a0cb6c" className="flex flex-col gap-3">
              <FooterLink to="/" label="Passagens Aéreas" />
              <FooterLink to="/" label="Hotéis e Resorts" />
              <FooterLink to="/" label="Aluguel de Carros" />
              <FooterLink to="/" label="Traslados" />
              <FooterLink to="/" label="Pacotes de Viagem" />
            </ul>
          </div>

          {/* Institucional */}
          <div data-ev-id="ev_6e874fba95">
            <h4 data-ev-id="ev_351204b388" className="font-semibold text-lg mb-4">Institucional</h4>
            <ul data-ev-id="ev_f95073d6bf" className="flex flex-col gap-3">
              <FooterLink to="/sobre" label="Sobre Nós" />
              <FooterLink to="/como-funciona" label="Como Funciona" />
              <FooterLink to="/parceiros" label="Seja Parceiro" />
              <FooterLink to="/carreiras" label="Carreiras" />
            </ul>
          </div>

          {/* Contato */}
          <div data-ev-id="ev_657e8da7a6">
            <h4 data-ev-id="ev_4c88d7b887" className="font-semibold text-lg mb-4">Contato</h4>
            <ul data-ev-id="ev_61cc787149" className="flex flex-col gap-4">
              <li data-ev-id="ev_c71c2cc473" className="flex items-start gap-3 text-white/70">
                <Mail className="w-5 h-5 mt-0.5 text-[#FF6B35]" />
                <a data-ev-id="ev_0a049edc46" href="mailto:contato@vootrip.com" className="text-sm hover:text-white transition-colors">contato@vootrip.com</a>
              </li>
              <li data-ev-id="ev_7fd217ce32" className="flex items-start gap-3 text-white/70">
                <WhatsAppIcon className="w-5 h-5 mt-0.5 text-[#25D366]" />
                <a data-ev-id="ev_cce232099e"
                href="https://wa.me/5548998365852"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors">

                  (48) 99836-5852
                </a>
              </li>
              <li data-ev-id="ev_eb9321e950" className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 mt-0.5 text-[#FF6B35]" />
                <span data-ev-id="ev_2cfc75a210" className="text-sm">Florianópolis, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certificações */}
        <div data-ev-id="ev_cert1a2b3c" className="mt-12 pt-8 border-t border-white/10">
          <p data-ev-id="ev_cert2b3c4d" className="text-white/50 text-sm text-center mb-4">
            Certificações e Parcerias
          </p>
          <div data-ev-id="ev_cert3c4d5e" className="flex flex-wrap items-center justify-center gap-6">
            <div data-ev-id="ev_cert4d5e6f" className="bg-white rounded-xl px-6 py-3 flex items-center justify-center">
              <img
                src="/logomarca-cadastur-e1586296578734.png"
                alt="Cadastur - Cadastro de Turismo do Ministério do Turismo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div data-ev-id="ev_cert5e6f7a" className="bg-white rounded-xl px-6 py-3 flex items-center justify-center">
              <img
                src="/Logo-orlando-travel-academy.webp"
                alt="Orlando Travel Academy - Certified Expert Orlando"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div data-ev-id="ev_ad33341cf6" className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p data-ev-id="ev_d959a81488" className="text-white/50 text-sm">
            © 2024 Vootrip. Todos os direitos reservados.
          </p>
          <div data-ev-id="ev_18f93faf37" className="flex items-center gap-6">
            <Link to="/termos" className="text-white/50 text-sm hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="text-white/50 text-sm hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}

function SocialLink({ href, icon, label }: {href: string;icon: React.ReactNode;label: string;}) {
  return (
    <a data-ev-id="ev_bfb1e7520c"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">

      {icon}
    </a>);

}

function FooterLink({ to, label }: {to: string;label: string;}) {
  return (
    <li data-ev-id="ev_1512affc28">
      <Link to={to} className="text-white/70 text-sm hover:text-white transition-colors">
        {label}
      </Link>
    </li>);

}
