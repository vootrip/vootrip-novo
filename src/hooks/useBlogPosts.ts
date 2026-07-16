import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/helpers';

export type BlogPost = Tables<'blog_posts'>;
export type BlogPostInsert = TablesInsert<'blog_posts'>;
export type BlogPostUpdate = TablesUpdate<'blog_posts'>;

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    if (!supabase) {
      setError('Database not enabled');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: BlogPostInsert) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase.from('blog_posts').insert(post);
      if (error) throw error;
      await fetchPosts();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error creating post' };
    }
  };

  const updatePost = async (id: string, updates: BlogPostUpdate) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      await fetchPosts();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error updating post' };
    }
  };

  const deletePost = async (id: string) => {
    if (!supabase) return { error: 'Database not enabled' };

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchPosts();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error deleting post' };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
}
