// src/pages/Feedback.jsx (Fixed - New file)
import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState({ name: '', rating: 5, message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push({ ...feedback, date: new Date().toISOString() });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFeedback({ name: '', rating: 5, message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">⭐</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          We Value Your Feedback
        </h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input type="text" value={feedback.name} onChange={e => setFeedback({...feedback, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedback({...feedback, rating: star})}
                  className={`text-3xl transition-transform hover:scale-110 ${
                    star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Your Feedback</label>
            <textarea rows="5" value={feedback.message} onChange={e => setFeedback({...feedback, message: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" required />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold">Submit Feedback</button>
          {submitted && <div className="text-green-500 text-center">Thank you for your feedback! 🙏</div>}
        </form>
      </div>
    </div>
  );
};

export default Feedback;