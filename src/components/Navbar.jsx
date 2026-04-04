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
  const [hoveredLink, setHoveredLink] = useState(null);

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

  const navLinks = [
    { name: 'Home', action: () => scrollToSection('hero'), icon: '🏠' },
    { name: 'Menu', action: () => scrollToSection('menu-section'), icon: '🍽️' },
    { name: 'About', action: () => scrollToSection('about-section'), icon: '📖' },
    { name: 'Contact', action: () => scrollToSection('contact-section'), icon: '📞' }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo - Left Corner */}
            <Link 
              to="/" 
              className="group flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-all duration-300"
            >
              <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🍔</span>
              <span>FoodieDash</span>
            </Link>
            
            {/* Middle Space - Clean and Free */}
            <div className="flex-1"></div>
            
            {/* Right Side - Navigation Links with Animated Hover Effects */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative group px-4 py-2 rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInDown 0.5s ease-out'
                  }}
                >
                  {/* Background Animation */}
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center space-x-2 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300">
                    <span className="text-lg group-hover:rotate-12 transition-transform duration-300">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </span>
                  
                  {/* Ripple Effect */}
                  {hoveredLink === link.name && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-orange-500 opacity-20"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Right Corner Icons */}
            <div className="flex items-center space-x-3 ml-4">
              {/* Theme Toggle with Animation */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="relative group p-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:scale-110"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                <span className="relative z-10">
                  {isDark ? (
                    <i className="fas fa-sun text-yellow-500 group-hover:text-white transition-colors duration-300"></i>
                  ) : (
                    <i className="fas fa-moon text-gray-700 group-hover:text-white transition-colors duration-300"></i>
                  )}
                </span>
              </button>
              
              {/* Cart Icon with Animation */}
              <button 
                onClick={() => setShowCartPanel(true)}
                className="relative group p-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:scale-110"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                <span className="relative z-10">
                  <i className="fas fa-shopping-cart text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300"></i>
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {getItemCount()}
                    </span>
                  )}
                </span>
              </button>
              
              {/* User Profile with Animation */}
              {user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <button className="relative group flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden transition-all duration-300 hover:scale-105">
                    <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <span className="relative z-10 flex items-center space-x-2 group-hover:text-orange-500 transition-colors duration-300">
                      <i className="fas fa-user"></i>
                      <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                      <i className="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform duration-300"></i>
                    </span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 animate-scaleIn">
                      <div className="px-4 py-3 border-b dark:border-gray-700">
                        <p className="text-sm font-semibold dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <Link to="/account" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <i className="fas fa-user-circle mr-2"></i> My Account
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <i className="fas fa-history mr-2"></i> Order History
                      </Link>
                      {(user.email === 'admin@foodie.com' || user.role === 'admin') && (
                        <Link to="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <i className="fas fa-cog mr-2"></i> Admin Panel
                        </Link>
                      )}
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="relative group px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden transition-all duration-300 hover:scale-105">
                    <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <span className="relative z-10 flex items-center space-x-2 group-hover:text-orange-500 transition-colors duration-300">
                      <i className="fas fa-sign-in-alt"></i>
                      <span>Login</span>
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Side Panel */}
      {showCartPanel && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn" onClick={() => setShowCartPanel(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-500 animate-slideInRight">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold dark:text-white">Your Cart ({getItemCount()} items)</h2>
                <button onClick={() => setShowCartPanel(false)} className="text-gray-500 hover:text-gray-700 text-2xl transition-transform hover:rotate-90 duration-300">&times;</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 animate-fadeInUp">
                    <i className="fas fa-shopping-cart text-6xl text-gray-300 dark:text-gray-600 mb-4 animate-bounce"></i>
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fadeInUp hover:scale-105 transition-transform duration-300">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold dark:text-white">{item.name}</h3>
                          <p className="text-orange-500 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 transition transform hover:scale-110">-</button>
                            <span className="w-8 text-center dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 transition transform hover:scale-110">+</button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 hover:text-red-600 transition transform hover:scale-110">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="border-t dark:border-gray-700 p-4 space-y-4 animate-slideInUp">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="dark:text-white">Total:</span>
                    <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" onClick={() => setShowCartPanel(false)}>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Add animation keyframes to style */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;