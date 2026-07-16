-- Tabela de ofertas (voos, hotéis, carros)
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('voo', 'hotel', 'carro')),
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

-- Tabela de posts do blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumo TEXT,
  conteudo TEXT,
  imagem TEXT,
  categoria TEXT,
  autor TEXT DEFAULT 'Equipe Vootrip',
  data TEXT,
  publicado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de destinos
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  pais TEXT NOT NULL,
  descricao TEXT,
  imagem TEXT,
  categoria TEXT,
  preco_desde TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de parceiros
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  logo TEXT,
  url TEXT,
  tagline TEXT,
  tipo TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_offers_tipo ON public.offers(tipo);
CREATE INDEX idx_offers_destaque ON public.offers(destaque);
CREATE INDEX idx_blog_posts_publicado ON public.blog_posts(publicado);
CREATE INDEX idx_blog_posts_categoria ON public.blog_posts(categoria);
CREATE INDEX idx_destinations_categoria ON public.destinations(categoria);
CREATE INDEX idx_partners_ativo ON public.partners(ativo);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON public.destinations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: Leitura pública, escrita apenas autenticados

-- OFFERS
CREATE POLICY "offers_select_public" ON public.offers
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "offers_insert_auth" ON public.offers
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "offers_update_auth" ON public.offers
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "offers_delete_auth" ON public.offers
  FOR DELETE TO authenticated USING (true);

-- BLOG_POSTS
CREATE POLICY "blog_posts_select_public" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "blog_posts_insert_auth" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "blog_posts_update_auth" ON public.blog_posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "blog_posts_delete_auth" ON public.blog_posts
  FOR DELETE TO authenticated USING (true);

-- DESTINATIONS
CREATE POLICY "destinations_select_public" ON public.destinations
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "destinations_insert_auth" ON public.destinations
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "destinations_update_auth" ON public.destinations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "destinations_delete_auth" ON public.destinations
  FOR DELETE TO authenticated USING (true);

-- PARTNERS
CREATE POLICY "partners_select_public" ON public.partners
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "partners_insert_auth" ON public.partners
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "partners_update_auth" ON public.partners
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "partners_delete_auth" ON public.partners
  FOR DELETE TO authenticated USING (true);