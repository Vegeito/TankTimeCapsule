export interface Database {
  public: {
    Tables: {
      deals: {
        Row: {
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
          created_at: string;
        };
        Insert: {
          id?: number;
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
          created_at?: string;
        };
      };
      sharks: {
        Row: {
          id: string;
          name: string;
          total_deals: number;
          total_investment: number;
          appearances: number[];
          profile_image: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          total_deals: number;
          total_investment: number;
          appearances: number[];
          profile_image: string;
          created_at?: string;
        };
      };
    };
  };
}