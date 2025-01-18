import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Deal = Database['public']['Tables']['deals']['Row'];
type Shark = Database['public']['Tables']['sharks']['Row'];

interface DealsStore {
  deals: Deal[];
  sharks: Shark[];
  selectedSeason: number;
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  fetchSharks: () => Promise<void>;
  setSelectedSeason: (season: number) => void;
}

export const useDealsStore = create<DealsStore>((set) => ({
  deals: [],
  sharks: [],
  selectedSeason: 1,
  loading: false,
  error: null,
  fetchDeals: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('season', { ascending: true });

      if (error) throw error;
      set({ deals: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  fetchSharks: async () => {
    try {
      const { data, error } = await supabase
        .from('sharks')
        .select('*')
        .order('total_deals', { ascending: false });

      if (error) throw error;
      set({ sharks: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));