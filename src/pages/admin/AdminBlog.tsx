import { useState } from 'react';
import { AdminLayout } from './AdminDashboard';
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { useBlogPosts, type BlogPost, type BlogPostInsert } from '@/hooks/useBlogPosts';

interface FormData {
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
  categoria: string;
  autor: string;
  data: string;
  publicado: boolean;
}

const emptyForm: FormData = {
  titulo: '',
  resumo: '',
  conteudo: '',
  imagem: '',
  categoria: '',
  autor: 'Equipe Vootrip',
  data: new Date().toLocaleDateString('pt-BR'),
  publicado: false
};

const categorias = ['Destinos', 'Dicas', 'Promoções', 'Roteiros', 'Notícias'];

export default function AdminBlog() {
  const { posts, loading, createPost, updatePost, deletePost } = useBlogPosts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abrirModal = (post?: BlogPost) => {
    if (post) {
      setEditando(post);
      setForm({
        titulo: post.titulo,
        resumo: post.resumo ?? '',
        conteudo: post.conteudo ?? '',
        imagem: post.imagem ?? '',
        categoria: post.categoria ?? '',
        autor: post.autor ?? 'Equipe Vootrip',
        data: post.data ?? new Date().toLocaleDateString('pt-BR'),
        publicado: post.publicado ?? false
      });
    } else {
      setEditando(null);
      setForm(emptyForm);
    }
    setError(null);
    setModalOpen(true);
  };

  const salvar = async () => {
    if (!form.titulo) {
      setError('Preencha o título do post');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editando) {
        const { error } = await updatePost(editando.id, {
          titulo: form.titulo,
          resumo: form.resumo || null,
          conteudo: form.conteudo || null,
          imagem: form.imagem || null,
          categoria: form.categoria || null,
          autor: form.autor || null,
          data: form.data || null,
          publicado: form.publicado
        });
        if (error) throw new Error(error);
      } else {
        const newPost: BlogPostInsert = {
          titulo: form.titulo,
          resumo: form.resumo || null,
          conteudo: form.conteudo || null,
          imagem: form.imagem || null,
          categoria: form.categoria || null,
          autor: form.autor || null,
          data: form.data || null,
          publicado: form.publicado
        };
        const { error } = await createPost(newPost);
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
    if (confirm('Tem certeza que deseja excluir este post?')) {
      const { error } = await deletePost(id);
      if (error) {
        alert('Erro ao excluir: ' + error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Gerenciar Blog">
        <div data-ev-id="ev_822854f3e5" className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Gerenciar Blog">
      {/* Header */}
      <div data-ev-id="ev_0c05511a8b" className="flex items-center justify-between mb-6">
        <p data-ev-id="ev_446982bf66" className="text-[#64748B]">Gerencie os posts do blog</p>
        <button data-ev-id="ev_9eb455977c"
        onClick={() => abrirModal()}
        className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors">

          <Plus className="w-5 h-5" />
          Novo Post
        </button>
      </div>

      {/* Lista */}
      <div data-ev-id="ev_236eac2edb" className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {posts.length === 0 ?
        <div data-ev-id="ev_7888149b01" className="p-12 text-center">
            <p data-ev-id="ev_e9dc762fad" className="text-[#64748B]">Nenhum post cadastrado ainda.</p>
            <button data-ev-id="ev_e2979712e2"
          onClick={() => abrirModal()}
          className="mt-4 text-[#FF6B35] hover:underline">

              Criar primeiro post
            </button>
          </div> :

        <table data-ev-id="ev_b39a67ad90" className="w-full">
            <thead data-ev-id="ev_fc96a6e9ee" className="bg-[#F8FAFC] border-b border-gray-200">
              <tr data-ev-id="ev_889a46145d">
                <th data-ev-id="ev_de3fba2ebb" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Post</th>
                <th data-ev-id="ev_659916e923" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Categoria</th>
                <th data-ev-id="ev_dbb49bb0d6" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Data</th>
                <th data-ev-id="ev_505b24661a" className="px-6 py-4 text-left text-sm font-medium text-[#64748B]">Status</th>
                <th data-ev-id="ev_46b0d9e8bd" className="px-6 py-4 text-right text-sm font-medium text-[#64748B]">Ações</th>
              </tr>
            </thead>
            <tbody data-ev-id="ev_78b29fad49" className="divide-y divide-gray-100">
              {posts.map((post) =>
            <tr data-ev-id="ev_6fcc7c1a9f" key={post.id} className="hover:bg-[#F8FAFC]">
                  <td data-ev-id="ev_e062045e8b" className="px-6 py-4">
                    <div data-ev-id="ev_c3e60fd355" className="flex items-center gap-4">
                      {post.imagem &&
                  <img data-ev-id="ev_17c9022734"
                  src={post.imagem}
                  alt={post.titulo}
                  className="w-16 h-12 rounded-lg object-cover" />

                  }
                      <div data-ev-id="ev_05dd34f79c">
                        <p data-ev-id="ev_2037dd6b78" className="font-medium text-[#1A1A2E]">{post.titulo}</p>
                        <p data-ev-id="ev_6c59b550a7" className="text-sm text-[#64748B] line-clamp-1">{post.resumo}</p>
                      </div>
                    </div>
                  </td>
                  <td data-ev-id="ev_3c92bcd913" className="px-6 py-4">
                    <span data-ev-id="ev_7b0a0ec5b1" className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {post.categoria || 'Sem categoria'}
                    </span>
                  </td>
                  <td data-ev-id="ev_881c1c9adf" className="px-6 py-4 text-sm text-[#64748B]">{post.data}</td>
                  <td data-ev-id="ev_1c77278a5b" className="px-6 py-4">
                    {post.publicado ?
                <span data-ev-id="ev_4ef63a3508" className="flex items-center gap-1 text-green-600 text-sm">
                        <Eye className="w-4 h-4" /> Publicado
                      </span> :

                <span data-ev-id="ev_85e245ecc2" className="flex items-center gap-1 text-gray-500 text-sm">
                        <EyeOff className="w-4 h-4" /> Rascunho
                      </span>
                }
                  </td>
                  <td data-ev-id="ev_2f112e96a0" className="px-6 py-4">
                    <div data-ev-id="ev_6cb4d30837" className="flex items-center justify-end gap-2">
                      <button data-ev-id="ev_712da18dff"
                  onClick={() => abrirModal(post)}
                  className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">

                        <Pencil className="w-4 h-4" />
                      </button>
                      <button data-ev-id="ev_13c94d7767"
                  onClick={() => excluir(post.id)}
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
      <div data-ev-id="ev_b26a846f4b" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div data-ev-id="ev_68429550d2" className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div data-ev-id="ev_f794591024" className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 data-ev-id="ev_78ee4513c8" className="text-xl font-bold text-[#1A1A2E]">
                {editando ? 'Editar Post' : 'Novo Post'}
              </h2>
              <button data-ev-id="ev_870c4a48f5" onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div data-ev-id="ev_fedbdaa67e" className="p-6">
              {error &&
            <div data-ev-id="ev_66836ed7e4" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p data-ev-id="ev_bf2b23f228" className="text-red-600 text-sm">{error}</p>
                </div>
            }

              <div data-ev-id="ev_364da09a91" className="grid gap-6">
                {/* Título */}
                <div data-ev-id="ev_df6e982c27">
                  <label data-ev-id="ev_93b10a3f0a" className="block text-sm font-medium text-[#1A1A2E] mb-2">Título *</label>
                  <input data-ev-id="ev_f0a2ea8a4b"
                type="text"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="Título do post" />

                </div>

                {/* Resumo */}
                <div data-ev-id="ev_442ae8b403">
                  <label data-ev-id="ev_4293f6f8cb" className="block text-sm font-medium text-[#1A1A2E] mb-2">Resumo</label>
                  <textarea data-ev-id="ev_e488c91637"
                value={form.resumo}
                onChange={(e) => setForm({ ...form, resumo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35] resize-none"
                rows={2}
                placeholder="Breve resumo do post..." />

                </div>

                {/* Conteúdo */}
                <div data-ev-id="ev_88efe9dee5">
                  <label data-ev-id="ev_715473b71e" className="block text-sm font-medium text-[#1A1A2E] mb-2">Conteúdo</label>
                  <textarea data-ev-id="ev_6e030c9b68"
                value={form.conteudo}
                onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35] resize-none"
                rows={6}
                placeholder="Conteúdo completo do post..." />

                </div>

                {/* Categoria e Autor */}
                <div data-ev-id="ev_0674df41de" className="grid grid-cols-2 gap-4">
                  <div data-ev-id="ev_d16b5c1ee6">
                    <label data-ev-id="ev_98676b93cf" className="block text-sm font-medium text-[#1A1A2E] mb-2">Categoria</label>
                    <select data-ev-id="ev_23d9cbf2e7"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]">

                      <option data-ev-id="ev_2083d1d23a" value="">Selecione...</option>
                      {categorias.map((cat) =>
                    <option data-ev-id="ev_5fb9d4c0a6" key={cat} value={cat}>{cat}</option>
                    )}
                    </select>
                  </div>
                  <div data-ev-id="ev_88c70e4881">
                    <label data-ev-id="ev_4e1c0ca470" className="block text-sm font-medium text-[#1A1A2E] mb-2">Autor</label>
                    <input data-ev-id="ev_b57d6723e5"
                  type="text"
                  value={form.autor}
                  onChange={(e) => setForm({ ...form, autor: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  placeholder="Nome do autor" />

                  </div>
                </div>

                {/* Imagem */}
                <div data-ev-id="ev_8cb869cc3c">
                  <label data-ev-id="ev_cf23011410" className="block text-sm font-medium text-[#1A1A2E] mb-2">URL da Imagem</label>
                  <input data-ev-id="ev_7b7fb69302"
                type="url"
                value={form.imagem}
                onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                placeholder="https://..." />

                  {form.imagem &&
                <img data-ev-id="ev_5fc0ced81d" src={form.imagem} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-lg" />
                }
                </div>

                {/* Publicado */}
                <div data-ev-id="ev_ea9d76d634" className="flex items-center gap-3">
                  <input data-ev-id="ev_3d286b34e8"
                type="checkbox"
                id="publicado"
                checked={form.publicado}
                onChange={(e) => setForm({ ...form, publicado: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]" />

                  <label data-ev-id="ev_4c6b03e270" htmlFor="publicado" className="text-sm font-medium text-[#1A1A2E]">
                    Publicar agora
                  </label>
                </div>
              </div>

              {/* Botões */}
              <div data-ev-id="ev_decac96f0c" className="flex justify-end gap-3 mt-8">
                <button data-ev-id="ev_c75081f0a9"
              onClick={() => setModalOpen(false)}
              className="px-6 py-3 text-[#64748B] hover:bg-gray-100 rounded-xl transition-colors"
              disabled={saving}>

                  Cancelar
                </button>
                <button data-ev-id="ev_585eedf571"
              onClick={salvar}
              disabled={saving}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] transition-colors disabled:opacity-50 flex items-center gap-2">

                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editando ? 'Salvar' : 'Criar Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </AdminLayout>);

}