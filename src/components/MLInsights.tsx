import React from 'react';
import { Brain, TrendingUp, Target, AlertTriangle } from 'lucide-react';
import { useDealsStore } from '../store/useDealsStore';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';

export const MLInsights: React.FC = () => {
  const { predictions, insights } = useDealsStore();
  const { isDarkMode } = useThemeStore();
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className={`p-6 rounded-lg ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      } shadow-lg`}>
        <div className="text-center">
          <Brain className={`h-12 w-12 mx-auto mb-4 ${
            isDarkMode ? 'text-[#17BEBB]' : 'text-[#5D87FF]'
          }`} />
          <h3 className="text-xl font-bold mb-2">ML-Powered Insights</h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to access advanced ML predictions and insights
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      } shadow-lg`}>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          AI Predictions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((prediction) => (
            <div key={prediction.id} className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-[#0D1B2A]' : 'bg-[#F5F5F5]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{prediction.startup_type}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  prediction.success_probability > 0.7
                    ? 'bg-green-500 bg-opacity-20 text-green-500'
                    : 'bg-yellow-500 bg-opacity-20 text-yellow-500'
                }`}>
                  {(prediction.success_probability * 100).toFixed(1)}% Success Rate
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  <span>Recommended Sharks: {prediction.recommended_sharks.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Risk Factors: {prediction.risk_factors.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 rounded-lg ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      } shadow-lg`}>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          Market Insights
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-[#0D1B2A]' : 'bg-[#F5F5F5]'
            }`}>
              <h4 className="font-semibold mb-2">{insight.title}</h4>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                {insight.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold">{insight.data_points.ai_startups}</div>
                  <div className="text-sm text-gray-500">AI Startups</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">
                    {(insight.data_points.success_rate * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">
                    ₹{(insight.data_points.avg_valuation / 10000000).toFixed(1)}Cr
                  </div>
                  <div className="text-sm text-gray-500">Avg Valuation</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};