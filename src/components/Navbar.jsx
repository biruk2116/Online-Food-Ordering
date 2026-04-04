import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useAuth, useSettings } from '../App';

const Navbar = () => {
  const { getItemCount, cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useSettings();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active link based on scroll position
      const sections = [
        { id: 'hero', link: 'home' },
        { id: 'menu-section', link: 'menu' },
        { id: 'about-section', link: 'about' },
        { id: 'contact-section', link: 'contact' }
      ];
      
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveLink(section.link);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const scrollToSection = (sectionId, linkName) => {
    setActiveLink(linkName);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'hero', link: 'home' },
    { name: 'Menu', id: 'menu-section', link: 'menu' },
    { name: 'About', id: 'about-section', link: 'about' },
    { name: 'Contact', id: 'contact-section', link: 'contact' }
  ];

  return (
    <>
      {/* Navbar - Fixed, Solid Background */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDark 
          ? 'bg-gray-900/95 backdrop-blur-sm' 
          : 'bg-white/95 backdrop-blur-sm'
      } ${isScrolled ? 'shadow-xl py-3' : 'shadow-lg py-4'}`}>
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Logo - Strictly Left Corner */}
            <Link 
              to="/" 
              onClick={() => setActiveLink('home')}
              className="group flex items-center space-x-2 pl-6 md:pl-8 transition-all duration-500 hover:pl-7"
            >
              <div className="relative">
                <span className="text-3xl md:text-4xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 inline-block">
                  🍔
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500"></span>
              </div>
              <span className={`text-xl md:text-2xl font-bold transition-all duration-500 group-hover:scale-105 ${
                isDark ? 'text-white' : 'gradient-text'
              }`}>
                FoodieDash
              </span>
            </Link>
            
            {/* Empty Center Space */}
            <div className="flex-1"></div>
            
            {/* Desktop Navigation - Right Corner */}
            <div className="hidden md:flex items-center space-x-1 pr-6 md:pr-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id, link.link)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 hover:scale-105 group ${
                    activeLink === link.link
                      ? isDark ? 'text-orange-400' : 'text-orange-500'
                      : isDark ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 ${
                    activeLink === link.link ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                  {/* Hover Glow Effect */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg blur-xl"></span>
                </button>
              ))}
            </div>
            
            {/* Right Side Icons */}
            <div className="flex items-center space-x-3 pr-6 md:pr-8">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`relative p-2 rounded-full transition-all duration-500 hover:scale-110 group ${
                  isDark ? 'bg-gray-800 text-yellow-500' : 'bg-orange-50 text-orange-500'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                <i className={`fas fa-${isDark ? 'sun' : 'moon'} text-sm relative z-10 transition-all duration-500 group-hover:rotate-12`}></i>
              </button>
              
              {/* Cart Icon */}
              <button 
                onClick={() => setShowCartPanel(true)}
                className={`relative p-2 rounded-full transition-all duration-500 hover:scale-110 group ${
                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-orange-50 text-gray-700'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                <i className="fas fa-shopping-cart text-sm relative z-10 group-hover:text-orange-500 transition-all duration-500"></i>
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {getItemCount()}
                  </span>
                )}
              </button>
              
              {/* User Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-500 hover:scale-105 group ${
                      isDark ? 'bg-gray-800 text-gray-300' : 'bg-orange-50 text-gray-700'
                    }`}
                  >
                    <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <i className="fas fa-chevron-down text-xs transition-all duration-500 group-hover:rotate-180"></i>
                  </button>
                  
                  {showUserMenu && (
                    <div className={`absolute right-0 mt-3 w-56 rounded-xl shadow-2xl py-2 animate-scaleIn overflow-hidden ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-orange-100'}`}>
                        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{user.name}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                      </div>
                      <Link to="/account" className={`flex items-center space-x-3 px-4 py-2 text-sm transition-all duration-300 hover:translate-x-1 ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-orange-50'
                      }`}>
                        <i className="fas fa-user-circle w-4"></i>
                        <span>My Account</span>
                      </Link>
                      <Link to="/orders" className={`flex items-center space-x-3 px-4 py-2 text-sm transition-all duration-300 hover:translate-x-1 ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-orange-50'
                      }`}>
                        <i className="fas fa-history w-4"></i>
                        <span>Order History</span>
                      </Link>
                      {(user.email === 'admin@foodie.com' || user.role === 'admin') && (
                        <Link to="/admin" className={`flex items-center space-x-3 px-4 py-2 text-sm transition-all duration-300 hover:translate-x-1 ${
                          isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-orange-50'
                        }`}>
                          <i className="fas fa-cog w-4"></i>
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-orange-100'}`} />
                      <button onClick={handleLogout} className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-300 hover:translate-x-1">
                        <i className="fas fa-sign-out-alt w-4"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="relative group px-5 py-2 rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <span className="relative text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-white transition-all duration-300">
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Login
                    </span>
                  </button>
                </Link>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden relative w-10 h-10 rounded-full transition-all duration-500 ${
                  isDark ? 'bg-gray-800' : 'bg-orange-50'
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5">
                  <span className={`w-5 h-0.5 transition-all duration-500 ${isDark ? 'bg-white' : 'bg-gray-800'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`w-5 h-0.5 transition-all duration-500 ${isDark ? 'bg-white' : 'bg-gray-800'} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-5 h-0.5 transition-all duration-500 ${isDark ? 'bg-white' : 'bg-gray-800'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-6 py-4 space-y-2 border-t ${
            isDark ? 'border-gray-700 bg-gray-900' : 'border-orange-100 bg-white'
          }`}>
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id, link.link)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-500 transform hover:translate-x-2 ${
                  activeLink === link.link
                    ? isDark ? 'bg-gray-800 text-orange-400' : 'bg-orange-50 text-orange-500'
                    : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-orange-50'
                }`}
                style={{ animationDelay: `${index * 0.05}s`, animation: 'slideIn 0.3s ease-out' }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Cart Side Panel */}
      {showCartPanel && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn" onClick={() => setShowCartPanel(false)} />
          <div className={`fixed right-0 top-0 h-full w-full max-w-md shadow-2xl z-50 transform transition-all duration-500 animate-slideIn ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex flex-col h-full">
              <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-orange-100'}`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Your Cart</h2>
                <button onClick={() => setShowCartPanel(false)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:rotate-90 ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-orange-50 text-gray-600'
                }`}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 animate-fadeInUp">
                    <i className="fas fa-shopping-cart text-6xl mb-4 opacity-30"></i>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className={`flex gap-4 p-4 rounded-xl transition-all duration-500 hover:scale-105 ${
                        isDark ? 'bg-gray-700' : 'bg-orange-50'
                      }`}>
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.name}</h3>
                          <p className="text-orange-500 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                              isDark ? 'bg-gray-600 text-white' : 'bg-orange-200 text-gray-800'
                            }`}>-</button>
                            <span className={`w-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                              isDark ? 'bg-gray-600 text-white' : 'bg-orange-200 text-gray-800'
                            }`}>+</button>
                            <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 hover:text-red-600 transition-all duration-300 hover:scale-110">
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
                <div className={`border-t p-6 space-y-4 ${isDark ? 'border-gray-700' : 'border-orange-100'}`}>
                  <div className="flex justify-between text-xl font-bold">
                    <span className={isDark ? 'text-white' : 'text-gray-800'}>Total:</span>
                    <span className="text-orange-500">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" onClick={() => setShowCartPanel(false)}>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-105 hover:shadow-xl">
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