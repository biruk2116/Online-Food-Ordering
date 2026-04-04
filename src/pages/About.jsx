// About.jsx
export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">About FoodieDash</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <p className="text-lg text-gray-600">FoodieDash is Ethiopia's premier online food delivery platform...</p>
      </div>
    </div>
  );
}

// Contact.jsx
export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <p>Email: support@foodiedash.com</p>
        <p>Phone: +251 911 123 456</p>
        <p>Address: Bole Road, Addis Ababa</p>
      </div>
    </div>
  );
}

// Feedback.jsx
import { useState } from 'react';
export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Feedback</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
        <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" required />
        <textarea placeholder="Your Feedback" rows="4" className="w-full px-4 py-2 border rounded-lg" required />
        <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg">Submit</button>
        {submitted && <p className="text-green-500 text-center">Thank you for your feedback!</p>}
      </form>
    </div>
  );
}