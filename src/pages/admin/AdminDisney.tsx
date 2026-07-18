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
  periodo_estadia: string;
  hotel: string;
  ingressos_disney: boolean;
  plano_refeicoes: string;
}

const emptyForm: FormData = {
  nome: '',
  dias: '',
  preco: '',
  destaque: false,
  inclui: '',
  imagem: '',
  descricao: '',
  periodo_estadia: '',
  hotel: '',
  ingressos_disney: false,
  plano_refeicoes: ''
};

// Lista de hotéis Disney para seleção
const HOTEIS_DISNEY = [
  "Disney's All-Star Movies Resort",
  "Disney's All-Star Music Resort",
  "Disney's All-Star Sports Resort",
  "Disney's Art of Animation Resort",
  "Disney's Pop Century Resort",
  "Disney's Caribbean Beach Resort",
  "Disney's Coronado Springs Resort",
  "Disney's Port Orleans Resort - French Quarter",
  "Disney's Port Orleans Resort - Riverside",
  "Disney's Animal Kingdom Lodge",
  "Disney's Beach Club Resort",
  "Disney's BoardWalk Inn",
  "Disney's Contemporary Resort",
  "Disney's Grand Floridian Resort & Spa",
  "Disney's Polynesian Village Resort",
  "Disney's Wilderness Lodge",
  "Disney's Yacht Club Resort",
  'Outro hotel (especificar na descrição)'
];

// Planos de refeições Disney
const PLANOS_REFEICOES = [
  'Sem plano de refeições',
  'Quick-Service Dining Plan',
  'Disney Dining Plan (Standard)',
  'Disney Dining Plan Plus',
  'Deluxe Dining Plan'
];

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
      descricao: pkg.descricao ?? '',
      periodo_estadia: pkg.periodo_estadia ?? '',
      hotel: pkg.hotel ?? '',
      ingressos_disney: pkg.ingressos_disney ?? false,
      plano_refeicoes: pkg.plano_refeicoes ?? ''
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
      descricao: formData.descricao || null,
      periodo_estadia: formData.periodo_estadia || null,
      hotel: formData.hotel || null,
      ingressos_disney: formData.ingressos_disney,
      plano_refeicoes: formData.plano_refeicoes || null
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
                    placeholder="Ex: Pacote Mágico"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Dias *</label>
                    <input
                      type="text"
                      value={formData.dias}
                      onChange={(e) => setFormData({ ...formData, dias: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      placeholder="Ex: 7 dias / 6 noites"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Preço *</label>
                    <input
                      type="text"
                      value={formData.preco}
                      onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      placeholder="Ex: A partir de R$ 8.990"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">O que inclui (um item por linha)</label>
                  <textarea
                    value={formData.inclui}
                    onChange={(e) => setFormData({ ...formData, inclui: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none"
                    placeholder="Passagem aérea&#10;6 noites de hotel&#10;4 dias de parque&#10;Traslado aeroporto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">URL da imagem</label>
                  <input
                    type="url"
                    value={formData.imagem}
                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Descrição</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none"
                    placeholder="Descrição opcional do pacote"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Período da Estadia</label>
                  <input
                    type="text"
                    value={formData.periodo_estadia}
                    onChange={(e) => setFormData({ ...formData, periodo_estadia: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    placeholder="Ex: 01/03 a 08/03/2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Hospedagem (Hotel Disney)</label>
                  <select
                    value={formData.hotel}
                    onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] bg-white"
                  >
                    <option value="">Selecione um hotel...</option>
                    {HOTEIS_DISNEY.map((hotel) => (
                      <option key={hotel} value={hotel}>{hotel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Plano de Refeições</label>
                  <select
                    value={formData.plano_refeicoes}
                    onChange={(e) => setFormData({ ...formData, plano_refeicoes: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] bg-white"
                  >
                    <option value="">Selecione um plano...</option>
                    {PLANOS_REFEICOES.map((plano) => (
                      <option key={plano} value={plano}>{plano}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="ingressos_disney"
                      checked={formData.ingressos_disney}
                      onChange={(e) => setFormData({ ...formData, ingressos_disney: e.target.checked })}
                      className="w-5 h-5 text-[#FF6B35] rounded"
                    />
                    <label htmlFor="ingressos_disney" className="text-sm text-[#1A1A2E] font-medium">
                      🎟️ Inclui Ingressos Disney
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="destaque"
                      checked={formData.destaque}
                      onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                      className="w-5 h-5 text-[#FF6B35] rounded"
                    />
                    <label htmlFor="destaque" className="text-sm text-[#1A1A2E] font-medium">
                      ⭐ Marcar como destaque
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-[#E2E8F0] text-[#64748B] rounded-xl hover:bg-[#F1F5F9] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Salvando...</>
                  ) : (
                    editingId ? 'Salvar Alterações' : 'Criar Pacote'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
