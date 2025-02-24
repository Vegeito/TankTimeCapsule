import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/auth/refresh', { token: refreshToken });
        const { token } = response.data as { token: string };
        localStorage.setItem('auth_token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post<{ token: string; refresh_token: string }>('/auth/login', { email, password });
      const { token, refresh_token } = response.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (email: string, password: string, fullName: string) => {
    try {
      const response = await api.post<{ token: string; refresh_token: string }>('/auth/register', { 
        email, 
        password, 
        full_name: fullName 
      });
      const { token, refresh_token } = response.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  updateProfile: async (updates: any) => {
    try {
      const response = await api.put('/auth/profile', updates);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
};

// Data endpoints with error handling and retries
const withRetry = async (fn: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};

export const fetchDeals = () => withRetry(async () => {
  const response = await api.get('/deals');
  return response.data;
});

export const fetchSharks = () => withRetry(async () => {
  const response = await api.get('/sharks');
  return response.data;
});

export const fetchAnalytics = () => withRetry(async () => {
  const response = await api.get('/analytics');
  return response.data;
});

export const fetchPredictions = () => withRetry(async () => {
  const response = await api.get('/predictions');
  return response.data;
});

export { api };