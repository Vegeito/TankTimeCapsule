import React from 'react';
import { useDealsStore } from '../store/useDealsStore';
import { useThemeStore } from '../store/useThemeStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

export const Sharks: React.FC = () => {
  const { sharks } = useDealsStore();
  const { isDarkMode } = useThemeStore();

  const chartData = Object.values(sharks).map((shark: any) => ({
    name: shark.name,
    deals: shark.total_deals,
    investment: shark.total_investment / 10000000, // Convert to Cr
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg ${
          isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-500" />
            <span className="text-sm text-gray-500">Total Sharks</span>
          </div>
          <div className="text-3xl font-bold">{sharks.length}</div>
        </div>

        <div className={`p-6 rounded-lg ${
          isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <span className="text-sm text-gray-500">Total Deals</span>
          </div>
          <div className="text-3xl font-bold">
            {Object.values(sharks).reduce((acc: number, shark: any) => acc + shark.total_deals, 0)}
          </div>
        </div>

        <div className={`p-6 rounded-lg ${
          isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
        } shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-yellow-500" />
            <span className="text-sm text-gray-500">Total Investment</span>
          </div>
          <div className="text-3xl font-bold">
            ₹{(Object.values(sharks).reduce((acc: number, shark: any) => acc + shark.total_investment, 0) / 10000000).toFixed(1)}Cr
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      } shadow-lg`}>
        <h2 className="text-xl font-bold mb-6">Investment Analysis</h2>
        <div className="w-full overflow-x-auto">
          <BarChart
            width={800}
            height={400}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="deals" fill="#3B82F6" name="Total Deals" />
            <Bar yAxisId="right" dataKey="investment" fill="#10B981" name="Total Investment (Cr)" />
          </BarChart>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(sharks).map((shark: any) => (
          <div key={shark.name} className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(shark.name)}&background=random`}
                alt={shark.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{shark.name}</h3>
                <p className="text-sm text-gray-500">Shark Tank India</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Deals</span>
                <span className="font-semibold">{shark.total_deals}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Investment</span>
                <span className="font-semibold">₹{(shark.total_investment / 10000000).toFixed(1)}Cr</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Deal Size</span>
                <span className="font-semibold">
                  ₹{((shark.total_investment / shark.total_deals) / 10000000).toFixed(1)}Cr
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};