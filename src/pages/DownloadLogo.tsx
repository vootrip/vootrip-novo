import { Download } from 'lucide-react';
import logoIcon from '@/assets/generated/logo-icon.png';
import logoFull from '@/assets/generated/logo-full.png';

export default function DownloadLogo() {
  return (
    <div data-ev-id="ev_f459a27d03" className="min-h-screen bg-gray-100 py-20 px-4">
      <div data-ev-id="ev_ebcbcd7d33" className="max-w-2xl mx-auto">
        <h1 data-ev-id="ev_fa10460c1a" className="text-3xl font-bold text-center text-gray-800 mb-8">
          📥 Download Logos Vootrip
        </h1>
        <p data-ev-id="ev_084bf036ce" className="text-center text-gray-600 mb-12">
          Clique com botão direito na imagem e escolha "Salvar imagem como..."
        </p>

        <div data-ev-id="ev_47c08c8fae" className="grid gap-8">
          {/* Logo Icon */}
          <div data-ev-id="ev_a1d1e59244" className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 data-ev-id="ev_0c87b50e52" className="font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Download className="w-5 h-5 text-orange-500" />
              Ícone / Símbolo
            </h2>
            <div data-ev-id="ev_e6064a0478" className="bg-gray-50 rounded-xl p-8 mb-4">
              <img data-ev-id="ev_c8d8e041db"
              src={logoIcon}
              alt="Ícone Vootrip"
              className="max-w-[200px] max-h-[200px] mx-auto" />

            </div>
            <p data-ev-id="ev_5dc757036f" className="text-sm text-gray-500">Para favicon e ícones de app</p>
          </div>

          {/* Logo Full */}
          <div data-ev-id="ev_69b7775c3c" className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 data-ev-id="ev_f2f6e75d61" className="font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Download className="w-5 h-5 text-orange-500" />
              Logo Completa
            </h2>
            <div data-ev-id="ev_f5a9288219" className="bg-gray-50 rounded-xl p-8 mb-4">
              <img data-ev-id="ev_56495b9e6b"
              src={logoFull}
              alt="Logo Vootrip Completa"
              className="max-w-[280px] max-h-[200px] mx-auto" />

            </div>
            <p data-ev-id="ev_cd240e2873" className="text-sm text-gray-500">Para cabeçalho e materiais</p>
          </div>
        </div>

        <div data-ev-id="ev_fd01a5b231" className="mt-12 text-center">
          <a data-ev-id="ev_c35cb96b85" href="/" className="text-orange-500 font-medium hover:underline">
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>);

}