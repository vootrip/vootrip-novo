import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type DisneyPark = Tables<'disney_parks'>;
export type DisneyParkInsert = TablesInsert<'disney_parks'>;
export type DisneyParkUpdate = TablesUpdate<'disney_parks'>;

export function useDisneyParks() {
  const [parks, setParks] = useState<DisneyPark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParks = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('disney_parks')
        .select('*')
        .order('ordem', { ascending: true });

      if (fetchError) throw fetchError;
      setParks(data ?? []);
      setError(null);
    } catch (err) {
      console.error('Error fetching disney parks:', err);
      setError('Erro ao carregar parques');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParks();
  }, [fetchParks]);

  const createPark = async (park: Omit<DisneyParkInsert, 'id' | 'created_at' | 'updated_at'>) => {
    if (!supabase) return null;

    try {
      const { data, error: insertError } = await supabase
        .from('disney_parks')
        .insert(park)
        .select()
        .single();

      if (insertError) throw insertError;
      await fetchParks();
      return data;
    } catch (err) {
      console.error('Error creating disney park:', err);
      return null;
    }
  };

  const updatePark = async (id: string, updates: DisneyParkUpdate) => {
    if (!supabase) return null;

    try {
      const { data, error: updateError } = await supabase
        .from('disney_parks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      await fetchParks();
      return data;
    } catch (err) {
      console.error('Error updating disney park:', err);
      return null;
    }
  };

  const deletePark = async (id: string) => {
    if (!supabase) return false;

    try {
      const { error: deleteError } = await supabase
        .from('disney_parks')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchParks();
      return true;
    } catch (err) {
      console.error('Error deleting disney park:', err);
      return false;
    }
  };

  return {
    parks,
    loading,
    error,
    createPark,
    updatePark,
    deletePark,
    refetch: fetchParks
  };
}
