import { create } from 'zustand';
import { fetchDeals, fetchSharks, fetchPredictions, fetchAnalytics } from '../lib/api';

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
  pitch_description: string;
  product_category: string;
  revenue_current: number;
  revenue_projected: number;
  profit_margin: number;
  team_size: number;
  founded_year: number;
  location: string;
  patent_status: string;
  online_presence: {
    website: string;
    social_media: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
  };
  post_show_status: {
    revenue_growth: number;
    employee_growth: number;
    market_expansion: string[];
    funding_rounds: {
      round: string;
      amount: number;
      investors: string[];
      date: string;
    }[];
  };
}

interface Shark {
  id: string;
  name: string;
  title: string;
  company: string;
  total_deals: number;
  total_investment: number;
  average_equity: number;
  successful_exits: number;
  industry_preference: string[];
  investment_range: {
    min: number;
    max: number;
  };
  notable_investments: string[];
  investment_style: string[];
  season_appearances: number[];
  bio: string;
  expertise: string[];
  education: string[];
  achievements: string[];
  social_media: {
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  investment_stats: {
    by_industry: Record<string, number>;
    by_stage: Record<string, number>;
    success_rate: number;
    average_return: number;
  };
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

// Dummy data for sharks
const dummySharks: Shark[] = [
  {
    id: "1",
    name: "Ashneer Grover",
    title: "Co-founder & Former MD",
    company: "BharatPe",
    total_deals: 24,
    total_investment: 118000000,
    average_equity: 15.5,
    successful_exits: 3,
    industry_preference: ["Fintech", "D2C", "Technology"],
    investment_range: {
      min: 1000000,
      max: 20000000
    },
    notable_investments: ["Brand A", "Company B", "Startup C"],
    investment_style: ["Aggressive", "Numbers-focused", "Quick decision maker"],
    season_appearances: [1, 2],
    bio: "Known for his straightforward approach and business acumen",
    expertise: ["Fintech", "Scaling", "Operations"],
    education: ["IIT Delhi", "IIM Ahmedabad"],
    achievements: ["Built BharatPe", "Unicorn founder"],
    social_media: {
      twitter: "@Ashneer_Grover",
      linkedin: "ashneergrover",
      instagram: "ashneer.grover"
    },
    investment_stats: {
      by_industry: {
        "Fintech": 35,
        "D2C": 25,
        "Technology": 40
      },
      by_stage: {
        "Seed": 40,
        "Series A": 35,
        "Growth": 25
      },
      success_rate: 75,
      average_return: 3.2
    }
  },
  {
    id: "2",
    name: "Namita Thapar",
    title: "Executive Director",
    company: "Emcure Pharmaceuticals",
    total_deals: 28,
    total_investment: 125000000,
    average_equity: 12.5,
    successful_exits: 4,
    industry_preference: ["Healthcare", "Education", "Women-led startups"],
    investment_range: {
      min: 2000000,
      max: 25000000
    },
    notable_investments: ["Health Tech A", "EdTech B", "Wellness C"],
    investment_style: ["Strategic", "Long-term vision", "Mentorship-focused"],
    season_appearances: [1, 2, 3],
    bio: "Passionate about healthcare and women entrepreneurship",
    expertise: ["Healthcare", "Pharmaceuticals", "Global Business"],
    education: ["CA", "Harvard Business School"],
    achievements: ["Built Emcure's global presence", "Forbes Business Leader"],
    social_media: {
      twitter: "@namitathapar",
      linkedin: "namitathapar",
      instagram: "namita.thapar"
    },
    investment_stats: {
      by_industry: {
        "Healthcare": 45,
        "Education": 30,
        "Others": 25
      },
      by_stage: {
        "Seed": 30,
        "Series A": 45,
        "Growth": 25
      },
      success_rate: 82,
      average_return: 2.8
    }
  },
  // Add more sharks...
];

// Dummy data for deals
const dummyDeals: Deal[] = [
  {
    id: 1,
    season: 1,
    episode: 1,
    startup_name: "BluePine Foods",
    industry: "Food & Beverage",
    ask_amount: 50000000,
    ask_equity: 2.5,
    valuation: 2000000000,
    deal_amount: 50000000,
    deal_equity: 3,
    deal_debt: 0,
    multiple_sharks: true,
    interested_sharks: ["Ashneer Grover", "Namita Thapar"],
    invested_sharks: ["Ashneer Grover"],
    success_status: "funded",
    pitch_description: "Innovative healthy snacks made from natural ingredients",
    product_category: "Healthy Snacks",
    revenue_current: 120000000,
    revenue_projected: 300000000,
    profit_margin: 22,
    team_size: 45,
    founded_year: 2019,
    location: "Mumbai",
    patent_status: "2 patents granted",
    online_presence: {
      website: "https://bluepinefoods.com",
      social_media: {
        instagram: "@bluepinefoods",
        facebook: "bluepinefoods",
        twitter: "@bluepinefoods"
      }
    },
    post_show_status: {
      revenue_growth: 150,
      employee_growth: 200,
      market_expansion: ["UAE", "Singapore", "UK"],
      funding_rounds: [
        {
          round: "Series A",
          amount: 100000000,
          investors: ["Sequoia", "Tiger Global"],
          date: "2024-01"
        }
      ]
    }
  },
  // Add more deals...
];

export const useDealsStore = create<DealsStore>((set) => ({
  deals: dummyDeals,
  sharks: dummySharks,
  selectedSeason: 1,
  loading: false,
  error: null,
  predictions: [],
  insights: [],

  fetchDeals: async () => {
    set({ loading: true });
    try {
      const data = await fetchDeals();
      set({ deals: data || dummyDeals, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSharks: async () => {
    try {
      const data = await fetchSharks();
      set({ sharks: data || dummySharks, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchPredictions: async () => {
    try {
      const data = await fetchPredictions();
      set({ predictions: data });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchInsights: async () => {
    try {
      const data = await fetchAnalytics();
      set({ insights: data });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));