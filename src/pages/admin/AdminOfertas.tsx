import { useState } from 'react';
import { AdminLayout } from './AdminDashboard';
import { Plus, Pencil, Trash2, Plane, Building2, Car, X, Loader2 } from 'lucide-react';
import { useOffers, type Offer, type OfferInsert } from '@/hooks/useOffers';

type OfferType = 'voo' | 'hotel' | 'carro';

interface FormData {
  tipo: OfferType;
  titulo: string;
  descricao: string;
  preco_original: string;
  preco_atual: string;
  desconto: string;
  validade: string;
  imagem: string;
  search_url: string;
  destaque: boolean;
}

const emptyForm: FormData = {
  tipo: 'voo',
  titulo: '',
  descricao: '',
  preco_original: '',
  preco_atual: '',
  desconto: '',
  validade: '',
  imagem: '',
  search_url: '',
  destaque: false
};

export default function AdminOfertas() {
  const { offers, loading, createOffer, updateOffer, deleteOffer } = useOffers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Offer | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tipoIcons = {
    voo: Plane,
    hotel: Building2,
    carro: Car
  };

  const tipoLabels = {
    voo: 'Passagem Aérea',
    hotel: 'Hotel',
    carro: 'Aluguel de Carro'
  };

  const abrirModal = (oferta?: Offer) => {
    if (oferta) {
      setEditando(oferta);
      setForm({
        tipo: oferta.tipo as OfferType,
        titulo: oferta.titulo,
        descricao: oferta.descricao ?? '',
        preco_original: oferta.preco_original ?? '',
        preco_atual: oferta.preco_atual,
        desconto: oferta.desconto ?? '',
        validade: oferta.validade ?? '',
        imagem: oferta.imagem ?? '',
        search_url: oferta.search_url,
        destaque: oferta.destaque ?? false
      });
    } else {
      setEditando(null);
      setForm(emptyForm);
    }
    setError(null);
    setModalOpen(true);
  };

  const salvar = async () => {
    if (!form.titulo || !form.preco_atual || !form.search_url) {
      setError('Preencha os campos obrigatórios: Título, Preço Atual e Link');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editando) {
        const { error } = await updateOffer(editando.id, {
          tipo: form.tipo,
          titulo: form.titulo,
          descricao: form.descricao || null,
          preco_original: form.preco_original || null,
          preco_atual: form.preco_atual,
          desconto: form.desconto || null,
          validade: form.validade || null,
          imagem: form.imagem || null,
          search_url: form.search_url,
          destaque: form.destaque
        });
        if (error) throw new Error(error);
      } else {
        const newOffer: OfferInsert = {
          tipo: form.tipo,
          titulo: form.titulo,
          descricao: form.descricao || null,
          preco_original: form.preco_original || null,
          preco_atual: form.preco_atual,
          desconto: form.desconto || null,
          validade: form.validade || null,
          imagem: form.imagem || null,
          search_url: form.search_url,
          destaque: form.destaque
        };
        const { error } = await createOffer(newOffer);
        if (error) throw new Error(error);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const excluir = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta oferta?')) {
      const { error } = await deleteOffer(id);
      if (error) {
        alert('Erro ao excluir: ' + error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Gerenciar Ofertas">
        <div data-ev-id="ev_608dad00a7" className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Gerenciar Ofertas">
      {/* Header */}
      <div data-ev-id="ev_4f90cb0c05" className="flex items-center justify-between mb-6">
        <p data-ev-id="ev_716bc55320" className="text-[#64748B]">Gerencie as ofertas de voos, hotéis e carros</p>
        <button data-ev-id="ev_da99e4d86a"
        onClick={() => abrirModal()}
        className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors">

          <Plus className="w-5 h-5" />
          Nova Oferta
        </button>
      </div>

      {/* Lista */}
      <div data-ev-id="ev_638bdb0040" className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {offers.length === 0 ?
        <div data-ev-id="ev_afa4760311" className="p-12 text-center">
            <p data-ev-id="ev_374ba64f55" className="text-[#64748B]">Nenhuma oferta cadastrada ainda.</p>
            <button data-ev-id="ev_fdda78a875"
          onClick={() => abrirModal()}
          className="mt-4 text-[#FF6B35] hover:underline">

              Criar primeira oferta
            </button>
          </div> :

        <table data-ev-id="ev_063a59f696" className="w-full">
            <thead data-ev-id="ev_a204bcdaea" className="bg-[#F8FAFC] border-b border-gray-200">
              <tr data-ev-id="ev_33b9207947">
                <th data-ev-id="ev_e542714727" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Oferta</th>
                <th data-ev-id="ev_00935c6451" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Tipo</th>
                <th data-ev-id="ev_0acf79b0dd" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Preço</th>
                <th data-ev-id="ev_90cb884779" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Destaque</th>
                <th data-ev-id="ev_d00a9ae6cf" className="px-6 py-4 text-right text-sm font-medium text-[#64748B]">Ações</th>
              </tr>
            </thead>
            <tbody data-ev-id="ev_7f2f504912" className="divide-y divide-gray-100">
              {offers.map((oferta) => {
              const Icon = tipoIcons[oferta.tipo as OfferType] || Plane;
              return (
                <tr data-ev-id="ev_66e5e5fc86" key={oferta.id} className="hover:bg-[#F8FAFC]">
                    <td data-ev-id="ev_08a5f1e755" className="px-6 py-4">
                      <div data-ev-id="ev_a050ed52e7" className="flex items-center gap-4">
                        {oferta.imagem &&
                      <img data-ev-id="ev_fc7b90ca9a"
                      src={oferta.imagem}
                      alt={oferta.titulo}
                      className="w-16 h-12 rounded-lg object-cover" />

                      }
                        <div data-ev-id="ev_ce3d36fd0a">
                          <p data-ev-id="ev_f6dc3692ec" className="font-medium text-[#1A1A2E]">{oferta.titulo}</p>
                          <p data-ev-id="ev_c23905b56e" className="text-sm text-[#64748B]">{oferta.descricao}</p>
                        </div>
                      </div>
                    </td>
                    <td data-ev-id="ev_e00ca4ef98" className="px-6 py-4">
                      <div data-ev-id="ev_c784e9194b" className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#64748B]" />
                        <span data-ev-id="ev_d2ca1a5bd0" className="text-sm text-[#64748B]">{tipoLabels[oferta.tipo as OfferType] || oferta.tipo}</span>
                      </div>
                    </td>
                    <td data-ev-id="ev_1169f9c2c5" className="px-6 py-4">
                      <p data-ev-id="ev_cd858201c0" className="font-bold text-[#FF6B35]">{oferta.preco_atual}</p>
                      {oferta.preco_original &&
                    <p data-ev-id="ev_02685159e4" className="text-sm text-[#94A3B8] line-through">{oferta.preco_original}</p>
                    }
                    </td>
                    <td data-ev-id="ev_e5c7834b75" className="px-6 py-4">
                      {oferta.destaque ?
                    <span data-ev-id="ev_edf83a8b76" className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Sim</span> :

                    <span data-ev-id="ev_2d923e4c8b" className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Não</span>
                    }
                    </td>
                    <td data-ev-id="ev_23762a9f77" className="px-6 py-4">
                      <div data-ev-id="ev_8db6c22c61" className="flex items-center justify-end gap-2">
                        <button data-ev-id="ev_6d128dcf1a"
                      onClick={() => abrirModal(oferta)}
                      className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">

                          <Pencil className="w-4 h-4" />
                        </button>
                        <button data-ev-id="ev_691c0e4eb7"
                      onClick={() => excluir(oferta.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg">

                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>);

            })}
            </tbody>
          </table>
        }
      </div>

      {/* Modal */}
      {modalOpen &&
      <div data-ev-id="ev_cf2cb5caca" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div data-ev-id="ev_cd0863aea8" className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div data-ev-id="ev_a1e1ddd555" className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 data-ev-id="ev_b5d225db5c" className="text-xl font-bold text-[#1A1A2E]">
                {editando ? 'Editar Oferta' : 'Nova Oferta'}
              </h2>
              <button data-ev-id="ev_c5841c5b09" onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-ev-id="ev_6a82c13590" className="p-6">
              {error &&
            <div data-ev-id="ev_1f282cae1d" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p data-ev-id="ev_8e057e928f" className="text-red-600 text-sm">{error}</p>
                </div>
            }

              <div data-ev-id="ev_6815609ec0" className="grid gap-6">
                {/* Tipo */}
                <div data-ev-id="ev_40ca308e95">
                  <label data-ev-id="ev_92b0172c52" className="block text-sm font-medium text-[#1A1A2E] mb-2">Tipo de Oferta</label>
                  <div data-ev-id="ev_f70b930c84" className="flex gap-4">
                    {(['voo', 'hotel', 'carro'] as const).map((tipo) => {
                    const Icon = tipoIcons[tipo];
                    return (
                      <button data-ev-id="ev_1f0aa595e4"
                      key={tipo}
                      type="button"
                      onClick={() => setForm({ ...form, tipo })}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      form.tipo === tipo ?
                      'border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]' :
                      'border-gray-200 text-[#64748B] hover:border-gray-300'}`
                      }>

                          <Icon className="w-5 h-5" />
                          {tipoLabels[tipo]}
                        </button>);

                  })}
                  </div>
                </div>

                {/* Título */}
                <div data-ev-id="ev_46ba3607e8">
                  <label data-ev-id="ev_d3e6ad6ae6" className="block text-sm font-medium text-[#1A1A2E] mb-2">Título *</label>
                  <input data-ev-id="ev_f8b8a32d06"
                type="text"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Ex: São Paulo → Lisboa" />

                </div>

                {/* Descrição */}
                <div data-ev-id="ev_bbec6f1346">
                  <label data-ev-id="ev_2023ceca05" className="block text-sm font-medium text-[#1A1A2E] mb-2">Descrição</label>
                  <textarea data-ev-id="ev_eb27792581"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35] resize-none"
                rows={3}
                placeholder="Descreva a oferta..." />

                </div>

                {/* Preços */}
                <div data-ev-id="ev_e2121f522e" className="grid grid-cols-3 gap-4">
                  <div data-ev-id="ev_1550499a85">
                    <label data-ev-id="ev_72ac3a4e7e" className="block text-sm font-medium text-[#1A1A2E] mb-2">Preço Original</label>
                    <input data-ev-id="ev_1a4a8b7848"
                  type="text"
                  value={form.preco_original}
                  onChange={(e) => setForm({ ...form, preco_original: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  placeholder="R$ 4.500" />

                  </div>
                  <div data-ev-id="ev_9b1724fb33">
                    <label data-ev-id="ev_e66cba8bdb" className="block text-sm font-medium text-[#1A1A2E] mb-2">Preço Atual *</label>
                    <input data-ev-id="ev_38e4a70799"
                  type="text"
                  value={form.preco_atual}
                  onChange={(e) => setForm({ ...form, preco_atual: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  placeholder="R$ 2.890" />

                  </div>
                  <div data-ev-id="ev_068454ebb4">
                    <label data-ev-id="ev_73a7ba4278" className="block text-sm font-medium text-[#1A1A2E] mb-2">Desconto</label>
                    <input data-ev-id="ev_2d00ecbb14"
                  type="text"
                  value={form.desconto}
                  onChange={(e) => setForm({ ...form, desconto: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  placeholder="36%" />

                  </div>
                </div>

                {/* Validade */}
                <div data-ev-id="ev_f7d0ba1d97">
                  <label data-ev-id="ev_35b5c7d8e1" className="block text-sm font-medium text-[#1A1A2E] mb-2">Validade</label>
                  <input data-ev-id="ev_a8d7abbaff"
                type="text"
                value={form.validade}
                onChange={(e) => setForm({ ...form, validade: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Até 15/02" />

                </div>

                {/* Imagem */}
                <div data-ev-id="ev_e14b4d4f2f">
                  <label data-ev-id="ev_38d69a1997" className="block text-sm font-medium text-[#1A1A2E] mb-2">URL da Imagem</label>
                  <input data-ev-id="ev_c09273e052"
                type="url"
                value={form.imagem}
                onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="https://..." />

                  {form.imagem &&
                <img data-ev-id="ev_11ffd55368" src={form.imagem} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-lg" />
                }
                </div>

                {/* Link de Afiliado */}
                <div data-ev-id="ev_d00ad39a38">
                  <label data-ev-id="ev_1555e670e3" className="block text-sm font-medium text-[#1A1A2E] mb-2">Link de Afiliado / Busca *</label>
                  <input data-ev-id="ev_1e0cb791a2"
                type="url"
                value={form.search_url}
                onChange={(e) => setForm({ ...form, search_url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="https://www.kiwi.com/..." />

                </div>

                {/* Destaque */}
                <div data-ev-id="ev_68743516f0" className="flex items-center gap-3">
                  <input data-ev-id="ev_0084255bae"
                type="checkbox"
                id="destaque"
                checked={form.destaque}
                onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]" />

                  <label data-ev-id="ev_d5464bd782" htmlFor="destaque" className="text-sm font-medium text-[#1A1A2E]">
                    Exibir em destaque na home
                  </label>
                </div>
              </div>

              {/* Botões */}
              <div data-ev-id="ev_4e8be3d82b" className="flex justify-end gap-3 mt-8">
                <button data-ev-id="ev_bbf315e893"
              onClick={() => setModalOpen(false)}
              className="px-6 py-3 text-[#64748B] hover:bg-gray-100 rounded-xl transition-colors"
              disabled={saving}>

                  Cancelar
                </button>
                <button data-ev-id="ev_d0e70d2883"
              onClick={salvar}
              disabled={saving}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50 flex items-center gap-2">

                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editando ? 'Salvar' : 'Criar Oferta'}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </AdminLayout>);

}