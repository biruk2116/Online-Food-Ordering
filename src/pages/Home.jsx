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

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="hero-section relative min-h-screen flex items-center justify-center"
      >
        <div 
          className="hero-background absolute inset-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        
        <div className="hero-content relative z-10 px-4">
          <div className="text-6xl md:text-7xl mb-4 animate-float">🍔</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 animate-fadeInUp">
            Foodie<span className="gradient-text">Dash</span>
          </h1>
          <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 mb-6 max-w-2xl mx-auto animate-fadeInUp delay-100">
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fadeInUp delay-200">
            <button 
              onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} 
              className="btn-primary"
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
              <i className="fas fa-chevron-down text-xl text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-16 ${isDark ? 'bg-secondary' : 'bg-secondary'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Choose <span className="gradient-text">Us</span>?</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' },
              { icon: '🎁', title: 'Best Offers', desc: 'Daily discounts & deals' }
            ].map((feature, idx) => (
              <div key={feature.title} className="card p-5 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className={`py-16 ${isDark ? 'bg-primary' : 'bg-primary'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">About <span className="gradient-text">Us</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-fadeInUp">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Ethiopia's <span className="gradient-text">Premier</span> Food Delivery Platform
              </h3>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country. Founded in 2024, we've been on a mission to make delicious food accessible to everyone.
              </p>
              <p className="text-sm text-secondary leading-relaxed mb-6">
                We partner with top-rated restaurants to bring you the finest culinary experiences right to your doorstep.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { number: '500+', label: 'Restaurants', icon: '🏪' },
                  { number: '50K+', label: 'Customers', icon: '😊' },
                  { number: '30min', label: 'Delivery', icon: '⏱️' },
                  { number: '24/7', label: 'Support', icon: '💬' }
                ].map(stat => (
                  <div key={stat.label} className="card p-3 text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-orange-500">{stat.number}</div>
                    <div className="text-xs text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fadeInUp delay-100">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop" 
                alt="About Us" 
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className={`py-16 ${isDark ? 'bg-secondary' : 'bg-secondary'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured <span className="gradient-text">Dishes</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredFoods.map((food, idx) => (
              <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/food/${food.id}`}>
                  <div className="card group overflow-hidden rounded-xl">
                    <img src={food.image} alt={food.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-4">
                      <h3 className="font-semibold text-base mb-1">{food.name}</h3>
                      <p className="text-orange-500 font-bold text-sm">${food.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu Section */}
      <section ref={menuRef} className={`py-16 ${isDark ? 'bg-primary' : 'bg-primary'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Full <span className="gradient-text">Menu</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-sm text-secondary mt-3">Browse our delicious selection of foods</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary text-sm"></i>
              <input
                type="text"
                placeholder="Search for your favorite food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-11"
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
              <i className="fas fa-utensils text-4xl mb-3 opacity-30"></i>
              <p className="text-secondary">No foods found</p>
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

      {/* Contact Section - Modern Side-by-Side Layout */}
      <section ref={contactRef} className={`py-16 ${isDark ? 'bg-secondary' : 'bg-secondary'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3 animate-float">📞</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Get In <span className="gradient-text">Touch</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-sm text-secondary mt-3">We'd love to hear from you!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Contact Form - Left Side */}
            <div className="card p-6 rounded-xl animate-slideInLeft">
              <h3 className="text-lg font-semibold mb-4">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="form-input"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
                {submitted && (
                  <div className="text-green-500 text-center text-sm animate-fadeInUp">
                    <i className="fas fa-check-circle mr-1"></i> Message sent successfully!
                  </div>
                )}
              </form>
            </div>
            
            {/* Contact Info + Map - Right Side */}
            <div className="space-y-6 animate-slideInRight">
              {/* Contact Info */}
              <div className="card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-map-marker-alt text-orange-500 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-xs text-secondary">Bole Road, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-phone text-orange-500 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-xs text-secondary">+251 911 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-envelope text-orange-500 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-secondary">support@foodiedash.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-clock text-orange-500 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Support Hours</p>
                      <p className="text-xs text-secondary">24/7 Customer Support</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-custom">
                  <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fab fa-facebook-f text-sm"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fab fa-instagram text-sm"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fab fa-twitter text-sm"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fab fa-telegram text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Map - Clean & Responsive */}
              <div className="card p-2 rounded-xl overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Restaurant Location"
                  className="rounded-lg"
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