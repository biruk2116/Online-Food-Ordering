import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-2">We'd love to hear from you!</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-4">
            {[
              { icon: '📍', label: 'Address', value: 'Bole Road, Addis Ababa, Ethiopia' },
              { icon: '📞', label: 'Phone', value: '+251 911 123 456' },
              { icon: '✉️', label: 'Email', value: 'support@foodiedash.com' },
              { icon: '⏰', label: 'Hours', value: '24/7 Customer Support' }
            ].map(info => (
              <div key={info.label} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition">
                <div className="text-2xl">{info.icon}</div>
                <div>
                  <div className="font-semibold">{info.label}</div>
                  <div className="text-gray-600">{info.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required 
            />
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required 
            />
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition">
              Send Message
            </button>
            {submitted && (
              <div className="text-green-500 text-center animate-fadeIn">Message sent successfully!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;