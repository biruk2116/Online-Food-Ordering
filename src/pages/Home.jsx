import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFood, useSettings } from '../App';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import HeroSlideshow from '../components/HeroSlideshow';
import Footer from '../components/Footer';

const Home = () => {
  const { foods, categories } = useFood();
  const { isDark } = useSettings();
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
      {/* Hero Slideshow Section */}
      <section ref={heroRef} className="relative">
        <HeroSlideshow />
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' },
              { icon: '🎁', title: 'Best Offers', desc: 'Daily discounts & deals' }
            ].map((feature, idx) => (
              <div key={feature.title} className={`text-center p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:shadow-md'
              }`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{feature.title}</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                About <span className="gradient-text">FoodieDash</span>
              </h2>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country.
              </p>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                We partner with top-rated restaurants to bring you the finest culinary experiences right to your doorstep.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map(stat => (
                  <div key={stat.label} className={`text-center p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isDark ? 'bg-gray-800' : 'bg-white shadow-sm'
                  }`}>
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-orange-500">{stat.number}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-slideInRight">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-2xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop" 
                alt="About Us" 
                className="rounded-2xl shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Featured Dishes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredFoods.map((food, idx) => (
              <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/food/${food.id}`}>
                  <div className="group relative overflow-hidden rounded-xl shadow-md">
                    <img src={food.image} alt={food.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <div className="text-white text-center">
                        <h3 className="text-base font-semibold">{food.name}</h3>
                        <p className="text-orange-400 font-bold text-sm">${food.price}</p>
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
      <section ref={menuRef} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Our Full Menu
          </h2>
          <p className={`text-center text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Browse our delicious selection of foods
          </p>
          
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          {filteredFoods.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-utensils text-4xl mb-3 opacity-30"></i>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No foods found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
      <section ref={contactRef} className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3 animate-bounce">📞</div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                We'd love to hear from you!
              </p>
            </div>
            
            <div className={`rounded-xl shadow-md overflow-hidden ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
                  <h3 className="text-base font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Bole Road, Addis Ababa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-phone"></i>
                      <span>+251 911 123 456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-envelope"></i>
                      <span>support@foodiedash.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-clock"></i>
                      <span>24/7 Customer Support</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className={`w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-orange-500 transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                      } border`}
                      required 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      className={`w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-orange-500 transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                      } border`}
                      required 
                    />
                    <textarea 
                      rows="3" 
                      placeholder="Your Message" 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      className={`w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-orange-500 transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                      } border`}
                      required
                    ></textarea>
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Send Message
                    </button>
                    {submitted && (
                      <div className="text-green-500 text-center text-xs animate-fadeInUp">
                        <i className="fas fa-check-circle mr-1"></i> Message sent!
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
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Our Location
          </h2>
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
              width="100%" 
              height="350" 
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