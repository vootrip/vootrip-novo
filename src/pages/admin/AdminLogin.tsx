import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Plane, Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  // If already logged in, redirect to admin
  if (user) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-ev-id="ev_6d39a6ae50" className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2D2D44] to-[#1A1A2E] flex items-center justify-center p-4">
      <div data-ev-id="ev_b4d9809cfc" className="w-full max-w-md">
        {/* Logo */}
        <div data-ev-id="ev_ce2f0fa6e6" className="text-center mb-8">
          <div data-ev-id="ev_f001417155" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF9F1C] rounded-2xl mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 data-ev-id="ev_8a0cf2eaad" className="text-2xl font-bold text-white">
            voo<span data-ev-id="ev_f196ed248e" className="text-[#FF6B35]">trip</span>
          </h1>
          <p data-ev-id="ev_061a347fb9" className="text-white/60 mt-2">Painel Administrativo</p>
        </div>

        {/* Form */}
        <form data-ev-id="ev_6884bfb10e" onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 data-ev-id="ev_e65a6c41fc" className="text-xl font-bold text-white mb-6 text-center">
            Entrar
          </h2>

          {/* Email */}
          <div data-ev-id="ev_e190c7b3a3" className="mb-4">
            <label data-ev-id="ev_dd00f00c01" className="block text-white/80 text-sm font-medium mb-2">
              Email
            </label>
            <div data-ev-id="ev_6ac610eca2" className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input data-ev-id="ev_07ba0e7e6c"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors"
              placeholder="seu@email.com"
              required />

            </div>
          </div>

          {/* Password */}
          <div data-ev-id="ev_360c88942b" className="mb-6">
            <label data-ev-id="ev_fbe3f58d8c" className="block text-white/80 text-sm font-medium mb-2">
              Senha
            </label>
            <div data-ev-id="ev_b491768cf0" className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input data-ev-id="ev_adc25d056d"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors"
              placeholder="Sua senha"
              required
              minLength={6} />

              <button data-ev-id="ev_0ade2b3710"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60">

                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error &&
          <div data-ev-id="ev_3be9aab040" className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p data-ev-id="ev_96eff32f6d" className="text-red-300 text-sm">{error}</p>
            </div>
          }

          <button data-ev-id="ev_ce96f69bfd"
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2">

            {loading ?
            <div data-ev-id="ev_aa1e768edb" className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
            'Entrar'
            }
          </button>

          
        </form>
      </div>
    </div>);

}