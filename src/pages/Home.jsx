import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFood } from '../App';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import burgerBg from '../assets/images/Burger.jpg';

const Home = () => {
  const { foods } = useFood();
  const featuredFoods = foods?.slice(0, 3) || [];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const heroRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

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
      {/* Hero Section with Background Image */}
      <section 
        ref={heroRef} 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${burgerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-bounce text-8xl mb-6">🍔</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fadeInUp">
            FoodieDash
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slideInLeft">
            Delivering happiness to your doorstep. Fresh, fast, and delicious!
          </p>
          <button onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary px-8 py-3 rounded-full font-semibold text-lg animate-slideInRight">
            Explore Menu
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="min-h-screen flex items-center bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-minute delivery or free' },
              { icon: '🍽️', title: 'Quality Food', desc: 'Prepared with fresh ingredients' },
              { icon: '💳', title: 'Easy Payment', desc: 'Multiple payment options' },
              { icon: '🎁', title: 'Best Offers', desc: 'Daily discounts & deals' }
            ].map((feature, idx) => (
              <div key={feature.title} className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="min-h-screen flex items-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About FoodieDash</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                FoodieDash is Ethiopia's premier online food delivery platform, connecting food lovers with the best restaurants in the country.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(stat => (
                  <div key={stat.label} className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-orange-500">{stat.number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-slideInRight">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20"></div>
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop" alt="About Us" className="rounded-3xl shadow-2xl relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="min-h-screen flex items-center bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">Featured Dishes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredFoods.map((food, idx) => (
              <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/food/${food.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg">
                    <img src={food.image} alt={food.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                      <div className="text-white text-center">
                        <h3 className="text-xl font-bold">{food.name}</h3>
                        <p className="text-orange-400 font-bold">${food.price}</p>
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
      <section ref={menuRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">Our Full Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods?.map((food, idx) => (
              <div key={food.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Compact and Interactive */}
      <section ref={contactRef} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3 animate-bounce">📞</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">Get In Touch</h2>
              <p className="text-gray-600 dark:text-gray-300">We'd love to hear from you!</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              <div className="grid md:grid-cols-2">
                {/* Contact Info */}
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-map-marker-alt text-xl group-hover:scale-110 transition"></i>
                      <div className="text-sm">Bole Road, Addis Ababa, Ethiopia</div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-phone text-xl group-hover:scale-110 transition"></i>
                      <div className="text-sm">+251 911 123 456</div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-envelope text-xl group-hover:scale-110 transition"></i>
                      <div className="text-sm">support@foodiedash.com</div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <i className="fas fa-clock text-xl group-hover:scale-110 transition"></i>
                      <div className="text-sm">24/7 Customer Support</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2 text-sm">Follow Us</h4>
                    <div className="flex space-x-2">
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition transform hover:scale-110 text-sm">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition transform hover:scale-110 text-sm">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition transform hover:scale-110 text-sm">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition transform hover:scale-110 text-sm">
                        <i className="fab fa-telegram"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Send Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <textarea rows="3" placeholder="Your Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
                    <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition text-sm">
                      Send Message
                    </button>
                    {submitted && (
                      <div className="text-green-500 text-center text-sm animate-fadeInUp">
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
      <section className="min-h-screen flex items-center bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">Our Location</h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" title="Restaurant Location"></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;