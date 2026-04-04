import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFood, useSettings } from '../App';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';

const Home = () => {
  const { foods, categories } = useFood();
  const { isDark, heroBackground } = useSettings();
  const featuredFoods = foods?.slice(0, 3) || [];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const heroRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const filteredFoods = foods?.filter(food => {
    return selectedCategory === 'All' || food.category === selectedCategory;
  }) || [];

  useEffect(() => {
    if (heroRef.current) heroRef.current.id = 'hero';
    if (menuRef.current) menuRef.current.id = 'menu-section';
    if (aboutRef.current) aboutRef.current.id = 'about-section';
    if (contactRef.current) contactRef.current.id = 'contact-section';
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const stats = [
    { number: '500+', label: 'Partner Restaurants', icon: '🏪' },
    { number: '50K+', label: 'Happy Customers', icon: '😊' },
    { number: '30min', label: 'Average Delivery', icon: '⏱️' },
    { number: '24/7', label: 'Customer Support', icon: '💬' }
  ];

  return (
    <div>
      {/* Hero Section - Full Screen with Dynamic Background */}
      <section 
        ref={heroRef} 
        className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Background Image */}
        <div 
          className="hero-background absolute inset-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        
        {/* Overlay based on mode */}
        <div className={`absolute inset-0 ${isDark ? 'hero-overlay-dark' : 'hero-overlay-light'}`}></div>
        
        {/* Animated Content */}
        <div className="hero-content relative z-10 px-4">
          {/* Floating Icon */}
          <div className="animate-float mb-6">
            <span className="text-7xl md:text-8xl inline-block">🍔</span>
          </div>
          
          {/* Main Title with Staggered Animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 heading-1 animate-fadeInUp">
            Foodie<span className="gradient-text">Dash</span>
          </h1>
          
          {/* Animated Underline */}
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 animate-pulse-slow"></div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto animate-fadeInUp delay-200">
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
            <button 
              onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} 
              className="btn-premium"
            >
              <i className="fas fa-utensils mr-2"></i>
              Explore Menu
            </button>
            <button 
              onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })} 
              className="btn-outline"
            >
              <i className="fas fa-play-circle mr-2"></i>
              Our Story
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <i className="fas fa-chevron-down text-2xl text-orange-500 hover:text-orange-600 transition-colors duration-300"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-20 ${isDark ? 'section-dark' : 'section-light'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-2">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' },
              { icon: '🎁', title: 'Best Offers', desc: 'Daily discounts & deals' }
            ].map((feature, idx) => (
              <div key={feature.title} className="card-premium text-center p-6 transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl mb-4 animate-float">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 heading-3">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className={`py-20 ${isDark ? 'bg-gray-900/50' : 'section-warm'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <span className="text-sm text-orange-500 font-semibold uppercase tracking-wide">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 heading-2">
                Ethiopia's <span className="gradient-text">Premier</span> Food Delivery Platform
              </h2>
              <p className="text-base leading-relaxed mb-4 body-text">
                FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country. Founded in 2024, we've been on a mission to make delicious food accessible to everyone, anytime, anywhere.
              </p>
              <p className="text-base leading-relaxed mb-6 body-text">
                We partner with top-rated restaurants to bring you the finest culinary experiences right to your doorstep. Our commitment to quality, speed, and customer satisfaction sets us apart.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(stat => (
                  <div key={stat.label} className="card-premium text-center p-4 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-orange-500">{stat.number}</div>
                    <div className="text-xs text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fadeInRight">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-3xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop" 
                alt="About Us" 
                className="rounded-2xl shadow-2xl relative z-10 w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className={`py-20 ${isDark ? 'section-dark' : 'section-cool'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-2">Featured Dishes</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFoods.map((food, idx) => (
              <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/food/${food.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg card-premium">
                    <img src={food.image} alt={food.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-semibold">{food.name}</h3>
                        <p className="text-orange-400 font-bold text-lg">${food.price}</p>
                        <button className="mt-3 px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu Section */}
      <section ref={menuRef} className={`py-20 ${isDark ? 'bg-gray-900/30' : 'section-light'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-2">Our Full Menu</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-muted mt-3">Browse our delicious selection of foods</p>
          </div>
          
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          {filteredFoods.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-utensils text-5xl mb-4 opacity-30"></i>
              <p className="text-muted">No foods found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFoods.map((food, idx) => (
                <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={`py-20 ${isDark ? 'section-dark' : 'section-warm'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-5xl mb-4 animate-float">📞</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-2">
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
              <p className="text-muted mt-3">We'd love to hear from you!</p>
            </div>
            
            <div className="card-premium overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-map-marker-alt text-lg group-hover:scale-110 transition-transform"></i>
                      <span>Bole Road, Addis Ababa, Ethiopia</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-phone text-lg group-hover:scale-110 transition-transform"></i>
                      <span>+251 911 123 456</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-envelope text-lg group-hover:scale-110 transition-transform"></i>
                      <span>support@foodiedash.com</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-clock text-lg group-hover:scale-110 transition-transform"></i>
                      <span>24/7 Customer Support</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110">
                        <i className="fab fa-telegram"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      required 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      required 
                    />
                    <textarea 
                      rows="4" 
                      placeholder="Your Message" 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      required
                    ></textarea>
                    <button 
                      type="submit" 
                      className="w-full btn-premium"
                    >
                      Send Message
                    </button>
                    {submitted && (
                      <div className="text-green-500 text-center animate-fadeInUp">
                        <i className="fas fa-check-circle mr-2"></i> Message sent successfully!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900/50' : 'section-cool'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-2">Our Location</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              title="Restaurant Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;