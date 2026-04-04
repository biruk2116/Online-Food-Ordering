import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodieDash
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Delivering happiness to your doorstep with the finest quality food from top restaurants across Ethiopia.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition transform hover:scale-110">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition transform hover:scale-110">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition transform hover:scale-110">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition transform hover:scale-110">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-orange-500 transition">Home</button></li>
              <li><button onClick={() => scrollToSection('menu-section')} className="text-gray-400 hover:text-orange-500 transition">Menu</button></li>
              <li><button onClick={() => scrollToSection('about-section')} className="text-gray-400 hover:text-orange-500 transition">About Us</button></li>
              <li><button onClick={() => scrollToSection('contact-section')} className="text-gray-400 hover:text-orange-500 transition">Contact</button></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-orange-500 mt-1"></i>
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-orange-500"></i>
                <span>+251 911 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-orange-500"></i>
                <span>support@foodiedash.com</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-clock text-orange-500"></i>
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates!</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-r-lg hover:scale-105 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FoodieDash. All rights reserved. | Delivering happiness since 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;