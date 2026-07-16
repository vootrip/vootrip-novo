import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type Destination = Tables<'destinations'>;
export type DestinationInsert = TablesInsert<'destinations'>;
export type DestinationUpdate = TablesUpdate<'destinations'>;

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    if (!supabase) {
      setError('Database not enabled');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDestinations(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching destinations');
    } finally {
      setLoading(false);
    }
  };

  const createDestination = async (destination: DestinationInsert) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase.from('destinations').insert(destination);
      if (error) throw error;
      await fetchDestinations();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error creating destination' };
    }
  };

  const updateDestination = async (id: string, updates: DestinationUpdate) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('destinations')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      await fetchDestinations();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error updating destination' };
    }
  };

  const deleteDestination = async (id: string) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchDestinations();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error deleting destination' };
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return {
    destinations,
    loading,
    error,
    createDestination,
    updateDestination,
    deleteDestination,
    refetch: fetchDestinations
  };
}
