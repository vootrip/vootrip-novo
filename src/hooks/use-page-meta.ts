import { useEffect } from 'react';

/**
 * Define o <title> da aba e a meta description da página atual.
 * Sem isso, todas as páginas do site mostram o mesmo título/descrição
 * fixos do index.html — ruim pro Google e pra quem abre várias abas.
 *
 * Uso: usePageMeta('Sobre nós', 'Descrição curta da página...');
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? '';

    document.title = `${title} | vootrip`;
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
