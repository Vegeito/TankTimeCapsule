import { create } from 'zustand';
import { api } from '../lib/api';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  preferences: Record<string, any>;
}

interface AuthStore {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  loading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post<{ user: any; profile: Profile }>('/auth/login', { email, password });
      const { user, profile } = response.data;
      set({ user, profile, error: null });
    } catch (error) {
      set({ error: (error as Error).message, user: null, profile: null });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post<{ user: any; profile: Profile }>('/auth/register', {
        email,
        password,
        full_name: fullName,
      });
      const { user, profile } = response.data;
      set({ user, profile, error: null });
    } catch (error) {
      set({ error: (error as Error).message, user: null, profile: null });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      await api.post('/auth/logout');
      set({ user: null, profile: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  fetchProfile: async () => {
    try {
      const response = await api.get<{ user: any; profile: Profile }>('/auth/profile');
      const { user, profile } = response.data;
      set({ user, profile, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  updateProfile: async (updates: Partial<Profile>) => {
    try {
      const response = await api.put<{ profile: Profile }>('/auth/profile', updates);
      const { profile } = response.data;
      set({ profile, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
}));