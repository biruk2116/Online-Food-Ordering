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
  const [animatedFields, setAnimatedFields] = useState({});
  
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
    
    // Animate sections on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
    setAnimatedFields({});
  };

  const handleFieldFocus = (field) => {
    setFocusedField(field);
    setAnimatedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field, value) => {
    setFocusedField(null);
    if (!value) {
      setAnimatedFields(prev => ({ ...prev, [field]: false }));
    }
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
      <section className={`py-16 ${isDark ? 'bg-secondary' : 'bg-secondary'} animate-on-scroll`}>
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
                <div className="text-4xl mb-3 animate-float">{feature.icon}</div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className={`py-16 ${isDark ? 'bg-primary' : 'bg-primary'} animate-on-scroll`}>
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
                  <div key={stat.label} className="card p-3 text-center transition-all duration-300 hover:scale-105">
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
      <section className={`py-16 ${isDark ? 'bg-secondary' : 'bg-secondary'} animate-on-scroll`}>
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
      <section ref={menuRef} className={`py-16 ${isDark ? 'bg-primary' : 'bg-primary'} animate-on-scroll`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Full <span className="gradient-text">Menu</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            <p className="text-sm text-secondary mt-3">Browse our delicious selection of foods</p>
          </div>
          
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

      {/* Contact Section - Fully Animated */}
      <section ref={contactRef} className={`py-20 ${isDark ? 'bg-secondary' : 'bg-secondary'} animate-on-scroll`}>
        <div className="container mx-auto px-4">
          {/* Section Header Animation */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="text-5xl mb-4 animate-float">📞</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto animate-scaleWidth"></div>
            <p className="text-sm text-secondary mt-4 max-w-md mx-auto">
              We'd love to hear from you! Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form - Left Side with Floating Labels */}
            <div className="card p-8 rounded-2xl animate-slideInLeft transition-all duration-700 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-pen text-white text-sm"></i>
                </div>
                <h3 className="text-xl font-semibold">Send us a Message</h3>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {/* Name Field with Floating Label */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    onFocus={() => handleFieldFocus('name')}
                    onBlur={(e) => handleFieldBlur('name', e.target.value)}
                    className="w-full px-4 py-3 pt-5 border-2 rounded-xl focus:outline-none transition-all duration-300 peer form-input"
                    placeholder=" "
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? 'text-xs top-2 text-orange-500'
                        : 'text-base top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-400'
                    }`}
                  >
                    <i className="fas fa-user mr-2 text-xs"></i>
                    Your Name
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
                
                {/* Email Field with Floating Label */}
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={(e) => handleFieldBlur('email', e.target.value)}
                    className="w-full px-4 py-3 pt-5 border-2 rounded-xl focus:outline-none transition-all duration-300 peer form-input"
                    placeholder=" "
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? 'text-xs top-2 text-orange-500'
                        : 'text-base top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-400'
                    }`}
                  >
                    <i className="fas fa-envelope mr-2 text-xs"></i>
                    Email Address
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
                
                {/* Message Field with Floating Label */}
                <div className="relative group">
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    onFocus={() => handleFieldFocus('message')}
                    onBlur={(e) => handleFieldBlur('message', e.target.value)}
                    className="w-full px-4 py-3 pt-5 border-2 rounded-xl focus:outline-none transition-all duration-300 peer form-input resize-none"
                    placeholder=" "
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? 'text-xs top-2 text-orange-500'
                        : 'text-base top-5 text-gray-400 group-hover:text-orange-400'
                    }`}
                  >
                    <i className="fas fa-comment mr-2 text-xs"></i>
                    Your Message
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full btn-primary py-3 text-base font-semibold group overflow-hidden relative"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                    <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
                  </span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </button>
                
                {submitted && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-xl text-sm text-center animate-fadeInUp flex items-center justify-center gap-2">
                    <i className="fas fa-check-circle"></i>
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
            
            {/* Contact Info + Map - Right Side with Animations */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="card p-8 rounded-2xl animate-slideInRight transition-all duration-700 delay-200 hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-address-card text-white text-sm"></i>
                  </div>
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: 'fa-map-marker-alt', title: 'Address', detail: 'Bole Road, Addis Ababa, Ethiopia', color: 'text-red-500' },
                    { icon: 'fa-phone', title: 'Phone', detail: '+251 911 123 456', color: 'text-green-500' },
                    { icon: 'fa-envelope', title: 'Email', detail: 'support@foodiedash.com', color: 'text-blue-500' },
                    { icon: 'fa-clock', title: 'Support Hours', detail: '24/7 Customer Support', color: 'text-purple-500' }
                  ].map((item, idx) => (
                    <div key={item.title} className="flex items-start gap-4 group cursor-pointer transform transition-all duration-300 hover:translate-x-2">
                      <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:${item.color}`}>
                        <i className={`fas ${item.icon} text-orange-500 group-hover:text-white transition-colors duration-300`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">{item.title}</p>
                        <p className="text-xs text-secondary">{item.detail}</p>
                      </div>
                      <i className="fas fa-chevron-right text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-custom">
                  <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: 'fab fa-facebook-f', color: 'hover:bg-blue-600' },
                      { icon: 'fab fa-instagram', color: 'hover:bg-pink-600' },
                      { icon: 'fab fa-twitter', color: 'hover:bg-sky-500' },
                      { icon: 'fab fa-telegram', color: 'hover:bg-blue-500' }
                    ].map((social, idx) => (
                      <a 
                        key={idx}
                        href="#" 
                        className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:text-white group`}
                      >
                        <i className={`${social.icon} text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Map Card with Animation */}
              <div className="card p-2 rounded-2xl overflow-hidden animate-slideInRight transition-all duration-700 delay-300 hover:shadow-2xl group">
                <div className="relative overflow-hidden rounded-xl">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                    width="100%" 
                    height="220" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    title="Restaurant Location"
                    className="transition-transform duration-500 group-hover:scale-105"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
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