// src/components/Navbar.jsx (Enhanced)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/cart', label: 'Cart' },
    { path: '/orders', label: 'Orders' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/feedback', label: 'Feedback' }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-800 shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          FoodieDash
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`relative text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors duration-300 group ${
                location.pathname === link.path ? 'text-orange-500' : ''
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
              🛒
            </button>
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {getItemCount()}
              </span>
            )}
          </Link>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-all duration-300"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-all duration-300">
                👤 {user.name.split(' ')[0]}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                    {user.email}
                  </div>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn-primary px-4 py-2 text-sm">Login / Signup</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;