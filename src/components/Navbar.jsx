import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useAuth, useSettings } from '../App';

const Navbar = () => {
  const { getItemCount, cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useSettings();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
            FoodieDash
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition">Home</Link>
            <Link to="/menu" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition">Menu</Link>
            <button onClick={() => scrollToSection('about-section')} className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition">About</button>
            <button onClick={() => scrollToSection('contact-section')} className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition">Contact</button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform">
              {isDark ? '☀️' : '🌙'}
            </button>
            
            <button onClick={() => setShowCartPanel(true)} className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform">
              <i className="fas fa-shopping-cart text-gray-700 dark:text-gray-200"></i>
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="relative" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                <button className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-transform">
                  <i className="fas fa-user"></i>
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 animate-scaleIn">
                    <Link to="/account" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <i className="fas fa-user-circle mr-2"></i> My Account
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <i className="fas fa-history mr-2"></i> Order History
                    </Link>
                    {(user.email === 'admin@foodie.com' || user.role === 'admin') && (
                      <Link to="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <i className="fas fa-cog mr-2"></i> Admin Panel
                      </Link>
                    )}
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:scale-105 transition-transform">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Side Panel */}
      {showCartPanel && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCartPanel(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 animate-slideInRight">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white">Your Cart ({getItemCount()} items)</h2>
                <button onClick={() => setShowCartPanel(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-shopping-cart text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold dark:text-white">{item.name}</h3>
                          <p className="text-orange-500 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition">-</button>
                            <span className="w-8 text-center dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition">+</button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 hover:text-red-600"><i className="fas fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="border-t dark:border-gray-700 p-4 space-y-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="dark:text-white">Total:</span>
                    <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" onClick={() => setShowCartPanel(false)}>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;