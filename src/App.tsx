import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Sharks } from './pages/Sharks';
import { Deals } from './pages/Deals';
import { Analytics } from './pages/Analytics';
import { DealTable } from './pages/DealTable';
import { Predictions } from './pages/Predictions';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { useThemeStore } from './store/useThemeStore';
import { useDealsStore } from './store/useDealsStore';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode } = useThemeStore();
  const { fetchDeals, fetchSharks, fetchPredictions, fetchInsights } = useDealsStore();
  const { fetchProfile } = useAuthStore();

  useEffect(() => {
    fetchDeals();
    fetchSharks();
    fetchPredictions();
    fetchInsights();
    fetchProfile();
  }, [fetchDeals, fetchSharks, fetchPredictions, fetchInsights, fetchProfile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#F5F5F5] text-[#5D87FF]'
      }`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`pt-16 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300`}>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sharks" element={<Sharks />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/deal-table" element={<DealTable />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<div>Settings Coming Soon</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;