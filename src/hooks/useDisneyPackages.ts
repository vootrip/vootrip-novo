import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type DisneyPackage = Tables<'disney_packages'>;
export type DisneyPackageInsert = TablesInsert<'disney_packages'>;
export type DisneyPackageUpdate = TablesUpdate<'disney_packages'>;

export function useDisneyPackages() {
  const [packages, setPackages] = useState<DisneyPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    if (!supabase) {
      setError('Database not enabled');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('disney_packages')
        .select('*')
        .order('destaque', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching packages');
    } finally {
      setLoading(false);
    }
  };

  const createPackage = async (pkg: DisneyPackageInsert) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase.from('disney_packages').insert(pkg);
      if (error) throw error;
      await fetchPackages();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error creating package' };
    }
  };

  const updatePackage = async (id: string, updates: DisneyPackageUpdate) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('disney_packages')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      await fetchPackages();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error updating package' };
    }
  };

  const deletePackage = async (id: string) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('disney_packages')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchPackages();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error deleting package' };
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return {
    packages,
    loading,
    error,
    createPackage,
    updatePackage,
    deletePackage,
    refetch: fetchPackages
  };
}
