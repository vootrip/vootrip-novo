import { useState } from 'react';
import { AdminLayout } from '@/pages/admin/AdminDashboard';
import { useDisneyParks, DisneyPark } from '@/hooks/useDisneyParks';
import { Plus, Pencil, Trash2, X, Loader2, MapPin, Eye, EyeOff } from 'lucide-react';

interface FormData {
  nome: string;
  descricao: string;
  imagem: string;
  destaques: string;
  ordem: number;
  ativo: boolean;
}

const emptyForm: FormData = {
  nome: '',
  descricao: '',
  imagem: '',
  destaques: '',
  ordem: 0,
  ativo: true
};

export default function AdminDisneyParks() {
  const { parks, loading, createPark, updatePark, deletePark } = useDisneyParks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEdit = (park: DisneyPark) => {
    setFormData({
      nome: park.nome,
      descricao: park.descricao ?? '',
      imagem: park.imagem ?? '',
      destaques: (park.destaques ?? []).join('\n'),
      ordem: park.ordem ?? 0,
      ativo: park.ativo ?? true
    });
    setEditingId(park.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const destaquesArray = formData.destaques
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const data = {
      nome: formData.nome,
      descricao: formData.descricao || null,
      imagem: formData.imagem || null,
      destaques: destaquesArray,
      ordem: formData.ordem,
      ativo: formData.ativo
    };

    if (editingId) {
      await updatePark(editingId, data);
    } else {
      await createPark(data);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este parque?')) {
      await deletePark(id);
    }
  };

  return (
    <AdminLayout title="Parques Disney">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-[#64748B]">Gerencie os 4 parques mágicos da página Disney</p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Novo Parque
          </button>
        </div>

        {/* Parks List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
          </div>
        ) : parks.length === 0 ? (
          <div className="text-center py-12 bg-[#FAFBFC] rounded-xl">
            <MapPin className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#64748B]">Nenhum parque cadastrado ainda</p>
            <button
              onClick={openCreate}
              className="mt-4 text-[#FF6B35] hover:underline"
            >
              Criar primeiro parque
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {parks.map((park) => (
              <div
                key={park.id}
                className="flex items-center gap-4 p-4 bg-white border border-[#E2E8F0] rounded-xl hover:shadow-md transition-all"
              >
                {park.imagem && (
                  <img
                    src={park.imagem}
                    alt={park.nome}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#1A1A2E] truncate">{park.nome}</h3>
                    {!park.ativo && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                        Inativo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] truncate">{park.descricao}</p>
                  {park.destaques && park.destaques.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {park.destaques.slice(0, 3).map((destaque, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#FFF5F0] text-[#FF6B35] text-xs rounded-full"
                        >
                          {destaque}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#64748B]">Ordem: {park.ordem}</span>
                  <button
                    onClick={() => openEdit(park)}
                    className="p-2 text-[#64748B] hover:text-[#FF6B35] hover:bg-[#FFF5F0] rounded-lg transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(park.id)}
                    className="p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-bold text-[#1A1A2E]">
                {editingId ? 'Editar Parque' : 'Novo Parque'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-[#FAFBFC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  Nome do Parque *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  required
                  placeholder="Ex: Magic Kingdom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  rows={2}
                  placeholder="Breve descrição do parque"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={formData.imagem}
                  onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  Destaques (um por linha)
                </label>
                <textarea
                  value={formData.destaques}
                  onChange={(e) => setFormData({ ...formData, destaques: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  rows={3}
                  placeholder="Castelo da Cinderela&#10;Space Mountain&#10;Piratas do Caribe"
                />
                <p className="text-xs text-[#64748B] mt-1">Atrações ou características principais</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Ordem
                  </label>
                  <input
                    type="number"
                    value={formData.ordem}
                    onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                      className="w-5 h-5 text-[#FF6B35] border-[#E2E8F0] rounded focus:ring-[#FF6B35]"
                    />
                    <span className="flex items-center gap-2 text-sm text-[#1A1A2E]">
                      {formData.ativo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      {formData.ativo ? 'Ativo (visível)' : 'Inativo'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#FAFBFC] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
