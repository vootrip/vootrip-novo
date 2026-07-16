import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type Partner = Tables<'partners'>;
export type PartnerInsert = TablesInsert<'partners'>;
export type PartnerUpdate = TablesUpdate<'partners'>;

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = async () => {
    if (!supabase) {
      setError('Database not enabled');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPartners(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching partners');
    } finally {
      setLoading(false);
    }
  };

  const createPartner = async (partner: PartnerInsert) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase.from('partners').insert(partner);
      if (error) throw error;
      await fetchPartners();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error creating partner' };
    }
  };

  const updatePartner = async (id: string, updates: PartnerUpdate) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('partners')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      await fetchPartners();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error updating partner' };
    }
  };

  const deletePartner = async (id: string) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchPartners();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error deleting partner' };
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return {
    partners,
    loading,
    error,
    createPartner,
    updatePartner,
    deletePartner,
    refetch: fetchPartners
  };
}
