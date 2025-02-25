import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  PieChart, 
  Table, 
  Activity,
  Lightbulb,
  LineChart,
  Building2,
  Factory,
  GitCompare
} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { isDarkMode } = useThemeStore();

  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Sharks', path: '/sharks' },
    { icon: TrendingUp, label: 'Deals', path: '/deals' },
    { icon: PieChart, label: 'Analytics', path: '/analytics' },
    { icon: Table, label: 'Deal Table', path: '/deal-table' },
    { icon: Activity, label: 'Predictions', path: '/predictions' },
    { icon: Lightbulb, label: 'Insights', path: '/insights' },
    { icon: LineChart, label: 'Trends', path: '/trends' },
    { icon: Building2, label: 'Startups', path: '/startups' },
    { icon: Factory, label: 'Industries', path: '/industries' },
    { icon: GitCompare, label: 'Comparisons', path: '/comparisons' },
  ];

  return (
    <div className={`fixed left-0 top-16 h-full w-64 transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } ${isDarkMode ? 'bg-[#0D1B2A] text-[#E0E0E0]' : 'bg-white text-[#333333]'} shadow-lg overflow-y-auto`}>
      <div className="py-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 hover:bg-opacity-20 ${
              isDarkMode ? 'hover:bg-[#17BEBB]' : 'hover:bg-[#ADD8E6]'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};