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
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const heroRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const filteredFoods = foods?.filter(food => {
    const matchCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       food.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
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
      {/* Hero Section - NO BLUR, NO ZOOM */}
      <section 
        ref={heroRef} 
        className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="hero-background absolute inset-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1)',
          }}
        ></div>
        
        <div className={`absolute inset-0 ${isDark ? 'hero-overlay-dark' : 'hero-overlay-light'}`}></div>
        
        <div className="hero-content relative z-10 px-4">
          <div className="animate-float mb-6">
            <span className="text-7xl md:text-8xl inline-block">🍔</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInUp">
            Foodie<span className="gradient-text">Dash</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 animate-pulse-slow"></div>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto animate-fadeInUp delay-200">
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          
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
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <i className="fas fa-chevron-down text-2xl text-orange-500 hover:text-orange-600 transition-colors duration-300"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose <span className="gradient-text">Us</span>?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
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
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-6xl md:text-7xl font-bold mb-4">
              About <span className="gradient-text">Us</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">Discover the story behind FoodieDash</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div className="animate-fadeInLeft">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ethiopia's <span className="gradient-text">Premier</span><br />Food Delivery Platform
              </h3>
              <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
                FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country. Founded in 2024, we've been on a mission to make delicious food accessible to everyone, anytime, anywhere.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
                We partner with top-rated restaurants to bring you the finest culinary experiences right to your doorstep. Our commitment to quality, speed, and customer satisfaction sets us apart.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(stat => (
                  <div key={stat.label} className="card-premium text-center p-4 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-orange-500">{stat.number}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
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
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="gradient-text">Dishes</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFoods.map((food, idx) => (
              <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/food/${food.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg card-premium">
                    <img src={food.image} alt={food.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
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
      <section ref={menuRef} className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Full <span className="gradient-text">Menu</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">Browse our delicious selection of foods</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search for your favorite food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
            </div>
          </div>
          
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          {filteredFoods.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-utensils text-5xl mb-4 opacity-30"></i>
              <p className="text-gray-500 dark:text-gray-400">No foods found in this category</p>
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

      {/* Contact Section - Modern & Compact */}
      <section ref={contactRef} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4 animate-float">📞</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">We'd love to hear from you!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information & Form */}
            <div className="card-premium overflow-hidden">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Visit Us</p>
                      <p className="text-sm opacity-90">Bole Road, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-sm opacity-90">+251 911 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-sm opacity-90">support@foodiedash.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Support Hours</p>
                      <p className="text-sm opacity-90">24/7 Customer Support</p>
                    </div>
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
              
              <div className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="input-group">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  
                  <div className="input-group">
                    <textarea
                      id="message"
                      placeholder=" "
                      rows="4"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                    ></textarea>
                    <label htmlFor="message">Your Message</label>
                  </div>
                  
                  <button type="submit" className="w-full btn-premium">
                    <i className="fas fa-paper-plane mr-2"></i>
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
            
            {/* Google Map - Compact */}
            <div className="card-premium overflow-hidden">
              <div className="h-96">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '384px' }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Restaurant Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;