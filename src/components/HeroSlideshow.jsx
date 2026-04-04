import React, { useState, useEffect } from 'react';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&h=1080&fit=crop",
      title: "Premium Burgers",
      subtitle: "Juicy, fresh, and delicious burgers made with love",
      buttonText: "Order Now",
      color: "from-orange-500 to-red-500"
    },
    {
      image: "https://images.unsplash.com/photo-1585937421614-70a008356fbe?w=1920&h=1080&fit=crop",
      title: "Ethiopian Cuisine",
      subtitle: "Experience the authentic taste of Ethiopia",
      buttonText: "Explore Menu",
      color: "from-green-500 to-teal-500"
    },
    {
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop",
      title: "Fresh Coffee",
      subtitle: "Start your day with our aromatic coffee",
      buttonText: "Shop Now",
      color: "from-brown-500 to-orange-500"
    },
    {
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&h=1080&fit=crop",
      title: "Special Drinks",
      subtitle: "Refreshing beverages for every mood",
      buttonText: "View Drinks",
      color: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${currentSlide === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="slide-content">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white animate-slideInLeft">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slideInRight">
              {slide.subtitle}
            </p>
            <button
              onClick={scrollToMenu}
              className={`bg-gradient-to-r ${slide.color} text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg animate-bounce`}
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
      
      {/* Dots Navigation */}
      <div className="slide-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;