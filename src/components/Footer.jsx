import React from 'react';
import QuickSearch from './QuickSearch';
import { useSettings } from '../App';

const Footer = () => {
  const { isDark } = useSettings();

  return (
    <footer className={`${isDark ? 'bg-gray-900/95' : 'bg-white/95'} py-12 mt-16 backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-slideIn">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🍔</span>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'gradient-text'}`}>
                FoodieDash
              </h3>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Delivering happiness to your doorstep with the finest quality food from top restaurants across Ethiopia.
            </p>
          </div>
          
          {/* Quick Search - Same behavior as navbar */}
          <QuickSearch />
          
          {/* Contact Info */}
          <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Contact</h3>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="flex items-center space-x-2 group hover:translate-x-1 transition-all duration-300">
                <i className="fas fa-map-marker-alt text-orange-500"></i>
                <span>Bole Road, Addis Ababa</span>
              </li>
              <li className="flex items-center space-x-2 group hover:translate-x-1 transition-all duration-300">
                <i className="fas fa-phone text-orange-500"></i>
                <span>+251 911 123 456</span>
              </li>
              <li className="flex items-center space-x-2 group hover:translate-x-1 transition-all duration-300">
                <i className="fas fa-envelope text-orange-500"></i>
                <span>support@foodiedash.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Newsletter</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get special offers and updates!</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className={`flex-1 px-4 py-2 text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-orange-50 text-gray-800 border-orange-200'
                } border`} 
              />
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-r-lg hover:scale-105 transition-all duration-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center text-sm ${isDark ? 'border-gray-800 text-gray-400' : 'border-orange-100 text-gray-600'}`}>
          <p>&copy; 2024 FoodieDash. All rights reserved. | Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;