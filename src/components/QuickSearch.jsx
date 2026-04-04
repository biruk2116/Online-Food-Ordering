import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../App';

const QuickSearch = () => {
  const navigate = useNavigate();
  const { isDark } = useSettings();
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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
  };

  const quickLinks = [
    { name: 'Home', id: 'hero', link: 'home' },
    { name: 'Menu', id: 'menu-section', link: 'menu' },
    { name: 'About', id: 'about-section', link: 'about' },
    { name: 'Contact', id: 'contact-section', link: 'contact' }
  ];

  return (
    <div>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Quick Links</h3>
      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link.name}>
            <button
              onClick={() => scrollToSection(link.id, link.link)}
              className={`relative group text-sm font-medium transition-all duration-500 hover:scale-105 ${
                activeLink === link.link
                  ? isDark ? 'text-orange-400' : 'text-orange-500'
                  : isDark ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              {link.name}
              {/* Identical underline animation as navbar */}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 ${
                activeLink === link.link ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickSearch;