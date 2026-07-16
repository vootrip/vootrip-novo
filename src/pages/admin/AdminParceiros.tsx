import { useState } from 'react';
import { AdminLayout } from './AdminDashboard';
import { Plus, Pencil, Trash2, X, Loader2, ExternalLink } from 'lucide-react';
import { usePartners, type Partner, type PartnerInsert } from '@/hooks/usePartners';

interface FormData {
  nome: string;
  logo: string;
  url: string;
  tagline: string;
  tipo: string;
  ativo: boolean;
}

const emptyForm: FormData = {
  nome: '',
  logo: '',
  url: '',
  tagline: '',
  tipo: '',
  ativo: true
};

const tipos = ['Companhia Aérea', 'Hotel', 'Seguro Viagem', 'Chip Internacional', 'Aluguel de Carro', 'Transfer', 'Outro'];

export default function AdminParceiros() {
  const { partners, loading, createPartner, updatePartner, deletePartner } = usePartners();
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Partner | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abrirModal = (parceiro?: Partner) => {
    if (parceiro) {
      setEditando(parceiro);
      setForm({
        nome: parceiro.nome,
        logo: parceiro.logo ?? '',
        url: parceiro.url ?? '',
        tagline: parceiro.tagline ?? '',
        tipo: parceiro.tipo ?? '',
        ativo: parceiro.ativo ?? true
      });
    } else {
      setEditando(null);
      setForm(emptyForm);
    }
    setError(null);
    setModalOpen(true);
  };

  const salvar = async () => {
    if (!form.nome) {
      setError('Preencha o nome do parceiro');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editando) {
        const { error } = await updatePartner(editando.id, {
          nome: form.nome,
          logo: form.logo || null,
          url: form.url || null,
          tagline: form.tagline || null,
          tipo: form.tipo || null,
          ativo: form.ativo
        });
        if (error) throw new Error(error);
      } else {
        const newPartner: PartnerInsert = {
          nome: form.nome,
          logo: form.logo || null,
          url: form.url || null,
          tagline: form.tagline || null,
          tipo: form.tipo || null,
          ativo: form.ativo
        };
        const { error } = await createPartner(newPartner);
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
    if (confirm('Tem certeza que deseja excluir este parceiro?')) {
      const { error } = await deletePartner(id);
      if (error) {
        alert('Erro ao excluir: ' + error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Gerenciar Parceiros">
        <div data-ev-id="ev_7cd9c953e3" className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Gerenciar Parceiros">
      {/* Header */}
      <div data-ev-id="ev_e5e3c09e35" className="flex items-center justify-between mb-6">
        <p data-ev-id="ev_ff986f854e" className="text-[#64748B]">Gerencie os parceiros e companhias</p>
        <button data-ev-id="ev_e9dd490d51"
        onClick={() => abrirModal()}
        className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors">

          <Plus className="w-5 h-5" />
          Novo Parceiro
        </button>
      </div>

      {/* Lista */}
      <div data-ev-id="ev_9b757bba1f" className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {partners.length === 0 ?
        <div data-ev-id="ev_169613bbb6" className="p-12 text-center">
            <p data-ev-id="ev_e7350f804c" className="text-[#64748B]">Nenhum parceiro cadastrado ainda.</p>
            <button data-ev-id="ev_f9b4055986"
          onClick={() => abrirModal()}
          className="mt-4 text-[#FF6B35] hover:underline">

              Criar primeiro parceiro
            </button>
          </div> :

        <table data-ev-id="ev_04c4be1aa8" className="w-full">
            <thead data-ev-id="ev_492a0ab759" className="bg-[#F8FAFC] border-b border-gray-200">
              <tr data-ev-id="ev_33a43b0f21">
                <th data-ev-id="ev_4d6886d21a" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Parceiro</th>
                <th data-ev-id="ev_6633891165" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Tipo</th>
                <th data-ev-id="ev_03ad5f2c5e" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Status</th>
                <th data-ev-id="ev_5ef4dc1420" className="px-6 py-4 text-right text-sm font-medium text-[#64748B]">Ações</th>
              </tr>
            </thead>
            <tbody data-ev-id="ev_119e750824" className="divide-y divide-gray-100">
              {partners.map((parceiro) =>
            <tr data-ev-id="ev_d5bbae6e7f" key={parceiro.id} className="hover:bg-[#F8FAFC]">
                  <td data-ev-id="ev_571b82bbda" className="px-6 py-4">
                    <div data-ev-id="ev_055bf70484" className="flex items-center gap-4">
                      {parceiro.logo &&
                  <img data-ev-id="ev_9ea068a0a2"
                  src={parceiro.logo}
                  alt={parceiro.nome}
                  className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1" />

                  }
                      <div data-ev-id="ev_ffa638842b">
                        <p data-ev-id="ev_8062b714fc" className="font-medium text-[#1A1A2E]">{parceiro.nome}</p>
                        <p data-ev-id="ev_21077fd1c9" className="text-sm text-[#64748B]">{parceiro.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td data-ev-id="ev_1f9da7f00d" className="px-6 py-4">
                    <span data-ev-id="ev_c6a9f33c4a" className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {parceiro.tipo || 'Outro'}
                    </span>
                  </td>
                  <td data-ev-id="ev_80851dd815" className="px-6 py-4">
                    {parceiro.ativo ?
                <span data-ev-id="ev_d53b9deff5" className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Ativo</span> :

                <span data-ev-id="ev_6a499b1ecc" className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Inativo</span>
                }
                  </td>
                  <td data-ev-id="ev_db42e3d9a0" className="px-6 py-4">
                    <div data-ev-id="ev_042cbade90" className="flex items-center justify-end gap-2">
                      {parceiro.url &&
                  <a data-ev-id="ev_7b99af4841"
                  href={parceiro.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">

                          <ExternalLink className="w-4 h-4" />
                        </a>
                  }
                      <button data-ev-id="ev_74af8daab9"
                  onClick={() => abrirModal(parceiro)}
                  className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">

                        <Pencil className="w-4 h-4" />
                      </button>
                      <button data-ev-id="ev_915b8dae24"
                  onClick={() => excluir(parceiro.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg">

                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        }
      </div>

      {/* Modal */}
      {modalOpen &&
      <div data-ev-id="ev_966fb374c3" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div data-ev-id="ev_9076929026" className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div data-ev-id="ev_e803872d53" className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 data-ev-id="ev_685345f6fb" className="text-xl font-bold text-[#1A1A2E]">
                {editando ? 'Editar Parceiro' : 'Novo Parceiro'}
              </h2>
              <button data-ev-id="ev_537a240dc9" onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-ev-id="ev_9904d05593" className="p-6">
              {error &&
            <div data-ev-id="ev_dd079977be" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p data-ev-id="ev_e004b48812" className="text-red-600 text-sm">{error}</p>
                </div>
            }

              <div data-ev-id="ev_8ebd1458f2" className="grid gap-4">
                <div data-ev-id="ev_4c76467990">
                  <label data-ev-id="ev_5a052f3dfc" className="block text-sm font-medium text-[#1A1A2E] mb-2">Nome *</label>
                  <input data-ev-id="ev_40149a1ed4"
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Ex: LATAM" />

                </div>

                <div data-ev-id="ev_a2beec2947">
                  <label data-ev-id="ev_e30b755bd4" className="block text-sm font-medium text-[#1A1A2E] mb-2">Tagline</label>
                  <input data-ev-id="ev_3e5b8ddbaf"
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Ex: A maior da América Latina" />

                </div>

                <div data-ev-id="ev_1f2c370949">
                  <label data-ev-id="ev_7cfd8f976e" className="block text-sm font-medium text-[#1A1A2E] mb-2">Tipo</label>
                  <select data-ev-id="ev_619c4fe5ad"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]">

                    <option data-ev-id="ev_c392a0f362" value="">Selecione...</option>
                    {tipos.map((t) =>
                  <option data-ev-id="ev_81b9bf2e9c" key={t} value={t}>{t}</option>
                  )}
                  </select>
                </div>

                <div data-ev-id="ev_a996f57853">
                  <label data-ev-id="ev_672b6277ae" className="block text-sm font-medium text-[#1A1A2E] mb-2">URL do Site</label>
                  <input data-ev-id="ev_8cfd3dd83a"
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="https://..." />

                </div>

                <div data-ev-id="ev_a281d139b4">
                  <label data-ev-id="ev_bbeb77b133" className="block text-sm font-medium text-[#1A1A2E] mb-2">URL do Logo</label>
                  <input data-ev-id="ev_d803aff86f"
                type="url"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="https://..." />

                  {form.logo &&
                <img data-ev-id="ev_a327834cd4" src={form.logo} alt="Preview" className="mt-2 w-20 h-20 object-contain bg-gray-50 rounded-lg p-2" />
                }
                </div>

                <div data-ev-id="ev_9bf611e27c" className="flex items-center gap-3">
                  <input data-ev-id="ev_66c3ecffcd"
                type="checkbox"
                id="ativo"
                checked={form.ativo}
                onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]" />

                  <label data-ev-id="ev_c84f4cd262" htmlFor="ativo" className="text-sm font-medium text-[#1A1A2E]">
                    Parceiro ativo
                  </label>
                </div>
              </div>

              {/* Botões */}
              <div data-ev-id="ev_c826df94d4" className="flex justify-end gap-3 mt-6">
                <button data-ev-id="ev_e787c30e5c"
              onClick={() => setModalOpen(false)}
              className="px-6 py-3 text-[#64748B] hover:bg-gray-100 rounded-xl transition-colors"
              disabled={saving}>

                  Cancelar
                </button>
                <button data-ev-id="ev_163a334e8c"
              onClick={salvar}
              disabled={saving}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50 flex items-center gap-2">

                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editando ? 'Salvar' : 'Criar Parceiro'}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </AdminLayout>);

}