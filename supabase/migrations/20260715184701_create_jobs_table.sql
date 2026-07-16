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

CREATE INDEX idx_jobs_active ON public.jobs(active);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Leitura pública (vagas ativas)
CREATE POLICY "Public can view active jobs" ON public.jobs
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Admin autenticado pode ver todas
CREATE POLICY "Authenticated can view all jobs" ON public.jobs
  FOR SELECT TO authenticated
  USING (true);

-- Apenas autenticados podem criar/editar/deletar
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

-- Trigger para updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE
  ON public.jobs FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();