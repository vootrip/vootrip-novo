import { useState } from 'react';
import { AdminLayout } from './AdminDashboard';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { useDestinations, type Destination, type DestinationInsert } from '@/hooks/useDestinations';

interface FormData {
  nome: string;
  pais: string;
  descricao: string;
  imagem: string;
  categoria: string;
  preco_desde: string;
}

const emptyForm: FormData = {
  nome: '',
  pais: '',
  descricao: '',
  imagem: '',
  categoria: '',
  preco_desde: ''
};

const categorias = ['Praia', 'Cidade', 'Montanha', 'Aventura', 'Romântico', 'Família'];

export default function AdminDestinos() {
  const { destinations, loading, createDestination, updateDestination, deleteDestination } = useDestinations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Destination | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abrirModal = (destino?: Destination) => {
    if (destino) {
      setEditando(destino);
      setForm({
        nome: destino.nome,
        pais: destino.pais,
        descricao: destino.descricao ?? '',
        imagem: destino.imagem ?? '',
        categoria: destino.categoria ?? '',
        preco_desde: destino.preco_desde ?? ''
      });
    } else {
      setEditando(null);
      setForm(emptyForm);
    }
    setError(null);
    setModalOpen(true);
  };

  const salvar = async () => {
    if (!form.nome || !form.pais) {
      setError('Preencha o nome e o país');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editando) {
        const { error } = await updateDestination(editando.id, {
          nome: form.nome,
          pais: form.pais,
          descricao: form.descricao || null,
          imagem: form.imagem || null,
          categoria: form.categoria || null,
          preco_desde: form.preco_desde || null
        });
        if (error) throw new Error(error);
      } else {
        const newDestination: DestinationInsert = {
          nome: form.nome,
          pais: form.pais,
          descricao: form.descricao || null,
          imagem: form.imagem || null,
          categoria: form.categoria || null,
          preco_desde: form.preco_desde || null
        };
        const { error } = await createDestination(newDestination);
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
    if (confirm('Tem certeza que deseja excluir este destino?')) {
      const { error } = await deleteDestination(id);
      if (error) {
        alert('Erro ao excluir: ' + error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Gerenciar Destinos">
        <div data-ev-id="ev_732bf04e10" className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Gerenciar Destinos">
      {/* Header */}
      <div data-ev-id="ev_70a5064b28" className="flex items-center justify-between mb-6">
        <p data-ev-id="ev_432627a181" className="text-[#64748B]">Gerencie os destinos em destaque</p>
        <button data-ev-id="ev_7d95908cf1"
        onClick={() => abrirModal()}
        className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors">

          <Plus className="w-5 h-5" />
          Novo Destino
        </button>
      </div>

      {/* Lista */}
      <div data-ev-id="ev_16947f1d1e" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.length === 0 ?
        <div data-ev-id="ev_6a3a8d6e67" className="col-span-full bg-white rounded-2xl p-12 text-center">
            <p data-ev-id="ev_c4e6374d07" className="text-[#64748B]">Nenhum destino cadastrado ainda.</p>
            <button data-ev-id="ev_8189e8492e"
          onClick={() => abrirModal()}
          className="mt-4 text-[#FF6B35] hover:underline">

              Criar primeiro destino
            </button>
          </div> :

        destinations.map((destino) =>
        <div data-ev-id="ev_35ad3ef610" key={destino.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {destino.imagem &&
          <img data-ev-id="ev_43aa90cf7f"
          src={destino.imagem}
          alt={destino.nome}
          className="w-full h-40 object-cover" />

          }
              <div data-ev-id="ev_8e60804fc4" className="p-4">
                <div data-ev-id="ev_78edc929b4" className="flex items-start justify-between">
                  <div data-ev-id="ev_b28c9b7dd8">
                    <h3 data-ev-id="ev_d34731c9ed" className="font-bold text-[#1A1A2E]">{destino.nome}</h3>
                    <p data-ev-id="ev_27992a0ee5" className="text-sm text-[#64748B]">{destino.pais}</p>
                  </div>
                  {destino.categoria &&
              <span data-ev-id="ev_0bf417a717" className="px-2 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs rounded-full">
                      {destino.categoria}
                    </span>
              }
                </div>
                <p data-ev-id="ev_23fc18174e" className="text-sm text-[#64748B] mt-2 line-clamp-2">{destino.descricao}</p>
                {destino.preco_desde &&
            <p data-ev-id="ev_e8e5b4507a" className="text-sm font-medium text-[#FF6B35] mt-2">A partir de {destino.preco_desde}</p>
            }
                <div data-ev-id="ev_6fac364f43" className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button data-ev-id="ev_34aa0ab5cb"
              onClick={() => abrirModal(destino)}
              className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">

                    <Pencil className="w-4 h-4" />
                  </button>
                  <button data-ev-id="ev_a4751047ed"
              onClick={() => excluir(destino.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg">

                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
        )
        }
      </div>

      {/* Modal */}
      {modalOpen &&
      <div data-ev-id="ev_ea168c7fe3" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div data-ev-id="ev_7ac8c33535" className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div data-ev-id="ev_e23ef1db5d" className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 data-ev-id="ev_cc73c532d8" className="text-xl font-bold text-[#1A1A2E]">
                {editando ? 'Editar Destino' : 'Novo Destino'}
              </h2>
              <button data-ev-id="ev_5c5a527afa" onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-ev-id="ev_858c063513" className="p-6">
              {error &&
            <div data-ev-id="ev_e6e2123bc0" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p data-ev-id="ev_ebeb2b14dc" className="text-red-600 text-sm">{error}</p>
                </div>
            }

              <div data-ev-id="ev_fde64b2036" className="grid gap-4">
                <div data-ev-id="ev_e38f9a9329">
                  <label data-ev-id="ev_e63351a8e2" className="block text-sm font-medium text-[#1A1A2E] mb-2">Nome *</label>
                  <input data-ev-id="ev_2d6c5d1687"
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Ex: Rio de Janeiro" />

                </div>

                <div data-ev-id="ev_fdb8251cdf">
                  <label data-ev-id="ev_2296737a97" className="block text-sm font-medium text-[#1A1A2E] mb-2">País *</label>
                  <input data-ev-id="ev_7bf9e92f78"
                type="text"
                value={form.pais}
                onChange={(e) => setForm({ ...form, pais: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Ex: Brasil" />

                </div>

                <div data-ev-id="ev_368138d047">
                  <label data-ev-id="ev_a056fbe503" className="block text-sm font-medium text-[#1A1A2E] mb-2">Descrição</label>
                  <textarea data-ev-id="ev_285e964727"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35] resize-none"
                rows={3}
                placeholder="Descreva o destino..." />

                </div>

                <div data-ev-id="ev_5919a16977" className="grid grid-cols-2 gap-4">
                  <div data-ev-id="ev_6f8103b097">
                    <label data-ev-id="ev_2aa870a9c8" className="block text-sm font-medium text-[#1A1A2E] mb-2">Categoria</label>
                    <select data-ev-id="ev_398434e22d"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]">

                      <option data-ev-id="ev_312610e7d5" value="">Selecione...</option>
                      {categorias.map((cat) =>
                    <option data-ev-id="ev_4b11ceade1" key={cat} value={cat}>{cat}</option>
                    )}
                    </select>
                  </div>
                  <div data-ev-id="ev_b87215824b">
                    <label data-ev-id="ev_4b809ffaa5" className="block text-sm font-medium text-[#1A1A2E] mb-2">Preço Desde</label>
                    <input data-ev-id="ev_30514183ef"
                  type="text"
                  value={form.preco_desde}
                  onChange={(e) => setForm({ ...form, preco_desde: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  placeholder="R$ 450" />

                  </div>
                </div>

                <div data-ev-id="ev_bd14aad40c">
                  <label data-ev-id="ev_f793040fee" className="block text-sm font-medium text-[#1A1A2E] mb-2">URL da Imagem</label>
                  <input data-ev-id="ev_5056e89011"
                type="url"
                value={form.imagem}
                onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="https://..." />

                  {form.imagem &&
                <img data-ev-id="ev_9e083da6a3" src={form.imagem} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                }
                </div>
              </div>

              {/* Botões */}
              <div data-ev-id="ev_92180f5bc7" className="flex justify-end gap-3 mt-6">
                <button data-ev-id="ev_1311fbe9f8"
              onClick={() => setModalOpen(false)}
              className="px-6 py-3 text-[#64748B] hover:bg-gray-100 rounded-xl transition-colors"
              disabled={saving}>

                  Cancelar
                </button>
                <button data-ev-id="ev_3733b0350c"
              onClick={salvar}
              disabled={saving}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50 flex items-center gap-2">

                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editando ? 'Salvar' : 'Criar Destino'}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </AdminLayout>);

}