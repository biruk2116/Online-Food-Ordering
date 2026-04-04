import React, { useState } from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    e.target.reset();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16 max-w-6xl mt-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">We'd love to hear from you!</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="text-2xl">📍</div>
                <div>
                  <div className="font-semibold dark:text-white">Address</div>
                  <div className="text-gray-600 dark:text-gray-300">Bole Road, Addis Ababa, Ethiopia</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="text-2xl">📞</div>
                <div>
                  <div className="font-semibold dark:text-white">Phone</div>
                  <div className="text-gray-600 dark:text-gray-300">+251 911 123 456</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="text-2xl">✉️</div>
                <div>
                  <div className="font-semibold dark:text-white">Email</div>
                  <div className="text-gray-600 dark:text-gray-300">support@foodiedash.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="text-2xl">⏰</div>
                <div>
                  <div className="font-semibold dark:text-white">Hours</div>
                  <div className="text-gray-600 dark:text-gray-300">24/7 Customer Support</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <textarea placeholder="Your Message" rows="5" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition">
                Send Message
              </button>
              {submitted && (
                <div className="text-green-500 text-center animate-fadeInUp">Message sent successfully!</div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;