import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Workflow {
  id: string;
  name: string;
  description: string | null;
  category: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  integrations: string[];
  rating: number;
  downloads: number;
  price: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('workflows')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setWorkflows((data as Workflow[]) || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workflows');
    } finally {
      setLoading(false);
    }
  };

  const downloadWorkflow = async (workflowId: string) => {
    try {
      const { error: downloadError } = await supabase
        .from('downloads')
        .insert({
          workflow_id: workflowId,
        });

      if (downloadError && !downloadError.message.includes('duplicate')) {
        throw downloadError;
      }

      // Refresh workflows to get updated download count
      await fetchWorkflows();
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to download workflow' 
      };
    }
  };

  return {
    workflows,
    loading,
    error,
    downloadWorkflow,
    refetch: fetchWorkflows,
  };
}