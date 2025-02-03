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
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('season', { ascending: true });

      if (error) throw error;
      
      // Add sample data for season 4
      const season4Deals = [
        {
          id: 1001,
          season: 4,
          episode: 1,
          startup_name: "EcoInnovate",
          industry: "CleanTech",
          ask_amount: 5000000,
          ask_equity: 5,
          valuation: 100000000,
          deal_amount: 5000000,
          deal_equity: 7,
          deal_debt: 0,
          multiple_sharks: true,
          interested_sharks: ["Namita Thapar", "Anupam Mittal", "Vineeta Singh"],
          invested_sharks: ["Namita Thapar", "Anupam Mittal"],
          success_status: "funded",
          created_at: new Date().toISOString()
        },
        // Add more season 4 deals here
      ];

      const allDeals = [...(data || []), ...season4Deals];
      set({ deals: allDeals, error: null });
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

      // Add updated shark data including season 4
      const updatedSharks = [
        {
          id: "1",
          name: "Namita Thapar",
          total_deals: 45,
          total_investment: 150000000,
          appearances: [1, 2, 3, 4],
          profile_image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200",
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          name: "Anupam Mittal",
          total_deals: 42,
          total_investment: 140000000,
          appearances: [1, 2, 3, 4],
          profile_image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&h=200",
          created_at: new Date().toISOString()
        },
        // Add more sharks with updated data
      ];

      set({ sharks: updatedSharks, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchPredictions: async () => {
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Add ML-generated predictions
      const mlPredictions = [
        {
          id: "pred1",
          startup_type: "AI/ML",
          success_probability: 0.85,
          recommended_sharks: ["Namita Thapar", "Anupam Mittal"],
          market_potential: "High",
          risk_factors: ["Market Competition", "Tech Adoption"],
          growth_projection: {
            year1: 2500000,
            year2: 5000000,
            year3: 10000000
          }
        },
        // Add more predictions
      ];

      set({ predictions: [...(data || []), ...mlPredictions] });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchInsights: async () => {
    try {
      // Simulated ML-generated insights
      const personalizedInsights = [
        {
          id: "insight1",
          type: "industry_trend",
          title: "Rising Sectors in 2024",
          description: "AI and Sustainability startups showing 3x growth in valuations",
          confidence_score: 0.92,
          data_points: {
            ai_startups: 45,
            success_rate: 0.72,
            avg_valuation: 15000000
          }
        },
        // Add more insights
      ];

      set({ insights: personalizedInsights });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));