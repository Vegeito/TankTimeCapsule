import React from 'react';
import { Crown, TrendingUp, FileText, Zap, Brain, Target, BarChart3, Award } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { Link } from 'react-router-dom';

export const PremiumFeatures: React.FC = () => {
  const { user } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Get ML-driven insights on potential deal outcomes and startup success probability",
      premium: true
    },
    {
      icon: Target,
      title: "Personalized Insights",
      description: "Receive customized investment recommendations based on your preferences",
      premium: true
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Generate detailed PDF reports with comprehensive deal analysis",
      premium: true
    },
    {
      icon: Zap,
      title: "Early Access",
      description: "Be the first to try new features and analytics tools",
      premium: true
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep dive into market trends and investment patterns",
      premium: false
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Exclusive access to detailed case studies of successful deals",
      premium: true
    }
  ];

  return (
    <div className={`mt-12 ${isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'} rounded-lg shadow-xl p-8`}>
      <div className="flex items-center mb-8">
        <Crown className={`h-8 w-8 ${isDarkMode ? 'text-[#FFD700]' : 'text-[#DAA520]'} mr-3`} />
        <h2 className="text-2xl font-bold">Premium Analytics Suite</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`p-6 rounded-lg ${
              feature.premium && !user
                ? 'opacity-75 filter blur-[1px]'
                : ''
            } ${
              isDarkMode
                ? 'bg-[#0D1B2A] hover:bg-[#17BEBB] hover:bg-opacity-20'
                : 'bg-[#F5F5F5] hover:bg-[#ADD8E6] hover:bg-opacity-20'
            } transition-all duration-300`}
          >
            <feature.icon className={`h-8 w-8 mb-4 ${
              isDarkMode ? 'text-[#17BEBB]' : 'text-[#5D87FF]'
            }`} />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              {feature.description}
            </p>
            {feature.premium && !user && (
              <div className="mt-4 flex items-center">
                <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-500">Premium Feature</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {!user && (
        <div className="mt-8 text-center">
          <Link
            to="/auth"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold ${
              isDarkMode
                ? 'bg-[#17BEBB] text-white hover:bg-opacity-90'
                : 'bg-[#5D87FF] text-white hover:bg-opacity-90'
            } transition-colors`}
          >
            <Crown className="h-5 w-5 mr-2" />
            Unlock Premium Features
          </Link>
          <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign up now to access exclusive features and advanced analytics
          </p>
        </div>
      )}
    </div>
  );
};