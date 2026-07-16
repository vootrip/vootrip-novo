import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type Job = Tables<'jobs'>;
export type JobInsert = TablesInsert<'jobs'>;
export type JobUpdate = TablesUpdate<'jobs'>;

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createJob = async (job: JobInsert) => {
    if (!supabase) return { error: 'Database not enabled' };
    
    const { data, error } = await supabase
      .from('jobs')
      .insert(job)
      .select()
      .single();
    
    if (!error && data) {
      setJobs(prev => [data, ...prev]);
    }
    return { data, error: error?.message };
  };

  const updateJob = async (id: string, updates: JobUpdate) => {
    if (!supabase) return { error: 'Database not enabled' };
    
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) {
      setJobs(prev => prev.map(j => j.id === id ? data : j));
    }
    return { data, error: error?.message };
  };

  const deleteJob = async (id: string) => {
    if (!supabase) return { error: 'Database not enabled' };
    
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setJobs(prev => prev.filter(j => j.id !== id));
    }
    return { error: error?.message };
  };

  return { jobs, loading, createJob, updateJob, deleteJob, refetch: fetchJobs };
}

// Hook para página pública - só vagas ativas
export function useActiveJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveJobs = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };

    fetchActiveJobs();
  }, []);

  return { jobs, loading };
}
