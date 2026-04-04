// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/menu" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
          FoodieDash
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/menu" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors">Menu</Link>
          <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors">
            Cart
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {getItemCount()}
              </span>
            )}
          </Link>
          <Link to="/orders" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors">Orders</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-200">Hi, {user.name}</span>
              {user.email === 'admin@foodie.com' && (
                <Link to="/admin" className="text-purple-500 hover:text-purple-600">Admin</Link>
              )}
              <button onClick={handleLogout} className="btn-primary px-4 py-1 text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary px-4 py-1 text-sm">Login</Link>
          )}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;