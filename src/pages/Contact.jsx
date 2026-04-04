import React, { useState } from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts.push({
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16 max-w-6xl mt-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📞</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4">We're here to help! Reach out to us anytime.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    📍
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">Visit Us</div>
                    <div className="text-gray-600 dark:text-gray-300">Bole Road, Addis Ababa, Ethiopia</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    📞
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">Call Us</div>
                    <div className="text-gray-600 dark:text-gray-300">+251 911 123 456</div>
                    <div className="text-sm text-gray-500">Available 24/7</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    ✉️
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">Email Us</div>
                    <div className="text-gray-600 dark:text-gray-300">support@foodiedash.com</div>
                    <div className="text-sm text-gray-500">Response within 24 hours</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    ⏰
                  </div>
                  <div>
                    <div className="font-semibold dark:text-white">Business Hours</div>
                    <div className="text-gray-600 dark:text-gray-300">Monday - Sunday: 24/7</div>
                    <div className="text-sm text-gray-500">Customer support always available</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Find Us</h2>
              <div className="rounded-xl overflow-hidden h-64">
                <iframe
                  title="FoodieDash Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442219259055!2d38.757028!3d9.030000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ce4d5c2a6f%3A0x5c8b7b8c5d6e8f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin mr-2"></i> Sending...</>
                ) : (
                  <><i className="fas fa-paper-plane mr-2"></i> Send Message</>
                )}
              </button>
              
              {submitted && (
                <div className="bg-green-50 dark:bg-green-900 border border-green-500 text-green-700 dark:text-green-300 p-3 rounded-lg text-center animate-fadeInUp">
                  <i className="fas fa-check-circle mr-2"></i>
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
            
            <div className="mt-6 pt-6 border-t dark:border-gray-700">
              <div className="flex justify-center space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition transform hover:scale-110">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition transform hover:scale-110">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition transform hover:scale-110">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition transform hover:scale-110">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;