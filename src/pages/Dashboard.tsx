import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Users,
  TrendingUp,
  Table,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { SeasonSelector } from '../components/SeasonSelector';
import { PremiumFeatures } from '../components/PremiumFeatures';
import { MLInsights } from '../components/MLInsights';
import { useAuthStore } from '../store/useAuthStore';

const DashboardCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}> = ({ title, description, icon, link, color }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <Link
      to={link}
      className={`block p-6 rounded-lg transition-transform hover:scale-105 ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      } shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </Link>
  );
};

export const Dashboard: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { user } = useAuthStore();

  const cards = [
    {
      title: 'Analytics Overview',
      description: 'Comprehensive insights into deal patterns and investment trends',
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      link: '/analytics',
      color: 'bg-blue-500',
    },
    {
      title: 'Shark Profiles',
      description: 'Detailed analysis of each shark\'s investment strategy',
      icon: <Users className="h-6 w-6 text-white" />,
      link: '/sharks',
      color: 'bg-green-500',
    },
    {
      title: 'Deal Insights',
      description: 'Track and analyze successful deals and negotiations',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      link: '/deals',
      color: 'bg-purple-500',
    },
    {
      title: 'Deal Table',
      description: 'Comprehensive database of all Shark Tank India deals',
      icon: <Table className="h-6 w-6 text-white" />,
      link: '/deal-table',
      color: 'bg-orange-500',
    },
    {
      title: 'Predictions',
      description: 'AI-powered insights for future investment trends',
      icon: <Activity className="h-6 w-6 text-white" />,
      link: '/predictions',
      color: 'bg-red-500',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${
          isDarkMode ? 'text-[#E0E0E0]' : 'text-[#5D87FF]'
        }`}>
          Dashboard
        </h1>
        <SeasonSelector />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* ML Insights Section */}
      <MLInsights />

      {/* Premium Features Section */}
      <PremiumFeatures />

      {!user && (
        <div className="mt-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <h2 className="text-2xl font-bold text-white mb-4">
            Premium Features
          </h2>
          <p className="text-white mb-4">
            Sign up to unlock exclusive features:
          </p>
          <ul className="text-white space-y-2 mb-6">
            <li>• Advanced analytics and predictions</li>
            <li>• Personalized investment insights</li>
            <li>• Custom reports and exports</li>
            <li>• Early access to new features</li>
          </ul>
          <Link
            to="/auth"
            className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};