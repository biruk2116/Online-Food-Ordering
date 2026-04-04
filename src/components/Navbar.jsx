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
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          FoodieDash
        </Link>
        
        <div className="flex items-center gap-4 flex-wrap">
          <Link to="/" className="text-gray-700 hover:text-orange-500 transition">Home</Link>
          <Link to="/menu" className="text-gray-700 hover:text-orange-500 transition">Menu</Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 transition">
            Cart
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-orange-500 transition">Orders</Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-500 transition">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition">Contact</Link>
          <Link to="/feedback" className="text-gray-700 hover:text-orange-500 transition">Feedback</Link>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-200 hover:scale-110 transition"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700">Hi, {user.name}</span>
              {user.email === 'admin@foodie.com' && (
                <Link to="/admin" className="text-purple-500">Admin</Link>
              )}
              <button onClick={handleLogout} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;