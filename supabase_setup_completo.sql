-- =====================================================
-- VOOTRIP - Script Completo para Supabase
-- Execute este script no SQL Editor do seu Supabase
-- =====================================================

-- =====================================================
-- 1. FUNÇÃO DE TRIGGER PARA UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- 2. TABELA: OFFERS (Ofertas)
-- =====================================================

CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL DEFAULT 'voo',
  titulo TEXT NOT NULL,
  descricao TEXT,
  preco_original TEXT,
  preco_atual TEXT NOT NULL,
  desconto TEXT,
  validade TEXT,
  imagem TEXT,
  search_url TEXT NOT NULL,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger para updated_at
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE
  ON public.offers FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public can view offers" ON public.offers
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert offers" ON public.offers
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update offers" ON public.offers
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete offers" ON public.offers
  FOR DELETE TO authenticated
  USING (true);

-- =====================================================
-- 3. TABELA: BLOG_POSTS (Posts do Blog)
-- =====================================================

CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumo TEXT,
  conteudo TEXT,
  imagem TEXT,
  categoria TEXT,
  autor TEXT DEFAULT 'Equipe Vootrip',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger para updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE
  ON public.blog_posts FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public can view published posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated
  USING (true);

-- =====================================================
-- 4. TABELA: DESTINATIONS (Destinos)
-- =====================================================

CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  pais TEXT NOT NULL,
  descricao TEXT,
  imagem TEXT,
  preco_base TEXT,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger para updated_at
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE
  ON public.destinations FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public can view destinations" ON public.destinations
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert destinations" ON public.destinations
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update destinations" ON public.destinations
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete destinations" ON public.destinations
  FOR DELETE TO authenticated
  USING (true);

-- =====================================================
-- 5. TABELA: PARTNERS (Parceiros)
-- =====================================================

CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'outro',
  logo TEXT,
  url TEXT,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger para updated_at
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE
  ON public.partners FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public can view active partners" ON public.partners
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert partners" ON public.partners
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update partners" ON public.partners
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete partners" ON public.partners
  FOR DELETE TO authenticated
  USING (true);

-- =====================================================
-- 6. TABELA: JOBS (Vagas de Emprego)
-- =====================================================

CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Tempo Integral',
  description TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índice para vagas ativas
CREATE INDEX idx_jobs_active ON public.jobs(active);

-- Trigger para updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE
  ON public.jobs FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public can view active jobs" ON public.jobs
  FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "Authenticated can view all jobs" ON public.jobs
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert jobs" ON public.jobs
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update jobs" ON public.jobs
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete jobs" ON public.jobs
  FOR DELETE TO authenticated
  USING (true);

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================
-- Após executar este script:
-- 1. Vá em Authentication > Users e crie seu usuário admin
-- 2. Copie a URL e ANON KEY em Settings > API
-- 3. Configure no Netlify como variáveis de ambiente:
--    - VITE_SUPABASE_URL
--    - VITE_SUPABASE_ANON_KEY
-- =====================================================
