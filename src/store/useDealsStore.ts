import { create } from 'zustand';
import { api } from '../lib/api';

interface Deal {
  id: number;
  season: number;
  episode: number;
  startup_name: string;
  industry: string;
  ask_amount: number;
  ask_equity: number;
  valuation: number;
  deal_amount: number;
  deal_equity: number;
  deal_debt: number;
  multiple_sharks: boolean;
  interested_sharks: string[];
  invested_sharks: string[];
  success_status: string;
}

interface Shark {
  name: string;
  total_deals: number;
  total_investment: number;
}

interface DealsStore {
  deals: Deal[];
  sharks: Shark[];
  selectedSeason: number;
  loading: boolean;
  error: string | null;
  predictions: any[];
  insights: any[];
  fetchDeals: () => Promise<void>;
  fetchSharks: () => Promise<void>;
  fetchPredictions: () => Promise<void>;
  fetchInsights: () => Promise<void>;
  setSelectedSeason: (season: number) => void;
}

export const useDealsStore = create<DealsStore>((set) => ({
  deals: [],
  sharks: [],
  selectedSeason: 1,
  loading: false,
  error: null,
  predictions: [],
  insights: [],

  fetchDeals: async () => {
    set({ loading: true });
    try {
      const data = await api.fetchDeals();
      set({ deals: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSharks: async () => {
    try {
      const data = await api.fetchSharks();
      set({ sharks: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchPredictions: async () => {
    try {
      const data = await api.fetchPredictions();
      set({ predictions: data });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchInsights: async () => {
    try {
      const data = await api.fetchAnalytics();
      set({ insights: data });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));