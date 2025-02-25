import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, profile, signOut } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      isDarkMode ? 'bg-[#0D1B2A] text-[#E0E0E0]' : 'bg-white text-[#5D87FF]'
    } shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="ml-4 font-bold text-xl">
              Tank Time Capsule
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search deals, sharks, or startups..."
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#1E2A3B] text-[#E0E0E0] placeholder-gray-400' 
                    : 'bg-gray-100 text-[#5D87FF] placeholder-gray-500'
                }`}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${
                isDarkMode ? 'hover:bg-[#17BEBB]' : 'hover:bg-[#ADD8E6]'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-600"
                >
                  <img
                    src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user.email}`}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    isDarkMode ? 'bg-[#1E2A3B]' : 'bg-white'
                  }`}>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-opacity-20 hover:bg-gray-600"
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-opacity-20 hover:bg-gray-600"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={signOut}
                        className="w-full flex items-center px-4 py-2 hover:bg-opacity-20 hover:bg-gray-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-[#17BEBB] hover:bg-opacity-90' 
                    : 'bg-[#5D87FF] text-white hover:bg-opacity-90'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};