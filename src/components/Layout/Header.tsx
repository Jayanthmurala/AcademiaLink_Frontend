import React, { useState } from 'react';
import { User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!currentUser) return null;

  const getNavItems = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          { id: '/dashboard', label: 'Dashboard' },
          { id: '/profile', label: 'Profile' },
          { id: '/skills', label: 'Skills' },
          { id: '/learning', label: 'Learning' },
          { id: '/projects', label: 'Projects' },
          { id: '/events', label: 'Events' },
          { id: '/networking', label: 'Network' },
          { id: '/achievements', label: 'Achievements' },
          { id: '/messages', label: 'Messages' }
        ];
      case 'faculty':
        return [
          { id: '/dashboard', label: 'Dashboard' },
          { id: '/profile', label: 'Profile' },
          { id: '/my-posts', label: 'My Posts' },
          { id: '/applications', label: 'Applications' },
          { id: '/events', label: 'Events' },
          { id: '/networking', label: 'Network' },
          { id: '/achievements', label: 'Achievements' },
          { id: '/messages', label: 'Messages' }
        ];
      case 'admin':
        return [
          { id: '/dashboard', label: 'Dashboard' },
          { id: '/admin/verification', label: 'Verification' },
          { id: '/admin/metrics', label: 'Metrics' },
          { id: '/events', label: 'Events' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'faculty': return 'bg-emerald-100 text-emerald-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-sm">
                <span className="text-white font-bold text-lg">AL</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">AcademiaLink</h1>
                <p className="text-xs text-gray-500 -mt-1">{currentUser.collegeName}</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(item.id)
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                      {currentUser.name}
                    </p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(currentUser.role)}`}>
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRoleColor(currentUser.role)}`}>
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleNavClick('/profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1 max-h-96 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.id)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Overlay for user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;