import { useState } from 'react';
import { AdminLayout } from './AdminDashboard';
import { Plus, Pencil, Trash2, Briefcase, X, Loader2, MapPin, Clock, Eye, EyeOff } from 'lucide-react';
import { useJobs, type Job, type JobInsert } from '@/hooks/useJobs';

interface FormData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  active: boolean;
}

const emptyForm: FormData = {
  title: '',
  department: '',
  location: 'Remoto',
  type: 'Tempo Integral',
  description: '',
  active: true
};

const departmentOptions = [
'Tecnologia',
'Design',
'Marketing',
'Atendimento',
'Comercial',
'Financeiro',
'RH',
'Operações'];


const typeOptions = [
'Tempo Integral',
'Meio Período',
'Freelancer',
'Estágio',
'PJ'];


export default function AdminVagas() {
  const { jobs, loading, createJob, updateJob, deleteJob } = useJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Job | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abrirModal = (vaga?: Job) => {
    if (vaga) {
      setEditando(vaga);
      setForm({
        title: vaga.title,
        department: vaga.department,
        location: vaga.location,
        type: vaga.type,
        description: vaga.description,
        active: vaga.active
      });
    } else {
      setEditando(null);
      setForm(emptyForm);
    }
    setError(null);
    setModalOpen(true);
  };

  const salvar = async () => {
    if (!form.title || !form.department || !form.description) {
      setError('Preencha os campos obrigatórios: Título, Departamento e Descrição');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editando) {
        const { error } = await updateJob(editando.id, {
          title: form.title,
          department: form.department,
          location: form.location,
          type: form.type,
          description: form.description,
          active: form.active
        });
        if (error) throw new Error(error);
      } else {
        const { error } = await createJob({
          title: form.title,
          department: form.department,
          location: form.location,
          type: form.type,
          description: form.description,
          active: form.active
        });
        if (error) throw new Error(error);
      }
      setModalOpen(false);
      setForm(emptyForm);
      setEditando(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const excluir = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) return;
    const { error } = await deleteJob(id);
    if (error) {
      alert('Erro ao excluir: ' + error);
    }
  };

  const toggleActive = async (job: Job) => {
    await updateJob(job.id, { active: !job.active });
  };

  return (
    <AdminLayout title="Vagas">
      <div data-ev-id="ev_d1e77a5336" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p data-ev-id="ev_bf30468b4e" className="text-[#64748B]">Gerencie as vagas que aparecem na página de Carreiras</p>
        <button data-ev-id="ev_a9d46181e0"
        onClick={() => abrirModal()}
        className="flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-xl hover:bg-[#e55a2a] transition-colors">

          <Plus className="w-5 h-5" />
          Nova Vaga
        </button>
      </div>

      {loading ?
      <div data-ev-id="ev_c35216251b" className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
        </div> :
      jobs.length === 0 ?
      <div data-ev-id="ev_b187039ae6" className="text-center py-12 bg-white rounded-2xl">
          <Briefcase className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
          <p data-ev-id="ev_8990ff628b" className="text-[#64748B]">Nenhuma vaga cadastrada ainda</p>
          <button data-ev-id="ev_2f6d7c8506"
        onClick={() => abrirModal()}
        className="mt-4 text-[#FF6B35] hover:underline">

            Criar primeira vaga
          </button>
        </div> :

      <div data-ev-id="ev_27c661b7fb" className="flex flex-col gap-4">
          {jobs.map((vaga) =>
        <div data-ev-id="ev_50ef8cb5a6"
        key={vaga.id}
        className={`bg-white rounded-2xl p-6 shadow-sm ${
        !vaga.active ? 'opacity-60' : ''}`
        }>

              <div data-ev-id="ev_4fd3153c55" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div data-ev-id="ev_95f3d03789" className="flex-1">
                  <div data-ev-id="ev_5a257c080b" className="flex items-center gap-2 mb-2">
                    <span data-ev-id="ev_feaa1dad03" className="text-xs font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-1 rounded-full">
                      {vaga.department}
                    </span>
                    {!vaga.active &&
                <span data-ev-id="ev_3f2081814f" className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Inativa
                      </span>
                }
                  </div>
                  <h3 data-ev-id="ev_e5caac4108" className="text-xl font-bold text-[#1A1A2E] mb-2">{vaga.title}</h3>
                  <p data-ev-id="ev_63c780ab23" className="text-[#64748B] text-sm mb-3 line-clamp-2">{vaga.description}</p>
                  <div data-ev-id="ev_a4a4926743" className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                    <span data-ev-id="ev_2370955c8a" className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vaga.location}
                    </span>
                    <span data-ev-id="ev_5cbd54ca0c" className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {vaga.type}
                    </span>
                  </div>
                </div>
                <div data-ev-id="ev_e5a859b7c0" className="flex items-center gap-2">
                  <button data-ev-id="ev_3493c5da5e"
              onClick={() => toggleActive(vaga)}
              className={`p-2 rounded-lg transition-colors ${
              vaga.active ?
              'text-green-600 hover:bg-green-50' :
              'text-gray-400 hover:bg-gray-50'}`
              }
              title={vaga.active ? 'Desativar vaga' : 'Ativar vaga'}>

                    {vaga.active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <button data-ev-id="ev_f73dccca82"
              onClick={() => abrirModal(vaga)}
              className="p-2 text-[#00B4D8] hover:bg-[#00B4D8]/10 rounded-lg transition-colors">

                    <Pencil className="w-5 h-5" />
                  </button>
                  <button data-ev-id="ev_07ea60461a"
              onClick={() => excluir(vaga.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">

                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
        )}
        </div>
      }

      {/* Modal */}
      {modalOpen &&
      <div data-ev-id="ev_aad21386f0" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div data-ev-id="ev_caf3bad3d7" className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div data-ev-id="ev_943377979a" className="flex items-center justify-between p-6 border-b">
              <h2 data-ev-id="ev_a86266c670" className="text-xl font-bold text-[#1A1A2E]">
                {editando ? 'Editar Vaga' : 'Nova Vaga'}
              </h2>
              <button data-ev-id="ev_aa86a4ac62"
            onClick={() => setModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">

                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-ev-id="ev_adc7eb884b" className="p-6 flex flex-col gap-4">
              {error &&
            <div data-ev-id="ev_059146dc78" className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
            }

              <div data-ev-id="ev_082ebedfba">
                <label data-ev-id="ev_6b0049075d" className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  Título da Vaga *
                </label>
                <input data-ev-id="ev_9a3724fe64"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              placeholder="Ex: Desenvolvedor(a) Full Stack" />

              </div>

              <div data-ev-id="ev_1515c68f49" className="grid grid-cols-2 gap-4">
                <div data-ev-id="ev_c36a47830a">
                  <label data-ev-id="ev_5b7204b43c" className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Departamento *
                  </label>
                  <select data-ev-id="ev_8d12c0f11f"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">

                    <option data-ev-id="ev_e235f528f4" value="">Selecione...</option>
                    {departmentOptions.map((dep) =>
                  <option data-ev-id="ev_930df53dc8" key={dep} value={dep}>{dep}</option>
                  )}
                  </select>
                </div>

                <div data-ev-id="ev_f2b6790877">
                  <label data-ev-id="ev_6a701e0924" className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Tipo
                  </label>
                  <select data-ev-id="ev_6fe74b077e"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">

                    {typeOptions.map((tipo) =>
                  <option data-ev-id="ev_8d88e3f07a" key={tipo} value={tipo}>{tipo}</option>
                  )}
                  </select>
                </div>
              </div>

              <div data-ev-id="ev_2ef2f36b6a">
                <label data-ev-id="ev_e8ee55e2e5" className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  Localização
                </label>
                <input data-ev-id="ev_6dcbe9d168"
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              placeholder="Ex: Remoto, São Paulo - SP" />

              </div>

              <div data-ev-id="ev_077b37a37a">
                <label data-ev-id="ev_06745d0083" className="block text-sm font-medium text-[#1A1A2E] mb-1">
                  Descrição *
                </label>
                <textarea data-ev-id="ev_509b5f743e"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none"
              placeholder="Descreva a vaga, responsabilidades e requisitos..." />

              </div>

              <div data-ev-id="ev_e7e3499378" className="flex items-center gap-3">
                <input data-ev-id="ev_4c2686cb9f"
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-5 h-5 text-[#FF6B35] rounded focus:ring-[#FF6B35]" />

                <label data-ev-id="ev_6a46b83509" htmlFor="active" className="text-sm text-[#1A1A2E]">
                  Vaga ativa (visível na página de Carreiras)
                </label>
              </div>
            </div>

            <div data-ev-id="ev_7bdc5950bb" className="flex gap-3 p-6 border-t">
              <button data-ev-id="ev_e14898df32"
            onClick={() => setModalOpen(false)}
            className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors">

                Cancelar
              </button>
              <button data-ev-id="ev_27dd4f9419"
            onClick={salvar}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-xl hover:bg-[#e55a2a] transition-colors disabled:opacity-50">

                {saving ?
              <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </> :

              'Salvar'
              }
              </button>
            </div>
          </div>
        </div>
      }
    </AdminLayout>);

}