import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type Offer = Tables<'offers'>;
export type OfferInsert = TablesInsert<'offers'>;
export type OfferUpdate = TablesUpdate<'offers'>;

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = async () => {
    if (!supabase) {
      setError('Database not enabled');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching offers');
    } finally {
      setLoading(false);
    }
  };

  const createOffer = async (offer: OfferInsert) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase.from('offers').insert(offer);
      if (error) throw error;
      await fetchOffers();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error creating offer' };
    }
  };

  const updateOffer = async (id: string, updates: OfferUpdate) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('offers')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      await fetchOffers();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error updating offer' };
    }
  };

  const deleteOffer = async (id: string) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchOffers();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error deleting offer' };
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return {
    offers,
    loading,
    error,
    createOffer,
    updateOffer,
    deleteOffer,
    refetch: fetchOffers
  };
}
