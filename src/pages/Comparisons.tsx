import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { ArrowRight } from 'lucide-react';
import { SeasonSelector } from '../components/SeasonSelector';

export const Comparisons: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [selectedShark1, setSelectedShark1] = useState('');
  const [selectedShark2, setSelectedShark2] = useState('');

  const sharks = [
    "Ashneer Grover",
    "Namita Thapar",
    "Aman Gupta",
    "Peyush Bansal",
    // Add more sharks...
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shark Comparisons</h1>
        <SeasonSelector />
      </div>

      <div className={`p-6 rounded-lg ${
        isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
      } shadow-lg`}>
        <div className="flex items-center space-x-4">
          <select
            value={selectedShark1}
            onChange={(e) => setSelectedShark1(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-[#0D1B2A]' : 'bg-gray-50'
            }`}
          >
            <option value="">Select Shark 1</option>
            {sharks.map(shark => (
              <option key={shark} value={shark}>{shark}</option>
            ))}
          </select>

          <ArrowRight className="h-6 w-6" />

          <select
            value={selectedShark2}
            onChange={(e) => setSelectedShark2(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-[#0D1B2A]' : 'bg-gray-50'
            }`}
          >
            <option value="">Select Shark 2</option>
            {sharks.map(shark => (
              <option key={shark} value={shark}>{shark}</option>
            ))}
          </select>
        </div>

        {selectedShark1 && selectedShark2 && (
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedShark1}</h2>
              {/* Add comparison metrics */}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedShark2}</h2>
              {/* Add comparison metrics */}
            </div>
          </div>
        )}
      </div>

      {/* Add more comparison sections */}
    </div>
  );
};