import { useState } from 'react';
import { AdminLayout } from '@/pages/admin/AdminDashboard';
import { useDisneyPackages, DisneyPackage } from '@/hooks/useDisneyPackages';
import { Plus, Pencil, Trash2, X, Loader2, Star } from 'lucide-react';

interface FormData {
  nome: string;
  dias: string;
  preco: string;
  destaque: boolean;
  inclui: string;
  imagem: string;
  descricao: string;
}

const emptyForm: FormData = {
  nome: '',
  dias: '',
  preco: '',
  destaque: false,
  inclui: '',
  imagem: '',
  descricao: ''
};

export default function AdminDisney() {
  const { packages, loading, createPackage, updatePackage, deletePackage } = useDisneyPackages();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEdit = (pkg: DisneyPackage) => {
    setFormData({
      nome: pkg.nome,
      dias: pkg.dias,
      preco: pkg.preco,
      destaque: pkg.destaque ?? false,
      inclui: (pkg.inclui ?? []).join('\n'),
      imagem: pkg.imagem ?? '',
      descricao: pkg.descricao ?? ''
    });
    setEditingId(pkg.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const incluiArray = formData.inclui
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const data = {
      nome: formData.nome,
      dias: formData.dias,
      preco: formData.preco,
      destaque: formData.destaque,
      inclui: incluiArray,
      imagem: formData.imagem || null,
      descricao: formData.descricao || null
    };

    if (editingId) {
      await updatePackage(editingId, data);
    } else {
      await createPackage(data);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pacote?')) {
      await deletePackage(id);
    }
  };

  return (
    <AdminLayout title="Pacotes Disney">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-[#64748B]">Gerencie os pacotes da página Disney</p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Novo Pacote
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
          </div>
        )}

        {/* Lista de Pacotes */}
        {!loading && packages.length === 0 && (
          <div className="text-center py-12 text-[#64748B]">
            Nenhum pacote cadastrado. Clique em "Novo Pacote" para começar.
          </div>
        )}

        {!loading && packages.length > 0 && (
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0] flex items-center gap-4"
              >
                {/* Imagem */}
                {pkg.imagem && (
                  <img
                    src={pkg.imagem}
                    alt={pkg.nome}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1A1A2E]">{pkg.nome}</h3>
                    {pkg.destaque && (
                      <span className="px-2 py-0.5 bg-[#FF6B35] text-white text-xs rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> Destaque
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B]">{pkg.dias}</p>
                  <p className="text-[#FF6B35] font-bold">{pkg.preco}</p>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(pkg)}
                    className="p-2 text-[#64748B] hover:text-[#FF6B35] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1A1A2E]">
                  {editingId ? 'Editar Pacote' : 'Novo Pacote'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#64748B]" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Nome do pacote *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
