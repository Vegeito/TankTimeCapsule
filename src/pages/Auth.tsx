import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, loading, error } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className={`w-full max-w-md p-8 rounded-lg shadow-xl ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      }`}>
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-[#0D1B2A] border-[#17BEBB] text-white' 
                    : 'bg-white border-[#5D87FF]'
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-[#0D1B2A] border-[#17BEBB] text-white' 
                    : 'bg-white border-[#5D87FF]'
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
              isDarkMode
                ? 'bg-[#17BEBB] hover:bg-opacity-90'
                : 'bg-[#5D87FF] hover:bg-opacity-90'
            } text-white font-semibold transition-colors`}
          >
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <h3 className="text-lg font-semibold text-white mb-3">
            Premium Features Access
          </h3>
          <ul className="text-white text-sm space-y-2">
            <li>• AI-powered Investment Advisor</li>
            <li>• Exclusive Shark ROI Heatmaps</li>
            <li>• Founders Pitch Scorecard</li>
            <li>• Viral Moments Collection</li>
            <li>• Interactive Investment Simulator</li>
            <li>• Audience Voting System</li>
          </ul>
        </div>
      </div>
    </div>
  );
};